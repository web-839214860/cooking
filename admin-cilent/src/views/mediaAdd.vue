<template>
    <div>
        
        <el-form :model="mediaaddForm" :rules="rules" ref="mediaaddForm" label-width="55px" class="allforms">

			<el-form-item label="编 号" prop="m_videoId">
				<el-input clearable type="text" placeholder="请输入媒体编号" v-model="mediaaddForm.m_videoId" ></el-input>
			</el-form-item>

            <el-form-item label="标 题" prop="m_title">
                <el-input clearable type="text" placeholder="请输入媒体标题" v-model="mediaaddForm.m_title" ></el-input>
            </el-form-item>

            <el-form-item label="简 介" prop="m_synopsis">
                <el-input clearable type="textarea" autosize placeholder="请输入媒体简介" v-model="mediaaddForm.m_synopsis" ></el-input>
            </el-form-item>

            <el-form-item label="媒 体">
                <el-upload ref="upload" action="" :auto-upload="false" list-type="text">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="mediaadd('mediaaddForm')" >添加</el-button>
                <el-button type="danger" class="login_button" @click="$refs['mediaaddForm'].resetFields()">重置</el-button>
            </div>

        </el-form>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mediaaddForm:{
                    m_videoId: '',
                    m_title: '',
                    m_synopsis: '',
                    u_userId: this.$store.state.user.u_userId,
                },
                rules: {
                    m_videoId: [
                        { required: true, message: '请填写媒体编号', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 位数字或字母', trigger: 'blur' }
                    ],
                    m_title: [
                        { required: true, message: '请输入媒体标题', trigger: 'blur' }
                    ],
                    m_synopsis: [
                        { required: true, message: '请输入媒体简介', trigger: 'blur' }
                    ],   
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
            mediaadd(mediaaddForm){
                this.$refs[mediaaddForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.uploadFiles[0]  //上传媒体
                        
                        if(file==null){
                            this.showMessage('info',"请添加媒体")
                        }else{
                            formData.append('m_videoId', this.mediaaddForm.m_videoId);
                            formData.append('m_title', this.mediaaddForm.m_title);
                            formData.append('m_synopsis', this.mediaaddForm.m_synopsis);
                            formData.append('u_userId', this.mediaaddForm.u_userId);
                            formData.append('m_video', file.raw);
                            //let mediaaddinfo = this.mediaaddForm;
                            this.$api.media.postonemedia(formData).then(res => {
                                //console.log(res)
                                if(res.code ==1){
                                    this.showMessage('success',res.data.message)
                                    this.$router.push({ path: '/' })
                                }else if(res.code ==-1){                              
                                    this.$message.error(res.data.message)                               
                                }else{
                                    this.$message.error("未知错误")
                                }
                            })
                        }  
                    }
                });
            }
        },
        
    }
</script>

<style>

</style>