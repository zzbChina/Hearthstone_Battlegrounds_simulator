<template>
  <div class="fight_panel" ref="combatPanel">
      <div class="container_c" ref="container">
          <div class="exit" @click="exitCombat">退出 </div>
          <!-- 敌对英雄 -->
          <div class="enemy_hero">
              <div class="chose_btn" @click="status.isSelectEnemyHero = true" v-show="!current.img">选择</div>
              <img :src="current.img" alt="" v-show="current.img">
          </div>
          <!-- 战斗辅助工具按钮 -->
          <div class="helpCombatBtn"></div>
          <!-- 随从区域 -->
          <div class="minions_panel">
              <div class="bob_minions">
                    <ul>
                        <li v-for="(e,index) of enemy_minions" :key="e.index">
                            <!-- 伤害面板 -->
                            <transition name='damage'>
                            <div class="damage_mask" v-if="e.isDamaged">
                                <img src="../assets/main/1_esports_minisite_battlegrounds_final_0806_sprit.png" alt="">
                                <div class="damage">-{{e.getDamaged}}</div>
                            </div>
                            </transition>
                            <!-- 属性面罩 -->
                          <div class="alive_mask" v-show="e.character.relive"></div>
                          <transition name="shield_show">
                          <div class="ridicule_mask" v-show="e.character.ridicule"></div>
                          </transition>
                          <div class="death_mask" v-show="e.character.death"></div>
                          <transition name="select_combo">
                          <div class="toxic_mask" v-show="e.character.toxic"></div>
                          </transition>
                          <transition name="select_combo">
                          <div class="shield_mask" v-show="e.character.shield"></div>
                          </transition>
                          <div class="wind_fury_mask" v-show="e.character.windFury"></div>

                          <div class="gold_mask" v-show="enemy_minions[index].isGold"></div>
                          <div class="level" v-show="enemy_minions[index].level">{{enemy_minions[index].level}}</div>
                          <div class="ad" v-show="enemy_minions[index].ad" ref="myMinionAd">
                              <span style="color:rgb(144, 255, 133)" v-show="(enemy_minions[index].ad > enemy_minions[index].init.ad)">{{enemy_minions[index].ad}}</span>
                              <span v-show="!(enemy_minions[index].ad > enemy_minions[index].init.ad)">{{enemy_minions[index].ad}}</span>
                              </div>
                          <div class="hp" v-show="enemy_minions[index].hp" ref="myMinionHp">
                              <span style="color:rgb(144, 255, 133)" v-show="(enemy_minions[index].hp > enemy_minions[index].init.hp)">{{enemy_minions[index].hp}}</span>
                              <span v-show="!(enemy_minions[index].hp > enemy_minions[index].init.hp)">{{enemy_minions[index].hp}}</span>
                          </div>
                          <img :src="enemy_minions[index].img" alt="">
                          
                        </li>
                    </ul>
              </div>
              <div class="my_minions">
                    <ul>
                        <li v-for="(m,index) of my_minions" :key="m.index">
                            <transition name='damage'>
                            <div class="damage_mask" v-if="m.isDamaged">
                                <img src="../assets/main/1_esports_minisite_battlegrounds_final_0806_sprit.png" alt="">
                                <div class="damage">-{{m.getDamaged}}</div>
                            </div>
                            </transition>
                            <!-- 属性面罩 -->
                          <div class="alive_mask" v-show="my_minions[index].character.relive"></div>
                          <transition name="shield_show">
                          <div class="ridicule_mask" v-show="my_minions[index].character.ridicule"></div>
                          </transition>
                          <div class="death_mask" v-show="my_minions[index].character.death"></div>
                          <transition name="select_combo">
                          <div class="toxic_mask" v-show="my_minions[index].character.toxic"></div>
                          </transition>
                          <transition name="select_combo">
                          <div class="shield_mask" v-show="my_minions[index].character.shield"></div>
                          </transition>
                          <div class="wind_fury_mask" v-show="my_minions[index].character.windFury"></div>

                          <div class="gold_mask" v-show="my_minions[index].isGold"></div>
                          <div class="level" v-show="my_minions[index].level">{{my_minions[index].level}}</div>
                          <div class="ad" v-show="my_minions[index].ad" ref="myMinionAd">
                              <span style="color:rgb(144, 255, 133)" v-show="(my_minions[index].ad > my_minions[index].init.ad)">{{my_minions[index].ad}}</span>
                              <span v-show="!(my_minions[index].ad > my_minions[index].init.ad)">{{my_minions[index].ad}}</span>
                              </div>
                          <div class="hp" v-show="my_minions[index].hp" ref="myMinionHp">
                              <span style="color:rgb(144, 255, 133)" v-show="(my_minions[index].hp > my_minions[index].init.hp)">{{my_minions[index].hp}}</span>
                              <span v-show="!(my_minions[index].hp > my_minions[index].init.hp)">{{my_minions[index].hp}}</span>
                          </div>
                          <img :src="m.img" alt="" v-show="m.img">
                        </li>
                    </ul>
              </div>
          </div>
          <!-- 开始按钮 -->
          <div class="begin_btn" @click="beginFight" ref="beginBtn">开&nbsp;始</div>
          <!-- 我的英雄 -->
          <div class="my_hero">
              <img :src="hero.img" alt="" >
              <!-- 英雄技能面板 -->
              <transition name='show_hero'>
              <div class="skill" >
                  <img :src="hero.skill.img" alt="">
              </div>
              </transition>
          </div>
      </div>

      <!-- 选择敌对英雄 -->
      <transition name='show_hero_info'>
      <div class="select_enemy_hero_panel" v-show="status.isSelectEnemyHero">
          <div class="close_btn" @click="closeChose"></div>
          <div class="box">
              <ul>
                  <li v-for='e in enemyHeros' :key='e.id' @click="openThisHero(e)">
                      <img :src="e.img" alt="">
                  </li>
              </ul>
          </div>
      </div>
      </transition>

      <!-- 英雄面板信息 -->
      <transition name='show_hero_info'>
      <div class="hero_info_panel" v-show="status.isOpenHeroInfo">
          <div class="back_btn" @click="status.isOpenHeroInfo = false">返回</div>

            <div class="name">{{current.name}}</div>
            <img :src="current.img" alt="" class="hero_img">
            <img :src="current.skill.img" alt="" class="skill_img">
            <div class="blood">{{current.health}}</div>
            <div class="skill_info">
                {{current.info}}
            </div>
            <div class="select_btn" @click="choseThisAsEnemy">选择该英雄</div>
      </div>
      </transition>
  </div>
