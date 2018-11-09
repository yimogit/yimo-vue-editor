# yimo-vue-editor

> 基于 wangeditor2.5.11 封装的 vue-editor 组件  
> wangEditor 文档：https://www.kancloud.cn/wangfupeng/wangeditor2/113961   
> 演示地址: http://vue-editor.yimo.link/example/index.html

## 使用

`npm instal yimo-vue-editor --save`

```
<template>
  <yimo-vue-editor v-model="text></yimo-vue-editor>
</template>

import YimoVueEditor from 'yimo-vue-editor'
export default {
  components: {
    YimoVueEditor
  }
}
```

## 参数

- value
  v-model 绑定的值
- config
  wangEditor2.0 的 config 参数，[wangEditor 的文档](https://www.kancloud.cn/wangfupeng/wangeditor2/113975)
- uploadSuccessHandler
  对图片上传成功后返回值的处理，返回要插入的 url,默认返回如下 json 格式:`{status:1,msg:'',data:{}}`
  ```js
  var uploadSuccessHandler = resTxt => {
    try {
      var res = JSON.parse(resTxt)
      if (res.status !== 1) {
        alert(res.msg)
        return null
      }
      return res.data.fileUrl
    } catch (ex) {
      return null
    }
  }
  ```

## 修改项

- delete 地图菜单代码
- hide 标签菜单
- fix withCredentials 设置无效
- fix 页面多个编辑器时,上传图片总是会插入到最后一个编辑器的问题
- fix 上传多个图片插入顺序问题(添加标签占位后替换)
- add 链接打开状态选择

## 需要注意的地方

- ie9 上传图片，使用 form+iframe 上传，不能跨域，并且返回类型需是 text/html
- 日志打印为全局参数，以最后一次设置为准
