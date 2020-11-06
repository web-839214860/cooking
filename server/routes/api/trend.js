const router = require('koa-router')()
const trendController = require('../../controllers/trend')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")

router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})


router.get('/getalltrendinfo', trendController.getalltrendinfo)//管理员获取所有动态信息

router.get('/getonetrendinfo/:id', trendController.getonetrendinfo)//获取某一条动态信息

router.post('/postonetrend', upload.single('t_image') , trendController.postonetrend)//管理员发布动态

router.delete('/deletetrend/:id', trendController.deletetrend) //管理员删除动态

module.exports = router