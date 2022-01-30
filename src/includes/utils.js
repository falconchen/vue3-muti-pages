// https://wohugb.gitbooks.io/ecmascript-6/content/docs/class.html


/**
 * 其他页面import 使用
 * import utils from '@/includes/utils.js';
 * console.log(utils.getRandomInt(100))
 */
const utils = { 

    StringPrototypes() {

        String.prototype.escapeSpecialChars = function() {
            return this.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
        }

    },
    
    DatePrototypes() {
        /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，/';
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423f
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     * @param fmt 日期格式
     * @returns {void | string} 格式化后的日期字符串
     */
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1,                    //月份
                "d+": this.getDate(),                        //日
                "h+": this.getHours(),                       //小时
                "m+": this.getMinutes(),                      //分
                "s+": this.getSeconds(),                      //秒
                "q+": Math.floor((this.getMonth() + 3) / 3),  //季度
                "S": this.getMilliseconds()                   //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    },

    /**
     * 生成小于max的整型随机数
     * @param {Number} max 
     * @returns 
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    },
    // 不要缺少逗号

    /**
     * 提取动弹标签如：#新动弹计划# 
     * @param {String} strings 
     * @returns array
     */
    getTweetTopics(strings) {
        const re = /#([^#]*)#/g;
        const result = [...strings.matchAll(re)].map((item) => item[1].replace(/^\s|\s$/, ''));
        return result.filter((item) => item != false);
    },

    /**
     * 类似PHP的trim，与js的String.trim不一样，可以去除特定的字符
     * 如rtrim('https://example.com/','/')
     * 
     * @param {String} str 
     * @returns 
     */
    trim(str, chars) {
        return this.ltrim(this.rtrim(str, chars), chars);
    },
     
    ltrim(str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
    },
     
    rtrim(str, chars){
        chars = chars || "\\s";
        return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
    },

    /**
     * 当前timestamp，类似 php的time函数     
     */
    time() {
        return Date.parse(new Date())/1000;
    },

    

    /**
     * 合并对象的key和value到一个数组
     * @param object obj 
     * @returns 
     */
    combinObjectKV(obj) {
        let arr = []
        for (let [key,value] of Object.entries(obj)) {
            arr = [...arr,`${key}:${value}`]            
        }
        return arr;
    },

    /**
     * 判断变量是否是数组（Array）
     * @param Object obj
     * @returns 
     */
    isArray(obj){
        return Object.prototype.toString.call(obj)=='[object Array]';
    },
    
    /**
     * 对象克隆
     * @param Object obj 
     * @returns 
     */
    clone(obj){
        return JSON.parse(JSON.stringify(obj))
    },

    isEmpty(v) {
        switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
            break;
        case 'boolean':
            if (!v) return true;
            break;
        case 'number':
            if (0 === v || isNaN(v)) return true;
            break;
        case 'object':
            if (null === v || v.length === 0) return true;
            for (var i in v) {
                return false;
            }
            return true;
        }
        return false;
    },

    /**
     * 获取url查询参数
     * @param {String} name 
     * @returns string|null
     */
    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
     },

}

export default utils