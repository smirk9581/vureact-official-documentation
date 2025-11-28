# API 对照表

由于 React 中的一些 API 其功能上已经和 Vue 的一致了，因此并不需要全部都对等实现一遍，我们可以通过参照表格选择合适的 API。

| Vue 3 API | 本库提供的适配方案 | 说明 |
| :--- | :--- | :--- |
| `ref` | `useState$` (自动适配原始值) | Vue 中 `ref` 用于基础类型响应式处理，本库 `useState$` 对原始值自动采用 `useState` 逻辑 |
| `reactive` | `useState$` (自动适配复杂对象) | Vue `reactive` 处理对象/数组响应式，本库 `useState$` 对复杂对象自动采用 `useImmer` 逻辑，支持直接修改 |
| `readonly` | `useReadonly` | 提供深度冻结的只读状态，确保数据不可修改，支持浅层只读模式，对应 Vue 只读特性 |
| `watch` | `useWatch` | 比 `useEffect` 提供更精准的监听控制，支持监听单个/多个数据源、Getter 函数，以及 `immediate`、`deep`、`once` 等选项，返回停止函数 |
| `watchEffect` | `useWatchEffect` | 需手动添加依赖项，提供 `useWatchSyncEffect` （同步执行）等不同时机的变体，支持清理函数和手动停止 |
| `onMounted` | `useMounted` | 语义化更清晰的组件挂载后执行逻辑，支持同步和异步操作，仅执行一次 |
| `onUnmounted` | `useUnmounted` | 专门用于组件卸载时的清理逻辑，支持同步和异步清理操作，无需嵌套在 `useEffect` 中 |
| `onUpdated` | `useUpdated` | 自动跳过首次挂载，仅在组件更新后执行，支持返回清理函数在下次更新前执行 |
| `nextTick` | `nextTick` | 提供统一的等待 DOM 更新时机的方法，内部自动选择最优异步策略（微任务/宏任务），支持 Promise 和回调两种方式 |

## 未提供适配的 API

| Vue 3 API | 说明 |
| :--- | :--- |
| `computed` | React 中可通过 `useMemo` 实现类似计算属性的缓存效果，无需额外封装 |
| `provide/inject` | React 上下文（`useContext`）已提供类似的跨组件数据传递能力，功能覆盖一致 |
| `isRef`/`isReactive` | 本库 `useState$` 自动适配类型并隐藏实现细节，开发者无需手动判断值的响应式类型 |
| `toRefs` | React 中状态更新模式与 Vue 不同，依赖显式的状态设置函数，无需此类转换工具 |
| `shallowRef` | 可通过 `useState$(initialState, true)` 启用浅层模式实现，无需单独 API |
| `shallowReactive` | 同上，`useState$` 的浅层模式已覆盖此功能 |
| `watchPostEffect` | 本库 `useWatchEffect` 行为与之一致，无需重复实现 |
| `onBeforeMount` | React 中组件挂载前无对应生命周期钩子，可在函数组件顶层同步代码中执行初始化逻辑，无需额外 API |
| `onBeforeUpdate` | React 中无直接对应生命周期，可通过 `useEffect` 清理函数在更新前执行相关逻辑，无需单独封装 |
| `onBeforeUnmount` | 与 `onUnmounted` 语义相近，本库 `useUnmounted` 已覆盖组件卸载前的清理需求，无需重复实现 |
