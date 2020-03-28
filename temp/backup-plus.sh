#!/bin/bash
#1.定义数据库链接,目标库信息
MY_user="root"
MY_host="127.0.0.1"
MY_conn="-u $MY_user -h $MY_host"
#2.定义备份目录，工具，时间，文件名
cmd="/usr/bin/mysqldump"
prefix=$(date +%Y%m%d%H%M%S)
#MY_conn="-u $MY_user -p$MY_pass -h $MY_host"


bf_dir="/root/mysqlbackup/"
if [ ! -d $bf_dir ]; then

        mkdir $bf_dir

else

        echo "$bf_dir already exist"

fi

for loop in "wujin" "zen"
do
	filename="$prefix-$loop"
	$cmd $MY_conn --databases $loop > $bf_dir$filename.sql
	echo $filename"   done"
done

#/bin/tar zcf $name_1.tar.gz $name_1.sql --remove &> /dev/null
#/bin/tar zcf $name_2.tar.gz $name_2.sql --remove &> /dev/null
