---
title: FIRST集算法
aliases:
categories:
tags:
---

# FIRST集算法


![[文法]]

$$
\text{FIRST}(\lambda) = \{ \lambda \}
$$

对于 $a \in T$:
$$
\text{FIRST}(a) = \{ a \}
$$

对于 $A \in V$, 其存在产生式 $A \rightarrow w$:
$$
\text{FIRST}(A) =\bigcup \text{FIRST}(w)
$$

对于 $X_{i} \in (V \cup T)$:
$$
\text{FIRST}(X_{1} X_{2} \cdots X_{n}) = 
\begin{cases}
\bigcup_{i = 1}^{m} \text{FIRST}(X_{i})  - \{ \lambda \}  & |_{\exists m \in [1,n], \forall x \in [1,m-1], X_{x} \overset{*}{\Rightarrow} \lambda, X_{m} \not\overset{*}{\Rightarrow} \lambda}  \\

\bigcup_{i = 1}^{n} \text{FIRST}(X_{i}) & |_{\forall x \in [1,n], X_{x} \overset{*}{\Rightarrow} \lambda}
\end{cases}
$$

