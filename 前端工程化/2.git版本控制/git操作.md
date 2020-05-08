# git常识

## .gitignore文件
用来设置忽略文件, 不用提交到仓库
- 示例
```shell
.DS_Store
node_modules
/dist

/tests/e2e/videos/
/tests/e2e/screenshots/
/tests/**/coverage/

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*
```

# 常用命令集合

## 配置
#### 配置查看
```shell
# 查看全局配置列表
git config -l
# 查看局部配置列表
git config --local --list

# 查看已设置的全局用户名/邮箱
git config --global --get user.name
git config --global --get user.email

# 设置全局用户名/邮箱
git config --global user.name "xxxx"
git config --global user.email "example@example.com"

# 设置本地当前工作区仓库用户名/邮箱
git config --local user.name "xxxx"
git config --local user.email "example@example.com"
```

#### 绑定ssh key
- ssh key
```
# 1、粘贴以下命令，替换为您的电子邮件地址
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 2、当提示“输入要在其中保存密钥的文件”时，按Enter。接受默认文件位置。
> Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]

# 3、在提示符下，键入一个安全密码。
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
```
- add
```
# 1、编辑
vim ~/.ssh/config

# 2、粘贴下面到 config 文件中
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```

## 仓库相关
#### 仓库初始化
```shell
# 会在当前目录生成.git
git init 

# 查看远程仓库地址
git remote -v
```
#### 文件状态
```shell
# 查看文件状态
git status

# 以短格式给出输出
git status -s
```
#### 查看日志
```shell
# 查看完整历史提交记录
git log

# 查看前N次提交记录 commit message
git log -2

# 查看前N次提交记录，包括diff
git log -p -2

# 搜索关键词
git log -S js

# 只显示合并日志
git log --merges

# 以图形查看日志记录, --oneline 可选
git log --graph --oneline

# 列出提交者贡献数量, 只会打印作者和贡献数量
git shortlog -sn

# 以提交贡献数量排序并打印出message
git shortlog -n

# 采用邮箱格式化的方式进行查看贡献度
git shortlog -e

# 查看 README.md 文件的修改历史记录，包括时间、作者以及内容
git blame README.md
```
#### 克隆
```shell
# https 协议
git clone https://github.com/demo/git-manual.git

# SSH协议
git clone git@github.com:demo/git-manual.git

# 克隆某个分支dev， -b 指定分支名字
git clone -b dev https://github.com/demo/git-manual.git

# 递归克隆，如果项目包含子模块就非常有用
git clone --recursive git@github.com:demo/git-manual.git

# 克隆深度为1, 不会把历史的记录也克隆，这样可以节省克隆时间
git clone --depth=1 https://github.com/demo/git-manual.git
```
## 分支相关
#### 查看分支
```shell
# 查看所有分支
git branch -a

# 查看本地分支
git branch

# 查看远端分支
git branch -r

# 查看本地分支所关联的远程分支
git branch -vv

# 查看本地 master 分支创建时间
git reflog show --date=iso master
```
#### 创建分支
```shell
# 创建develop本地分支
git branch develop

# 创建本地develop分支并切换
git checkout -b develop

# 创建远程分支, 实际上创建本地分支然后推送
git checkout -b develop
git push origin develop

# 创建一个空的分支, 不继承父分支，历史记录是空的，一般至少需要执行4步
git checkout --orphan develop
# 这一步可选，如果你真的想创建一个没有任何文件的分支
git rm -rf .
# 添加并提交，否则分支是隐藏的 （执行这一步之前需要注意当前工作区必须保留一个文件，否则无法提交）
git add -A && git commit -m "提交"
# 推送到远程
git push --set-upstream origin develop
```
#### 切换分支
```shell
# 2种方法，切换到master分支
git checkout master
git switch master

# 切换上一个分支
git checkout -

# 切换远端分支
git checkout -t origin/dev
```
#### 删除分支
```shell
# 删除本地分支
git branch -d <branchName>

# 删除远程分支
git push origin :<branchName>
```
#### 重命名分支
```shell
# 重命名当前分支, 通常情况下需要执行3步
# 1、修改分支名称
# 2、删除远程旧分支
# 3、将重命名分支推送到远程
git branch -m <branchName>
git push origin :old_branch
git push -u origin new_branch

# 重命名指定分支
git branch -m old_branch new_branch
```

