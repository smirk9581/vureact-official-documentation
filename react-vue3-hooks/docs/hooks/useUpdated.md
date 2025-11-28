# useUpdated

`useUpdated` 对应 Vue 3 中的 `onUpdated` 生命周期 Hook。

它用于在组件**更新完成**后执行副作用，等价于 React 中跳过首次执行的 `useEffect`。

## 核心特性

- **跳过首次挂载：** 回调函数仅在组件重新渲染（Props 或 State 变化）后执行，忽略组件首次挂载。
- **无依赖项：** 默认追踪组件的**每一次**更新。
- **语义化清晰：** 精准对应 Vue 3 的 `onUpdated` 语义。

## 使用方法

`useUpdated` 接收一个回调函数，该函数会在组件的后续每一次渲染提交到 DOM 之后执行。

### 1. 监测所有更新

用于执行需要在组件每次更新后运行的逻辑，例如在更新后重新计算滚动位置或发送日志。

```jsx
import { useUpdated } from 'react-vue3-hooks';

useUpdated(() => {
  // ...
});
```

### 2. 清理函数（可选）

如果更新时启动了需要清理的副作用，可以在回调函数中返回一个清理函数，它将在下一次更新**之前**或组件卸载时执行。

```jsx
useUpdated(() => {
  // 假设更新时启动一个资源
  const sub = subscribeToData(data);
  
  // 返回清理函数，在下一次更新前清理旧资源
  return () => {
    sub.unsubscribe();
  };
});
```
