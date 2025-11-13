---
aliases:
  - IMAGE_DATA_DIRECTORY
  - "*PIMAGE_DATA_DIRECTORY"
---
```c
// Directory Entries

#define IMAGE_DIRECTORY_ENTRY_EXPORT          0   // Export Directory

#define IMAGE_DIRECTORY_ENTRY_IMPORT          1   // Import Directory

#define IMAGE_DIRECTORY_ENTRY_RESOURCE        2   // Resource Directory

#define IMAGE_DIRECTORY_ENTRY_EXCEPTION       3   // Exception Directory

#define IMAGE_DIRECTORY_ENTRY_SECURITY        4   // Security Directory

#define IMAGE_DIRECTORY_ENTRY_BASERELOC       5   // Base Relocation Table

#define IMAGE_DIRECTORY_ENTRY_DEBUG           6   // Debug Directory

//      IMAGE_DIRECTORY_ENTRY_COPYRIGHT       7   // (X86 usage)

#define IMAGE_DIRECTORY_ENTRY_ARCHITECTURE    7   // Architecture Specific Data

#define IMAGE_DIRECTORY_ENTRY_GLOBALPTR       8   // RVA of GP

#define IMAGE_DIRECTORY_ENTRY_TLS             9   // TLS Directory

#define IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG    10   // Load Configuration Directory

#define IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT   11   // Bound Import Directory in headers

#define IMAGE_DIRECTORY_ENTRY_IAT            12   // Import Address Table

#define IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT   13   // Delay Load Import Descriptors

#define IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR 14   // COM Runtime descriptor

typedef struct _IMAGE_DATA_DIRECTORY {
	DWORD VirtualAddress;
	DWORD Size;
} IMAGE_DATA_DIRECTORY, *PIMAGE_DATA_DIRECTORY;

```

| 索引  | 大小  | 名称                      | 名称   | 描述                        | url                                                                                                                   | 结构体                  |
| --- | --- | ----------------------- | ---- | ------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 0   | 8   | Export Table            | 导出表  | 导出表地址和大小                  | [.edata](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-edata-section-image-only)                | [Export Directory](Export%20Directory.md) |
| 1   | 8   | Import Table            | 导入表  | 导入表地址和大小                  | [.idata](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-idata-section)                           |                      |
| 2   | 8   | Resource Table          |      | 资源表地址和大小                  | [.rsrc](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-rsrc-section)                             |                      |
| 3   | 8   | Exception Table         |      | 异常表地址和大小                  | [.pdata](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-pdata-section)                           |                      |
| 4   | 8   | Certificate Table       |      | 属性证书表地址和大小                | [属性证书表](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-attribute-certificate-table-image-only)   |                      |
| 5   | 8   | Base Relocation Table   | 重定位表 | 基本重定位表地址和大小               | [.reloc](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-reloc-section-image-only)                |                      |
| 6   | 8   | Debug                   |      | 调试数据起始地址和大小               | [.debug](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-debug-section)                           |                      |
| 7   | 8   | Architecture            |      | 已保留, 必须为 0                |                                                                                                                       |                      |
| 8   | 8   | Global Ptr              |      | 存储在全局指针寄存器中的值的 RVA, 必须为 0 |                                                                                                                       |                      |
| 9   | 8   | TLS Table               |      | 线程本地存储 （TLS） 表地址和大小       | [.tls](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-tls-section)                               |                      |
| 10  | 8   | Load Config Table       |      | 负载配置表地址和大小                | [加载配置结构](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-load-configuration-structure-image-only) |                      |
| 11  | 8   | Bound Import            |      | 绑定的导入表地址和大小               |                                                                                                                       |                      |
| 12  | 8   | Import Address Table    | IAT  | 导入地址表地址和大小                | [导入地址表](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#import-address-table)                         |                      |
| 13  | 8   | Delay Import Descriptor |      | 延迟导入描述符地址和大小              | [延迟加载导入表](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#delay-load-import-tables-image-only)        |                      |
| 14  | 8   | CLR Runtime Header      |      | CLR 运行时标头地址和大小            | [.cormeta](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format#the-cormeta-section-object-only)           |                      |
| 15  | 8   | Reserved<br>            |      | 已保留，必须为零                  |                                                                                                                       |                      |
