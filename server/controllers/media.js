const mediaDao = require('../service/media_dao')
var moment = require('moment')


module.exports = {


    //管理员获取所有视频信息
    getallvideoinfo: async(ctx) => {
        const allvideoinfo = await mediaDao.getAllVideo();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allvideoinfo
        }
    },

    //管理员添加媒体
    postonemedia: async(ctx) => {
        const data = ctx.req.body
        const video = ctx.req.file; //接收媒体
        console.log(data);
        console.log(video);
        const msg = {};
        // 查询媒体Id是否已经存在过
        const media = await mediaDao.getVideoInfo(data.m_videoId)
        if (media == null) {
            msg.m_videoId = data.m_videoId;
            msg.m_title = data.m_title;
            msg.m_synopsis = data.m_synopsis;
            msg.m_date = moment().format('YYYY-MM-DD HH:mm:ss');
            msg.m_video = video.filename;
            msg.m_like = 0;
            msg.u_userId = data.u_userId;
            await mediaDao.createMedia(msg)

            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '添加成功'
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '该媒体ID已经存在,请勿重复添加!'
                }
            }

        }
    },

    //管理员删除媒体
    deletemedia: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const deletemedia = await mediaDao.delectMedia(msg);
        //console.log(deleteuser);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //管理员获取需要编辑的媒体的信息
    getonemediainfo: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        let onemediainfo = await mediaDao.getVideoInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '获取成功',
                onemediainfo: onemediainfo
            }
        }
    },

    //管理员编辑媒体信息
    putonemediainfo: async(ctx) => {  
        const msg = ctx.params.id;
        //console.log(msg);
        const info = ctx.request.body;
        let mediaInfo = {
            m_videoId: info.m_videoId, 
            m_title: info.m_title, 
            m_synopsis: info.m_synopsis, 
            m_date: moment().format('YYYY-MM-DD HH:mm:ss'), 
            m_video: info.m_video,
            m_like: info.m_like,
            u_userId: info.u_userId
        }
        //console.log(mediaInfo);
        let data = await mediaDao.updateOneMedia(mediaInfo,msg);
        console.log(data);
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '修改成功',
                }
            }
    },
 
}