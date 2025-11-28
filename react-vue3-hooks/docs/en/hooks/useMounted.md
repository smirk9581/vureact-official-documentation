# useMounted

`useMounted` corresponds to the `onMounted` lifecycle hook in Vue 3.

It is used to execute side effects or initialization logic once after the component is first rendered to the DOM (i.e., after **mounting is complete**).

## Core Features

- **Clear Semantics:** Clearly expresses the "component has been mounted" lifecycle stage, avoiding the ambiguity caused by using the `useEffect` empty dependency array (`[]`).
- **Executes Only Once:** Ensures that the callback function runs only once throughout the component's lifecycle.
- **Supports Asynchronous Operations:** Allows passing in an `async` function, facilitating the execution of asynchronous data requests, initialization of third-party libraries, or other asynchronous side effects immediately after mounting.

## Usage

`useMounted` accepts a synchronous or asynchronous callback function, which will be executed after the component is mounted.

### 1. Synchronous Operations

You can directly perform DOM operations or synchronous initialization in the callback function:

```jsx
import { useMounted } from 'react-vue3-hooks';

useMounted(() => {
  // ...
});
```

### 2. Asynchronous Operations

The callback function can be an `async` function, used to start asynchronous tasks immediately after mounting, such as data fetching:

```jsx
useMounted(async () => {
  // Asynchronously fetch data
  const response = await fetch('/api/initial-data');
  const result = await response.json();
});
```