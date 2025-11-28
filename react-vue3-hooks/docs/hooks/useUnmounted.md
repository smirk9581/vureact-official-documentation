# useUnmounted

`useUnmounted` 对应 Vue 3 中的 `onUnmounted` 生命周期 Hook。

它用于在组件被销毁（卸载）时执行一次清理逻辑，是管理副作用清理工作的语义化方案。

## 核心特性

- **语义化清晰：** 明确表达“组件已卸载”这一生命周期阶段，避免混淆 `useEffect` 的清理返回函数。
- **仅执行一次：** 确保回调函数只在组件卸载时运行。
- **时机精确：** 在组件即将从 DOM 中移除时执行。

## 使用方法

`useUnmounted` 接收一个回调函数，该函数将在组件卸载前执行。

**注意：** `useUnmounted` **不接受**返回清理函数（因为其本身就是清理函数）。

### 1. 简单的清理操作

用于清理组件启动的定时器、取消订阅或移除全局事件监听等同步操作。

```jsx
import { useUnmounted } from 'react-vue3-hooks';

useUnmounted(() => {
  clearInterval(timerId);
});
```

### 2. 异步清理操作

如果清理工作本身是异步的（例如，关闭数据库连接或发送日志），可以直接在回调函数中执行 `async` 逻辑。

```jsx
// 假设这是一个返回异步断开连接函数的 Hook
const disconnect = useSomeConnection(); 

useUnmounted(async () => {
  // 执行异步清理
  await disconnect(); 
});
```
