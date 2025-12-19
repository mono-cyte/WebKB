---
title: VirtualQueryEx逆向记录
aliases: VirtualQueryEx逆向记录
categories:
tags:
---

# VirtualQueryEx逆向记录
## 调试内容查看

|                  | 机器码                   | 汇编                                         | 注释                           |
| ---------------- | --------------------- | ------------------------------------------ | ---------------------------- |
| 00007FF838EA40E0 | 48:83EC 48            | sub rsp,0x48                               | 栈扩展 0x48                     |
| 00007FF838EA40E4 | 48:8D4424 30          | lea rax,qword ptr ss:[rsp+0x30]            | rax = &[当前栈底+0x30]           |
| 00007FF838EA40E9 | 48:C74424 30 00000000 | mov qword ptr ss:[rsp+0x30],0x0            | [当前栈底+0x30] = 0              |
| 00007FF838EA40F2 | 48:894424 28          | mov qword ptr ss:[rsp+0x28],rax            | 准备参数6: [当前栈底+0x28] = rax     |
| 00007FF838EA40F7 | 4C:894C24 20          | mov qword ptr ss:[rsp+0x20],r9             | 准备参数5: [rsp+0x20] = r9 (参数4) |
| 00007FF838EA40FC | 4D:8BC8               | mov r9,r8                                  | 准备参数4: r9 = r8 (参数3)         |
| 00007FF838EA40FF | 45:33C0               | xor r8d,r8d                                | 准备参数3: r8d = 0               |
| 00007FF838EA4102 | 48:FF15 1FC81B00      | call qword ptr ds:[<NtQueryVirtualMemory>] | NtQueryVirtualMemory 4参数     |
| 00007FF838EA4109 | 0F1F4400 00           | nop dword ptr ds:[rax+rax],eax             |                              |
| 00007FF838EA410E | 85C0                  | test eax,eax                               |                              |
| 00007FF838EA4110 | 78 0B                 | js kernelbase.7FF838EA411D                 | if (eax < 0) 跳转报错分支          |
| 00007FF838EA4112 | 48:8B4424 30          | mov rax,qword ptr ss:[rsp+0x30]            | 返回 [rsp+30]                  |
| 00007FF838EA4117 | 48:83C4 48            | add rsp,0x48                               |                              |
| 00007FF838EA411B | C3                    | ret                                        |                              |
| 00007FF838EA411C | CC                    | int3                                       |                              |
| 00007FF838EA411D | 8BC8                  | mov ecx,eax                                |                              |
| 00007FF838EA411F | E8 ECEAF6FF           | call kernelbase.7FF838E12C10               |                              |
| 00007FF838EA4124 | 33C0                  | xor eax,eax                                |                              |
| 00007FF838EA4126 | EB EF                 | jmp kernelbase.7FF838EA4117                |                              |
## 还原代码

```
fn (arg1: ?, arg2: ?, arg3: usize, arg4: usize) usize {
    # rax = &[当前栈底+0x30]

    var1 = 0 # [当前栈底+0x30] = 0
    var2 = &var1 # [当前栈底+0x28] = rax
    var3 = arg4 # [rsp+0x20] = r9

    # r9 = r8
    # r8d = 0

    rc = NtQueryVirtualMemory(arg1, arg2, 0, arg3, arg4, var2)

    if (rc < 0):
        error()

    return var1
}

```

```c

SIZE_T VirtualQueryEx(
  [in]           HANDLE                    hProcess,
  [in, opt]      LPCVOID                   lpAddress,
  [out]          PMEMORY_BASIC_INFORMATION lpBuffer,
  [in]           SIZE_T                    dwLength
);


NTSTATUS NtQueryVirtualMemory(
    [in] HANDLE ProcessHandle,
    [in,opt] PVOID BaseAddress,
    [in] MEMORY_INFORMATION_CLASS MemoryInformationClass,
    _Out_writes_bytes_(MemoryInformationLength) PVOID MemoryInformation,
    [in] SIZE_T MemoryInformationLength,
    [out,opt] PSIZE_T ReturnLength
    );
```
