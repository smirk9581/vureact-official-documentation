# vShow

vShow 对应 Vue 3 中的 `v-show` 指令，用于在 React JSX 中控制元素的显示与隐藏状态。

它通过动态设置元素的 `display` CSS 属性实现显示逻辑：当状态为 `true` 时使用默认显示样式（移除显式 `display`），为 `false` 时设置 `display: none`，保持元素在 DOM 中的存在性。

### 核心特性

**轻量实现**：仅通过控制 `display` 属性实现显示隐藏，不涉及 DOM 节点的添加/移除。

**布尔值驱动**：直接接收布尔值状态，true 显示、false 隐藏，逻辑直观。

**通用适配**：支持所有 HTML 元素和自定义组件，通过 props 展开即可生效。

**无副作用**：纯函数实现，不依赖 React 上下文或状态管理，仅返回 JSX 属性对象。

### 使用方法

#### 1. 基础元素显示控制（对应 Vue v-show="isVisible"）

编译 `<div v-show="isVisible">内容</div>` 表达式：

```jsx
import { vShow } from 'react-vue3-hooks';
import { useState } from 'react';

function VisibleBox() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div {...vShow(isVisible)}>
      这部分内容会根据 isVisible 状态显示/隐藏
    </div>
  );
  // 输出: 当 isVisible 为 true 时 <div>...</div>，为 false 时 <div style={{ display: 'none' }}>...</div>
}
```

#### 2. 结合交互控制显示状态

通过按钮切换显示状态：

```jsx
function ToggleContent() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}内容
      </button>
      <p {...vShow(show)}>
        点击按钮可以切换我的显示状态
      </p>
    </div>
  );
}
```

#### 3. 与表单元素配合使用

控制输入框的显示：

```jsx
function ConditionalInput() {
  const [enableInput, setEnableInput] = useState(false);

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={enableInput}
          onChange={(e) => setEnableInput(e.target.checked)}
        />
        启用输入框
      </label>
      <input 
        type="text" 
        placeholder="仅当勾选时显示"
        {...vShow(enableInput)}
      />
    </div>
  );
}
```

#### 4. 自定义组件的显示控制

对自定义组件应用 vShow，控制其整体显示：

```jsx
function CustomCard({ children }) {
  return (
    <div className="card" style={{ border: '1px solid #ccc', padding: '10px' }}>
      {children}
    </div>
  );
}

function ComponentWithShow() {
  const [showCard, setShowCard] = useState(true);

  return (
    <CustomCard {...vShow(showCard)}>
      这是一个可隐藏的卡片组件
    </CustomCard>
  );
}
```

### 与 Vue 的差异说明

| 特性 | Vue v-show | vShow |
|------|------------|-------|
| **实现方式** | 模板指令，编译时处理 | 运行时函数，返回 props 对象 |
| **DOM 存在性** | 始终保留元素 | 完全一致，始终保留元素 |
| **样式控制** | 通过 `display` 属性 | 完全一致，通过 `display` 属性 |
| **自定义组件** | 作用于组件根元素 | 需通过 props 展开传递到根元素 |
| **性能表现** | 频繁切换性能更优 | 完全一致，频繁切换性能更优 |

**核心区别**：Vue 的 `v-show` 是模板编译阶段处理的指令，直接作用于元素；vShow 是运行时辅助函数，需要通过 JSX 的 props 展开语法（`{...vShow(state)}`）应用到元素，行为逻辑与 Vue 保持一致。

### 注意事项

**与 v-if 的区别**：vShow 仅控制 `display` 属性（元素仍在 DOM 中），而 React 原生的条件渲染（`{show && <Element />}`）会直接添加/移除 DOM 节点。频繁切换显示状态时，vShow 性能更优。

**默认 display 行为**：当状态为 `true` 时，vShow 返回空的 `display`（而非 `block` 或 `inline`），确保元素使用自身默认的显示样式（如 `<span>` 保持行内，`<div>` 保持块级）。

**优先级问题**：如果元素本身通过 `style` 或 `className` 设置了 `display`，vShow 的隐藏状态（`display: none`）会覆盖原有设置；显示状态则不会影响原有 `display` 样式。

**表单状态保留**：使用 vShow 隐藏的表单元素（如输入框）会保留其值和状态（因为元素仍在 DOM 中），这与通过条件渲染隐藏的元素（状态会丢失）不同。

**性能考量**：对于极少切换显示状态或初始隐藏且内存占用大的元素，建议使用条件渲染（`{show && ...}`）；对于频繁切换的元素，优先使用 vShow。
