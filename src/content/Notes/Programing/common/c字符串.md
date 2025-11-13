---
title: c字符串
aliases:
categories:
tags:
---

# c字符串


## 占位符

| 占位符 | 描述                                                                              |
| :----: | --------------------------------------------------------------------------------- |
|   `%a`  | 十六进制浮点数,字母输出为小写                                                     |
|   `%A`  | 十六进制浮点数，字母输出为大写                                                    |
|   `%c`  | 字符                                                                              |
|   `%d`  | 十进制整数                                                                        |
|   `%e`  | 使用科学计数法的浮点数，指数部分的e为小写                                         |
|   `%E`  | 使用科学计数法的浮点数，指数部分的E为大写                                         |
|   `%i`  | 整数，基本等同于%d                                                                |
|   `%f`  | 小数（包含 float 类型和 double类型)                                               |
|   `%g`  | 6个有效数字的浮点数整数部分一旦超过6位,就会自动转为科学计数法,指数部分的e为小写。 |
|   `%G`  | 等同于%g,唯一的区别是指数部分的E为大写                                            |
|  `%hd`   | 十进制 short int型                                                                |
|  `%ho`   | 八进制 short int型                                                                |
|  `%hx`   | 十六进制 short int类型                                                            |
|  `%hu`   | unsigned short int型                                                              |
|  `%ld`   | 十进制 long int类型                                                               |
|  `%lo`   | 八进制 long int类型                                                               |
|  `%lx`   | 十六进制 long int类型                                                             |
|  `%lu`   | unsigned long int                                                                 |
|  `%lld`  | 十进制 long long int类型                                                          |
|  `%llo`  | 八进制 long long int类型                                                          |
|  `%llx`  | 十六进制 long long int型                                                          |
|  `%llu`  | unsigned long long int型                                                          |
|  `%Le`   | 科学计数法表示的long double类型浮点                                               |
|  `%Lf`   | long double类型浮点                                                               |
|   `%n`  | 已输出的字符串数量该占位符本身不输出，只将值存储在指定变量之中。                  |
|   `%o`  | 八进制整数                                                                        |
|   `%p`  | 指针                                                                              |
|   `%s`  | 字符串                                                                            |
|   `%u`  | 无符号整数(unsigned int)                                                          |
|   `%x`  | 十六进制整数                                                                      |
|  `%zd`   | size_t类型                                                                        |
|   `%%`  | 输出一个百分号                                                                    |
