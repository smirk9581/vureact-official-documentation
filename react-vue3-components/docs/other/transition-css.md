# Transtion 样式表

这里预设了一些用于 <a href="../components/transition">`<Transition>`</a> CSS 过渡效果的样式类集合。

## 淡入淡出

`name="fade"`

```css
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s ease;
}
```

## 缩放过渡

`name="scale"`

```css
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.scale-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all .5s ease;
}

.scale-leave-active {
  opacity: 0;
  transform: scale(0.8);
  transition: all .5s ease;
}
```

## 滑动过渡效果

### 向上滑动

`name="slide-up"`

```css
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all .5s ease;
}

.slide-up-leave-active {
  opacity: 0;
  transform: translateY(-30px);
  transition: all .5s ease;
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
```

### 向下滑动

`name="slide-down"`

```css
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all .5s ease;
}

.slide-down-leave-active {
  opacity: 0;
  transform: translateY(30px);
  transition: all .5s ease;
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```

### 向左滑动

`name="slide-left"`

```css
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all .5s ease;
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-30px);
  transition: all .5s ease;
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
```

### 向右滑动

`name="slide-right"`

```css
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all .5s ease;
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(30px);
  transition: all .5s ease;
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

## 特殊动画效果

### 弹跳动画

`name="bounce"`

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

### 缩放动画

`name="zoom"`

```css
.zoom-enter-active {
  animation: zoom-in 0.5s;
}

.zoom-leave-active {
  animation: zoom-in 0.5s reverse;
}

@keyframes zoom-in {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 翻转动画

`name="flip"`

```css
.flip-enter-active {
  animation: flip-in 0.5s;
}

.flip-leave-active {
  animation: flip-in 0.5s reverse;
}

@keyframes flip-in {
  0% {
    transform: perspective(400px) rotateY(90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(400px) rotateY(0deg);
    opacity: 1;
  }
}
```

## 组合过渡效果

### 淡入缩放组合

`name="fade-scale"`

```css
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-scale-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all .5s ease;
}

.fade-scale-leave-active {
  opacity: 0;
  transform: scale(1.1);
  transition: all .5s ease;
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
```

## 列表过渡效果

### 列表项过渡

`name="list"`

```css
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.5s ease;
}

.list-leave-active {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.5s ease;
}
```

### 交错列表动画

`name="staggered"`

```css
.staggered-enter-from,
.staggered-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.staggered-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all .5s ease;
}

.staggered-leave-active {
  opacity: 0;
  transform: translateY(30px);
  transition: all .5s ease;
}
```

#### 为列表项添加延迟

```css
.staggered-enter-active:nth-child(1) {
  transition-delay: 0.1s;
}
.staggered-enter-active:nth-child(2) {
  transition-delay: 0.2s;
}
.staggered-enter-active:nth-child(3) {
  transition-delay: 0.3s;
}
.staggered-enter-active:nth-child(4) {
  transition-delay: 0.4s;
}
.staggered-enter-active:nth-child(5) {
  transition-delay: 0.5s;
}

.staggered-leave-active:nth-child(1) {
  transition-delay: 0.1s;
}
.staggered-leave-active:nth-child(2) {
  transition-delay: 0.2s;
}
.staggered-leave-active:nth-child(3) {
  transition-delay: 0.3s;
}
.staggered-leave-active:nth-child(4) {
  transition-delay: 0.4s;
}
.staggered-leave-active:nth-child(5) {
  transition-delay: 0.5s;
}
```

## 禁用过渡

`name="no-transition"`

```css
.no-transition-enter-active,
.no-transition-leave-active {
  transition: none !important;
  animation: none !important;
}
```

## 减少动画支持

```css
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active,
  .scale-enter-active,
  .scale-leave-active,
  .slide-enter-active,
  .slide-leave-active,
  .bounce-enter-active,
  .bounce-leave-active,
  .zoom-enter-active,
  .zoom-leave-active,
  .flip-enter-active,
  .flip-leave-active {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```
