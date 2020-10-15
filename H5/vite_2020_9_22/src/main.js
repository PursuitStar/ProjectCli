import {
  createApp,
} from 'vue';
import App from './App.vue';
import router from "./router";
import './router/intercept';
import vueDirectiveInit from './utils/directive';
import vueProvideInit from './store';
import './compatible';


const app = createApp(App)
app.use(router)
// app.mixin(/* ... */)
// app.component(/* ... */)
// app.directive( /* ... */ )
// app.provide( /* ... */ )

// 注册全局依赖
vueProvideInit(app)

// 注册自定义指令
vueDirectiveInit(app)

app.mount('#app')