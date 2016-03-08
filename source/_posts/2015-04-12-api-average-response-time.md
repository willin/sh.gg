date: 2015-04-12
layout: post
title: API接口性能统计之平均响应时间算法
categories: dev
tags: [logic, js, node.js, algorithm, performance]
thread: 804
---

### 平均响应时间算法

```js
// count,restime
let avg = (restime + parseFloat(val) * (count - 1))/count;
```

经过反复测试，临界值为平均响应时间乘以2万次（如200ms为400万次），不会再变化。

如果当天请求超过平均响应时间乘以2万次，则不应该再计算新值。

<!-- more -->

```js
// count,restime
let avg = count > parseInt(a.toString()[0], 10) * 10E6 ? val : 
          ((restime + parseFloat(val) * (count - 1))/count);
```

再根据平均值变化规律比较：

    第N次请求 请求响应时间ms  真实平均响应时间ms  估算平均响应时间ms 误差时间ms
      100000         845          497.2487          497.2436   -0.0051
      200000         918          498.1223          498.1315    0.0092
      300000         218          498.4573          498.4598    0.0025
      400000         485          498.6902          498.6956    0.0054
      500000         822          498.8887          498.9062    0.0175
      600000         557          498.9837          498.9862    0.0025
      700000         134          499.1102          499.1050   -0.0052
      800000         710          499.1800          499.1870    0.0070
      900000         953          499.2081          499.2134    0.0053
     1000000         208          499.2690          499.2647   -0.0043
     1100000          55          499.1008          499.1059    0.0051
     1200000         948          499.1058          499.1114    0.0056
     1300000         750          499.1675          499.1942    0.0267
     1400000         876          499.2479          499.2886    0.0407
     1500000         253          499.2871          499.3292    0.0421
     2000000         210          499.2330          499.2541    0.0211
     3000000          39          499.1828          499.1958    0.0130
     4000000         718          499.0597          499.0905    0.0308
     5000000         758          499.1318          499.1558    0.0240
     6000000         782          499.0715          499.1010    0.0295
     7000000         485          499.0926          499.1150    0.0224
     8000000         768          499.0867          499.1361    0.0494
     9000000         974          499.0664          499.0814    0.0150
    10000000         715          499.1114          499.0791   -0.0323


前面估算平均响应时间与最终结果的比较：

    第n十万次请求 与最终结果误差ms
      1         -0.2271
      2         -0.7094
      3         -0.1553
      4         -0.3421
      5         -0.0279
      6          0.0584
      7         -0.1672
      8         -0.0973
      9          0.0287
     10          0.0670
     11          0.1468
     12          0.1981
     13          0.1896
     14          0.2556
     15          0.2311
     20          0.2451
     30          0.0722
     40         -0.0506
     50         -0.0816
     60         -0.0248
     70          0.0446
     80         -0.0211
     90         -0.0259
    100          0.0000


大约在10万次请求之后，误差值会小于0.1ms，最大不超过0.4ms，可以接受。

#### 最终算法

    // count,restime
    let avg = count > 10E5 ? val : ((restime + parseFloat(val) * (count - 1))/count);

#### P.S.

测试脚本

```js
var fs = require('fs');

function pad(num, n) {
    'use strict';
    let len = num.toString().length;
    if (len > n) {
        return num.toString().substr(len - n, n)
    }
    while (len < n) {
        num = ' ' + num;
        len++;
    }
    return num;
};

// i,rand
fs.open('./log', 'w', function (err, fd) {
    (function () {
        'use strict';
        let rand, avg, avg2, sum = 0, million = [];
        for (let i = 1; i <= 125 * 10E4; i++) {
            rand = Math.floor(0 + Math.random() * (999));
            sum += rand;
            avg = (sum / 1.0 / i).toFixed(4);
            // i,rand
            let val = (rand + parseFloat(avg2) * (i - 1)) / i;
            // 计算结束
            if (!avg2) {
                sum = rand * i;
                avg = (sum / 1.0 / i).toFixed(4);
                avg2 = rand;
            }
            else {
                avg2 = val.toFixed(4);
            }
            if (i % 10E4 === 0) {
                million.push(avg2);
                fs.write(fd, `${pad(i, 10)}\t${pad(rand, 10)}\t${pad(avg, 16)}\t${pad(avg2, 16)}\t${pad((avg2 - avg).toFixed(4), 8)}\n`);
                console.log(`${pad(i, 10)}\t${pad(rand, 10)}\t${pad(avg, 16)}\t${pad(avg2, 16)}\t${pad((avg2 - avg).toFixed(4), 8)}`);
            }
        }
        million.forEach(function (m, i) {
            fs.write(fd, `${pad(i + 1, 3)}\t${(million[124] - m).toFixed(4)}\n`);
            console.log(`${pad(i + 1, 3)}\t${(million[124] - m).toFixed(4)}`);
        });
    })();
});
```
