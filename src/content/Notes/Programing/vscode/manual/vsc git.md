---
title: 在vscode使用Git
aliases:
categories:
tags:
---

# 在vscode使用Git

vscode同步代码时会出现网络问题, 可能因为其 url 默认使用 `https`

需要手动修改.git目录的config文件, 将 url 从 `https` 改为 `ssh`

vscode设置`"github.gitProtocol": "ssh"`可以在创建时使用ssh
