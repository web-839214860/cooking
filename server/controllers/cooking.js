const cookingDao = require('../service/cooking_dao')
const stuffDao = require('../service/stuff_dao')
var moment = require('moment')


module.exports = {

    //管理员获取所有菜谱信息
    getallcookinginfo: async(ctx) => {
        const allcookinginfo = await cookingDao.getAllCooking();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allcookinginfo
        }
    },

    //管理员添加菜谱信息
    postonecooking: async(ctx) => {
        const data = ctx.req.body
        const image = ctx.req.file; //接收图片
        console.log(data);
        console.log(image);

        const msg = {};
        msg.s_1 = data.s_1;
        msg.s_2 = data.s_2;
        msg.s_3 = data.s_3;
        msg.s_4 = data.s_4;
        msg.s_5 = data.s_5;
        msg.s_6 = data.s_6;
        const stuff = await stuffDao.createStuff(msg)
        console.log(stuff)

        const msg1 = {};
        msg1.c_title = data.c_title;
        msg1.c_synopsis = data.c_synopsis;
        msg1.c_step = data.c_step;
        msg1.c_image = image.filename;
        msg1.c_date = moment().format('YYYY-MM-DD HH:mm:ss');
        msg1.s_id = stuff.s_id;
        msg1.u_userId = data.u_userId;
        await cookingDao.createCooking(msg1)

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '添加成功'
            }
        }  
    },

    //管理员删除菜谱信息
    deletecooking: async(ctx) => {
        const msg = ctx.params.id;
        const msg1 = String( Number(ctx.params.id)+1 ); //数据库排列原因
        //console.log(msg);
        const deletestuff = await stuffDao.delectStuff(msg1);
        const deletecooking = await cookingDao.delectCooking(msg);
        //console.log(deletestuff);
        //console.log(deletecooking);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //管理员获取需要编辑的菜谱的信息
    getonecookinginfo: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        let onecookinginfo = await cookingDao.getCookingInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '获取成功',
                onecookinginfo: onecookinginfo
            }
        }
    },

    //管理员编辑菜谱信息
    putonecookinginfo: async(ctx) => {  
        const msg = ctx.params.id;
        const msg1 = String( Number(ctx.params.id)+1 ); //数据库排列原因
        //console.log(msg);
        //console.log(msg1);
        const info = ctx.request.body;

        let stuffInfo = {
            s_1: info.stuff.s_1, 
            s_2: info.stuff.s_2,
            s_3: info.stuff.s_3,
            s_4: info.stuff.s_4,
            s_5: info.stuff.s_5,
            s_6: info.stuff.s_6
        }

        let cookingInfo = {
            c_title: info.c_title, 
            c_synopsis: info.c_synopsis, 
            c_step: info.c_step, 
            c_date: moment().format('YYYY-MM-DD HH:mm:ss'), 
            u_userId: info.u_userId
        }

        //console.log(stuffInfo);
        //console.log(cookingInfo);
        let data = await stuffDao.updateOneStuff(stuffInfo,msg1);
        let data1 = await cookingDao.updateOneCooking(cookingInfo,msg);
        //console.log(data);
        //console.log(data1);
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '修改成功',
                }
            }
    }
 
}