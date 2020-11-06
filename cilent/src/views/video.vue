<template>
    <div>

        <van-nav-bar title="视频"/>

        <van-search v-model="searchCarInfo" placeholder="请输入搜索关键词" />

        <div id="video_list">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">

                <div v-for="(video,index) in mediaList" :key="index">

                    <!-- 头像区域 -->
                    <div class="video_heard">
                        <div class="video_user_image">
                            <img :src="link+video.user.u_image"/>
                        </div>

                        <div class="video_user_info">
                            <div style="font-size: 0.8rem; font-weight: bold; color: #323233">{{video.user.u_name}}</div>
                            <div style="font-size: 0.65rem; color: #a8a8a8">{{video.m_date}}</div>
                        </div>
                    </div>
                    

                    <!-- 视频 -->
                    <div>
                        <video style="width: 100%;" :src="link+video.m_video" controls="controls"></video>
                    </div>

                    <!-- 视频信息 -->
                    <div class="vidoeinfo">
                        <div class="vidoeinfo_title">{{video.m_title}}</div>
                        <div class="vidoeinfo_synopsis">{{video.m_synopsis}}</div>
                        <div class="vidoeinfo_icon">
                            <van-row>
                                <van-col span="4"><van-icon name="star-o" /> 收藏</van-col>
                                <van-col span="4"><van-icon name="flower-o" /> 鲜花</van-col>
                                <van-col style="padding-left: 10rem" span="16"><van-icon name="like-o" /> {{video.m_like}}</van-col>
                            </van-row>
                        </div>
                    </div>
                    
                </div>

            </van-pull-refresh>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                link: this.$link.linkURL,
                getSearchInfo: [],
                searchCarInfo: "",
                isRefresh:false,
            }
        },
        created(){
            this.handleMediaList();
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('video_list').style.height=winHeight-46-54-50 +'px'
        },
        methods: {
            handleMediaList(){
                this.$api.media.getallvideoinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                        
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    //this.getSearchInfo=[];
                    this.handleMediaList();
                }, 500);
            },
        },
        computed: {
            // 根据计算属性模糊搜索
            mediaList () {
                const searchCarInfo = this.searchCarInfo
                if (searchCarInfo) {
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
                            return String(data[key]).toLowerCase().indexOf(searchCarInfo) > -1
                        })
                    })
                }
                return this.getSearchInfo
            }
        } 
        
    }
</script>

<style>

#video_list {
    overflow: scroll;
}

.video_heard{  
    padding:0.8rem;
    display: flex
}
.video_user_image{
    display: flex;
    flex: 2
}
.video_user_image img{
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50px 50px 50px 50px
}
.video_user_info{  
    display: flex;
    flex: 8;
    flex-direction: column;
    justify-content: space-around
}

.vidoeinfo{
    padding-bottom: 0.1rem;
    border-bottom: 0.5px solid rgb(243, 243, 243)
}
.vidoeinfo_title{
    font-size: 0.8rem;
    text-align: center;
    font-weight: bold;
    padding: 0.4rem
}
.vidoeinfo_synopsis{
    font-size: 0.75rem;
    color: #a8a8a8;
    padding: 0 0.4rem 0.8rem 0.4rem
}
.vidoeinfo_icon{
    font-size: 0.75rem;
    padding: 0 0.4rem 0.5rem 0.4rem;
}

</style>