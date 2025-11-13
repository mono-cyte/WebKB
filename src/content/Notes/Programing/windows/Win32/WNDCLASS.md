---
title: WNDCLASS
aliases:
categories:
tags:
---

# WNDCLASS


| 成员名             | 数据类型      | 偏移量(十六进制) | 偏移量(十进制) | 大小(字节) |
| --------------- | --------- | --------- | -------- | ------ |
| `style`         | UINT      | 0x00      | 0        | 4      |
| `lpfnWndProc`   | WNDPROC   | 0x08      | 8        | 8      |
| `cbClsExtra`    | int       | 0x10      | 16       | 4      |
| `cbWndExtra`    | int       | 0x14      | 20       | 4      |
| `hInstance`     | HINSTANCE | 0x18      | 24       | 8      |
| `hIcon`         | HICON     | 0x20      | 32       | 8      |
| `hCursor`       | HCURSOR   | 0x28      | 40       | 8      |
| `hbrBackground` | HBRUSH    | 0x30      | 48       | 8      |
| `lpszMenuName`  | LPCSTR    | 0x38      | 56       | 8      |
| `lpszClassName` | LPCSTR    | 0x40      | 64       | 8      |
