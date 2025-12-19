---
title: VirtualProtectEx逆向记录
aliases: VirtualProtectEx逆向记录
categories:
tags:
---

# VirtualProtectEx逆向记录
## 调试内容查看

|                  | 机器码              | 汇编                                              | 注释                                             |
| ---------------- | ---------------- | ----------------------------------------------- | ---------------------------------------------- |
| 00007FF838E8C6B0 | 48:895C24 08     | mov qword ptr ss:[rsp+0x8],rbx                  | [旧栈+0x8] shadow space 保存 rbx?                  |
| 00007FF838E8C6B5 | 4C:894424 18     | mov qword ptr ss:[rsp+0x18],r8                  | [旧栈+0x18] shadow space 保存 当前参数3                |
| 00007FF838E8C6BA | 48:895424 10     | mov qword ptr ss:[rsp+0x10],rdx                 | [旧栈+0x10] shadow space 保存 当前参数2                |
| 00007FF838E8C6BF | 55               | push rbp                                        | 保留寄存器 (!额外偏移rsp+=0x8)                          |
| 00007FF838E8C6C0 | 56               | push rsi                                        | 保留寄存器 (!额外偏移rsp+=0x8)                          |
| 00007FF838E8C6C1 | 57               | push rdi                                        | 保留寄存器 (!额外偏移rsp+=0x8)                          |
| 00007FF838E8C6C2 | 48:83EC 30       | sub rsp,0x30                                    | 栈扩展: 0x30 (后续追溯旧栈需要移除 栈扩展+额外偏移: 0x48)          |
| 00007FF838E8C6C6 | 48:8B6C24 70     | mov rbp,qword ptr ss:[rsp+0x70]                 | rbp = [当前栈底+0x70] (旧栈+0x28, 当前参数5)             |
| 00007FF838E8C6CB | 4C:8D4424 60     | lea r8,qword ptr ss:[rsp+0x60]                  | r8 = &[当前栈底+0x60] (旧栈+0x18, 当前参数3)             |
| 00007FF838E8C6D0 | 48:8D5424 58     | lea rdx,qword ptr ss:[rsp+0x58]                 | rdx = &[当前栈底+0x58] (旧栈+0x10, 当前参数2)            |
| 00007FF838E8C6D5 | 48:896C24 20     | mov qword ptr ss:[rsp+0x20],rbp                 | rbp -> [当前栈底+0x20] shadow space备份(语境:准备call)   |
| 00007FF838E8C6DA | 41:8BF1          | mov esi,r9d                                     | esi = r9d (当前参数4)                              |
| 00007FF838E8C6DD | 48:8BF9          | mov rdi,rcx                                     | rdi = rcx (当前参数1)                              |
| 00007FF838E8C6E0 | 48:FF15 A9481D00 | call qword ptr ds:[<NtProtectVirtualMemory>]    | NtProtectVirtualMemory: 4参数(修改内存保护)            |
| 00007FF838E8C6E7 | 0F1F4400 00      | nop dword ptr ds:[rax+rax],eax                  |                                                |
| 00007FF838E8C6EC | 8BD8             | mov ebx,eax                                     | ebx = eax(返回值)                                 |
| 00007FF838E8C6EE | 85C0             | test eax,eax                                    |                                                |
| 00007FF838E8C6F0 | 78 13            | js kernelbase.7FF838E8C705                      | if (返回值 < 0) 跳转错误分支                            |
| 00007FF838E8C6F2 | B8 01000000      | mov eax,0x1                                     | 此函数返回 1                                        |
| 00007FF838E8C6F7 | 48:8B5C24 50     | mov rbx,qword ptr ss:[rsp+0x50]                 | rbx = [当前栈底+0x50] (旧栈+0x30)                    |
| 00007FF838E8C6FC | 48:83C4 30       | add rsp,0x30                                    | 平栈                                             |
| 00007FF838E8C700 | 5F               | pop rdi                                         |                                                |
| 00007FF838E8C701 | 5E               | pop rsi                                         |                                                |
| 00007FF838E8C702 | 5D               | pop rbp                                         |                                                |
| 00007FF838E8C703 | C3               | ret                                             |                                                |
| 00007FF838E8C704 | CC               | int3                                            |                                                |
| 00007FF838E8C705 | 3D 450000C0      | cmp eax,0xC0000045                              | 错误处理 if(返回值 == 0xC0000045) ... else 跳转报错分支     |
| 00007FF838E8C70A | 75 47            | jne kernelbase.7FF838E8C753                     |                                                |
| 00007FF838E8C70C | 48:83FF FF       | cmp rdi,0xFFFFFFFFFFFFFFFF                      | if (rdi? == -1) ... else 跳转报错分支                |
| 00007FF838E8C710 | 75 41            | jne kernelbase.7FF838E8C753                     |                                                |
| 00007FF838E8C712 | 48:8B5424 60     | mov rdx,qword ptr ss:[rsp+0x60]                 | rdx = [当前栈底+0x60] (旧栈+0x18)                    |
| 00007FF838E8C717 | 48:8B4C24 58     | mov rcx,qword ptr ss:[rsp+0x58]                 | rcx = [当前栈底+0x58] (旧栈+0x10)                    |
| 00007FF838E8C71C | 48:FF15 95481D00 | call qword ptr ds:[<RtlFlushSecureMemoryCache>] | RtlFlushSecureMemoryCache: 2参数(刷新内存区域)         |
| 00007FF838E8C723 | 0F1F4400 00      | nop dword ptr ds:[rax+rax],eax                  |                                                |
| 00007FF838E8C728 | 84C0             | test al,al                                      |                                                |
| 00007FF838E8C72A | 74 27            | je kernelbase.7FF838E8C753                      | if (返回值 == 0) 跳转报错分支                           |
| 00007FF838E8C72C | 44:8BCE          | mov r9d,esi                                     | r9d = esi (可确认 NtProtectVirtualMemory 使用了 r9d) |
| 00007FF838E8C72F | 48:896C24 20     | mov qword ptr ss:[rsp+0x20],rbp                 | rbp -> [rsp+0x20] shadow space备份(语境:准备call)    |
| 00007FF838E8C734 | 4C:8D4424 60     | lea r8,qword ptr ss:[rsp+0x60]                  | r8 = &[rsp+0x60] (旧栈+0x18)                     |
| 00007FF838E8C739 | 48:8BCF          | mov rcx,rdi                                     | rcx = rdi                                      |
| 00007FF838E8C73C | 48:8D5424 58     | lea rdx,qword ptr ss:[rsp+0x58]                 | rdx = &[rsp+0x58] (旧栈+0x10)                    |
| 00007FF838E8C741 | 48:FF15 48481D00 | call qword ptr ds:[<NtProtectVirtualMemory>]    | NtProtectVirtualMemory: 4参数(修改内存保护)            |
| 00007FF838E8C748 | 0F1F4400 00      | nop dword ptr ds:[rax+rax],eax                  |                                                |
| 00007FF838E8C74D | 8BD8             | mov ebx,eax                                     | ebx = eax(返回值)                                 |
| 00007FF838E8C74F | 85C0             | test eax,eax                                    |                                                |
| 00007FF838E8C751 | 79 9F            | jns kernelbase.7FF838E8C6F2                     | if (返回值 == 0) 跳转正常返回                           |
| 00007FF838E8C753 | 8BCB             | mov ecx,ebx                                     | 报错                                             |
| 00007FF838E8C755 | E8 B664F8FF      | call kernelbase.7FF838E12C10                    |                                                |
| 00007FF838E8C75A | 48:8B5C24 50     | mov rbx,qword ptr ss:[rsp+0x50]                 |                                                |
| 00007FF838E8C75F | 33C0             | xor eax,eax                                     | 此函数返回 0                                        |
| 00007FF838E8C761 | 48:83C4 30       | add rsp,0x30                                    |                                                |
| 00007FF838E8C765 | 5F               | pop rdi                                         |                                                |
| 00007FF838E8C766 | 5E               | pop rsi                                         |                                                |
| 00007FF838E8C767 | 5D               | pop rbp                                         |                                                |
| 00007FF838E8C768 | C3               | ret                                             |                                                |

