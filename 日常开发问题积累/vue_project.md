# vue开发中遇到的问题

## keyup与blur 事件冲突
```
// vue 中
@blur.stop="handleInput(node, data)"
@keyup.enter.native="$event.target.blur"
```
## element upload组件 
- before-upload钩子返回false时自动调用before-remove on-remove钩子
```js
handleBeforeRemove(file: FileListItem, fileList: FileListItem[]) {
    let isConfirm: any = true
    if (file && file.status === 'success') {
      isConfirm = this['$confirm'](`确定移除 ${file.name}？`)
    }
    return isConfirm
  }
async handleRemove(file: FileListItem, fileList: FileListItem[]) {
    console.log(file)
    // 利用file.status进行判断
    if (file && file.status === 'success') {
      let url = file.url
      let domain = 'https://xxoo.com/'
      this.iconPathList.splice(this.iconPathList.indexOf(url), 1)
      this.fileList = fileList.splice(0)
      let res: any = await deletePicture({
        path: url.includes(domain) && url.split(domain)[1]
      })
      console.log(res)
      if (res.status.code === 0) {
        this['$message'].success('图片删除成功!')
      } else {
        this['$message'].error('图片删除失败!')
      }
    }
  }
```

## 组件库开发问题
问题: 改动了子组件中引用的父组件的变量，也就是props中的数据

在Vue2中组件props中的数据只能单向流动，即只能从父组件通过组件的DOM属性attribute传递props给子组件，子组件只能被动接收父组件传递过来的数据，并且在子组件中，不能修改由父组件传来的props数据

解决: 不要直接修改从父组件传过来的props数据，在data函数中重新定义一个变量，将props数据数据赋值在data变量上，后面修改data变量即可