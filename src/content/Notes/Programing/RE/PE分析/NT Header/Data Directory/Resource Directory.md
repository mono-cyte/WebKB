---
title: Resource Directory
aliases:
categories:
tags:
---

# Resource Directory
```c
struct _IMAGE_
# Resource Directory
RESOURCE_DIRECTORY{ // 资源目录
	DWORD Characteristics;
	DWORD TimeDateStamp;
	WORD MajorVersion;
	WORD MinorVersion;
	WORD NumberOfNameEntries;
	WORD NumberOfIdEntries;
	_IMAGE_RESOURCE_DIRECTORY_ENTRY DirectoryEntries[];
};
```

```c
struct _IMAGE_RESOURCE_DIRECTORY_ENTRY{
	union{ // 目录项名称
		struct{
			DWORD NameOffset:31;
			DWORD NameIsString:1;
		};
		DWORD Name;
		WORD Id;
	};
	union{
		DWORD OffsetToData; //目录项指针
		struct{
			DWORD OffsetToDirectory:31; //位域
			DWORD DataIsDirectory:1;
		};
	};
};
```

```c
struct _IMAGE_RESOURCE_DIR_STRING_U{
	WORD Length;
	WCHAR NameString[];  // 非0结尾
};
```


`_IMAGE_RESOURCE_DIRECTORY` 是 Windows PE 文件资源段的核心目录结构，用于组织资源数据（如图标、字符串表、对话框等）。它位于资源段的起始位置，后跟多个 `_IMAGE_RESOURCE_DIRECTORY_ENTRY` 条目。


|Offset|字段名|大小 (Bytes)|描述|
|---|---|---|---|
|0|`Characteristics`|4|资源属性标志（通常为 0）|
|4|`TimeDateStamp`|4|资源创建时间戳（UTC 时间）|
|8|`MajorVersion`|2|主版本号|
|10|`MinorVersion`|2|次版本号|
|12|`NumberOfNameEntries`|2|**命名条目数量**（通过字符串标识的资源数量）|
|14|`NumberOfIdEntries`|2|**ID 条目数量**（通过整数 ID 标识的资源数量）|
|**16**|`DirectoryEntries[]`|-|**条目数组**（紧随结构体后，总条目数 = `NumberOfNameEntries + NumberOfIdEntries`）|

---

每个条目描述一个资源类型（如 `RT_ICON`）、资源名称或语言 ID。条目通过两个联合体动态解释数据：

1. **名称字段联合体**  
    标识资源的名称（字符串或整数 ID）。
    
2. **偏移字段联合体**  
    指向子目录（`DataIsDirectory=1`）或资源数据（`DataIsDirectory=0`）。
    

#### 内存布局

| Offset        | 字段名 / 位域                      | 大小 (Bytes) | 描述                                                                                                                              |
| ------------- | ----------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **名称字段（联合体）** |                               |            |                                                                                                                                 |
| 0-3           | `Name`                        | 4          | - 若 `NameIsString=1`：低 31 位 `NameOffset` 为`_IMAGE_RESOURCE_DIR_STRING_U`指针<br>- 若 `NameIsString=0`：`DWORD` 为 ID                 |
|               | `NameOffset` (位域 0-30)        | (31 bits)  | 字符串名称的偏移量（相对于资源目录基址）                                                                                                            |
|               | `NameIsString` (位域 31)        | (1 bit)    | **名称类型标志**：  <br>- `1`：`NameOffset` 字符串  <br>- `0`：`Name`是整数 ID                                                                 |
| **偏移字段（联合体）** |                               |            |                                                                                                                                 |
| 4-7           | `OffsetToData`                | 4          | - 若 `DataIsDirectory=1`：低 31 位 `OffsetToDirectory` + 资源地址 = 下层目录地址<br>- 若 `DataIsDirectory=0`：直接指向 `_IMAGE_RESOURCE_DATA_ENTRY` |
|               | `OffsetToDirectory` (位域 0-30) | (31 bits)  | 子目录的偏移量（相对于资源目录基址）                                                                                                              |
|               | `DataIsDirectory` (位域 31)     | (1 bit)    | - `1`：指向子目录  <br>- `0`：指向资源数据<br>(在1,2层中均为1)                                                                                    |
