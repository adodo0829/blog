# linux服务器常用命令

## 连接服务器ssh
```
ssh -p 58422 root@192.168.x.xxx
输入 password: 
```

## 文件目录操作
- 创建
```shell
mkdir www # 在/创建 www
mkdir /www/test/js
```
- 复制
```shell
cp -r www/* test/www/ # www目录下的内容整体拷贝到output目录
cp nginx.conf output/ # 复制了单个文件nginx.conf到output下
```

## 查找进程
```
ps -ef | grep nginx
// master process => nginx 安装所在目录
```

## 查看主机联通
```
ping host
telnet host port
```

## netstat
查看端口使用
```shell
netstat -apn # 查看所有端口的使用情况
netstat -tlnp # 
```