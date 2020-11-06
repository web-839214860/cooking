<template>
    <div>

        <van-nav-bar title="发布动态" left-arrow @click-left="onClickLeft">
            <template>  
                <div slot="right">
                    <van-button type="info" size="small" @click="trendadd()" :disabled="(trendaddForm.t_concent == '') && (fileList == '') ">发布</van-button>
                </div>
            </template>
        </van-nav-bar>

        <div>
            <el-form :model="trendaddForm" ref="trendaddForm" >

                <el-form-item prop="t_concent" class="trend_formitem">
                    <el-input clearable type="textarea" :rows="5" placeholder="说点开心的事吧" v-model="trendaddForm.t_concent" ></el-input>
                </el-form-item>

                <el-form-item class="trend_picture">
                    <van-uploader ref="upload" v-model="fileList" multiple />
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                trendaddForm:{
                    t_concent: '',
                    u_userId: this.$store.state.user.u_userId,
                },
                fileList: []
            }
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            trendadd(){
                //this.$refs[trendaddForm].validate((valid) => {
                    //if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.value[0]  //上传图片

                        formData.append('t_concent', this.trendaddForm.t_concent);
                        formData.append('u_userId', this.trendaddForm.u_userId);
                        if(file !== undefined){
                            formData.append('t_image', file.file);
                        }else{
                            formData.append('t_image', null);
                        }
                        //let trendaddinfo = this.trendaddForm;
                        this.$api.trend.postonetrend(formData).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.$toast.success(res.data.message)
                                this.$router.push({ path: '/' })
                            }else{
                                this.$toast.fail("未知错误")
                            }
                        })
                         
                    //}
                //});
            }
        },
        
    }
</script>

<style>

.el-textarea__inner, .trend_formitem{
    border: none;
}
.trend_picture{
    padding-left:0.7rem; 
    height: 160px;
}

</style>