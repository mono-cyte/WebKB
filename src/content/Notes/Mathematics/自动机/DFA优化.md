---
title: DFA优化
aliases:
categories:
tags:
---

# DFA优化



空间需求 与 状态数量 成正比, 应用时应当减少 状态数量

## 状态可区分性

对于状态 $p, q \in Q$，若对任意输入串 $\omega \in \Sigma^{*}$ 都有

$$
\delta^{*}(p,\omega) \in F \;\Leftrightarrow\; \delta^{*}(q,\omega) \in F,
$$

等价地,

$$
\delta^{*}(p,\omega) \notin F \;\Leftrightarrow\; \delta^{*}(q,\omega) \notin F,
$$

则称状态 $p$ 与 $q$ 不可区分 indistinguishable, 需要合并


## 状态优化算法

- 移除所有不可达状态
- 遍历状态对 $(p,q)$, 根据其是否属于 $F$ 标记可区分性
- 遍历状态对 $(p,q)$, 对每个输入符号 $a \in \Sigma$ 检查后继状态，更新可区分性

---

简化的 DFA:

$$
\widehat{M} = (\widehat{Q},\Sigma,\widehat{\delta},\widehat{q_0},\widehat{F})
$$
### 有穷状态集

构造 **等价类集** $S$, 其中 $\exists C_{i} \in S$, 是可区分的状态集

定义:
$$
\widehat{Q} = S
$$

### 转移函数

$$
\exists a \in \Sigma,
p \in C_{i}, q \in C_{j},
p \xrightarrow{a} q
$$
则定义:
$$
\widehat{\delta}(C_{i}, a) = C_{j}
$$

### 初始状态

$$
q_{0} \in C_{i} 
$$
则定义:
$$
\widehat{q_{0}} = C_{i}
$$

### 最终状态


$$
F \cap C_{i} \neq \emptyset
$$
则定义:
$$
\widehat{F} = C_{i}
$$

