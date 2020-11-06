const baseUrl = '/api'
export default {
    
    getallcookinginfo: baseUrl + '/getallcookinginfo',//管理员获取所有菜谱信息接口
    postonecooking: baseUrl + '/postonecooking',//管理员添加菜谱接口
    deletecooking: baseUrl + '/deletecooking', //管理员删除菜谱接口
    getonecookinginfo: baseUrl + '/getonecookinginfo', //管理员获取需要编辑的菜谱的信息接口
    putonecookinginfo: baseUrl + '/putonecookinginfo', //管理员编辑菜谱接口
    
}