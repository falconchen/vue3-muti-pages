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
     * 处理API响应的错误消息
     * 
     * @param Object res 
     */
    apiErrorMsg(res) {
        
        let errorArr = []
        switch (typeof res.error) {
            case  'string':
                errorArr = [res.error];
                break;
            case  'object':                
                errorArr = this.isArray(res.error)  
                            ? res.error 
                            : this.combinObjectKV(res.error);
                break;
            default:
                return `${res.message}`;
        }        
        return `${res.message} ${errorArr.join("; ")}`;
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

}

export default utils