<template>
    <div>

        <van-nav-bar :title="cookingForm.c_title" left-arrow @click-left="onClickLeft"/>

        <div id="cookinginfo">

            <!-- 图片 -->
            <div><img :src="link+cookingForm.c_image" width="100%"/> </div>

            <!-- 文字 -->
            <div style="padding-top: 0.8rem">
                <div>
                    <div class="cookinginfo_title"><van-icon name="stop" /> 简介</div>
                    <div class="cookinginfo_commom">{{cookingForm.c_synopsis}}</div>
                </div>

                <div>
                    <div class="cookinginfo_title"><van-icon name="stop" /> 需要材料</div>
                    <div class="cookinginfo_stuff">
                        <van-row>
                            <van-col span="12">{{cookingForm.stuff.s_1}}</van-col>
                            <van-col span="12">{{cookingForm.stuff.s_2}}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="12">{{cookingForm.stuff.s_3}}</van-col>
                            <van-col span="12">{{cookingForm.stuff.s_4}}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="12">{{cookingForm.stuff.s_5}}</van-col>
                            <van-col span="12">{{cookingForm.stuff.s_6}}</van-col>
                        </van-row>
                    </div>
                </div>

                <div>
                    <div class="cookinginfo_title"><van-icon name="stop" /> 比例图例</div>
                    <div><canvas id="myChart" width="370" height="260"></canvas></div>
                </div>

                <div>
                    <div class="cookinginfo_title"><van-icon name="stop" /> 步骤</div>
                    <div class="cookinginfo_commom">{{cookingForm.c_step}}</div>
                </div>

                <div class="cookinginfo_date">- 更新于 {{cookingForm.c_date}} -</div>
            </div>

        </div>

    </div>
</template>

<script>
import F2 from "@antv/f2"

    export default {
        data() {
            return {
                link: '',
                cookingForm:{
                    stuff:{} 
                },
                data : [
                    { genre: '', sold: 0 },
                    { genre: '', sold: 0 },
                    { genre: '', sold: 0 },
                    { genre: '', sold: 0 },
                    { genre: '', sold: 0 },
                    { genre: '', sold: 0 },
                ]
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('cookinginfo').style.height=winHeight-46 +'px'
            //this.getonecooking(this.$route.params.id)
            setTimeout(() => {
                this.chart()
            },1300)
        },
        created() {
            this.getonecooking(this.$route.params.id)
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getonecooking(c_id){
                this.$api.cooking.getonecookinginfo(c_id).then(res =>{
                    //console.log(res.data.onecookinginfo)
                    if(res.code==1){
                        this.cookingForm = res.data.onecookinginfo
                        this.link = this.$link.linkURL
                        var stuffdata = res.data.onecookinginfo.stuff

                        var s1 = stuffdata.s_1.indexOf("-")
                        var s1genre = stuffdata.s_1.substring(0, s1)
                        //console.log(s1genre)
                        this.data[0].genre = s1genre

                        var s1index = stuffdata.s_1.lastIndexOf("-")
                        var s1indexsub = stuffdata.s_1.substring(s1index+1, stuffdata.s_1.length)
                        var s1sub = s1indexsub.indexOf("g")
                        var s1sold = s1indexsub.substring(0, s1sub)
                        //console.log(s1sold)
                        this.data[0].sold = Number(s1sold)


                        var s2 = stuffdata.s_2.indexOf("-")
                        var s2genre = stuffdata.s_2.substring(0, s2)
                        //console.log(s2genre)
                        this.data[1].genre = s2genre

                        var s2index = stuffdata.s_2.lastIndexOf("-")
                        var s2indexsub = stuffdata.s_2.substring(s2index+1, stuffdata.s_2.length)
                        var s2sub = s2indexsub.indexOf("g")
                        var s2sold = s2indexsub.substring(0, s2sub)
                        //console.log(s2sold)
                        this.data[1].sold = Number(s2sold)


                        var s3 = stuffdata.s_3.indexOf("-")
                        var s3genre = stuffdata.s_3.substring(0, s3)
                        //console.log(s3genre)
                        this.data[2].genre = s3genre

                        var s3index = stuffdata.s_3.lastIndexOf("-")
                        var s3indexsub = stuffdata.s_3.substring(s3index+1, stuffdata.s_3.length)
                        var s3sub = s3indexsub.indexOf("g")
                        var s3sold = s3indexsub.substring(0, s3sub)
                        //console.log(s3sold)
                        this.data[2].sold = Number(s3sold)


                        var s4 = stuffdata.s_4.indexOf("-")
                        var s4genre = stuffdata.s_4.substring(0, s4)
                        //console.log(s4genre)
                        this.data[3].genre = s4genre

                        var s4index = stuffdata.s_4.lastIndexOf("-")
                        var s4indexsub = stuffdata.s_4.substring(s4index+1, stuffdata.s_4.length)
                        var s4sub = s4indexsub.indexOf("g")
                        var s4sold = s4indexsub.substring(0, s4sub)
                        //console.log(s4sold)
                        this.data[3].sold = Number(s4sold)


                        var s5 = stuffdata.s_5.indexOf("-")
                        var s5genre = stuffdata.s_5.substring(0, s5)
                        //console.log(s5genre)
                        this.data[4].genre = s5genre

                        var s5index = stuffdata.s_5.lastIndexOf("-")
                        var s5indexsub = stuffdata.s_5.substring(s5index+1, stuffdata.s_5.length)
                        var s5sub = s5indexsub.indexOf("g")
                        var s5sold = s5indexsub.substring(0, s5sub)
                        //console.log(s5sold)
                        this.data[4].sold = Number(s5sold)


                        var s6 = stuffdata.s_6.indexOf("-")
                        var s6genre = stuffdata.s_6.substring(0, s6)
                        //console.log(s6genre)
                        this.data[5].genre = s6genre

                        var s6index = stuffdata.s_6.lastIndexOf("-")
                        var s6indexsub = stuffdata.s_6.substring(s6index+1, stuffdata.s_6.length)
                        var s6sub = s6indexsub.indexOf("g")
                        var s6sold = s6indexsub.substring(0, s6sub)
                        //console.log(s6sold)
                        this.data[5].sold = Number(s6sold)

                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            chart(){

                // 创建 Chart 对象
                const chart = new F2.Chart({
                    id: 'myChart',
                    pixelRatio: window.devicePixelRatio // 指定分辨率
                });

                // 载入数据源
                //console.log(this.data);
                chart.source(this.data);
                chart.changeData(this.data);

                // 创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
                chart.interval().position('genre*sold').color('genre');

                // 渲染图表
                chart.render();
            }
        },
        
    }
</script>

<style>

#cookinginfo{
    overflow: scroll;
}

.cookinginfo_title{
    font-size: 0.82rem;
    font-weight: bold
}
.cookinginfo_commom{
    font-size: 0.78rem;
    line-height: 25px;
    color: #272727;
    padding: 0.4rem 0.8rem
}
.cookinginfo_stuff{
    font-size: 0.78rem;
    line-height: 38px;
    text-align: center;
    color: #272727;
    padding: 0.4rem 0.8rem
}
.cookinginfo_date{
    height: 44px;
    font-size: 0.7rem;
    color: rgb(168, 168, 168);
    text-align: center;
    line-height: 44px
}

</style>