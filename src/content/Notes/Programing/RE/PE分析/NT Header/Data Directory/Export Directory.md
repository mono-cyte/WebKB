---
aliases:
  - 导出表
---
# 导出表

`Data_Directories[0]`

```c
#define IMAGE_DIRECTORY_ENTRY_EXPORT          0   // Export Directory
 
typedef struct _IMAGE_EXPORT_DIRECTORY {              
    DWORD   Characteristics;        // 未使用      
    DWORD   TimeDateStamp;          // 时间戳      
    WORD    MajorVersion;           // 未使用      
    WORD    MinorVersion;           // 未使用      
    DWORD   Name;                   // 指向该导出表的文件名字符串RVA    
    DWORD   Base;                   // 导出函数的起始序号      
    DWORD   NumberOfFunctions;      // 所有导出函数的个数      
    DWORD   NumberOfNames;          // 以函数名字导出的函数个数      
    DWORD   AddressOfFunctions;     // 导出函数地址表RVA              
    DWORD   AddressOfNames;         // 导出函数名称表RVA              
    DWORD   AddressOfNameOrdinals;  // 导出函数序号表RVA               
}IMAGE_EXPORT_DIRECTORY, *PIMAGE_EXPORT_DIRECTORY;              
```

| offset | 字段名                   | bytes | 描述                                |
| ------ | --------------------- | ----- | --------------------------------- |
| 0      | Characteristics       | 4     | 未使用                               |
| 4      | TimeDateStamp         | 4     | 时间戳                               |
| 8      | MajorVersion          | 2     | 未使用                               |
| 10     | MinorVersion          | 2     | 未使用                               |
| 12     | Name                  | 4     | 指向导出表文件名的字符串RVA                   |
| 16     | Base                  | 4     | 导出函数的起始序号                         |
| 20     | NumberOfFunctions     | 4     | 导出函数的总数量                          |
| 24     | NumberOfNames         | 4     | 按名称导出的函数数量                        |
| 28     | AddressOfFunctions    | 4     | 导出函数地址表的RVA, 长度 NumberOfFunctions |
| 32     | AddressOfNames        | 4     | 导出函数名称表的RVA, 长度 NumberOfNames     |
| 36     | AddressOfNameOrdinals | 4     | 导出函数序号表的RVA, 长度 NumberOfNames     |




## 寻址方式

### 名称 


```mermaid
    graph LR
    A[函数名称] -->|遍历名称表| B[名称索引 i]
    B -->|查序数表| C[序数 ordinal]
    C -->|查函数表| D[函数地址]
```

### 序号

```mermaid
graph LR
    A[函数序号] -->|减去Base| B[索引 index]
    B -->|查函数表| C[函数地址]
```
