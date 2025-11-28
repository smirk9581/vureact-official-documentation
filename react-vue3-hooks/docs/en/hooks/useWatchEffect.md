# useWatchEffect

`useWatchEffect` corresponds to Vue 3's **`watchEffect` API**, which re-runs the function when dependencies change.

## Core Features

- **Immediate first execution:** Unlike `useWatch`, `useWatchEffect` will **execute immediately once** when the component is mounted.
- **Stop listening:** Returns a `stop` function to cancel the listener at any time.

## Usage

`useWatchEffect` accepts a callback function and a dependency array (optional), consistent with useEffect.

### 1. Basic Usage: Automatically Track Dependencies

```jsx
import { useState$, useWatchEffect } from 'react-vue3-hooks';

const [count, setCount] = useState$(0);
const [data, setData] = useState$(null);

useWatchEffect(async () => {
  // Asynchronous operation: fetch data based on the latest count
  const result = await fetch(`/api/data/${count}`);
  setData(await result.json());
}, [count]);
```

### 2. Clean Up Side Effects and Stop Listening

`useWatchEffect` also returns a `stop` function for manually stopping the listening.

```jsx
const stopHandle = useWatchEffect(() => {
  const subscription = subscribeToStream(sourceId); 

  // Return a cleanup function
  return () => {
    subscription.unsubscribe();
    console.log(`Unsubscribed from ID: ${sourceId}`);
  };
}, [sourceId]);

const stop = () => {
  stopHandle();
};
```

## Execution Timing Variants

To more precisely control the execution timing of side effects, this library also provides the following variants, which correspond to different stages of the Vue 3 rendering cycle:

| **Hook Name**            | **Corresponding Vue 3 API** | **Execution Timing**       | **Applicable Scenarios**                          |
| ------------------------ | --------------------------- | -------------------------- | ------------------------------------------------- |
| **`useWatchEffect`**     | `watchEffect`               | Consistent with useEffect  | Default choice, need to access the updated DOM    |
| **`useWatchSyncEffect`** | `watchSyncEffect`           | Consistent with useLayoutEffect | Need to modify DOM styles or layout synchronously |
| `useWatchPostEffect`     | `watchPostEffect`           | Consistent with useWatchEffect | Consistent with useWatchEffect                    |