# FROM：定制的镜像都是基于 FROM 的镜像;
# 这里的 nginx 就是定制需要的基础镜像。后续的操作都是基于 nginx。
FROM nginx

# RUN：用于执行后面跟着的命令行命令, 类似于在终端操作的 shell 命令
RUN echo '这是一个本地构建的nginx镜像'

# docker build -t nginx:test . // . 是上下文路径, 默认Dockerfile所在位置

# 跟写shell脚本类似
# https://www.runoob.com/docker/docker-dockerfile.html

# yaml语言
# https://www.runoob.com/w3cnote/yaml-intro.html