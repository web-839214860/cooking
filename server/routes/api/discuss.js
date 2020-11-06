const router = require('koa-router')()
const discussController = require('../../controllers/discuss')
const passport = require("../../middlewares/passport")


router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})

router.get('/getalldiscuss', discussController.getalldiscuss) //管理员获取所有评论

router.delete('/deletediscuss/:id', discussController.deletediscuss) //删除评论

router.post('/postdiscuss', discussController.postdiscuss) //发表评论


module.exports = router