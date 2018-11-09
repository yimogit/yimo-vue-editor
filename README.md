# yimo-vue-editor

> 基于 wangeditor2.5.11 封装的 vue-editor 组件

## 修改项

- delete 地图菜单代码
- fix 跨域问题，withCredentials 设置无效

```js
//修改前 设置无效始终为true
xhr.withCredentials = editor.config.withCredentials || true
//修改后
xhr.withCredentials = !!editor.config.withCredentials
```

- fix 页面多个编辑器,上传图片总是会插入到最后一个编辑器的问题
- fix 上传多个图片插入顺序问题(现按名称排序)
- add 链接打开状态选择

## 需要注意的地方

- ie9 使用 form+iframe 上传，若上传接口 Url 及返回值需要去做处理
- ie9 不能跨域问题，可使用反向代理将接口域名统一
- 日志打印为全局参数，以最后一次设置为准