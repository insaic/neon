const $ = {
  isMobile: phone => /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/.test(phone),
  isIdNo: ID => {
    if (typeof ID !== 'string') return false
    var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
    var d = new Date(birthday)
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
    var currentTime = new Date().getTime()
    var time = d.getTime()
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    var sum = 0
    var i
    var residue
    if (!/^\d{17}(\d|x)$/i.test(ID)) return false
    if (city[ID.substr(0, 2)] === undefined) return false
    if (time >= currentTime || birthday !== newBirthday) return false
    for (i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i]
    }
    residue = arrCh[sum % 11]
    if (residue !== ID.substr(17, 1)) return false
    return true
  },
  isPassport: num => /^[a-zA-Z0-9]{7,18}$/.test(num),
  isOrgCode: code => /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/.test(code) || /^[a-zA-Z0-9]{9}$/.test(code),
  isBussinessLicense: num => /^[A-Za-z0-9]{1,18}$/.test(num),
  isVin: code => /^[0-9A-Z]{17}$/.test(code),
  isEngineNo: code => /^[0-9a-zA-Z]+$/i.test(code),
  isEmail: mail => /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(mail)
}

export default {
  name: 'sq-input',

  bind (el, binding, vnode) {
    if (!binding.arg) {
      throw Error(`[v -sq-input]:unknow binding.arg`)
    }

    function getCertificateType (correlation) {
      let vm = vnode.context
      const correlationArr = correlation.split('.')
      correlationArr.forEach((item, index) => {
        (index !== correlationArr.length - 1) && vm[item] && (vm = vm[item])
      })
      return vm[correlationArr[correlationArr.length - 1]]
    }

    let nodeName = vnode.elm.nodeName.toLocaleUpperCase()
    let target = vnode.elm.lastElementChild
    let ptarget = vnode.elm

    while ((nodeName !== 'INPUT' || nodeName !== 'TEXTAREA') && target) {
      nodeName = target.nodeName.toLocaleUpperCase()
      ptarget = target
      target = target.lastElementChild
    }
    target = target || ptarget || el

    const attrs = vnode.data.attrs || {}
    const required = binding.modifiers.required

    switch (binding.arg) {
      case 'mobile':
        target.type = attrs.type || 'text'
        target.maxLength = attrs.maxLength || 11
        target.pattern = attrs.pattern || '[0-9]*'
        target.placeholder = attrs.placeholder || '请输入手机号码'

        target.onblur = () => {
          const value = String(target.value)
          if (required && !value) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入手机号码') : alert('请输入证件号码')
            return false
          }
          if (value && !$.isMobile(value)) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入正确的手机号码') : alert('请输入证件号码')
            return false
          }
          return true
        }
        break
      case 'idNo':
        const correlation = vnode.data.attrs.correlation

        if (!binding.expression) {
          throw Error(`[v-sq-input:idNo]:unknow binding.expression`)
        }
        if (!correlation) {
          throw Error(`[v-sq-input:idNo]:unknow attrs of correlation`)
        }
        target.type = attrs.type || 'text'
        target.maxLength = attrs.maxLength || 18
        target.placeholder = attrs.placeholder || '请输入证件号码'

        target.onblur = () => {
          const value = String(target.value)
          if (required && !value) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入证件号码') : alert('请输入证件号码')
            return false
          }
          if (correlation) {
            switch (getCertificateType(correlation)) {
              // 身份证
              case 'ID_CARD':
                if (value && !$.isIdNo(value)) {
                  vnode.context.$toast ? vnode.context.$toast.text('请输入正确的证件号码') : alert('请输入正确的证件号码')
                  return false
                }
                break
              // 护照
              case 'PASSPORT':
                if (value && !$.isPassport(value)) {
                  vnode.context.$toast ? vnode.context.$toast.text('请输入正确的证件号码') : alert('请输入正确的证件号码')
                  return false
                }
                break
              // 组织机构代码
              case 'ORG_CODE':
                if (value && !$.isOrgCode(value)) {
                  vnode.context.$toast ? vnode.context.$toast.text('请输入正确的证件号码') : alert('请输入正确的证件号码')
                  return false
                }
                break
              // 营业执照
              case 'BUSINESS_LICENSE':
                if (value && !$.isBussinessLicense(value)) {
                  vnode.context.$toast ? vnode.context.$toast.text('请输入正确的证件号码') : alert('请输入正确的证件号码')
                  return false
                }
                break
            }
          }
          return true
        }
        const throttle = (method, value) => {
          method.tId && clearTimeout(method.tId)
          method.tId = setTimeout(() => {
            method.apply(this, [value])
          }, 600)
        }
        const validateHandler = value => {
          let context = vnode.context
          const expression = binding.expression.split('.')
          expression.forEach((item, index) => {
            (index !== expression.length - 1) && context[item] && (context = context[item])
          })
          context[expression[expression.length - 1]] = value.replace(/[^0-9xX]/g, '').toLocaleUpperCase()
        }
        target.oninput = () => {
          getCertificateType(correlation) === 'ID_CARD' && throttle(validateHandler, String(target.value))
        }
        break
      case 'email':
        if (!binding.expression) {
          throw Error(`[v-sq-input:email]:unknow binding.expression`)
        }
        target.type = attrs.type || 'text'
        target.placeholder = attrs.placeholder || '请输入邮箱'

        target.onblur = () => {
          const value = String(target.value)
          if (required && !value) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入邮箱') : alert('请输入邮箱')
            return false
          }
          if (value && !$.isEmail(value)) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入正确的邮箱') : alert('请输入正确的邮箱')
            return false
          }
          return true
        }
        target.oninput = () => {
          let context = vnode.context
          const expression = binding.expression.split('.')
          expression.forEach((item, index) => {
            (index !== expression.length - 1) && context[item] && (context = context[item])
          })
          context[expression[expression.length - 1]] = String(target.value).replace(/[^a-zA-Z0-9@.-_]/g, '')
        }
        break
      case 'address':
        target.placeholder = attrs.placeholder || '请输入地址'
        target.maxLength = attrs.maxLength || 100

        target.onblur = () => {
          const value = String(target.value)
          if (required && !value) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入地址') : alert('请输入地址')
            return false
          }
          if (value && value.length < 5) {
            vnode.context.$toast ? vnode.context.$toast.text('地址为5到100个字符') : alert('地址为5到100个字符')
            return false
          }
          return true
        }
        break
      case 'vin':
        if (!binding.expression) {
          throw Error(`[v-sq-input:vin]:unknow binding.expression`)
        }
        target.type = attrs.type || 'text'
        target.maxLength = attrs.maxLength || 17
        target.placeholder = attrs.placeholder || '请输入车架号'

        target.onblur = () => {
          const value = String(target.value).replace(/[^a-zA-Z0-9]/g, '').toLocaleUpperCase()
          if (required && !value) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入车架号') : alert('请输入车架号')
            return false
          }
          if (value && !$.isVin(value)) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入正确的车架号') : alert('请输入正确的车架号')
            return false
          }
          return true
        }
        target.oninput = () => {
          let context = vnode.context
          const expression = binding.expression.split('.')
          expression.forEach((item, index) => {
            (index !== expression.length - 1) && context[item] && (context = context[item])
          })
          context[expression[expression.length - 1]] = String(target.value).replace(/[^a-zA-Z0-9]/g, '').toLocaleUpperCase()
        }
        break
      case 'engineNo':
        if (!binding.expression) {
          throw Error(`[v-sq-input:engineNo]:unknow binding.expression`)
        }
        target.type = attrs.type || 'text'
        target.maxLength = attrs.maxLength || 32
        target.placeholder = attrs.placeholder || '请输入发动机号'

        target.onblur = () => {
          const value = String(target.value).replace(/[^a-zA-Z0-9]/g, '').toLocaleUpperCase()
          if (required && !value) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入发动机号') : alert('请输入发动机号')
            return false
          }
          if (value && !$.isEngineNo(value)) {
            vnode.context.$toast ? vnode.context.$toast.text('请输入正确的发动机号') : alert('请输入正确的发动机号')
            return false
          }
          return true
        }
        target.oninput = () => {
          let context = vnode.context
          const expression = binding.expression.split('.')
          expression.forEach((item, index) => {
            (index !== expression.length - 1) && context[item] && (context = context[item])
          })
          context[expression[expression.length - 1]] = String(target.value).replace(/[^a-zA-Z0-9]/g, '').toLocaleUpperCase()
        }
        break
      default:
        target.onblur = () => {
          const value = String(target.value)
          const blurTip = vnode.data.attrs.blurTip
          if (required && !value) {
            vnode.context.$toast ? vnode.context.$toast.text(blurTip || '请填写内容') : alert('请填写内容')
            return false
          }
          return true
        }
        break
    }
  }
}
