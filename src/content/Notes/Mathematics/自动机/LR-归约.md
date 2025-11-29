---
title: LR-归约
aliases:
  - reduce
categories:
tags:
---

# LR-归约

匹配产生式右侧并以左侧变元替换匹配内容

对应 NPDA 存在 **产生式-转移函数** 关系

对于 $X_{i} \in (T \cup V)$:
$$
A \rightarrow X_{1}X_{2} \cdots X_{n} \Leftrightarrow \delta(q_{0}, \lambda, X_{1}X_{2} \cdots X_{n}) \ni (q_{0}, A) 
$$
