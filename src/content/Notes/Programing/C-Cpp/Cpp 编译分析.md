---
title: Cpp 编译分析
aliases:
categories:
tags:
---

## 自增/减运算

### 后置递增/减

```c
char* strcpy(char* dest, const char* src){
    char* ret = dest;
    while(*dest++ = *src++);
    return ret;
# Cpp 编译分析

}
```
```assembly

	mov	eax, dword ptr [ebp + 0xc]
	mov	eax, dword ptr [ebp + 0x8]
	mov	eax, dword ptr [ebp + 0x8]
	mov	dword ptr [ebp - 0x4], eax
begin:
	mov	eax, dword ptr [ebp + 0xc]
	mov	ecx, eax                  
	add	ecx, 0x1                  
	mov	dword ptr [ebp + 0xc], ecx
	mov	al, byte ptr [eax]        
	mov	ecx, dword ptr [ebp + 0x8]
	mov	edx, ecx                  
	add	edx, 0x1                  
	mov	dword ptr [ebp + 0x8], edx
	mov	byte ptr [ecx], al        
	cmp	al, 0x0                   
	je end   
	jmp	begin
end:
mov	eax, dword ptr [ebp - 0x4]
```

汇编等效逻辑:
```c
begin:
	char* tmp_src = src;
    src++;
    char tmp_char = *tmp_src // 关键: 使用了自增前的值操作
    
    char* tmp_dest = dest;
    dest++;
    
    *tmp_dest = tmp_char; // 关键: 使用了自增前的值操作
    
    if(*tmp_char == 0){
		goto end;
	}else{
		goto begin;
	}

end:
    return ret;
```
同理:

快速移动至下一字符串处
```c
while(*str++);
```

快速移动至字符串 `\0` 处
```c
while(*str++);
str--;
```