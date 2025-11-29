---
title: rust汇编
aliases:
categories:
tags:
---

# rust汇编


## 内联汇编



## 独立汇编

使用 `build.rs` 脚本:

```rust
fn main() {
    cc::Build::new()
        .file("src/test.asm")
        .compile("test");  
```

对应的汇编内容在 rust 使用 `extern "C"` 对接

> [!NOTION]
> 同理支持 `c/cpp`