<?php
// +----------------------------------------------------------------------
// php基础api例子
// +----------------------------------------------------------------------

function dump()
{
  $arg_list = func_get_args();

  echo '<div> ------------------------------------------------ </div>';
  foreach ($arg_list as $arg) {
    echo '<div>';
    print_r($arg);
    echo '</div>';
  }
  echo '<div> ------------------------------------------------ </div>';
  echo '<br>';
}


/**
 * 时间类
 */

// 返回当前时间戳
$res = time();
dump('time()', $res);

// 格式化 Unix时间戳
$timestamp = time();
$res = date('Y/m/d h:i:s', time());
dump($timestamp, 'Y/m/d h:i:s', date('Y/m/d h:i:s'));


/**
 * 字符串
 */

// 寻找字符串在另一个字符串中的位置
$str = 'how are you';
$index = strpos($str, 'are');
dump('strpos', $index);

// 截取str（按位置）
$fragment = substr($str, 4, 3);
dump('substr', $fragment);

// 截取str（按按字符子串）
// 从寻找的位置截取到末尾
$fragment = strstr($str, 'are');
dump('strstr', $fragment);
// 从开头截取到第一次出现的位置前
$fragment = strstr($str, 'are', true);
dump('strstr before_needle', $fragment);


/**
 * 数组
 */
$a = [18, 17];
dump('数组下标1是否存在', var_export(array_key_exists(1, $a), true));
dump('数组下标5是否存在', var_export(array_key_exists(5, $a), true));

dump(strtotime('now'));

dump(gettype(3.2));