<template>
    <div>

        <van-calendar title="日历" :poppable="false" :show-confirm="false" :style="{ height: '500px' }" color="#1989fa"  @confirm="onConfirm"/>

        <van-swipe-cell id="first" v-if="show">
            <van-cell :border="false" title="买面粉" value="2020-11-06 12:00:00" />

            <template #right>
                <van-button square type="danger" text="删除" @click="delect('a')" />
            </template>
        </van-swipe-cell>

        <van-swipe-cell id="second" v-if="show">
            <van-cell :border="false" title="拿快递" value="2020-11-06 15:00:00" />

            <template #right>
                <van-button square type="danger" text="删除" @click="delect('b')"/>
            </template>
        </van-swipe-cell>

        <div class="nothing" v-if="nothingshow">
            暂无备忘
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                nothingshow: true
            }
        },
        methods: {
            delect(name) {
                //console.log(name)
                if(name == "a"){
                    var delectDom = document.getElementById("first") 
                }else{
                    delectDom = document.getElementById("second")
                }
                delectDom.style.display = "none"
            },
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            onConfirm(date) {
                //console.log(this.formatDate(date))
                if(this.formatDate(date) == "2020-11-6"){
                    this.show = true
                    this.nothingshow = false
                } else {
                    this.show = false
                    this.nothingshow = true
                }
            }
        },
        
    }
</script>

<style>
.nothing{
    height: 44px;
    font-size: 0.75rem;
    color: rgb(168, 168, 168);
    text-align: center;
    line-height: 44px;
}
</style>