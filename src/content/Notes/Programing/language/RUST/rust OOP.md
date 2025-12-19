---
title: rust OOP
aliases:
categories:
tags:
---

# rust OOP

rust 的面向对象对体现并体现对应实现原理，由三个模块实现：
1. `struct`: 数据段
2. `impl`: (成员)函数
3. `trait`: 接口

## 数据段 `struct`

```rust
struct Point {
    x: i32,
    y: i32,
    z: i32,
}

```

## 成员函数 `impl`

```rust
impl Point {
	fn new(x: i32, y: i32, z: i32) -> Point {
        Point { x, y, z }
    }

    fn add(&mut self, other: &Point) {
        self.x += other.x;
        self.y += other.y;
        self.z += other.z;
    }
    
    fn show(&self) {
        println!("{},{},{}", self.x, self.y, self.z)
    }
}
```

参数含 `&self` 可从实例调用:

```rust

// 从 Point 实例 p 调用
p.add(q);

p.show();
```

参数含 `&self` 仅从类型调用:

```rust
// 从 Point 类调用 new, 创建实例
Point::new(1,2,3)
```

## 接口 `trait`

```rust
trait Log {
    fn log(&self) {
        println!("Interface Log")
    }
}

// 为 Point 类提供接口
impl Log for Point {
    fn log(&self) {
        println!("{},{},{}", self.x, self.y, self.z)
    }
}
```


`Point` 具有接口类型, 由此实现**多态**

```rust
// 接受 接口类型 的函数
fn print(item: impl Log) {
    item.log();
}
```

普通调用方式同 `impl`

---

满足条件时, 标准或第三方库提供 trait 可以通过对结构体声明 derive 自动实现:
```rust
#[derive(Copy, Clone, Debug)]
struct Point {
    x: i32,
    y: i32,
    z: i32,
}
```


> [!IMPORTANT]
> rust 不使用**继承**，而用 `trait` 和 `impl trait` 实现多态