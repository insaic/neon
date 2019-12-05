<template>
  <picker
    ref="picker"
    show-toolbar
    :columns="columns"
    :title="title"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    :format="format ? format : []"
    v-model="innerValue"
    @confirm="$_confirm"
    @cancel="$emit('cancel')"
    @on-change="$_change"
  />
</template>

<script>
// forked from https://github.com/youzan/vant/blob/dev/packages/datetime-picker/index.vue
import picker from '../../picker'

const currentYear = new Date().getFullYear()
const isCheckedDate = (value) => Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())
const fullTwo = num => `00${num}`.slice(-2)
const getMonthEndDay = (year, month) => 32 - new Date(year, month, 32).getDate()

export default {
  name: 'sq-date-picker',

  components: {
    picker
  },

  props: {
    value: {},
    type: {
      type: String,
      default: 'date'
    },
    format: {
      type: Array
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    title: {
      type: String,
      default: ''
    },
    minDate: {
      type: [Date, String],
      default: () => new Date(currentYear - 10, 0, 1, 0, 0)
    },
    maxDate: {
      type: [Date, String],
      default: () => new Date(currentYear + 10, 11, 31, 23, 59)
    },
    minHour: {
      type: Number,
      default: 0
    },
    maxHour: {
      type: Number,
      default: 23
    }
  },

  data () {
    return {
      innerValue: this.filterValue(this.value)
    }
  },

  watch: {
    value (val) {
      val = this.filterValue(val)
      const isEqual = this.type === 'time' ? val === this.innerValue : val.valueOf() === this.innerValue.valueOf()
      if (!isEqual) this.innerValue = val
    },
    innerValue: {
      handler (val) {
        this.updateColumnValue(val)
        this.$emit('input', val)
      }
    }
  },

  computed: {
    ranges () {
      if (this.type === 'time') {
        return [
          { type: 'hour', range: [this.minHour, this.maxHour] },
          { type: 'minute', range: [0, 59] }
        ]
      }
      const { _maxY, _maxD, _maxM, _maxH, _maxF } = this.getLimit('max', this.innerValue)
      const { _minY, _minD, _minM, _minH, _minF } = this.getLimit('min', this.innerValue)
      const isDatetimeType = this.type === 'datetime'
      const result = [
        { type: 'year', range: [_minY, _maxY] },
        { type: 'month', range: [_minM + 1, _maxM + 1] },
        { type: 'day', range: [_minD, _maxD] },
        {
          type: 'hour',
          range: isDatetimeType
            ? [Math.max(_minH, this.minHour), Math.min(_maxH, this.maxHour)]
            : [_minH, _maxH]
        },
        { type: 'minute', range: [_minF, _maxF] }
      ]
      if (this.type === 'date') result.splice(3, 2)
      if (this.type === 'year-month') result.splice(2, 3)
      return result
    },

    columns () {
      const results = this.ranges.map(({ type, range }) => {
        const values = this.times(range[1] - range[0] + 1, index => {
          let value = range[0] + index
          value = value < 10 ? `0${value}` : `${value}`
          return value
        })

        return values
      })
      return results
    }
  },

  methods: {
    $_confirm () {
      this.$emit('confirm', this.innerValue)
    },

    times (n, iteratee) {
      let index = -1
      const result = Array(n)
      while (++index < n) {
        result[index] = iteratee(index)
      }
      return result
    },

    filterValue (value) {
      const { type, minHour, maxHour, minDate } = this
      const isDateType = type !== 'time'

      if (isDateType && !isCheckedDate(value)) {
        // fix：兼容传入的值为string
        if (typeof minDate === 'string') {
          value = new Date(minDate.replace(/-/g, '/'))
        } else {
          value = minDate
        }
      } else if (!value) {
        value = fullTwo(value) + ':00'
      }
      if (!isDateType) {
        const [hour, minute] = value.split(':')
        let filterHour = Math.max(hour, minHour)
        filterHour = Math.min(filterHour, maxHour)
        filterHour = fullTwo(filterHour)

        return `${filterHour}:${minute}`
      }

      if (typeof value === 'string') {

      }
      const { _maxY, _maxD, _maxM, _maxH, _maxF } = this.getLimit('max', value)
      const { _minY, _minD, _minM, _minH, _minF } = this.getLimit('min', value)
      const _min = new Date(_minY, _minM, _minD, _minH, _minF)
      const _max = new Date(_maxY, _maxM, _maxD, _maxH, _maxF)
      value = Math.max(value, _min)
      value = Math.min(value, _max)

      return new Date(value)
    },

    getLimit (limitType, value) {
      let limitDate = this[`${limitType}Date`]

      // fix：插件形式传入maxDate或minDate的值为function
      if (typeof limitDate === 'function') {
        limitDate = limitDate()
      }

      // fix：兼容传入的maxDate或minDate值为string
      if (typeof limitDate === 'string') {
        limitDate = new Date(limitDate.replace(/-/g, '/'))
      }

      const year = limitDate.getFullYear()
      let [month, date, hour, minute] = [0, 1, 0, 0]

      if (limitType === 'max') {
        month = 11
        date = getMonthEndDay(value.getFullYear(), value.getMonth())
        hour = 23
        minute = 59
      }

      if (value.getFullYear() === year) {
        month = limitDate.getMonth()
        if (value.getMonth() === month) {
          date = limitDate.getDate()
          if (value.getDate() === date) {
            hour = limitDate.getHours()
            if (value.getHours() === hour) {
              minute = limitDate.getMinutes()
            }
          }
        }
      }

      return {
        [`_${limitType}Y`]: year,
        [`_${limitType}M`]: month,
        [`_${limitType}D`]: date,
        [`_${limitType}H`]: hour,
        [`_${limitType}F`]: minute
      }
    },

    updateColumnValue (value) {
      const { type } = this
      let values = []
      if (type === 'time') {
        const val = value.split(':')
        values = [val[0], val[1]]
      } else {
        values = [
          `${value.getFullYear()}`,
          `${fullTwo(value.getMonth() + 1)}`
        ]
        if (type.indexOf('date') > -1) {
          values.push(`${fullTwo(value.getDate())}`)
        }
        if (type === 'datetime') {
          values.push(`${fullTwo(value.getHours())}`)
          values.push(`${fullTwo(value.getMinutes())}`)
        }
      }

      this.$nextTick(() => {
        this.$refs.picker.setValues(values)
      })
    },

    getTrueValue (formattedValue) {
      if (!formattedValue) return
      while (isNaN(parseInt(formattedValue, 10))) {
        formattedValue = formattedValue.slice(1)
      }
      return parseInt(formattedValue, 10)
    },

    $_change (values, picker) {
      let value
      if (this.type === 'time') {
        value = values.join(':')
      } else {
        const year = this.getTrueValue(values[0])
        const month = this.getTrueValue(values[1])
        const maxDate = getMonthEndDay(year, month - 1)
        let date = this.getTrueValue(values[2])
        if (this.type === 'year-month') {
          date = 1
        }
        date = date > maxDate ? maxDate : date
        let hour = 0
        let minute = 0
        if (this.type === 'datetime') {
          hour = this.getTrueValue(values[3])
          minute = this.getTrueValue(values[4])
        }
        value = new Date(year, month - 1, date, hour, minute)
      }
      value = this.filterValue(value)
      this.innerValue = value
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.$emit('on-change', value)
        })
      })
    }
  },

  mounted () {
    this.updateColumnValue(this.innerValue)
  }
}
</script>

<style lang="scss">
</style>
