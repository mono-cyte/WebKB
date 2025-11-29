---
title: LR-项
aliases:
  - item
categories:
tags:
---

# LR-项

项使用 $\bullet$ 标记, 标记表示左侧已入栈, 右侧未入栈


$A \in V$, $\alpha \in (V \cup T)^{*}$, $X_{i} \in (V \cup T)$

对于产生式 $A \rightarrow \alpha$ 存在 $|\alpha| + 1$ 个相关项

对于 $\alpha = X_{1}X_{2} \cdots X_{n}$, 可产生项:

$$
\begin{aligned}
A & \rightarrow \bullet X_{1}X_{2} \cdots X_{n} \\[0.5em]
A & \rightarrow X_{1} \bullet X_{2} \cdots X_{n} \\[0.5em]
A & \rightarrow X_{1} X_{2} \bullet \cdots X_{n} \\[0.5em]
\vdots \\[0.5em]
A & \rightarrow X_{1}X_{2} \cdots X_{n} \bullet \\[0.5em]
\end{aligned} \\
$$

特殊地, $\alpha = \lambda$, 仅有一项 $A \rightarrow \bullet$


## 项的闭包

$\alpha, \beta, \gamma \in (V \cup T)^{*}$, $A,B \in V$

对于项 $I$, $I = A \rightarrow \alpha\bullet B \beta$, 而标记右邻接变元 $B \rightarrow \gamma$:

$$
\begin{aligned}
B \rightarrow \bullet\gamma \in \text{closure}(I)
\end{aligned}
$$






