import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Checkbox, NavBar, Col, Row, Toast, Tabbar, TabbarItem, CellGroup, Cell, PullRefresh, Dialog, Search, Uploader, SwipeCell, Icon, Tab, Tabs, Calendar, Swipe, SwipeItem, Empty } from 'vant';
import { Form, FormItem, Input, Select, Option } from 'element-ui';
import api from './api/install'
import '@/permission'
import moment from 'moment'
import F2 from '@antv/f2'
import factUrl from '@/store/facturl.js'


Vue.use(api)

Vue.use(Button).use(Checkbox).use(NavBar).use(Col).use(Row).use(Toast).use(Tabbar).use(TabbarItem).use(CellGroup).use(Cell).use(PullRefresh).use(Dialog).use(Search).use(Uploader).use(SwipeCell).use(Icon).use(Tab).use(Tabs).use(Calendar).use(Swipe).use(SwipeItem).use(Empty);
Vue.use(Form).use(FormItem).use(Input).use(Select).use(Option)

Vue.config.productionTip = false
Vue.prototype.$moment = moment;
Vue.prototype.$F2= F2;
Vue.prototype.$link = factUrl;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')