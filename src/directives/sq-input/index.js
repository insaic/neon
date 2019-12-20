import sqInput from './src/index.js'

sqInput.install = function (Vue) {
  Vue.directive(sqInput.name, sqInput)
}

export default sqInput
