---
title: RSA加密算法
aliases:
categories:
tags:
---

# RSA加密算法

## 欧拉定理变式

根据[[../../../Mathematics/数论/欧拉函数.md]], [[../../../Mathematics/数论/欧拉定理.md|欧拉定理]]:

$$
\begin{align}
a^{\phi(p)} &\equiv 1 \pmod p \\
(a^{\phi(p)})^{k} &\equiv 1 \pmod p \\
a^{k\phi(p)} &\equiv 1 \pmod p \\
a^{k\phi(p)+1} &\equiv a \pmod p \\
\end{align}
$$
欧拉定理变式:

$$
a^{k\phi(p)+1} \bmod p = a
$$

## RSA原理

RSA算法对 信息(message) $m$, 密文(cipher) $c$ 的加密 $e$ , 解密 $d$ 实现:
$$
\begin{align}
m^{e} &\bmod n = c \\
c^{d} &\bmod n = m \\
\end{align}
$$
易得:
$$
m^{ed} \bmod n = m
$$

由欧拉定理变式得:

$$
\begin{align}
ed &= k\phi(n)+1 \\
ed &\equiv 1 \pmod{\phi(n)}
\end{align}
$$
模逆元存在要求 e, d 都与 $\phi(n)$ 互质


选取一个足够大的 $n$ ($n > m$), 防止信息丢失

> [!NOTION]
> 安全性基础: $n$ 为质数乘积, $\phi(n)$ 无高效算法解质因数, 仅创建者知晓
> $n$ 的质因数越多, 越容易分解, 因而 2 个质因数安全性最高 (若仅 1 个质因数, 即$n$, 则可通过多种方式校验, 也可直接假设是质数破解)
> $n$ 的质因数越小, 越容易被发现(遍历), 因而需要保证任意质因数达到一定大小
> $d$ 应远大于 $e$, 加速加密, 防止穷举






