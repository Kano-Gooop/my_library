/**
 * 常用函数库（其他）
 * 使用需引入 kano-common.js
 */

// 多久以前的友好式格式化
function ago_text(timestamp) {
  let now_ts = parseInt(new Date().getTime() / 1000);
  let diff = now_ts - timestamp;
  if (diff <= 2592000) {
    // 小于30天
    if (diff < 0) {
      return '刚刚发表';
    } else if (diff < 60) {
      return diff + '秒前';
    } else if (diff < 3600) {
      return parseInt(diff / 60) + '分钟前';
    } else if (diff < 86400) {
      return parseInt(diff / 3600) + '小时前';
    } else {
      return parseInt(diff / 86400) + '天前';
    }
  } else {
    // 大于30天
    if (new Date(timestamp * 1000).getFullYear() === new Date(now_ts * 1000).getFullYear()) {
      // 在今年之内
      return date_format(timestamp, 'MM-dd hh:mm');
    } else {
      // 不在今年之内
      return date_format(timestamp, 'yyyy-MM-dd hh:mm');
    }
  }
}