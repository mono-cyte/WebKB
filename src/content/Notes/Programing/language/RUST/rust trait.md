---
title: rust trait
aliases:
categories:
tags:
---

# rust trait

rust 中 `trait` 的实现原理类似 cpp 的 多态-虚函数 机制

## 常用特性

### 运算符重载

```rust
use std::ops::{Add, Sub, Mul, Div, AddAssign, SubAssign, MulAssign, DivAssign};
```
为 **自定义类型** 实现其 trait 即可使用相关运算符

### Display

```rust
use std::fmt::Display
```
为 `print` 相关占位符提供支持