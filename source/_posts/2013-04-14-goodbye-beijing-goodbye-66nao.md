---
date: 2013-04-14
layout: post
title: 北京，我将要离开你。挥别66脑
categories: diary
tags: [suggestion, career]
thread: 254
toc: true
---

其实我不怎么喜欢北京，不是因为北京的人情不好，而是这里的环境太恶劣了。自从来了这里，每天都是在拉肚子中度过，每次刷牙都是满嘴的血沫子，指甲盖也劈了好几次。

终于，我选择了离开北京。也离开我现在所在的团队。我们的团队是一群很出色的人聚集的团队，我们的产品却一直迟迟没有上线。作为技术合伙人，我和经理华东在对产品的定位上有着很大的偏差。人生嘛难免有分歧，谁都是有理想有抱负的人。完美的东西，我们谁都想追求，只是代价太高，时间太长。只是歧路坎坷，没有必要太过计较对与错。我尊重华东，更尊重华东想要的完美产品，只是我的能力给不了他。所以，也差不多该是离开的时候了。

<!-- more -->

---

我已经不只一次提出建议，我们的脑训练产品应该先有产品的核心价值，实现一套完整的商业模式，才是第一步的工作重心。具体可以通过技术方面的深入，来提升我们产品的价值。零零散散提过许多想法，好好总结一下：

## 一、数据库设计优化环节建议

最吸引我加入智精灵教育科技团队的，不是待遇的优厚，不是福利的完整。而是大脑信息库相关的介绍。从我来这里之前我就强调了，数据的价值是不可斗量的。我希望我的工作重心都放在数据库上，比如从一开始就对数据库进行设计，避免冗余数据。但是我们从来不讨论数据库优化的环节，甚至不过问数据查询的优化，和数据采集的细节。当然，我们有足够的理由忽略这个环节。我们需要上线，那么实现功能即可。这样的话，不仅会产生大量的冗余数据，也会忽略很多关键数据的采集。

虽然华东说，我们不用管未来大数据量时候的事情，到时候重新设计，再做转移。我确实不逊地反驳了他很多，但是这句没有。因为这确实是能够实现的，但代价有多大，懂点技术的人应该都会了解。或许冗余的数据在转移的时候不会造成太大的影响，但数据的一致性、完整性该如何保证？我举个例子，当我们在脑信息库（转移后的新数据库）中需要分析某个年龄段某种职业下的人群的某种脑能力分布情况，而我们在测评中的数据，和用户信息库中年龄、职业信息不能够一一对应的时候，这些数据还有价值吗？我只是举一个例子，或许这样的事情不会发生，但难免会有同类的问题出现。如果这样的话，那我们的人群中的排名就只能依赖公式猜想的正态分布值来估算吗，那真正精确的分布曲线该怎么从我们已有的数据中计算出来呢？

---

## 二、性能优化环节建议

我在本地的测试环境上，经常会出现这样的情况，一个页面加载了好几秒才能够完成。那么产品上线之后面对大量用户该怎么办？平均每个页面都会有很多次的查询，比如顶部的导航栏，边栏，训练里面的数据查询，可能还有底部和其他，往往一个页面对数据库的查询多达几十次。当然，用 Ucenter 本身是可以静态化来提高速度的。但是反复的数据查询、提交，当用户稍微有些累积的时候，可能就会出现问题。当然，我们依然有足够的理由忽略这个环节。我们需要上线，那么功能实现即可。

反正 99%的网站在遇到性能问题之前已经死了，所以只要功能实现了就行。那么，我们真的就只是奔着那 99%的路去的？这个问题其实根本没有讨论的空间，因为轶平也总是说，功能实现了就行。到时候再说吧。那好吧，也放放。

---

## 三、原型先上线的建议

其实我并不确切了解之前产品的进度是什么样，我也觉得没有太多必要去过问。因为我看过开始给我的一些文档，觉得实现起来并不困难。而且，约定了封闭开发一个月，清明节之前上线。虽然我也感觉有点紧，但是稍微加加班，赶赶进度，也是能完成的。当然，我说的这是在没有加所谓的角色和情节之前。后来，给训练程序加上了角色和情节，就很随意的，一个月的工期变成了两个月，而且我们也都很明白，两个月，其实也很紧张，几乎是没有太大希望能在五月初上线的。我也给华东举过很多小工作室和微博应用成功的例子，最初上线的只是一个简单的原型，比如微博统计的应用，最初很粗糙，而且速度也很慢，但是它的特色吸引了很多用户。后来，才不断美化，不断优化，变成了一个既好看又效率高的微博管理应用。

