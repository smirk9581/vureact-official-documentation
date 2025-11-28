# useReadonly

`useReadonly` corresponds to the `readonly` API in Vue 3 and is used to create a **deeply read-only** version of state data.

Its core function is to ensure the immutability of the state, which is often used when passing the state of a parent component to a child component to prevent the child component from accidentally modifying shared data.

## Core Features

- **Deep Freezing:** By default, it performs a deep copy and **deep freezing** of the passed object, prohibiting modifications at any level.
- **Performance Optimization:** Uses `useMemo` to cache the read-only object, and only recalculates and freezes when the reference of `initialState` changes.
- **Type Safety:** The returned object has the TypeScript `Readonly<T>` type, providing compile-time read-only protection.

## Usage

### 1. Default (Deep) Readonly

Pass in an object or array, and `useReadonly` returns a new unmodifiable object.

```jsx
import { useReadonly } from 'react-vue3-hooks';

const data = { name: 'Alice', settings: { theme: 'dark' } }

// Create a read-only version
const readonlyData = useReadonly(data); 

// ❌ This operation is invalid or will throw an error
readonlyData.settings.theme = 'light'; 
```

### 2. Shallow Readonly

By setting the second parameter `shallow` to `true`, you can freeze only the first layer of the object, allowing modification of deep properties (though not recommended, but provides the ability aligned with Vue's `shallowReadonly`).

```jsx
const original = { 
  id: 1, 
  nested: { value: 100 } 
};

// Freeze only the top level: id is immutable, nested reference is immutable
const shallowReadonly = useReadonly(original, true); 

// ❌ Failed: modifying top-level properties
shallowReadonly.id = 2; 

// ✅ Success: can modify deep properties (because only shallow freezing is done)
shallowReadonly.nested.value = 200; 
```
