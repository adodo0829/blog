# 记一次 kong-gateway 转 nginx 踩坑
https://konghq.com/kong/
Kong是一款基于Nginx_Lua模块写的高可用网关API，通过前置的负载均衡配置把请求均匀地分发到各个Server，来应对大批量的网络请求。基于Nginx 特性，Kong本身也非常容易地扩展到多个服务器上; Kong网关支持同一机器下跑不同的子服务, 便于统一管理.

https://segmentfault.com/a/1190000022843318


## kong-gateway 配置

```shell
_format_version: "2.1"
_transform: false

services:
  - name: http2grpc-warehouse
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-warehouse-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/warehouse.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-warehouse-http
        paths:
          - /wes/warebasic/warehouse

  - name: http2grpc-container
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-container-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/container.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-container-http
        paths:
          - /wes/warebasic/container

  - name: http2grpc-webcontainer
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-web
        route: http2grpc-webcontainer-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/container.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-webcontainer-http
        paths:
          - /warebasic.ContainerService

  - name: http2grpc-webqueryFrWorkerPlan
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-web
        route: http2grpc-webqueryFrWorkerPlan-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/frWorkerPlan.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-webqueryFrWorkerPlan-http
        paths:
          - /warebasic.FrWorkerPlanService

  - name: http2grpc-webquerySelectorList
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-web
        route: http2grpc-webquerySelectorList-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/store.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-webquerySelectorList-http
        paths:
          - /warebasic.StoreService

  - name: http2grpc-region
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-region-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/region.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-region-http
        paths:
          - /wes/warebasic/region

  - name: http2grpc-routing
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-routing-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/routing.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-routing-http
        paths:
          - /wes/warebasic/routing

  - name: http2grpc-sku
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-sku-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/sku.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-sku-http
        paths:
          - /wes/warebasic/sku

  - name: http2grpc-station
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-station-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/station.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-station-http
        paths:
          - /wes/warebasic/station

  - name: http2grpc-webstation
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-web
        route: http2grpc-webstation-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/station.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-webstation-http
        paths:
          - /warebasic.StationService

  - name: http2grpc-stationGroup
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-stationGroup-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/stationGroup.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-stationGroup-http
        paths:
          - /wes/warebasic/stationGroup

  - name: http2grpc-stationWorkTime
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-stationWorkTime-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/stationWorkTime.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-stationWorkTime-http
        paths:
          - /wes/warebasic/stationWorkTime

  - name: http2grpc-storage
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-storage-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/storage.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-storage-http
        paths:
          - /wes/warebasic/storage

  - name: http2grpc-markCode
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-markCode-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/markCode.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-markCode-http
        paths:
          - /wes/warebasic/markCode

  - name: http2grpc-store
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-store-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/store.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-store-http
        paths:
          - /wes/warebasic/store

  - name: http2grpc-bizRule
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-bizRule-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/bizRule.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-bizRule-http
        paths:
          - /wes/warebasic/bizRule

  - name: http2grpc-dept
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-dept-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/dept.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-dept-http
        paths:
          - /wes/warebasic/dept

  - name: http2grpc-dataChange
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-dataChange-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/dataChange.proto
    routes:
      - name: http2grpc-dataChange-http
        paths:
          - /wes/warebasic/dataChange

  - name: http2grpc-frWorkerPlan
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-frWorkerPlan-http
        config:
          proto: /usr/local/kong/declarative/proto/warebasic/frWorkerPlan.proto
    routes:
      - name: http2grpc-frWorkerPlan-http
        paths:
          - /wes/warebasic/frWorkerPlan


  - name: http2grpc-picktask
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-picktask-http
        config:
          proto: /usr/local/kong/declarative/proto/warepeak/pickTask.proto
    routes:
      - name: http2grpc-picktask-http
        paths:
          - /wes/warepeak/pickTask

  - name: http2grpc-pieceCheck
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-pieceCheck-http
        config:
          proto: /usr/local/kong/declarative/proto/warepeak/pieceCheck.proto
    routes:
      - name: http2grpc-pieceCheck-http
        paths:
          - /wes/warepeak/pieceCheck

  - name: http2grpc-printTask
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-printTask-http
        config:
          proto: /usr/local/kong/declarative/proto/warepeak/printTask.proto
    routes:
      - name: http2grpc-printTask-http
        paths:
          - /wes/warepeak/printTask

  - name: http2grpc-warepeak-location
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-warepeak-location-http
        config:
          proto: /usr/local/kong/declarative/proto/warepeak/location.proto
    routes:
      - name: http2grpc-warepeak-location-http
        paths:
          - /wes/warepeak/location

  - name: http2grpc-inv-counting
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-inv-counting-http
        config:
          proto: /usr/local/kong/declarative/proto/invtransaction/CountingOrderApiServer.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-inv-counting-http
        paths:
          - /wes/invtransaction/counting

  - name: http2grpc-inv-inbound
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-inv-inbound-http
        config:
          proto: /usr/local/kong/declarative/proto/invtransaction/InboundOrderApiServer.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-inv-inbound-http
        paths:
          - /wes/invtransaction/inbound

  - name: http2grpc-inv-orderapi
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-inv-orderapi-http
        config:
          proto: /usr/local/kong/declarative/proto/invtransaction/OrderApiCommonServer.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-inv-orderapi-http
        paths:
          - /wes/invtransaction/orderapi


  - name: http2grpc-inv-outbound
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-inv-outbound-http
        config:
          proto: /usr/local/kong/declarative/proto/invtransaction/OutboundOrderApiServer.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-inv-outbound-http
        paths:
          - /wes/invtransaction/outbound

  - name: http2grpc-inv-transfer
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-inv-transfer-http
        config:
          proto: /usr/local/kong/declarative/proto/invtransaction/TransferOrderApiServer.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-inv-transfer-http
        paths:
          - /wes/invtransaction/transfer

  - name: http2grpc-inv-stockStatus
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-inv-stockStatus-http
        config:
          proto: /usr/local/kong/declarative/proto/invtransaction/StockStatusChangeApiServer.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-inv-stockStatus-http
        paths:
          - /wes/invtransaction/stockStatus

  - name: http2grpc-inv-workorder
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-inv-workorder-http
        config:
          proto: /usr/local/kong/declarative/proto/invtransaction/WorkOrderUpdateServer.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-inv-workorder-http
        paths:
          - /wes/invtransaction/workorder


  - name: http2grpc-forfrontend
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-forfrontend-http
        config:
          proto: /usr/local/kong/declarative/proto/frworkstation/forfrontend.proto
    routes:
      - name: http2grpc-forfrontend-http
        paths:
          - /wes/frworkstation/forfrontend

  - name: http2grpc-wareworkstation
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-wareworkstation-http
        config:
          proto: /usr/local/kong/declarative/proto/wareworkstation/exceptionStation.proto
    routes:
      - name: http2grpc-wareworkstation-http
        paths:
          - /wes/wareworkstation/exceptionStation

  - name: http2grpc-ws-processStation
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-ws-processStation-http
        config:
          proto: /usr/local/kong/declarative/proto/wareworkstation/processStation.proto
    routes:
      - name: http2grpc-ws-processStation-http
        paths:
          - /wes/wareworkstation/processStation

  - name: http2grpc-webwareworkQueryException
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-web
        route: http2grpc-webwareworkQueryException-http
        config:
          proto: /usr/local/kong/declarative/proto/wareworkstation/exceptionStation.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-webwareworkQueryException-http
        paths:
          - /wareworkstation.ExceptionStationService

  - name: http2grpc-warectu
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-warectu-http
        config:
          proto: /usr/local/kong/declarative/proto/warectu/warectu.proto
    routes:
      - name: http2grpc-warectu-http
        paths:
          - /wes/warectu/warectu

  - name: http2grpc-flipagvBoxMark
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-flipagvBoxMark-http
        config:
          proto: /usr/local/kong/declarative/proto/wareflipagv/boxMark.proto
    routes:
      - name: http2grpc-flipagvBoxMark-http
        paths:
          - /wes/wareflipagv/boxMark

  - name: http2grpc-assignmentdata
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-assignmentdata-http
        config:
          proto: /usr/local/kong/declarative/proto/assignmentdata/assignmentdata.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-assignmentdata-http
        paths:
          - /wes/assignmentdata/assignmentdata

  - name: http2grpc-webassignmentdata
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-web
        route: http2grpc-webassignmentdata-http
        config:
          proto: /usr/local/kong/declarative/proto/assignmentdata/assignmentdata.proto
      - name: wes_http_process
    routes:
      - name: http2grpc-webassignmentdata-http
        paths:
          - /assignmentdata.AssignmentDataService

  - name: http2grpc-mc-appointOut
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-mc-appointOut-http
        config:
          proto: /usr/local/kong/declarative/proto/mastercontrol/appointOut.proto
    routes:
      - name: http2grpc-mc-appointOut-http
        paths:
          - /wes/mastercontrol/appointOut

  - name: http2grpc-mc-location
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-mc-location-http
        config:
          proto: /usr/local/kong/declarative/proto/mastercontrol/LocationService.proto
    routes:
      - name: http2grpc-mc-location-http
        paths:
          - /wes/mastercontrol/location

  - name: http2grpc-mc-workPlan
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-mc-workPlan-http
        config:
          proto: /usr/local/kong/declarative/proto/mastercontrol/workPlan.proto
    routes:
      - name: http2grpc-mc-workPlan-http
        paths:
          - /wes/mastercontrol/workPlan

  - name: http2grpc-wareshuttle
    protocol: grpc
    host: 10.170.124.78
    port: 50051
    plugins:
      - name: grpc-gateway
        route: http2grpc-wareshuttle-http
        config:
          proto: /usr/local/kong/declarative/proto/wareshuttle/wareshuttle.proto
    routes:
      - name: http2grpc-wareshuttle-http
        paths:
          - /wes/wareshuttle/wareshuttle


  - name: proxy-assignmentdata
    url: http://10.170.124.78/assignmentdata/api
    routes:
      - name: proxy-assignmentdata
        paths:
          - /wes/assignmentdata/api


  - name: proxy-grpcweb-station-query
    url: http://10.170.124.78:8000/warebasic.StationService/QueryStationList
    routes:
      - name: proxy-grpcweb-station-query
        paths:
          - /wes/warebasic/station/queryStationList

  - name: proxy-grpcweb-container-query
    url: http://10.170.124.78:8000/warebasic.ContainerService/QueryContainerList
    routes:
      - name: proxy-grpcweb-container-query
        paths:
          - /wes/warebasic/container/queryContainerList

  - name: proxy-grpcweb-container-generate
    url: http://10.170.124.78:8000/warebasic.ContainerService/GenerateContainer
    routes:
      - name: proxy-grpcweb-container-generate
        paths:
          - /wes/warebasic/container/generateContainer

  - name: proxy-grpcweb-warebasic-queryFrWorkerPlan
    url: http://10.170.124.78:8000/warebasic.FrWorkerPlanService/QueryFrWorkerPlan
    routes:
      - name: proxy-grpcweb-warebasic-queryFrWorkerPlan
        paths:
          - /wes/warebasic/frWorkerPlan/queryFrWorkerPlan

  - name: proxy-grpcweb-warebasic-querySelectorList
    url: http://10.170.124.78:8000/warebasic.StoreService/QuerySelectorList
    routes:
      - name: proxy-grpcweb-warebasic-querySelectorList
        paths:
          - /wes/warebasic/store/querySelectorList

  - name: proxy-grpcweb-assignmentdata-byboxcode
    url: http://10.170.124.78:8000/assignmentdata.AssignmentDataService/GetAssignmentDataByBoxCode
    routes:
      - name: proxy-grpcweb-assignmentdata-byboxcode
        paths:
          - /wes/assignmentdata/assignmentdata/getAssignmentDataByBoxCode

  - name: proxy-grpcweb-getRelationsByContainerCode
    url: http://10.170.124.78:8000/assignmentdata.AssignmentDataService/GetRelationsByContainerCode
    routes:
      - name: proxy-grpcweb-getRelationsByContainerCode
        paths:
          - /wes/assignmentdata/assignmentdata/getRelationsByContainerCode

  - name: proxy-grpcweb-wareworkQueryException
    url: http://10.170.124.78:8000/wareworkstation.ExceptionStationService/QueryLabelException
    routes:
      - name: proxy-grpcweb-wareworkQueryException
        paths:
          - /wes/wareworkstation/exceptionStation/queryLabelException

  - name: proxy-invtransaction
    url: http://10.170.124.78/invtransaction/api
    routes:
      - name: proxy-invtransaction
        paths:
          - /wes/invtransaction/api

  - name: proxy-inboundreceive2
    url: http://10.170.124.78:8000/wes/invtransaction/inbound/receiveInboundOrderInfo
    plugins:
      - name: wes_http_process
    routes:
      - name: proxy-inboundreceive2
        paths:
          - /wes/invtransaction/inbound/receiveInboundOrderInfo2

  - name: proxy-wesReport
    url: http://10.170.124.78/wesreport/wes/wesReport
    routes:
      - name: proxy-wesReport
        paths:
          - /wes/wesReport

  - name: proxy-warectu
    url: http://10.170.124.78/warectu/api
    routes:
      - name: proxy-warectu
        paths:
          - /wes/warectu/api

  - name: proxy-frworkstation
    url: http://10.170.124.78/frworkstation/api
    routes:
      - name: proxy-frworkstation
        paths:
          - /wes/frworkstation/api

  - name: proxy-wareflipagv
    url: http://10.170.124.78/wareflipagv/api
    routes:
      - name: proxy-wareflipagv
        paths:
          - /wes/wareflipagv/api

  - name: proxy-receivingware
    url: http://10.170.124.78/receivingware/api
    routes:
      - name: proxy-receivingware
        paths:
          - /wes/receivingware/api

  - name: proxy-wareshuttle
    url: http://10.170.124.78/wareshuttle/api
    routes:
      - name: proxy-wareshuttle
        paths:
          - /wes/wareshuttle/api

  - name: proxy-websocket-forward
    url: http://10.170.124.78:8081/forward
    routes:
      - name: proxy-websocket-forward
        paths:
          - /wes/websocket/forward

  - name: proxy-websocket-push
    url: http://10.170.124.78:8080/push
    routes:
      - name: proxy-websocket-push
        paths:
          - /wes/websocket/push

consumers:
  - username: my-user
    keyauth_credentials:
      - key: my-key

```

