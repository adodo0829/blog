# 前端怎样去设计一个项目
当我们接到一个项目需求, 单从前端的角度来思考, 我们需要做哪些事情呢?从哪些方面去考虑和架构一个项目? 这也是考验是否有独立完成项目的能力...我大概想到以下几个方面吧, 先写个目录, 以后有时间再进行扩展

1.项目技术预研(大局观能力考察)
  - 项目背景
  - 项目体量
  - 功能需求收集
  - 多端应用(web端:PC,H5, 客户端: APP, 桌面端: electron)
  
2.项目分析分解(流程架构图能力考察)
  - 基础层和业务层的模块划分
  - 业务按照页面page进行解耦
  - 基础层按UI组件化,功能(接口)模块化
  - 可分为数据、模块、模板、页面几种实体
  

3.项目技术选型(html,css,js应用能力考察)
    - 前后端分离模式
      数据接口(如果用 node 写后端接口, 可以考虑一个人完成整个项目)
    - 应用开发模式
      - 单页应用 SPA; 页面解耦,独立开发
      - 多页应用 MPA;
      - 服务端渲染应用 SSR;
    - 组件化管理: UI组件分解;
    - 兼容 && 适配: vw 和 媒体查询解决
        DPR: 像素比, 物理像素与逻辑像素px(缩放比例)
        分辨率: 1, 2, 3 倍屏

4.项目工具链体系(node应用能力考察)
  - 项目结构搭建
  - 项目规范管理
  - 项目编码设计
  - 项目打包构建
  - 项目模块测试
  - 项目工程部署
  - 项目持续集成
      脚手架搭建,自动化测试,部署,发布

5.项目性能优化(web体系能力考察)
  - 现状评估和建立指标
     页面加载性能
     动画与操作性能
     内存消耗
  - 技术方案
    1.静态资源优化(利用网络和缓存特性)
      缓存
      请求复用(DNS,HTTP2)
      减少请求数(文件打包压缩合并等)
      减小文件
      CDN
    2.动态运行时优化
      如何利用语言特性,框架特性,算法机制(空间内存和时间的取舍)
      客户端代码运行时优化
      交互优化
  - 执行
  - 结果评估和监控
    performance API
  
6.项目功能迭代和维护(工程管理能力考察)
  - 版本管理
  - 代码规范
  - 文档记录

7.项目监控(兜底防错能力考察)
  - 前端埋点
  - 异常上报