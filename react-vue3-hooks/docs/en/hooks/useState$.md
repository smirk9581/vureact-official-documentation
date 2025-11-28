# useState$

`useState$` is an abstraction and adaptation of Vue 3's reactive state management (`ref` and `reactive`).

It aims to provide a unified state entry point, allowing developers to obtain a Vue-like **concise state modification experience** without having to worry too much about data types.

## Core Features

`useState$` combines the capabilities of React's native `useState` and the community's excellent `useImmer`, and automatically selects the optimal Hook for encapsulation based on the type of the initial value.

| **Initial Value Type**                                  | **Internally Used Hook** | **State Modification Method**              | **Corresponding Vue API** |
| ------------------------------------------------------- | ------------------------ | ------------------------------------------- | -------------------------- |
| **Primitive values** (e.g., `string`, `number`, `boolean`) | `useState`               | Standard overwriting update (`setState(newValue)`) | `ref`                      |
| **Complex objects** (Object, Array, Map, Set)           | `useImmer`               | **Draft-style update** (`setState(draft => {})`) | `reactive`                 |

## Usage

### 1. Primitive Values (Simple Values)

When the initial value is of a primitive type, `useState$` behaves exactly the same as `useState`.

```jsx
import { useState$ } from 'react-vue3-hooks';

// Behaves the same as useState(0)
const [count, setCount] = useState$(0); 

setCount(count + 1)
```

### 2. Complex Objects

When the initial value is a complex object, `useState$` enables Draft mode, allowing you to **directly modify the state object** in the callback function without manually handling immutability.

```jsx
import { useState$ } from 'react-vue3-hooks';

const [user, setUser] = useState$({
  id: 1,
  info: { age: 30, city: 'London' },
  posts: [{ title: 'First Post' }]
});

// Enable Draft mode, directly modify the user object in the callback
setUser(draft => {
  // Deeply modify nested properties without manual spreading
  draft.info.city = 'Paris'; 
  draft.posts.push({ title: 'New Post' });
});
```

## Options (Shallow Mode)

### `useState$(initialState, shallow)`

You can use the second parameter `shallow` to control `useState$` to always use React's native `useState`, even if the initial value is a complex object. This corresponds to Vue's `shallowRef` behavior.

```jsx
// Force the use of useState regardless of the initial value type
const [data, setData] = useState$({ count: 1 }, true /* shallow mode */); 

const handleUpdate = () => {
  // ⚠ Note: In this mode, you must manually return a new object to trigger an update
  // Similar to Vue's shallowRef, modifying internal properties will not trigger re-rendering
  setData({ ...data, count: data.count + 1 }); 
};
```