华东想要一个完整的产品，这个想法是好的。既好玩，又能体现科学性，第一版能够这样上线也确实不错。但是科学性的体现，我个人觉得，真的没有办法从所谓的正反馈中彰显出来。对了一题得了 10 分就得了 10 分吧，非要闪个动画蹦一下消失掉，非要给个小星星，其实一开始还想要小星星飞出来的动画效果，还要给小闪电。不是我不愿意做这些花里胡哨的东西，只是我真的没有弄明白，加上这些东西，我们的产品就有科学性了？而且，得了多少闪电，得了几颗星星，最后训练完了是不会提交到数据库的。训练程序其实早就做好了，但为了正反馈需要根据反应时间而加上闪电的奖励，去大动干戈，这除了让产品不断推迟上线，还能有什么其他立即能看到的效果呢？

正反馈的最终效果究竟怎么样，这个我不好给评价，但眼下推迟一天上线，产品的价值变减少一分，这个我个人觉得非常严重的一个问题，我真心建议领导能够多多关注一下。而且另外，我还想多分享一点个人的见解。常言道，萝卜青菜，各有所爱。我其实也建议过，先不加角色和情节。等到以后改版重做的时候，再把这些好的创意融入到下一个版本的产品中去。 这不仅仅是为了提前交工，也是根据长尾理论触发来考虑的。

摘一段百度百科的解释先：

> 长尾理论（The Long Tail）是网络时代兴起的一种新理论，由美国人克里斯·安德森提出。长尾理论认为，由于成本和效率的因素，当商品储存流通展示的场地和渠道足够宽广，商品生产成本急剧下降以至于个人都可以进行生产，并且商品的销售成本急剧降低时，几乎任何以前看似需求极低的产品，只要有卖，都会有人买。这些需求和销量不高的产品所占据的共同市场份额，可以和主流产品的市场份额 相比，甚至更大。

过去人们只能关注重要的人或重要的事，如果用正态分布曲线来描绘这些人或事，人们只能关注曲线的“头部”，而将处于曲线“尾部”、需要更多的精力和成本才能关注到的大多数人或事忽略。例如，在销售产品时，厂商关注的是少数几个所谓“VIP”客户，“无暇”顾及在人数上居于大多数的普通消费者。而在网络时代，由于关注的成本大大降低，人们有可能以很低的成本关注正态分布曲线的“尾部”，关注“尾部”产生的总体效益甚至会超过“头部”。例如，某著名网站是世界上最大的网络广告商，它没有一个大客户，收入完全来自被其他广告商忽略的中小企业。安德森认为，网络时代是关注“长尾”、发挥“长尾”效益的时代。

出于对互联网的了解，我觉得数据非常重要，这也导致了用户的重要性，因为数据的来源主要是用户。既然萝卜青菜各有所爱，那么为何不在第一版产品中，训练产品都已原型的形式出现？虽然略显枯燥，但这是训练本身，虽然不可能让用户喜欢，但如果对此反感，即使再好的角色情节设计，他也不会坚持玩，因为他就是反感这个训练。当然，聪明的人明显能从这话里发现破绽，因为角色情节的设计吸引他来玩也是可能的。但注意我也有加限定词，是坚持，不可能坚持，因为他对训练本身没有任何兴趣。反过来，一些用户可能会因为设计的角色、情节不对他们的胃口，也连坐反感我们的训练程序，使之不能坚持下去。这岂不是出力不讨好的一件事情吗？

我听说了，之前也调查过一批人，将产品打回来，说没什么兴趣，那个我也看过，确实不能提起任何兴趣。但这跟训练没有什么关系，跟有没有角色和情节也没有任何关系，只是界面的人机交互用户体验实在是太差。简单说，就是丑，太简陋。其实现在这个模板框架的设计已经很大气了，训练程序只要简单的 UI 美化一下，完全可以作为第一个版本上线来接受市场的考验。在没有任何用户的时候，应该优先考虑的是将用户最大化，哪怕只是来玩一次两次，至少也算个有效用户了，而不是说为了用户粘度，在没有用户基础的时候就放弃掉一部分用户，来黏住小部分用户。我曾经经常在说感情的时候会说，普遍撒网，重点捞鱼也是这样的道理，你要先撒大网捞，然后才去考虑扔掉你不想要的小鱼啊。一开始就有针对性地撒个小网，怎么可能捞上许多大鱼呢对不对？

