# 戒烟助手 Chrome 插件

一个帮助您戒烟的 Chrome 浏览器插件，通过定时提醒和进度追踪来帮助您成功戒烟。

## 功能特点

- 每小时自动弹出提醒，询问是否吸烟
- 记录累计戒烟时间
- 显示距离21天戒烟目标的剩余时间
- 如果吸烟，记录吸烟数量并重置计时
- 提供鼓励和警示信息
- 支持重置所有记录

## 安装方法

1. 下载本项目所有文件到本地文件夹
2. 打开 Chrome 浏览器，在地址栏输入 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择包含插件文件的文件夹

## 使用说明

1. 插件安装后会在浏览器右上角显示图标
2. 每小时会自动弹出提醒，询问是否吸烟
3. 如果没有吸烟：
   - 累计戒烟时间增加
   - 显示鼓励信息
   - 更新剩余目标时间
4. 如果吸烟了：
   - 需要输入吸烟数量
   - 戒烟计时重置为0
   - 显示警示信息
5. 可以随时点击插件图标查看当前状态
6. 需要重新开始时可以使用重置功能

## 技术实现

- 使用 Chrome Extension Manifest V3
- 使用 Chrome Storage API 存储数据
- 使用 Chrome Alarms API 实现定时提醒
- 使用 Chrome Notifications API 发送通知

## 注意事项

- 请确保浏览器通知权限已开启
- 重置功能会清除所有历史记录
- 浏览器关闭不会影响计时
- 需要保持 Chrome 浏览器运行才能接收提醒

## 更新记录

### v1.0
- 初始版本发布
- 实现基本的戒烟提醒和记录功能

## 开发计划

- [ ] 添加数据统计图表
- [ ] 支持导出戒烟记录
- [ ] 添加更多激励性的提示信息
- [ ] 支持自定义提醒时间间隔

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个插件。

## 许可证

MIT License

## 作者

[Eric@空界计划]

## 致谢

感谢所有为戒烟努力的人们，愿我们都能成功戒烟，拥有健康的生活！