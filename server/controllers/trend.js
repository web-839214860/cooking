const trendDao = require('../service/trend_dao')
var moment = require('moment')


module.exports = {

    //管理员获取所有动态信息
    getalltrendinfo: async(ctx) => {
        const alltrendinfo = await trendDao.getAllTrend();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: alltrendinfo
        }
    },

    //获取某一条动态信息
    getonetrendinfo: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        let onetrendinfo = await trendDao.getTrendInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '获取成功',
                onetrendinfo: onetrendinfo
            }
        }
    },

    //管理员发布动态
    postonetrend: async(ctx) => {
        const data = ctx.req.body
        const image = ctx.req.file; //接收图片
        console.log(data);
        console.log(image);
        const msg = {};
        
        msg.t_id = data.t_id;
        if(data.t_concent !==''){
            msg.t_concent = data.t_concent;
        }else{
            msg.t_concent = null
        }
        if(image !==undefined){
            msg.t_image = image.filename;
        }else{
            msg.t_image = null
        }
        msg.t_date = moment().format('YYYY-MM-DD HH:mm:ss');
        msg.u_userId = data.u_userId;
        await trendDao.createTrend(msg)

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                 message: '动态发布成功'
            }
        }
    },

    //管理员删除动态
    deletetrend: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const deletetrend = await trendDao.delectTrend(msg);
        //console.log(deleteuser);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    }
 
}