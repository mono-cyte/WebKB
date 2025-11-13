---
title: Win32 消息
aliases:
categories:
tags:
---

# Win32 消息


## 使用场景

### 消息处理函数

由操作系统调用的 callback 函数, 其参数固定规范: `(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)`

```c
LRESULT CALLBACK myWindowProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {

    switch (msg) {
    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;
    }

    return DefWindowProc(hwnd, msg, wParam, lParam); // default window procedure

}
```
### 窗口类设置

```c
// 注册新窗口类, 由操作系统创建窗口

    WNDCLASS wnd = {0};                        // 创建窗口类

    wnd.lpfnWndProc = WindowProc;              // 窗口消息处理函数
```

### 消息循环

```c
MSG msg;

while (GetMessage(&msg, NULL, 0, 0)) {
    TranslateMessage(&msg);
    DispatchMessage(&msg);
}
```