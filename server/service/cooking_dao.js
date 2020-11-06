const { user, stuff, cooking } = require('../modules/index')

cooking.sync({ force: false });

class cookingDao {

    //管理员获取某一条菜谱信息
    static async getCookingInfo(c_id) {
        return await cooking.findOne({
            include:[{
                model: stuff
            },{
                model: user
            }],
            where: {
                c_id
            }
        })
    }

    //管理员获取所有菜谱信息
    static async getAllCooking() {
        return await cooking.findAll({
            'order' :[
                ['c_date' , 'DESC'] //根据数据库的字段 d_date 降序排列 相当于数据库的 order by
            ],
            //raw: true    返回所有数据
            where: {
                
            },
            include:[{
                model: stuff
            },{
                model: user
            }],
        })
    }

    //删除菜谱信息
    static async delectCooking(msg) {
        return await cooking.destroy({
            where: {
                c_id: msg
            }
        })
    }

    //添加菜谱信息
    static async createCooking(msg) {  
        return await cooking.create({
            
            c_title: msg.c_title,
            c_synopsis: msg.c_synopsis,
            c_step: msg.c_step,
            c_image: msg.c_image,
            c_date: msg.c_date,
            s_id: msg.s_id,
            u_userId: msg.u_userId
                
        })
    }

    //编辑菜谱信息
    static async updateOneCooking(msg, id) {
        return await cooking.update({
            c_title: msg.c_title,
            c_synopsis: msg.c_synopsis,
            c_step: msg.c_step,
            c_image: msg.c_image,
            c_date: msg.c_date,
            s_id: msg.s_id,
            u_userId: msg.u_userId
        }, {
            where: {
                c_id: id
            }
        })
    }
    
}
    
module.exports = cookingDao