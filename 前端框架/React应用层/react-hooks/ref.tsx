import React, { FC , useRef, useState, useEffect} from "react";

// https://overreacted.io/zh-hans/making-setinterval-declarative-with-react-hooks/
const Index: FC = () => {

  const [count, setCount] = useState(0)
  const [data, setData] = useState([0])
  // React 中的 DOM refs）。Hooks 使用相同的概念来保存任意可变值。
  // ref 就像一个「盒子」，你可以放任何东西
  // useRef() 返回一个有带有 current 可变属性的普通对象在 renders 间共享
  const saveData = useRef<any>()

  useEffect(() => {
    setData([...data, count])
  }, [count])

  console.log('count:', count);

  return (
    <div>
      <p>{ count }</p>
      <button onClick={() => {  }}>点我啊+1</button>
      <button onClick={() => {
        setCount(count+1); saveData.current = count + 1
        console.log(data, count, saveData)
      }}>getData</button>
    </div>
  )
};
export default Index;
