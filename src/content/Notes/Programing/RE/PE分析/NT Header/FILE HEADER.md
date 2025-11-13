---
aliases:
  - 标准PE头
title: FILE HEADER
categories:
tags:
---

# FILE HEADER


```c
struct _IMAGE_FILE_HEADER{
WORD Machine;
WORD NumberOfSections;
DWORD TimeDataStamp;
DWORD PointerToSymbolTable;
DWORD NumberOfSymbols;
WORD SizeOfOptionalHeader;
WORD Characteristics;
};
```
> 20 bytes

又称 **标准PE头**


```
00000100:             ......                  64 86 07 00
00000110: 90 e0 b4 58 00 00 00 00 00 00 00 00 f0 00 22 00
```

| offset | 字段名                    | bytes | 描述                                   |
| ------ | ---------------------- | ----- | ------------------------------------ |
| 0x0    | `Machine`              | 2     | 目标机器架构标识码（0x0 任意处理器/0x14C 386及以后处理器） |
| 0x2    | `NumberOfSections`     | 2     | 节区（Section）的数量                       |
| 0x4    | `TimeDataStamp`        | 4     | 文件创建时间戳（秒数，自 1970-01-01 UTC）         |
| 0x8    | `PointerToSymbolTable` | 4     | COFF 符号表偏移（现代工具链通常为 0）               |
| 0xC    | `NumberOfSymbols`      | 4     | 符号表中符号数量（现代工具链通常为 0）                 |
| 0x10   | `SizeOfOptionalHeader` | 2     | 可选PE头的大小（PE 头中通常为 224/240, 可**自定义**） |
| 0x12   | `Characteristics`      | 2     | 文件属性标志(按位表示信息)                       |

| `Characteristics`                                    | 含义                                             |
| ---------------------------------------------------- | ---------------------------------------------- |
| **IMAGE_FILE_RELOCS_STRIPPED**<br><br>0x0001         | 重定位信息已从文件中移除。 文件必须在其首选基址加载。 如果基址不可用，加载程序将报告错误。 |
| **IMAGE_FILE_EXECUTABLE_IMAGE**<br><br>0x0002        | 该文件是可执行文件（没有未解析的外部引用）                          |
| **IMAGE_FILE_LINE_NUMS_STRIPPED**<br><br>0x0004      | COFF 行号已从文件中删除                                 |
| **IMAGE_FILE_LOCAL_SYMS_STRIPPED**<br><br>0x0008     | COFF 符号表项已从文件中剥离                               |
| **IMAGE_FILE_AGGRESIVE_WS_TRIM**<br><br>0x0010       | 主动调整工作区(已过时)                                   |
| **IMAGE_FILE_LARGE_ADDRESS_AWARE**<br><br>0x0020     | 应用程序可以处理大于 2 GB 的地址                            |
| **IMAGE_FILE_BYTES_REVERSED_LO**<br><br>0x0080       | 大端序 (已过时)<br>现代 Windows 拒绝加载此类程序               |
| **IMAGE_FILE_32BIT_MACHINE**<br><br>0x0100           | 计算机支持 32 位                                     |
| **IMAGE_FILE_DEBUG_STRIPPED**<br><br>0x0200          | debug 信息已删除，并单独存储在另一个文件中。                      |
| **IMAGE_FILE_REMOVABLE_RUN_FROM_SWAP**<br><br>0x0400 | 如果映像位于可移动媒体上, 请将其复制到交换文件并从中运行                  |
| **IMAGE_FILE_NET_RUN_FROM_SWAP**<br><br>0x0800       | 如果映像位于网络上, 请将其复制到交换文件并从中运行。                    |
| **IMAGE_FILE_SYSTEM**<br><br>0x1000                  | 映像是系统文件                                        |
| **IMAGE_FILE_DLL**<br><br>0x2000                     | 映像是 DLL 文件<br>                                 |
| **IMAGE_FILE_UP_SYSTEM_ONLY**<br><br>0x4000          | 该文件应仅在单处理器计算机上运行                               |
| **IMAGE_FILE_BYTES_REVERSED_HI**<br><br>0x8000       | 小端序<br>现代操作系统默认, 应为 1                          |
