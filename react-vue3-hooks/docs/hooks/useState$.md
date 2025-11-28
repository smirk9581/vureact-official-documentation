# useState$

`useState$` 是对 Vue 3 响应式状态管理（`ref` 和 `reactive`）的抽象和适配。

它旨在提供一个统一的状态入口，让开发者无需过多关心数据类型，即可获得接近 Vue 式的**简洁状态修改体验**。

## 核心特性

`useState$` 结合了 React 原生 `useState` 和社区优秀的 `useImmer` 的能力，并根据初始值的类型自动选择最优的 Hook 进行封装。

| **初始值类型**                                           | **内部使用的 Hook** | **状态修改方式**                           | **对应 Vue API** |
| -------------------------------------------------------- | ------------------- | ------------------------------------------ | ---------------- |
| **原始值** (Primitive, 如 `string`, `number`, `boolean`) | `useState`          | 标准的覆盖式更新 (`setState(newValue)`)    | `ref`            |
| **复杂对象** (Object, Array, Map, Set)                   | `useImmer`          | **Draft 式更新** (`setState(draft => {})`) | `reactive`       |

## 使用方法

### 1. 原始值（Simple Values）

当初始值是原始类型时，`useState$` 的行为与 `useState` 完全一致。

```jsx
import { useState$ } from 'react-vue3-hooks';

// 行为等同于 useState(0)
const [count, setCount] = useState$(0); 

setCount(count + 1)
```

### 2. 复杂对象（Complex Objects）

当初始值是复杂对象时，`useState$` 启用 Draft 模式，允许你在回调函数中**直接修改状态对象**，而无需手动处理不可变性。

```jsx
import { useState$ } from 'react-vue3-hooks';

const [user, setUser] = useState$({
  id: 1,
  info: { age: 30, city: 'London' },
  posts: [{ title: 'First Post' }]
});

// 启用 Draft 模式，在回调中直接修改 user 对象
setUser(draft => {
  // 深度修改嵌套属性，无须手动展开 (Spread)
  draft.info.city = 'Paris'; 
  draft.posts.push({ title: 'New Post' });
});
```

## 选项（Shallow Mode）

### `useState$(initialState, shallow)`

你可以通过第二个参数 `shallow` 来控制 `useState$` 始终使用 React 原生的 `useState`，即使初始值是复杂对象。这对应于 Vue 的 `shallowRef` 行为。

```jsx
// 无论初始值是什么，都强制使用 useState
const [data, setData] = useState$({ count: 1 }, true /* shallow mode */); 

const handleUpdate = () => {
  // ⚠ 注意：在这种模式下，你必须手动返回一个新对象以触发更新
  // 类似于 Vue 的 shallowRef，修改内部属性不会触发重渲染
  setData({ ...data, count: data.count + 1 }); 
};
```
