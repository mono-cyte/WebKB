---
aliases:
  - 导入表
---
# 导入表

> `Data_Directories[0]`
```c
struct _IMAGE_IMPORT_DESCRIPTOR{
	union {
		DWORD Characteristics;
		DWORD OriginalFisrstThunk;
	};
	DWORD TimeDateStamp;
	DWORD ForwarderChain;
	DWORD Name;
	DWORD FirstThunk;
};
```


| offset | 字段名                                   | bytes | 描述                                        |
| ------ | ------------------------------------- | ----- | ----------------------------------------- |
| 0x0    | Characteristics<br>OriginalFirstThunk | 4     | 联合体成员<br>通常指向**导入名称表（INT）**的 RVA, 以全0结构结束 |
| 0x4    | TimeDateStamp                         | 4     | 时间戳：0=未绑定，-1=绑定但时间戳不匹配，其他值=绑定 DLL 的时间戳    |
| 0x8    | ForwarderChain                        | 4     | 转发链索引（第一个转发的函数序号），无转发时为 0                 |
| 0xC    | Name                                  | 4     | **DLL 名称**的 RVA（指向以空字符结尾的导入模块名称字符串）       |
| 0x10   | FirstThunk                            | 4     | 指向**导入地址表（IAT）**的 RVA<br>加载时由系统替换为实际函数地址  |

硬盘中 INT=IAT
内存中 IAT 修正为地址表

```c
struct _IMAGE_THUNK_DATA32{
	union {
		PBYTE ForwarderString;
		PDWORD Function;
		DWORD Ordinal; //序号
		PIMAGE_IMPORT_BY_NAME_AddressOfData; //_IMAGE_IMPORT_BY_NAME指针
	} ul;
};
```
所有字段共享相同的 **4 byte**内存位置
- 按序号导入: 最高位为 1 时，低 31 位表示函数序号
- 按名称导入: 最高位为 0 时，指向 `IMAGE_IMPORT_BY_NAME` 结构的 RVA
```c
struct _IMAGE_IMPORT_BY_NAME{
	WORD Hint;    //函数在导出表索引
	BYTE Name[];  //函数名字符串, 0结尾, 此处表示结构连续性
};
```

| offset | 字段名  | bytes | 描述                                       |
| ------ | ---- | ----- | ---------------------------------------- |
| 0      | Hint | 2     | **提示序号**：函数在目标 DLL 导出表中的建议索引（加载器可能忽略）    |
| 2      | Name | 可变    | **函数名称**：以 `NULL` 结尾的 ASCII 字符串，表示导入的函数名 |