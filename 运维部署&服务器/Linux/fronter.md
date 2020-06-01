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

## netstat: 监控TCP/IP网络
查看端口使用
```shell
# 列出所有端口情况
netstat -a      # 列出所有端口
netstat -at     # 列出所有TCP端口
netstat -au     # 列出所有UDP端口

# 列出所有处于监听状态的Sockets
netstat -l   # 只显示监听端口
netstat -lt  # 显示监听TCP端口
netstat -lu  # 显示监听UDP端口
netstat -lx  # 显示监听UNIX端口

# 显示 PID 和进程名称
netstat -p

# 显示核心路由信息
netstat -r
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
default         gateway         0.0.0.0         UG        0 0          0 eth0
192.168.130.0   0.0.0.0         255.255.255.0   U         0 0          0 eth0
netstat -rn   # 显示数字格式，不查询主机名称
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.130.1   0.0.0.0         UG        0 0          0 eth0
192.168.130.0   0.0.0.0         255.255.255.0   U         0 0          0 eth0

# 查看端口和服务
netstat -antp | grep ssh
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      734/sshd            
tcp        0     52 192.168.130.20:22       119.129.118.189:58737   ESTABLISHED 1846/sshd: root@pts 
tcp6       0      0 :::22                   :::*                    LISTEN      734/sshd            
netstat -antp | grep 22
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      734/sshd            
tcp        0     52 192.168.130.20:22       119.129.118.189:58737   ESTABLISHED 1846/sshd: root@pts 
tcp6       0      0 :::22                   :::*                    LISTEN      734/sshd            

# 网络抓包工具
tcpdump -nn -i eth0 icmp
```

## 系统信息查看
```shell
# 磁盘容量
df -h

# 系统配置
cat /proc/cpuinfo 

# Linux 系统版本
lsb_release -a # 列出所有版本信息, 适用于所有
# Distributor ID:	Ubuntu
# Description:	Ubuntu 18.04.4 LTS
# Release:	18.04
# Codename:	bionic

cat /etc/redhat-release # 只适合Redhat系的Linux, 如centos

cat /etc/issue # 适用于所有
# Ubuntu 18.04.4 LTS \n \l
```