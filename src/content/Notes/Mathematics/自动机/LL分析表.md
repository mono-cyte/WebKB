---
title: LL分析表
aliases:
categories:
tags:
---

# LL(1)分析表

对于[[上下文无关文法]]:

- 以 $V$ 内容 $A$ 标记行
- 以 **lookahead 内容** $a$ 标记列 : $a \in (T \cup \{\$\})^{n}$ 

> [!NOTION]
> LL(1)文法: $n = 1$, $a$ 为单字符
> 最小化列标记: $a \in \bigcup_{A \in V} \text{FIRST}(A)\cup\text{FOLLOW}(A)$


对产生式 $A \rightarrow w$, 将 $w$ 加入到表 $(A, a)$, 其中:
$$
a \in
\begin{cases}
\text{FIRST}(w) &|_{\lambda \notin \text{FIRST}(w)} \\[0.5em]
\text{FIRST}(w) \cup\text{FOLLOW}(A) - \{\lambda\} &|_{\lambda \in \text{FIRST}(w)}
\end{cases}
$$
---

形如:

| $V$ | $\text{FIRST}(w)$ | $\text{FOLLOW}(A)$ |
| :-: | :---------------: | :----------------: |
| $A$ |        $w$        |        $w$         |
