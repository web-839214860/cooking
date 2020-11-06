<template>
    <div>

        <van-nav-bar title="详情" left-arrow @click-left="onClickLeft"/>

        <div id="indexinfo">

            <div class="trend_heard">
                <div class="trend_user_image">
                    <img :src="link+trend.user.u_image"/>
                </div>

                <div class="trend_user_info">
                    <div class="trend_user_info_name">{{trend.user.u_name}}</div>
                    <div class="trendinfo_user_info_concent" v-if="trend.t_concent !== null">{{trend.t_concent}}</div>
                    <img style="width:60%" v-if="trend.t_image !== null" :src="link+trend.t_image" />

                    <div class="trend_user_info_bottom">
                        <div class="trendinfo_user_info_date">{{trend.t_date}}</div>
                    </div> 
                </div>
            </div>

            <!-- 评论 -->
            <div class="discuss"> 
                <!-- 发布评论 -->
                <div class="discusssadd">
                    <el-form :model="discussForm" :rules="rules" ref="discussForm" style="padding-top: 12px">
                        <van-row>
                            <van-col span="20">
                                <el-form-item prop="d_discuss" style="width:268px">
                                    <el-input clearable type="text" placeholder="请发布评论..." v-model="discussForm.d_discuss" ></el-input>
                                </el-form-item>
                            </van-col>
                            <van-col span="4"><van-button plain type="info" size="small" style="margin-top:8px;" @click="discussadd('discussForm')">添加</van-button></van-col>
                        </van-row>
                    </el-form>
                </div>
                
                <!-- 评论内容 -->
                <div class="comment_wrap" v-if="discuss">
                    <div class="comment_item" v-for="(discuss,index) in discussinfo" :key="index">
                        <!-- 左侧 -->
                        <div class="comment_user">
                            <img :src="link+discuss.user.u_image"/>
                        </div>
                        <!-- 右侧 -->
                        <div class="comment_info">
                            <div class="comment_detail">
                                <div class="author">{{discuss.user.u_name}}</div>
                                <div class="date">{{discuss.d_date}}</div>
                            </div>
                            <div class="comment_detail_delete">
                                <div class="commentInfo">{{discuss.d_discuss}}</div>
                                <div class="delete">
                                    <div v-if="discuss.u_userId == Id"  @click="open(discuss.d_id)">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="nodiscuss" >
                    <van-empty description="暂无评论" />
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                link: '',
                Id: this.$store.state.user.u_userId,
                trend:{
                    user:{} 
                },
                discussinfo:{},
                discuss: false,
                nodiscuss: false,
                discussForm:{
                    d_discuss: '',
                    t_id: this.$route.params.id,
                    u_userId: this.$store.state.user.u_userId,
                },
                rules: {
                    d_discuss: [
                        { required: true, message: '请先输入评论内容', trigger: 'blur' },
                    ],
                }
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('indexinfo').style.height=winHeight-46 +'px'
        },
        created() {
            this.getonetrend(this.$route.params.id)
            this.getdiscuss()
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getonetrend(t_id){
                this.$api.trend.getonetrendinfo(t_id).then(res =>{
                    if(res.code==1){
                        //console.log(res.data.onetrendinfo)
                        this.link = this.$link.linkURL
                        this.trend = res.data.onetrendinfo
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            discussadd(discussForm){
                this.$refs[discussForm].validate((valid) => {
                    if (valid) {
                        let discussinfo = this.discussForm;
                        this.$api.discuss.postdiscuss(discussinfo).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.getdiscuss()
                                this.$toast.success(res.data.message)
                                this.discussForm.d_discuss = ''
                                this.nodiscuss = false
                            }else{
                                this.$toast.fail("未知错误")
                            }
                        })
                    }
                });
            },
            getdiscuss(){
                this.$api.discuss.getalldiscuss().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.link = this.$link.linkURL
                        const that = this
                        const alldiscuss = res.data.filter(function(item){ //数组条件筛选
                            return item.t_id == that.$route.params.id
                        })
                        this.discussinfo = alldiscuss;
                        //console.log(alldiscuss)
                        if(this.discussinfo.length <= 0){
                            this.nodiscuss=true
                        } else {
                            this.discuss=true
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            deletediscuss(val){
                this.$api.discuss.deletediscuss(val).then(res =>{
                    if(res.code==1){
                        this.getdiscuss()
                        this.$toast.success(res.data.message)
                        if(this.discussinfo.length-1 <= 0){
                            this.nodiscuss=true
                            this.discuss=false
                        } else {
                            this.discuss=true
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                    
                })
            },
            open(val){
                this.$dialog.alert({
                    title: "提示", //标题
                    message: "是否删除该评论", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                })
                .then(() => { //点击确认按钮后的调用
                    this.$options.methods.deletediscuss.bind(this)(val);
                })
                .catch(() => {}) //点击取消按钮后的调用
            },
        },
    }
</script>

<style>

#indexinfo{
    overflow: scroll;
}
.trendinfo_user_info_concent{
    padding:0.5rem 0 0.9rem 0;
    font-size: 0.8rem;
}
.trendinfo_user_info_date{
    flex: 1;
    font-size: 0.65rem;
    color: #a8a8a8;
    padding-top: 1.3rem;
}
.trendinfo_user_info_delect{
    flex: 1;
    padding-top: 1.2rem;
    font-size: 0.65rem;
    color: #4F6B8C;
}

.discuss {
    padding:0.6rem 0.2rem;
}

.discusssadd{
    padding:0 0rem 0.1rem 0.7rem;
}

.comment_wrap {
    background: rgb(250, 250, 250);
    padding: 0.5rem 0.8rem 0.1rem 0.8rem;
}
.comment_item {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.3rem;
}
.comment_user {
    display: flex;
    flex: 1;
}
.comment_user img {
    width: 78%;
    height: 78%;    
}
.comment_info {
    display: flex;
    flex: 7;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
}
.comment_detail {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.comment_detail .author {
    font-size: 0.75rem;
    color: #9E9E9E;
}
.comment_detail .date {
    font-size: 0.65rem;
    color: #9E9E9E;
}
.comment_detail_delete {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.comment_detail_delete .commentInfo {
    font-size: 0.75rem;
    color: #323233;
    flex: 7;
}
.comment_detail_delete .delete {
    font-size: 0.65rem;
    color: #4F6B8C;
    text-align: right;
    flex: 1;
}

</style>