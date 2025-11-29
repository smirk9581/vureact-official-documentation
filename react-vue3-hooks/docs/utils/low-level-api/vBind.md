# vBind

vBind 对应 Vue 3 中的 `v-bind` 指令，用于动态绑定 HTML 属性或组件 props。

它将 Vue 的三种绑定语法统一映射为 React 的 props 对象展开模式，在编译时生成可执行的属性绑定表达式。

### 核心特性

**静态与动态键名统一处理**：编译器将 `:key="value"` 和 `:[key]="value"` 都编译为 `vBind(key, value)` 调用，无需区分键名是否为变量。动态键名的编译由编译器在代码生成阶段完成。

**对象语法展开**：支持 `v-bind="{ id: foo, className: bar }"` 的对象语法，直接展开为 props 对象，与 JSX 展开运算符语义一致。

**无副作用纯函数**：vBind 是纯函数，仅根据输入计算输出，不依赖任何运行时状态，可在编译阶段内联优化。

### 使用方法

#### 1. 静态键名绑定

编译 `:className="inputClass"` 表达式：

```jsx
import { vBind } from 'react-vue3-hooks';

function MyComponent() {
  const inputClass = 'form-input';
  
  return <div {...vBind('className', inputClass)} />;
  // 输出: <div className="form-input" />
}
```

#### 2. 动态键名绑定（变量作为键）

编译 `:[attrName]="value"` 表达式，其中 `attrName` 是运行时变量：

```jsx
function MyComponent() {
  const attrName = 'data-id';
  const value = '123';
  
  return <div {...vBind(attrName, value)} />;
  // 输出: <div data-id="123" />
}
```

#### 3. 对象语法批量绑定

编译 `v-bind="{ id, disabled }"` 表达式：

```jsx
function MyComponent() {
  const id = 'submit-btn';
  const disabled = true;
  
  return <button {...vBind({ id, disabled, 'data-test': 'primary' })} />;
  // 输出: <button id="submit-btn" disabled data-test="primary" />
}
```

#### 4. 与计算属性结合

绑定计算得到的动态属性集合：

```jsx
function Card({ user }) {
  const userProps = useMemo(() => ({
    'data-user-id': user.id,
    'data-role': user.role,
    className: user.isActive ? 'active' : 'inactive',
  }), [user]);
  
  return <div {...vBind(userProps)} />;
}
```

### 与 Vue 的差异说明

| 特性 | Vue v-bind | vBind |
|------|------------|-------|
| **执行时机** | 运行时动态绑定 | 组件渲染时计算 props |
| **语法糖** | 支持 `:key` 和 `:[key]` 简写 | 仅函数调用，由编译器生成 |
| **对象展开** | `v-bind="{...}"` 自动展开 | `vBind(obj)` 返回展开对象 |
| **修饰符** | `.prop`、`.attr` 等修饰符 | 运行时库中处理（如 vBindProp） |
| **HTML 属性** | 自动识别 HTML 与 DOM 属性 | 由 React JSX 运行时区分 |

**核心区别**：Vue 的 v-bind 在运行时通过模板引擎动态绑定，支持 `.prop`、`.attr` 等修饰符；vBind 是编译时工具函数，生成纯 JavaScript 表达式，由 React JSX 运行时处理最终属性绑定。

### 编译器代码生成示例

```tsx
// Vue 模板
<input :class="inputClass" :[dynamicAttr]="value" v-bind="{ disabled, readonly }" />

// 编译后 React 代码
function InputComponent() {
  const dynamicAttr = 'data-id';
  return (
    <input 
      {...vBind('className', inputClass), 
       ...vBind(dynamicAttr, value), 
       ...vBind({ disabled, readonly })}
    />
  );
}
```

### 注意事项

**避免内联创建对象**：不要在 JSX 中直接内联创建对象，否则每次渲染都会生成新引用，导致不必要的重渲染：

```jsx
// ❌ 错误：每次渲染创建新对象
<div {...vBind({ id: 'test', className: 'box' })} />

// ✅ 正确：使用 useMemo 或提取到组件外部
const staticProps = useMemo(() => ({ id: 'test', className: 'box' }), []);
<div {...vBind(staticProps)} />
```

**动态键名类型安全**：确保动态键名在编译时是可序列化的字符串。若键名来自不可信输入，应在编译阶段进行校验。

**与原生展开运算符的关系**：vBind 返回的对象可直接用于 JSX 展开，无需额外转换。在性能敏感场景，可考虑编译器内联优化为直接对象字面量。

**属性覆盖顺序**：多个 vBind 调用按顺序展开，后调用的属性会覆盖前调用的同名属性，与 Vue 模板中最右侧属性优先的行为一致。
