<template>
    <div class="login">

        <div class="login_title">
            <h2>享 厨</h2>
            <div>enjoycooking</div>
        </div>

        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">

			<el-form-item prop="u_userId">
				<el-input clearable type="text" placeholder="请输入账号" v-model="loginForm.u_userId" ></el-input>
			</el-form-item>

            <el-form-item prop="u_password">
                <el-input show-password type="password" placeholder="请输入密码" v-model="loginForm.u_password" ></el-input>
            </el-form-item>

        </el-form>

        <div class="tip"><router-link to="/register">新用户请点击前往注册</router-link></div>

        <div class="button">
            <van-button class="login_button" default size="large" @click="login('loginForm')">登 录</van-button>
        </div>

    </div>
</template>

<script>
import {setLocalStorage} from '@/utils/localStorage'

    export default {
        data() {
            return {
                loginForm:{
                    u_userId: '',
                    u_password: '',
                },
                rules: {
					u_userId: [
                        { required: true, message: '请输入注册过的账号', trigger: 'blur' },
                    ],
					u_password: [
						{ required: true, message: '请输入正确密码', trigger: 'blur' }
					],
				}
            }
        },
        methods: {
            login(loginForm){
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        let logininfo = this.loginForm;
                        this.$api.user.postlogin(logininfo).then(res => {
                            //console.log(res)
                            if(res.code ==2){
                                setLocalStorage("Token",res.data.token)
                                this.$toast.success(res.data.message)
                                this.$router.push({ path: '/' })
                            }else if(res.code ==-1){                              
                                this.$toast.fail(res.data.message)                               
                            }else if(res.code ==0){
                                this.$toast.fail(res.data.message)
                            }else if(res.code ==1){
                                this.$toast.fail("当前账号没有权限，请更换账号登录")
                            }else{
                                this.$toast.fail("未知错误")
                            }
                        })
                    }
                });
            }
        }
    }
</script>

<style>
.login{
    position: absolute;
	width: 100%;
	height: 100%;
    background: url(../../public/images/bg.png) no-repeat center center;
	background-size: 100% 100%;
}
.login_title{
    padding: 3rem 0.8rem;
    color: white;
    text-align: center;
}
.login_title div{
    margin-top: -20px
}
.form{
    padding: 0 0.8rem;
}
.el-input__inner{
    border: none;   
}
.el-form-item{
    border-bottom: 1px solid #DCDFE6;
}
.tip{
    font-size: 0.75rem;
    margin-top: 1.3rem;
    margin-left: 0.9rem;
}
a{
    color: rgb(97, 97, 97);
}
.login_button{
    width: 30%;
    height: 35px;
    border-radius: 12px;
    color:rgb(84, 135, 223)
}
.button{
    margin: 0.8rem;
    margin-top: 1.4rem;
    text-align: center
}
</style>