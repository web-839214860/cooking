import api from '../index'
import urls from './urls'
export default {

    postlogin(params) { //登录
        return api.post(urls.postlogin,params)
    },
    
    userinfo() { //用户信息
        return api.get(urls.userinfo)
    },

    getalladmininfo(){  //管理员获取所有高级管理员信息
        return api.get(urls.getalladmininfo)
    },

    getallcommoninfo(){  //管理员获取所有普通用户信息
        return api.get(urls.getallcommoninfo)
    },

    postoneuser(params){  //管理员添加用户
        return api.post(urls.postoneuser, params)
    },

    putpassword(params){ //修改密码
        params={
            u_userId:params.u_userId,
            old_password:params.oldpassword,
            new_password:params.newpassword
        }
        return api.put(urls.putpassword, params)
    },

    deleteuser(params) { //管理员删除用户
        params = {
            u_userId: params
        }
        return api.delete(urls.deleteuser + '/' + params.u_userId)
    },
    
    getoneuserinfo(params){ //管理员获取需要编辑的用户的信息
        params={
            u_userId: params
        }
        return api.get(urls.getoneuserinfo + '/' + params.u_userId)
    },

    putoneuserinfo(params,id){  //管理员编辑用户信息
        return api.put(urls.putoneuserinfo + '/' + id,params)
    },

}