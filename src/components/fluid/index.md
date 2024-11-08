# Three.js + React 流体光标效果实现分析

起初是因为需求想实现 [WebGL Fluid cursor - Reddit](https://www.reddit.com/r/webgl/comments/17kmm0z/webgl_fluid_cursor/) 里提到的 [lusion.co](https://lusion.co/) 这样的效果，顺藤摸瓜找到了 [OGL Examples Post Fluid Distortion](https://oframe.github.io/ogl/examples/?src=post-fluid-distortion.html)，他也是基于 [GitHub - PavelDoGreat/WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) 里的流体模拟着色器的。但是我们又需要在 Next.js + Three 的环境下使用，再引入一个 OGL 不太现实，于是又找找找找到了 [GitHub - whatisjery/react-fluid-distortion](https://github.com/whatisjery/react-fluid-distortion) 这个非常新的库，相当好移植过来，以下内容结合 GPT 和个人思考记录一下我从中学到的一些 Three 的使用，它里面的 hooks 封装非常完善。

## 整体架构

### 核心组件

这是一个基于 Three.js 和 React Three Fiber 实现的流体效果组件，在 Next.js 项目中使用也很好用，他的类型提示也都很完善，首先主要包含两个核心组件：

- [Fluid 组件](https://github.com/whatisjery/react-fluid-distortion/blob/main/lib/Fluid.tsx):流体物理模拟与渲染
- [FluidEffect 组件](https://github.com/whatisjery/react-fluid-distortion/blob/main/lib/effect/FluidEffect.tsx):用于实现流体扭曲视觉效果的后处理效果类

#### FluidEffect 组件

`FluidEffect.tsx` 组件是一个用于实现流体扭曲视觉效果的后处理效果类。它继承自 [`postprocessing`](https://github.com/pmndrs/postprocessing) 库的 `Effect`

通过 uniforms 提供了多个可自定义的参数：

```typescript
type Uniforms = {
  tFluid: Texture | null; // 流体纹理
  uColor: Vector3; // 流体颜色
  uBackgroundColor: Vector3; // 背景颜色
  uRainbow: boolean; // 是否启用彩虹效果
  uShowBackground: boolean; // 是否显示背景
  uDistort: number; // 扭曲程度
  uBlend: number; // 混合程度
  uIntensity: number; // 效果强度
};
```

提供了 `update()` 方法来动态更新各种效果参数
使用 `updateUniform()` 私有方法来安全地更新单个 uniform 值

FluidEffect 完整代码如下：

```tsx

```

### 关键 Hooks 设计

其中 Fluid 组件主要包含以下与 Three.js 相关的 hooks:

- useFrame: 渲染循环

- useThree: 获取 Three.js 的上下文

- useFBOs: 管理帧缓冲区对象(FBO)

- useMaterials: 管理着色器材质

- usePointer: 处理鼠标交互

- useUniforms: 管理着色器参数

- ...

#### useFBOs 双缓冲 FBO 实现

- 双缓冲 FBO 实现

```tsx

```

- 纹理管理与切换机制

#### useMaterials

- 着色器材质创建

- 统一管理多个着色器程序

- 材质参数更新机制

#### usePointer

- 鼠标位置追踪

- 速度计算

- 事件节流优化

#### useFrame

- 渲染循环控制

- 物理模拟步进

- 性能监控

## 流体模拟实现原理

### 基础物理模型

- Navier-Stokes 方程

- 动量方程

- 连续性方程

- 不可压缩流体假设

- 速度-压力耦合

### 数值求解方法

- 半拉格朗日方法

- Jacobi 迭代

- 压力泊松方程求解

### 核心算法实现

- 涡度计算与约束

- 压力梯度投影

- 密度传输与扩散

### 参考资料

- [Real-Time Fluid Dynamics for Games](https://www.dgp.toronto.edu/public_user/stam/reality/Research/pdf/GDC03.pdf) - Jos Stam

- [Fast Fluid Dynamics Simulation on the GPU](https://developer.nvidia.com/gpugems/gpugems/part-vi-beyond-triangles/chapter-38-fast-fluid-dynamics-simulation-gpu)

- [Fluid Simulation for Dummies](https://mikeash.com/pyblog/fluid-simulation-for-dummies.html)

- [Stable Fluids](https://www.dgp.toronto.edu/public_user/stam/reality/Research/pdf/ns.pdf)

## 渲染效果实现

(后续内容保持不变...)

## 性能优化与注意事项

### FBO 优化

- 分辨率控制

- 双缓冲切换优化

- 纹理格式选择

### 着色器优化

- 指令精简

- 分支优化

- 精度控制

### 移动端适配

- 分辨率自适应

- 触摸事件处理

- 性能降级方案

### 内存管理

- 资源释放

- 缓存策略

- 垃圾回收考虑
