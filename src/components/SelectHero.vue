<template>
  <div class="select_hero_panel">
        <!-- 关闭按钮 -->
        <div class="close_btn" @click="closeSelectHero"></div>

        <!-- 英雄界面 -->
        <div class="heros_panel">
            <ul>
                <li v-for="h in this.heros" :key="h.index" @click="openThisMsg(h)">
                    <img :src="h.img" alt="">
                </li>
            </ul>
        </div>

        <!-- .英雄详细信息界面 -->
        <transition name='show_hero_info'>
        <div class="the_detail_msg" v-show="isShowDetail">
            <div class="back_btn" @click="isShowDetail = false">返回</div>
            <div class="name">{{current.name}}</div>
            <img :src="current.img" alt="" class="hero_img">
            <img :src="current.skill.img" alt="" class="skill_img">
            <div class="blood">{{current.health}}</div>
            <div class="skill_info">
                {{current.skill.info}}
            </div>
            <div class="select_btn" @click="choseThisHero">选择该英雄</div>
        </div>
        </transition>

        
  </div>
</template>

<script>
//混入
import heroData from '../mixin/heros.js'
export default {
    name : 'SelectHero',
    props:['pub_info'],
    data(){
        return{
            current:{
                name : '',
                img:'',
                health:'',
                skill:{
                    img:'',
                    info:''
                },
            },
            isShowDetail:false,
        }
    },
    mixins:[heroData],
    methods:{
        //关闭
        closeSelectHero(){
            this.$bus.$emit('closeSelectHero',false)
        },
        //选择该英雄作为我的英雄
        openThisMsg(value){
            for(let i=0;i<2;i++){
                if(this.pub_info.ban_arr[i] == '龙'){
                    if(value.name == '阿莱克丝塔萨' || value.name == '伊瑟拉'){
                        this.$bus.$emit('alertPanel',`龙已被禁用`)
                        return
                    }
                }
                if(this.pub_info.ban_arr[i] == '野猪人'){
                    if(value.name == '亡语者布莱克松'){
                        this.$bus.$emit('alertPanel',`野猪人已被禁用`)
                        return
                    }
                }
                if(this.pub_info.ban_arr[i] == '鱼人'){
                    if(value.name == '菌菇术士弗洛格尔'){
                        this.$bus.$emit('alertPanel',`鱼人已被禁用`)
                        return
                    }
                }
                if(this.pub_info.ban_arr[i] == '恶魔'){
                    if(value.name == '加拉克苏斯大王'){
                        this.$bus.$emit('alertPanel',`恶魔已被禁用`)
                        return
                    }
                }
                if(this.pub_info.ban_arr[i] == '元素'){
                    if(value.name == '齐恩瓦拉'){
                        this.$bus.$emit('alertPanel',`元素已被禁用`)
                        return
                    }
                }
                if(this.pub_info.ban_arr[i] == '海盗'){
                    if(value.name == '海盗帕奇斯'){
                        this.$bus.$emit('alertPanel',`海盗已被禁用`)
                        return
                    }
                }
                if(i == 1){
                    this.current = value
                    this.isShowDetail = true;
                }
            }
        },
        //选择这个英雄
        choseThisHero(){
            this.isShowDetail = false
            setTimeout(
                ()=>{
                    this.$bus.$emit('addMyHeroMsg',this.current)
                },300
            )
        }
    },
    mounted(){

    }
}
</script>

<style lang='less'>
.select_hero_panel{
    position: fixed; left: 0; top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8); 
    transition: all .2s;
    .close_btn{
        position: absolute;right: 5vw; top: 5vw;
        width: 30px;
        height: 30px;
        font-size: 30px;
        color: rgb(177, 0, 0);
    }
    .heros_panel{
        position: absolute; top: 8vh; left: 15vw;
        width: 70vw;
        height: 84vh;
        background: url('../assets/main/container.jpg')no-repeat;
        background-size: cover;
        box-sizing: border-box;
        border-radius: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        border: 1vw solid rgb(85, 40, 3);
        ul{
            position: absolute; left: 0; top: 0;
            margin: 2vw 0 0 0;
            li{
                float: left;
                margin: 0vw 0 2vw 3vw;
                width: 10vw;
                height: 10vw;
                img{
                    width: 100%;
                    height: 100%;
                    border: 1vw solid rgb(94, 7, 86);
                    box-sizing: border-box;
                    border-radius: 10px;
                    box-shadow: 0 3px 5px rgb(54, 54, 54);
                }
            }
        }
    }
    .the_detail_msg{
        position: absolute; top: 8vh; left: 15vw;
        width: 70vw;
        height: 84vh;
        background: url('../assets/main/container.jpg')no-repeat;
        background-size: cover;
        box-sizing: border-box;
        border-radius: 10px;
        transition: all .3s;
        border: 1vw solid rgb(85, 40, 3);
        .back_btn{
            position: absolute; left: 2vw; top: 2vw;
            width: 6vw;
            height: 2vw;
            font-size: 2vw;
            color: rgb(85, 51, 0);
        }
        .name{
            position: absolute; left: 50%; top : 1vh;
            margin: 0 0 0 -15vw;
            width: 30vw;
            height: 5vw;
            line-height: 5vw;
            text-align: center;
            font-size: 1.8vw;
            font-weight: bold;
            color: rgb(59, 22, 0);
        }
        .blood{
            position: absolute;left: 27vw; top: 12vh;
            margin: 9vw 0 0 0;
            width: 4vw;
            height: 4vw;
            box-sizing: border-box;
            border: 2px solid rgb(109, 0, 0);
            background: linear-gradient(to bottom right,red,rgb(131, 0, 0));
            box-shadow: 1px 2px 5px black;
            color: white;
            line-height: 3.1vw;
            font-weight: bolder;
            font-size: 1vw;
            border-radius: 50%;
            text-align: center;
        }
        .hero_img{
            position: absolute; left: 50%; top: 12vh;
            margin: 0 0 0 -6vw;
            width: 12vw;
            height: 12vw;
            border-radius: 1vw;
            box-shadow: 0 0 10px black;
        }
        .skill_img{
            position: absolute; left: 45vw; top: 16vh;
            width: 10vw;
            height: 10vw;
            box-sizing: border-box;
            border: 1vw solid rgb(94, 61, 0);
            border-radius: 50%;
            box-shadow: 2px 2px 5px rgb(56, 56, 56);
        }
        .skill_info{
            position: absolute; left: 20vw; top: 42vh;
            width: 30vw;
            height: 10vw;
            font-weight: bolder;
            font-size: 1.5vw;
        }
        .select_btn{
            position: absolute; left: 25vw ; bottom: 3vw;
            width: 20vw;
            height: 5vw;
            text-align: center;
            line-height: 5vw;
            font-size: 2vw;
            border-radius: 10px;
            cursor: pointer;
            color: white;
            background: rgb(114, 4, 4);
            box-shadow: 0 2px 5px black;
        }
    }
}
</style>