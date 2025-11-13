---
title: DirectX 指南
aliases:
categories:
tags:
---

# DirectX 指南

## DirectX 11

### DirectX 11 初始化

DirectX 11 初始化涉及多个关键组件

#### **设备** Device

在 DirectX 11 中, 设备(Device)是整个图形系统的中心组件, 它代表了 GPU 的软件抽象, 可以将其理解为与显卡硬件通信的接口和管理器

1. 资源创建
   设备负责创建各种图形资源:
    - 缓冲区(Buffer):顶点缓冲区, 索引缓冲区, 常量缓冲区等
    - 纹理(Texture):1D, 2D, 3D 纹理以及立方体贴图
    - 着色器(Shader):顶点着色器, 像素着色器, 几何着色器等
    - 视图(View):渲染目标视图, 深度模板视图, 着色器资源视图等
2. 功能查询
   设备可以报告 GPU 支持的功能:
    - 检查支持的 DirectX 版本级别
    - 查询纹理格式支持情况
    - 获取硬件性能参数
3. 内存管理
   设备管理 GPU 内存的分配和释放:
    - 分配显存用于存储资源
    - 管理资源的生命周期
    - 优化内存使用效率

##### 设备类型

在创建设备时, 可以指定不同的驱动类型:

-   `D3D_DRIVER_TYPE_HARDWARE`: 使用硬件加速的 GPU 进行渲染, 性能最佳
-   `D3D_DRIVER_TYPE_REFERENCE`: 使用软件模拟的参考光栅化器, 主要用于功能测试和调试
-   `D3D_DRIVER_TYPE_SOFTWARE`: 使用软件渲染器, 完全由 CPU 执行渲染操作
-   `D3D_DRIVER_TYPE_WARP`: Windows 高级光栅化平台, 使用 CPU 进行 DirectCompute 计算, 支持 DirectX 11 功能

#### **设备上下文** Device Context

Device Context 负责设置和维护整个图形渲染管线的状态:

-   输入装配阶段:设置顶点缓冲区、索引缓冲区和图元拓扑
-   顶点着色器阶段:绑定顶点着色器和相关常量缓冲区
-   几何着色器阶段:配置几何着色器（如果使用）
-   光栅化阶段:设置视口、裁剪矩形和光栅化状态
-   像素着色器阶段:绑定像素着色器和纹理资源
-   输出合并阶段:配置渲染目标和深度模板状态

##### Device Context 类型

1. 立即上下文 Immediate Context
    - 每个 ID3D11Device 都有一个对应的立即上下文
    - 命令立即提交给 GPU 执行
    - 用于主线程的渲染操作
2. 延迟上下文 Deferred Context
    - 可以创建多个延迟上下文
    - 命令记录在命令列表中, 稍后通过立即上下文执行
    - 用于多线程渲染场景

##### Device Context 实例

1. Device Context 执行具体的渲染命令

```cpp
// 示例:绘制索引几何体
g_pd3dDeviceContext->DrawIndexed(indexCount, 0, 0);

// 示例:清除渲染目标
g_pd3dDeviceContext->ClearRenderTargetView(renderTargetView, clearColor);

// 示例:设置视口
g_pd3dDeviceContext->RSSetViewports(1, &viewport); 3. 资源绑定和使用
将已创建的资源绑定到渲染管线的不同阶段:
```

2. 资源绑定和使用

```cpp
// 绑定顶点缓冲区到输入装配阶段
g_pd3dDeviceContext->IASetVertexBuffers(0, 1, &vertexBuffer, &stride, &offset);

// 绑定常量缓冲区到顶点着色器
g_pd3dDeviceContext->VSSetConstantBuffers(0, 1, &constantBuffer);

// 绑定着色器资源视图到像素着色器
g_pd3dDeviceContext->PSSetShaderResources(0, 1, &shaderResourceView); 4. 数据传输
在 CPU 和 GPU 之间传输数据:
```

3. 数据传输

