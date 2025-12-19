---
title: CFG-to-NPDA
aliases:
categories:
tags:
---

# CFG-to-NPDA



要求: CFG 符合[[格雷巴赫范式]]

## LL解析

构造 $M$ 仅三个状态:
- $q_{0}$: 初始状态
- $q_{1}$: 自环处理所有产生式
- $q_{2}$: 最终状态

![CFG-to-NPDA-LL](res/CFG-to-NPDA-LL.svg)

通过LL(1)解析, 可成为确定性算法

> [!NOTION]
> 使用自顶向下分析, 逐步展开产生式
> 栈中从



## LR解析

构造 $M$ 仅三个状态:
- $q_{0}$: 自环处理所有非起始产生式
- $q_{1}$: 归约起始产生式
- $q_{2}$: 最终状态

![CFG-to-NPDA-LR](res/CFG-to-NPDA-LR.svg)




> [!NOTION]
> 使用自底向上分析, 逐步回收产生式
> 