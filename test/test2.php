<?php

$tmpArr = array('worinima', '1626951933', '454320100');
sort($tmpArr, SORT_STRING);
$tmpStr = implode($tmpArr);
$tmpStr = sha1($tmpStr);

echo $tmpStr;