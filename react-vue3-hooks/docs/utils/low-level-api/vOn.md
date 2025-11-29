# vOn

vOn 对应 Vue 3 中的 `v-on` 指令，用于在 React 中绑定事件处理器并支持 Vue 风格的事件修饰符。

它将修饰符解析、条件验证和动作执行封装为独立的运行时逻辑，返回符合 React 命名规范（如 `onClick`）的事件处理器对象。

### 核心特性

**修饰符链式处理**：支持 `.stop`、`.prevent`、`.self`、`.once` 等 Vue 事件修饰符，通过链式解析和顺序执行，精确复刻 Vue 的事件处理行为。

**多类型事件支持**：涵盖鼠标按键修饰符（`.left`、`.middle`、`.right`）和键盘按键修饰符（`.enter`、`.esc`、`.space` 等），自动映射到事件对象的 `button` 和 `key` 属性。

**参数传递完整性**：保留事件处理器接收的所有参数，包括事件对象和自定义参数，确保与 Vue 模板中 `$event` 和额外参数的传递行为一致。

**once 状态隔离**：每个 vOn 实例独立管理 `.once` 状态，不同实例间的执行次数互不影响，符合 Vue 的修饰符作用域规则。

**事件对象容错**：优雅处理 `null`、`undefined` 或缺少标准方法的事件对象，避免运行时错误，提升生产环境健壮性。

### 使用方法

#### 1. 基础事件绑定（对应 Vue @click="handler"）

编译 `@click="handleClick"` 表达式：

```jsx
import { vOn } from 'react-vue3-hooks';

function MyComponent() {
  const handleClick = () => console.log('Clicked');
  
  return <button {...vOn('click', handleClick)}>Click me</button>;
  // 输出: <button onClick={handleClick}>Click me</button>
}
```

#### 2. 带 .stop 修饰符（阻止冒泡）

```jsx
function NestedButtons() {
  const handleInnerClick = () => console.log('Inner');
  const handleOuterClick = () => console.log('Outer');
  
  return (
    <div {...vOn('click', handleOuterClick)}>
      <button {...vOn('click.stop', handleInnerClick)}>
        Click (won't bubble)
      </button>
    </div>
  );
}
```

#### 3. 带 .prevent 修饰符（阻止默认行为）

```jsx
function Form() {
  const handleSubmit = (e) => {
    console.log('Form submitted');
    // 无需手动 e.preventDefault()
  };
  
  return (
    <form {...vOn('submit.prevent', handleSubmit)}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### 4. .self 修饰符（仅自身触发）

```jsx
function SelfClick() {
  const handleClick = () => console.log('Only self');
  
  return (
    <div {...vOn('click.self', handleClick)}>
      <p>Clicking this text won't trigger handler</p>
    </div>
  );
  // 只有直接点击 div 元素时才会触发
}
```

#### 5. .once 修饰符（仅执行一次）

```jsx
function OneTimeButton() {
  const handleClick = () => console.log('This will only log once');
  
  return <button {...vOn('click.once', handleClick)}>Click Once</button>;
  
  // 重复点击不会再触发
}
```

#### 6. 鼠标按键修饰符

```jsx
function ContextMenu() {
  const handleRightClick = () => console.log('Right click');
  
  return (
    <div {...vOn('contextmenu.right', handleRightClick)}>
      Right click me
    </div>
  );
}

function MouseButtons() {
  const handleLeft = () => console.log('Left button');
  const handleMiddle = () => console.log('Middle button');
  
  return (
    <>
      <button {...vOn('mousedown.left', handleLeft)}>Left</button>
      <button {...vOn('mousedown.middle', handleMiddle)}>Middle</button>
    </>
  );
}
```

#### 7. 键盘按键修饰符

```jsx
function SearchInput() {
  const handleEnter = () => console.log('Search submitted');
  
  return (
    <input 
      {...vOn('keydown.enter', handleEnter)}
      placeholder="Press Enter to search"
    />
  );
}

