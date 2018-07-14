<template>
            <div class="daily-menu">
              <div class="daily-menu-item"
                :class="{on:type==='recommend'}"
                @click="toRecommend"
              >每日推荐</div>
              <div class="daily-menu-item"
                :class="{on:type==='daily'}"
                @click = "showThemes = !showThemes"
              >主题日报</div>
              <ul v-show="showThemes">
                <li v-for="item in themes" :key="item.id">
                    <a href="#" :class="{on:item.id===themeId&&type==='daily'}"
                        @click="handeleToTheme(item.id)"
                    >
                      {{item.name}}
                    </a>
                </li>
              </ul>
        </div>   
</template>
<script>
    import Utils from '@/libs/utils.js'
export default {
         name:'Menu',
         data(){
          return {
            themes:[],
            showThemes:false,
            type:'recommend',
            themeId:0
          }
        },
        methods:{
            getThemes(){
                Utils.ajax('themes').then(res=>{
                    this.themes = res.others
                })
            },
            handeleToTheme(id){
               this.type = 'daily';
               this.themeId = id;
                // 触发一个事件来清空中间数据
                Utils.ajax('theme/'+id).then(res=>{
                    let list = res.stories
                    this.$emit('recList',list,'daily')
                })     
            },
            toRecommend(){
                this.type='recommend';
                this.$emit('dailyList','recommend')
            }
        },
        mounted(){
            this.getThemes()
        }
}
</script>
<style>
    .daily-menu ul{
        list-style: none;
    }
    .daily-menu ul li a{
        display: block;
        color: inherit;
        text-decoration: none;
        padding: 5px 0;
        margin: 5px 0;
        cursor: pointer;
    }
    .daily-menu ul li a:hover,.daily-menu ul li a.on{
        color: #39f;
    }
</style>


