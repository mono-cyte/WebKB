---
title: NFA-to-DFA
aliases:
categories: Mathematics
tags:
---

# NFA 与 DFA 的等价性

## 构造性等价

对于任何一个 NFA $M_{N}$​，都存在一个等价的 DFA $M_{D}$，使得 $L(M_{N})=L(M_{D})$

这个等价 DFA 可以通过 **[[子集构造]]** 从原 NFA 系统地构造出来

## 语言类等价

由 NFA 所接受的语言类与由 DFA 所接受的语言类等价: **[[正则语言]]**

> [!NOTION]
> 由于 NFA 和 DFA 在描述语言的能力上是等价的，我们在定义正则语言时，可以使用 DFA，也可以使用 NFA
> NFA 通常在设计上更为简便和直观，而 DFA 则在实现和模拟上更为直接。