function EscapeHandler() {
  const handleEsc = () => console.log('Escape pressed');
  
  return <div {...vOn('keydown.esc', handleEsc)} tabIndex={0} />;
}
```

#### 8. 多修饰符组合（执行顺序关键）

```jsx
function ComplexHandler() {
  const handleClick = () => console.log('Handler executed');
  
  return (
    <button {...vOn('click.stop.prevent.once', handleClick)}>
      Stop + Prevent + Once
    </button>
  );
  // 执行顺序: self验证 → once验证 → 执行stop → 执行prevent → 调用handler
}
```

#### 9. 带自定义参数（对应 Vue @click="handler('arg', $event)"）

```jsx
function ListItem({ itemId }) {
  const handleDelete = (event, id) => {
    console.log(`Delete item ${id}`);
    event.stopPropagation(); // 仍可使用原生方法
  };
  
  return (
    <button {...vOn('click', (e) => handleDelete(e, itemId))}>
      Delete
    </button>
  );
}
```

### 修饰符执行顺序与规则

| 修饰符 | 验证时机 | 动作时机 | 说明 |
|--------|----------|----------|------|
| `once` | **最优先** | 设置标记 | 阻止后续所有执行 |
| `self` | 验证阶段 | 无 | 条件失败直接 return |
| `left/right/middle` | 验证阶段 | 无 | 检查 `event.button` |
| `enter/esc/space` | 验证阶段 | 无 | 检查 `event.key` |
| `stop` | 验证通过后 | 执行动作 | 调用 `stopPropagation` |
| `prevent` | 验证通过后 | 执行动作 | 调用 `preventDefault` |

**核心规则**：验证阶段的修饰符按声明顺序执行，任一条件失败则终止后续所有动作；动作阶段的修饰符在验证全部通过后顺序执行。

### 与 Vue 的差异说明

| 特性 | Vue v-on | vOn |
|------|----------|-----|
| **修饰符语法** | `@click.stop.prevent` | `vOn('click.stop.prevent', handler)` |
| **事件命名** | `click` → `onClick` (Vue 自动转换) | 需传入原始事件名（如 `click`） |
| **参数传递** | `handler('arg', $event)` | 需手动包装: `(e) => handler(e, 'arg')` |
| **键盘修饰符** | 支持组合键 (`@keydown.ctrl.enter`) | 仅支持单键修饰符，组合键需自行实现 |
| **事件对象** | 自动 `$event` | 需显式传递事件参数 |
| **TypeScript** | 模板内无类型检查 | 完整类型推断，支持泛型 |

**核心限制**：

- **无组合键支持**：Vue 的 `@keydown.ctrl.enter` 会编译为对 `event.ctrlKey && event.key === 'Enter'` 的检查。vOn 目前仅支持单个按键修饰符，组合键需手动在回调中实现。
- **无系统修饰符**：`.ctrl`、`.alt`、`.shift`、`.meta` 修饰符未实现，因涉及平台兼容性和事件对象属性差异。
- **事件名格式**：必须传入**原生 DOM 事件名**（如 `click`、`keydown`），而非 React 的 `onClick` 格式。编译器负责去除 `on` 前缀并小写首字母。

### 编译器代码生成示例

```tsx
// Vue 模板
<button @click="handleClick" @click.stop="handleNoBubble">Click</button>
<input @keydown.enter="submit" />

// 编译后 React 代码
function MyComponent() {
  return (
    <>
      <button {...vOn('click', handleClick)}>Click</button>
      <button {...vOn('click.stop', handleNoBubble)}>No Bubble</button>
      <input {...vOn('keydown.enter', submit)} />
    </>
  );
}
```

### 注意事项

**事件对象的安全性**：vOn 内部已使用可选链（`event?.stopPropagation?.()`）和类型检查，但在回调函数中手动访问事件属性时，仍需注意 SSR 或测试环境可能传递 `null` 或简化对象。

**once 修饰符的内存泄漏风险**：`.once` 通过闭包变量 `once = true` 实现，若组件多次重新渲染，每次都会创建新的 vOn 实例和闭包。对于长生命周期的组件，这是预期行为，与 Vue 的修饰符语义一致。

**键盘修饰符的命名**：`enter` 映射到 `event.key === 'Enter'`，`esc` → `'Escape'`，`space` → `' '`。部分按键名存在浏览器差异（如 `Spacebar` 为旧版 IE 命名），vOn 遵循现代标准（`' '`）。

**mousedown vs click**：鼠标按键修饰符（`.left` 等）建议在 `mousedown` 或 `mouseup` 事件中使用，因 `click` 事件在某些浏览器中 `button` 属性可能为 0（左键） regardless of actual button. vOn 按事件对象实际值验证，使用时需选择正确事件类型。

**与 React 合成事件的关系**：vOn 返回的处理器直接接收原生 DOM 事件（或在 React 17+ 中接收合成事件）。React 合成事件的 `nativeEvent` 属性指向底层浏览器事件，vOn 的验证逻辑对两者均有效。

 **.self 与事件委托**  ：`.self` 通过比较 `event.target === event.currentTarget` 实现。在事件委托场景中，若父元素使用 `.self`，子元素事件冒泡到父元素时会因 target 不同而被阻止，这与 Vue 行为完全一致。
