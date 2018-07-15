<template>
    <div class="daily">
        <Menu @recList="listData" @dailyList="getdailyData"/>
        <div class="daily-list" ref='listwrap'  @scroll='handleScroll'>
            <template v-if="type!=='daily'">
              <div v-for=" (list,index) in dailyList" :key="index">
                <div class="daily-date" :style="{'text-align':'center'}">{{formatDay(list.date)}} </div>       
                    <Item
                      v-for="item in list.stories"
                      :data="item"
                      :key="item.id"
                      @click.native="handleClick(item.id)"
                    />
              </div>
            </template>  
            <template v-else>
                 <Item
                    v-for="item in list"
                    :data="item"
                    :key="item.id"
                    @click.native="handleClick(item.id)"
                  />
              </template>            
         </div>
         <daily-aticle :id="articleId"></daily-aticle>
    </div>
</template>

<script>
import Menu from './components/Menu'
import Utils from '@/libs/utils.js'
import Item from './components/Item'
import DailyArticle from '@/components/Aticle'
export default {
        data(){
            return{
              list:[],
              dailyList:[],
              dailyTime:Utils.getTodayTime(),
              isLoading:false,
              type:'recommend',
              articleId:0
            }
        },
        components:{
          Menu,
          Item,
          dailyAticle:DailyArticle
        },
        methods:{
          listData(data,type){
              this.list = data
              this.type = type;
          },
          getdailyData(type){
            this.isLoading = true;
            this.type = type;
            const prevDay = Utils.prevDay(this.dailyTime+86400000);
            Utils.ajax.get('news/before/'+prevDay).then(res=>{
             this.dailyList.push(res);
             this.isLoading = false;
             if(!this.articleId){
                this.articleId = this.dailyList[0].stories[0].id
             }
           })  
          },
          formatDay(date){
            let month = date.substr(4,2);
            let day = date.substr(6,2);
            if(month.substr(0,1)==='0'){
              month = month.substr(1,1)
            }
            if(day.substr(0,1)==='0'){
              day = month.substr(1,1)
            }
            return `${month}月${day}日`
          },
          handleScroll(){
            const listwrap = this.$refs.listwrap;
               if(this.type==='daily'||this.isLoading){
                return
            }
            if(listwrap.scrollTop+document.body.clientHeight>listwrap.scrollHeight-50){
              this.dailyTime -=86400000;
              this.getdailyData()            
            }
          },
          handleClick(id){
             this.articleId = id;
          }
        },
        mounted(){
          this.getdailyData();
        }
}
</script>
<style>
    html, body{
      margin: 0;
      padding: 0;
      height: 100%;
      color: #657180;
      font-size: 16px;
    }
    .daily-menu{
      width: 150px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      background: #f5f7f9;
    }
    .daily-menu-item{
      font-size: 18px;
      text-align: center;
      margin: 5px 0px;
      cursor: pointer;
      border-right: 2px solid transparent;
      transition: all .3s ease-in-out;
    }
    .daily-menu-item:hover{
      background: #e3e8ee;
    }
    .daily-menu-item.on{
      border-right: 2px solid #39f;
    }
    .daily-list{
      width: 300px; 
      position: fixed;
      top: 0;
      bottom: 0;
      left: 150px;
      overflow: auto;
      border-right: 1px solid #d7dde4;
    }
    .daily-item{
      display: block;
      color: inherit;
      text-decoration: none;
      padding: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: all .3s ease-in-out;
    }
    .daily-item:hover{
      background: #e3e8ee;
    }
    .daily-article{
      margin-left: 450px;
      padding: 20px;
    }
    .daily-date{
      text-align: center;
      margin: 10px 0;
    }
    .daily-list{
      width: 300px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 150px;
      overflow: auto;
      border-right: 1px solid #d7dde4;
    }
</style>


