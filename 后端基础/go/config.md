# 环境安装

.zhsrc 环境变量安装

```bash
# 多个环境变量中间用冒号隔开
export PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>

export GOPATH=$HOME/go  # work path
export PATH=$PATH:$GOPATH/bin # bin
```

## 目录

bin: 存放编译后可执行的文件。

pkg: 存放编译后的应用包。

src: 存放应用源代码。

## 命令

```bash
  bug         start a bug report
	build       compile packages and dependencies
	clean       remove object files and cached files
	doc         show documentation for package or symbol
	env         print Go environment information
	fix         update packages to use new APIs
	fmt         gofmt (reformat) package sources
	generate    generate Go files by processing source
	get         add dependencies to current module and install them
	install     compile and install packages and dependencies
	list        list packages or modules
	mod         module maintenance
	run         compile and run Go program
	test        test packages
	tool        run specified go tool
	version     print Go version
	vet         report likely mistakes in packages
```
