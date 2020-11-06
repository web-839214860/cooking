<template>
    <div>

        <div>
            <el-input v-model="searchTableInfo" placeholder="请输入搜索内容" style="width:30%"></el-input>
            
            <el-button style="position: relative; left: 2%;" type="primary" @click="onClickAdd()" >
                <i class="el-icon-plus"></i> 发布动态
            </el-button>
        </div>

        <el-table style="width: 100%; margin-top: 10px;" :data="trendList.slice((currentPage-1)*pagesize,currentPage*pagesize)" > <!-- 从0开始，每页显示的数据 参考：http://www.manongjc.com/article/22017.html -->
        
            <el-table-column label="编号" prop="t_id" min-width="5%" align="center"></el-table-column>

            <el-table-column label="内容" prop="t_concent" min-width="25%" align="center"></el-table-column>

            <el-table-column label="发布时间" prop="t_date" min-width="20%" align="center"></el-table-column>

            <el-table-column label="图片" prop="t_image" min-width="20%" align="center">
                <template slot-scope="scope">
                    <p v-if="scope.row.t_image==null">未发布图片</p>
                    <p v-if="scope.row.t_image!==null">
                        <el-popover placement="top-start" trigger="click">
                            <a :href="link+scope.row.t_image" target="_blank">
                                <img :src="link+scope.row.t_image" style="width: 180px;height: 180px">
                            </a>
                            <img slot="reference" :src="link+scope.row.t_image" style="width: 65px;height: 65px; cursor:pointer">
                        </el-popover>
                    </p>   
                </template>
            </el-table-column>

            <el-table-column label="发布人账号" min-width="10%" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top-start" >
                        <p>姓名： {{scope.row.user.u_name}} </p>
                        <p>性别： {{scope.row.user.u_sex}} </p>
                        <p>注册时间： {{scope.row.user.u_date}} </p>
                        <span slot="reference" style= "cursor:pointer">{{scope.row.u_userId}}</span>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="操作" prop="doit" min-width="20%" align="center">
                <template slot-scope="scope"> 
                    <el-button size="small" type="danger" @click="open(scope.row.t_id)" ><i class="el-icon-delete"></i> 删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="trendList.length">
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
                pagesize:3,//每页的数据
                searchTableInfo:"",
                getSearchInfo:[]
            }
        },
        created(){
            this.handleTrendList()
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
                this.$router.push({path:'/trendAdd'})
            },
            handleTrendList(){
                this.$api.trend.getalltrendinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            deletetrend(val){
                this.$api.trend.deletetrend(val).then(res =>{
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
                    this.$options.methods.deletetrend.bind(this)(val);
                }).catch(() => {});
            }
        },
        computed: {  //参考：https://blog.csdn.net/reality_fei/article/details/105560589
            // 根据计算属性模糊搜索
            trendList () {
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
        
    }
</script>

<style>

</style>