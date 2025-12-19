---
title: rust测试
aliases:
categories:
tags:
---

# rust测试

## 单元测试

```rust
#[cfg(test)]
#[test]
```

## 集成测试

`src/tests` 目录下`.rs`文件视为 `#[cfg(test)]`，而子目录为默认行为