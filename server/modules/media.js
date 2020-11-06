var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'media',
        {
            m_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            m_videoId:{
                type: DataTypes.STRING,
                field: 'm_videoId'
            },
            m_title:{
                type: DataTypes.STRING,
                field: 'm_title'
            },
            m_synopsis:{
                type: DataTypes.STRING,
                field: 'm_synopsis'
            },
            m_date: {
                type: DataTypes.DATE,
                field: 'm_date',
                get() {
                    return moment(this.getDataValue('m_date')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            m_video:{
                type: DataTypes.STRING,
                field: 'm_video'
            },   
            m_like:{
                type: DataTypes.INTEGER,
                field: 'm_like'
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },
        }
    );
}