## Nginx

- 转发脚本

```bash
server {
    listen 48000;
    server_name 10.122.112.50;
    location ^~ /sso/conf {
      alias /opt/www-sso/conf;
    }
    location /sso {
            alias /opt/www-sso/build;
    }
    location ^~ /www-station-fr/conf {
            alias /opt/www-station/conf;
    }
    location /www-station-fr {
            alias /opt/www-station/build;
    }
    location ^~ /www-dashboard-fr/conf {
            alias /opt/www-dashboard/conf;
    }
    location /www-dashboard-fr {
            alias /opt/www-dashboard/build;
    }
    location /ui-manager/proxy-wes {
            proxy_pass http://mcd-ui-manager-web-ui-manager-d-r-p:8080;
            proxy_http_version 1.1;
            add_header 'Access-Control-Allow-Origin' *;
            add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With';
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Scheme $scheme;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location ^~ /kong-gateway/ {
            proxy_http_version 1.1;
            proxy_pass http://10.122.112.50:48000/;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' always;
            add_header Access-Control-Allow-Headers 'reqid, nid, host, x-real-ip, x-forwarded-ip, event-type, event-id,accept,origin,X-RequestId,DNT,X-Mx-ReqToken,keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,accept,origin,X-RequestId' always;
            add_header Access-Control-Allow-Credentials 'true';
            proxy_redirect off;
            add_header Real-Server $upstream_addr;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /ui-sso/user {
            proxy_pass http://mcd-uisso-svc-svc-uisso-svc-d-r-p:8080/user;
            proxy_http_version 1.1;
            proxy_cookie_path  /ui-sso/user/info /user/info;
            add_header 'Access-Control-Allow-Origin' *;
            add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With';
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Scheme $scheme;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location ^~ /www-wms/conf {
            alias /opt/www-wms/conf;
    }
    location /www-wms {
            alias /opt/www-wms/build;
            index index.html;
    }
    location /passport {
            proxy_http_version 1.1;
            proxy_pass http://mcd-fr-wes-svc-fr-wes-d-r-p:8081/wes/passport;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' always;
            add_header Access-Control-Allow-Headers 'reqid, nid, host, x-real-ip, x-forwarded-ip, event-type, event-id,accept,origin,X-RequestId,DNT,X-Mx-ReqToken,keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,accept,origin,X-RequestId' always;
            add_header Access-Control-Allow-Credentials 'true';
            proxy_redirect off;
            add_header Real-Server $upstream_addr;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /privilege {
            proxy_http_version 1.1;
            proxy_pass http://mcd-fr-wes-svc-fr-wes-d-r-p:8081/wes/privilege;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS';
            add_header Access-Control-Allow-Headers 'reqid, nid, host, x-real-ip, x-forwarded-ip, event-type, event-id,accept,origin,X-RequestId,DNT,X-Mx-ReqToken,keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
            add_header Access-Control-Allow-Credentials 'true';
            add_header Real-Server $upstream_addr;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /wareflipagv {
            proxy_http_version 1.1;
            proxy_pass http://mcd-fr-wes-svc-fr-wes-d-r-p:8081/wes/wareflipagv;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS';
            add_header Access-Control-Allow-Headers 'reqid, nid, host, x-real-ip, x-forwarded-ip, event-type, event-id,accept,origin,X-RequestId,DNT,X-Mx-ReqToken,keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
            add_header Access-Control-Allow-Credentials 'true';
            add_header Real-Server $upstream_addr;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /wes {
            proxy_http_version 1.1;
            proxy_pass http://mcd-fr-wes-svc-fr-wes-d-r-p:8081;
            #add_header 'Access-Control-Allow-Origin' '$http_origin' always;
            add_header 'Access-Control-Allow-Origin' * always;
            add_header 'Access-Control-Allow-Methods' 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'reqid, nid, host, x-real-ip, x-forwarded-ip, event-type, event-id,accept,origin,X-RequestId,Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin,X-Requested-With,X-RequestId' always;
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            proxy_redirect off;
            add_header Real-Server $upstream_addr;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

```

- issue

```txt
# 1.Nginx rewrite 路径会更改请求Methods
# 2.代理版本默认1.0, 需要更改为proxy_http_version 1.1;
# 3.proxy_pass指定的是ip地址也会造成跨越, 用域名
# 4.Nginx作为web服务器, 支持对不同url进行转发, 具体规则看文档
```
