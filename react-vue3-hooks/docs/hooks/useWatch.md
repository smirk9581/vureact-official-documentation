# useWatch

`useWatch` 完全对应 Vue 3 中的 **`watch` API**，用于精准监听一个或多个数据源的变化，并在变化时执行特定的副作用。

它是管理复杂响应式副作用的强大工具，语义上比 `useEffect` 更加清晰和专注。

## 核心特性

- **数据源灵活：** 支持监听单个状态值、状态数组或一个返回目标值的 `Getter` 函数。
- **回调函数参数：** 回调函数接收两个参数：`newValue` (新值) 和 `oldValue` (旧值)。
- **控制选项：** 提供了 Vue `watch` 的核心选项：`immediate`、`deep` 和 `once`。
- **停止监听：** 返回一个 `stop` 函数，用于随时取消监听器。

## 使用方法

### 1. 监听单个状态或值（`Source` 类型）

直接传入要监听的状态变量。

```jsx
import { useState, useWatch } from 'react-vue3-hooks';

const [count, setCount] = useState$(0);

// 监听单个状态 count
useWatch(count, (newVal, oldVal) => {
  // ...
});
```

### 2. 监听多个状态（`Source[]` 数组）

传入一个状态数组，任何一个状态变化都会触发回调。回调函数的 `newVal` 和 `oldVal` 都是数组。

```jsx
const [firstName, setFirstName] = useState$('A');
const [lastName, setLastName] = useState$('B');

// 监听多个状态 [firstName, lastName]
useWatch([firstName, lastName], (newNames, oldNames) => {
  // ...
});
```

### 3. 监听 Getter 函数返回的值（`() => Value`）

传入一个 Getter 函数，**将函数的返回值视为一个整体依赖**。常用于监听计算值或深层属性，可结合 `deep: true` 选项。

```jsx
const [user, setUser] = useState$({ details: { age: 30 } });

// 监听 Getter 函数的返回值：user.details.age
useWatch(() => user.details.age, (newAge) => {
  // ...
});
```

### 4. 异步操作

`useWatch` 允许接受异步回调。

```jsx
const [id, setId] = useState$(0);

useWatch(id, async (newId) => {
  await fetch(`/api/data/${newId}`);
});
```

### 5. 停止监听与深度监听

`useWatch` 返回一个 `stop` 函数，可随时停止监听器；`deep: true` 选项用于深度监听对象。

```jsx
// 深度监听 user 对象，并返回停止函数
const stopWatch = useWatch(user, () => {
  // ...
}, { deep: true, immediate: true });

const stop = () => {
  stopWatch(); // 随时取消监听器
};

```
