---
title: C_Cpp_Csharp异同
aliases:
categories:
tags:
---

# C_Cpp_Csharp异同


## 语言概览

- **C**: 面向过程的系统编程语言，强调性能和底层控制
- **C++**: 面向对象和泛型编程语言，兼容C并增加高级特性
- **C#**: 面向组件的现代语言，运行在.NET平台上，强调开发效率

## C 与 C++ 的主要差异

### 编程范式
- **C**: 纯面向过程
- **C++**: 支持面向过程、面向对象、泛型编程

### 语言特性
- **C++** 在 **C** 基础上增加：
  - 类和对象
  - 函数重载
  - 运算符重载
  - 异常处理
  - 模板
  - 命名空间
  - 引用类型

## C++ 与 C# 的详细比较

### 1. 命名规范

#### C++
- main函数必须是全局函数：`int main(int argc, char* argv[]){}`
- 其他函数命名无特殊要求
- **注意**: main函数不能是static

#### C#
- 采用PascalCase命名规范：`static void Main(string[] args){}`
- 函数和变量名首字母大写或为非小写字母
- **注意**: Main函数必须是static

### 2. 数据类型

#### 数组声明语法

```cpp
int array[];        // 正确
int array[9];       // 正确
// int[] array;     // 错误：[]不能在名称前
```

```csharp
int[] array;        // 正确
// int array[];     // 错误：[]不能在名称后
// int array[9];    // 错误：[]不能在名称后
```

### 3. 内存管理

#### C++
- 支持指针，需要手动内存管理
- 可使用智能指针自动管理

#### C#
- 无裸指针概念
- 自动垃圾回收(GC)
- 使用引用类型和值类型

### 4. 命名空间

#### C++
```cpp
using namespace std;        // 全局使用
std::cout << "Hello";       // 局部使用
```

#### C#
```csharp
using System;               // 全局使用
System.Console.WriteLine(); // 局部使用
```

### 5. 多文件组织

#### C++
- 预处理指令：`#include "header.h"`
- 头文件声明，源文件实现
- 链接库

#### C#
- 同一项目：基于命名空间自动管理
- 不同项目/程序集：`.csproj`文件中引用
- 无头文件

### 6. 类与面向对象

#### 权限修饰符

**C++**:
```cpp
class Base {
private:
    int privateVar;
protected:
    int protectedVar;
public:
    int publicVar;
};

class Derived : public Base {  // 必须指定继承方式
    // ...
};
```

**C#**:
```csharp
public class Base {           // 类本身可修饰
    private int privateVar;    // 每个成员单独修饰
    protected int protectedVar;
    public int publicVar;
    internal int internalVar;  // C#特有：仅本项目可访问
}

class Derived : Base {        // 无需指定继承方式
    // ...
}
```

#### 属性(Properties)

**C++** - 无属性，通过方法模拟：
```cpp
class MyClass {
private:
    int value;
public:
    int getValue() { return value; }
    void setValue(int val) { value = val; }
};
```

**C#** - 原生属性支持：
```csharp
class MyClass {
    private int _value;
    public int Value {
        get { return _value; }
        set { 
            if(value > 0) _value = value; 
        }
    }
}
```

#### 继承模型

**C++**:
- 支持类的多继承
- 菱形继承问题需虚继承解决

**C#**:
- 仅支持单类继承
- 支持多接口实现
- 更清晰的继承层次

### 7. 虚函数与重写机制

#### C++ 虚函数行为

1. **父类非虚函数** - 静态绑定：
```cpp
Base* obj = new Derived();
obj->nonVirtualMethod();  // 调用Base类方法
```

2. **父类虚函数** - 动态绑定：
```cpp
virtual void method() {}  // 子类重写无需override
obj->virtualMethod();     // 调用Derived类方法
```

3. **纯虚函数** - 抽象类：
```cpp
virtual void method() = 0; // 必须被重写
```

#### C# 虚函数行为

1. **父类非虚方法** - 隐藏：
```csharp
Base obj = new Derived();
obj.Method();  // 调用Base类方法
```

2. **父类虚方法** - 需要显式重写：
```csharp
public virtual void Method() {}
public override void Method() {} // 必须使用override
obj.Method();  // 调用Derived类方法
```

3. **抽象方法** - 必须重写：
```csharp
public abstract void Method();
public override void Method() {} // 必须重写
```

### 8. C# 独有特性

#### 部分类(Partial Classes)
```csharp
partial class MyClass {
    private string data;
}

partial class MyClass {
    public void Process() {
        Console.WriteLine(data);
    }
}
```

#### 密封类(Sealed Classes)
```csharp
sealed class FinalClass { }  // 不能被继承
```

#### 接口(Interfaces)
```csharp
public interface IExample {
    void Method();  // 隐式public，不能有实现
}

public class Implementation : IExample {
    public void Method() {  // 必须public
        // 实现
    }
}
```

## 总结对比

| 特性    | C++      | C#          |
| ----- | -------- | ----------- |
| 内存管理  | 手动/智能指针  | 自动垃圾回收      |
| 多继承   | 支持       | 仅接口多继承      |
| 属性    | 使用方法模拟   | 原生支持        |
| 虚函数重写 | 默认覆写     | 需显式override |
| 平台依赖  | 编译为原生代码  | 运行在.NET平台   |
| 性能    | 更高，更接近硬件 | 略低，有运行时开销   |
| 开发效率  | 较低       | 较高          |

