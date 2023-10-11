<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

// 设置一个值
//$redis->set('test', 'hello kano');

var_dump($redis->get('test'));
var_dump($redis->get('test2'));
?>