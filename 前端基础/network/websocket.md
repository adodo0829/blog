```
const socketUrl = 'ws://xxxx'
const connCfg = {
  pingInterval: 30,
  sendTimeout: 3,
  socket: ''
}

export default function () {
  class Socket {
    constructor () {
      this.conn = null
      this.connCfg = null
      this.heartbeat = null
      this.lastUserId = null
      this.msgCallback = {}
      this.lastPongTime = Date.now()
    }

    // 打开连接
    open (userId, connCfg) {
      // 防止出现多个 websocket 实例
      if (this.conn && this.conn.readyState <= 1) {
        if (userId === this.lastUserId) return
        this.conn.close()
      }

      const dsn = `${socketUrl}/connect/customer?uid=${userId}&agent=browser`
      const conn = new WebSocket(dsn)

      this.conn = conn
      this.connCfg = connCfg
      this.lastUserId = userId
      this.lastPongTime = Date.now()

      conn.onopen = this.onOpen.bind(this)
      conn.onmessage = this.onMsg.bind(this)
      conn.onerror = this.onErr.bind(this)
      conn.onclose = this.onClose.bind(this)
    }

    // 再次打开连接用于实现心跳机制
    reOpen () {
      const userId = this.lastUserId
      this.lastUserId = null

      this.open(userId, this.connCfg)
    }

    // 关闭连接
    close () {
      if (this.conn && this.conn.readyState <= 1) {
        this.conn.close()
      }
    }

    // 接收消息
    onMsg (e) {
      this.lastPongTime = Date.now()
      if (e.data === '1') return

      let msg = JSON.parse(e.data)
      let key = `${msg.Header.Event}-${msg.Header.ID}`

      // console.log(msg)

      EventBus.$emit('socket/receive', msg)

      // 消息发送成功
      if (msg.Header.Event === 'chat.callback') this.msgCallback[key] = true
    }

    // 连接成功
    onOpen () {
      // 心跳机制
      this.heartbeat = setInterval(() => {
        this.conn && this.conn.readyState === 1 && this.conn.send('0')

        if (Date.now() - this.lastPongTime > 4000 * this.connCfg.pingInterval) {
          console.log(
            '%c%s',
            'color:yellow;',
            '=============websocket正在尝试重新连接============='
          )
          Notification({
            type: 'error',
            message: '聊天室正在尝试重新连接',
            position: 'bottom-right',
            duration: 1500
          })
          clearInterval(this.heartbeat)
          this.conn && this.reOpen()
        }
      }, 1000 * this.connCfg.pingInterval)

      console.log(
        '%c%s',
        'color:blue;',
        '=============websocket连接成功=========='
      )
      Notification({
        type: 'success',
        message: '聊天室连接成功',
        position: 'bottom-right',
        duration: 1500
      })
    }

    // 发送消息
    sendMsg (opt) {
      // 唯一消息标识
      let id = this.createMsgID()
      let msg = {
        Header: {
          ID: id,
          Event: 'chat.send',
          Ack: true
        },
        Body: opt
      }

      let key = `chat.callback-${msg.Header.ID}`

      setTimeout(() => {
        if (this.msgCallback[key] === undefined) {
          console.log('===========发送消息失败==========')
          Notification({
            type: 'error',
            message: '发送消息失败',
            position: 'bottom-right',
            duration: 1500
          })
          this.reOpen()
        }
      }, 1000 * this.connCfg.sendTimeout)

      this.conn.send(JSON.stringify(msg))
    }

    // 消息已读
    readMsg (opt) {
      // 唯一消息标识
      let id = this.createMsgID()
      let msg = {
        Header: {
          ID: id,
          Event: 'chat.read',
          Ack: true
        },
        Body: {
          chatWith: opt.receiver
        }
      }

      let key = `chat.callback-${msg.Header.ID}`

      setTimeout(() => {
        if (this.msgCallback[key] === undefined) {
          console.log('===========发送消息失败==========')
          this.reOpen()
        }
      }, 1000 * this.connCfg.sendTimeout)

      this.conn.send(JSON.stringify(msg))
    }

    // 创建唯一消息标识
    createMsgID () {
      return Date.now() + '' + Math.floor(1000 * Math.random()).toFixed(0)
    }

    // 监听关闭
    onClose () {
      console.log(
        '%c%s',
        'color:red;',
        '=============websocket已断开连接============='
      )
    }

    // TODO: 错误处理
    onErr () {}
  }

  const socket = new Socket()

  EventBus.$on('socket/send-msg', opt => {
    socket.sendMsg(opt)
  })

  EventBus.$on('socket/read', opt => {
    socket.readMsg(opt)
  })

  EventBus.$on('socket/connet', () => {
    const userId = JSON.parse(window.localStorage.getItem('userInfo'))
      .customerServiceUid
    userId && socket.open(userId, connCfg)
  });
  ['at', 'support', 'reply', 'chat', 'system'].forEach(type => {
    EventBus.$on('socket/on' + type, msg => {
      EventBus.$emit('socket/notice', type, msg)
    })
  })
}

```