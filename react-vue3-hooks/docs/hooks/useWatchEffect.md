# useWatchEffect

`useWatchEffect` 对应 Vue 3 中的 **`watchEffect` API**，在依赖发生变化时重新运行该函数。

## 核心特性

- **首次立即执行：** 与 `useWatch` 不同，`useWatchEffect` 在组件挂载时会**立即执行一次**。
- **停止监听：** 返回一个 `stop` 函数，用于随时取消监听器。

## 使用方法

`useWatchEffect` 接收一个回调函数和依赖数组（可选），与 useEffect 一致。

### 1. 基础用法：自动追踪依赖

```jsx
import { useState$, useWatchEffect } from 'react-vue3-hooks';

const [count, setCount] = useState$(0);
const [data, setData] = useState$(null);

useWatchEffect(async () => {
  // 异步操作：根据最新的 count 获取数据
  const result = await fetch(`/api/data/${count}`);
  setData(await result.json());
}, [count]);
```

### 2. 清理副作用与停止监听

`useWatchEffect` 也返回一个 `stop` 函数用于手动停止监听。

```jsx
const stopHandle = useWatchEffect(() => {
  const subscription = subscribeToStream(sourceId); 

  // 返回清理函数
  return () => {
    subscription.unsubscribe();
    console.log(`已取消订阅 ID: ${sourceId}`);
  };
}, [sourceId]);

const stop = () => {
  stopHandle();
};
```

## 执行时机变体

为了更精细地控制副作用的执行时机，本库还提供了以下变体，它们对应 Vue 3 渲染周期的不同阶段：

| **Hook 名称**            | **对应 Vue 3 API** | **执行时机**            | **适用场景**                   |
| ------------------------ | ------------------ | ----------------------- | ------------------------------ |
| **`useWatchEffect`**     | `watchEffect`      | 与 useEffect 一致       | 默认选择，需要访问更新后的 DOM |
| **`useWatchSyncEffect`** | `watchSyncEffect`  | 与 useLayoutEffect 一致 | 需要同步修改 DOM 样式或布局    |
| `useWatchPostEffect`     | `watchPostEffect`  | 与 useWatchEffect 一致  | 与 useWatchEffect 一致         |
