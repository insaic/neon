webpackJsonp([33],{JDfT:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={name:"",data:function(){return{isAgree1:!0,isAgree2:!1}},methods:{click:function(){alert("click")}}},r={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"demo-page-wrap"},[t("demo-title",[e._v("基础用法")]),e._v(" "),t("sq-agree",{model:{value:e.isAgree1,callback:function(n){e.isAgree1=n},expression:"isAgree1"}},[e._v("我已阅读并接受"),t("a",{on:{click:function(n){return n.stopPropagation(),e.click(n)}}},[e._v("《保险须知》")]),e._v("中的条例")]),e._v(" "),t("demo-title",[e._v("多行文字")]),e._v(" "),t("sq-agree",{model:{value:e.isAgree2,callback:function(n){e.isAgree2=n},expression:"isAgree2"}},[e._v("\n    我已阅读并接受"),t("a",{on:{click:function(n){return n.stopPropagation(),e.click(n)}}},[e._v("《客户告知书》《保单条款》《产品详情》")]),e._v("中的条例\n  ")])],1)},staticRenderFns:[]},c=t("VU/8")(i,r,!1,null,null,null);n.default=c.exports}});