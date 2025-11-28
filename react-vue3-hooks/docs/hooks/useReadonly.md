# useReadonly

`useReadonly` 对应 Vue 3 中的 `readonly` API，用于创建状态数据的**深度只读**版本。

它的核心作用是确保状态的不可变性，常用于将父组件的状态传递给子组件时，防止子组件意外修改共享的数据。

## 核心特性

- **深度冻结：** 默认情况下，会对传入的对象进行深拷贝和**深度冻结**，禁止任何层级的修改。
- **性能优化：** 使用 `useMemo` 缓存只读对象，仅在 `initialState` 引用发生变化时才重新计算并冻结。
- **类型安全：** 返回的对象具有 TypeScript `Readonly<T>` 类型，提供编译时的只读保护。

## 使用方法

### 1. 默认（深度）只读

传入一个对象或数组，`useReadonly` 返回一个不可修改的新对象。

```jsx
import { useReadonly } from 'react-vue3-hooks';

const data = { name: 'Alice', settings: { theme: 'dark' } }

// 创建只读版本
const readonlyData = useReadonly(data); 

// ❌ 此操作无效或会抛出错误
readonlyData.settings.theme = 'light'; 
```



### 2. 浅层只读（Shallow Readonly）

通过第二个参数 `shallow` 设为 `true`，可以只冻结对象的第一层，允许修改深层属性（尽管不推荐，但提供了与 Vue `shallowReadonly` 对齐的能力）。

```jsx
const original = { 
  id: 1, 
  nested: { value: 100 } 
};

// 仅冻结顶层：id 不可变，nested 引用不可变
const shallowReadonly = useReadonly(original, true); 

// ❌ 失败：修改顶层属性
shallowReadonly.id = 2; 

// ✅ 成功：可以修改深层属性 (因为只做了浅层冻结)
shallowReadonly.nested.value = 200; 
```
