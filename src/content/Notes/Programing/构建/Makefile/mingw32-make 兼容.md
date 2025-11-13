---
title: mingw32-make 兼容
aliases:
categories:
tags:
---

# mingw32-make 兼容

在 Windows 下, 只要不涉及 Linux 命令, 路径都可以使用 Linux 分隔符 `/`

例如:

```Makefile
test:
    `debug/main`
```

此命令可启动`.\debug\main.exe`, 而不需要使用 `\`

> [!NOTE]
> 当启动同目录的程序时, 不可直接 `main`
>
> `./main` 或 `main.exe` 才能正确解析

## Unix路径兼容性

> 故意不小心只支持了部分, 这样你才知道用的是 `MinGW-make`

### 支持的命令

- `cd`: 完全支持

### 部分支持的命令

对于以下命令：

- `mkdir`
- `rm`
- `cp`
- `mv`
- `touch`
- `file`

当参数中 含有文件或路径时, 必须使用 `""` 包裹路径

如果含有多个路径, 只要其中一个使用了 `""`, 命令就能正常执行

路径中使用通配符时也有相同效果。

> [!IMPORTANT]
> 为统一格式, 建议所有路径都使用 `""` 包裹