---

## 四、关于技术选用的建议

确实，创业初期资金是一个很大的问题。我能理解，但我也经常对华东说这样一句话：为了赶进度而采用一些比较容易上手的技术，往往只会让进度拖延；同样，为了解决成本而采用一些跨平台的技术，往往也不能真的把成本节约下来，并且很可能就根本实现不了理想中要的效果。对于技术的选用，在公司里我应该最有发言权。因为我接触编程非常早，从小学，turbo basic，到现在公司用的 php，和公司没有用的其他主流技术。我没有说我们用的哪种技术不好，也没有说哪种技术非常好非用不可。同样，我也并没有为了图方便而让公司多浪费钱，也没有为了追求完美而要加大投入成本。所以，对于技术的选用，我多分享一些我的心得，毕竟是个技术人嘛。

首先，是 UC Home 和 PHP 用不用的问题。我的答案是 PHP 可以用，也可以不用，但 UC Home 是完全没必要用的。不仅仅是因为基于 UC Home 的二次开发对训练和测评的功能性扩展有着很大的束缚，还有 UC Home 本身是一个社交类的产品，而我们的产品主要特色并不在社交关键词上，便会有一种本末倒置的感觉。现有的社交类产品非常多，那么我们在融入社交元素的时候，也要考虑到社交环节的特色。不然的话，不仅不能够提高用户的粘度，反而会适得其反。PHP 也还行，但是我更加推荐用 ASP.NET，我觉得更贴近我们的开发。Visual Studio 自带的代码提示功能和 TFS 代码控制非常方便，而且我们对于数据库的设计不明确，这对用 ASP.NET 分层模式开发来讲，比 PHP 中对封装的修改要方便得多，甚至可以利用工具生成代码，而降低工作量。

其次，是关于 HTML5 和 Flash 的。flash 确实是一种快要落伍的技术，而且我也压根懒得去了解它，但不代表它现在已经落伍了。同时，html5 的兼容性非常差，毕竟它是一门未来技术。几年后的互联网，一定是属于它的，但现在，这一天并没有到来。这也是为什么 Lumosity 中使用了大量的 HTML5 来提升用户体验，但训练程序依然是用 Flash 做的原因之一。如果我们率先采用 HTML5 或 JS 来实现训练测评的全部功能，那在 Flash 训练测评的基础之上，效果会更好。所以，在放弃 Flash 的时候，其实我们就已经把 IE 6、7、8 和 360 XX 浏览器也一起放弃掉了。不然，想想，又能兼容各种智能手机，又想兼容 IE 和什么 360，怎么可能？当然也是可能的，但是做这样那样的 Hack，成本真的会比用 Flash 还低吗？而且效率真的会高过 Flash？当然不能只是说运行的效率，运行效率或许 JS 在 Client 上会快很多，但崩溃的几率也大，还有不容忽视的，就是开发效率。HTML5 的硬伤就是没有开发调试的 IDE（JS 也差不多，根本找不到一个好的 IDE），一下子 Flash 又可以沾沾自喜出来了，如果它真的没什么优势的话，我想它今天已经不存在了。而且，即使是较新的一些不是主流的浏览器，也不能完全兼容 HTML5 和 CSS3 的大部分特性，虽然 CSS3 能够实现很多动画的效果。而且对于用户体验来讲，目前使用 JS 这种训练测评程序，会有很大的硬伤，暂时还是没法跟 Flash 实现的东西拼的。所以，我至今不是很明白到底是出于什么原因我们的产品把 Flash 给淘汰掉了。但也就只是不明白，想想而已。

