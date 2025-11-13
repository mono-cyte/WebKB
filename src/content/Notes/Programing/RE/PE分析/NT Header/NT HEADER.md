---
title: NT HEADER
aliases:
categories:
tags:
---

# NT HEADER
```c
struct _IMAGE_NT_HEADERS{
DWORD Signature;
IMAGE_FILE_HEADER FileHeader;
IMAGE_OPTIONAL_HEADER OptionalHeader;
};
```

包含:
1. [FILE HEADER](FILE%20HEADER.md)
2. [OPTIONAL HEADER](OPTIONAL%20HEADER.md)


`Signature` 即 `_IMAGE_DOS_HEADER.e_lfanew` 指向位置

```c
DWORD Signature = 0x00004550;
```