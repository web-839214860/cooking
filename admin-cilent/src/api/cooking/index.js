import api from '../index'
import urls from './urls'

export default {
    
    getallcookinginfo(){  //管理员获取所有菜谱信息
        return api.get(urls.getallcookinginfo)
    },

    postonecooking(params){  //管理员添加菜谱信息
        return api.post(urls.postonecooking, params)
    },

    deletecooking(params) { //管理员删除菜谱
        params = {
            c_id: params
        }
        return api.delete(urls.deletecooking + '/' + params.c_id)
    },
    
    getonecookinginfo(params){ //管理员获取需要编辑的菜谱的信息
        params={
            c_id: params
        }
        return api.get(urls.getonecookinginfo + '/' + params.c_id)
    },

    putonecookinginfo(params,id){  //管理员编辑菜谱信息
        return api.put(urls.putonecookinginfo + '/' + id,params)
    },

}