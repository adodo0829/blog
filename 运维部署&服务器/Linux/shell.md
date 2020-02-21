## shell脚本命令
通常前端er在服务器上部署项目时会用上 shell 脚本或者 docker, 用来实现自动化部署, 所以还是有必要了解下的;由于精力有限,这里附上别人的总结链接:
[shell语言总结](https://www.cnblogs.com/jingmoxukong/p/7867397.html)

这里附上一个平时用来同步多台服务器下的静态文件用的脚本
```
#!/bin/bash
for name in (192.168.188.xxx 192.168.188.xxxx 192.168.188.xxxx); do
/usr/bin/rsync -avP -e 'ssh -p58422' --delete  /www/www.target.com     root@"$name":/www/
done
```