然后，就是 PhoneGap。PhoneGap 和 HTML5 类似，它也是属于未来的。曾有人提出这样的说法，未来是 iOS 的，更是 Android，归根结底还是 PhoneGap 的。虽然未来的 App Store 中，也许可能大概，苹果官方会放宽对 Web App 的审入，但至少目前没有，那么我们想要一步到位同时发布到 iOS 和 Android 上，这就有点不切实际了。虽然苹果很冠冕堂皇地说了，不会因为 App 使用的用户界面基于 HTML 而去拒绝一个应用。虽然这种情况更为常见，但这并不是最主要的一个劣势。像我们知道的常用手机 Apps，比如 QQ，微博，Facebook，人人，都是如出一辙，用的是 Native 开发，为什么呢？因为 PhoneGap 目前尚且实现不了一些 Native 的特效。而且这种实现不了不同于 HTML5 的兼容性，能在部分兼容的上面跑，而是根本无法实现。既然这些大公司都还没有抢先吃这口螃蟹，我们何必要拿我们的产品做这种不一定成功的尝试？而且虽说 PhoneGap 做的话只要做一次，不用针对 iOS 和 Android 分别做两次开发，但是除了将两个分工完成的工作扣到了一个人的头上，其他也没什么可减少的，无论项目周期还是开发成本。

---

## 五、其他建议

关于成本，我并没有要求预算更大化，或是预算内最大化。我总是希望能省则省，尤其是吸收经验这种事情，我个人觉得是完全没有必要跟金钱挂钩的。华东常说的几句话是，我们是创业公司，一开始没有什么资金实力。就当花钱买个经验吧。我们是创业公司，这钱不花怎么能学到经验。我倒不是因为给我的工资很低让我觉得很憋屈，而是真心不希望公司浪费预算。就比如说设计师吧，定了换到现在也不知道有没有个准数。而且先前那个设计师，说工资拿得那么高而却连简单的切图做 html 都不会，这让我真心没看懂他那么高工资是怎么拿到的。当然，这里我也有点愤青了，我承认是我的不对，既然我也意识到我的错误了，也容我多吐槽一句吧，想我堂堂技术出身，苦学实干了那么多年，掌握熟悉的技能也好多样了才拿那么点微薄的工资，真是苦逼啊！而且，从后来外包和不断面试新招的人来看，抛开审美不谈我承认这个审美是不好评论的，但是就技术而言，好像都没有把图切完了给过我 html，也没见过有根据浏览器分辨率给过我不同尺寸的图，当然，更没见过把图切了之后最后根据 web 优化拼成一张完整的图给我的。至于究竟是什么原因，还是对这些设计师褒赞有嘉，这点我是真的不得而知不得而知啊……我这话绝对没有讽刺意味，因为我没法不承认，每一个我接触到的设计作品，都是很大气清新的。只是对于我们创业团队而且还是做 web 产品的来说，切图啊，转 html 啊，再优化啊这些都是要人来做的，所以我更希望在考察设计师的时候更多关注技能，而不是设计风格。当然啦，我的原因还是那句俗话，毕竟萝卜青菜各有所爱嘛。

不积跬步，无以至千里；不积小流，无以成江海。所以我觉得，一个产品，需要从很多细节的角度完善，才能成为一个好的产品。我这里说的细节，主要是针对技术核心和商业价值等一些需要重点关注的环节来说，不包括角色和情节的设计细节。

我只是表达个人意见，没有什么决定权。所以最后当然是要尊重领导的意见了。领导说，想要做一个具备科学性的，又要好玩、又要好看，不仅有训练、测评功能，又有社区互动环节，同时又能保持用户粘度的脑训练产品。这谁不想呢，当然也是我最大的愿望。很不幸的是，这不是在原型上线之前就能够实现得了的。假如我们真的实现了，也许是一件让人欢欣的事情。然而，我们依然会面对一个头疼的问题，那就是我们的产品有那么多形容词做定语，那么多功能点做扩充，那么我们就把特色给弄丢了。因为我们既不可能把科学性、好玩、好看、用户粘度高、社交功能作为我们的特色，也不能让用户主观猜测我们系统的特色究竟是什么。甚至，作为一个产品缔造的参与者，我也不能很好的定位出一个这么多形容词，这么多功能点的一个初期产品，究竟什么才是我们产品的特色。

---

当不断发现现有产品环节中的各种问题存在，并且没有得到很好的解决。我只能否定掉这个产品了。虽然我个人并不能代表市场，但市场的最终考验的答案，对我来说并不是那么重要了。作为一个技术人，从技术的角度出发，我们现在的产品，已经失败了。我并不是那么悲观的一个人，推翻，对我来说，只是一个新的开始。而且对于互联网行业来说，这也应该是个屡见不鲜的事情。重做，有的时候看上去是在浪费成本，但也可能，只是为了节约成本的考虑，不是吗？

