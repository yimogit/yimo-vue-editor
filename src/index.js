import YimoVueEditor from './components/Editor'

const yimoVueEditor = {
  install: function(Vue) {
    Vue.component('YimoVueEditor', YimoVueEditor)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(yimoVueEditor)
}
export default YimoVueEditor
