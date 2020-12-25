## 使用建议
对于只在组件内部使用的数据，主要使用useState；
对于需要在父级和子级之间进行双向数据交换，则useReducer是一个更好的选择

如果 state 的类型为 Number, String, Boolean 建议使用 useState，如果 state 的类型 为 Object 或 Array，建议使用 useReducer
如果 state 变化非常多，也是建议使用 useReducer，集中管理 state 变化，便于维护
如果 state 关联变化，建议使用 useReducer
业务逻辑如果很复杂，也建议使用 useReducer
如果 state 只想用在 组件内部，建议使用 useState，如果想维护全局 state 建议使用 useReducer

组件生命周期: 异步数据useEffect中赋值渲染

useCallback应用场景: 函数定义时需要进行大量运算 || 需要比较引用的场景,避免多次渲染 || 配合Memo使用