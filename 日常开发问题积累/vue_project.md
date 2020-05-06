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