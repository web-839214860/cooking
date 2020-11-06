const { user, trend } = require('../modules/index')

trend.sync({ force: false }); 

class trendDao {

    //管理员获取所有动态信息
    static async getAllTrend() {
        return await trend.findAll({
            'order' :[
                ['t_date' , 'DESC'] //根据数据库的字段 t_date 降序排列 相当于数据库的 order by
            ],
            include:[{
                model: user
            }],
            where: {
                
            }
        })
    }

    //获取某一条动态信息
    static async getTrendInfo(t_id) {
        return await trend.findOne({
            include:[{
                model: user
            }],
            where: {
                t_id
            }
        })
    }

    //发布动态
    static async createTrend(msg) {  
        return await trend.create({

            t_id: msg.t_id,
            t_concent: msg.t_concent,
            t_image: msg.t_image,
            t_date: msg.t_date,
            u_userId: msg.u_userId

        })
    }

    //删除动态
    static async delectTrend(msg) {
        return await trend.destroy({
            where: {
                t_id: msg
            }
        })
    }
    
}

module.exports = trendDao
