import sys
import os


pfx = ["拔毒化腐生肌药"]  # 1 <= len <= 2

items = [
        "升药",
        "轻粉",
        "砒石",
        "炉甘石",
        "硼砂",
]


class info:
    def __init__(self, pfx, items):
        self.pfx = pfx
        self.items = items

    def create(self, path):
        p: str = path
        tag: str = ""
        for ele in self.pfx:
            p = os.path.join(p, ele)
            if len(self.pfx) > 1:
                tag = f"{pfx[0]}/{pfx[1][:-1]}"
            else:
                tag = f"{pfx[0]}"
        for ele in items:
            fp = os.path.join(p, ele + ".md")
            if not os.path.exists(fp):
                # 没有则创建
                with open(fp, "w", encoding="utf-8") as f:
                    # 模板内容
                    f.write(
                        f"""
---
tags:
- 中药/{tag}
---

# {ele} 
## 来源
### 物种
### 产地
### 部位
1. 
### 炮制
## 药性
### 气
- 
### 味
- 
### 趋向
- 
### 归经
- 
## 功效
1. 
2. 
## 对证
1. 
2. 
3. 
"""
                    )
                    print(fp, "is created")
            else:
                print(fp, "already exists, skip")


def main(args):
    wd = os.path.dirname(__file__)
    wd.replace("\\", "/")
    os.chdir(wd)
    i = info(pfx, items)
    i.create(wd)


if __name__ == "__main__":
    main(sys.argv)
