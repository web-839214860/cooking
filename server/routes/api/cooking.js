const router = require('koa-router')()
const cookingController = require('../../controllers/cooking')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")

router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})


router.get('/getallcookinginfo', cookingController.getallcookinginfo)//管理员获取所有菜谱信息

router.post('/postonecooking', upload.single('c_image') , cookingController.postonecooking)//管理员添加菜谱信息

router.delete('/deletecooking/:id', cookingController.deletecooking) //管理员删除菜谱信息

router.get('/getonecookinginfo/:id', cookingController.getonecookinginfo)//管理员获取需要编辑的菜谱的信息

router.put('/putonecookinginfo/:id', cookingController.putonecookinginfo)//管理员修改菜谱信息

module.exports = router