import api from '../index'
import urls from './urls'

export default {
    
    getallcookinginfo(){  //获取所有菜谱信息
        return api.get(urls.getallcookinginfo)
    },

    getonecookinginfo(params){ //获取单条菜谱的信息
        params={
            c_id: params
        }
        return api.get(urls.getonecookinginfo + '/' + params.c_id)
    },

}