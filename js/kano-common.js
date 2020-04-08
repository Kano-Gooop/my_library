/**
 * 常用函数库（公共）
 */

// 获取url参数对象
function get_params() {
  let url = location.search;
  let params = {};
  if (url.indexOf("?") !== -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      let kv = strs[i].split('='); // key 和 value
      params[kv[0]] = unescape(kv[1]);
    }
  }
  return params;
}

/**
 * 时间格式化
 * @param time  Date对象或者时间戳（秒时间戳，不是毫秒时间戳）
 * @param fmt  格式化字符串
 * @returns {string}  返回格式化后的字符串
 */
function time_format(time, fmt = 'yyyy-MM-dd') {
  if (time) {
    // 如果是数字类型
    if (typeof time === 'number') {
      time = new Date(time * 1000);
    }

    var o = {
      "M+": time.getMonth() + 1,               // 月份
      "d+": time.getDate(),                    // 日
      "h+": time.getHours(),                   // 小时
      "m+": time.getMinutes(),                 // 分
      "s+": time.getSeconds(),                 // 秒
      "q+": Math.floor((time.getMonth() + 3) / 3),  // 季度
      "S": time.getMilliseconds()              // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  } else {
    return '';
  }
}

/**
 * 将秒数格式化成可读性高的字符串
 * @param second  要格式化的秒数
 * @param format  格式化字符串
 * @returns {string}  被格式化的字符串
 */
function second_format(second, format = 'dd天hh小时mm分ss秒') {
  let d, h, m, s;  // 日 小时 分钟 秒

  d = Math.floor(second / 86400) + '';
  second %= 86400;
  h = Math.floor(second / 3600) + '';
  second %= 3600;
  m = Math.floor(second / 60) + '';
  s = second %= 60 + '';

  console.log(d, h, m, s);
  
  return  format.replace(/(d+)|(h+)|(m+)|(s+)/g, (match, day, hour, minute, second) => {
    if (day) return ('0' + d).slice(-Math.max(day.length, d.length));
    if (hour) return  ('0' + h).slice(-2);
    if (minute) return  ('0' + m).slice(-2);
    if (second) return  ('0' + s).slice(-2);
  });
}

function repeat(str, count) {
  return Array(count + 1).join(str);
}