---
title: Process Environment Block
aliases:
categories:
tags:
---

# Process Environment Block

`_TEB` 结构体成员 `ProcessEnvironmentBlock` 指向
```c
//xp

typedef struct _PEB { // Size: 0x1D8
 	UCHAR           InheritedAddressSpace;
    UCHAR           ReadImageFileExecOptions;
    UCHAR           BeingDebugged;              //Debug运行标志
    UCHAR           SpareBool;
    HANDLE          Mutant;
    HINSTANCE       ImageBaseAddress;           //程序加载的基地址
    struct _PEB_LDR_DATA    *Ldr                //Ptr32 _PEB_LDR_DATA
    struct _RTL_USER_PROCESS_PARAMETERS  *ProcessParameters;
    ULONG           SubSystemData;
    HANDLE          DefaultHeap;
    KSPIN_LOCK      FastPebLock;
    ULONG           FastPebLockRoutine;
    ULONG           FastPebUnlockRoutine;
    ULONG           EnvironmentUpdateCount;
    ULONG           KernelCallbackTable;
    LARGE_INTEGER   SystemReserved;
    struct _PEB_FREE_BLOCK  *FreeList
    ULONG           TlsExpansionCounter;
    ULONG           TlsBitmap;
    LARGE_INTEGER   TlsBitmapBits;
    ULONG           ReadOnlySharedMemoryBase;
    ULONG           ReadOnlySharedMemoryHeap;
    ULONG           ReadOnlyStaticServerData;
    ULONG           AnsiCodePageData;
    ULONG           OemCodePageData;
    ULONG           UnicodeCaseTableData;
    ULONG           NumberOfProcessors;
    LARGE_INTEGER   NtGlobalFlag;               // Address of a local copy
    LARGE_INTEGER   CriticalSectionTimeout;
    ULONG           HeapSegmentReserve;
    ULONG           HeapSegmentCommit;
    ULONG           HeapDeCommitTotalFreeThreshold;
    ULONG           HeapDeCommitFreeBlockThreshold;
    ULONG           NumberOfHeaps;
    ULONG           MaximumNumberOfHeaps;
    ULONG           ProcessHeaps;
    ULONG           GdiSharedHandleTable;
    ULONG           ProcessStarterHelper;
    ULONG           GdiDCAttributeList;
    KSPIN_LOCK      LoaderLock;
    ULONG           OSMajorVersion;
    ULONG           OSMinorVersion;
    USHORT          OSBuildNumber;
    USHORT          OSCSDVersion;
    ULONG           OSPlatformId;
    ULONG           ImageSubsystem;
    ULONG           ImageSubsystemMajorVersion;
    ULONG           ImageSubsystemMinorVersion;
    ULONG           ImageProcessAffinityMask;
    ULONG           GdiHandleBuffer[0x22];
    ULONG           PostProcessInitRoutine;
    ULONG           TlsExpansionBitmap;
    UCHAR           TlsExpansionBitmapBits[0x80];
    ULONG           SessionId;
	AppCompatFlags   : _ULARGE_INTEGER
	AppCompatFlagsUser : _ULARGE_INTEGER
	pShimData        : Ptr32 Void
	AppCompatInfo    : Ptr32 Void
	CSDVersion       : _UNICODE_STRING
	ActivationContextData : Ptr32 Void
	ProcessAssemblyStorageMap :Ptr32 Void
	SystemDefaultActivationContextData : Ptr32 Void
	SystemAssemblyStorageMap : Ptr32 Void
	MinimumStackCommit : Uint4B
} PEB, *PPEB;
```



