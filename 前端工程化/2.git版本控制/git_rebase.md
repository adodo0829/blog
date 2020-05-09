# git rebase 操作
rebase可以把在一个分支里提交的改变移到另一个分支里重放一遍...
git rebase操作主要为了提供一个良好的 commit 记录, 方便 code review 和 回滚, 还有代码维护等.

## merge 操作(非破坏性, 保证记录的完整性, 但可能杂乱)
merge是执行一个合并,或者说一个融合。我们希望在当前分支上往前走(HEAD),所以我们需要融合合并其他分支的工作.
当一个分支(如 master)长期落后于其他分支时(test), 我们使用 git merge 直接合并test 分支到 master, 以保证 master 分支的同步性...

## rebase 操作

#### 清除多余的 commit 信息
如果你在自己开发分支下(比如huhua)多次提交commit了, 我们想把这些信息合并成一个 commit 信息在提交上去;
```shell
# 我们现在位于 huhua 分支
git rebase -i HEAD~4 # 合并最近的 4 次提交纪录

p cacc52da add: qrcode
p f072ef48 update: indexeddb hack
p 4e84901a feat: add indexedDB floder
p 8f33126c feat: add test2.js

# Rebase cacc52da..f072ef48 onto 5f2452b2 (4 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#

# 这是我们要修改的
s cacc52da add: xxx
s f072ef48 update: xxxx
s 4e84901a feat: add xxxxx
p 8f33126c feat: add demo # 以这一次 commit 信息为准
```

#### 生成线性提交记录
比如自己在 huhua 分支下提交了几次 commit, 目前 huhua 分支的HEAD 指针已经领先几步了, 现在我想合并到 dev 分支, 一般都是 merge 操作; 但是如果我们又在 dev 下 提交commit后就会生成分叉的 commit 信息; 这时为了保证整个分支 tree 的线性记录, 我们可以直接在 huhua 分支以 dev 分支最后一次的 commit 节点为基准来进行 rebase; 这样我们的 huhua 分支就不会生成分叉信息...
最后在dev进行 merge操作

[具体参考分支操作](https://gitee.com/progit/3-Git-%E5%88%86%E6%94%AF.html#3.1-%E4%BD%95%E8%B0%93%E5%88%86%E6%94%AF)

## 注意
多人开发下不要随便操作被 push 到远程的 commit 记录;
在 push 之前可以操作本地的... 否则容易产生代码冲突~!!!

## 参考
- [Pro Git](https://gitee.com/progit/1-%E8%B5%B7%E6%AD%A5.html#1.1-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)