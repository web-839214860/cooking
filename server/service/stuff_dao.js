const { stuff } = require('../modules/index')

stuff.sync({ force: false }); 

class stuffDao {

    //获取某一条菜谱原料
    static async getStuffInfo(s_id) {
        return await stuff.findOne({
            where: {
                s_id
            }
        })
    }

    //添加菜谱原料
    static async createStuff(msg) {  
        return await stuff.create({ 
            
            s_1: msg.s_1,
            s_2: msg.s_2,
            s_3: msg.s_3,
            s_4: msg.s_4,
            s_5: msg.s_5,
            s_6: msg.s_6

        })
    }

    //删除菜谱原料
    static async delectStuff(msg) {
        return await stuff.destroy({
            where: {
                s_id: msg
            }
        })
    }

    //编辑菜谱原料
    static async updateOneStuff(msg, id) {
        return await stuff.update({
            s_1: msg.s_1,
            s_2: msg.s_2,
            s_3: msg.s_3,
            s_4: msg.s_4,
            s_5: msg.s_5,
            s_6: msg.s_6
        }, {
            where: {
                s_id: id
            }
        })
    }
    
}

module.exports = stuffDao