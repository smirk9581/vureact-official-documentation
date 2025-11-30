# vShow

vShow corresponds to the `v-show` directive in Vue 3, used to control the display and hiding state of elements in React JSX.

It implements the display logic by dynamically setting the `display` CSS property of the element: when the state is `true`, the default display style is used (removing the explicit `display`), and when it is `false`, `display: none` is set, keeping the element present in the DOM.

### Core Features

**Lightweight Implementation**: Only controls the `display` property to show or hide elements, without involving the addition/removal of DOM nodes.

**Boolean-driven**: Directly accepts a boolean state, where `true` means display and `false` means hide, with intuitive logic.

**Universal Adaptation**: Supports all HTML elements and custom components, and takes effect through props spreading.

**No Side Effects**: Pure function implementation, does not rely on React context or state management, only returns a JSX attribute object.

### Usage Methods

#### 1. Basic Element Display Control (corresponding to Vue's v-show="isVisible")

Compiling the `<div v-show="isVisible">Content</div>` expression:

```jsx
import { vShow } from 'react-vue3-hooks';
import { useState } from 'react';

function VisibleBox() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div {...vShow(isVisible)}>
      This content will show/hide based on the isVisible state
    </div>
  );
  // Output: <div>...</div> when isVisible is true, <div style={{ display: 'none' }}>...</div> when false
}
```

#### 2. Controlling Display State with Interaction

Toggle the display state via a button:

```jsx
function ToggleContent() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'} content
      </button>
      <p {...vShow(show)}>
        Click the button to toggle my display state
      </p>
    </div>
  );
}
```

#### 3. Using with Form Elements

Control the display of an input box:

```jsx
function ConditionalInput() {
  const [enableInput, setEnableInput] = useState(false);

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={enableInput}
          onChange={(e) => setEnableInput(e.target.checked)}
        />
        Enable input box
      </label>
      <input 
        type="text" 
        placeholder="Only shows when checked"
        {...vShow(enableInput)}
      />
    </div>
  );
}
```

#### 4. Display Control for Custom Components

Apply vShow to a custom component to control its overall display:

```jsx
function CustomCard({ children }) {
  return (
    <div className="card" style={{ border: '1px solid #ccc', padding: '10px' }}>
      {children}
    </div>
  );
}

function ComponentWithShow() {
  const [showCard, setShowCard] = useState(true);

  return (
    <CustomCard {...vShow(showCard)}>
      This is a hideable card component
    </CustomCard>
  );
}
```

### Differences from Vue

| Feature | Vue v-show | vShow |
|---------|------------|-------|
| **Implementation** | Template directive, processed at compile time | Runtime function, returns props object |
| **DOM Existence** | Element is always retained | Exactly the same, element is always retained |
| **Style Control** | Via `display` property | Exactly the same, via `display` property |
| **Custom Components** | Acts on the component's root element | Needs to be passed to the root element via props spreading |
| **Performance** | Better performance for frequent toggling | Exactly the same, better performance for frequent toggling |

**Core Difference**: Vue's `v-show` is a directive processed during template compilation, acting directly on elements; vShow is a runtime helper function that needs to be applied to elements through JSX's props spreading syntax (`{...vShow(state)}`), with behavioral logic consistent with Vue.

### Notes

**Difference from v-if**: vShow only controls the `display` property (the element remains in the DOM), while React's native conditional rendering (`{show && <Element />}`) directly adds/removes DOM nodes. For frequent display state toggling, vShow has better performance.

**Default Display Behavior**: When the state is `true`, vShow returns an empty `display` (instead of `block` or `inline`), ensuring the element uses its own default display style (e.g., `<span>` remains inline, `<div>` remains block-level).

**Priority Issue**: If an element has `display` set via `style` or `className`, the hidden state of vShow (`display: none`) will override the original setting; the display state will not affect the original `display` style.

**Form State Retention**: Form elements hidden using vShow (such as input boxes) retain their values and states (because the element is still in the DOM), unlike elements hidden through conditional rendering (where states are lost).

**Performance Considerations**: For elements that rarely toggle display state or are initially hidden with large memory usage, it is recommended to use conditional rendering (`{show && ...}`); for elements that toggle frequently, prioritize using vShow.
