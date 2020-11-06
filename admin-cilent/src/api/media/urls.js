const baseUrl = '/api'
export default {
    
    getallvideoinfo: baseUrl + '/getallvideoinfo',//管理员获取所有媒体信息接口
    postonemedia: baseUrl + '/postonemedia',//管理员添加媒体接口
    deletemedia: baseUrl + '/deletemedia', //管理员删除媒体接口
    getonemediainfo: baseUrl + '/getonemediainfo', //管理员获取需要编辑的媒体的信息接口
    putonemediainfo: baseUrl + '/putonemediainfo', //管理员编辑媒体接口
    
}