</template>

<script>
//混入
import enemyData from '../mixin/enemy.js'

//混入随从信息
import one_minions from '../mixin/minions/level_one'
import two_minions from '../mixin/minions/level_two'
import three_minions from '../mixin/minions/level_three'
import four_minions from '../mixin/minions/level_four'
import five_minions from '../mixin/minions/level_five'
import six_minions from '../mixin/minions/level_six'

//混入公用函数
import functions from '../mixin/functions'
//混入战斗函数
import combat_func from '../mixin/combat'
export default {
    name : 'Combat',
    mixins:[
        
        one_minions,
        two_minions,
        three_minions,
        four_minions,
        five_minions,
        six_minions,

        functions,
        enemyData,
        combat_func
    ],
    data(){
        return{
            //状态
            status:{
                isSelectEnemyHero:false,
                isOpenHeroInfo : false,
                isCombating : false
            },
            current:{
                name : '',
                img:'',
                health:'',
                skill:{
                    img:'',
                    info:''
                },
            },//选择英雄的对象
            hero:{
                name : '',
                img:'',
                health:'',
                skill:{
                    type:'',
                    info:'',
                    img:''
                }
            },
            pub_info:{
                turn:1,//当前回合数
                level:1,//酒馆等级
                upNeed : 5,//升级酒馆需要的等级
                minions:[
                    
                ],//酒馆当前随从
                nextFreeRefresh : 0, //下一次免费刷新酒馆计数

                ban_arr : [],//禁用随从数组
            },
        }
    },
    methods:{
        //关闭对手选择
        closeChose(){
            this.current = {
                name : '',
                img:'',
                health:'',
                skill:{
                    img:'',
                    info:''
                },
            }
            this.status.isOpenHeroInfo = false
            setTimeout(()=>{
                this.status.isSelectEnemyHero = false
                
            },200)
        },
        //开始战斗函数
        beginFight(){
            if(!this.status.isCombating){
                this.$refs.beginBtn.classList.add('active')
                setTimeout(()=>{
                    this.$refs.beginBtn.classList.remove('active')
                },300)
                if(this.current.name == ''){
                    this.$bus.$emit('alertPanel',`先选择你要挑战的英雄`);
                }else{
                    
                    this.status.isCombating = true
                    this.selectAimToAttack.call(this)
                }
            }
            
        },
        //获得我随从的数据
        getMyMinionsData(data){
            for(let i=0;i<data.my_minions.length;i++){
                let empty = {
                    level:'',
                    name : '',
                    ad : '',
                    hp : '',
                    type : '',
                    skill:{
                        type : '',
                        
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        toxic:false,
                        ridicule:false,
                        death : false
                    },
                    init:{
                        ad:'',
                        hp: ''
                    },
                    isDamaged : false,
                    getDamaged : 0,
                    isAttacked:false,
                    img : require('../assets/card.jpg'),
                    isGold : false,
                }
                this.transferData.call(this,empty,data.my_minions[i])
                this.my_minions.push(empty)
            }
            
            this.hero = data.hero
            this.pub_info = data.pub_info
        },
        //打开这个英雄的面板信息
        openThisHero(value){
            this.current = value
            this.status.isOpenHeroInfo = true
        },
        //确定选择该英雄
        choseThisAsEnemy(){
            this.status.isOpenHeroInfo = false
            this.current.call.minions.call(this)
            
            setTimeout(()=>{
                this.status.isSelectEnemyHero = false
            },200)
        },
        //退出
        exitCombat(){
            this.$refs.container.classList.add('active');
            setTimeout(()=>{
                this.$refs.container.classList.remove('active');
                this.$refs.combatPanel.classList.add('active')
                this.current = {
                    name : '',
                    img:'',
                    health:'',
                    skill:{
                        img:'',
                        info:''
                    },
                }
                
                this.enemy_minions = []
                this.my_minions = []

                clearImmediate(this.turns)
                this.status.isCombating = false
                
                setTimeout(()=>{
                    this.$refs.combatPanel.classList.remove('active')
                    this.$bus.$emit('exitCombatPanel')
                },300)
            },1100)
        }
    },
    mounted(){
        //设置总线接受阵容的数据
        this.$bus.$on('getMyMinionsData',this.getMyMinionsData)
        
    }
}
</script>

