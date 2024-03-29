/**
 * 常用 函数/常量 库（公共）
 */

const reg = {
  tel: /^1\d{10}$/,  // 手机号
  phone: /\d{3,4}-\d{7,8}/,  // 座机（带国家编号）
  email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,  // 邮箱
  natural: /^([1-9]\d*|0)$/,  // 自然数
  positive: /^[1-9]\d*$/,  // 正数
  price: /^([1-9]\d*|0)(\.\d{1,2})?$/,  // 金额（两位小数点）
  zh: /[\u4e00-\u9fa5]+/  // 中文
};

// 获取url参数对象
function get_params(url) {
  // let url = location.search;
  let search;
  if (url) {
    [, search] = url.split('?');
  } else {
    search = location.search.substr(1);
  }

  let params = {};
  if (search) {
    var strs = search.split("&");
    for (var i = 0; i < strs.length; i++) {
      let kv = strs[i].split('='); // key 和 value
      params[kv[0]] = decodeURIComponent(kv[1]);
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
      time = new Date(time);
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

  return format.replace(/(d+)|(h+)|(m+)|(s+)/g, (match, day, hour, minute, second) => {
    if (day) return ('0' + d).slice(-Math.max(day.length, d.length));
    if (hour) return ('0' + h).slice(-2);
    if (minute) return ('0' + m).slice(-2);
    if (second) return ('0' + s).slice(-2);
  });
}

// 重复一个字符串n次
function repeat(str, count) {
  return Array(count + 1).join(str);
}

// 将字符串转成 unicode 序列
function unicode(str) {
  var arr = []
  for (var i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i).toString(16));
  }
  return arr;
}

// 统计字符串中各个字符出现的频率
function frequency(str) {
  let obj = [];

  for (let char of str) {
    if (!obj[char]) {
      obj[char] = 1;
    } else {
      obj[char]++;
    }
  }

  return obj;
}

// 深克隆
function deep_clone(target) {
  let result;
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      result = [];
      for (let i in target) {
        result.push(deep_clone(target[i]))
      }
    } else if (target === null) {
      result = null;
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      result = {};
      for (let i in target) {
        result[i] = deep_clone(target[i]);
      }
    }
  } else {
    result = target;
  }
  return result;
}

// 动态添加一个<script>
function load_script(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

// 随机整数
function random_integer(amount, min = 0, max = 10000) {
  let arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}