| Offset  | 字段名                                | Bytes | 描述                                                     |
| ------- | ---------------------------------- | ----- | ------------------------------------------------------ |
| 000h    | InheritedAddressSpace              | 1     | 继承地址空间标志（通常为0）                                         |
| 001h    | ReadImageFileExecOptions           | 1     | 映像文件执行选项读取标志                                           |
| 002h    | BeingDebugged                      | 1     | 调试标志（1表示进程正在被调试）[1,2](@ref)                            |
| 003h    | SpareBool                          | 1     | 保留布尔值（未使用）                                             |
| 004h    | Mutant                             | 4     | 互斥体句柄                                                  |
| 008h    | ImageBaseAddress                   | 4     | 进程映像基地址（`GetModuleHandle(NULL)` 的底层来源）[1,4](@ref)      |
| 00Ch    | Ldr                                | 4     | 指向 `_PEB_LDR_DATA` 的指针（管理进程加载的模块链表）[1,4](@ref)         |
| 010h    | ProcessParameters                  | 4     | 指向 `_RTL_USER_PROCESS_PARAMETERS` 的指针（进程启动参数）[4](@ref) |
| 014h    | SubSystemData                      | 4     | 子系统保留数据                                                |
| 018h    | DefaultHeap                        | 4     | 默认堆句柄                                                  |
| 01Ch    | FastPebLock                        | 4     | 快速锁（同步访问PEB）                                           |
| 020h    | FastPebLockRoutine                 | 4     | 快速锁回调函数地址                                              |
| 024h    | FastPebUnlockRoutine               | 4     | 快速解锁回调函数地址                                             |
| 028h    | EnvironmentUpdateCount             | 4     | 环境变量更新计数器                                              |
| 02Ch    | KernelCallbackTable                | 4     | 内核回调表地址                                                |
| 030h    | SystemReserved                     | 8     | 系统保留字段（`LARGE_INTEGER` 类型）                             |
| 038h    | FreeList                           | 4     | 指向空闲内存块链表的指针                                           |
| 03Ch    | TlsExpansionCounter                | 4     | TLS（线程本地存储）扩展计数器                                       |
| 040h    | TlsBitmap                          | 4     | TLS位图指针                                                |
| 044h    | TlsBitmapBits                      | 8     | TLS位图数据（`LARGE_INTEGER`）                               |
| 04Ch    | ReadOnlySharedMemoryBase           | 4     | 只读共享内存基地址                                              |
| 050h    | ReadOnlySharedMemoryHeap           | 4     | 只读共享内存堆句柄                                              |
| 054h    | ReadOnlyStaticServerData           | 4     | 只读静态服务器数据指针                                            |
| 058h    | AnsiCodePageData                   | 4     | ANSI代码页数据指针                                            |
| 05Ch    | OemCodePageData                    | 4     | OEM代码页数据指针                                             |
| 060h    | UnicodeCaseTableData               | 4     | Unicode大小写转换表指针                                        |
| 064h    | NumberOfProcessors                 | 4     | 处理器数量                                                  |
| 068h    | NtGlobalFlag                       | 8     | 全局标志（调试/堆检查标志）[1,2](@ref)                              |
| 070h    | CriticalSectionTimeout             | 8     | 临界区超时时间（`LARGE_INTEGER`）                               |
| 078h    | HeapSegmentReserve                 | 4     | 堆段保留大小                                                 |
| 07Ch    | HeapSegmentCommit                  | 4     | 堆段提交大小                                                 |
| 080h    | HeapDeCommitTotalFreeThreshold     | 4     | 堆释放总空闲阈值                                               |
| 084h    | HeapDeCommitFreeBlockThreshold     | 4     | 堆释放空闲块阈值                                               |
| 088h    | NumberOfHeaps                      | 4     | 堆数量                                                    |
| 08Ch    | MaximumNumberOfHeaps               | 4     | 最大堆数量                                                  |
| 090h    | ProcessHeaps                       | 4     | 进程堆数组指针                                                |
| 094h    | GdiSharedHandleTable               | 4     | GDI共享句柄表指针                                             |
| 098h    | ProcessStarterHelper               | 4     | 进程启动帮助器指针                                              |
| 09Ch    | GdiDCAttributeList                 | 4     | GDI设备上下文属性列表                                           |
| 0A0h    | LoaderLock                         | 4     | 加载器锁指针（同步模块加载）[4](@ref)                                |
| 0A4h    | OSMajorVersion                     | 4     | 操作系统主版本号                                               |
| 0A8h    | OSMinorVersion                     | 4     | 操作系统次版本号                                               |
| 0ACh    | OSBuildNumber                      | 2     | 操作系统构建号                                                |
| 0AEh    | OSCSDVersion                       | 2     | 操作系统补丁版本号                                              |
| 0B0h    | OSPlatformId                       | 4     | 操作系统平台标识符                                              |
| 0B4h    | ImageSubsystem                     | 4     | 映像子系统类型                                                |
| 0B8h    | ImageSubsystemMajorVersion         | 4     | 映像子系统主版本号                                              |
| 0BCh    | ImageSubsystemMinorVersion         | 4     | 映像子系统次版本号                                              |
| 0C0h    | ImageProcessAffinityMask           | 4     | 进程亲和性掩码                                                |
| 0C4h    | GdiHandleBuffer                    | 136   | GDI句柄缓冲区（34个`ULONG`）                                   |
| 14Ch    | PostProcessInitRoutine             | 4     | 进程初始化后回调函数指针                                           |
| 150h    | TlsExpansionBitmap                 | 4     | TLS扩展位图指针                                              |
| 154h    | TlsExpansionBitmapBits             | 128   | TLS扩展位图数据（128字节）                                       |
| 1D4h    | SessionId                          | 4     | 会话ID                                                   |
| 1D8h    | AppCompatFlags                     | 8     | 应用兼容性标志（`_ULARGE_INTEGER`）                             |
| 1E0h    | AppCompatFlagsUser                 | 8     | 用户层应用兼容性标志                                             |
| 1E8h    | pShimData                          | 4     | 兼容性垫片数据指针                                              |
| 1ECh    | AppCompatInfo                      | 4     | 应用兼容性信息指针                                              |
| 1F0h    | CSDVersion                         | 8     | 补丁版本信息（`_UNICODE_STRING`）                              |
| 1F8h    | ActivationContextData              | 4     | 激活上下文数据指针                                              |
| 1FCh    | ProcessAssemblyStorageMap          | 4     | 进程程序集存储映射指针                                            |
| 200h    | SystemDefaultActivationContextData | 4     | 系统默认激活上下文指针                                            |
| 204h    | SystemAssemblyStorageMap           | 4     | 系统程序集存储映射指针                                            |
| 208h    | MinimumStackCommit                 | 4     | 线程栈最小提交大小                                              |