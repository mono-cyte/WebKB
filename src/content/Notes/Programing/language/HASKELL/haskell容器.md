---
title: haskell容器
aliases:
categories:
tags:
---

# haskell容器

## `list`

```haskell
-- 常用操作
head list        -- 首元素
tail list        -- 非首元素: [2,3,4,5]
list !! 2        -- 索引访问: 0起始
length list      -- 长度
null list        -- 判空


[1,2] ++ [3,4]   -- 拼接: [1,2,3,4]

-- 范围
[1..5]            -- [1,2,3,4,5]
[1,3..10]         -- [1,3,5,7,9]
```


## `Maybe`

定义:
```haskell
data Maybe a = Nothing | Just a
```

```haskell
safeDivide :: Int -> Int -> Maybe Int
safeDivide _ 0 = Nothing
safeDivide x y = Just (x / y)
```

```haskell
result = safeDivide 10 0   -- Nothing

-- 提取值
case result1 of
    Nothing -> 0
    Just x  -> x
```


## `Either`

定义:
```haskell
data Either a b = Left a | Right b
```

```haskell
safeDivide :: Int -> Int -> Either String Int
safeDivide _ 0 = Left "Division by zero"
safeDivide x y = Right (x / y)
```

```haskell

result = safeDivide 10 2

case result of
    Left err  -> "Error: " ++ err
    Right val -> "Result: " ++ show val
```