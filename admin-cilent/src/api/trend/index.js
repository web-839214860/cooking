import api from '../index'
import urls from './urls'
export default {

    getalltrendinfo(){  //管理员获取所有动态信息
        return api.get(urls.getalltrendinfo)
    },

    postonetrend(params){  //管理员发布动态
        return api.post(urls.postonetrend, params)
    },

    deletetrend(params) { //管理员删除动态
        params = {
            t_id: params
        }
        return api.delete(urls.deletetrend + '/' + params.t_id)
    },

}