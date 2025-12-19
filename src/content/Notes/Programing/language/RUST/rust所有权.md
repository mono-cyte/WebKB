---
title: rust所有权
aliases:
categories:
tags:
---

# rust所有权

## 所有权规则

Rust 中变量赋值和传参的行为取决于类型是否实现 `Copy` trait：

- **实现 `Copy`**：进行**值拷贝**
- **未实现 `Copy`**：移动所有权 (类似 CPP 的 `std::move`)
