import Vue from 'vue'
import ToastComponent from './toast.vue'

let instance = null
let isSingle = true

function createInstance (Vue, options) {
  if (isSingle) {
    if (!instance) {
      instance = new (Vue.extend(ToastComponent))().$mount(document.createElement('div'))
      document.body && document.body.appendChild(instance.$el)
    }
    margeInstanceOpts(options, instance)
  } else {
    const _instance = new (Vue.extend(ToastComponent))().$mount(document.createElement('div'))
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

function marge (data) {
  let options = {}
  data.forEach((d, i) => {
    i === 0 && (options.message = d)
    i === 1 && (options.duration = d)
    if (i === 2) {
      if (typeof d === 'string') {
        options.position = d
      } else if (d && Object.prototype.toString.call(d) === '[object Object]') {
        options = Object.assign({}, options, d)
      }
    }
  })
  return options
}

function addToastTypes (toast) {
  const types = ['text', 'success', 'error', 'warn', 'loading']
  types.forEach(type => {
    if (type === 'warn') {
      toast[type] = function (...option) {
        return toast.show({ iconSize: 24, ...marge(option), type })
      }
    } else if (type === 'loading') {
      toast[type] = function (...option) {
        return toast.show({ iconSize: 34, ...marge(option), type })
      }
    } else {
      toast[type] = function (...option) {
        return toast.show({ ...marge(option), type })
      }
    }
  })
}

const toast = {
  show (options = {}) {
    if (isSingle) {
      createInstance(Vue, options)
      instance.timeOut && clearTimeout(instance.timeOut)
      if (instance.duration !== -1) {
        instance.timeOut = setTimeout(() => {
          instance.visible = false
          instance.timeOut && clearTimeout(instance.timeOut)
        }, instance.duration)
      }
      instance.visible = true
    } else {
      let _instance = createInstance(Vue, options)
      if (_instance.duration !== -1) {
        _instance.timeOut = setTimeout(() => {
          _instance.visible = false
          _instance.timeOut && clearTimeout(_instance.timeOut)
          document.body.removeChild(_instance.$el)
        }, _instance.duration)
      }
      _instance.hide = function (callback) {
        _instance.visible = false
        typeof callback === 'function' && callback()
        document.removeChild(_instance.$el)
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
    initOptions.isInPrototype && (Vue.prototype.$toast = toast)
  }
}

addToastTypes(toast)

export default toast
