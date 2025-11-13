---
title: Win32 线程
aliases:
categories:
tags:
---

# Win32 线程




## 结构

### 临界区 Critical Section

```c
CRITICAL_SECTION cs; //非内核对象
void InitializeCriticalSection(LPCRITICAL_SECTION lpCriticalSection); // 初始化
void EnterCriticalSection(LPCRITICAL_SECTION lpCriticalSection); // 占用
void LeaveCriticalSection(LPCRITICAL_SECTION lpCriticalSection); // 解锁
void DeleteCriticalSection(LPCRITICAL_SECTION lpCriticalSection); // 销毁

// 增强版本
BOOL InitializeCriticalSectionAndSpinCount( // 初始化并设置自旋计数
	LPCRITICAL_SECTION lpCriticalSection,
	DWORD dwSpinCount
);

BOOL TryEnterCriticalSection(LPCRITICAL_SECTION lpCriticalSection); // 尝试进入(不阻塞)
```

### 互斥体 Mutex

```c

HANDLE CreateMutex( //创建互斥体(内核对象)
                   LPSECURITY_ATTRIBUTES lpMutexAttributes,    //安全属性
                   BOOL bInitialOwner,                         //是否可被子进程继承
				   LPCSTR lpName                               //标识名称(字符串)
				   );

HANDLE OpenMutex( //打开互斥体
                 DWORD dwDesiredAccess, //访问权限
                 BOOL bInheritHandle,   //是否可被子进程继承
				 LPCSTR lpName          //标识名称(字符串)
				 );

BOOL ReleaseMutex(HANDLE hMutex); //解锁
```

### 事件 Event

```cpp
HANDLE CreateEvent( // 创建事件(内核对象)
				  LPSECURITY_ATTRIBUTES lpEventAttributes, // 安全属性
				  BOOL bManualReset,                       // 是否手动重置(TRUE=手动,FALSE=自动)
				  BOOL bInitialState,                      // 初始状态(TRUE=有信号,FALSE=无信号)
				  LPCSTR lpName                            // 事件名称
				  );

HANDLE OpenEvent( // 打开已存在的事件
				DWORD dwDesiredAccess, // 访问权限
				BOOL bInheritHandle,   // 是否可被子进程继承
				LPCSTR lpName          // 事件名称
				);

BOOL SetEvent(HANDLE hEvent);   // 设置事件为有信号状态
BOOL ResetEvent(HANDLE hEvent); // 设置事件为无信号状态
BOOL PulseEvent(HANDLE hEvent); // 脉冲事件(设置为有信号然后立即无信号)
```

### 信号量 Semaphore

```cpp

HANDLE CreateSemaphore( // 创建信号量(内核对象)
					  LPSECURITY_ATTRIBUTES lpSemaphoreAttributes, // 安全属性
					  LONG lInitialCount,                          // 初始计数
					  LONG lMaximumCount,                          // 最大计数
					  LPCSTR lpName                                // 信号量名称
					  );

HANDLE OpenSemaphore( // 打开已存在的信号量
					DWORD dwDesiredAccess, // 访问权限
					BOOL bInheritHandle,   // 是否可被子进程继承
					LPCSTR lpName          // 信号量名称
					);

BOOL ReleaseSemaphore( // 释放信号量
					 HANDLE hSemaphore,     // 信号量句柄
					 LONG lReleaseCount,    // 释放的数量
					 LPLONG lpPreviousCount // 之前的计数(可选)
					 );

```