<template>
    <div>

        <el-form :model="cookingeditForm" ref="cookingeditForm" label-width="55px" class="cookingaddforms">

            <div class="stuff">

                <el-form-item label="原料1" prop="stuff.s_1">
                    <el-input clearable type="text" v-model="cookingeditForm.stuff.s_1" ></el-input>
                </el-form-item>

                <el-form-item label="原料2" prop="stuff.s_2">
                    <el-input clearable type="text" v-model="cookingeditForm.stuff.s_2" ></el-input>
                </el-form-item>

                <el-form-item label="原料3" prop="stuff.s_3">
                    <el-input clearable type="text" v-model="cookingeditForm.stuff.s_3" ></el-input>
                </el-form-item>

                <el-form-item label="原料4" prop="stuff.s_4">
                    <el-input clearable type="text" v-model="cookingeditForm.stuff.s_4" ></el-input>
                </el-form-item>

                <el-form-item label="原料5" prop="stuff.s_5">
                    <el-input clearable type="text" v-model="cookingeditForm.stuff.s_5" ></el-input>
                </el-form-item>

                <el-form-item label="原料6" prop="stuff.s_6">
                    <el-input clearable type="text" v-model="cookingeditForm.stuff.s_6" ></el-input>
                </el-form-item>

            </div>

            <el-form-item label="标 题" prop="c_title">
				<el-input clearable type="text" v-model="cookingeditForm.c_title" ></el-input>
			</el-form-item>

            <el-form-item label="简 介" prop="c_synopsis">
				<el-input clearable type="textarea" :rows="2" v-model="cookingeditForm.c_synopsis" ></el-input>
			</el-form-item>

            <el-form-item label="步 骤" prop="c_step">
				<el-input clearable type="textarea" :rows="3" v-model="cookingeditForm.c_step" ></el-input>
			</el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="cookingedit('cookingeditForm')" >修改</el-button>
                <el-button type="danger" class="login_button" @click="$refs['cookingeditForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                cookingeditForm:{
                    stuff:{}
                }
            }
        },
        created() {
            this.getonecookinginfo(this.$route.params.id)
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            getonecookinginfo(c_id){
                this.$api.cooking.getonecookinginfo(c_id).then(res =>{
                    //console.log(res)
                    if(res.code==1){
                        this.cookingeditForm=res.data.onecookinginfo
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            cookingedit(cookingeditForm){
                this.$refs[cookingeditForm].validate((valid) => {
                    if (valid) {
                        let cookinginfo = this.cookingeditForm;
                        this.$api.cooking.putonecookinginfo(cookinginfo,this.$route.params.id).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.showMessage('success',res.data.message)
                                this.$router.push({ path: '/cooking' })
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