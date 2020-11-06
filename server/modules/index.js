const config=require('../config/mysql_sequelize');
const Sequelize = config.sequelize

//导入模型统一管理
const user = Sequelize.import(__dirname + '/user.js')
const media = Sequelize.import(__dirname+'/media.js')
const trend = Sequelize.import(__dirname+'/trend.js')
const discuss = Sequelize.import(__dirname+'/discuss.js')
const stuff = Sequelize.import(__dirname+'/stuff.js')
const cooking = Sequelize.import(__dirname+'/cooking.js')


media.hasOne(user,{
    foreignKey: 'u_userId',
    sourceKey: 'u_userId'
})
user.belongsTo(media, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

trend.hasOne(user,{
    foreignKey: 'u_userId',
    sourceKey: 'u_userId'
})
user.belongsTo(trend, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

discuss.hasOne(user,{
    foreignKey: 'u_userId',
    sourceKey: 'u_userId'
})
user.belongsTo(discuss, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

discuss.hasOne(trend,{
    foreignKey: 't_id',
    sourceKey: 't_id'
})
trend.belongsTo(discuss, {
    foreignKey: 't_id',
    targetKey: 't_id'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

cooking.hasOne(user,{
    foreignKey: 'u_userId',
    sourceKey: 'u_userId'
})
user.belongsTo(cooking, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

cooking.hasOne(stuff,{
    foreignKey: 's_id',
    sourceKey: 's_id'
})
stuff.belongsTo(cooking, {
    foreignKey: 's_id',
    targetKey: 's_id'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})


module.exports={ user, media, trend, discuss, stuff, cooking }