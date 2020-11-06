import api from '../index'
import urls from './urls'
export default {

    getalltrendinfo(){  //获取所有动态信息
        return api.get(urls.getalltrendinfo)
    },

    getonetrendinfo(params){  //获取某一条动态信息
        params={
            t_id: params
        }
        return api.get(urls.getonetrendinfo + '/' + params.t_id)
    },

    postonetrend(params){  //发布动态
        return api.post(urls.postonetrend, params)
    },

    deletetrend(params) { //删除动态
        params = {
            t_id: params
        }
        return api.delete(urls.deletetrend + '/' + params.t_id)
    },

}