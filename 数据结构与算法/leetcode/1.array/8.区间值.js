// 连续区间, 输入是 1,2,3,5,7,8,10 输出要求是 1~3 5 7~8 10
  // 每个连续段的首尾值
  const arr = [1,2,3,5,7,8,10]

  const getContinuousRanges = (arr) => {
    let res = []
    let i = 0
    while (i < arr.length) {
      // 把每组区间用对象表示
      const range = {
        start: arr[i],
        // 如果arr[i]和arr[i+1]是连续的情况需要单独处理
        end: arr[i]
      }

      while (i < arr.length && arr[i+1] === arr[i] + 1) {
        range.end = arr[i+1]
        i++
      }

      res.push(range)
      i++
    }

    const resultStr = res.map(item => {
      return item.start === item.end ? item.start : `${item.start}~${item.end}`
    }).join(' ')

    console.log(resultStr);
  }

  getContinuousRanges(arr)