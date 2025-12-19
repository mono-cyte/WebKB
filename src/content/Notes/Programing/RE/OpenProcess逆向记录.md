---
title: OpenProcess逆向记录
aliases: OpenProcess逆向记录
categories:
tags:
---

# OpenProcess逆向记录
## 调试内容查看

| 地址             | 机器码              | 汇编                                  | 注释                                                          |
| ---------------- | ------------------- | ------------------------------------- | ------------------------------------------------------------- |
| 00007FFAA592F310 | 4C:8BDC             | mov r11,rsp                           | r11 旧栈顶, 当前栈底                                          |
| 00007FFAA592F313 | 48:83EC 68          | sub rsp,0x68                          | 开辟栈 13行, shadow space: 4行                                |
| 00007FFAA592F317 | 45:33C9             | xor r9d,r9d                           | r9 = 0                                                        |
| 00007FFAA592F31A | 49:63C0             | movsxd rax,r8d                        | 有符号 r8(dword) -> rax(qword)                                |
| 00007FFAA592F31D | 45:894B E4          | mov dword ptr ds:[r11-0x1C],r9d       | r9d -> 当前栈底 - 28                                          |
| 00007FFAA592F321 | 4D:8D43 C8          | lea r8,qword ptr ds:[r11-0x38]        | NtOpenProcess参数3 \*OBJECT_ATTRIBUTES: r8 = &(当前栈底 - 56) |
| 00007FFAA592F325 | 4D:894B D0          | mov qword ptr ds:[r11-0x30],r9        | r9 -> 当前栈底 - 48                                           |
| 00007FFAA592F329 | F7DA                | neg edx                               | edx = 0 - edx                                                 |
| 00007FFAA592F32B | 49:8943 B8          | mov qword ptr ds:[r11-0x48],rax       | rax -> 当前栈底 - 72                                          |
| 00007FFAA592F32F | 0F57C0              | xorps xmm0,xmm0                       | xmm0 = 0                                                      |
| 00007FFAA592F332 | 49:C743 C8 30000000 | mov qword ptr ds:[r11-0x38],0x30      | 当前栈底 - 56 = 0x30                                          |
| 00007FFAA592F33A | 1BC0                | sbb eax,eax                           | 与下行合并逻辑                                                |
| 00007FFAA592F33C | 83E0 02             | and eax,0x2                           | eax = if (CF == 1) then 2 else 0                              |
| 00007FFAA592F33F | 4D:894B 20          | mov qword ptr ds:[r11+0x20],r9        | r9 -> 当前栈底 + 32 !旧栈空间                                 |
| 00007FFAA592F343 | 894424 48           | mov dword ptr ss:[rsp+0x48],eax       | eax -> 栈顶 + 72 !旧栈空间                                    |
| 00007FFAA592F347 | 8BD1                | mov edx,ecx                           | NtOpenProcess参数2 ACCESS_MASK: edx = ecx                     |
| 00007FFAA592F349 | 4D:894B D8          | mov qword ptr ds:[r11-0x28],r9        | r9 -> 当前栈底 - 40                                           |
| 00007FFAA592F34D | 49:8D4B 20          | lea rcx,qword ptr ds:[r11+0x20]       | NtOpenProcess参数1 \*HANDLE: rcx = &(当前栈底 + 32) !旧栈空间 |
| 00007FFAA592F351 | 4D:894B C0          | mov qword ptr ds:[r11-0x40],r9        | r9 -> 当前栈底 - 64                                           |
| 00007FFAA592F355 | 4D:8D4B B8          | lea r9,qword ptr ds:[r11-0x48]        | NtOpenProcess参数4 ?\*CLIENT_ID: r9 = &(当前栈底 - 72)        |
| 00007FFAA592F359 | F3:0F7F4424 50      | movdqu xmmword ptr ss:[rsp+0x50],xmm0 | xmm0 -> 栈顶 + 80 !旧栈空间                                   |
| 00007FFAA592F35F | 48:FF15 721E2500    | call qword ptr ds:[<NtOpenProcess>]   | 调用 NtOpenProcess                                            |
| 00007FFAA592F366 | 0F1F4400 00         | nop dword ptr ds:[rax+rax],eax        | ?                                                             |
| 00007FFAA592F36B | 85C0                | test eax,eax                          | 检查返回值                                                    |
| 00007FFAA592F36D | 78 0E               | js kernelbase.7FFAA592F37D            | 如果小于0, 跳转错误处理                                       |
| 00007FFAA592F36F | 48:8B8424 88000000  | mov rax,qword ptr ss:[rsp+0x88]       | rax = (读)栈顶 + 136 = (写)当前栈底 + 32 = HANDLE             |
| 00007FFAA592F377 | 48:83C4 68          | add rsp,0x68                          |                                                               |
| 00007FFAA592F37B | C3                  | ret                                   |                                                               |
| 00007FFAA592F37C | CC                  | int3                                  |                                                               |
| 00007FFAA592F37D | 8BC8                | mov ecx,eax                           | 错误处理                                                      |
| 00007FFAA592F37F | E8 DCF2FFFF         | call kernelbase.7FFAA592E660          |                                                               |
| 00007FFAA592F384 | 33C0                | xor eax,eax                           |                                                               |
| 00007FFAA592F386 | EB EF               | jmp kernelbase.7FFAA592F377           |                                                               |

