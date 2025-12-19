---
title: xmake 常用功能
aliases:
categories:
tags:
---

# xmake 常用功能

## 配置

参考 [xmake config](xmake%20config.md)

| 配置项    | option        | 示例                          | 补充                            |
| ------ | ------------- | --------------------------- | ----------------------------- |
| 平台     | `-p`          | `xmake f -p windows`        |                               |
| 架构     | `-a`          | `xmake f -a x64`            |                               |
| 模式     | `-m`          | `xmake f -m debug`          |                               |
| 工具链    | `--toolchain` | `xmake f --toolchain=clang` | 详见 `xmake show -l toolchains` |
| 显示详细信息 | `-v`          | `xmake f -v`                |                               |
| 清除缓存   | `-c`          | `xmake f -c`                | vscode-xmake各种 bug 的终极解决方法    |

> [!IMPORTANT]
> xmake 更改配置不生效, 清理缓存 ! ! !

## 匹配模式

### 通配符

使用`**`和`*`等通配符

```lua
 -- 导致匹配结构扁平化, 打包时不理想
add_headerfiles("include/*.h")
add_headerfiles("include/**")
add_headerfiles("include/**.*")
```

### 模式匹配

使用`()`捕获路径
```lua
-- 捕捉原目录结构
add_headerfiles("include/(**.h)")
add_headerfiles("include/(**.*)")
add_headerfiles("include/(**)")
```


## 预编译头

```lua
-- c预编译头
target("foo")
    set_pcheader("pch.h") // 此为相对项目根目录路径
```

```lua
-- cpp预编译头
target("foo")
	set_pcxxheader("pch.h")
```

## Debug

> [!IMPORTANT]
> 必须引入 **debug 规则** 才能正确构建 debug 版本

```lua
add_rules("mode.debug")
```
使用命令 `xmake f -m debug `

### 传递运行参数
```bash
xmake run -- arg1 arg2        # 运行默认目标并传递参数 'arg1' 和 'arg2'
```

## 协同 VS

`xmake project -k vsxmake <other args>`

> 类似 `xmake project -k compile_commands build`

生成 `sln` 解决方案

```lua
add_rules("plugin.vsxmake.autoupdate")
```

自动更新 `sln`

`xmake run -d`

唤起 vs 调试编译目标


## 依赖管理

### 多层项目 (源码依赖)

通过全局 `includes` 项目目录 或 项目中`xmake.lua` 文件, 实现多层级项目构建

- 依赖方
```lua
includes("dir")

target("foo")
	add_deps("libxx")
	...

```
- 被依赖方
```lua
target("libxx")
	add_includedirs("include", {public = true}) --将includedirs导出给依赖方
```

### 包 (预编译依赖)

- 依赖方

`add_repositories` 指向对应包名称和 `packages` 上级目录

```lua
add_repositories("repo ../libxx/build") -- 1 "repo名 packages所在url" (固定格式, 空格分隔)
add_requires("libxx")                    -- 2 "包名"

target("foo")
	add_packages("libxx")                -- 3 "包名"
	...

```
3 个环节不可或缺

> [!IMPORTANT]
> 附加说明
> 包依赖一般默认`release`, `debug` 须手动指定
> `xmake require --info [pkg]` 获取指定包所有可配置参数列表和取值说明
> `xrepo search [pkg]` 搜索仓库中的包
> clangd 缓存可能需要手动更新



```lua
-- 例:默认参数包, 使用debug版本
add_requires("libxx", {configs = {debug = true}})
```


- 被依赖方

通过 `xmake package` 默认打包生成在 `build` 目录, 可满足本地构建

> xmake 包管理系统对包名大小写敏感, 默认打包为小写
> `xmake require --info` 查看包依赖信息
> 注意依赖模式 是`debug` 还是 `release`


## 更新

``xmake update -s dev``


## 符号控制

### 全部导出

> debug 模式默认全部导出
> 非微软工具链默认符号可见

```lua
-- C
add_rules("utils.symbols.export_all")
-- C++
add_rules("utils.symbols.export_all", {export_classes = true})
```
### 控制导出

```lua
add_files("src/*.export.txt")
add_rules("utils.symbols.export_list") -- 与foo.export.txt`配合

add_rules("utils.symbols.export_list", {symbols = {"add","sub"}})
```

`foo.export.txt` 写法:
```txt
add
sub
```
> 更改符号配置需要清理构建缓存 ( `xmake c`) 后重新构建



## GitHub Actions

```yaml

uses: xmake-io/github-action-setup-xmake@v1
with:
  xmake-version: latest # 使用最新xmake
  
```

[查看 xmake action 接口](https://github.com/xmake-io/github-action-setup-xmake)