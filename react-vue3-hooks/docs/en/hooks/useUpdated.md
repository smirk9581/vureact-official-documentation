# useUpdated

`useUpdated` corresponds to the `onUpdated` lifecycle Hook in Vue 3.

It is used to execute side effects after the component has **finished updating**, which is equivalent to `useEffect` in React that skips the first execution.

## Core Features

- **Skip initial mount:** The callback function is only executed after the component is re-rendered (when Props or State change), ignoring the initial mount of the component.
- **No dependencies:** By default, it tracks **every** update of the component.
- **Clear semantics:** Precisely corresponds to the semantics of `onUpdated` in Vue 3.

## Usage

`useUpdated` accepts a callback function, which will be executed after each subsequent render of the component is committed to the DOM.

### 1. Monitor all updates

It is used to execute logic that needs to run after each update of the component, such as recalculating the scroll position or sending logs after an update.

```jsx
import { useUpdated } from 'react-vue3-hooks';

useUpdated(() => {
  // ...
});
```

### 2. Cleanup function (optional)

If side effects that need cleanup are started during an update, you can return a cleanup function in the callback function, which will be executed **before** the next update or when the component is unmounted.

```jsx
useUpdated(() => {
  // Assume starting a resource when updating
  const sub = subscribeToData(data);
  
  // Return a cleanup function to clean up old resources before the next update
  return () => {
    sub.unsubscribe();
  };
});
```