---
title: LR-DFA
aliases:
categories:
tags:
---

# LR-DFA

$\text{closure}$ 参考 [[LR-项]]

对 CFG $G = (V,T,S,P)$ 构造 $G^{'} = (V^{'},T,S^{'},P^{'}) : V^{'} = V \cup S^{'}, P^{'} = P \cup \{S^{'} \rightarrow S\}$
 
- 初始状态: $S^{'} = \text{closure}(S^{'} \rightarrow S)$
- 转移函数: 同[[LR-转到]]
- 最终状态: $\bullet$ 在末尾的项标记的状态