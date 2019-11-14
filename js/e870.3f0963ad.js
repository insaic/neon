(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["e870"],{e870:function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},e=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h3",{attrs:{id:"sq-input-%E6%8C%87%E4%BB%A4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sq-input-%E6%8C%87%E4%BB%A4","aria-hidden":"true"}},[t._v("#")]),t._v(" sq-input 指令")]),s("p",[t._v("在field组件里，有时我们需要对用户输入内容进行处理（如在输入邮箱时对不满足邮箱正则表达式的内容进行置空处理），这时，我们会对field组件绑定onInput事件，后在事件里编写逻辑代码，或者在field组件失去焦点时，提示用户需要输入内容，这系列操作的代码提取便形成了 "),s("code",[t._v("v-sq-input")]),t._v(" 指令，对 mobile、idNo、email、address、vin、engineNo 进行的对应的处理，默认情况下，指令包含了"),s("code",[t._v("required")]),t._v("下也会在输入框失去焦点时进行失焦提示")]),s("hr"),s("h3",{attrs:{id:"%E4%BD%BF%E7%94%A8"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#%E4%BD%BF%E7%94%A8","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用")]),s("hr"),s("h4",{attrs:{id:"%E6%B3%A8%E5%86%8C%E5%85%A8%E5%B1%80%E6%8C%87%E4%BB%A4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#%E6%B3%A8%E5%86%8C%E5%85%A8%E5%B1%80%E6%8C%87%E4%BB%A4","aria-hidden":"true"}},[t._v("#")]),t._v(" 注册全局指令")]),s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" sqInput "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v("'@insaic/neon/src/directives'")]),t._v("\n\nVue"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("use")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sqInput"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),s("h4",{attrs:{id:"%E6%B3%A8%E5%86%8C%E5%B1%80%E9%83%A8%E6%8C%87%E4%BB%A4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#%E6%B3%A8%E5%86%8C%E5%B1%80%E9%83%A8%E6%8C%87%E4%BB%A4","aria-hidden":"true"}},[t._v("#")]),t._v(" 注册局部指令")]),s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" sqInput "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v("'@insaic/neon/src/directives'")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  directives"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    sqInput\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),s("h4",{attrs:{id:"%E4%BE%8B%E5%AD%90-demo%E6%BA%90%E7%A0%81"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#%E4%BE%8B%E5%AD%90-demo%E6%BA%90%E7%A0%81","aria-hidden":"true"}},[t._v("#")]),t._v(" 例子 "),s("a",{attrs:{href:"https://github.com/insaic/neon/blob/dev/examples/routers/field.vue",target:"_blank"}},[t._v("demo源码")])]),s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 指令 arg 为 mobile 情况下 --\x3e")]),t._v("\n"),s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("sq-field")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("请输入手机号码"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("v-model")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("mpbile"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("hasBlurTip")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[s("span",{attrs:{class:"token namespace"}},[t._v("v-sq-input:")]),t._v("mobile.required")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n"),s("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 指令 arg 为 idNo 情况下 --\x3e")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 证件类型 证件号码 --\x3e")]),t._v("\n"),s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("sq-field")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("label")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("证件类型"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("请选择证件类型"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v(":value")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("insured.certificateType | config("),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("certificate"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(")"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("required")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("is-link")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("readonly")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("@click")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("clickCertificateType("),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("insured"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", "),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("isInsuredTeam"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(")"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("sq-field")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[s("span",{attrs:{class:"token namespace"}},[t._v("v-sq-input:")]),t._v("idNo.required")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("insured.certificateNo"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("correlation")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("insured.certificateType"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("label")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("证件号码"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("请输入证件号码"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("v-model")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("insured.certificateNo"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("required")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n"),s("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 指令 arg 为 email 情况下 --\x3e")]),t._v("\n"),s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("sq-field")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[s("span",{attrs:{class:"token namespace"}},[t._v("v-sq-input:")]),t._v("email")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("insured.email"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("label")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("邮箱"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("请输入邮箱"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("v-model")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("insured.email"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n"),s("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 指令 arg 为 address 情况下 --\x3e")]),t._v("\n"),s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("sq-address")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[s("span",{attrs:{class:"token namespace"}},[t._v("v-sq-input:")]),t._v("address.required")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("label")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("地址"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("地址长度为5-100个字符"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("v-model")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("insured.address"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("required")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n"),s("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 指令 arg 为 vin 情况下 --\x3e")]),t._v("\n"),s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("sq-field")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[s("span",{attrs:{class:"token namespace"}},[t._v("v-sq-input:")]),t._v("vin.required")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("result.vin"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("label")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("车架号"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("v-model")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("result.vin"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("请输入车架号"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("required")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n"),s("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 指令 arg 为 engineNo 情况下 --\x3e")]),t._v("\n"),s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("sq-field")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[s("span",{attrs:{class:"token namespace"}},[t._v("v-sq-input:")]),t._v("engineNo.required")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("result.engineNo"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("label")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("发动机号"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("v-model")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("result.engineNo"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("请输入发动机号"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("required")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])]),s("hr"),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("arg值")]),s("th",{staticStyle:{"text-align":"left"}},[t._v("说明")])])]),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("mobile")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("验证手机号码")])]),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("idNo")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("验证证件号码，需设置 "),s("code",[t._v("correlation")]),t._v(" 属性，其值为所对应的证件类型（"),s("code",[t._v("ID_CARD")]),t._v("、"),s("code",[t._v("PASSPORT")]),t._v("、"),s("code",[t._v("ORG_CODE")]),t._v("、"),s("code",[t._v("BUSINESS_LICENSE")]),t._v("）")])]),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("email")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("验证邮箱")])]),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("address")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("验证地址")])]),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("vin")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("验证车架号/vin码")])]),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("engineNo")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("验证发动机号码")])]),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("other")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("默认情况下，指令包含了"),s("code",[t._v("required")]),t._v("下也会在输入框失去焦点时进行失焦提示")])])])]),s("hr"),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("modifiers可选值")]),s("th",{staticStyle:{"text-align":"left"}},[t._v("说明")]),s("th",{staticStyle:{"text-align":"left"}},[t._v("默认值")]),s("th",{staticStyle:{"text-align":"left"}},[t._v("可选值")])])]),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("required")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("验证是否必填")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("–")]),s("td",{staticStyle:{"text-align":"left"}},[t._v("–")])])])]),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("注意")]),s("p",[t._v("指令arg参数为 "),s("code",[t._v("mobile")]),t._v("、"),s("code",[t._v("idNo")]),t._v("、"),s("code",[t._v("email")]),t._v(" 时需传入所对应的 "),s("code",[t._v("expression")])]),s("p",[t._v("在含v-sq-input代码块中 请勿使用v-if，用v-show代替，否则会引起bug")])])])}],c=s("2877"),r={},o=Object(c["a"])(r,n,e,!1,null,null,null);o.options.__file="sq-input.md";a["default"]=o.exports}}]);