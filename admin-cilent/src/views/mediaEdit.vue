<template>
    <div>

        <el-form :model="mediaeditForm" ref="mediaeditForm" label-width="55px" class="allforms">

			<el-form-item label="编 号">
				<el-input v-model="mediaeditForm.m_videoId" :disabled="true" ></el-input>
			</el-form-item>

            <el-form-item label="标 题" prop="m_title">
				<el-input clearable type="text" v-model="mediaeditForm.m_title" ></el-input>
			</el-form-item>

            <el-form-item label="简 介" prop="m_synopsis">
				<el-input clearable type="textarea" autosize v-model="mediaeditForm.m_synopsis" ></el-input>
			</el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="mediaedit('mediaeditForm')" >修改</el-button>
                <el-button type="danger" class="login_button" @click="$refs['mediaeditForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                mediaeditForm:{}
            }
        },
        created() {
            this.getonemediainfo(this.$route.params.id)
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            getonemediainfo(m_videoId){
                this.$api.media.getonemediainfo(m_videoId).then(res =>{
                    //console.log(res)
                    if(res.code==1){
                        this.mediaeditForm=res.data.onemediainfo
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            mediaedit(mediaeditForm){
                this.$refs[mediaeditForm].validate((valid) => {
                    if (valid) {
                        let mediainfo = this.mediaeditForm;
                        this.$api.media.putonemediainfo(mediainfo,this.$route.params.id).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.showMessage('success',res.data.message)
                                this.$router.push({ path: '/' })
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