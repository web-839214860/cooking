<template>
    <div>

        <van-nav-bar title="发现"/>

        <div id="cooking">

            <div>
                <img style="width:100%" src="../../public/images/live.png" >
            </div>

            <div class="cooking">
                <div class="cooking_info" v-for="(cooking,index) in cookingInfo" :key="index" @click="cookinginfo(cooking.c_id)">
                    <div class="cooking_info_title">{{cooking.c_title}}</div>
                    <div style="height: 222.16px">
                        <img style="width:100%" :src="link+cooking.c_image">
                    </div>
                    <div class="cooking_info_stuff">
                        <van-row>
                            <van-col span="12">{{cooking.stuff.s_1}}</van-col>
                            <van-col span="12">{{cooking.stuff.s_2}}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="12">{{cooking.stuff.s_3}}</van-col>
                            <van-col span="12">{{cooking.stuff.s_4}}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="12">{{cooking.stuff.s_5}}</van-col>
                            <van-col span="12">{{cooking.stuff.s_6}}</van-col>
                        </van-row>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                link: this.$link.linkURL,
                cookingInfo: [],
            }
        },
        created(){
            this.handleCookingList();
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('cooking').style.height=winHeight-50-46 +'px'
        },
        methods: {
            handleCookingList(){
                this.$api.cooking.getallcookinginfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.cookingInfo=res.data;
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            cookinginfo(val){
                this.$router.push('/cookinginfo/' + val)
            },
        },
        
    }
</script>

<style>
#cooking{
    overflow: scroll;
}

.cooking{
    padding: 0.5rem 1rem 0 1rem; 
}
.cooking_info{
    height: 380px;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 1px 1px 10px rgba(144,144,144,0.3);
    margin-bottom: 2rem
}

.cooking_info_title{
    height: 45px;
    line-height: 50px;
    text-align: center;
    font-size: 0.8rem;
    font-weight: bold;
}
.cooking_info_stuff{
    height: 112.84px;
    font-size: 0.8rem;
    line-height: 35px;
    text-align: center
}
</style>