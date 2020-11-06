const { user, media } = require('../modules/index')

media.sync({ force: false }); 

class mediaDao {

    //获取某个视频的全部信息
    static async getVideoInfo(m_videoId) {
        return await media.findOne({
            include:[{
                model: user
            }],
            where: {
                m_videoId
            }
        })
    }

    //管理员获取所有视频信息
    static async getAllVideo() {
        return await media.findAll({
            'order' :[
                ['m_date' , 'DESC'] //根据数据库的字段 u_date 降序排列 相当于数据库的 order by
            ],
            include:[{
                model: user
            }],
            where: {
                
            }
        })
    }

    //添加媒体
    static async createMedia(msg) {  
        return await media.findOrCreate({  //先查找，如果不存在则创建媒体并保存到数据库中
            where: {
                m_videoId: msg.m_videoId
            },
            defaults: {
                m_videoId: msg.m_videoId,
                m_title: msg.m_title,
                m_synopsis: msg.m_synopsis,
                m_date: msg.m_date,
                m_video: msg.m_video,
                m_like: msg.m_like,
                u_userId: msg.u_userId
            },
            raw: true
        })
    }

    //删除媒体
    static async delectMedia(msg) {
        return await media.destroy({
            where: {
                m_videoId: msg
            }
        })
    }

    //编辑媒体
    static async updateOneMedia(msg, id) {
        return await media.update({
            m_videoId: msg.m_videoId,
            m_title: msg.m_title,
            m_synopsis: msg.m_synopsis,
            m_date: msg.m_date,
            m_video: msg.m_video,
            m_like: msg.m_like,
            u_userId: msg.u_userId
        }, {
            where: {
                m_videoId: id
            }
        })
    }
    
}

module.exports = mediaDao