## 文件操作
#### 暂存
```shell
# 暂存所有
git add -A

# 暂存某个文件
git add ./README.md

# 暂存当前目录所有改动文件
git add .

# 暂存一系列文件
git add 1.txt 2.txt ...
```
#### 合并
```shell
# 两步法, 将 huhua 分支代码合并到 develop
git checkout develop
git merge huhua

# 或者一步法
git merge huhua develop
```
#### 删除
git add 的反向操作
```shell
# 删除1.txt 文件
git rm 1.txt

# 删除当前所有文件, 与rm -rf 命令不同的是不会删除 .git 目录
git rm -rf .

# 清除当前工作区缓存，但不会删除文件，通常用于修改文件名不生效问题
git rm -r --cached .
```
#### 提交
```shell
# -m 提交的信息
git commit -m "add: changes log"

# 只提交某个文件
git commit README.md -m "message"

# 提交并显示diff变化
git commit -v

# 允许提交空消息，通常必须指定 -m 参数
git commit --allow-empty-message

# 重写上一次提交信息，确保当前工作区没有改动
git commit --amend -m "新的提交信息"
```
#### 推送
```shell
# 推送内容到主分支
git push -u origin master

# 本地分支推送到远程， 本地分支:远程分支
git push origin <branchName>:<branchName>

# 简写，默认推送当前分支
git push

# 强制推送, -f 是 --force 缩写
git push -f
```
#### 拉取
```shell
# 推荐，因为不会做自动合并
git fetch origin master

# 相当于git fetch 然后 git merge
git pull

# 后面的意思是： 远程分支名:本地分支名
git pull origin master:master

# 如果是要与本地当前分支合并，则冒号后面的<本地分支名>可以不写
git pull origin master
```
#### 查看变化
```shell
# 查看所有文件改动
git diff

# 查看具体文件的改动
git diff README.md

# 查看某个版本的改动, 后面那一窜是commitId， git log后就能看到
git diff d68a1ef2407283516e8e4cb675b434505e39dc54

# 查看某个文件的历史修改记录
git log README.md
git show d68a1ef2407283516e8e4cb675b434505e39dc54 README.md
```

#### 版本回滚
```shell
# 回滚上一个版本
git reset --hard HEAD^

# 回滚上两个版本
git reset --hard HEAD^^

# 回退到指定版本，git log 就能看到commit id了
git reset --hard 'commit id'

# 回滚版本是不保存在 git log，如果想查看使用
git reflog
```
## 标签
```shell
# 列出本地所有标签
git tag

# 列出远程所有标签
git ls-remote --tags origin

# 按照特定模式查找标签, `*` 模板搜索
git tag -l "v1.0.0*"

# 创建带有附注标签
git tag -a v1.1.0 -m "标签描述"

# 创建轻量标签, 不需要带任何参数
git tag v1.1.0

# 后期打标签, 假设之前忘记打标签了，可以通过git log查看commit id
git log
git tag -a v1.1.0 <commit_id>

# 推送到远程，默认只是本地创建
git push origin v1.1.0

# 一次性推送所有标签到远程
git push origin --tags

# 删除标签, 你需要再次运行 git push origin v1.1.0 才能删除远程标签
git tag -d v1.1.0

# 删除远程标签
git push origin --delete v1.1.0

# 检查标签
git checkout v1.1.0

# 查看本地某个标签详细信息
git show v1.1.0
```

## Rebase(变基)
git rebase 主要作用可以将多个commit记录合并为一条, 保证提交历史是线性的;
多次的 commit 记录会导致历史记录混乱, 在进行版本回退的时候不方便...
```shell
# 操作最近4次提交
git rebase -i HEAD~4
# 或者以 commit_id 进行操作
git rebase -i e88835de905ad396f61a0dc8c040a8ac8a34f3f8

# 放弃 git rebase 操作
git rebase --abort

# 此命令主要用于解决冲突后继续执行
git rebase --continue
```
