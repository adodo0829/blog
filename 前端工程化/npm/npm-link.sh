# https://docs.npmjs.com/cli/v7/commands/npm-link

# npm link是一种把包链接到包文件夹的方式，即：可以在不发布npm模块的情况下，调试该模块，并且修改模块后会实时生效，不需要通过npm install进行安装

# 模块和项目在同一目录下
$ npm link ../module

# 模块和项目不在同一目录下
$ # 先去到模块目录，把它 link 到全局
$ cd ../npm-link-test
$ npm link

$ # 再去项目目录通过包名来 link
$ cd ../my-project-link
$ npm link test-npm-link(模块包名，即：package.json中name)

$ # 解除link
$ 解除项目与模块的link，在项目目录下，npm unlink 模块名
$ 解除模块全局的link，在模块目录下，npm unlink 模块名


# npm link 命令可以将一个任意位置的npm包链接到全局执行环境，从而在任意位置使用命令行都可以直接运行该npm包。

这个命令主要做了两件事：
为npm包目录创建软链接，将其链到 {prefix}/lib/node_modules/<package>，是一个快捷方式
为可执行文件(bin)创建软链接，将其链到 {prefix}/bin/{name}
