---
title: Inline hook
aliases:
categories:
tags:
---

# Inline hook
硬编码层面上的替换

将对应的硬编码替换为 "`jmp` -> hook函数" (不足则补`nop`)
hook函数 结束时 "`jmp` -> 原替换位置的下一指令"

**被替换部分指令** 应当在 hook函数 末尾执行

> [!NOTE]
> 注意使用 **裸函数** + `pushad`,`popad` 等方式保护栈
