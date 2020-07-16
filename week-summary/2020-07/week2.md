# ts相关
<http://semlinker.com/ts-keyof/#%E5%9B%9B%E3%80%81keyof-%E4%B8%8E-typeof-%E6%93%8D%E4%BD%9C%E7%AC%A6>

## keyof & typeof
```js
interface IPerson {
  name: string
  age: number
}

const person = {
  name: 'huhua',
  age: 26,
  job: 'fe'
}

// keyof 操作符, 操作对象是类型
// 用于获取某种类型的所有键，并返回键组成的联合类型
// 只对类型进行操作, 而不是对象
// 支持对 接口, 类, 基础类型的操作
type kp = keyof IPerson // "name" | "age"
// 常用场景就是取对象的某个键值
function getValueFromMap<T, K extends keyof T>(key: K, map: T) {
  return map[key]
}


// typeof 操作符, 操作对象是变量
// 用于获取我们所定义的变量的类型, 比如person变量
type p = typeof person

const num = 1
type n = typeof num
const num1: n = 1 // num1的类型必须是1

// typeof常用场景, 取到某变量对象的类型, 再通过keyof取其属性的类型
type personItem = keyof typeof person // 
```

## react hooks
一系列引入 react特性 的钩子函数(hook function)

### 使用hooks的规则:
- 1.函数组件 & 2.顶层顺序调用
```js
const Main: FC = () => {
  const [data, setData] = useState<ITableItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { default: res } = await import('../mock')
      setData(res.palletizeTaskList)
    }
    fetchData()
  }, [])

  return (
    <TableList tableData={data} />
  )
}
```
- 3.自定义hook调用
```js
import { useState, useEffect } from 'react'
import moment from 'moment'

type language = 'en' | 'zh-cn'

const DEAFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss' // 年月日 时分秒 24小时制

const useClock = (format = DEAFAULT_FORMAT, lang: language = 'en') => {
  const [time, setTime] = useState(Number(new Date()))

  if (lang === 'zh-cn') {
    moment.updateLocale('zh-cn', {
      // 添加中文自定义配置
      weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    })
  }

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime((p) => p + 1000)
    }, 1000)

    return () => {
      timerID && clearInterval(timerID)
    }
  }, [])

  return moment(time).format(format)
}
export default useClock
```
### useState
用来初始化UI组件所依赖的数据的状态

## 业务
```

```