<style lang='less'>
.fight_panel{
    position: fixed; left: 0; top: 0;
    width: 100vw;
    height: 100vh;
    background: url('../assets/main/combat_bg.png')no-repeat;
    background-size: cover;
    transition: all .2s;
    animation: showWords .3s linear 1;
    .helpCombatBtn{
        position: absolute; left:-5vw; top: 50%;
        margin: -5vw 0 0 0;
        width: 10vw;
        height: 10vw;
        background: url('../assets/main/3_minisite_ways-to-play_icon_duels1028.png')no-repeat;
        background-size: cover;
    }
    .minions_panel{
        .bob_minions,.my_minions {
            li{
                .damage_mask{
                    position: absolute; top : 1vw;
                    width: 100%;
                    height: 6vw;
                    text-align: center;
                    color: white;
                    opacity: 0;
                    animation: damage .8s ease-out 1;
                    line-height: 4vw;
                    z-index: 2;
                    img{
                        width: 100%;
                        height:100%;
                    }
                    .damage{
                        position: absolute; left: 50%; top : 50%;
                        transform : translate(-50%,-50%);
                        height: 4vw;
                        width: 100%;
                        font-weight: bold;
                        font-size: 1.6vw;
                        text-align: center;
                        color: white;
                        text-shadow: 0 0 5px black;
                        line-height: 4vw;
                    }
                    transition: all .15s;
                }
                // .damage_mask.damage{
                //     animation: damage .5s linear 1;
                // }
            }
            
        }
    }
    
}
.fight_panel.active{
    animation: fade .3s linear 1;
}

</style>