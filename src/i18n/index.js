import VueI18n from 'vue-i18n'
import Vue from 'vue'
 
Vue.use(VueI18n)
 
const i18n = new VueI18n({
    locale: window.localStorage.getItem('language') === null ? 'en' : window.localStorage.getItem('language'), // 语言标识
    messages: {
        'cn': require('./lang/cn.js'),   // 中文语言包
        'en': require('./lang/en.js'),    // 英文语言包
    },
})
  
export default  i18n