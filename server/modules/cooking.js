var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'cooking',
        {
            c_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            c_title:{
                type: DataTypes.STRING,
                field: 'c_title'
            },
            c_synopsis:{
                type: DataTypes.STRING,
                field: 'c_synopsis'
            },
            c_step:{
                type: DataTypes.STRING,
                field: 'c_step'
            },
            c_image:{
                type: DataTypes.STRING,
                field: 'c_image'
            },
            c_date: {
                type: DataTypes.DATE,
                field: 'c_date',
                get() {
                    return moment(this.getDataValue('c_date')).format('YYYY-MM-DD HH:mm:ss');
                }
            }, 
            s_id:{
                type: DataTypes.INTEGER,
                field: 's_id'
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            }
        }
    );
}