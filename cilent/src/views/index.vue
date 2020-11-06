<template>
    <div>

        <van-nav-bar title="广场">
            <template>  
                <div slot="right">
                    <van-icon name="plus" @click="trend()"/>
                </div>
            </template>
        </van-nav-bar>

        <div id="trend_list">
            <div style="padding:0 1rem">
                <van-swipe :autoplay="3000" indicator-color="white">
                    <van-swipe-item><img style="width:100%" src="../../public/images/swiper.png" ></van-swipe-item>
                    <van-swipe-item><img style="width:100%" src="../../public/images/swiper.png" ></van-swipe-item>
                    <van-swipe-item><img style="width:100%" src="../../public/images/swiper.png" ></van-swipe-item>
                    <van-swipe-item><img style="width:100%" src="../../public/images/swiper.png" ></van-swipe-item>
                </van-swipe>
            </div>
        
            <div style="overflow: hidden">
                <div class="course_title"><van-icon name="fire" /> 精选课程</div>
                <div class="course_box">
                    <div class="course_image">
                        <img style="width:100%" src="../../public/images/index1.jpg" />
                        <div class="course_image_word">红烧肉</div>
                    </div>
                    <div class="course_image">
                        <img style="width:100%" src="../../public/images/index2.jpg" />
                        <div class="course_image_word">过桥米线</div>
                    </div>
                    <div class="course_image">
                        <img style="width:100%" src="../../public/images/index3.jpg" />
                        <div class="course_image_word">奥尔良鸡腿</div>
                    </div>
                    <div class="course_image">
                        <img style="width:100%" src="../../public/images/index4.jpg" />
                        <div class="course_image_word">手撕鸡</div>
                    </div>
                    <div class="course_image">
                        <img style="width:100%" src="../../public/images/index5.jpg" />
                        <div class="course_image_word">东坡肉</div>
                    </div>
                </div>
            </div>

            <!-- 动态 -->
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <div v-for="(trend,index) in trendList" :key="index">

                    <div class="trend_heard">
                        <div class="trend_user_image">
                            <img :src="link+trend.user.u_image"/>
                        </div>

                        <div class="trend_user_info">
                            <div class="trend_user_info_name">{{trend.user.u_name}}</div>
                            <div class="trend_user_info_concent" v-if="trend.t_concent !== null">{{trend.t_concent}}</div>
                            <img style="width:70%" v-if="trend.t_image !== null" :src="link+trend.t_image" />

                            <div class="trend_user_info_bottom">
                                <div class="trend_user_info_date">{{trend.t_date}}</div>
                                <div class="trend_user_info_delect" v-if="trend.user.u_userId == Id" @click="open(trend.t_id)">删除</div>
                            </div> 
                        </div>
                    </div>

                    <div class="trend_icon">
                        <van-row>
                            <van-col span="8"><van-icon name="share-o" /> 转发</van-col>
                            <van-col span="8" @click="indexinfo(trend.t_id)"><van-icon name="comment-o" /> 评论</van-col>
                            <van-col span="8"><van-icon name="good-job-o" /> 点赞</van-col>
                        </van-row>
                    </div>
                    
                </div>
            </van-pull-refresh>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                link: this.$link.linkURL,
                Id: this.$store.state.user.u_userId,
                trendList: [],
                isRefresh:false,
            }
        },
        created(){
            this.handletrendList()
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('trend_list').style.height=winHeight-46-50 +'px'
        },
        methods: {
            trend(){
                this.$router.push('/trend')
            },
            indexinfo(val){
                this.$router.push('/indexinfo/' + val)
            },
            handletrendList(){
                this.$api.trend.getalltrendinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.trendList=res.data;
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    //this.trendList=[];
                    this.handletrendList();
                }, 500);
            },
            deletetrend(val){
                this.$api.trend.deletetrend(val).then(res =>{
                    if(res.code==1){
                        this.handletrendList();
                        this.$toast.success(res.data.message)
                    }else{
                        this.$toast.fail("未知错误")
                    } 
                })
            },
            open(val){
                this.$dialog.alert({
                    title: "提示", //标题
                    message: "是否删除此动态", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                })
                .then(() => { //点击确认按钮后的调用
                    this.$options.methods.deletetrend.bind(this)(val);
                })
                .catch(() => {}) //点击取消按钮后的调用
            },
        },
        
    }
</script>

<style>
.course_title{
    padding: 10px 15px;
    font-size: 0.8rem
}
.course_box{
    padding: 8px 9px;
    white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
    overflow-y:auto;/*可滑动*/
}
.course_image{
    width: 25%;
    margin: 0 3%;
    display: inline-block;/*行内块元素*/
}
.course_image_word{
    padding: 3px 0;
    text-align: center;
    font-size: 0.7rem;
    color: darkgrey;
}

#trend_list {
    overflow: scroll;
}
.trend_heard{  
    padding:1.1rem 0.9rem;
    display: flex;
}
.trend_user_image{
    display: flex;
    flex: 1.6
}
.trend_user_image img{
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 5px 5px 5px 5px
}
.trend_user_info{  
    display: flex;
    flex: 8;
    flex-direction: column;    
}
.trend_user_info_name{
    font-size: 0.75rem;
    font-weight: bold;
    color: #282872
}
.trend_user_info_concent{
    padding:0.5rem 0;
    font-size: 0.8rem;
}
.trend_user_info_bottom{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap
}
.trend_user_info_date{
    flex: 1;
    font-size: 0.65rem;
    color: #a8a8a8;
    padding-top: 0.4rem;
}
.trend_user_info_delect{
    padding-top: 0.18rem;
    font-size: 0.7rem;
    color: #4F6B8C;
    text-decoration: underline;
    flex: 1;
}
.trend_icon{
    text-align: center;
    font-size: 0.7rem;
    color: rgb(63, 63, 63);
    padding:0 0.9rem 0.5rem 0.9rem;
    border-bottom: 0.5px solid rgb(243, 243, 243)
}
</style>