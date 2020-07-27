# week3 review

## 个人

- 函数组件 props 定义

```tsx
// props: 接受的传值对象
const FC<IProps> = (props) => {
  const { prop1, prop2, prop3 = 'defaultValue' } = props
}
```

- websocket

```ts
import React from "react";

interface IProps {
  url: string;
  protocol?: string;
  onMessage?: (msg?: any) => void;
  onOpen?: () => void;
  onClose?: (code?: any, reason?: any) => void;
  onError?: (err?: any) => void;
  debug?: boolean;
  autoReconnect?: boolean;
  heartCheck?: boolean;
  reconnectInterval?: number;
}

class Websocket extends React.Component<IProps> {
  static defaultProps = {
    debug: false,
    autoReconnect: true,
    heartCheck: true,
  };

  readonly defaultConfig = {
    attempts: 1000, // 默认重连次数
    reconnectInterval: 5000, // 默认最终重连时常
    heartInterval: 3 * 1000, // 心跳检测时间间隔
    heartTimeout: 10 * 1000, // 心跳检测发送请求超时关闭ws
  };
  private heartTimer!: NodeJS.Timeout; // 心跳检测定时器
  private heartTimeOutTimer!: NodeJS.Timeout; // 心跳检测超时定时器
  private reconnectTimer!: NodeJS.Timeout; // 重连定时器
  private ws!: WebSocket;
  private attempts = 1; // 重连尝试次数
  private autoReconnect = false;

  componentDidMount() {
    this.autoReconnect = Boolean(this.props.autoReconnect);
    try {
      this.ws = new window.WebSocket(this.props.url, this.props.protocol);
      this.setupWebsocket();
    } catch (err) {
      console.warn("Websocket init error", err);
      this.reconnect();
    }
  }

  componentWillUnmount() {
    this.destory();
  }

  setupWebsocket() {
    const websocket = this.ws;

    websocket.onopen = () => {
      this.logging("Websocket connected");
      this.props.onOpen && this.props.onOpen();
      this.heartCheck();
    };

    websocket.onerror = (e) => {
      this.props.onError && this.props.onError(e);
    };

    websocket.onmessage = (evt) => {
      const msg = evt.data;
      if (msg.toLocaleLowerCase() === "pong") {
        this.heartTimer && clearTimeout(this.heartTimer);
        this.heartTimer = setTimeout(() => {
          this.heartCheck();
        }, this.defaultConfig.heartInterval);
      } else {
        let parseMsg = msg;
        try {
          parseMsg = JSON.parse(parseMsg);
        } catch (err) {}
        this.props.onMessage && this.props.onMessage(parseMsg);
      }
    };

    websocket.onclose = (evt) => {
      this.logging(
        `Websocket disconnected, the reason: ${evt.reason},the code: ${evt.code}`
      );
      this.props.onClose && this.props.onClose(evt.code, evt.reason);
      this.reconnect();
    };
  }

  // 销毁
  destory = () => {
    this.logging("Websocket Instance Destory");
    this.heartTimer && clearTimeout(this.heartTimer);
    this.heartTimeOutTimer && clearTimeout(this.heartTimeOutTimer);
    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.autoReconnect = false;
    this.ws.close();
  };

  // 心跳检测
  heartCheck() {
    if (!this.props.heartCheck) return;
    this.sendMessage("ping");
    this.heartTimeOutTimer && clearTimeout(this.heartTimeOutTimer);
    this.heartTimeOutTimer = setTimeout(() => {
      this.ws.close();
    }, this.defaultConfig.heartTimeout);
  }

  // 发送信息
  sendMessage = (message: any) => {
    if (this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(message);
  };

  // 重新连接
  reconnect = () => {
    if (!this.autoReconnect) return;
    let time = this.generateInterval(this.attempts);

    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      if (this.attempts++ > this.defaultConfig.attempts) return;
      this.logging(`Websocket reconnect times: ${this.attempts}`);
      this.ws = new window.WebSocket(this.props.url, this.props.protocol);
      this.setupWebsocket();
    }, time);
  };

  // 打印ws日志
  logging(log: string) {
    this.props.debug && console.log(log);
  }

  // 重连时间间隔
  generateInterval(k: number) {
    const { reconnectInterval } = this.props;
    if (reconnectInterval && reconnectInterval > 0) {
      return reconnectInterval;
    }
    return (
      Math.min(this.defaultConfig.reconnectInterval, Math.pow(2, k) - 1) * 1000
    );
  }

  render() {
    return null;
  }
}

export default Websocket;
```

## 团队

- table 组件, 支持 render 函数

```tsx
// table-layout实现按字段自适应宽度
// 通过匹配项传值, 在模版中进行判断匹配, 在jsx中调用函数进行渲染
export interface IColumns {
  title: string;
  dataIndex: string;
  className?: string;
  width?: number;
  render?: (v: any, obj?: object) => React.ReactNode;
}

<tbody>
  {dataList.length
    ? dataList.map((item, index) => {
        // 是否使用render, 添加其他属性如width, className等
        // 从columns中获取对应属性后再进行绑定
        // 支持render, TODO: 支持其他属性
        return (
          <tr key={index}>
            {Object.keys(item).map((key, i) => {
              return (
                <td key={`${key}_${i}`}>
                  {isRender(columns, key)
                    ? getKeyOfRender(columns, key, item)
                    : item[key] !== undefined
                    ? item[key]
                    : null}
                </td>
              );
            })}
          </tr>
        );
      })
    : null}
</tbody>;
```

## 业务
websocket中间层