梦想可以很渺远，但是理想必须很现实。退一步说，理想可以很丰满，但是产品必须先骨感。但没有一个好的产品是从一大堆定语开始的。我相信有一天，66 脑产品会变成一个好的产品。因为经过我手的产品和项目，就没有失败的。所以这个产品，虽然目前没上线，上线也不一定立马成功，但绝对不会失败的。

虽然我在这边的几个月里，提的建议一条没有被接受过，但对我来说，依然是一段宝贵的成长经验。进 66 脑的时候，我投的是技术合伙人/CTO 的职位。在最初和华东谈的时候也谦虚的说了，可以先把我当项目经理一起成长。但是很可惜，我在这里一点决策权也没有，甚至连话语权其实也形同虚设。因为总是在苦口婆心地说，但从来没有实现到产品中去。后来我是真的懒得再说了其实，但出于对产品的负责，我还是经常重复地念叨。其实说实话，我心也有不甘。因为华东毕竟也是听进过别人很多意见的。比如，某位专家说，要做得好玩又好看，然后我们产品就加了两个定语。再比如，某位专家说 JS 实现跨平台应用非常方便，于是 Flash 死了。但是有什么办法呢，对于这个团队，还有这个产品，我已经尽心尽力了。虽然晓怡总是说，你努力了吗？我怎么没有看到你的付出。这我可以毫不谦虚的说，我就是那种可以为了一个好的结果，不图回报，默默奉献的那种人。我的工作效率非常高，这毋庸置疑，别人一周完成的工作，我可能只要半天就能完成。低调做人，高调做事，宝剑锋自磨砺出，效率高我必须高调。但并没有因为我的效率高，我就荒废了时间不去努力。我是个很会分配时间的人。华东偶尔会看到我玩游戏，也说我工作不上心。我和聪颖解释过，我是在研究游戏中的匹配规则，看和我们的排名有什么区别，也是为了验证能力的分布并不是呈标准正态分布的。同时，也是为了通过团队竞技，锻炼我的团队合作能力，增强团队意识，这不也是在工作嘛。我为这个团队付出了很多，不仅仅是付出了这上面列出来的那么多杂乱的建议，我也一直都在闲暇的时间里，考虑产品的规划，设计了一套产品框架的草稿，细化到系统模块和用什么技术去实现，后来轶平继续做了。如果只从任务角度来说，不仅我从来没有将我手头的工作延期完成，反而都是超前完成，这怎么能说我不够努力呢。除此之外，其实我也从大街网上推荐过好几个设计师和程序员了，我从大街网上收到了近 300 封简历，认认真真地每一个都仔细看完，筛选出了那么十几个给华东和晓怡参考。其实有好几个，我真的觉得很优秀，但后来，都没有后来了。就这样，我就成了一个既没有决策权，又没有在努力的一个闲人了。

我现在的工资是 5000，还是我主动要低点的，因为我选择了期权。但后来仔细斟酌了好久，发现我其实亏大了。因为期权这个东西，不是股权，它不是永久的，而且对于我们现在连产品都没有的创业公司来讲，是没有效益的，所以即使我有了 50%的期权，只是一个数字而已，对一个职员来讲，并没有任何意义。而且，反过来说，即使我没有选期权而要求更高工资的话，公司为了留住人才，以后也依然会主动给期权我的。所以毕竟对期权这概念不了解，就糊里糊涂地被绕进去了。我不是那么斤斤计较的人，我把这个分析出来只是因为想必也不会有多少人耐心看到这里，如果有误打误撞进来看到并且耐心看到这里的话，不是刚毕业，就是跟我一样内心闷骚的技术宅，分享一点心得也算是惺惺相惜吧：进公司之前谈待遇的时候，跳过期权的话题吧。

只有先对自己负责，才能对产品负责。我今年已经 25、6 岁，由于前一段时间境遇的不顺，害父母也跟着操心。我想要成家立业，安定下来。按我现在的工资来算，无论是在北京还是在南京，几个月不吃不喝，也不够买房子的一平米。我很想买套房，然后成个家。所以我不允许自己荒废青春，面对这样一个产品，一耗再耗，我怕我等不起它成功的那一天。

再见，北京。如果有期望，我再回来看您。
