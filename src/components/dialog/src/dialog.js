import Vue from 'vue'
import DialogComponent from './dialog.vue'

let instance = null
let isSingle = true

function createInstance (Vue, options) {
  if (isSingle) {
    if (!instance) {
      instance = new (Vue.extend(DialogComponent))().$mount(document.createElement('div'))
      document.body && document.body.appendChild(instance.$el)
    }
    margeInstanceOpts(options, instance)
  } else {
    const _instance = new (Vue.extend(DialogComponent))().$mount(document.createElement('div'))
    document.body && document.body.appendChild(_instance.$el)
    margeInstanceOpts(options, _instance)
    return _instance
  }
}

function margeInstanceOpts (options, instance) {
  const defaults = {}
  for (let i in instance.$options.props) {
    if (i !== 'value') {
      defaults[i] = instance.$options.props[i].default
    }
  }

  const opt = Object.assign({}, defaults, options)
  for (let key in opt) {
    instance[key] = opt[key]
  }
}

function addTypes (toast) {
  const types = ['alert', 'confirm']
  types.forEach(type => {
    toast[type] = function (option) {
      return toast.show(Object.assign({}, option, { type }))
    }
  })
}

const dialog = {
  show (options = {}) {
    if (isSingle) {
      createInstance(Vue, options)
      instance.visible = true
    } else {
      let _instance = createInstance(Vue, options)
      _instance.hide = function (callback) {
        _instance.visible = false
        typeof callback === 'function' && callback()
        document.body.removeChild(_instance.$el)
      }
      _instance.visible = true
      return _instance
    }
  },
  hide (callback) {
    instance && (instance.visible = false)
    typeof callback === 'function' && callback()
  },
  install (Vue, initOptions = { isMultiple: false, isInPrototype: true }) {
    isSingle = !initOptions.isMultiple
    initOptions.isInPrototype && (Vue.prototype.$dialog = dialog)
  }
}

addTypes(dialog)

export default dialog
