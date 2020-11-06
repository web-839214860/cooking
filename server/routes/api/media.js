const router = require('koa-router')()
const mediaController = require('../../controllers/media')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")

router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})


router.get('/getallvideoinfo', mediaController.getallvideoinfo)//管理员获取所有媒体信息

router.post('/postonemedia', upload.single('m_video') , mediaController.postonemedia)//管理员添加媒体

router.delete('/deletemedia/:id', mediaController.deletemedia) //管理员删除媒体

router.get('/getonemediainfo/:id', mediaController.getonemediainfo)//管理员获取需要编辑的媒体的信息

router.put('/putonemediainfo/:id', mediaController.putonemediainfo)//管理员修改媒体信息

module.exports = router