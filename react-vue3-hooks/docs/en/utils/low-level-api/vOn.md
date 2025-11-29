# vOn

vOn corresponds to the `v-on` directive in Vue 3. It is used to bind event handlers in React and supports Vue-style event modifiers.

It encapsulates modifier parsing, condition validation, and action execution into independent runtime logic, returning event handler objects that conform to React naming conventions (such as `onClick`).

## Core Features

**Modifier Chain Modifier Chaining**: Supports Vue event modifiers like `.stop`, `.prevent`, `.self`, `.once`, etc. Through chained parsing and sequential execution, it accurately replicates Vue's event handling behavior.

**Multi-type Event Support**: Covers mouse button modifiers (`.left`, `.middle`, `.right`) and keyboard key modifiers (`.enter`, `.esc`, `.space`, etc.), which are automatically mapped to the `button` and `key` properties of the event object.

**Parameter Passing Integrity**: Preserves all parameters received by the event handler, including the event object and custom parameters, ensuring consistency with the passing behavior of `$event` and additional parameters in Vue templates.

**Isolated `once` State**: Each vOn instance independently manages the `.once` state, and the execution count between different instances does not interfere with each other, complying with Vue's modifier scope rules.

**Event Object Fault Tolerance**: Gracefully handles `null`, `undefined`, or event objects lacking standard methods to avoid runtime errors and improve production environment robustness.

## Usage

### 1. Basic Event Binding (corresponds to Vue @click="handler")

Compile the `@click="handleClick"` expression:

```jsx
import { vOn } from 'react-vue3-hooks';

function MyComponent() {
  const handleClick = () => console.log('Clicked');
  
  return <button {...vOn('click', handleClick)}>Click me</button>;
  // Output: <button onClick={handleClick}>Click me</button>
}
```

### 2. With .stop Modifier (Prevent Bubbling)

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

### 3. With .prevent Modifier (Prevent Default Behavior)

```jsx
function Form() {
  const handleSubmit = (e) => {
    console.log('Form submitted');
    // No need for manual e.preventDefault()
  };
  
  return (
    <form {...vOn('submit.prevent', handleSubmit)}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 4. .self Modifier (Trigger Only on Self)

```jsx
function SelfClick() {
  const handleClick = () => console.log('Only self');
  
  return (
    <div {...vOn('click.self', handleClick)}>
      <p>Clicking this text won't trigger handler</p>
    </div>
  );
  // The handler is only triggered when clicking the div element directly
}
```

### 5. .once Modifier (Execute Only Once)

```jsx
function OneTimeButton() {
  const handleClick = () => console.log('This will only log once');
  
  return <button {...vOn('click.once', handleClick)}>Click Once</button>;
  
  // Repeated clicks won't trigger again
}
```

### 6. Mouse Button Modifiers

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

### 7. Keyboard Key Modifiers

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

### 8. Multiple Modifier Combinations (Execution Order is Critical)

```jsx
function ComplexHandler() {
  const handleClick = () => console.log('Handler executed');
  
  return (
    <button {...vOn('click.stop.prevent.once', handleClick)}>
      Stop + Prevent + Once
    </button>
  );
  // Execution order: self validation → once validation → execute stop → execute prevent → call handler
}
```

### 9. With Custom Parameters (corresponds to Vue @click="handler('arg', $event)")

```jsx
function ListItem({ itemId }) {
  const handleDelete = (event, id) => {
    console.log(`Delete item ${id}`);
    event.stopPropagation(); // Native methods can still be used
  };
  
  return (
    <button {...vOn('click', (e) => handleDelete(e, itemId))}>
      Delete
    </button>
  );
}
```

## Modifier Execution Order and Rules

| Modifier | Validation Timing | Action Timing | Description |
|----------|-------------------|---------------|-------------|
| `once` | **Highest priority** | Set flag | Prevent all subsequent executions |
| `self` | Validation phase | None | Return directly if condition fails |
| `left/right/middle` | Validation phase | None | Check `event.button` |
| `enter/esc/space` | Validation phase | None | Check `event.key` |
| `stop` | After validation passes | Execute action | Call `stopPropagation` |
| `prevent` | After validation passes | Execute action | Call `preventDefault` |

**Core Rule**: Modifiers in the validation phase are executed in the declared order. If any condition fails, all subsequent actions are terminated; modifiers in the action phase are executed sequentially after all validations pass.

## Difference from Vue

| Feature | Vue v-on | vOn |
|---------|----------|-----|
| **Modifier Syntax** | `@click.stop.prevent` | `vOn('click.stop.prevent', handler)` |
| **Event Naming** | `click` → `onClick` (automatically converted by Vue) | Original event name must be passed (e.g., `click`) |
| **Parameter Passing** | `handler('arg', $event)` | Manual wrapping required: `(e) => handler(e, 'arg')` |
| **Keyboard Modifiers** | Support key combinations (`@keydown.ctrl.enter`) | Only single key modifiers are supported; key combinations need to be implemented manually in the callback |
| **Event Object** | Automatic `$event` | Explicit event parameter passing is required |
| **TypeScript** | No type checking in templates | Complete type inference, support for generics |

**Core Limitations**:

- **No Key Combination Support**: Vue's `@keydown.ctrl.enter` is compiled to check `event.ctrlKey && event.key === 'Enter'`. vOn currently only supports single key modifiers; key combinations need to be implemented manually in the callback.
- **No System Modifiers**: `.ctrl`, `.alt`, `.shift`, `.meta` modifiers are not implemented due to platform compatibility and differences in event object properties.
- **Event Name Format**: Must pass **native DOM event names** (such as `click`, `keydown`) instead of React's `onClick` format. The compiler is responsible for removing the `on` prefix and lowercasing the first letter.

## Compiler Code Generation Example

```tsx
// Vue template
<button @click="handleClick" @click.stop="handleNoBubble">Click</button>
<input @keydown.enter="submit" />

// Compiled React code
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

## Notes

**Event Object Security**: vOn internally uses optional chaining (`event?.stopPropagation?.()`) and type checking, but when manually accessing event properties in callback functions, attention should still be paid to the possibility of `null` or simplified objects being passed in SSR or test environments.

**Memory Leak Risk with once Modifier**: `.once` is implemented through the closure variable `once = true`. If the component re-renders multiple times, a new vOn instance and closure will be created each time. For components with long lifecycles, this is expected behavior, consistent with Vue's modifier semantics.

**Naming of Keyboard Modifiers**: `enter` maps to `event.key === 'Enter'`, `esc` → `'Escape'`, `space` → `' '`. Some key names have browser differences (e.g., `Spacebar` is the naming in older IE versions), and vOn follows modern standards (`' '`).

**mousedown vs click**: Mouse button modifiers (such as `.left`) are recommended to be used with `mousedown` or `mouseup` events, because the `button` property of the `click` event may be 0 (left button) in some browsers regardless of the actual button. vOn validates according to the actual value of the event object, so the correct event type should be selected when using it.

**Relationship with React Synthetic Events**: The handler returned by vOn directly receives the native DOM event (or a synthetic event in React 17+). The `nativeEvent` property of React synthetic events points to the underlying browser event, and vOn's validation logic is valid for both.

**.self and Event Delegation**: `.self` is implemented by comparing `event.target === event.currentTarget`. In event delegation scenarios, if a parent element uses `.self`, events bubbling from child elements to the parent element will be blocked due to different targets, which is exactly consistent with Vue's behavior.
