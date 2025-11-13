---
title: SECTION HEADER
aliases:
categories:
tags:
---

# SECTION HEADER
```c
#define IMAGE_SIZEOF_SHORT_NAME 8

typedef struct _IMAGE_SECTION_HEADER {
  BYTE  Name[IMAGE_SIZEOF_SHORT_NAME];
  union {
    DWORD PhysicalAddress;
    DWORD VirtualSize;
  } Misc;
  DWORD VirtualAddress;
  DWORD SizeOfRawData;
  DWORD PointerToRawData;
  DWORD PointerToRelocations;
  DWORD PointerToLinenumbers;
  WORD  NumberOfRelocations;
  WORD  NumberOfLinenumbers;
  DWORD Characteristics;
} IMAGE_SECTION_HEADER, *PIMAGE_SECTION_HEADER;
```

> 40 bytes

| offset | 字段名                                        | bytes | 描述                                       |
| ------ | ------------------------------------------ | ----- | ---------------------------------------- |
| 0x0    | `Name[IMAGE_SIZEOF_SHORT_NAME]`            | 8     | 节区名称（ASCII字符串，不足8字节用0填充）                 |
| 0x8    | `Misc`:<br>`PhysicalAddress`/`VirtualSize` | 4     | 内存节区对齐前的真实尺寸 (可不准确)<br>物理地址（在PE文件中通常不使用） |
| 0xC    | `VirtualAddress`                           | 4     | **内存中的节区起始地址（RVA）**                      |
| 0x10   | `SizeOfRawData`                            | 4     | 节区的**文件对齐**尺寸                            |
| 0x14   | `PointerToRawData`                         | 4     | **磁盘文件中节区的起始偏移(地址)**                     |
| 0x18   | `PointerToRelocations`                     | 4     | 重定位信息偏移（obj文件）                           |
| 0x1C   | `PointerToLinenumbers`                     | 4     | 行号信息偏移（debug）                            |
| 0x20   | `NumberOfRelocations`                      | 2     | 重定位项数量（obj文件）                            |
| 0x22   | `NumberOfLinenumbers`                      | 2     | 行号记录数量（debug）                            |
| 0x24   | `Characteristics`                          | 4     | **节区属性标志**（可执行/可读/可写等）                   |

内存 Section 位置 = `ImageBase` + `VirtualAddress`



### 常用 `Characteristics` 宏

| 宏                                  | 值 (十六进制)     | 说明           |
| ---------------------------------- | ------------ | ------------ |
| `IMAGE_SCN_CNT_CODE`               | `0x00000020` | 节包含可执行代码     |
| `IMAGE_SCN_CNT_INITIALIZED_DATA`   | `0x00000040` | 节包含已初始化数据    |
| `IMAGE_SCN_CNT_UNINITIALIZED_DATA` | `0x00000080` | 节包含未初始化数据    |
| `IMAGE_SCN_MEM_DISCARDABLE`        | `0x02000000` | 节可被丢弃（如重定位节） |
| `IMAGE_SCN_MEM_NOT_CACHED`         | `0x04000000` | 节不可缓存        |
| `IMAGE_SCN_MEM_NOT_PAGED`          | `0x08000000` | 节不可分页        |
| `IMAGE_SCN_MEM_SHARED`             | `0x10000000` | 节可共享         |
| `IMAGE_SCN_MEM_EXECUTE`            | `0x20000000` | 节可执行         |
| `IMAGE_SCN_MEM_READ`               | `0x40000000` | 节可读          |
| `IMAGE_SCN_MEM_WRITE`              | `0x80000000` | 节可写          |