## 还原代码

函数签名

```
fn (arg1: usize, arg2: usize, arg3: usize, arg4: u32, arg5: usize) u32 {
    tmp = ? # [旧栈+0x8]
    var1 = arg3 # [旧栈+0x18]
    var2 = arg2 # [旧栈+0x10]

    # rbp = arg5 # [旧栈+0x28]

    # r8 = &var1 # &[旧栈+0x18]
    # rdx = &var2 # &[旧栈+0x10]
    # rbp -> [当前栈底+0x20] (arg5)

    # esi = r9d (arg4)
    # rdi = rcx (arg1)

    rc = NtProtectVirtualMemory(arg1, &var2, &var1, arg4, arg5)

    if (rc < 0){
        if (arg1 == -1){
            # rdx = [旧栈+0x18]
            # rcx = [旧栈+0x10]
            rc = RtlFlushSecureMemoryCache(var2, var1)
            if (rc != 0) {
                # r9d = esi (arg4)
                # rbp -> [rsp+0x20] (arg5)
                # r8 = &var1 # &[旧栈+0x18]
                # rcx = rdi (arg1)
                # rdx = &var2 # &[旧栈+0x10]

                rc = NtProtectVirtualMemory(arg1, &var2, &var1, arg4, arg5)
                if (rc == 0) {
                    return 1
                }
            }
        }
        return 0
    }

    return 1
}
```

```
fn (arg1: usize, arg2: usize, arg3: usize, arg4: u32, arg5: usize) u32 {

    var1 = arg3 # [旧栈+0x18]
    var2 = arg2 # [旧栈+0x10]


    rc = NtProtectVirtualMemory(arg1, &var2, &var1, arg4, arg5)

    if (rc < 0){
        if (arg1 == -1){
            rc = RtlFlushSecureMemoryCache(var2, var1)
            if (rc != 0) {
                rc = NtProtectVirtualMemory(arg1, &var2, &var1, arg4, arg5)
                if (rc == 0) {
                    return 1
                }
            }
        }
        return 0
    }

    return 1
}
```

可进一步推导:

```
NtProtectVirtualMemory(usize, *type, *type, u32, usize) u32

RtlFlushSecureMemoryCache(usize, usize) u8
```

对应实际定义

```c
BOOL VirtualProtectEx(
  [in]  HANDLE hProcess,
  [in]  LPVOID lpAddress,
  [in]  SIZE_T dwSize,
  [in]  DWORD  flNewProtect,
  [out] PDWORD lpflOldProtect
);

NTSTATUS NtProtectVirtualMemory(
    [in] HANDLE ProcessHandle,
    [in,out] PVOID *BaseAddress,
    [in,out] PSIZE_T RegionSize,
    [in] ULONG NewProtection,
    [out] PULONG OldProtection
    );

BOOLEAN RtlFlushSecureMemoryCache(
    [in] PVOID MemoryCache,
    [in, opt] SIZE_T MemoryLength
);
```
