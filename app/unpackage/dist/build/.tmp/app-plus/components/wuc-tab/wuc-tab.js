(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/wuc-tab/wuc-tab"],{1188:function(t,n,e){},2129:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"wuc-tab",data:function(){return{}},props:{tabList:{type:Array,default:function(){return[]}},tabCur:{type:Number,default:function(){return 0}},tabClass:{type:String,default:function(){return""}},tabStyle:{type:String,default:function(){return""}},textFlex:{type:Boolean,default:function(){return!1}},selectClass:{type:String,default:function(){return"text-blue"}}},methods:{tabSelect:function(t,n){if(this.currentTab===t)return!1;this.$emit("update:tabCur",t),this.$emit("change",t)}},computed:{scrollLeft:function(){return 60*(this.tabCur-1)}}};n.default=u},4703:function(t,n,e){"use strict";var u=e("1188"),r=e.n(u);r.a},"5e8f":function(t,n,e){"use strict";e.r(n);var u=e("6065"),r=e("c8f3");for(var a in r)"default"!==a&&function(t){e.d(n,t,function(){return r[t]})}(a);e("4703");var c=e("2877"),f=Object(c["a"])(r["default"],u["a"],u["b"],!1,null,null,null);n["default"]=f.exports},6065:function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return r})},c8f3:function(t,n,e){"use strict";e.r(n);var u=e("2129"),r=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);n["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wuc-tab/wuc-tab-create-component',
    {
        'components/wuc-tab/wuc-tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("5e8f"))
        })
    },
    [['components/wuc-tab/wuc-tab-create-component']]
]);                
