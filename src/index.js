import './common/styles/base.scss'

// base
import Accordion from './components/accordion'
import AccordionItem from './components/accordion-item'
import Button from './components/button'
import Cell from './components/cell'
import CellGroup from './components/cell-group'
import Loadmore from './components/loadmore'
import NoticeBar from './components/notice-bar'
import Popup from './components/popup'
import Stepper from './components/stepper'
import Steps from './components/steps'
import StepItem from './components/step-item'
import Swiper from './components/swiper'
import SwiperItem from './components/swiper-item'
import Tabpane from './components/tabpane'
import Tabs from './components/tabs'
import Tag from './components/tag'
import Rater from './components/rater'

// form
import Checkbox from './components/checkbox'
import CheckboxGroup from './components/checkbox-group'
import Field from './components/field'
import FieldGroup from './components/field-group'
import NumberKeyboard from './components/number-keyboard'
import Radio from './components/radio'
import RadioGroup from './components/radio-group'
import Switch from './components/switch'
import Uploader from './components/uploader'

// action
import Actionsheet from './components/actionsheet'
import DatePicker from './components/date-picker'
import Datetime from './components/datetime'
import Dialog from './components/dialog'
import Picker from './components/picker'
import Toast from './components/toast'

// business
import Agree from './components/agree'
import Area from './components/area'
import Carlicense from './components/carlicense'
import ChildinsuranceCell from './components/childinsurance-cell'
import ChooseCar from './components/choose-car'
import ChooseCity from './components/choose-city'
import Sendcode from './components/sendcode'
import SubmitBar from './components/submit-bar'
import Sign from './components/sign'

const components = [
  // base
  Accordion,
  AccordionItem,
  Button,
  Cell,
  CellGroup,
  Loadmore,
  NoticeBar,
  Popup,
  Stepper,
  Steps,
  StepItem,
  Swiper,
  SwiperItem,
  Tabpane,
  Tabs,
  Tag,
  Rater,

  // form
  Checkbox,
  CheckboxGroup,
  Field,
  FieldGroup,
  NumberKeyboard,
  Radio,
  RadioGroup,
  Switch,
  Uploader,

  // action
  Actionsheet,
  DatePicker,
  Picker,

  // business
  Agree,
  Area,
  Carlicense,
  ChildinsuranceCell,
  ChooseCar,
  ChooseCity,
  Sendcode,
  SubmitBar,
  Sign
]

const install = Vue => {
  if (!Vue || install.installed) return
  install.installed = true

  components.forEach(component => Vue.component(component.name, component))

  Vue.use(Toast)
  Vue.use(Dialog)
  Vue.use(Datetime)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  // base
  Accordion,
  AccordionItem,
  Button,
  Cell,
  CellGroup,
  Loadmore,
  NoticeBar,
  Popup,
  Stepper,
  Steps,
  StepItem,
  Swiper,
  SwiperItem,
  Tabpane,
  Tabs,
  Tag,
  Rater,

  // form
  Checkbox,
  CheckboxGroup,
  Field,
  FieldGroup,
  NumberKeyboard,
  Radio,
  RadioGroup,
  Switch,
  Uploader,

  // action
  Actionsheet,
  Dialog,
  DatePicker,
  Datetime,
  Picker,
  Toast,

  // business
  Agree,
  Area,
  Carlicense,
  ChildinsuranceCell,
  ChooseCar,
  ChooseCity,
  Sendcode,
  SubmitBar,
  Sign
}

export default {
  install
}
