
# 查看全局包
$ npm list -g --depth=0

$ yarn global list --depth=0

# 对于那些不常使用、或者只想一次性尝试的工具，
# 推荐使用 npx 的方式代替 npm install -g、yarn global 全局安装
$ npx create-react-app my-app

# 执行以上这条命令 npx 会按以下顺序工作：
# 1. 先查看当前项目有没 create-react-app
# 2. 如果当前项目找不到，会去全局查找 create-react-app
# 3. 如果全局还找不到，会帮我们临时从 npm 包仓库安装 create-react-app，不会污染到当前项目，也不会装到全局

$ npm uninstall -g @vue.cli
$ npm install -g @vue.cli

$ yarn global add @vue/cli
$ yarn global remove @vue/cli
