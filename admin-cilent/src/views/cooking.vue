<template>
    <div>

        <div>
            <el-input v-model="searchTableInfo" placeholder="请输入搜索内容" style="width:30%"></el-input>
            
            <el-button style="position: relative; left: 2%;" type="primary" @click="onClickAdd()" >
                <i class="el-icon-plus"></i> 添加菜谱
            </el-button>
        </div>

        <el-table style="width: 100%; margin-top: 10px;" :data="cookingList.slice((currentPage-1)*pagesize,currentPage*pagesize)" > <!-- 从0开始，每页显示的数据 参考：http://www.manongjc.com/article/22017.html -->
        
            <el-table-column label="编号" type="index" min-width="5%" align="center"></el-table-column>

            <el-table-column label="标题" prop="c_title" min-width="11%" align="center"></el-table-column>

            <el-table-column label="简介" min-width="19%" align="center">
                <template slot-scope="scope">
                    <div style="text-align:justify">{{scope.row.c_synopsis}}</div>
                </template>
            </el-table-column>

            <el-table-column label="步骤" min-width="20%" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top-start">
                        <p>{{scope.row.c_step}} </p>
                        <span slot="reference" style= "cursor:pointer">{{scope.row.c_step | ellipsis}}</span>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="发布时间" prop="c_date" min-width="9%" align="center"></el-table-column>

            <el-table-column label="图片" prop="c_image" min-width="8%" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top-start" trigger="click">
                        <a :href="link+scope.row.c_image" target="_blank">
                            <img :src="link+scope.row.c_image" style="width: 180px;height: 180px">
                        </a>
                        <img slot="reference" :src="link+scope.row.c_image" style="width: 65px;height: 65px; cursor:pointer">
                    </el-popover>  
                </template>
            </el-table-column>

            <el-table-column label="食材" min-width="5%" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top-start" >
                        <p>原料1： {{scope.row.stuff.s_1}} </p>
                        <p>原料2： {{scope.row.stuff.s_2}} </p>
                        <p>原料3： {{scope.row.stuff.s_3}} </p>
                        <p>原料4： {{scope.row.stuff.s_4}} </p>
                        <p>原料5： {{scope.row.stuff.s_5}} </p>
                        <p>原料6： {{scope.row.stuff.s_6}} </p>
                        <span slot="reference" style= "cursor:pointer">查看</span>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="发布账号" min-width="7%" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top-start" >
                        <p>姓名： {{scope.row.user.u_name}} </p>
                        <p>性别： {{scope.row.user.u_sex}} </p>
                        <p>注册时间： {{scope.row.user.u_date}} </p>
                        <span slot="reference" style= "cursor:pointer">{{scope.row.u_userId}}</span>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="操作" prop="doit" min-width="16%" align="center">
                <template slot-scope="scope"> 
                    <el-button size="small" type="primary" @click="editcooking(scope.row.c_id)" ><i class="el-icon-edit"></i> 编辑</el-button>
                    <el-button size="small" type="danger" @click="open(scope.row.c_id)" ><i class="el-icon-delete"></i> 删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 3, 5, 7]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="cookingList.length">
        </el-pagination>

    </div>
</template>

<script>
import { MessageBox } from 'element-ui'

    export default {
        inject:['reload'],//页面刷新
        data(){
            return{
                link: this.$link.linkURL,
                currentPage:1,//初始页
                pagesize:2,//每页的数据
                searchTableInfo:"",
                getSearchInfo:[]
            }
        },
        created(){
            this.handleCookingList()
        },
        methods:{
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            handleSizeChange:function (size) {
                this.pagesize=size; //每页下拉显示数据
            },
            handleCurrentChange:function(currentPage){
                this.currentPage=currentPage; //点击第几页
            },
            onClickAdd(){
                this.$router.push({path:'/cookingAdd'})
            },
            handleCookingList(){
                this.$api.cooking.getallcookinginfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            deletecooking(val){
                this.$api.cooking.deletecooking(val).then(res =>{
                    if(res.code==1){
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    }
                    
                })
            },
            open(val) {
                MessageBox.confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deletecooking.bind(this)(val);
                }).catch(() => {});
            },
            editcooking(val){
                this.$router.push('/cookingEdit/'+val)
            }
        },
        computed: {  //参考：https://blog.csdn.net/reality_fei/article/details/105560589
            // 根据计算属性模糊搜索
            cookingList () {
                const searchTableInfo = this.searchTableInfo
                if (searchTableInfo) {
                // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                // 注意： filter() 不会对空数组进行检测。filter() 不会改变原始数组。
                    return this.getSearchInfo.filter(data => {
                    //console.log("success"+data)
                    // some() 方法（用于检测数组中的元素是否满足指定条件） 会依次执行数组的每个元素：
                    // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                    // 如果没有满足条件的元素，则返回false。
                    // 注意： some() 不会对空数组进行检测。some() 不会改变原始数组。
                        return Object.keys(data).some(key => {
                        // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                        // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(searchTableInfo) > -1
                        })
                    })
                }
                return this.getSearchInfo
            }
        },
        filters: {  //文字过滤器  参考：https://blog.csdn.net/ju__ju/article/details/97801519
            ellipsis(value) {
                if (!value) return "";
                if (value.length > 30) {
                    return value.slice(0, 30) + "...";
                }
                return value;
            }
        }
        
    }
</script>

<style>
.el-popper{
    max-width: 30%
}
</style>