// 当前时间时间戳 2017/02/25 10:00
var currTimeStamp = Date.parse(new Date());


// 2016-02-06 转换为时间戳
function translateTimeStamp(num) {
    let year = num.toString().slice(0, 4);
    let month = num.toString().slice(4, 6);
    let day = num.toString().slice(6, 8);
    let stringTime = year + "-" + month + "-" + day;
    let time = (new Date(stringTime)).toString();
    let timestamp2 = Date.parse(time);
    timestamp2 = timestamp2 / 1000;
    return timestamp2;
}

// 2017-5-25 16:29:47 转时间戳 10位
function get_unix_time(dateStr) {
    let unixTimestamp = new Date(dateStr * 1000);
    let commonTime = unixTimestamp.toLocaleString();
    return commonTime;
}

// 当前时间时间戳
function getCurrenDate() {
    let currentDate;
    let d = new Date();
    let startYear = d.getFullYear();
    let startMonth = d.getMonth() + 1;
    let startDay = d.getDate();
    if (startMonth < 10) {
        if (startDay < 10) {
            currentDate = `${startYear}/${0}${startMonth}/${0}${startDay}`;
        } else {
            currentDate = `${startYear}/${0}${startMonth}/${startDay}`;
        }
    } else {
        if (startDay < 10) {
            currentDate = `${startYear}/${startMonth}/${0}${startDay}`;
        } else {
            currentDate = `${startYear}/${startMonth}/${startDay}`;
        }
    }

    let date = new Date(currentDate);
    return Number(date) / 1000;
}

function createFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function(num) {
            return function() {
                return num;
            };
        }(i);
    }
    return result;
}

function test(x1, x2) {
    return x1 * x2;
}

// ===============================================================================================================================================

// ajax

function ajax() {
    var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "text",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function() {},
        success: arguments[0].success || function() {},
        error: arguments[0].error || function() {}
    };
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.response)
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data) {
    if (typeof data === 'object') {
        var convertResult = "";
        for (var c in data) {
            convertResult += c + "=" + data[c] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length - 1)
        return convertResult;
    } else {
        return data;
    }
}


// ===============================================================================================================================================

// 数组去重ES6, 0被舍掉
function queue(arr) {
    let newArr = [];
    newArr = arr.filter((x, i, itm) => x && (itm.indexOf(x) === i));
    return newArr;
}


// ===============================================================================================================================================

/**
 * 返回20170325格式
 * @param 本日 - 0
 * @param 本月第一天 - 1
 * @param 本月最后一天 - 2
 * @param 本月天数 - 3
 * @param 本年第一天 - 4
 * @param 昨日 - 5
 * @param 上月第一天 - 6
 * @param 上月最后一天 - 7
 * @param 上月天数 - 8
 * @param 上年第一天 - 9
 * @param 上年最后一天 - 10
 * @param 本日具体时间 - 11
 * @param 前七天 - 12
 * @param 后七天 - 13
 */
function ParamFn() {
    let result = [],

        now = new Date(),
        nextnow = new Date(),
        prevSevenDate = new Date(), //获取今天日期
        year = now.getFullYear(), // 当前年份2017
        month = now.getMonth() + 1, // 当前月份03
        day = now.getDate(), // 天
        hour = now.getHours(), // 小时
        minutes = now.getMinutes(), // 分
        prevDaySeven = [], // 前七天
        nextDaySeven = [], // 后七天
        flag = 1; // 索引

    now.setDate(now.getDate() - 7);
    nextnow.setDate(nextnow.getDate());
    prevSevenDate.setDate(prevSevenDate.getDate() - 7);

    for (var i = 0; i < 7; i++) {
        let dateTempPrev = year + (((prevSevenDate.getMonth() + 1) < 10 ? "0" : "") + (prevSevenDate.getMonth() + 1)) + (((prevSevenDate.getDate()) < 10 ? "0" : "") + (prevSevenDate.getDate()));
        let dateTempNext = year + (((month) < 10 ? "0" : "") + (month)) + ((nextnow.getDate() < 10 ? "0" : "") + nextnow.getDate());
        prevDaySeven.push(dateTempPrev);
        nextDaySeven.push(dateTempNext);
        now.setDate(now.getDate() + flag);
        prevSevenDate.setDate(prevSevenDate.getDate() + flag);
        nextnow.setDate(nextnow.getDate() + flag);
    }

    now.setTime(now.getTime() - 24 * 60 * 60 * 1000);

    // 20170325格式
    let currDay = Number(year + ((month < 10 ? "0" : "") + month) + ((day < 10 ? "0" : "") + day)), // 本天
        currMonthFirstDay = Number(year + ((month < 10 ? "0" : "") + month) + "01"), // 本月第一天
        currMonthEndDay = Number(year + ((month < 10 ? "0" : "") + month) + new Date(year, month, 0).getDate()), // 本月最后一天
        currMonthDays = Number(new Date(year, month, 0).getDate()), // 本月天数
        currYearFirstDay = Number(year + "01" + "01"), // 本年第一天

        prevDay = Number(now.getFullYear() + ((month < 10 ? "0" : "") + month) + ((now.getDate() < 10 ? "0" : "") + now.getDate())), // 昨日
        prevMonthFirstDay = Number(year + (((month - 1) < 10 ? "0" : "") + (month - 1)) + "01"), // 上月第一天
        prevMonthEndDay = Number(year + (((month - 1) < 10 ? "0" : "") + (month - 1)) + new Date(year, month - 1, 0).getDate()), // 上月最后一天
        prevMonthDays = Number(new Date(year, month - 1, 0).getDate()), // 上月天数
        prevYearFirstDay = Number(year - 1 + "01" + "01"), // 上年第一天
        prevYearEndDay = Number(year - 1 + "12" + "31"), // 上年最后一天

        currSheldomDay = year + "-" + ((month < 10 ? "0" : "") + month) + "-" + ((day < 10 ? "0" : "") + day) + " " + ((hour < 10 ? "0" : "") + hour) + ":" + ((minutes < 10 ? "0" : "") + minutes); // 本天

    result.push(currDay, currMonthFirstDay, currMonthEndDay, currMonthDays, currYearFirstDay, prevDay, prevMonthFirstDay, prevMonthEndDay, prevMonthDays, prevYearFirstDay, prevYearEndDay, currSheldomDay, prevDaySeven, nextDaySeven);

    return result;
}


function todayTimeStamp(n, setHours) {
    let temp;

    if (setHours === 0) {
        temp = new Date(new Date().setHours(0, 0, 0, 0));
    } else if (setHours === 1) {
        temp = new Date(new Date().setHours(23, 59, 59, 59));
    } else {
        // todo
    }

    let timeStamp = Number(Number(temp / 1000).toFixed(0));
    let result = timeStamp - 86400 * n;

    return result;
}
// ===============================================================================================================================================

// 时间戳转2017-01-01
function addZero(m){
    return m < 10 ? '0' + m : m;
}

function parseBeginTime(params) {
    let d = new Date(params * 1000);    // 根据时间戳生成的时间对象
    let date = (d.getFullYear()) + "-" + addZero(d.getMonth() + 1) + "-" + addZero(d.getDate()) + " " +  addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getSeconds());
    return date;
}

// ===============================================================================================================================================

window.onload = function() {
    console.log(todayTimeStamp(0, 0));
    console.log(todayTimeStamp(1, 0));
    console.log(todayTimeStamp(6, 0));
}