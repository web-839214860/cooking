<template>
    <div>

        <el-form :model="cookingaddForm" :rules="rules" ref="cookingaddForm" label-width="55px" class="cookingaddforms">

			<div class="stuff">
                <el-form-item label="原料1" prop="s_1">
                    <el-input clearable type="text" placeholder="格式：奶油-----50g" v-model="cookingaddForm.s_1" ></el-input>
                </el-form-item>

                <el-form-item label="原料2" prop="s_2">
                    <el-input clearable type="text" placeholder="格式：奶油-----50g" v-model="cookingaddForm.s_2" ></el-input>
                </el-form-item>

                <el-form-item label="原料3" prop="s_3">
                    <el-input clearable type="text" placeholder="格式：奶油-----50g" v-model="cookingaddForm.s_3" ></el-input>
                </el-form-item>

                <el-form-item label="原料4" prop="s_4">
                    <el-input clearable type="text" placeholder="格式：奶油-----50g" v-model="cookingaddForm.s_4" ></el-input>
                </el-form-item>

                <el-form-item label="原料5" prop="s_5">
                    <el-input clearable type="text" placeholder="格式：奶油-----50g" v-model="cookingaddForm.s_5" ></el-input>
                </el-form-item>

                <el-form-item label="原料6" prop="s_6">
                    <el-input clearable type="text" placeholder="格式：奶油-----50g" v-model="cookingaddForm.s_6" ></el-input>
                </el-form-item>

            </div>

            <el-form-item label="标 题" prop="c_title">
				<el-input clearable type="text" placeholder="请输入菜谱标题" v-model="cookingaddForm.c_title" ></el-input>
			</el-form-item>

            <el-form-item label="简 介" prop="c_synopsis">
                <el-input clearable type="textarea" :rows="2" placeholder="请输入菜谱简介" v-model="cookingaddForm.c_synopsis" ></el-input>
            </el-form-item>

            <el-form-item label="步 骤" prop="c_step">
                <el-input clearable type="textarea" :rows="3" placeholder="请输入菜品步骤" v-model="cookingaddForm.c_step" ></el-input>
            </el-form-item>

            <el-form-item label="图 片">
                <el-upload ref="upload" action="" :auto-upload="false" list-type="text">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="cookingadd('cookingaddForm')" >添加</el-button>
                <el-button type="danger" class="login_button" @click="$refs['cookingaddForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                cookingaddForm:{
                    s_1: '',
                    s_2: '',
                    s_3: '',
                    s_4: '',
                    s_5: '',
                    s_6: '',
                    c_title: '',
                    c_synopsis: '',
                    c_step: '',
                    u_userId: this.$store.state.user.u_userId,
                },
                rules: {
                    c_title: [
                        { required: true, message: '请输入菜谱标题', trigger: 'blur' }
                    ],
                    c_synopsis: [
                        { required: true, message: '请输入菜谱简介', trigger: 'blur' }
                    ],
                    c_step: [
                        { required: true, message: '请输入菜品步骤', trigger: 'blur' }
                    ]   
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
            cookingadd(cookingaddForm){
                this.$refs[cookingaddForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.uploadFiles[0]  //上传图片
                        
                        if(file==null){
                            this.showMessage('info',"请添加图片")
                        }else{
                            formData.append('s_1', this.cookingaddForm.s_1);
                            formData.append('s_2', this.cookingaddForm.s_2);
                            formData.append('s_3', this.cookingaddForm.s_3);
                            formData.append('s_4', this.cookingaddForm.s_4);
                            formData.append('s_5', this.cookingaddForm.s_5);
                            formData.append('s_6', this.cookingaddForm.s_6);

                            formData.append('c_title', this.cookingaddForm.c_title);
                            formData.append('c_synopsis', this.cookingaddForm.c_synopsis);
                            formData.append('c_step', this.cookingaddForm.c_step);
                            formData.append('u_userId', this.cookingaddForm.u_userId);
                            formData.append('c_image', file.raw);
                            //let cookingaddinfo = this.cookingaddForm;
                            this.$api.cooking.postonecooking(formData).then(res => {
                                //console.log(res)
                                if(res.code ==1){
                                    this.showMessage('success',res.data.message)
                                    this.$router.push({ path: '/cooking' })
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
.cookingaddforms{
    position: absolute;
	top: 55%;
    left: 55%;
	transform: translate(-50%,-50%);
	width:550px;
}
.stuff{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around
}
</style>