# useUnmounted

`useUnmounted` corresponds to the `onUnmounted` lifecycle hook in Vue 3.

It is used to execute cleanup logic once when a component is destroyed (unmounted), serving as a semantic solution for managing the cleanup of side effects.

## Core Features

- **Clear Semantics:** Clearly expresses the "component unmounted" lifecycle stage, avoiding confusion with the cleanup return function of `useEffect`.
- **Execute Only Once:** Ensures the callback function runs only when the component is unmounted.
- **Precise Timing:** Executes when the component is about to be removed from the DOM.

## Usage

`useUnmounted` accepts a callback function, which will be executed before the component is unmounted.

**Note:** `useUnmounted` **does not accept** a return cleanup function (as it is a cleanup function itself).

### 1. Simple Cleanup Operations

Used to clean up timers started by the component, cancel subscriptions, or remove global event listeners and other synchronous operations.

```jsx
import { useUnmounted } from 'react-vue3-hooks';

useUnmounted(() => {
  clearInterval(timerId);
});
```

### 2. Asynchronous Cleanup Operations

If the cleanup work itself is asynchronous (for example, closing a database connection or sending logs), you can directly execute `async` logic in the callback function.

```jsx
// Assume this is a Hook that returns an asynchronous disconnection function
const disconnect = useSomeConnection(); 

useUnmounted(async () => {
  // Perform asynchronous cleanup
  await disconnect(); 
});
```