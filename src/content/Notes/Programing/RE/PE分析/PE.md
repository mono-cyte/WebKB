---
title: PE
aliases:
categories:
tags:
---

# PE
硬盘对齐
内存对齐
分页

- [DOS头](DOS%20HEADER.md)
	- `e_magic`
	- `e_lfanew`
- [PE头](NT%20Header/NT%20HEADER.md)
	- 标准
		- `Machine`
		- `NumberOfSections`
		- `TimeDateStamp`
		- `SizeOfOptionalHeader`
	- 可选
		- `Magic`
		- `SizeOfCode`
		- `SizeOfInitializedData`
		- `SizeOfUninitializedData`
		- `AddressOfEntryPoint`
		- `BaseOfCode`
		- `BaseOfData`
		- `ImageBase`
		- `SectionAlignment`
		- `FileAlignment`
		- `SizeOfImage`
		- `SizeOfHeaders`
		- `CheckSum`
		- `SizeOfStackReserve`
		- `SizeOfStackCommit`
		- `SizeOfHeapReserve`
		- `SizeOfHeapCommit
- 节表
- .text
- .rdata
- .data


内存入口 = `ImageBase` + `AddressOfEntryPoint`

|   属性   |     FileBuffer     |   ImageBuffer    |
| :----: | :----------------: | :--------------: |
|  起始地址  |         0          |   `ImageBase`    |
|  节区偏移  | `PointerToRawData` | `VirtualAddress` |
| 节区实际尺寸 |       `Misc`       |      `Misc`      |
| 节区对齐尺寸 |  `SizeOfRawData`   |        ?         |
