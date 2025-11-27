# Transtion Stylesheet

Here is a collection of style classes 预设 for CSS transition effects of the <a href="../components/transition">`<Transition>`</a> component.

## Fade In/Out

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

## Scale Transition

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

## Slide Transition Effects

### Slide Up

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

### Slide Down

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

### Slide Left

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

### Slide Right

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

## Special Animation Effects

### Bounce Animation

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

### Zoom Animation

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

### Flip Animation

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

## Combined Transition Effects

### Fade and Scale Combination

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

## List Transition Effects

### List Item Transition

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

### Staggered List Animation

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

#### Adding Delay to List Items

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

## Disable Transition

`name="no-transition"`

```css
.no-transition-enter-active,
.no-transition-leave-active {
  transition: none !important;
  animation: none !important;
}
```

## Reduced Animation Support

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
