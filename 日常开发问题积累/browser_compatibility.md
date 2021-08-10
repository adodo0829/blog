# 问题记录

- 日常跨域header问题
```txt
// 当前端配置withCredentials=true时, 后端配置Access-Control-Allow-Origin不能为*, 必须是相应地址
// 当配置withCredentials=true时, 后端需配置Access-Control-Allow-Credentials

// 当前端配置自定义请求头时, 后端需要配置Access-Control-Allow-Headers为对应的请求头集合
```