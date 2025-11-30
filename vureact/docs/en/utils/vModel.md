# vModel

vModel corresponds to the `v-model` directive in Vue 3, used to implement two-way data binding in React.

It automatically selects the correct properties (value/checked) and events (onInput/onChange) based on the form element type, and supports Vue-style modifier system, encapsulating data synchronization logic into expandable JSX props objects.

## Core Features

**Multi-type form support**: Intelligently identifies native elements such as `input`, `textarea`, `select`, `checkbox`, `radio`, `file`, and automatically binds corresponding properties and event handlers.

**Modifier system**: Fully implements `.trim`, `.number`, `.lazy` modifiers, handling string trimming, number conversion, and lazy update behaviors, conforming to Vue semantics.

**Custom component adaptation**: Supports `v-model` binding for custom components through `prop` and `event` options, compatible with Vue's `modelValue` convention.

**Dependency-free pure function**: A pure runtime helper function that does not depend on component context, can be inlined during compilation or called as an independent utility function.

**Event object compatibility**: Uniformly handles native event objects and direct value passing of custom components, automatically identifying and extracting correct data.

## Usage Methods

### 1. Basic text input (corresponding to Vue v-model="search")

Compiling the `<input v-model="search" />` expression:

```jsx
import { vModel } from 'react-vue3-hooks';
import { useState } from 'react';

function SearchForm() {
  const [search, setSearch] = useState('');

  return (
    <input 
      type="text"
      {...vModel(search, setSearch, { type: 'text' })} 
    />
  );
  // Output: <input type="text" value={search} onInput={handleChange} />
}
```

### 2. Input with modifiers

Implementing `.trim` and `.number` modifiers:

```jsx
const [age, setAge] = useState('');

// Automatically remove leading/trailing spaces and try to convert to number
<input 
  type="text"
  {...vModel(age, setAge, { 
    type: 'text', 
    modifiers: ['trim', 'number'] 
  })} 
/>

// .lazy modifier: uses onChange instead of onInput
<input 
  type="text"
  {...vModel(search, setSearch, { 
    type: 'input', 
    modifiers: ['lazy'] 
  })} 
/>
```

### 3. Checkbox binding (corresponding to Vue v-model="checked")

```jsx
const [checked, setChecked] = useState(false);

<input 
  type="checkbox"
  {...vModel(checked, setChecked, { type: 'checkbox' })} 
/>
// Output: <input type="checkbox" checked={checked} onChange={handleChange} />
```

### 4. Radio button group

```jsx
const [selected, setSelected] = useState('option1');

<label>
  <input 
    type="radio" 
    value="option1"
    {...vModel(selected, setSelected, { type: 'radio', value: 'option1' })} 
  />
  Option 1
</label>
<label>
  <input 
    type="radio" 
    value="option2"
    {...vModel(selected, setSelected, { type: 'radio', value: 'option2' })} 
  />
  Option 2
</label>
```

### 5. Select box (single and multiple selection)

```jsx
// Single selection
const [selected, setSelected] = useState('');
<select {...vModel(selected, setSelected, { type: 'select' })}>
  <option value="a">A</option>
  <option value="b">B</option>
</select>

// Multiple selection
const [selectedItems, setSelectedItems] = useState([]);
<select 
  multiple
  {...vModel(selectedItems, setSelectedItems, { 
    type: 'select', 
    multiple: true 
  })}
>
  <option value="1">Item 1</option>
  <option value="2">Item 2</option>
</select>
```

### 6. Custom components (corresponding to Vue v-model:modelValue)

```jsx
const [value, setValue] = useState('');

<MyCustomInput 
  {...vModel(value, setValue, {
    prop: 'modelValue',
    event: 'onUpdate_modelValue'
  })}
/>
// Output: <MyCustomInput 
//         modelValue={value} 
//         onUpdate_modelValue={
//          (v) => setValue(v)
//         }
//       />
```

## Detailed Explanation of Modifier Behaviors

| Modifier | Function | Implementation Details |
|----------|----------|-----------------------|
| `.trim` | Removes leading and trailing spaces from strings | Only takes effect when `typeof val === 'string'` |
| `.number` | Converts to number | Empty strings and non-numeric strings are **not converted**, original values are retained; `null→0`, `undefined→NaN` |
| `.lazy` | Delays update | `input` elements use `onChange` instead of `onInput`; `textarea` always uses `onInput` |

## Difference from Vue

| Feature | Vue v-model | vModel |
|---------|-------------|--------|
| **Execution timing** | Reactive system synchronous update | Event handler asynchronous state update |
| **Modifier processing** | Compile-time injection of conversion logic | Runtime unified conversion |
| **Custom components** | `model: { prop, event }` | Explicitly pass `prop` and `event` options |
| `.lazy` for textarea | Invalid (always `onInput`) | **Always `onInput`** (conforms to Vue semantics) |
| `.number` conversion rules | Empty strings and non-numeric strings are not converted | **Exactly the same** |

**Core difference**: Vue's v-model is part of the reactive system, generating specific code through the compiler; vModel is a runtime helper function that receives state values and update functions, simulating two-way binding in React's immutable data flow.

## Compiler Code Generation Example

```tsx
// Vue template
<input v-model="search" />
<input v-model.trim.number="age" type="number" />
<Custom v-model:modelValue="value" />

// Compiled React code
function MyComponent() {
  const [search, setSearch] = useState('');
  const [age, setAge] = useState('');
  const [value, setValue] = useState('');

  return (
    <>
      <input {...vModel(search, setSearch, { type: 'text' })} />
      
      <input 
        type="number"
        {...vModel(age, setAge, { 
          type: 'text', 
          modifiers: ['trim', 'number'] 
        })} 
      />
      
      <Custom 
        {...vModel(value, setValue, {
          prop: 'modelValue',
          event: 'onUpdate_modelValue'
        })}
      />
    </>
  );
}
```

## Notes

**Precise semantics of `.number` modifier**: `.number` only converts when the string is a valid number. "abc" and "" will fall back to the original value, avoiding abnormal input box changes to 0 or NaN. This is a core behavior of Vue, and vModel fully replicates it.

**Event format for custom components**: The `event` option should use React event naming style (e.g., `onUpdate_modelValue`), not Vue's `update:modelValue`. The compiler is responsible for name conversion.

**Read-only nature of File input**: Inputs with `type="file"` only provide `onChange`, not `value`, due to browser security restrictions. vModel handles this behavior automatically.

**Empty value handling for multi-select Select**: In multi-select mode, if `value` is `null` or `undefined`, vModel will automatically initialize it to an empty array `[]` to avoid runtime errors.

**Relationship with controlled components**: vModel generates **fully controlled components**, and must provide `value` and `setter`. For uncontrolled behavior, `useRef` and `defaultValue` should be used.

**Performance optimization**: For frequently updated inputs (such as real-time search), debouncing should be considered or throttling implemented in the `setter` to avoid triggering re-renders on each input.
