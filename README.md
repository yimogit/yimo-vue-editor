# yimo-vue-editor

演示地址: http://vue-editor.yimo.link/example/html/index.html

> 基于 wangeditor2.5.11 封装的 vue-editor 组件  
> wangEditor 文档：https://www.kancloud.cn/wangfupeng/wangeditor2/113961

## vue 项目中使用

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

## 全局引入并配置

``` js
import VEditor from 'yimo-vue-editor'

Vue.use(VEditor, {
  name: 'v-editor-app',//自定义名称
  config: {},//wagnEditor 配置
  uploadHandler: (type, resTxt) => {//上传处理钩子
    if (type === 'success') {
      var res = JSON.parse(resTxt)//不处理默认认为返回值位图片路径
      if (res.status !== 1) {
        return null
      }
      return res.data
    } else if (type === 'error') {
      //todo toast
    } else if (type === 'timeout') {
      //todo toast
    }
    return '上传失败__'
  }
})
```

## 参数

- value
  v-model 绑定编辑器值
- config
  wangEditor2.0 的 config 参数，[wangEditor 的文档](https://www.kancloud.cn/wangfupeng/wangeditor2/113975)
- uploadHandler
  对图片上传后返回值的处理，成功返回要插入的 url，失败返回错误提示或者在钩子中进行提示等操作
  ```js
  var uuploadHandler = (type, resTxt) => {
    if (type === 'success') {
      var res = JSON.parse(resTxt)
      if (res.status !== 1) {
        return null
      }
      return res.data.fileUrl
    } else if (type === 'error') {
      //todo toast
    } else if (type === 'timeout') {
      //todo toast
    }
    return '上传失败'
  }
  ```

## 修改项

- delete 地图菜单代码
- hide 表情菜单
- fix withCredentials 设置无效
- fix 上传多个图片插入顺序问题(添加标签占位后替换)
- add 链接打开状态选择
- add 上传之后的钩子



## 需要注意的地方

- ie9 上传图片，使用 form+iframe 上传，不能跨域，并且返回类型需是 text/html
- 日志打印为全局参数，以最后一次设置为准