```cpp
// 更新缓冲区数据
g_pd3dDeviceContext->UpdateSubresource(buffer, 0, NULL, data, 0, 0);

// 从资源复制数据到另一个资源
g_pd3dDeviceContext->CopyResource(dest, src);

// 映射和取消映射资源以直接访问
D3D11_MAPPED_SUBRESOURCE mappedResource;
g_pd3dDeviceContext->Map(buffer, 0, D3D11_MAP_WRITE_DISCARD, 0, &mappedResource);
// ... 修改数据 ...
g_pd3dDeviceContext->Unmap(buffer, 0);
```

---

#### Device 与 Device Context 的关系

分离设计模式

```cpp
// 设备 - 负责"创建"资源
ID3D11Device\* device;
device->CreateBuffer(&bufferDesc, &data, &vertexBuffer);

// 设备上下文 - 负责"使用"资源
ID3D11DeviceContext\* context;
context->IASetVertexBuffers(0, 1, &vertexBuffer, &stride, &offset);
context->Draw(vertexCount, 0);
```

-   线程安全性:多个线程可以使用不同的延迟上下文创建命令列表
-   资源管理灵活性:资源创建和使用分离, 便于管理
-   性能优化:允许并行构建命令列表

#### **交换链** Swap Chain

交换链 Swap Chain 是 DirectX 11 中用于实现平滑动画和防止画面撕裂的关键组件
它通过维护多个缓冲区(通常 2 个)来实现"前后缓冲区切换"机制, 确保用户看到的每一帧都是完整渲染的图像

##### Swap Chain 原理

1. Swap Chain 维护两个缓冲区: 前缓冲区(Back Buffer)和后缓冲区(Front Buffer)
2. 前缓冲区是当前显示在屏幕上的图像, 后缓冲区是正在渲染的图像
3. Swap Chain 通过交换前后缓冲区实现动画效果
4. Swap Chain 通过双缓冲或三缓冲技术防止画面撕裂

目的: 防止画面撕裂

##### Swap Chain 流程

1. GPU 在后缓冲区渲染当前帧
2. 渲染完成后, 调用 `Present()` 函数交换前后缓冲区
3. 前缓冲区显示在屏幕上, 后缓冲区成为新的前缓冲区
4. GPU 继续在后缓冲区渲染下一帧

##### Swap Chain 组件

1. 定义缓冲区的显示模式 `DXGI_MODE_DESC`
2. 采样描述 `DXGI_SAMPLE_DESC`
3. 交换链描述 `DXGI_SWAP_CHAIN_DESC`
4. 交换链 `IDXGISwapChain`

```cpp
typedef struct DXGI_MODE_DESC {
    UINT Width;                 // 缓冲区宽度(像素)
    UINT Height;                // 缓冲区高度(像素)
    DXGI_RATIONAL RefreshRate;  // 刷新率
    DXGI_FORMAT Format;         // 缓冲区格式
    DXGI_MODE_SCANLINE_ORDER ScanlineOrdering; // 扫描线顺序
    DXGI_MODE_SCALING Scaling;  // 缩放模式
} DXGI_MODE_DESC;

typedef struct DXGI_SAMPLE_DESC {
    UINT Count;     // 每个像素的采样数量
    UINT Quality;   // 采样质量级别
} DXGI_SAMPLE_DESC;

typedef struct DXGI_SWAP_CHAIN_DESC {
    DXGI_MODE_DESC   BufferDesc;    // 缓冲区描述
    DXGI_SAMPLE_DESC SampleDesc;    // 采样描述
    DXGI_USAGE       BufferUsage;   // 缓冲区用途
    UINT             BufferCount;   // 缓冲区数量
    HWND             OutputWindow;  // 输出窗口句柄
    BOOL             Windowed;      // 是否窗口模式
    DXGI_SWAP_EFFECT SwapEffect;    // 交换效果
    UINT             Flags;         // 标志位
} DXGI_SWAP_CHAIN_DESC;
```

