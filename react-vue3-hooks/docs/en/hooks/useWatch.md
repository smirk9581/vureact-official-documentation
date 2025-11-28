# useWatch

`useWatch` corresponds exactly to the **`watch` API** in Vue 3. It is used to precisely monitor changes in one or more data sources and execute specific side effects when changes occur.

It is a powerful tool for managing complex reactive side effects, with clearer and more focused semantics than `useEffect`.

## Core Features

- **Flexible data sources**: Supports monitoring a single state value, an array of states, or a `Getter` function that returns a target value.
- **Callback function parameters**: The callback function receives two parameters: `newValue` and `oldValue`.
- **Control options**: Provides core options of Vue `watch`: `immediate`, `deep`, and `once`.
- **Stop watching**: Returns a `stop` function for canceling the listener at any time.

## Usage

### 1. Watching a single state or value (of `Source` type)

Directly pass in the state variable to be monitored.

```jsx
import { useState, useWatch } from 'react-vue3-hooks';

const [count, setCount] = useState$(0);

// Watch the single state count
useWatch(count, (newVal, oldVal) => {
  // ...
});
```

### 2. Watching multiple states (an array of `Source[]`)

Pass in an array of states. The callback will be triggered when any state changes. Both `newVal` and `oldVal` of the callback function are arrays.

```jsx
const [firstName, setFirstName] = useState$('A');
const [lastName, setLastName] = useState$('B');

// Watch multiple states [firstName, lastName]
useWatch([firstName, lastName], (newNames, oldNames) => {
  // ...
});
```

### 3. Watching the value returned by a Getter function (`() => Value`)

Pass in a Getter function, and **treat the return value of the function as an overall dependency**. It is often used to monitor computed values or deep properties, and can be combined with the `deep: true` option.

```jsx
const [user, setUser] = useState$({ details: { age: 30 } });

// Watch the return value of the Getter function: user.details.age
useWatch(() => user.details.age, (newAge) => {
  // ...
});
```

### 4. Asynchronous operations

`useWatch` allows accepting asynchronous callbacks.

```jsx
const [id, setId] = useState$(0);

useWatch(id, async (newId) => {
  await fetch(`/api/data/${newId}`);
});
```

### 5. Stopping watching and deep watching

`useWatch` returns a `stop` function that can stop the listener at any time; the `deep: true` option is used for deep watching of objects.

```jsx
// Deep watch the user object and return a stop function
const stopWatch = useWatch(user, () => {
  // ...
}, { deep: true, immediate: true });

const stop = () => {
  stopWatch(); // Cancel the listener at any time
};
```