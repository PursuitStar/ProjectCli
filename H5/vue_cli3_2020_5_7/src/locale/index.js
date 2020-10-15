import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const langs = {};

// 引入所有语言
let importAllLangs = (requireContext) => {
    let langsKeys = requireContext.keys();
    langsKeys.forEach(ele => {
        let pathName = ele.substring(2);
        let moduleItem = require(`./lang/${pathName}`).default;
        langs[moduleItem.tag] = moduleItem.data;
    });
};

try {
    importAllLangs(require.context('./lang', true, /\.js$/));
} catch (error) {
    console.log(error);
}

console.log(langs)

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: localStorage.getItem('language') || 'zh',
    messages: langs,
})

export default i18n