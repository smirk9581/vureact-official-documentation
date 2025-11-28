# useMounted

`useMounted` 对应 Vue 3 中的 `onMounted` 生命周期 Hook。

它用于在组件首次渲染到 DOM 之后（即**挂载完成**后）执行一次副作用或初始化逻辑。

## 核心特性

- **语义化清晰：** 明确表达“组件已挂载”这一生命周期阶段，避免使用 `useEffect` 空依赖数组 (`[]`) 带来的歧义。
- **仅执行一次：** 确保回调函数只在组件的整个生命周期中运行一次。
- **支持异步操作：** 支持传入 `async` 函数，方便在挂载后立即执行异步数据请求、初始化第三方库或执行其他异步副作用。

## 使用方法

`useMounted` 接收一个同步或异步的回调函数，该函数将在组件挂载完成后执行。

### 1. 同步操作

可以直接在回调函数中进行 DOM 操作或同步初始化：

```jsx
import { useMounted } from 'react-vue3-hooks';

useMounted(() => {
  // ...
});
```

### 2. 异步操作

回调函数可以是一个 `async` 函数，用于在挂载后立即启动异步任务，如数据获取：

```jsx
useMounted(async () => {
  // 异步获取数据
  const response = await fetch('/api/initial-data');
  const result = await response.json();
});
```
