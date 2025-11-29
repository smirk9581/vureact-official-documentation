# Toolset Positioning and Usage Guide

This toolset focuses on serving as the **Runtime Core** of the **VuReact Compiler**.

Its main responsibility is to provide necessary underlying API conversion support for Vue directives during the compilation phase, ensuring that the finally generated React JSX code can work efficiently and stably in the runtime environment.

## Regarding Direct Usage

1. **General Tools (Recommended):**
    * **`nextTick`** and all **prefix-free** Hooks (such as `useWatch`, `useState$`, `useMounted`, etc.) are designed as universal and semantically clear development tools. They can be **directly imported** and used in any standard React project to enjoy a Vue-style development experience.

2. **Low-Level APIs (Compiler-Specific):**
    * Most tool methods starting with `v` belong to **Low-Level Primitives** designed for the internal processes of the `VuReact` compiler.
    * These APIs are highly abstract and professional. If you choose to call them directly in business code, you need to have an in-depth understanding and adaptation process of the compilation and conversion mechanism of `VuReact`. We recommend that ordinary developers **avoid using** these tools directly unless you are extending or debugging the `VuReact` compiler itself.