# npm publish a pkg

## publish pkg

1.register a npm account

2.checkout registry

```sh
nrm ls
nrm use npm
```

3.第一发布用 npm adduser (填写你注册的 npm 账号的 username,password,email) 。否则用 npm login

```sh
npm whoami
```

4.npm publish

## update pkg

代码如果有更新,publish 的时候需要更改版本号

1.直接改 package.json

2.npm 指令

```sh
npm version patch  # 补丁版本,最后一位数加1
npm version minor  # 增加了新功能 中间的数字加1
npm version major  # 大改动,不向下兼容 第一位数字加1
```

## delete pkg

```sh
npm unpublish [packagename] --force
```


## 注意事项

name：指定组件包的名称
main：指定组件包的入口文件，比如AMD引入
types：指定组件包类型声明的入口文件
module：指定es module引入时的入口文件
files：指定安装组件包时会下载哪些文件
