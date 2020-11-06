var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'trend',
        {
            t_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            t_concent:{
                type: DataTypes.STRING,
                field: 't_concent'
            },
            t_image:{
                type: DataTypes.STRING,
                field: 't_image'
            },
            t_date: {
                type: DataTypes.DATE,
                field: 't_date',
                get() {
                    return moment(this.getDataValue('t_date')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },
        }
    );
}