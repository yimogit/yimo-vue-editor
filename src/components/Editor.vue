<template>
  <div :id="editorId" class="yimo-vue-editor"></div>
</template>

<script>
import assign from 'object-assign'
import E from '../assets/wangEditor/wangEditor.js'
export default {
  props: {
    value: {
      type: String
    },
    config: {
      type: Object,
      default: null
    },
    uploadSuccessHandler: {
      type: Function,
      default: resTxt => {
        try {
          var res = JSON.parse(resTxt)
          if (res.status !== 1) {
            alert(res.msg)
            return null
          }
          return res.data.fileUrl
        } catch (ex) {
          // alert('上传错误')
          return null
        }
      }
    }
  },
  data() {
    return {
      editorId: null,
      currentValue: null,
      _currentEditor: null,
      hasInit: false //是否初始化
    }
  },
  watch: {
    value: {
      handler(val) {
        this.setContent(val)
      }
    },
    currentValue(val) {
      var html = val //xss等处理
      if (html !== this._currentEditor.$txt.html()) {
        this.$nextTick(() => {
          this._currentEditor &&
            this._currentEditor.$txt &&
            this._currentEditor.$txt.html(html)
        })
      }
    }
  },
  mounted() {
    this.editorId = 'editor_' + Date.now() + ~~(Math.random() * 1000)
    // console.log(this.editorId)
    this.setContent(this.value)
  },
  methods: {
    setContent(val) {
      var setValueFunc = () => {
        if (val !== this.currentValue) {
          this.currentValue = val
        }
      }
      //编辑器赋值
      if (!this.hasInit) {
        this.$nextTick(() => {
          this.renderEditor()
          setValueFunc()
        })
      } else {
        setValueFunc()
      }
    },
    asyncValue(html) {
      this.$emit('input', html)
    },
    renderEditor() {
      //渲染编辑器
      let _this = this
      if (_this.hasInit) {
        return console.log('编辑器已初始化')
      }
      var editor = new E(this.editorId)
      //日志配置
      // E.config.printLog = false
      _this.editorConfig(editor)
      _this.imageConfig(editor)
      // 合并配置
      assign(editor.config, _this.config)
      // console.log(editor.config)
      _this.hasInit = true
      editor.onchange = () => {
        var html = _this._currentEditor.$txt.html()
        _this.asyncValue(html)
      }
      editor.create()
      this._currentEditor = editor
    },
    editorConfig(editor) {
      //编辑器配置
      // 自定义菜单配置
      editor.config.menus = [
        'source',
        '|',
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'eraser',
        'forecolor',
        'bgcolor',
        '|',
        'quote',
        'fontfamily',
        'fontsize',
        'head',
        'unorderlist',
        'orderlist',
        'alignleft',
        'aligncenter',
        'alignright',
        '|',
        'link',
        'unlink',
        'table',
        // 'emotion',
        '|',
        'img',
        'video',
        'insertcode',
        '|',
        'undo',
        'redo',
        'fullscreen'
      ]
      editor.config.withCredentials = false
      editor.config.uploadImgFileName = 'file'
      editor.config.uploadImgUrl = '/mockserver/api/upload'
      editor.config.uploadParams = {}
      editor.config.uploadHeaders = {}
      editor.config.zindex = 100
      editor.config.pasteFilter = true
      editor.config.menuFixed = false
    },
    imageConfig: function(editor) {
      //编辑器上传图片配置
      let _this = this
      // 自定义load事件
      editor.config.uploadImgFns.onload = function(resultText, xhr, fileName) {
        window.__currentEditor = this
        var fileUrl = _this.uploadSuccessHandler(resultText)
        var $img = this.$txt.find('img[alt="uploading_' + fileName + '"]')
        if (fileUrl) {
          if ($img.length > 0) {
            $img.attr('src', fileUrl).removeAttr('alt')
            this.$txt.change()
          } else {
            this.command(null, 'insertHtml', '<img src="' + fileUrl + '"/>')
          }
        } else {
          uploadError.call(this, fileName, '上传失败')
        }
      }

      // 自定义timeout事件
      editor.config.uploadImgFns.ontimeout = function(xhr, fileName) {
        uploadError.call(this, fileName, '上传超时')
      }

      // 自定义error事件
      editor.config.uploadImgFns.onerror = function(xhr, fileName) {
        uploadError.call(this, fileName, '上传失败')
      }
      function uploadError(fileName, msg) {
        var $img = this.$txt.find('img[alt="uploading_' + fileName + '"]')
        $img.after(fileName + msg)
        $img.remove()
        this.$txt.change()
      }
    }
  }
}
</script>

<style>
.yimo-vue-editor {
  width: 100%;
  height: auto !important;
  min-height: 300px;
  /* max-height: 500px; */
}
</style>
