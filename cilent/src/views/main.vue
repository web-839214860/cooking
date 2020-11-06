<template>
    <div>

        <div>
            <router-view/>
        </div>

        <van-tabbar v-model="active" @change="change">
            <van-tabbar-item icon="home-o" to="/" >广场</van-tabbar-item>
            <van-tabbar-item icon="eye-o" to="/cooking" >发现</van-tabbar-item>
            <van-tabbar-item icon="video-o" to="/video" >视频</van-tabbar-item>
            <van-tabbar-item icon="records" to="/date" >日历</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/my" >我的</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>       
//参考：https://blog.csdn.net/yunchong_zhao/article/details/104373725

    export default {
        data() {
            return {
                active: 0  //导航默认下标是 0 指向的首页
            }
        },
        created () {
            this.active = JSON.parse(localStorage.getItem('active')) //每次进入组件的时候 从本地缓存中取出
            this.changeTabBarActive()
        },
        methods: {
            change (active) {
                localStorage.setItem('active', active)  //每次改变将改变的数值存入本地缓存中
            },
            changeTabBarActive(){
                this.nowPath=this.$route.path
                if(this.nowPath == '/'){
                    this.active=0;
                }
            },
        },
        watch: {  //监听导航栏的变化  
            $route () {
                switch (this.$route.path) {
                    case '/':
                        this.active = 0
                    break

                    case '/cooking':
                        this.active = 1
                    break

                    case '/video':
                        this.active = 2
                    break

                    case '/date':
                        this.active = 3
                    break
                    
                    case '/my':
                        this.active = 4
                    break
                }
            }
        } 
    }
</script>

<style>

</style>