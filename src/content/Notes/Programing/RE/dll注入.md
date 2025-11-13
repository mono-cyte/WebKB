---
title: dll注入
aliases:
categories:
tags:
---

# dll注入

## 注入表注入

## 导入表注入

## DLL劫持

应用运行目录下使用自己的 KERNEL32.dll 转发或处理相关函数

## 远程线程注入

## 无DLL注入

## Apc注入

## 消息hook注入

1. 在DLL提供hook回调函数

```c
typedef LRESULT (CALLBACK* HOOKPROC)(
	int code,
	WPARAM wParam,
	LPARAM lParam
); // 固定hook回调格式
```
```cpp
extern "C" _declspec(dllexport) LRESULT MessageHook(int code, WPARAM, wParam, LPARAM lParam){
	
	return 0;
}
```
2. 设置Hook

```cpp

// 安装hook
HHOOK SetWindowsHookEx(
	int       idHook,    // hook类型
	HOOKPROC  lpfn,      // hook回调
	HINSTANCE hmod,      // hook回调所在模块的句柄: 如果dwThreadId是本进程的线程，填NULL
	DWORD     dwThreadId // hook的目标线程: 0为全局hook, 否则为具体线程
);

// 卸载hook
BOOL UnhookWindowsHookEx(
	HHOOK hhk  // SetWindowsHookExW的返回值
);

```

```cpp
// 获取注入的hook模块                                              hmod
// 从模块获取回调函数地址                                           lpfn
// 遍历快照找到属于目标进程的线程(THREADENTREY32: te32.th32ThreadID) dwThreadId  

HHOOK hook = SetWindowsHookEx(WH_GETMESSAGE, lpfn, hmod, dwThreadId);

```

## 输入法注入