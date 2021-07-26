// https://wohugb.gitbooks.io/ecmascript-6/content/docs/class.html


/**
 * 其他页面import 使用
 * import utils from '@/includes/utils.js';
 * console.log(utils.getRandomInt(100))
 */
const utils = { 
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

}

export default utils