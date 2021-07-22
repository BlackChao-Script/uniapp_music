(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["component/video/gw-audiott/gw-audiott"],{"01f9":function(t,e,s){"use strict";s.r(e);var i=s("e9e5"),o=s.n(i);for(var n in i)"default"!==n&&function(t){s.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},"4ef5":function(t,e,s){},"71d7":function(t,e,s){"use strict";var i;s.d(e,"b",(function(){return o})),s.d(e,"c",(function(){return n})),s.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,s=(t._self._c,t.format(t.current)),i=t.format(t.duration);t._isMounted||(t.e0=function(e){t.status.seeking=!0,t.current=e.detail.value},t.e1=function(e){t.status.playing?t.pausePlay():t.play()}),t.$mp.data=Object.assign({},{$root:{m0:s,m1:i}})},n=[]},"7f8c":function(t,e,s){"use strict";var i=s("4ef5"),o=s.n(i);o.a},aa5b:function(t,e,s){"use strict";s.r(e);var i=s("71d7"),o=s("01f9");for(var n in o)"default"!==n&&function(t){s.d(e,t,(function(){return o[t]}))}(n);s("7f8c");var a,r=s("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"559c3fe4",null,!1,i["a"],a);e["default"]=u.exports},e9e5:function(t,e,s){"use strict";(function(t){function s(t){return a(t)||n(t)||o(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,e){if(t){if("string"===typeof t)return r(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);return"Object"===s&&t.constructor&&(s=t.constructor.name),"Map"===s||"Set"===s?Array.from(t):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?r(t,e):void 0}}function n(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function a(t){if(Array.isArray(t))return r(t)}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var s=0,i=new Array(e);s<e;s++)i[s]=t[s];return i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"gw-audiott",props:{src:String,startTime:{type:Number,default:0},showText:{type:Boolean,default:!1},rightRole:{type:String,require:!1},list:{type:Array,default:function(){return[]}},fields:{type:Object,default:function(){return{startTime:"startTime",endTime:"endTime",role:"role",text:"text"}}},autoplay:{type:Boolean,default:!1},color:{type:String,default:"#169af3"},debug:{type:Boolean,default:!1}},data:function(){return{isIOS:"",audio:null,current:0,duration:0,status:{playing:!1,seeking:!1,waiting:!1},textPanelHeight:0,textScrollTarget:null,textList:[],rightRoleName:"",textIndex:-1,searchText:"",showFoundWords:!1,searchReulst:{curRow:-1,rows:[]}}},methods:{calcTextPosition:function(){if(!this.status.seeking&&this.showText&&this.textList&&!(this.textList.length<=0)){var t=(new Date).getTime();if(!(this.duration-this.current>1&&this.lastCalcTime&&t-this.lastCalcTime<=300)){this.lastCalcTime=t;var e=parseInt((1e3*this.current).toFixed(0)),s=(parseInt((1e3*this.duration).toFixed(0)),this.textList.length),i=-1,o=-1;if(this.textIndex>-1)for(var n=this.textIndex;n<s;n++){var a=this.textList[n];if(e>=a.startTime&&e<=a.endTime){i=n;break}if(e<a.startTime&&e<a.endTime)break}if(i<0)for(var r=0;r<s;r++){var u=this.textList[r];if(e>=u.startTime&&e<=u.endTime){i=r;break}if(e<=u.startTime){o=r>0?r-1:r;break}}i<0&&o>-1&&(i=o),i>-1&&i!==this.textIndex&&(this.textScrollTarget="item"+i),i>-1&&(this.textIndex=i)}}},seek:function(t){t<=0&&(t=0),t>=this.duration&&(t=this.duration),this.debug&&console.log("调用Seek，当前audio状态="+this.audio.paused+",value="+t),this.status.afterseek=!0,this.status.seeking=!0,this.status.playing=!0,this.current=t,this.audio.paused?(this.status.afterseek=!0,this.status.waiting||this.play()):this.audio.pause()},play:function(){this.debug&&console.log("调用播放，当前audio状态="+this.audio.paused),this.status.playing=!0,this.audio.paused&&(this.isIOS,this.audio.play())},pausePlay:function(){this.debug&&console.log("调用暂停，当前audio状态="+this.audio.paused),this.status.playing=!1,this.audio.paused||(this.isIOS,this.audio.pause())},prev:function(){if(this.searchReulst.curRow<=0)return this.showFoundWords=!1,void(this.searchReulst={curRow:-1,rows:[]});if(this.searchReulst.rows.length<=0)return this.showFoundWords=!1,void(this.searchReulst={curRow:-1,rows:[]});var t=this.searchReulst.curRow-1;this.searchReulst.curRow=t,this.seek(this.textList[this.searchReulst.rows[t].row].startTime/1e3)},next:function(){if(this.searchReulst.curRow>=this.searchReulst.rows.length)return this.showFoundWords=!1,void(this.searchReulst={curRow:-1,rows:[]});if(this.searchReulst.rows.length<=0)return this.showFoundWords=!1,void(this.searchReulst={curRow:-1,rows:[]});var t=this.searchReulst.curRow+1;if(t>=this.searchReulst.rows.length)return this.showFoundWords=!1,void(this.searchReulst={curRow:-1,rows:[]});this.searchReulst.curRow=t,this.seek(this.textList[this.searchReulst.rows[t].row].startTime/1e3)},search:function(){var t=this;this.showFoundWords=!1;var e=[];if(this.textList.forEach((function(t){t.__FF__=[{value:[],indexList:[]}]})),!this.searchText)return this.searchReulst={curRow:-1,rows:[]};this.textList.forEach((function(i,o){if(i.text.includes(t.searchText)){var n=s(i.text.matchAll(new RegExp(t.searchText,"ig")));n.forEach((function(t){var e=t[0].length,s=t.index;t.index=[];for(var i=s;i<s+e;i++)t.index.push(i)}));var a=[];n.map((function(t){return t.index})).forEach((function(t){t.forEach((function(t){return a.push(t)}))})),e.push({row:o,value:n,indexList:a})}})),e.length>0?(this.showFoundWords=!0,this.searchReulst={curRow:-1,rows:e},this.next()):(this.showFoundWords=!1,this.searchReulst={curRow:-1,rows:[]}),console.log(e,"搜索结果"),this.textList.forEach((function(t,s){e.forEach((function(e){s==e.row&&(t.__FF__=e)}))}))},mappedFields:function(){var t=this;this.textScrollTarget=null,this.textList=[],this.textIndex=-1,this.searchText="",this.showFoundWords=!1,this.searchReulst={curRow:-1,rows:[]},this.rightRoleName=this.rightRole,this.showText&&(this.list.length<=0||(null==this.rightRoleName&&(this.rightRoleName=this.list[0][this.fields.role||"role"]||""),this.list.forEach((function(e){t.textList.push({startTime:parseInt(e[t.fields.startTime||"startTime"]||"0"),endTime:parseInt(e[t.fields.endTime||"endTime"]||"0"),role:e[t.fields.role||"role"]||"",text:e[t.fields.text||"text"]||""})}))))},init:function(){var e=this;this.audio&&this.audio.destroy(),this.resetStatus(),this.audio=t.createInnerAudioContext(),this.audio.obeyMuteSwitch=!1,this.audio.startTime=this.startTime,this.audio.autoplay=this.autoplay,this.duration=0,this.mappedFields(),this.audio.src=this.src,this.autoplay&&(this.status.playing=!0),this.audio.onTimeUpdate((function(){e.duration||(e.duration=e.audio.duration),e.status.seeking||(e.current=e.audio.currentTime,e.calcTextPosition(),e.$emit("current",e.current))})),this.audio.onPlay((function(){e.debug&&console.log("开始播放,当前播放器状态="+e.audio.paused),e.status.waiting=!1,e.status.seeking&&e.status.afterseek?(e.status.afterseek=!1,e.seek(e.current)):(e.status.seeking=!1,e.status.afterseek=!1)})),this.audio.onPause((function(){e.debug&&console.log("暂停播放,当前播放器状态="+e.audio.paused),e.status.seeking&&e.status.playing?e.audio.seek(e.current):(e.status.seeking=!1,e.status.afterseek=!1)})),this.audio.onStop((function(){e.debug&&console.log("停止播放,当前播放器状态="+e.audio.paused)})),this.audio.onWaiting((function(){e.debug&&console.log("等待音频数据,当前播放器状态="+e.audio.paused),e.status.waiting=!0,e.audio.paused||e.audio.pause()})),this.audio.onCanplay((function(){e.debug&&console.log("数据准备就绪,当前播放器状态="+e.audio.paused),e.status.waiting=!1,!e.status.playing||e.status.seeking||e.status.afterseek||e.play()})),this.audio.onSeeked((function(){e.status.seeking&&(e.debug&&console.log("Seeked,当前播放器状态="+e.audio.paused),e.status.seeking=!1,e.status.playing&&!e.status.waiting&&e.play())})),this.audio.onEnded((function(){e.debug&&console.log("播放结束,当前播放器状态="+e.audio.paused),e.resetStatus(),e.$emit("end")})),this.audio.onError((function(t){e.debug&&console.log("播放出错,当前播放器状态="+e.audio.paused),e.debug&&console.error(t),e.pausePlay(),e.resetStatus(),e.$emit("error",t)}))},resetStatus:function(){this.status.playing=!1,this.status.seeking=!1,this.status.waiting=!1,this.current=0},format:function(t){return"0".repeat(2-String(Math.floor(t/60)).length)+Math.floor(t/60)+":"+"0".repeat(2-String(Math.floor(t%60)).length)+Math.floor(t%60)}},created:function(){var e=this;t.getSystemInfo({success:function(t){e.isIOS=(t.system||"").startsWith("iOS")}}),this.init()},beforeDestroy:function(){this.audio.destroy()},watch:{src:function(t,e){this.init()},list:function(t,e){this.init()}},mounted:function(){if(this.showText){var e=this;this.$nextTick((function(){var s=t.createSelectorQuery().in(e);s.select(".recording-audio").boundingClientRect().exec((function(t){t&&s.select(".audio").boundingClientRect().exec((function(t){t&&s.select(".search_input").boundingClientRect().exec((function(t){t&&(e.textPanelHeight=t[0].height-t[1].height-t[2].height)}))}))}))}))}}};e.default=u}).call(this,s("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'component/video/gw-audiott/gw-audiott-create-component',
    {
        'component/video/gw-audiott/gw-audiott-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("aa5b"))
        })
    },
    [['component/video/gw-audiott/gw-audiott-create-component']]
]);
