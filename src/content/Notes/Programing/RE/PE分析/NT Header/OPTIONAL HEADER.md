---
aliases:
  - 可选PE头
title: OPTIONAL HEADER
categories:
tags:
---

# OPTIONAL HEADER
```c
//x32

#define IMAGE_NUMBEROF_DIRECTORY_ENTRIES 16

struct _IMAGE_OPTIONAL_HEADER {
  WORD                 Magic;
  BYTE                 MajorLinkerVersion;
  BYTE                 MinorLinkerVersion;
  DWORD                SizeOfCode;
  DWORD                SizeOfInitializedData;
  DWORD                SizeOfUninitializedData;
  DWORD                AddressOfEntryPoint;
  DWORD                BaseOfCode;
  DWORD                BaseOfData;
  DWORD                ImageBase;
  DWORD                SectionAlignment;
  DWORD                FileAlignment;
  WORD                 MajorOperatingSystemVersion;
  WORD                 MinorOperatingSystemVersion;
  WORD                 MajorImageVersion;
  WORD                 MinorImageVersion;
  WORD                 MajorSubsystemVersion;
  WORD                 MinorSubsystemVersion;
  DWORD                Win32VersionValue;
  DWORD                SizeOfImage;
  DWORD                SizeOfHeaders;
  DWORD                CheckSum;
  WORD                 Subsystem;
  WORD                 DllCharacteristics;
  DWORD                SizeOfStackReserve;
  DWORD                SizeOfStackCommit;
  DWORD                SizeOfHeapReserve;
  DWORD                SizeOfHeapCommit;
  DWORD                LoaderFlags;
  DWORD                NumberOfRvaAndSizes;
  IMAGE_DATA_DIRECTORY DataDirectory[IMAGE_NUMBEROF_DIRECTORY_ENTRIES];
};
```
> 224 bytes (x32)

又称 **可选PE头**

| offset | 字段名                           | bytes | 描述                                              |
| ------ | ----------------------------- | ----- | ----------------------------------------------- |
| 0x0    | `Magic`                       | 2     | 标识文件类型（0x10B=PE32，0x20B=PE32+）                  |
| 0x2    | `MajorLinkerVersion`          | 1     | 链接器主版本号                                         |
| 0x3    | `MinorLinkerVersion`          | 1     | 链接器次版本号                                         |
| 0x4    | `SizeOfCode`                  | 4     | 所有代码段`.text`的总大小 (byte)<br>(`FileAlignment`整数倍) |
| 0x8    | `SizeOfInitializedData`       | 4     | 已初始化数据`.data`的总大小（byte)<br>(`FileAlignment`整数倍) |
| 0xC    | `SizeOfUninitializedData`     | 4     | 未初始化数据`.bss`的总大小<br>(`FileAlignment`整数倍)        |
| 0x10   | `AddressOfEntryPoint`         | 4     | 程序入口点 RVA（相对虚拟地址）                               |
| 0x14   | `BaseOfCode`                  | 4     | 代码段基址 RVA                                       |
| 0x18   | `BaseOfData`                  | 4     | 数据段基址 RVA（仅PE32有效）                              |
| 0x1C   | `ImageBase`                   | 4     | 映像的首选加载基址                                       |
| 0x20   | `SectionAlignment`            | 4     | 内存对齐值 (byte)                                    |
| 0x24   | `FileAlignment`               | 4     | 文件对齐值 (byte)                                    |
| 0x28   | `MajorOperatingSystemVersion` | 2     | 要求操作系统主版本号                                      |
| 0x2A   | `MinorOperatingSystemVersion` | 2     | 要求操作系统次版本号                                      |
| 0x2C   | `MajorImageVersion`           | 2     | 映像主版本号                                          |
| 0x2E   | `MinorImageVersion`           | 2     | 映像次版本号                                          |
| 0x30   | `MajorSubsystemVersion`       | 2     | 子系统主版本号                                         |
| 0x32   | `MinorSubsystemVersion`       | 2     | 子系统次版本号                                         |
| 0x34   | `Win32VersionValue`           | 4     | 保留字段（通常为0）                                      |
| 0x38   | `SizeOfImage`                 | 4     | 映像在内存中的总大小 (byte)<br>(`SectionAlignment`整数倍)    |
| 0x3C   | `SizeOfHeaders`               | 4     | 所有头结构的总大小 (byte)<br>(`SectionAlignment`整数倍)     |
| 0x40   | `CheckSum`                    | 4     | 映像校验和                                           |
| 0x44   | `Subsystem`                   | 2     | 子系统类型（如GUI/CUI）                                 |
| 0x46   | `DllCharacteristics`          | 2     | DLL属性标志（如ASLR/DEP）                              |
| 0x48   | `SizeOfStackReserve`          | 4     | 初始线程栈保留大小（字节）                                   |
| 0x4C   | `SizeOfStackCommit`           | 4     | 初始线程栈提交大小（字节）                                   |
| 0x50   | `SizeOfHeapReserve`           | 4     | 初始进程堆保留大小（字节）                                   |
| 0x54   | `SizeOfHeapCommit`            | 4     | 初始进程堆提交大小（字节）                                   |
| 0x58   | `LoaderFlags`                 | 4     | 保留字段（通常为0）                                      |
| 0x5C   | `NumberOfRvaAndSizes`         | 4     | 数据目录项数量（通常为16）                                  |
| 0x60   | `DataDirectory[16`]           | 128   | 数据目录数组（每项8字节）                                   |

`DataDirectory` 详见[DATA DIRECTORY](Data%20Directory/DATA%20DIRECTORY.md)