---
title: zig说明
aliases:
categories:
tags:
---

# zig说明

zig 是**命令式语言**

## zig设计思想

zig 的设计目标是 **无歧义** & **全显式**

也就是说，其中必须手动处理一些在其它语言中不起眼的内容如 **内存分配器** & **分配错误处理**

## zig特性

`comptime` 编译时计算

直接或间接使用 `comptime` 的代码块将在编译时计算