## 还原代码

分两步分析伪代码:

1. 严格按照顺序映射操作, 变量, 命名, 记录寄存器的改变操作

```

fn (arg1, arg2, arg3){
    # r11 = rsp
    # rsp = rsp - 0x68
    # r9 = 0
    # rax = r8d 可知 arg3 为 u32

    var1 = 0 # [r11-0x1C] = r9d # r8 = &[r11-0x38]
    var2 = 0 # [r11-0x30] = r9
    var3 = arg3 # [r11-0x48] = rax
    var4 = 0x30 # [r11-0x38] = 0x30
    var5 = 0 # [r11+0x20] = r9

    # neg edx ... 可知 arg2 为 u32
    var6 = if (arg2 != 0) ? 2 : 0 # [rsp+0x48] = eax

    # edx = ecx 可知 arg1 为 u32
    var7 = 0 # [r11-0x28] = r9 # rcx = &[r11+0x20]
    var8 = 0 # [r11-0x40] = r9 # r9 = &[r11-0x48]
    var8, var9 = 0 # [rsp+0x50], [rsp+0x58] = xmm0

    rc = NtOpenProcess(&var5, arg1, &var4, &var3)

    if rc < 0:
        error()
    else: # rax = [rsp+0x88] = [r11+0x20] = var6
        return var5
}

```

2. 综合参数, 指针, 连续内存访问, 分析结构体

```

fn (arg1, arg2, arg3){

    # 返回值反推此处仅单一变量
    var = 0 # [r11+0x20] = r9

    # 连续内存访问: 疑似结构体 {usize, usize, usize, u32(额外对齐), usize, usize}
    obj1_field0 = 0x30 # [r11-0x38] = 0x30
    obj1_field1 = 0 # [r11-0x30] = r9
    obj1_field2 = 0 # [r11-0x28] = r9
    obj1_field3 = if (arg2 != 0) ? 2 : 0 # [rsp+0x48] = [r11-0x20] = eax
    obj1_field3_padding = 0 # [r11-0x1C] = r9d
    obj1_field4 = 0 # [rsp+0x50] = [r11-0x18] = xmm0 常用于大块填充0
    obj1_field5 = 0 # [rsp+0x58] = [r11-0x10] = xmm0 常用于大块填充0


    # 连续内存访问: 疑似结构体 {usize, usize}
    obj2_field0 = arg3 # [r11-0x48] = rax
    obj2_field1 = 0 # [r11-0x40] = r9


    rc = NtOpenProcess(&var, arg1, &obj1, &obj2)
    if rc < 0:
        error()
    else:
        # rax = [rsp+0x88] = [r11+0x20] = var6
        return var

}

```

目前可以推知结构体布局, 但由于初始化细节缺少, 可能存在偏差, 如小字段对齐误认为大字段
需要进一步查看 NtOpenProcess 对结构体字段的访问细节

```

extern struct obj1{
usize,
usize,
usize,
u32,
usize,
usize
}

extern struct obj2{
usize,
usize,
}

```

对应真实文档的定义:

```

extern struct OBJECT_ATTRIBUTES{
ULONG,
HANDLE,
*UNICODE_STRING,
ULONG,
PVOID,
PVOID,
}

extern struct CLIENT_ID{
HANDLE,
HANDLE,
}

```
