---
title: FOLLOW集算法
aliases:
categories:
tags:
---

                                     **v******# FOLLOW集算法



$$
\begin{cases}
A \rightarrow vB & : \text{FOLLOW}(A) \subseteq \text{FOLLOW}(B)
\\
\\
A \rightarrow vBw & :
\begin{cases}
\text{FIRST}(w) \subseteq \text{FOLLOW}(B) & |_{\lambda \notin \text{FIRST}(w)} \\
\text{FIRST}(w)- \{ \lambda \} \subseteq \text{FOLLOW}(B), \text{FOLLOW}(A) \subseteq \text{FOLLOW}(B) & |_{\lambda \in \text{FIRST}(w)}
\end{cases}
\end{cases}

$$

特殊地, 对于起始变元$S$, 规定末尾符号 $\$$
$$
\$ \in \text{FOLLOW}(S)
$$
> [!NOTION]
> 参考 [FIRST集算法](FIRST集算法.md)