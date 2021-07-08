## FLIP
First
即将做动画的元素的初始状态（比如位置、透明度等等）。

Last
即将做动画的元素的最终状态。

Invert
这一步比较关键，假设我们图片的初始位置是 左: 0, 上：0，元素动画后的最终位置是 左：100, 上100，那么很明显这个元素是向右下角运动了 100px;

DOM 元素属性的改变（比如 left、right、 transform 等等），会被集中起来延迟到浏览器的下一帧统一渲染，所以我们可以得到一个这样的中间时间点：DOM 状态（位置信息）改变了，而浏览器还没渲染。
有了这个前置条件，我们就可以保证先让 Vue 去操作 DOM 变更，此时浏览器还未渲染，我们已经能得到 DOM 状态变更后的位置了。

Play
倒置了以后，想要让它做动画就很简单了，再让它回到 0, 0 的位置即可，本文会采用最新的 Web Animation API 来实现最后的 Play

## web animate
https://github.com/web-animations/web-animations-js