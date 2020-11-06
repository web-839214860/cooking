<template>
    <div>

        <el-form :model="trendaddForm" ref="trendaddForm" label-width="55px" class="allforms">

            <el-form-item label="内 容" prop="t_concent">
                <el-input clearable type="textarea" :rows="3" placeholder="请添加动态内容" v-model="trendaddForm.t_concent" ></el-input>
            </el-form-item>

            <el-form-item label="图 片">
                <el-upload ref="upload" action="" :auto-upload="false" list-type="text">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="trendadd('trendaddForm')" >添加</el-button>
                <el-button type="danger" class="login_button" @click="$refs['trendaddForm'].resetFields()">重置</el-button>
            </div>

        </el-form>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                trendaddForm:{
                    t_concent: '',
                    u_userId: this.$store.state.user.u_userId,
                }
            }
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            trendadd(trendaddForm){
                this.$refs[trendaddForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.uploadFiles[0]  //上传图片

                        formData.append('t_concent', this.trendaddForm.t_concent);
                        formData.append('u_userId', this.trendaddForm.u_userId);
                        if(file !== undefined){
                            formData.append('t_image', file.raw);
                        }else{
                            formData.append('t_image', null);
                        }
                        //let trendaddinfo = this.trendaddForm;
                        this.$api.trend.postonetrend(formData).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.showMessage('success',res.data.message)
                                this.$router.push({ path: '/trend' })
                            }else{
                                this.$message.error("未知错误")
                            }
                        })
                         
                    }
                });
            }
        },
        
    }
</script>

<style>

</style>