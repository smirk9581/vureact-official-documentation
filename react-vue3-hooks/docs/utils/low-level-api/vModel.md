# vModel

vModel 对应 Vue 3 中的 `v-model` 指令，用于在 React 中实现双向数据绑定。

它根据表单元素类型自动选择正确的属性（value/checked）和事件（onInput/onChange），并支持 Vue 风格的修饰符系统，将数据同步逻辑封装为可展开的 JSX props 对象。

### 核心特性

**多类型表单支持**：智能识别 `input`, `textarea`, `select`, `checkbox`, `radio`, `file` 等原生元素，自动绑定对应的属性和事件处理器。

**修饰符系统**：完整实现 `.trim`、`.number`、`.lazy` 修饰符，处理字符串 trimmed、数字转换和懒更新行为，符合 Vue 语义。

**自定义组件适配**：通过 `prop` 和 `event` 选项支持自定义组件的 `v-model` 绑定，兼容 Vue 的 `modelValue` 约定。

**无依赖纯函数**：纯运行时辅助函数，不依赖组件上下文，可在编译阶段内联或作为独立工具函数调用。

**事件对象兼容**：统一处理原生事件对象和自定义组件的直接值传递，自动识别并提取正确的数据。

### 使用方法

#### 1. 基础文本输入（对应 Vue v-model="search"）

编译 `<input v-model="search" />` 表达式：

```jsx
import { vModel } from 'react-vue3-hooks';
import { useState } from 'react';

function SearchForm() {
  const [search, setSearch] = useState('');

  return (
    <input 
      type="text"
      {...vModel(search, setSearch, { type: 'text' })} 
    />
  );
  // 输出: <input type="text" value={search} onInput={handleChange} />
}
```

#### 2. 带修饰符的输入

实现 `.trim` 和 `.number` 修饰符：

```jsx
const [age, setAge] = useState('');

// 自动去除首尾空格并尝试转为数字
<input 
  type="text"
  {...vModel(age, setAge, { 
    type: 'text', 
    modifiers: ['trim', 'number'] 
  })} 
/>

// .lazy 修饰符：使用 onChange 而非 onInput
<input 
  type="text"
  {...vModel(search, setSearch, { 
    type: 'input', 
    modifiers: ['lazy'] 
  })} 
/>
```

#### 3. 复选框绑定（对应 Vue v-model="checked"）

```jsx
const [checked, setChecked] = useState(false);

<input 
  type="checkbox"
  {...vModel(checked, setChecked, { type: 'checkbox' })} 
/>
// 输出: <input type="checkbox" checked={checked} onChange={handleChange} />
```

#### 4. 单选按钮组

```jsx
const [selected, setSelected] = useState('option1');

<label>
  <input 
    type="radio" 
    value="option1"
    {...vModel(selected, setSelected, { type: 'radio', value: 'option1' })} 
  />
  Option 1
</label>
<label>
  <input 
    type="radio" 
    value="option2"
    {...vModel(selected, setSelected, { type: 'radio', value: 'option2' })} 
  />
  Option 2
</label>
```

#### 5. 选择框（单选与多选）

```jsx
// 单选
const [selected, setSelected] = useState('');
<select {...vModel(selected, setSelected, { type: 'select' })}>
  <option value="a">A</option>
  <option value="b">B</option>
</select>

// 多选
const [selectedItems, setSelectedItems] = useState([]);
<select 
  multiple
  {...vModel(selectedItems, setSelectedItems, { 
    type: 'select', 
    multiple: true 
  })}
>
  <option value="1">Item 1</option>
  <option value="2">Item 2</option>
</select>
```

#### 6. 自定义组件（对应 Vue v-model:modelValue）

```jsx
const [value, setValue] = useState('');

<MyCustomInput 
  {...vModel(value, setValue, {
    prop: 'modelValue',
    event: 'onUpdate_modelValue'
  })}
/>
// 输出: <MyCustomInput 
//         modelValue={value} 
//         onUpdate_modelValue={
//          (v) => setValue(v)
//         }
//       />
```

### 修饰符行为详解

| 修饰符 | 作用 | 实现细节 |
|--------|------|----------|
| `.trim` | 去除字符串首尾空格 | 仅在 `typeof val === 'string'` 时生效 |
| `.number` | 转换为数字 | 空字符串和非数字字符串**不转换**，保留原始值；`null→0`, `undefined→NaN` |
| `.lazy` | 延迟更新 | `input` 元素使用 `onChange` 而非 `onInput`；`textarea` 始终使用 `onInput` |

### 与 Vue 的差异说明

| 特性 | Vue v-model | vModel |
|------|-------------|--------|
| **执行时机** | 响应式系统同步更新 | 事件处理器异步更新状态 |
| **修饰符处理** | 编译时注入转换逻辑 | 运行时统一转换 |
| **自定义组件** | `model: { prop, event }` | 显式传递 `prop` 和 `event` 选项 |
| `.lazy` 对 textarea | 无效（始终 `onInput`） | **始终 `onInput`**（符合 Vue 语义） |
| `.number` 转换规则 | 空字符串和非数字字符串不转换 | **完全一致** |

**核心区别**：Vue 的 v-model 是响应式系统的一部分，通过编译器生成特定代码；vModel 是运行时辅助函数，接收状态值和更新函数，在 React 的不可变数据流中模拟双向绑定。

### 编译器代码生成示例

```tsx
// Vue 模板
<input v-model="search" />
<input v-model.trim.number="age" type="number" />
<Custom v-model:modelValue="value" />

// 编译后 React 代码
function MyComponent() {
  const [search, setSearch] = useState('');
  const [age, setAge] = useState('');
  const [value, setValue] = useState('');

  return (
    <>
      <input {...vModel(search, setSearch, { type: 'text' })} />
      
      <input 
        type="number"
        {...vModel(age, setAge, { 
          type: 'text', 
          modifiers: ['trim', 'number'] 
        })} 
      />
      
      <Custom 
        {...vModel(value, setValue, {
          prop: 'modelValue',
          event: 'onUpdate_modelValue'
        })}
      />
    </>
  );
}
```

### 注意事项

**`.number` 修饰符的精确语义**：`.number` 仅在字符串为有效数字时转换，"abc" 和 "" 会回退到原始值，避免输入框异常变 0 或 NaN。这是 Vue 的核心行为，vModel 完全复刻。

**自定义组件的事件格式**：`event` 选项应使用 React 事件命名风格（如 `onUpdate_modelValue`），而非 Vue 的 `update:modelValue`。编译器需负责名称转换。

**File 输入的只读性**：`type="file"` 的 input 只提供 `onChange`，不提供 `value`，这是浏览器安全限制。vModel 自动处理此行为。

**Select 多选的空值处理**：多选模式下，若 `value` 为 `null` 或 `undefined`，vModel 会自动初始化为空数组 `[]`，避免运行时错误。

**与受控组件的关系**：vModel 生成的是**完全受控组件**，必须提供 `value` 和 `setter`。若需非受控行为，应使用 `useRef` 和 `defaultValue`。

**性能优化**：对于频繁更新的输入（如实时搜索），应考虑防抖或在 `setter` 中实现节流，避免每次输入都触发重渲染。