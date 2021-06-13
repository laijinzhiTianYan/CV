- 远程仓库
  ### 查看远程仓库地址
  git remote -v

  ### 添加远程仓库地址
  git remote add origin [url]

  ### 删除远程仓库地址
  git remote rm origin

  ### 重置远程仓库地址
  git remote set-url origin [url]

- 分支操作
  ### 切换至dev分支
  git checkout dev

  ### 创建一个新分支
  git checkout -b newBranch

  ### 拉取远程分支，并变基
  git pull --rebase

  ### 拉取远程分支到本地并建立追踪关系
  git checkout -b 本地分支名 origin/远程分支名

  ### 查看所有分支
  git branch -a

  ### 同步远程分支列表到本地
  git fetch --prune

  ### 删除本地分支
  git branch -d branchName

  ### 删除远程分支
  git push origin -d branchName

  ### 合并本地 commit, squash 要合并的 commit
  git rebase -i hash 值

  ### 合并 B 分支到当前分支
  git merge branchB

  ### 列出在远程合并的所有分支
  git branch --merged

  ### 删除所有已合并的分支（除了 master|dev 分支）
  git branch --merged | egrep -v "(^\*|master|dev)"

  ### 删除所有已合并的本地分支（除了 master|dev 分支）
  git branch --merged | egrep -v "(^\*|master|dev)" | xargs git branch -d

- 提交信息
  ### 重置提交备注信息
  git commit --amend

  git commit --amend -m "New commit message"

  ### 修改 commit message，X 是需要修改的数量
  git rebase -i HEAD~X

- tag操作
  ### 查看所有 tag
  git tag -l

  ### 新建一个 tag
  git tag -a tagName -m "tag备注"

  ### 提交到远程 tag
  git push origin v1.6

  ### 删除本地标签
  git tag -d tagName

  ### 删除远程标签
  git push origin -d [tag-name]

- stash缓存操作
  ### 隐藏所有以追踪但未提交的文件
  git stash

  ### 显示隐藏列表
  git stash list

  ### 释放隐藏的最后一次记录
  git stash pop

  ### 释放指定隐藏记录（stash@{1} 隐藏索引）
  git stash pop stash@{1}

  ### 删除所有缓存的stash
  git stash clear

- 对比操作
  ### 对比两个分支的不同，并导出到 diff.txt 文件中(覆盖 原来 diff.txt 文件内容)
  git diff [branchA] [branchB] > diff.txt

  ### 对比两个分支的不同，并导出到 diff.txt 文件中(追加到 diff.txt 文件内容)
  git diff [branchA] [branchB] >> diff.txt

- cherry-pick commit 操作
  ### 它可以将某一个或者几个提交（commit）的更改，拉取复制到当前分支
  git cherry-pick [commit]

- 代码回滚
  ### 重置本地仓库、暂存区、工作区到指定 hash 处（只对已追踪文件生效）。【重写部分提交历史】
  git reset --hard hash

  ### 将未追踪的文件从工作区中移除
  git clean -f

  ### 撤销一个提交的同时，在当前提交历史里会创建一个新的提交，这是一个安全的方法。【不会重写提交历史】
  git revert hash

  ### 注：git revert 可以当作撤销已经提交远程的更改，而 git reset 用来撤销没有提交远程的更改

  ### 回退工作区所有文件
  git checkout .

  ### 回退单个文件
  git checkout HEAD -- my-file.txt

- 其他操作
  ### 删除 test.html 的追踪，但文件保留在本地
  git rm --cached test.html

  ### 删除 test.html 的跟踪，且删除本地文件
  git rm -f test.html

- 常见问题
  ### 错误信息
  Git: fatal: Pathspec is in submodule

  ### 解决：
  ### 删除追踪关系
  git rm -rf --cached dirName

  ### 添加追踪关系
  git add dirName

  ### 修改 gitlab 用户名后，pull、push 报错，错误信息
  fatal: Authentication failed for xxx

  ### 解决：
  ### 不保存用户名、密码
  git config --system --unset credential.helper

  ### 输入一次，保存用户名、密码。保存位置：cat ~/.git-credentials
  git config credential.helper store

  ### 修改 gitlab 用户名后，pull、push 报错，错误信息
  fatal: Authentication failed for xxx

  ### 解决：
  ### 不保存用户名、密码
  git config --system --unset credential.helper

  ### 输入一次，保存用户名、密码。保存位置：cat ~/.git-credentials
  git config credential.helper store

  ### gitlab commit 记录，不显示用户头像

  git config --global user.email "email@example.com"

  ### 注：email@example.com 是 https://cn.gravatar.com/emails 中的 emial 账号

  ### git 默认忽略文件名字母大小写，造成修改文件名大小写无法同步到远程

  ### 关闭忽略大小写
  git config core.ignorecase false



