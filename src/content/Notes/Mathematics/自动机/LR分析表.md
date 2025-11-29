---
title: LR分析表
aliases:
categories:
tags:
---

# LR分析表

- 以 $Q$ 内容 $q$ 标记行
- 以 lookahead 内容 $a$ 标记列 : $a \in (T \cup \{\$\})^{n}$ 
- 表格内容(行为):
	- [[LR-归约]]
	- [[LR-移进]]
	- [[LR-转到]]
	- accept

## LR(1)分析表

$x \in T \cup V$, 以 $\text{LR}[q,x]$ 表示行列坐标


$$
\text{LR}(q,x) = 
\begin{cases}
\text{shift } p & \text{if } x \in T \land \text{goto}(q,x) = p\\[0.5em]
\text{goto } p & \text{if } x \in V \land \text{goto}(q,x) = p\\[0.5em]
\text{reduce } A \rightarrow \alpha & \text{if } x \in T \land [A \rightarrow \alpha \bullet, x] \in q \land A \neq S' \\[0.5em]
\text{accept} & \text{if } x = \$ \land [S' \rightarrow S \bullet, \$] \in q \\[0.5em]
\text{error} & \text{otherwise}
\end{cases}
$$
