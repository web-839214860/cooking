var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'discuss',
        {
            d_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            d_discuss:{
                type: DataTypes.STRING,
                field: 'd_discuss'
            },
            d_date: {
                type: DataTypes.DATE,
                field: 'd_date',
                get() {
                    return moment(this.getDataValue('d_date')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            t_id:{
                type: DataTypes.INTEGER,
                field:'t_id'
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            }        
        }
    );
}

