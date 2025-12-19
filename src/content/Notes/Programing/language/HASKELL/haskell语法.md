---
title: haskell语法
aliases:
categories:
tags:
---

# haskell语法


## 类型


### 基本变量


变量的声明: 类型 + 特化
```haskell
-- 变量

a :: Int -- 类型声明
a = 1    -- 类型特化

list :: [Int]
list = [1,2,3] -- 或 list = 1 : 2 : 3 : []


tuple :: (Int, String, Bool)
tuple = (42, "hello", True)


pair :: (Int, String)
pair = (1, "one")

```

### 函数

函数的声明与变量类似:
```haskell
-- 函数

f1 :: Int -> Int

f1 a = a + 1 
```

#### 匿名函数

`\` 表示 $\lambda$ 算子, `->` 为右结合符号
```haskell
-- 多层函数

f2 :: Int -> (Int -> Int) -- 等价于 f2 :: Int -> Int -> Int

f2 x = \y -> x + y     -- \y 表示接受 y 的匿名函数类型: Int -> Int

f2 = \x -> \y -> x + y -- 嵌套

```
#### 多层函数

**多参函数**在 haskell 可同时视为**多层单参函数**(又称**柯里化**):
```haskell
-- 多层函数

f2 :: Int -> Int -> Int

f2 a b = a + b

```