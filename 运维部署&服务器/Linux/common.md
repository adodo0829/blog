# curl

## GET

curl https://www.example.com

1. -A 参数指定客户端的用户代理标头，即 User-Agent

```bash
curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com
```

2. -b 参数用来向服务器发送 Cookie

```bash
curl -b 'foo1=bar;foo2=bar2' https://google.com
```

3. -d 参数用于发送 POST 请求的数据体  
   使用-d 参数以后，HTTP 请求会自动加上标头 Content-Type : application/x-www-form-urlencoded

```bash
curl -d 'login=emma＆password=123' -X POST https://google.com/login
```

4. -X 参数指定 HTTP 请求的方法

5.curl post json 参数

```shell
curl --header "Content-Type: application/json" \             
  --request POST \
  --data '{"containerCode":"321312321","warehouseCode":"","regionCode":"PS","stationCode":"PS-Inbound-003","deviceCode":""}' \
  http://192.168.101.100:48000/ui-manager/proxy-wes/wareworkstation/processStation/queryCircularBoxUsable



curl -H "Content-Type: application/json" -X POST  -d '{"containerCode":"321312321","warehouseCode":"","regionCode":"PS","stationCode":"PS-Inbound-003","deviceCode":""}'   http://192.168.101.100:48000/ui-manager/proxy-wes/wareworkstation/processStation/queryCircularBoxUsable
```
