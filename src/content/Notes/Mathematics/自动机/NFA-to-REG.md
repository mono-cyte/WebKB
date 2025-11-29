---
title: NFA-to-REG
aliases:
categories:
tags:
---

# NFA-to-REG

最简 [GTG](广义转移图.md):

![GTG](res/GTG.svg)

则可得正则表达式 $r$:

$$
r = r_{1}^{*}r_{2}(r_{4}+r_{3}r_{1}^{*}r_{2})^{*}
$$
> [!NOTION]
> 应观察 $r_{1}^{*}r_{2}$ 的结构