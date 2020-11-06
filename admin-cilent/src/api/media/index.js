import api from '../index'
import urls from './urls'
export default {

    getallvideoinfo(){  //管理员获取所有媒体信息
        return api.get(urls.getallvideoinfo)
    },

    postonemedia(params){  //管理员添加媒体
        return api.post(urls.postonemedia, params)
    },

    deletemedia(params) { //管理员删除媒体
        params = {
            m_videoId: params
        }
        return api.delete(urls.deletemedia + '/' + params.m_videoId)
    },
    
    getonemediainfo(params){ //管理员获取需要编辑的媒体的信息
        params={
            m_videoId: params
        }
        return api.get(urls.getonemediainfo + '/' + params.m_videoId)
    },

    putonemediainfo(params,id){  //管理员编辑媒体信息
        return api.put(urls.putonemediainfo + '/' + id,params)
    },

}