/*!
 * pjax(ajax + history.pushState) for jquery
 *
 * by welefen
 */
(function($) {
    var Util = {
        support : {
            pjax : window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/),
            storage : !!window.localStorage
        },
        toInt : function(obj) {
            return parseInt(obj);
        },
        stack : {},
        getTime : function() {
            return new Date * 1;
        },
        // 获取URL不带hash的部分,切去掉pjax=true部分
        getRealUrl : function(url) {
            url = (url || '').replace(/\#.*?$/, '');
            url = url.replace('?pjax=true&', '?').replace('?pjax=true', '').replace('&pjax=true', '');
            return url;
        },
        // 获取url的hash部分
        getUrlHash : function(url) {
            return url.replace(/^[^\#]*(?:\#(.*?))?$/, '$1');
        },
        // 获取本地存储的key
        getLocalKey : function(src) {
            var s = 'pjax_' + encodeURIComponent(src);
            return {
                data : s + '_data',
                time : s + '_time',
                title : s + '_title'
            };
        },
        // 清除所有的cache
        removeAllCache : function() {
            if (!Util.support.storage)
                return;
            for ( var name in localStorage) {
                if ((name.split('_') || [ '' ])[0] === 'pjax') {
                    delete localStorage[name];
                }
            }
        },
        // 获取cache
        getCache : function(src, time, flag) {
            var item, vkey, tkey, tval;
            time = Util.toInt(time);
            if (src in Util.stack) {
                item = Util.stack[src], ctime = Util.getTime();
                if ((item.time + time * 1000) > ctime) {
                    return item;
                } else {
                    delete Util.stack[src];
                }
            } else if (flag && Util.support.storage) { // 从localStorage里查询
                var l = Util.getLocalKey(src);
                vkey = l.data;
                tkey = l.time;
                item = localStorage.getItem(vkey);
                if (item) {
                    tval = Util.toInt(localStorage.getItem(tkey));
                    if ((tval + time * 1000) > Util.getTime()) {
                        return {
                            data : item,
                            title : localStorage.getItem(l.title)
                        };
                    } else {
                        localStorage.removeItem(vkey);
                        localStorage.removeItem(tkey);
                        localStorage.removeItem(l.title);
                    }
                }
            }
            return null;
        },
        // 设置cache
        setCache : function(src, data, title, flag) {
            var time = Util.getTime(), key;
            Util.stack[src] = {
                data : data,
                title : title,
                time : time
            };
            if (flag && Util.support.storage) {
                key = Util.getLocalKey(src);
                localStorage.setItem(key.data, data);
                localStorage.setItem(key.time, time);
                localStorage.setItem(key.title, title);
            }
        },
        // 清除cache
        removeCache : function(src) {
            src = Util.getRealUrl(src || location.href);
            delete Util.stack[src];
            if (Util.support.storage) {
                var key = Util.getLocalKey(src);
                localStorage.removeItem(key.data);
                localStorage.removeItem(key.time);
                localStorage.removeItem(key.title);
            }
        }
    };
    // pjax
    var pjax = function(options) {
        options = $.extend({
            selector : '',
            container : '',
            callback : function() {},
            fitler : function() {}
        }, options);
        if (!options.container || !options.selector) {
            throw new Error('selector & container options must be set');
        }
        $('body').delegate(options.selector, 'click', function(event) {
            if (event.which > 1 || event.metaKey) {
                return true;
            }
            var $this = $(this), href = $this.attr('href');
            // 过滤
            if (typeof options.filter === 'function') {
                if (options.filter.call(this, href, this) === true){
                    event.preventDefault();
                    return true;
                }
            }
            if (href === location.href) {
                return true;
            }
            // 只是hash不同
            if (Util.getRealUrl(href) == Util.getRealUrl(location.href)) {
                var hash = Util.getUrlHash(href);
                if (hash) {
                    $('html,body').animate({scrollTop: $('#'+hash).offset().top}, 500);
                    options.callback && options.callback.call(this, {
                        type : 'hash'
                    });
                }
                return true;
            }
            event.preventDefault();
            options = $.extend(true, options, {
                url : href,
                element : this,
                title: '',
                push: true
            });
            // 发起请求
            pjax.request(options);
        });
    };
    pjax.xhr = null;
    pjax.options = {};
    pjax.state = {};

    // 默认选项
    pjax.defaultOptions = {
        timeout : 2000,
        element : null,
        cache : 24 * 3600, // 缓存时间, 0为不缓存, 单位为秒
        storage : true, // 是否使用localstorage将数据保存到本地
        url : '', // 链接地址
        push : true, // true is push, false is replace, null for do nothing
        show : '', // 展示的动画
        title : '', // 标题
        titleSuffix : '',// 标题后缀
        type : 'GET',
        data : {
            pjax : true
        },
        dataType : 'html',
        callback : null, // 回调函数
        // for jquery
        beforeSend : function(xhr) {
            $(pjax.options.container).trigger('pjax.start', [ xhr, pjax.options ]);
            xhr && xhr.setRequestHeader('X-PJAX', true);
        },
        error : function() {
            pjax.options.callback && pjax.options.callback.call(pjax.options.element, {
                type : 'error',
                url : pjax.options.url
            });
            //location.href = pjax.options.url;
        },
        complete : function(xhr) {
            $(pjax.options.container).trigger('pjax.end', [ xhr, pjax.options ]);
        }
    };
    // 展现动画
    pjax.showFx = {
        "_default" : function(data, callback, isCached) {
            this.html(data);
            callback && callback.call(this, data, isCached);
        },
        fade: function(data, callback, isCached){
            var $this = this;
            if(isCached){
                $this.html(data);
                callback && callback.call($this, data, isCached);
            }else{
                this.fadeOut(500, function(){
                    $this.html(data).fadeIn(500, function(){
                        callback && callback.call($this, data, isCached);
                    });
                });
            }
        }
    }
    // 展现函数
    pjax.showFn = function(showType, container, data, fn, isCached) {
        var fx = null;
        if (typeof showType === 'function') {
            fx = showType;
        } else {
            if (!(showType in pjax.showFx)) {
                showType = "_default";
            }
            fx = pjax.showFx[showType];
        }
        fx && fx.call(container, data, function() {
            var hash = location.hash;
            if (hash != '') {
                $('html,body').animate({scrollTop: $(hash).offset().top}, 500);
                //for FF
                if(/Firefox/.test(navigator.userAgent)){
                    history.replaceState($.extend({}, pjax.state, {
                        url : null
                    }), document.title);
                }
            } else {
                $('html,body').animate({scrollTop: 0}, 500);
            }
            fn && fn.call(this, data, isCached);
        }, isCached);
    }
    // success callback
    pjax.success = function(data, isCached) {
        // isCached default is success
        if (isCached !== true) {
            isCached = false;
        }
//        if ((data || '').indexOf('<html') != -1) {
//            pjax.options.callback && pjax.options.callback.call(pjax.options.element, {
//                type : 'error'
//            });
//            location.href = pjax.options.url;
//            return false;
//        }
        var title = pjax.options.title || "", el;
        if (pjax.options.element) {
            el = $(pjax.options.element);
            title = el.attr('title') || el.text();
        }
        var matches = data.match(/<title>(.*?)<\/title>/);
        if (matches) {
            title = matches[1];
        }
        if (title) {
            if (title.indexOf(pjax.options.titleSuffix) == -1) {
                title += pjax.options.titleSuffix;
            }
        }
        document.title = title;
        pjax.state = {
            container : pjax.options.container,
            timeout : pjax.options.timeout,
            cache : pjax.options.cache,
            storage : pjax.options.storage,
            show : pjax.options.show,
            title : title,
            url : pjax.options.oldUrl
        };
        var query = $.param(pjax.options.data);
        if (query != "") {
            pjax.state.url = pjax.options.url + (/\?/.test(pjax.options.url) ? "&" : "?") + query;
        }

        if (pjax.options.push) {
            if (!pjax.active) {
                history.replaceState($.extend({}, pjax.state, {
                    url : null
                }), document.title);
                pjax.active = true;
            }
            history.pushState(pjax.state, document.title, pjax.options.oldUrl);
        } else if (pjax.options.push === false) {
            history.replaceState(pjax.state, document.title, pjax.options.oldUrl);
        }
        pjax.options.showFn && pjax.options.showFn(data, function() {
            pjax.options.callback && pjax.options.callback.call(pjax.options.element,{
                type : isCached? 'cache' : 'success'
            });
        }, isCached);
        // 设置cache
        if (pjax.options.cache && !isCached) {
            Util.setCache(pjax.options.url, data, title, pjax.options.storage);
        }
    };

    // 发送请求
    pjax.request = function(options) {
        options = $.extend(true, pjax.defaultOptions, options);
        var cache, container = $(options.container);
        options.oldUrl = options.url;
        options.url = Util.getRealUrl(options.url);
        if($(options.element).length){
            cache = Util.toInt($(options.element).attr('data-pjax-cache'));
            if (cache) {
                options.cache = cache;
            }
        }
        if (options.cache === true) {
            options.cache = 24 * 3600;
        }
        options.cache = Util.toInt(options.cache);
        // 如果将缓存时间设为0，则将之前的缓存也清除
        if (options.cache === 0) {
            Util.removeAllCache();
        }
        // 展现函数
        if (!options.showFn) {
            options.showFn = function(data, fn, isCached) {
                pjax.showFn(options.show, container, data, fn, isCached);
            };
        }
        pjax.options = options;
        pjax.options.success = pjax.success;
        if (options.cache && (cache = Util.getCache(options.url, options.cache, options.storage))) {
            options.beforeSend();
            options.title = cache.title;
            pjax.success(cache.data, true);
            options.complete();
            return true;
        }
        if (pjax.xhr && pjax.xhr.readyState < 4) {
            pjax.xhr.onreadystatechange = $.noop;
            pjax.xhr.abort();
        }
        pjax.xhr = $.ajax(pjax.options);
    };

    // popstate event
    var popped = ('state' in window.history), initialURL = location.href;
    $(window).bind('popstate', function(event) {
        var initialPop = !popped && location.href == initialURL;
        popped = true;
        if (initialPop) return;
        var state = event.state;
        if (state && state.container) {
            if ($(state.container).length) {
                var data = {
                    url : state.url,
                    container : state.container,
                    push : null,
                    timeout : state.timeout,
                    cache : state.cache,
                    storage : state.storage,
                    title: state.title,
                    element: null
                };
                pjax.request(data);
            } else {
                window.location = location.href;
            }
        }
    });

    // not support
    if (!Util.support.pjax) {
        pjax = function() {
            return true;
        };
        pjax.request = function(options) {
            if (options && options.url) {
                location.href = options.url;
            }
        };
    }
    // pjax bind to $
    $.pjax = pjax;
    $.pjax.util = Util;

    // extra
    if ($.inArray('state', $.event.props) < 0) {
        $.event.props.push('state')
    }

})(jQuery);
$(document).ready(function(){
    $.pjax({
        selector: 'a',
        container: '#main', //内容替换的容器
        show: 'custom',//支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
        cache: true,  //是否使用缓存
        storage: true,  //是否使用本地存储
        titleSuffix: ' - ' + site_title, //标题后缀
        filter: function(href){
            var not_pjax = false;
            if(href==base_url || (href+'/')==base_url ){
                not_pjax = false;
            }
            else if(href.indexOf('#') != 0 && href.indexOf('/')!= 0 &&  href.indexOf(base_url) == -1){
                not_pjax = true;
            }
            else if(href=='#' || href.indexOf('.png') >-1 || href.indexOf('.jpg') >-1 || href.indexOf('.gif') >-1 || href.indexOf('.rar') >-1 || href.indexOf('.zip') >-1 || href.indexOf('.7z') >-1 || href.indexOf('.xml') > -1){
                not_pjax = true;//True表示过滤不用pjan
            }
            if(not_pjax && href!='#'){
                window.open(href);
            }
            return not_pjax;
        },
        callback: function(data){
            var type = data.type;
            switch(type){
                case 'cache':
                    old_friend();
                case 'success':
                    if(window.DUOSHUO) window.DUOSHUO = null;
                    if($('.ds-thread').is(':visible')){
                        (function() {
                            var ds = document.createElement('script');
                            ds.type = 'text/javascript';ds.async = true;
                            ds.src = 'http://static.duoshuo.com/embed.js';
                            ds.charset = 'UTF-8';
                            (document.getElementsByTagName('head')[0]
                                || document.getElementsByTagName('body')[0]).appendChild(ds);
                        })();
                    }
                    break;
                case 'hash':
                    break;
                case 'error':
                    $('#loading').html('&#20986;&#38169;&#20102;&#65292;&#35831;&#37325;&#35797;。 <a href="'+ data.url +'">&#30830;&#23450;</a>');
                    break;
            }
        }
    })

    $('#main').bind('pjax.start', function(){
        $('#loading').html('<i></i> &#21152;&#36733;&#20013;。。。 <a href="#" class="cancel">&#21462;&#28040;</a>');
        $('#preloader').fadeIn();
    })

    $('#main').bind('pjax.end', function(){
        $('#preloader').fadeOut();
    })
});

$.extend($.pjax.showFx,{
    custom: function(data, callback, isCached){
        data = data.split('id="main"')[1];
        data = data.substring(data.indexOf('>') + 1);
        var depth = 1;
        var output = '';
        var temp, i,pos;
        while(depth > 0) {
            temp = data.split('</div>')[0];
            //count occurrences
            i = 0;
            pos = temp.indexOf("<div");
            while (pos != -1) {
                i++;
                pos = temp.indexOf("<div", pos + 1);
            }
            //end count
            depth=depth+i-1;
            output=output+data.split('</div>')[0] + '</div>';
            data = data.substring(data.indexOf('</div>') + 6);
        }
        var $this = this;
        $this.html(output);
        callback && callback.call($this, data, isCached);
    }
});

function ajax_cancel(){
    try {
        if($.pjax.xhr) $.pjax.xhr.abort();
    } catch(err) {}
    $('#preloader').fadeOut();
}

function old_friend(){
    var str = '<div id="reback">&#36825;&#31687;&#25991;&#31456;&#24744;&#24050;&#32463;&#30475;&#20102;&#22909;&#22810;&#36941;&#65292;&#19968;&#23450;&#21463;&#30410;&#21290;&#27973;&#21543;&#65311;</div>';
    if(location.href==base_url || (location.href+'/')==base_url){
        str = '<div id="reback">&#32769;&#26379;&#21451;&#65292;&#20320;&#21448;&#22238;&#26469;&#20102;&#12290;</div>';
    }
    $('#main').prepend(str);
    setTimeout(function(){ $('#reback').remove();},5000);
}
// 消除鏈接虛線
$('a,input[type="submit"],button[type="button"],object').bind('focus',function(){if(this.blur){ this.blur();}});
$('body').append('<div id="jquery-things"><div id="gotop">^ TOP</div><div id="preloader"><div id="loading"></div></div></div>');
if(window.location.hostname!=host_name) location.hostname=host_name;
$(document).ready(function() {

    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });

    $('#gotop').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });

    $('#preloader').delegate('.cancel','click',function(e){
        e.preventDefault();
        ajax_cancel();
    });

});
