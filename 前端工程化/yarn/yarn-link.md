# yarn link

可以跨项目，跨文件操作自己想要调试的yarn包，不用每次发布，只要是自己的电脑就可以，因为yarn link 是存在yarn的内存中。

## 生成临时包
在开发的包里文件下（和packagejson同级） 运行 yarn link 
然后会出现 success Registered "xxxx"（包名） 的标志 此时你的开发包已经在内存中

## 使用临时包
在需要应用的项目中 根目录运行  yarn link (包名)，会出现成功提示，随后如果当前项目运行中，会自动重新编译

## 注意
yarn link 前 需要保证你的nodelmodues 或者 lib.js 是最新的; 
需要重新打包build一下, 然后在执行yarn link

## 移除临时包
开发包目录下: yarn unlink
使用包工程目录下: yarn unlink "包名"

