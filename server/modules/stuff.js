module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'stuff',
        {
            s_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            s_1:{
                type: DataTypes.STRING,
                field: 's_1'
            },
            s_2:{
                type: DataTypes.STRING,
                field: 's_2'
            },
            s_3:{
                type: DataTypes.STRING,
                field: 's_3'
            },
            s_4:{
                type: DataTypes.STRING,
                field: 's_4'
            }, 
            s_5:{
                type: DataTypes.STRING,
                field: 's_5'
            }, 
            s_6:{
                type: DataTypes.STRING,
                field: 's_6'
            }      
        }
    );
}