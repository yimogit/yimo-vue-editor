import YimoVueEditor from './Editor'
import E from './assets/js/wangEditor.js'

const instance = YimoVueEditor

const install = (Vue, globalOptions) => {
  let compName = instance.name
  if (globalOptions) {
    compName = globalOptions.name || compName
    instance.props.globalOptions.default = () => globalOptions
  }
  Vue.component(compName, instance)
}
instance.install = install
export default instance
export { E, instance, install }