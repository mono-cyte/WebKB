---
title: LR-转到
aliases:
  - goto
categories:
tags:
---

# LR-转到

状态转移

从项集 $I$ 标记的状态转移, 转移符号为 $\bullet$ 后符号, 目标状态以项闭包标记

$$
\text{goto}(I,X) = \text{closure}(A \rightarrow \alpha X \bullet\beta ) |_{A \rightarrow \alpha\bullet X \beta \in I}
$$

$\text{goto}(I_{i},X) = I_{j}$ 唯一确定 