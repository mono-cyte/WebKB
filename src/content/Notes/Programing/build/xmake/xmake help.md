---
title: xmake help
aliases:
categories:
tags:
---

# xmake help

```shell
xmake [task] [options] [target]
```

## Actions

|Command|Description|
|---|---|
|b, build|Build targets if no given tasks.|
|c, clean|Remove all binary and temporary files.|
|f, config|Configure the project.|
|create|Create a new project.|
|g, global|Configure the global options for xmake.|
|i, install|Package and install the target binary files.|
|p, package|Package target.|
|q, require|Install and update required packages.|
|r, run|Run the project target.|
|service|Start service for remote or distributed compilation and etc.|
|test|Run the project tests.|
|u, uninstall|Uninstall the project binary files.|
|update|Update and uninstall the xmake program.|

## Plugins

|Command|Description|
|---|---|
|check|Check the project sourcecode and configuration.|
|doxygen|Generate the doxygen document.|
|format|Format the current project.|
|l, lua|Run the lua script.|
|m, macro|Run the given macro.|
|pack|Pack binary installation packages.|
|plugin|Manage plugins of xmake.|
|project|Generate the project file.|
|repo|Manage package repositories.|
|show|Show the given project information.|
|watch|Watch the project directories and run command.|

## Common Options

|Option|Description|
|---|---|
|`-q`, `--quiet`|Quiet operation.|
|`-y`, `--yes`|Input yes by default if need user confirm.|
|`--confirm=CONFIRM`|Input the given result if need user confirm.  <br>- yes  <br>- no  <br>- def|
|`-v`, `--verbose`|Print lots of verbose information for users.|
|`--root`|Allow to run xmake as root.|
|`-D`, `--diagnosis`|Print lots of diagnosis information (backtrace, check info ..) only for developers.  <br>And we can append `-v` to get more whole information.  <br>e.g. `xmake -vD`|
|`-h`, `--help`|Print this help message and exit.|
|`-F FILE`, `--file=FILE`|Read a given xmake.lua file.|
|`-P PROJECT`, `--project=PROJECT`|Change to the given project directory.  <br>Search priority:  <br>1. The Given Command Argument  <br>2. The Environment Variable: `XMAKE_PROJECT_DIR`  <br>3. The Current Directory|

## Command Options (build)

| Option                      | Description                                                                                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--version`                 | Print the version number and exit.                                                                                                                                                                            |
| `-b`, `--build`             | Build target. This is default building mode and optional.                                                                                                                                                     |
| `-r`, `--rebuild`           | Rebuild the target.                                                                                                                                                                                           |
| `-a`, `--all`               | Build all targets.                                                                                                                                                                                            |
| `--shallow`                 | Only re-build the given targets without dependencies.                                                                                                                                                         |
| `-g GROUP`, `--group=GROUP` | Build all targets of the given group. It support path pattern matching.  <br>e.g.  <br>`xmake -g test`  <br>`xmake -g test_*`  <br>`xmake --group=benchmark/*`                                                |
| `--dry-run`                 | Dry run to build target.                                                                                                                                                                                      |
| `-j JOBS`, `--jobs=JOBS`    | Set the number of parallel compilation jobs. (default: 18)                                                                                                                                                    |
| `--linkjobs=LINKJOBS`       | Set the number of parallel link jobs.                                                                                                                                                                         |
| `-w`, `--warning`           | Enable the warnings output. (deprecated)                                                                                                                                                                      |
| `--linkonly`                | Only link targets if object files have been compiled.                                                                                                                                                         |
| `--files=FILES`             | Build the given source files.  <br>e.g.  <br>`xmake --files=src/main.c`  <br>`xmake --files='src/*.c' [target]`  <br>`xmake --files='src/**.c\|excluded_file.c'`  <br>`xmake --files='src/main.c;src/test.c'` |
| `target`                    | The target name. It will build all default targets if this parameter is not specified.                                                                                                                        |
