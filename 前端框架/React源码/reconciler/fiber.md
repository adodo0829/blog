## React Fiber Architecture

[原文地址](https://github.com/acdlite/react-fiber-architecture/blob/master/README.md)

[[思维导图](https://github.com/bubucuo/ReactArticles/blob/master/%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE.png)]

#### 前言

React Fiber 是 React 的一个正在重新实现的核心算法，它是 React 团队在这两年的研究顶点。

React Fiber 的目标是提高动画、布局、手势等场景的流畅度，它的主要特点是**增量渲染**（**incremental rendering**），就是说把渲染任务拆分成块，匀到多帧。

React Fiber 的其他主要特点还包括暂停、中止和复用任务，给不同类别的更新赋予优先级，以及【新基元的并发性(new concurrency primitives)】。

#### 关于这篇文档

Fiber 介绍了几种新概念，这些新概念单凭看代码是难以理解到位的。这篇文档起初是我做 React 项目时候完成 Fiber 做的一些笔记 ，后来随着这份笔记的丰富，我觉得它可能对于别人来说也是一个有用的资料。

我会尽量用最简洁的语言，尽量明确地定义关键词条，避免使用术语。我也会尽可能地关联内部资源。[这里的内部资源应该是指 React 的官方资源。]

请注意我不是 React 团队的成员，请不要说任何的权威性。这不是一篇官方的文档。同时为了保证准确度，我寻求了 React 团队审查这篇文档。

Fiber 尚未完成，它是一个正在进行中的工程，并且在完成之前可能还会经历大的重构。同步更新这篇文档是我的目标，同时非常欢迎大家提出改进和建议。

我的目标是让你读完这篇文档后，能够充分地理解 Fiber 并且能跟上它的迭代，最后甚至能为 React 贡献。[ 我会尽力哒:) ]

#### 预备知识

我强烈建议您在对以下资源熟悉之前再继续：

- [React Components, Elements, and Instances（React 组件、元素和实例）](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html) - "Component" 是一个经常会用到的术语，必须掌握！[这个是介绍虚拟 dom 的，2015 年 Dan 写的，比较简单，应该大家都已经掌握了。]
- [Reconciliation（协调）](https://zh-hans.reactjs.org/docs/reconciliation.html) - 深刻掌握 React 的协调算法（reconciliation algorithm）[主要是 diff 过程，算法复杂度为 O(n)]。
- [React Basic Theoretical Concepts（React 基本理论概念）](https://github.com/reactjs/react-basic) - 这是一个对 React 概念模型的描述，没有代码实现的逻辑。这里的一些内容也许不是必读的，当然你看了的话，随着时间，你会发现它们的价值的[网上看到一个还不错的[译文](https://github.com/react-guide/react-basic/blob/master/README.md)]。
- [React Design Principles（React 设计原则）](https://zh-hans.reactjs.org/docs/design-principles.html) - 希望你能对<u>调度（scheduling）</u>给予特殊的注意力，它深刻地解释了 React Fiber 的原理。[原文提到，这篇设计原则的文档目的是使开发者更易于了解他们如何决策 React（应该做哪些，不应该做哪些），以及他们的开发理念。]

#### 概览

请先检查下你是否阅读过上面的预备知识。

在我们深入新知识点之前，先来看一些概念。

##### 什么是协调？

###### 协调(_reconciliation_)

​React 用来对比(diff) 两棵树的算法，这个算法可以判断哪些地方需要被改变。

###### 更新(update)

指数据上的改变，用于渲染一个 React 应用。通常是 setState 导致的，最终会触发重新渲染(re-render)。

React API 的核心思想是认为 update 能引起整个应用重新渲染(re-render)。在项目中任何一种特殊的状态转变成另一种状态的时候，这种思想允许开发者声明式地推理，而不是担心如何有效地更新你的应用(app)。

[!--以下 app 不再翻译，就是应用的意思，指你的项目--]

事实上在每个变化时候都重新渲染整个 app 只对大部分不重要的 app 起作用。在一个现实中的 app，它会由于性能（performance）而被重度耗损。React 是有优先级(optimizations)的，这使得在整个 app 重新渲染的时候，app 能保持高性能。这一系列的所谓的优先级(optimizations)正是调度(reconciliation)过程的一部分。

调度(reconciliation)就是我们大家都知道的虚拟 dom 背后的算法。一个深刻一点的描述：当你渲染一个 React app 的时候，一个能描述整个 app 的树节点就产生了，这个树节点被存在内存(memory)中，这棵树然后会被带到渲染环境中。比如说，在一个浏览器端页面中，它会被转变成一系列的 dom 操作。当这个 app 更新的时候(通常是通过 setState 更新)，一棵新树就生成了。然后，新树和老树对比(diff)计算出如果要更新这个 app 的，需要进行什么操作。

尽管 Fiber 是对协调(reconciler)的全盘重写，但是[React 文档中描述的高级算法](https://reactjs.org/docs/reconciliation.html)大部分并不会改变。关键点如下：

- 设定不同的组件类型会生成完全不同的树节点，协调的时候 React 会整个替换(replace)老节点，不会去 diff。

- 列表的 diff 用 key，key 应该是“稳定的、可预测的、唯一的”。

#### 协调(reconciliation)与渲染(rendering)

DOM 是 React 能渲染的其中一种环境，其它主要是 React Native 下的原生 IOS 和安卓 view。（这也是虚拟 dom 是个怪兽的原因）。

React 能在这么多环境运行的原因是它的设计模式，即协调和渲染是独立的阶段（separation phases）。协调器(reconciler)的工作是计算一棵树哪里发生了变化，渲染器(renderer)的工作是用这些信息来实际上更新整个 app。[就是 reconciler 来 diff，renderer 根据 diff 结果去更新 dom 页面]

这种独立(separation)意味着 React DOM 和 React Native 可以共用一个由 React core 提供的协调器，然后分别用它们自己的更新器(renderer)。

Fiber 重写了协调器，但是原则上与渲染器无关，尽管渲染器也需要做出改变以适应新的架构。

#### 调度(Scheduling)

_scheduling_: 指决定工作何时执行的过程。

_work_：必须执行的任何计算。work 通常是由 update 导致的(如 setState)。

[React 设计原则](https://facebook.github.io/react/contributing/design-principles.html#scheduling)在调度上的描述太完善了，这里就直接引用了：

`在 React 当前的实现中，React 在单个 tick 周期中递归地走完这棵树，然后调用整个更新后树的渲染方法。但是以后 React 可能会延迟一些更新操作来防止掉帧。 这在 React 的设计中很常见。有一些流行的库实现了 “push” 模式，即当新数据到达时再计算。然而 React 坚持 “pull” 模式，即计算可以延迟到必要时再执行。 React 不是一个常规的数据处理库，它是开发用户界面的库。我们认为 React 在一个应用中的位置很独特，它知道当前哪些计算当前是相关的，哪些不是。 如果不在当前屏幕，我们可以延迟执行相关逻辑。如果数据数据到达的速度快过帧速，我们可以合并、批量更新。我们优先执行用户交互（例如按钮点击形成的动画）的工作，延后执行相对不那么重要的后台工作（例如渲染刚从网络上下载的新内容），从而避免掉帧。（此处译文来自https://zh-hans.reactjs.org/docs/design-principles.html#scheduling）`

关键点是：

- 在 UI 中，并不是每个更新(update)的都有必要立即执行，如果你真的这么做了不仅是一种浪费，还会引起掉帧，最后降低用户体验。
- 不同类型的更新(update)有不同的优先级(priority)，比如说动画更新的执行完成就需要比数据更新更及时。
- “push”模式需要 app(或者说是程序员)决定怎样执行调度工作，“pull”模式令 React 具有敏捷性，并帮助我们做出决定。

React 目前没有充分利用调度的优势，一个更新(update)引起整个子树的立即重新渲染(re-render)。大幅度修改 React 的核心算法以利用调度优势的是 Fiber 背后的驱动思想。

---

现在我们就来深入到 Fiber 的实现吧，下一个章节比我们刚刚讨论过的内容要更具技术性一点，所以请确保你在阅读接下来章节之前对前面提到的资源内容已经掌握。

#### 什么是 Fiber

我们接下来讨论 React Fiber 架构的核心。Fiber 其实比开发者一般想象中的要简单，如果你感觉自己理解起来有困难，不要泄气，继续尝试下去，你最终一定能受益匪浅。(当你最终理解 Fiber 的时候，可以建议一下如何改进这个章节的内容。)

开始咯！

我们已经说过 Fiber 的首要目标是让 React 可以利用调度的优势，尤其是我们需要用 Fiber 做到以下几点：

- 可以暂停任务，并且能稍后再回来

- 给不同类型的任务赋予优先级

- 能复用已经完成的任务

- 当不再需要某个任务的时候，能中止(abort)它

为了做到这几点，我们首先需要需要一种能拆分任务(work)成单元(unit)的方式，在一定意义上来说，那就是 Fiber。一个 Fiber 代表了一个元任务(unit of work)。

为了更进一步，让我们回到这个概念：把[React 组件作为数据的函数( React components as functions of data )](https://github.com/reactjs/react-basic#transformation)，通常如下方式：

```jsx
v = f(d);
```

这意味着渲染一个 React app 和调用一个内部调用了其他函数的函数是类似的，这种类比对于理解 Fiber 是有用的。

计算机一般用[调用堆栈(call stack)](https://en.wikipedia.org/wiki/Call_stack)来追踪程序的执行，当一个函数被执行之后，一个新的的栈帧(stack frame)被添加进栈，这个栈帧代表了这个函数执行的任务。

在处理 UI 的时候，会出现一次性有太多任务要被执行的情况，结果可能会引起动画掉帧、动画卡顿的现象。更重要的是，一些任务可能是不必要立即执行的，是可以被别的更紧迫任务代替的。由于一般情况下 UI 组件相对比函数更需要被先执行，而这就是 UI 组件和函数不一致的地方。

较新的浏览器(和 React Native)完善了相关 API 来解决这个问题：`requestIdleCallback`调度一个将会在闲置时期调用的低优先级的函数，`requestAnimationFrame`调度一个将会在下一个动画帧调用的高优先级的函数。问题就是，为了用这些 API，你需要一种方式来把渲染任务拆分成增量单元(incremental units)，如果你只是依赖于调用堆栈(call stack)，那这个栈就会一直工作直到栈空为止。

试想一下，如果我们可以定制调用堆栈的行为，从而达到优化渲染 UI 目的，这是不是很棒？如果我们可以根据自己的意愿干扰(interrupt)调用堆栈并且手动操控栈帧，这是不是很棒？

以上就是 React Fiber 的目的。Fiber 是栈的实现，是为 React 组件特殊定制的。你可以把一个 Fiber 当做一个虚拟栈帧(**virtual stack frame**)。

重新实现这种栈的好处就是你可以把栈帧保存在内存中([keep stack frames in memory](https://www.facebook.com/groups/2003630259862046/permalink/2054053404819731/))，并且在任何你需要的时候执行它。这对我们完成调度的目标是非常关键的。

除了调度，手动处理栈帧也能解锁一些潜在的技能，比如说并发和错误边界( concurrency and error boundaries)，我们在接下来的章节中也说再说到这些话题。

#### Fiber 的结构(Structure of a fiber)

注意：随着我们对于实现细节的逐步了解，一些变化的可能性也可能会变多。如果你注意到一些错误的或者过时信息，_Please file a PR。_

具体来说，一个 fiber 就是一个包含组件信息输入和输出的 JS 对象。

一个 fiber 对应一个栈帧，也对应一个组件实例。

一下是关于 fiber 的一些重要知识。(这个列表并没有详细列出 fiber 的所有字段。)

##### `type` and `key`

fiber 中的 type 和 key 的用途和 React 元素中的是完全一样的。(实际上，当 fiber 从元素中创建完成之后，这两个值是被直接拷贝出来的。)

fiber 的 type 描述了它对应的组件，对于复合组件(composite components)，type 就是 function 或者 class 组件本身，对于原生组件(host components)(如 div、span 等)，type 就是一个字符串。

从概念上来说，type 就是被栈帧追踪其执行的函数。

和 type 一样，key 用于协调过程中决定 fiber 是否可以被复用。

##### `child` and `sibling`

这两个值指向其它 fiber，描述 fiber 的递归树结构。

child fiber 指的是一个组件 render 方法返回的值，如下例：

```jsx
function Parent() {
  return <Child />;
}
```

在此例中，Parent 的 child fiber 指的是 Child。

sibling 指的是这种情况下：当 render 返回多个 children(Fiber 中的新特性！)：

```jsx
function Parent() {
  return [<Child1 />, <Child2 />];
}
```

child fibers 组成一个单向链表，他们的 head 是第一个 child，所以在上面例子中，Parent 的 child 是 Child1 ，Child1 的 sibling 是 Child2。

回到我们的函数类比，你可以把一个 child fiber 当做一个[尾调用函数(tail-called function)](https://en.wikipedia.org/wiki/Tail_call)。

[尾调用：

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g935ipofqmj30u016bnbu.jpg" height=600/>

来自[阮一峰尾调用优化](https://www.ruanyifeng.com/blog/2015/04/tail-call.html)]

##### `return`

return fiber 是指程序(program)在处理完当前 fiber 之后应当返回的 fiber，概念上来说，这是与一个栈帧返回一个地址是相同的，它也可被认为是一个 parent fiber。

##### `pendingProps` and `memoizedProps`

概念上来说，props 是指函数的参数。一个 fiber 的`pendingProps`被赋值在这个 fiber 执行(execution)的开始，`memoizedProps`则是在执行完成时被赋值。

当新传入的`pendingProps`等于 `memoizedProps`的时候，这表示这个 fiber 的上一个输出(output)可以被复用，从而避免了不必要的任务。

##### `pendingWorkPriority`（挂起任务优先级）

这是一个数字，它代表了指定 fiber 的任务优先级。React 优先级([ReactPriorityLevel](https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactPriorityLevel.js))模块列出了不同的优先级别和他们各自所指代的任务。

除了优先级为 0 的`NoWork`，数字越大，优先级越低。比如，你可以用下面的函数来检查一个 fiber 的优先级是大于等于所给出的优先级的。

```jsx
function matchesPriority(fiber, priority) {
  return (
    fiber.pendingWorkPriority !== 0 && fiber.pendingWorkPriority <= priority
  );
}
```

这个函数只是个例子，它并不来自 React Fiber 代码库的。

调度器用优先级字段(priority field)来查找下一个要执行的元任务，这种算法在后面的章节会讨论到。

##### `alternate`(alternate)

###### `flush`

flush 一个 fiber 的意思就是把这个 fiber 的输出(output)渲染到屏幕上。

###### `work-in-progress`(正在进行中的任务)

是指还没有完成的 fiber；概念来说就是，一个尚未被返回的栈帧(stack frame )。

在任何时候，一个组件实例最多有两个 fiber：当前已经渲染完成的的 fiber 和尚未完成任务的 fiber。

当前 fiber 和 work-in-progress 的 alternate 互为对方。

一个 fiber 的 alternate 是使用一个叫做`cloneFiber`的函数懒创建的(created lazily)。意思就是， 如果这个 fiber 的 alternate 存在，那么`cloneFiber`不会去创建一个新的对象，而是复用这个 fiber 的 alternate，从而最大程度地减少任务分配(allocations)。

我们应该把`alternate`字段当做一个实现细节(implementation detail)，但是它会在代码库了频繁的出现，因此我们有必要在这里探讨下。

##### `output`

###### _host component_ [就是我们所的原生标签，比如 div、span 等]

是指 React app 的叶子节点，在渲染环境中它们是精细的元素(比如浏览器 app 中的 div、span 等)。 在 JSX 中，它们是指用小写字母的标签。

概念上来说，一个 fiber 的`output`是指一个函数的返回值。

每一个 fiber 最后都是有`output`的，但是`output`只能在叶子节点被`host component`创建，然后被传递到树(tree)上。

`output`最终会到渲染器，然后 flush 变化到渲染环境。渲染器负责`output`的如何创建和更新。

### 未来章节

目前为止这是所有的内容，但是这篇文档尚未完成，未来的章节将会描述贯穿一个更新(update)的生命周期所用的算法。主题内容包含以下：

- 调度器如何找到下一个需要被执行的元任务。
- 优先级如何被追踪，以及如何在一棵 fiber 树传递。
- 调度器如何知道何时暂停任务、何时重新开始任务。
- 任务是怎么被 flush 的、任务完成的时候怎么被标记的。
- 副作用如何工作(比如说生命周期方法)。
- 协同程序(coroutine)是什么，当完成如 context 和 layout 这样特性的时候怎么使用协同程序。

### 相关视频

- [What's Next for React (ReactNext 2016)](https://youtu.be/aV1271hd9ew)

  [没有找到作者的’未来章节‘，可能作者工作太忙，暂时搁笔了，期待他的复出吧，在此之前，我们先寻求别的资源吧。]

## 回顾

[TOC]
