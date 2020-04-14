# vue开发中遇到的问题

## keyup与blur 事件冲突
```
// vue 中
@blur.stop="handleInput(node, data)"
@keyup.enter.native="$event.target.blur"
```