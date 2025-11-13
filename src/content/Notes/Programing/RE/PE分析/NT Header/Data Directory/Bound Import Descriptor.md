---
aliases:
  - 绑定导入表
title: Bound Import Descriptor
categories:
tags:
---

# Bound Import Descriptor
# 绑定导入表

> `Data_Directories[11]`

```c
struct _IMAGE_BOUND_IMPORT_DESCRIPTOR{
	DWORD TimeDateStamp;
	WORD OffsetModuleName;
	WORD NumberOfModuleForwarderRefs;
};

struct _IMAGE_BOUND_FORWARDER_REF{
	DWORD TimeDateStamp;
	WORD OffsetModuleName;
	WORD Reserved;
};
```