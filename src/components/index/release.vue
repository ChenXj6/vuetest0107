<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Announcement.News')" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <div>
      <div class="releaselist" v-for="(item,index) in newlist" :key="index" @click="detail(item.id)">
        <p>{{item.title}}</p>
        <!-- <p v-html="item.detail"> -->
        <!-- </p> -->
        <!-- <p class="mt2 times">{{item.createtime}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            page:1,
            newlist:''
        }
    },
    mounted(){
       this.news()
    },
  methods: {
    onClickLeft() {
     this.$router.go(-1)
    },
    detail(e){
        this.$router.push({name:'detail',query:{id:e}})
    },
    news(){
        this.$api.Post('news',{page:this.page}).then(res=>{
            if(res.status==1){
                this.newlist=res.result.news;
            }
      })
    }
  }
};
</script>

<style lang="less">
.releaselist {
  padding: 20px;
  background: url("../../assets/arrow.png") no-repeat right center;
  border-bottom: 1px #eeeeee solid;
  > p:nth-child(1) {
    font-size: 0.426667rem;
    font-weight: 500;
  }
  > p:nth-child(2) {
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: justify;
    color: #1a73e7 !important;
  }
  .times{
      color: rgba(0, 0, 0, 0.3);
      font-size: 14px;
  }
}
</style>