#### **渲染目标** Render Target

渲染目标 是 DirectX 11 中用于接收渲染输出的资源视图
它是渲染管线的最终输出目的地, 所有经过光栅化处理的像素数据都会写入到渲染目标中
可以将其理解为"画布", GPU 在上面绘制最终的图像

渲染目标位于整个渲染管线的末端:

1. 输入装配 → 获取顶点和索引数据
2. 顶点着色器 → 处理顶点
3. 几何着色器 → 可选的几何处理
4. 光栅化 → 生成像素
5. 像素着色器 → 计算像素颜色
6. 输出合并 → 写入渲染目标

##### Render Target 功能

1. 接收像素输出
   渲染目标是像素着色器和输出合并阶段的最终目的地:
    - 接收像素着色器计算出的颜色值
    - 存储每个像素的 RGBA 颜色信息
    - 支持多重采样和混合操作
2. 支持多种资源类型
    - 渲染目标可以基于不同类型的资源创建:
    - 纹理资源: Texture2D、Texture3D 等
    - 交换链缓冲区
    - 渲染目标纹理（用于离屏渲染）

##### Render Target 类型

1. 窗口渲染目标
   基于交换链后缓冲区创建，直接渲染到屏幕:

```cpp
// 用于最终显示的渲染目标
device->CreateRenderTargetView(backBuffer, nullptr, &windowRenderTargetView);
```

2. 离屏渲染目标
   基于纹理创建，用于中间渲染过程:

```cpp
// 用于后期处理、阴影映射等的离屏渲染目标
device->CreateRenderTargetView(renderTargetTexture, nullptr, &offscreenRenderTargetView);
```

3. 多重渲染目标(MRT)
   同时渲染到多个目标，用于延迟渲染等技术:

```cpp
// 同时绑定多个渲染目标
ID3D11RenderTargetView* renderTargets[4] = { rtv0, rtv1, rtv2, rtv3 };
deviceContext->OMSetRenderTargets(4, renderTargets, depthStencilView);
```

##### Render Target 格式

1. 标准颜色格式
   `DXGI_FORMAT_R8G8B8A8_UNORM`: 最常见的 8 位 RGBA 格式
   `DXGI_FORMAT_B8G8R8A8_UNORM`: BGRA 格式
   `DXGI_FORMAT_R16G16B16A16_FLOAT`: 16 位浮点 RGBA 格式
2. 高动态范围格式
   `DXGI_FORMAT_R16G16B16A16_FLOAT`: 半精度浮点
   `DXGI_FORMAT_R32G32B32A32_FLOAT`: 全精度浮点
3. 特殊用途格式
   `DXGI_FORMAT_R32_UINT`: 用于存储整数值
   `DXGI_FORMAT_R16G16_UNORM`: 用于法线贴图等

#### **缓冲区**(Buffer)

缓冲区是 DirectX 11 中存储数据的基本容器, 主要有以下几种类型:

1. 顶点缓冲区(Vertex Buffer)

```cpp
// 顶点缓冲区存储顶点数据（位置, 颜色, 纹理坐标等）
ID3D11Buffer* g_pVertexBuffer;
```

    - 存储 3D 模型的顶点信息
    - 包括位置, 法线, 纹理坐标等属性
    - 供顶点着色器使用

2. 索引缓冲区(Index Buffer)
3.

```cpp
// 索引缓冲区存储顶点索引, 优化渲染性能
ID3D11Buffer* g_pIndexBuffer;
```

    - 存储顶点的索引值
    - 允许重复使用顶点数据
    - 减少内存占用和提高渲染效率

3. 常量缓冲区(Constant Buffer)

```cpp
// 常量缓冲区存储着色器需要的常量数据
ID3D11Buffer* g_pConstantBuffer;
```

-   存储变换矩阵, 光照参数等不变或少量变化的数据
-   在着色器程序中作为常量使用
-   提供 CPU 到 GPU 的数据传输通道
