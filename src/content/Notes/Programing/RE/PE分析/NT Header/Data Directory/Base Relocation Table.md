---
aliases:
  - 重定位表
title: 重定位表
categories:
tags:
---

# 重定位表

`Data_Directories[5]`


模块加载冲突而不按照原 ImageBase 加载时, 依照重定位表修正绝对地址

- 重定位表不是连续列表，而由 **多个重定位块** 连接组成
- 每个块负责处理 **一个内存页 (4KB, 0x1000 bytes)** 内所有需要重定位的地址
- 每个块开头是一个 **`IMAGE_BASE_RELOCATION`** 结构
- 重定位表以 **全零块** 终止
	- `VirtualAddress = 0`
	- `SizeOfBlock = 0`

```c
#define IMAGE_DIRECTORY_ENTRY_BASERELOC       5   // Base Relocation Table

typedef struct _IMAGE_BASE_RELOCATION {
	DWORD   VirtualAddress;
	DWORD   SizeOfBlock;
	//WORD    TypeOffset[];
} IMAGE_BASE_RELOCATION;
```

```c
typedef union TypeOffset {
    struct {
        WORD Offset : 12;
        WORD Type : 4;
    };
    WORD Value;
} TypeOffset;

```
## 主体数据

`IMAGE_BASE_RELOCATION` 后续数据以 `WORD` 存储

|位域|长度|含义|
|---|---|---|
|**高4位**|4 bits|重定位类型|
|**低12位**|12 bits|页内偏移量（Offset）|

### 重定位类型

| HEX       | DEC   | 常量名                            | 说明                                  |
| --------- | ----- | ------------------------------ | ----------------------------------- |
| **0x0**   | 0     | `IMAGE_REL_BASED_ABSOLUTE`     | 空操作，用于填充对齐（不执行重定位）                  |
| **0x1**   | 1     | `IMAGE_REL_BASED_HIGH`         | 重定位目标地址的高 16 位（需配合 `LOW` 使用，已过时）    |
| **0x2**   | 2     | `IMAGE_REL_BASED_LOW`          | 重定位目标地址的低 16 位（需配合 `HIGH` 使用，已过时）   |
| **0x3**   | 3     | `IMAGE_REL_BASED_HIGHLOW`      | **32 位全地址重定位**（32 位 PE 文件最常用）       |
| **0x4**   | 4     | `IMAGE_REL_BASED_HIGHADJ`      | 高 16 位带符号调整（用于 16 位架构，已过时）          |
| **0x5**   | 5     | `IMAGE_REL_BASED_MIPS_JMPADDR` | MIPS 平台跳转地址重定位（已过时）                 |
| **0x6**   | 6     | 保留                             | 未使用                                 |
| **0x7**   | 7     | `IMAGE_REL_BASED_ARM_MOV32`    | ARM 平台 32 位地址重定位（用于 `MOVW/MOVT` 指令） |
| **0x8**   | 8     | 保留                             | 未使用                                 |
| **0x9**   | 9     | `IMAGE_REL_BASED_ARM_MOV32T`   | ARM Thumb 模式 32 位地址重定位              |
| **0xA**   | 10    | `IMAGE_REL_BASED_DIR64`        | **64 位全地址重定位**（64 位 PE 文件最常用）       |
| **0xB**   | 11    | `IMAGE_REL_BASED_HIGH3ADJ`     | 高 16 位带三调整（用于 IA-64，已过时）            |
| **0xC-F** | 12-15 | 保留                             | 未使用                                 |