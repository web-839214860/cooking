import api from '../index'
import urls from './urls'
export default {

    getallvideoinfo(){  //获取所有媒体信息
        return api.get(urls.getallvideoinfo)
    },

}