---
title: DOS HEADER
aliases:
categories:
tags:
---

# DOS HEADER
```c
typedef struct _IMAGE_DOS_HEADER{
	WORD e_magic;
	WORD e_cblp;
	WORD e_cp;
	WORD e_cric;
	WORD e_cparhdr;
	WORD e_minalloc;
	WORD e_maxalloc;
	WORD e_ss;
	WORD e_sp;
	WORD e_csum;
	WORD e_ip;
	WORD e_cs;
	WORD e_lfarlc;
	WORD e_ovno;
	WORD e_res[4];
	WORD e_oemid;
	WORD e_oeminfo;
	WORD e_res2[10];
	DWORD e_lfanew;
} IMAGE_DOS_HEADER, *PIMAGE_DOS_HEADER;
```
> 64 bytes

`e_lfanew` 指向 [NT HEADER](NT%20Header/NT%20HEADER.md) 的起始
DOS 头 与 NT 头 之间为 DOS Stub 程序


| offset   | 字段名            | 全称                               | bytes | 关键作用               |
| -------- | -------------- | -------------------------------- | ----- | ------------------ |
| 0x00     | **`e_magic`**  | Magic Number                     | 2     | DOS 可执行文件标识 ("MZ") |
| 0x02     | `e_cblp`       | Bytes on Last Page               | 2     | 文件最后一页的字节数         |
| 0x04     | `e_cp`         | Pages in File                    | 2     | 文件中的页数             |
| 0x06     | `e_cric`       | Relocations                      | 2     | 重定位项数量             |
| 0x08     | `e_cparhdr`    | Size of Header in Paragraphs     | 2     | 头部段大小 (16 字节单位)    |
| 0x0A     | `e_minalloc`   | Minimum Extra Paragraphs         | 2     | 最小额外内存需求           |
| 0x0C     | `e_maxalloc`   | Maximum Extra Paragraphs         | 2     | 最大额外内存需求           |
| 0x0E     | `e_ss`         | Initial SS (Stack Segment)       | 2     | 初始堆栈段值             |
| 0x10     | `e_sp`         | Initial SP (Stack Pointer)       | 2     | 初始堆栈指针值            |
| 0x12     | `e_csum`       | Checksum                         | 2     | 校验和                |
| 0x14     | `e_ip`         | Initial IP (Instruction Pointer) | 2     | 初始指令指针值            |
| 0x16     | `e_cs`         | Initial CS (Code Segment)        | 2     | 初始代码段值             |
| 0x18     | `e_lfarlc`     | File Address of Relocation Table | 2     | 重定位表偏移地址           |
| 0x1A     | `e_ovno`       | Overlay Number                   | 2     | 覆盖号                |
| 0x1C     | `e_res[4]`     | Reserved Words                   | 8     | 保留字段               |
| 0x24     | `e_oemid`      | OEM Identifier                   | 2     | OEM 标识符            |
| 0x26     | `e_oeminfo`    | OEM Information                  | 2     | OEM 特定信息           |
| 0x28     | `e_res2[10]`   | Reserved Words                   | 20    | 保留字段               |
| **0x3C** | **`e_lfanew`** | File Address of New EXE Header   | **4** | **PE 头偏移 (关键字段)**  |
示例:
```
00000000: |4d 5a|90 00|03 00|00 00|04 00|00 00|ff ff|00 00|
00000010: |b8 00|00 00|00 00|00 00|40 00|00 00|{00 00,00 00,
00000020: 00 00,00 00}|00 00|00 00|{00 00,00 00,00 00,00 00,
00000030: 00 00,00 00,00 00,00 00,00 00,00 00}|08 01 00 00|
```
```c
struct _IMAGE_DOS_HEADER{
WORD e_magic = 0x5a4d;
WORD e_cblp = 0x0090;
WORD e_cp = 0x0003;
WORD e_cric = 0x0000;
WORD e_cparhdr = 0x0004;
WORD e_minalloc = 0x0000;
WORD e_maxalloc = 0xffff;
WORD e_ss = 0x0000;
WORD e_sp = 0x00b8;
WORD e_csum = 0x0000;
WORD e_ip = 0x0000;
WORD e_cs = 0x0000;
WORD e_lfarlc = 0x0040;
WORD e_ovno = 0x0000;
WORD e_res[4] = {0x0000,0x0000,0x0000,0x0000};
WORD e_oemid = 0x0000;
WORD e_oeminfo = 0x0000;
WORD e_res2[10] = {0000,0000,0000,0000,0000,0000,0000,0000,0000,0000};
DWORD e_lfanew = 0x00000108;
};
```
`e_lfanew` 指向位置的两个字节为字符 `'P','E'`