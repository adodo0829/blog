# week2

## antd form
状态 与 操作分离

值: value
操作: function

## 父子组件传值

#### 父 => 子
```tsx
// props: data, function
<Child data={data} onDo={handleFunc}>

interface IProps {
  data: object
  onDo: () => void
}

const Child: FC<IProps> = (props) => {

  const { data, onDo } = props

  return (
    <div onClick={onDo}>
      { data.title }
    </div>
  )
}
```

#### 子 => 父
子组件调用父组件传递的函数, 把参数传递出去;

```tsx
// child
interface IProps {
  data: object
  onDo?: (s: string) => void
}

const Child: FC<IProps> = (props) => {
  const { data, onDo } = props
  return (
    <div onClick={() => {
      if (onDo) onDo('hello')
    }}>
      { data.title }
    </div>
  )
}

// parent
<Child data={data} onDo={(s) => console.log(s)}>
```


