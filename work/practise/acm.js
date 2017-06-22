/**
 * @param {any} arr 源数组
 * @param {any} arrIndex 源数组起始位置
 * @param {any} dest 目标数组
 * @param {any} destIndex 目标数组起始位置 
 * @param {any} length 拷贝元素个数
 * @param {return} 返回目标数组
 */
function copy(arr, arrIndex, dest, destIndex, length) {
    for (let i = arrIndex; i < arrIndex + length; i++) {
        dest[destIndex] = arr[i];
        destIndex++;
    }

}

/**
 * @param {any} 返回 数组中根据对象字段排序
 * @param {any} property 字段名称
 */
function compare(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}


/**
 * @param {any} data 数据
 * @param {any} city 相同字段
 * @param {any} location 不同字段（想要合并的字段）
 */

let data = [{
    name: '总数',
    age: 122,
    value: 86
}, {
    name: '胜率',
    age: 12,
    value: 36
}, {
    name: '团队',
    age: 192,
    value: 26
}, {
    name: '月份',
    age: 52,
    value: 77
}, {
    name: '二段',
    age: 2,
    value: 76
}, {
    name: '合并',
    age: 5,
    value: 16
}, {
    name: '商飞',
    age: 73,
    value: 6
}];
data.reduce(function(pre, current, index) {
    pre[current.city] = pre[current.city] || [];
    pre[current.city].push(current.location);
    return pre;
});

/**
 * @param {any} arr 数据
 * @param {any} size 分隔组数
 */
function chunk(arr, size) {
    var result = [];
    var a = [];
    for (var i = 0; i < arr.length; i++) {
        a.push(arr[i]);
        if (((i + 1) % size == 0) || (i == arr.length - 1)) {
            result.push(a);

            a = [];
        }
    }
    return result;
}


// ====================================================================================================================================================================================================================================================================

window.onload = function() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let dest = [];

    for (var i = 0; i < 10; i++) {
        dest.push(0);
    }

    console.log(dest);
    copy(arr, 2, dest, 5, 4);
    console.log(dest);


    let data = [{
        name: '总数',
        age: 122,
        value: 86
    }, {
        name: '胜率',
        age: 12,
        value: 36
    }, {
        name: '团队',
        age: 192,
        value: 26
    }, {
        name: '月份',
        age: 52,
        value: 77
    }, {
        name: '二段',
        age: 2,
        value: 76
    }, {
        name: '合并',
        age: 5,
        value: 16
    }, {
        name: '商飞',
        age: 73,
        value: 6
    }];

    function compare(property) {
        return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            let result = value2 - value1;
            return result;
        }
    }
    console.log(data.sort(compare('value')));

    var map = {},
        array = [];
    for (let i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.id]) {
            array.push({
                id: ai.id,
                name: ai.name,
                data: [ai]
            });
            map[ai.id] = ai;
        } else {
            for (var j = 0; j < array.length; j++) {
                var dj = array[j];
                if (dj.id == ai.id) {
                    dj.data.push(ai);
                    break;
                }
            }
        }
    }

    console.log(array);

    var arr2 = [

        { city: "上海", location: "浦东" },
        { city: "上海", location: "静安" },
        { city: "北京", location: "内环" },
        { city: "北京", location: "五环" },
        { city: "苏州", location: "苏州" },
    ];

    // console.log(group(arr2));
}