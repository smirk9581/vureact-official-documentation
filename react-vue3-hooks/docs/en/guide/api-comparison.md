# API Comparison Table

Since some APIs in React already have the same functionality as those in Vue, there's no need to implement all of them equivalently. We can select appropriate APIs by referring to the table below.

| Vue 3 API | Adaptation Solution Provided by This Library | Description |
| :--- | :--- | :--- |
| `ref` | `useState$` (automatically adapts to primitive values) | In Vue, `ref` is used for reactive handling of basic types. The `useState$` in this library automatically adopts the `useState` logic for primitive values. |
| `reactive` | `useState$` (automatically adapts to complex objects) | Vue's `reactive` handles reactivity for objects/arrays. The `useState$` in this library automatically uses the `useImmer` logic for complex objects, supporting direct modification. |
| `readonly` | `useReadonly` | Provides deeply frozen read-only state to ensure data cannot be modified, supports shallow read-only mode, corresponding to Vue's read-only feature. |
| `watch` | `useWatch` | Offers more precise monitoring control than `useEffect`, supporting monitoring of single/multiple data sources, getter functions, and options such as `immediate`, `deep`, `once`, etc., and returns a stop function. |
| `watchEffect` | `useWatchEffect` | Requires manual addition of dependencies, provides variants for different timings such as `useWatchSyncEffect` (synchronous execution), supports cleanup functions and manual stopping. |
| `onMounted` | `useMounted` | Semantically clearer logic for execution after component mounting, supports synchronous and asynchronous operations, and is executed only once. |
| `onUnmounted` | `useUnmounted` | Specifically used for cleanup logic when the component is unmounted, supports synchronous and asynchronous cleanup operations, without the need to be nested in `useEffect`. |
| `onUpdated` | `useUpdated` | Automatically skips the first mount and is only executed after the component is updated, supports returning a cleanup function to be executed before the next update. |
| `nextTick` | `nextTick` | Provides a unified method to wait for DOM update timing, internally automatically selects the optimal asynchronous strategy (microtask/macrotask), supporting both Promise and callback methods. |

## Unprovided Adaptation APIs

| Vue 3 API | Description |
| :--- | :--- |
| `computed` | In React, similar caching effects of computed properties can be achieved through `useMemo`, no additional encapsulation is needed. |
| `provide/inject` | React context (`useContext`) already provides similar cross-component data transfer capabilities, with consistent function coverage. |
| `isRef`/`isReactive` | The `useState$` of this library automatically adapts to types and hides implementation details, so developers do not need to manually judge the reactive type of values. |
| `toRefs` | The state update mode in React is different from that in Vue, relying on explicit state setting functions, so such conversion tools are not needed. |
| `shallowRef` | Can be implemented by enabling shallow mode through `useState$(initialState, true)`, no separate API is required. |
| `shallowReactive` | Same as above, the shallow mode of `useState$` already covers this functionality. |
| `watchPostEffect` | The behavior of `useWatchEffect` in this library is consistent with it, no need for repeated implementation. |
| `onBeforeMount` | There is no corresponding lifecycle hook before component mounting in React. Initialization logic can be executed in the top-level synchronous code of function components, no additional API is needed. |
| `onBeforeUpdate` | There is no directly corresponding lifecycle in React. Related logic can be executed before update through the `useEffect` cleanup function, no separate encapsulation is needed. |
| `onBeforeUnmount` | Semantically similar to `onUnmounted`, the `useUnmounted` of this library already covers the cleanup needs before component unmounting, no need for repeated implementation. |
