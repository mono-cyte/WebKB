---
title: rust ref
aliases:
categories:
tags:
---

# rust ref & ptr


## 引用

**引用**：不获取所有权而读取数据的方式

```rust
// 两种创建引用的等价方式
let ref a = value;    // 模式匹配中的引用
let b = &value;       // 显式引用操作符

// 同理:
// 对于 match
match value {
	ref a => {}
}

match &value {
	b => {}
}

// 对于 if let
if let ref a = value {}
if let b = &value {}

```

## 指针

总所周知, 引用即指针

在 rust 中, 默认使用引用, 显式指定才视为指针

```rust

// 指针必须使用 mut 或 const 修饰
// const 不可修改指向内容, mut 可修改指向内容

let a_const_ptr: *const i32 = &v;
let a_mut_ptr: *mut i32 = &mut v;

let b_const_ptr = &v as *mut i32;
let b_mut_ptr = &mut v as *mut i32;

// 类型转换
let mut c_ptr = b_ptr as *const i8; // 必须显式转换

// 权限转换
let mut c_ptr = b_ptr as *mut i32; // 必须显式转换
let mut c_ptr = b_ptr.cast_mut();

// 指针运算: unsafe, 只能通过函数 add, sub, offset (返回新指针)
unsafe {
	let mut d_ptr = c_ptr.add(1);
	d_ptr = d_ptr.sub(1);
	d_ptr = d_ptr.offset(1);
}

// 指向指定位置
let ptr = 0xffffffff as *mut i8;

```

或者使用标准库

```rust
use std::ptr;

let n: *const i32 = ptr::null::<i32>()
let p: *const i32 = ptr::with_exposed_provenance(0xfffffff);
```



> [!IMPORTANT]
> 需要所有权时**移动**，只需读取时**引用**