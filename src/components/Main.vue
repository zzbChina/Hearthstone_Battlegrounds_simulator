<template>
  <div class="main_panel">
      <div class="container" >
          
          <!-- 鲍勃区域面板 -->
          <div class="pub" @click="cancelPurchase">
              <!-- 查看阵容板块 -->
              <div class="check_my_team" @click="checkMyTeam" v-show="pub_info.turn > 0">我的阵容</div>
              <div class="remake" @click="remake"></div>
              <!-- 战斗按钮 -->
              <div class="combat_btn" @click="combatFunction">战斗</div>
              <!-- 问题板块 -->
              <div class="question" @click="openQuestion('open')"></div>
              <!-- 查看禁用板块 -->
              <div class="check_ban">
                  
                  <div class="panel">{{pub_info.ban_arr[0]}},{{pub_info.ban_arr[1]}}</div>
              </div>
              <!-- 升级酒馆需要的铸币 -->
              <div class="up_need" @click="upPubLevel" ref="upNeedBtn">
                  <div class="sign"></div>
                  {{pub_info.upNeed}}
              </div>
              <!-- 酒馆头像 -->
              <div class="bob">
                  <img :src="require('../assets/main/bob.png')" alt="" @click="cancelPurchase">
                  <div class="level">{{pub_info.level}}</div>
                  <transition name='bob_say'>
                  <div class="bob_words" v-show="bob.say">{{bob.msg}}</div>
                  </transition>
              </div>

              <!-- 刷新按钮 -->
              <div class="refresh_btn" ref="refresh_btn" @click="refresh">
                  <div class="coin">
                      <span v-show="!pub_info.nextFreeRefresh">1</span>
                      <span style="color:green" v-show="pub_info.nextFreeRefresh">0</span>
                  </div>
                  <div class="sign"></div>
              </div>

              <!-- 冷冻按钮 -->
              <div class="freeze_btn" @click="freezeMinionsFunction" ref="freeze_btn">
                  <div class="sign"></div>
              </div>
          </div>

          <!-- 随从区域面板 -->
          <div class="minions_panel">
              <div class="bob_minions">
                  <ul class="bob">
                      <!-- <transition-group name="pub_minions"> -->
                      <li v-for="(b,index) in 7" :key="b.index" ref="bobM" @click="openMinionMask(index)">
                          <!-- 属性面罩 -->
                          <div class="alive_mask" v-show="bob_minions[index].character.relive"></div>
                          <div class="ridicule_mask" v-show="bob_minions[index].character.ridicule"></div>
                          <div class="death_mask" v-show="bob_minions[index].character.death"></div>
                          <div class="toxic_mask" v-show="bob_minions[index].character.toxic"></div>
                          <div class="shield_mask" v-show="bob_minions[index].character.shield"></div>
                          <div class="wind_fury_mask" v-show="bob_minions[index].character.windFury"></div>
                          <div class="info_mask" ref="bobMInfo">
                                        <span class="name">{{bob_minions[index].name}}</span>
                              <br>
                                        {{bob_minions[index].skill.info}}
                          </div>
                          <div class="gold_mask" v-show="bob_minions[index].isGold"></div>
                          <div class="level" v-show="bob_minions[index].level">{{bob_minions[index].level}}</div>
                          <div class="ad" v-show="bob_minions[index].ad">
                              <span style="color:rgb(144, 255, 133)" v-show="(bob_minions[index].init.ad < bob_minions[index].ad)">{{bob_minions[index].ad}}</span>
                              <span v-show="!(bob_minions[index].init.ad < bob_minions[index].ad)">{{bob_minions[index].ad}}</span>
                              </div>
                          <div class="hp" v-show="bob_minions[index].hp">
                              <span style="color:rgb(144, 255, 133)" v-show="(bob_minions[index].init.hp < bob_minions[index].hp)">{{bob_minions[index].hp}}</span>
                              <span v-show="!(bob_minions[index].init.hp < bob_minions[index].hp)">{{bob_minions[index].hp}}</span>
                          </div>
                          <img :src="bob_minions[index].img" alt="" >
                          <!-- 冷冻面板 -->
                          <transition name = 'freeze'>
                          <div class="freeze_mask" v-show="bob_minions[index].isFreeze"></div>
                          </transition>
                          <!-- 购买随从面板 -->
                          <div class="purchase_mask" ref="purchase_mask">
                              <!-- 购买按钮 -->
                              <div class="purchase_btn" @click="purchaseMinion(index)">购买</div>
                          </div>

                          
                      </li>
                      <!-- </transition-group> -->
                  </ul>
              </div>
              <div class="my_minions">
                  
                  <ul class="my">
                      <li v-for="(m,index) of 7" :key="m.index" @click="openMyMinionsMsg(index)" ref="myM">
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
                          <img :src="my_minions[index].img" alt="">
                          <!-- 出售随从和交换随从位置面板 -->
                          <div class="sell_change_mask" ref="sell_change_mask">
                              <!-- 出售按钮 -->
                              <div class="sell_btn" @click="sellThisMinion(index)">出售</div>
                              <div class="change_btn" @click="changeMinionsPlace(index)" v-show="index">交换</div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>

          <!-- 玩家区域面板 -->
          <div class="player">
              <transition name='show_hero_skill_info'>
              <div class="hero_info" v-show="my.isCheckHeroInfo">
                  <div class="name">{{hero.name}}</div>
                  <div class="skill_info">
                      {{hero.skill.info}}<span v-if="hero.name == '克苏恩'">重复{{hero.skill.level}}次</span>
                  </div>
              </div>
              </transition>
              <div class="hero">
                  <button @click="selectHero(true)" v-show="!hero.img">选择英雄</button>
                  <transition name='show_hero'>
                  <img :src="hero.img" alt="" v-show="hero.img" @mouseover="checkHeroInfo" @mouseout="my.isCheckHeroInfo = false">
                  </transition>
                  <div class="blood" v-show="hero.health">
                      
                      <span>{{hero.health}}</span></div>
              </div>
              <!-- 英雄技能面板 -->
              <transition name='show_hero'>
              <div class="skill" @click="startMySkill" v-show="hero.skill.use">
                  <div class="needCoin">{{hero.skill.need}}</div>       
                  <img :src="hero.skill.img" alt="" v-show="hero.skill.img">
              </div>
              </transition>
              <!-- 铸币面板 -->
              <div class="money">
                  <div class="now_number">-{{my.money}}-</div>
                  <ol>
                      <li v-for="m in 10" :key="m" >
                          
                      </li>
                  </ol>
                  <ul>
                      
                      <transition-group name="pub_minions">
                      <li v-for="m in my.money" :key="m">
                          
                      </li>
                      </transition-group>
                      
                  </ul>
                  
              </div>
          </div>

          <!-- 回合板块 -->
          <div class="turns">
              <!-- 当前回合数 -->
              <div class="pre_turn">第{{pub_info.turn}}回合</div>
              <!-- 下一回合 -->
              <div class="next_turn" @click="goNextTurn" ref="next_btn">下一回合</div>
          </div>

          <!-- 我的手牌板块 -->
          <div class="my_hands" @click="openMyHands('open')" ref="my_hands">
              <div class="pre_chose_item">选中:{{my.selectItemName}}</div>
              <div class="status" v-show="status.isPutMinions">信息：{{my.selectItInfo}}</div>
              <ul>
                  <li v-for="(h,index) in this.my.hands" :key="h.index" @click="putIntoField(index)">
                        <div class="gold_mask" v-show="h.isGold"></div>
                        <div class="select_mask"></div>
                        <div class="level" v-show="h.level">{{h.level}}</div>
                        <div class="ad" v-show="h.ad">{{h.ad}}</div>
                        <div class="hp" v-show="h.hp">{{h.hp}}</div>
                        <img :src="h.img" alt="">
                        
                  </li>
              </ul>
              <!-- 随从放置面板 -->
              <div class='put_minions' v-show="status.isPutMinions">
                  <ol>
                      <li v-for="(m,index) in 7" :key="m.index" @click.stop="putInHere(index)">
                          <div class="gold_mask" v-show="my_minions[index].isGold"></div>
                          <img :src="my_minions[index].img" alt="">
                      </li>
                  </ol>
              </div>

              <!-- 关闭手牌板块按钮 -->
              <button class="close_my_hands" @click.stop="openMyHands('close')">关闭</button>
          </div>

            <!-- 三连奖励选择面板 -->
            <transition name='select_combo'>
            <div class="select_combo_panel" v-show="status.isSelectCombo && !status.isSelectMinionsPlace" >
                <ul>
                    <li v-for="(s,index) in selectCombo" :key="s.index" @click="choseThisGift(index)">
                        <img :src="s.img" alt="">
                        <div class="ad">{{s.ad}}</div>
                        <div class="hp">{{s.hp}}</div>
                    </li>
                </ul>
            </div>
            </transition>

           
      </div>
      <!-- 阵容面板 -->
      <transition name ='team_animate'>
      <div class="report_panel" v-show="status.isShowReport ">
            <div class="bg_img">
                <img src="../assets/main/report.jpg" alt="" >
                    <div class="my_minions">
                        
                        <ul class="my">
                            <li v-for="(m,index) of 7" :key="m.index" ref="myM">
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
                                <img :src="my_minions[index].img" alt="">
                            </li>
                        </ul>
                    </div>
            
                <!-- 关闭按钮 -->
                <div class="close_btn" @click="status.isShowReport = false"></div>
                
                <div class="all_info">
                    <div class="your_hero">
                        <ul>
                            <li>
                                <div class="title">你的英雄</div>
                                <div class="box">
                                    <img :src="hero.img" alt="" v-show="hero.img">
                                </div>
                            </li>
                            <li>
                                <div class="title">总回合数</div>
                                <div class="box">{{pub_info.turn}}</div>
                            </li>
                            <li>
                                <div class="title">三连次数</div>
                                <div class="box">{{all_info.combo}}</div>
                            </li>
                            <li>
                                <div class="title">消耗金币</div>
                                <div class="box">{{all_info.cost}}</div>
                            </li>
                            <li>
                                <div class="title">购买随从</div>
                                <div class="box">{{all_info.buy_time}}</div>
                            </li>
                            <li>
                                <div class="title">总攻击力</div>
                                <div class="box">{{all_info.all_ad}}</div>
                            </li>
                            <li>
                                <div class="title">总生命值</div>
                                <div class="box">{{all_info.all_hp}}</div>
                            </li>
                            <li>
                                <div class="title">攻击成长</div>
                                <div class="box">{{all_info.add_grown}}</div>
                            </li>
                            <li>
                                <div class="title">生命成长</div>
                                <div class="box">{{all_info.hp_grown}}</div>
                            </li>
                            <li>
                                <div class="title">平均属性</div>
                                <div class="box">{{all_info.equal_ad}}/{{all_info.equal_hp}}</div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
      
        </div>
      </transition>
      <!-- 英雄选择面板 -->
      <transition name='show_hero_info'>
      <SelectHero v-show="status.isSelectHero" v-bind:pub_info = 'pub_info'/>
      </transition>

      <!-- 战斗面板 -->
      <Combat v-show="status.isCombat"/>

      <!-- 打开关于程序界面 -->
      <transition name='show_hero_info'>
      <Question v-show="status.isShowQuestion"/>
      </transition>

       <!-- 随从位置交换面板 -->
        <div class="change_minions_place_panel" v-show="status.isSelectMinionsPlace">
            <div class="copy_place">
                <ul>
                    <li v-for="(b,index) in 7" :key="b.index" @click="selectAllMinions(index)"></li>
                </ul>
                <ol>
                    <li v-for="(m,index) in 7" :key="m.index" @click="changeToThis(index)"></li>
                </ol>
            </div>
        </div>

      
  </div>
</template>

<script>
import SelectHero from './SelectHero.vue'
import Question from './Question.vue'
import Combat from './Combat.vue'

//混入随从信息
import one_minions from '../mixin/minions/level_one'
import two_minions from '../mixin/minions/level_two'
import three_minions from '../mixin/minions/level_three'
import four_minions from '../mixin/minions/level_four'
import five_minions from '../mixin/minions/level_five'
import six_minions from '../mixin/minions/level_six'

import Minions from '../mixin/minions_place'
//混入道具卡
import prop_card from '../mixin/prop_card'
//混入公用函数
import functions from '../mixin/functions'
export default {
    name : 'Main',
    mixins:[
        one_minions,
        two_minions,
        three_minions,
        four_minions,
        five_minions,
        six_minions,
        functions,
        Minions,
        prop_card
    ],
    components : {
        SelectHero,
        Question,
        Combat
    },
    data(){
        return {
            status : {
                isSelectHero:false,
                isCanNextTurn : true,
                isCheckMinions : false,
                isPutMinions:false,
                isSelectCombo : false,
                isFreezeMinions : false,
                isShowQuestion:false,//关于面板显示状态
                isSelectMinionsPlace:false,//交换随从位置
                isSingleCry : false,
                isUsePropCard : false, // 道具卡使用状态

                //选择所有随从转台
                isSelectAllMinions : false,

                isShowReport : false, //查看我的阵容
                isCombat : false,
                isSelectFish:0,
                isSelectDragon:0
            },
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
            //我的信息
            my:{
                selectItemName : '',
                selectItInfo : '',
                money:3,
                hands:[],
                changeIndex : '',
                putOriginIndex : '',
                propCardIndex : '',//道具卡的索引
                //选择所有随从的战吼随从的索引
                allSelectMinionIndex : '',

                heroChose:false,

                isCheckHeroInfo:false,

            },
            //随从池
            minions_pool:{
                one : [],
                two : [],
                three : [],
                four : [],
                five : [],
                six : [],
            },
            //副本随从池
            copy_pool:{
                one : [],
                two : [],
                three : [],
                four : [],
                five : [],
                six : [],
            },
            //放置对象
            alreadyMinion : {
                index:'',
                name : '',
                ad : '',
                hp : '',
                skill : '',
                character:{
                    shield:false,
                    windFury:false,
                    death:false,
                    ridicule:false,
                    relive:false,
                    toxic:false
                },
                init:{
                    ad:'',
                    hp:''
                },
                isGold:false,
                img : ''
            },
            //缓存三连材料数据
            material:[
                {
                    ad:'',
                    hp:''
                },
                {
                    ad:'',
                    hp:''
                },
                {
                    windFury:false,
                    shield:false,
                    ridicule:false,
                    toxic:false,
                    death:false,
                    relive:false
                }
            ],
            bob:{
                say:false,
                msg : ''
            },
            selectCombo:[],
            //回收魔灵计数器
            theCountOfMoLin:true,
            
            //打包信息
            all_info:{
                all_ad:0,
                all_hp:0,
                buy_time:0,
                cost:0,
                combo:0,
                add_grown:0,
                hp_grown:0,
                equal_ad:0,
                equal_hp:0
            },
            //布莱恩
            getTongxu:0

        }
    },
    methods:{
        combatFunction(){ 
            if(this.hero.name == ''){
                this.$bus.$emit('alertPanel',`先选择英雄`);
            }else{
                let info = {
                    hero : this.hero,
                    pub_info : this.pub_info,
                    my_minions: []
                }
                for(let i=0;i<7;i++){
                    if(this.my_minions[i].name != ''){
                        info.my_minions.push(this.my_minions[i])
                    }
                }
                this.$bus.$emit('getMyMinionsData',info)
                this.status.isCombat = true
            }
            
        },
        //查看英雄的信息
        checkHeroInfo(){
            this.my.isCheckHeroInfo = true
        },
        //重新开始
        remake(){
            this.$bus.$emit('remakeBtn')
        },
        //打开我的阵容面板
        checkMyTeam(){
            if(this.pub_info.turn <= 1){
                this.$bus.$emit('alertPanel',`先进行一个回合再查看`);
            }else{
                this.all_info.all_ad = 0
                this.all_info.all_hp = 0
                let num = 0
                for(let i=0;i<7;i++){
                    if(this.my_minions[i].name != ''){
                        this.all_info.all_ad += this.my_minions[i].ad
                        this.all_info.all_hp += this.my_minions[i].hp
                        num ++
                    }
                }
                this.all_info.add_grown = Math.floor(this.all_info.all_ad / this.pub_info.turn)
                this.all_info.hp_grown = Math.floor(this.all_info.all_hp / this.pub_info.turn)

                this.all_info.equal_ad = Math.floor(this.all_info.all_ad / num)
                this.all_info.equal_hp = Math.floor(this.all_info.all_hp / num)
                this.status.isShowReport = true
            }
        },
        //战吼选择所有随从
        selectAllMinions(index){
            if(this.status.isSelectAllMinions){
                if(this.my_minions[this.my.allSelectMinionIndex].name == '海鲜投喂者'){
                    this.my_minions[this.my.allSelectMinionIndex].skill.done.call(this,'bob',index);//触发战吼随从的done
                }
            }
        },
        //移动到这个位置上
        changeToThis(index){
            //如果是放置随从状态执行该语句
            if(this.my.changeIndex != ''){
                //如果是本位置上的东西，则直接退出
                if(index == this.my.changeIndex){
                    //清除临时对象index的数据
                    this.$refs.sell_change_mask[this.my.changeIndex].style.display = 'none'
                    this.my.changeIndex = ''
                    this.status.isSelectMinionsPlace = false;
                }else{
                    let tempOb = {
                        name : '',
                        ad : '',
                        hp : '',
                        level : '',
                        type : '',
                        isGold : false,
                        skill : '',
                        character:{
                            shield:false,
                            windFury:false,
                            death:false,
                            ridicule:false,
                            relive:false,
                            toxic:false
                        },
                        init:{
                            ad : '',
                            hp  :''
                        },
                        img : require('../assets/card.jpg')
                    }
                    //将要被交换位置的随从数据赋值给临时对象
                    this.transferData.call(this,tempOb,this.my_minions[index]);
                    //将要交换位置的随从数据转移到被交换随从的位置
                    this.transferData.call(this,this.my_minions[index],this.my_minions[this.my.changeIndex]);
                    this.transferData.call(this,this.my_minions[this.my.changeIndex],tempOb);
                    //清除临时对象index的数据
                    this.$refs.sell_change_mask[this.my.changeIndex].style.display = 'none'
                    this.my.changeIndex = ''
                    this.status.isSelectMinionsPlace = false;
                }
            }
            //如果是单目标选择放置战吼执行以下语句
            else if(this.my.putOriginIndex >= 0 && this.my.putOriginIndex !== ''){
                if(this.my_minions[this.my.putOriginIndex].name == '石塘猎人' || this.my_minions[this.my.putOriginIndex].name == '纳斯雷兹姆监工'
                || this.my_minions[this.my.putOriginIndex].name == '暮光使者' || this.my_minions[this.my.putOriginIndex].name == '废旧螺栓机甲'
                || this.my_minions[this.my.putOriginIndex].name == '唤生响尾蛇' || this.my_minions[this.my.putOriginIndex].name == '烟雾元素'
                || this.my_minions[this.my.putOriginIndex].name == '驯兽师' || this.my_minions[this.my.putOriginIndex].name == '南海勇夫'
                || this.my_minions[this.my.putOriginIndex].name == '噬魂者' || this.my_minions[this.my.putOriginIndex].name == '亡灵侍僧'
                ){
                    this.my_minions[this.my.putOriginIndex].skill.cry.call(this,index);
                }
            }
            else if(this.my.heroChose){
                this.hero.skill.done.call(this,index)
            }

            else if(this.status.isSelectAllMinions){
                if(this.my_minions[this.my.allSelectMinionIndex].name == '海鲜投喂者'){
                    this.my_minions[this.my.allSelectMinionIndex].skill.done.call(this,'my',index);//触发战吼随从的done
                }
            }
            
            

            
        },
        //交换随从位置函数
        changeMinionsPlace(index){
            if(this.status.isSelectMinionsPlace){
                //清除临时对象index的数据
                this.my.changeIndex = ''
                this.status.isSelectMinionsPlace = false;
            }else{
                
                //赋值index给临时对象，index对应my_minions[index]
                this.my.changeIndex = index
                this.status.isSelectMinionsPlace = true;
            }
        },
        //关闭或者打开关于界面
        openQuestion(type){
            if(type == 'open'){
                this.status.isShowQuestion = true
            }else{
                this.status.isShowQuestion = false
            }
        },
        //发动英雄技能
        startMySkill(){
            if(this.hero.skill.type == 'select_all'){
                this.hero.skill.select_all.call(this)
            }else if(this.hero.skill.type == 'select_single'){
                this.hero.skill.select_single.call(this)
            }
            
        },
        //打开选择英雄界面或者关闭
        selectHero(open){
            this.status.isSelectHero = open;
        },
        //获取所选择的英雄的信息
        addMyHeroMsg(value){
            this.hero = value
            this.status.isSelectHero = false
            if(this.hero.name == '挂机的阿凯'){
                this.hero.skill.gua.call(this)
                this.pub_info.turn = 3
                this.my.money = 5
                this.pub_info.upNeed = 3
            }
        },
        //进行下一个回合
        goNextTurn(){
            if(this.my.money >= (this.pub_info.turn + 2) || this.my.money == 10){
                this.$bus.$emit('alertPanel',`请先确保该回合你已操作`)
            }else{
                    if(this.status.isSelectMinionsPlace == false){
                        this.cancelPurchase();
                        this.$refs.next_btn.classList.add('active');
                        //this.status.isCanNextTurn用于实现节流
                        if(this.status.isCanNextTurn){
                            if(this.hero.img == ''){
                                //提示选择英雄
                                this.$bus.$emit('alertPanel',`请先选择英雄`);
                                this.status.isCanNextTurn = false;
                                setTimeout(()=>{
                                    this.status.isCanNextTurn = true
                                    this.$refs.next_btn.classList.remove('active')
                                },1000)
                            }else{
                                //减少升级所需的铸币
                                if(this.pub_info.upNeed>=1){
                                    this.pub_info.upNeed--;
                                }
                                //执行随从被动效果
                                for(let i=0;i<this.my_minions.length;i++){
                                    if(this.my_minions[i].name != ''){
                                        if(this.my_minions[i].skill.type == 'passive'){
                                            this.my_minions[i].skill.passive.call(this,i);
                                        }
                                    }
                                }
                                
                                //加回合数操作
                                this.pub_info.turn++;
                                this.status.isCanNextTurn = false
                                this.$bus.$emit('alertPanel',`第${this.pub_info.turn}回合`)
                                setTimeout(()=>{
                                    this.status.isCanNextTurn = true
                                    this.$refs.next_btn.classList.remove('active')
                                },1000)
                                //刷新酒馆
                                this.refreshPub();

                                

                                //刷新铸币并增加上限
                                if(this.my.money <=9){
                                    this.my.money= this.pub_info.turn + 2;
                                    if(this.my.money>10){
                                        this.my.money =10
                                    }
                                }
                                //恢复英雄的技能使用
                                if(this.hero.skill.use<=0){
                                    if(this.hero.name != '雷诺'){
                                        this.hero.skill.use = 1;
                                    }
                                }
                                
                                //清除海盗购买数目
                                this.pirate_buy_num  = 0;
                                //恢复回收魔灵
                                this.theCountOfMoLin = true
                                //触发刺背蛮兵清除函数
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name == '刺背蛮兵'){
                                        this.my_minions[i].skill.clear.call(this,i)
                                    }else if(this.my_minions[i].name == '野猪预言者'){
                                        this.my_minions[i].skill.get = false
                                    }
                                }
                                if(this.hero.name == '炎魔之王拉格纳罗斯' && this.pub_info.turn >= 9){
                                    this.hero.skill.evolution.call(this)
                                }

                                this.ele_put_num  = 0 ;
                            }
                        }
                    }
            }
            
        },
        //升级酒馆
        upPubLevel(){
            this.cancelPurchase();
            if(this.status.isSelectMinionsPlace == false){
                this.$refs.upNeedBtn.classList.add('active')
                setTimeout(()=>{
                    this.$refs.upNeedBtn.classList.remove('active')
                },800)
                if(this.pub_info.level<6){
                    if(this.my.money<this.pub_info.upNeed){
                        this.$bus.$emit('alertPanel',`铸币不足`)
                    }else{
                        this.my.money = this.my.money - this.pub_info.upNeed
                        
                        this.pub_info.level+= 1;//酒馆等级数字++

                        this.pub_info.upNeed = 5 + this.pub_info.level;
                        //判断有没有异变多彩龙
                        for(let i=0;i<7;i++){
                            if(this.my_minions[i].name == '异变多彩龙'){
                                this.my_minions[i].skill.special.call(this,i)
                            }
                        }
                        if(this.pub_info.level == 5){
                            if(this.hero.name == '阿莱克丝塔萨'){
                                this.hero.skill.red_dragon.call(this)
                            }
                        }
                        if(this.hero.name == '亡语者布莱克松'){
                            this.hero.skill.get.call(this)
                        }else if(this.hero.name  == '林地守护者欧穆'){
                            this.hero.skill.bloom.call(this)
                        }
                    }
                }
                if(this.pub_info.level == 6){
                    this.$refs.upNeedBtn.style.display = 'none'
                }
            }
            
        },
        //刷新酒馆
        refreshPub(isCoin){
            if(isCoin == 'coin'){
                //如果是铸币刷新则先解冻
                for(let j =0;j<7;j++){
                    this.bob_minions[j].isFreeze = false
                }
                this.status.isFreezeMinions = false

                for(let i=0;i<7;i++){
                    this.$nextTick(() => {
                        this.$refs.bobM[i].classList.add('active');
                    })
                    
                    setTimeout(()=>{
                        this.$refs.bobM[i].classList.remove('active');
                    },500)
                }
            }
            if(this.pub_info.level == 1){
                this.replace.call(this,3,this.minions_pool.one)
            }else if(this.pub_info.level == 2){
                this.replace.call(this,4,this.minions_pool.two)
            }else if(this.pub_info.level == 3){
                this.replace.call(this,4,this.minions_pool.three)
            }else if(this.pub_info.level == 4){
                this.replace.call(this,5,this.minions_pool.four)
            }else if(this.pub_info.level == 5){
                this.replace.call(this,5,this.minions_pool.five)
            }else {
                this.replace.call(this,6,this.minions_pool.six)
            }
            if(this.hero.name == '伊瑟拉'){
                this.hero.skill.passive.call(this)
            }
            
            

            if(this.status.isFreezeMinions == false){
                for(let i=0;i<7;i++){
                    this.$nextTick(() => {
                        this.$refs.bobM[i].classList.add('active');
                    })
                    
                    setTimeout(()=>{
                        this.$refs.bobM[i].classList.remove('active');
                    },500)
                }
            }

            if(isCoin != 'coin'){
                //如果不是铸币则刷新后解冻
                for(let j =0;j<7;j++){
                    this.bob_minions[j].isFreeze = false
                }
                this.status.isFreezeMinions = false         
            }
            
            
        },
        //铸币刷新随从
        refresh(){
            if(this.status.isSelectMinionsPlace == false){
                this.$refs.refresh_btn.classList.add('active');
                setTimeout(()=>{
                    this.$refs.refresh_btn.classList.remove('active');
                },1000)
                if(this.pub_info.nextFreeRefresh){
                    this.pub_info.nextFreeRefresh--;
                    //调用酒馆刷新
                    this.refreshPub('coin');
                }else{
                    if(this.my.money >= 1){
                        this.my.money -=1;
                        //调用酒馆刷新
                        this.refreshPub('coin');
                    }else{
                        this.$bus.$emit('alertPanel',`铸币不足`)
                    }
                }
                
            }
            
            
        },
        //打开该随从的购买信息面板
        openMinionMask(index){
            if(this.bob_minions[index].name != ''){
                for(let i=0;i<7;i++){
                    this.$refs.purchase_mask[i].style.display = 'none'
                    this.$refs.bobMInfo[i].style.display = 'none'
                }
                this.$refs.purchase_mask[index].style.display = 'block'
                this.$refs.bobMInfo[index].style.display = 'block'
            }
        },
        //取消购买随从
        cancelPurchase(){
            for(let i=0;i<7;i++){
                this.$refs.purchase_mask[i].style.display = 'none';
                this.$refs.sell_change_mask[i].style.display = 'none';
                this.$refs.bobMInfo[i].style.display = 'none'
            }
        },
        //购买一个随从
        purchaseMinion(index){
            if(this.hero.name == ''){
                this.$bus.$emit('alertPanel',`先选择英雄`);
            }else{
                //先判断手牌已满，满了就不执行购买，并关闭购买面板
                if(this.my.hands.length < 10){
                    //判断铸币是否足够购买一个随从
                    if(this.my.money<3){
                        this.$bus.$emit('alertPanel',`铸币不足，无法购买`);
                        this.cancelPurchase();
                    }else{
                        //购买随从，消耗3个铸币
                        this.my.money -= 3;
                        
                        //购买动画
                        this.$refs.bobM[index].classList.add('active');
                        setTimeout(()=>{
                            this.$refs.bobM[index].classList.remove('active');
                        },500)

                        //调用三连判断函数
                        if(this.isCombo.call(this,this.bob_minions[index])){
                            //若函数返回true，表示达成三连条件，调用三联函数
                            this.getCombo.call(this,this.bob_minions[index])

                            this.bob.msg = '精彩的操作';
                            this.bob.say = true;
                            setTimeout(()=>{
                                    this.bob.say = false;
                            },1500)
                        }else{
                            //将数据填充到手牌                  
                            this.addMinionToMyHand.call(this,this.bob_minions[index]);
                            //手牌放入，触发佩吉
                            this.peiJiReactive()
                        }
                        //该回合海盗购买次数加1
                        if(this.bob_minions[index].type == '海盗' || this.bob_minions[index].type == '混合'){
                            this.pirate_buy_num ++;
                            //购买海盗触发霍格
                            this.ariseHuoGe();
                            if(this.hero.name == '海盗帕奇斯'){
                                this.hero.skill.need --;
                                if(this.hero.skill.need <0){
                                    this.hero.skill.need = 0
                                }
                            }
                        }
                        if(this.hero.name == '恐龙大师布莱恩'){
                            if(this.bob_minions[index].skill.type == 'all_cry' || this.bob_minions[index].skill.type == 'single_cry_select'
                            || this.bob_minions[index].skill.type == 'all_cry_select' || this.bob_minions[index].skill.type == 'single_cry_put'){
                                this.hero.skill.fight.call(this)
                            }
                        }
                        //调用清除函数，清除酒馆对应随从位置的数据
                        this.clearMinionData.call(this,this.bob_minions,index);
                        this.cancelPurchase();
                        
                        this.all_info.buy_time++;
                    }
                }else{
                    this.$bus.$emit('alertPanel',`手牌已满`);
                    this.cancelPurchase();
                }
            }

            
            
        },
        //打开手牌，进入放置随从状态
        openMyHands(type){
            this.cancelPurchase();
            if(this.status.isSelectMinionsPlace == false){
                if(type == 'close'){
                    this.status.isCheckMinions = false;
                    this.status.isPutMinions = false;
                    this.my.selectItemName = '';
                    let li = document.querySelectorAll('.my_hands ul li .select_mask')
                    for(let i=0;i<li.length;i++){
                        li[i].style.display = 'none'
                    }
                    this.$refs.my_hands.classList.remove('active')
                }else{
                    this.status.isCheckMinions = true
                    this.$refs.my_hands.classList.add('active')
                }
            }
            
        },
        //放置一个随从准备放置
        putIntoField(index){
            let li = document.querySelectorAll('.my_hands ul li .select_mask')
            for(let i=0;i<li.length;i++){
                li[i].style.display = 'none'
            }
            li[index].style.display = 'block'
            if(this.status.isCheckMinions){
                //放置随从
                if(this.my.hands[index].type != '道具'){
                    
                        //修复点击道具卡后再点击随从卡消耗随从卡而不是道具卡的bug
                        this.status.isPutMinions = false;
                        //清除道具卡信息
                        this.status.isUsePropCard = false;
                        this.my.propCardIndex = '';


                        this.status.isPutMinions = true
                        //将数据赋值给临时对象身上
                        this.alreadyMinion.index = index;
                        this.my.selectItemName = this.my.hands[index].name
                        this.my.selectItInfo =  this.my.hands[index].skill.info
                        //调用数据转化函数
                        this.transferData.call(this,this.alreadyMinion,this.my.hands[index])
                    
                }
                //使用道具效果
                else{
                    if(this.my.hands[index].name == '一枚铸币'){
                        if(this.my.money == 10){
                            this.$bus.$emit('alertPanel',`铸币已达到上限`);
                        }else{
                            this.my.hands[index].skill.use_now.call(this,index)
                        }
                        
                    }else{
                        //修复点击随从卡后再点击道具卡消耗随从卡而不是道具卡的bug
                        this.status.isPutMinions = false
                        this.alreadyMinion.index = '';

                        this.status.isPutMinions = true;
                        //并开启道具排效果
                        this.status.isUsePropCard = true;
                        //保存下道具卡的索引
                        this.my.propCardIndex = index;
                        this.my.selectItemName = this.my.hands[index].name
                        this.my.selectItInfo =  this.my.hands[index].skill.info
                    }
                    
                }
            }
        },
        //将手牌随从放置到战场上
        putInHere(index){
            if(this.status.isUsePropCard){
                if(this.my_minions[index].name != ''){
                    //调用道具卡的use函数,index为使用对象索引
                    this.my.hands[this.my.propCardIndex].skill.use.call(this,index,this.my.propCardIndex)

                    //调用完成效果后恢复所有状态
                    this.status.isPutMinions = false;
                    //并开启道具排效果
                    this.status.isUsePropCard = false;
                    //保存下道具卡的索引
                    this.my.propCardIndex = '';
                }
            }else{

                if(this.my_minions[index].name != ''){
                    this.$bus.$emit('alertPanel',`该位置上已存在随从`);
                }else{
                    this.$refs.myM[index].classList.add('active');
                    setTimeout(()=>{
                        this.$refs.myM[index].classList.remove('active');
                    },500)
                    //将临时对象赋值给真正的我的随从
                    this.transferData.call(this,this.my_minions[index],this.alreadyMinion)


                    //触发continue类型随从的技能效果
                    for(let i=0;i<7;i++){
                        if(this.my_minions[i].name != ''){
                            if(this.my_minions[i].skill.type == 'continue'){
                                //i参数为拥有continue性质的随从的索引,index是放置随从索引
                                this.my_minions[i].skill.continue.call(this,index,i);
                            }
                            
                        }
                    }

                    //触发全体目标战吼的随从效果
                    if(this.my_minions[index].skill.type == 'all_cry'){
                        //调用随从技能函数,铜须判断函数
                        if(this.tongxuFunction()){
                            for(let j=0;j<this.tongxuFunction();j++){
                                this.my_minions[index].skill.all_cry.call(this,index);
                            }
                        }else{
                            this.my_minions[index].skill.all_cry.call(this,index);
                        }
                        
                    }else if(this.my_minions[index].skill.type == 'single_cry_put'){
                        //调用随从技能函数
                        this.my_minions[index].skill.single_cry_put.call(this,index);
                    }else if(this.my_minions[index].skill.type == 'single_cry_select'){
                        //将该随从的索引复制到一个临时属性上
                        this.my.putOriginIndex = index;
                        this.my_minions[index].skill.single_cry_select.call(this,index);
                    }else if(this.my_minions[index].skill.type == 'all_cry_select'){
                        //将该随从的索引复制到一个临时属性上
                        this.my.allSelectMinionIndex = index
                        this.my_minions[index].skill.all_cry_select.call(this,index);
                    }

                    //
                    if(this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合'){
                        this.ele_put_num ++ ;
                        if(this.hero.name == '齐恩瓦拉'){
                            this.hero.skill.passive.call(this)
                        }
                    }

                    //将放置状态改为false
                    this.status.isCheckMinions = false;
                    this.status.isPutMinions = false;
                    this.$refs.my_hands.classList.remove('active')
                    if(this.my_minions[index].isGold){
                        //抽取三连奖励随从
                        this.getComboGift.call(this,this.pub_info.level);
                        console.log(this.my_minions)
                        this.status.isSelectCombo = true;
                    }
                    //删除对应手牌数据
                    this.clearMyHandCard.call(this,this.alreadyMinion.index)
                }

            }
        },
        //打开我的随从界面
        openMyMinionsMsg(index){
            if(this.my_minions[index].name != ''){
                for(let i=0;i<7;i++){
                    this.$refs.sell_change_mask[i].style.display = 'none'
                }
                this.$refs.sell_change_mask[index].style.display = 'block'
            }
        },
        //出售这个随从
        sellThisMinion(index){
            if(this.my_minions[index].name == '白赚赌徒'){
                if(this.my_minions[index].isGold){
                    this.my.money += 6;
                }else{
                    this.my.money += 3;
                }
            }else if(this.my_minions[index].name == '商贩元素'){
                //合成一个水滴元素
                    let water_ele = {
                        ad:2,
                        hp:2,
                        type : '元素',
                        level : 1,
                        isGold : false,
                        skill : {
                            type : 'none'
                        },
                        name : '水滴元素',
                        character:{
                            shield:false,
                            windFury:false,
                            relive:false,
                            toxic:false,
                            ridicule:false,
                            death : false,
                        },
                        init:{
                            ad:2,
                            hp:2
                        },
                        img:require('../assets/minions/元素/shuidiyuansu.jpg')
                    }
                if(this.my_minions[index].isGold){
                    //调用三连判断函数
                    if(this.isCombo.call(this,water_ele)){
                        //若函数返回true，表示达成三连条件，调用三联函数
                        this.getCombo.call(this,water_ele)

                        this.bob.msg = '精彩的操作';
                        this.bob.say = true;
                        setTimeout(()=>{
                                this.bob.say = false;
                        },1500)
                        //调用三连判断函数
                        if(this.isCombo.call(this,water_ele)){
                            //若函数返回true，表示达成三连条件，调用三联函数
                            this.getCombo.call(this,water_ele)

                            this.bob.msg = '精彩的操作';
                            this.bob.say = true;
                            setTimeout(()=>{
                                    this.bob.say = false;
                            },1500)
                        }else{
                            this.my.hands.push(water_ele)
                            //手牌放入，触发佩吉
                            this.peiJiReactive()
                        }
                    }else{
                        this.my.hands.push(water_ele);
                        //手牌放入，触发佩吉
                        this.peiJiReactive()
                        //调用三连判断函数
                        if(this.isCombo.call(this,water_ele)){
                            //若函数返回true，表示达成三连条件，调用三联函数
                            this.getCombo.call(this,water_ele)

                            this.bob.msg = '精彩的操作';
                            this.bob.say = true;
                            setTimeout(()=>{
                                    this.bob.say = false;
                            },1500)
                        }else{
                            this.my.hands.push(water_ele)
                            //手牌放入，触发佩吉
                            this.peiJiReactive()
                        }
                    }
                }else{
                    
                    //调用三连判断函数
                    if(this.isCombo.call(this,water_ele)){
                        //若函数返回true，表示达成三连条件，调用三联函数
                        this.getCombo.call(this,water_ele)

                        this.bob.msg = '精彩的操作';
                        this.bob.say = true;
                        setTimeout(()=>{
                                this.bob.say = false;
                        },1500)
                    }else{
                        this.my.hands.push(water_ele)
                    }
                }
                this.my.money++;
            }
            else if(this.my_minions[index].name == '晒镖的游客'){
                this.my_minions[index].skill.special.call(this,index);
                this.my.money++;
            }
            else{
                this.my.money++;
            }

            //判断金币是否溢出
            if(this.my.money>10){
                this.my.money = 10;
            }
            if((this.my_minions[index].type == '鱼人' || this.my_minions[index].type == '混合' ) && this.hero.name == '菌菇术士弗洛格尔'){
                this.hero.skill.fish.call(this)
            }

            this.my_minions[index].name = '';
            this.my_minions[index].ad = '';
            this.my_minions[index].hp = '';
            this.my_minions[index].level = '';
            this.my_minions[index].type = '';
            this.my_minions[index].skill = '';
            this.my_minions[index].character.shield = false;
            this.my_minions[index].character.windFury = false;
            this.my_minions[index].character.toxic = false;
            this.my_minions[index].character.ridicule = false;
            this.my_minions[index].character.relive = false;
            this.my_minions[index].character.death = false;
            this.my_minions[index].init.ad = '';
            this.my_minions[index].init.hp = '';
            this.my_minions[index].isGold = false;
            this.my_minions[index].img = require('../assets/card.jpg');
            
            this.cancelPurchase();
        },
        //选择这个三连奖励随从
        choseThisGift(index){
            setTimeout(()=>{
                //调用三连判断函数
                if(this.isCombo.call(this,this.selectCombo[index])){
                    //若函数返回true，表示达成三连条件，调用三联函数
                    this.getCombo.call(this,this.selectCombo[index])

                    this.bob.msg = '精彩的操作';
                    this.bob.say = true;
                    setTimeout(()=>{
                            this.bob.say = false;
                    },1500)
                }else{
                    //将数据填充到手牌                  
                    if(this.my.hands.length<10){
                        this.my.hands.push(this.selectCombo[index]);
                    }
                }
                //如果是选择鱼人阶段，则不清除数据且不刷新
                if(!this.status.isSelectFish){
                    if(!this.status.isSelectDragon){
                        this.status.isSelectCombo = false;
                        this.selectCombo = []
                    }else{
                        this.status.isSelectDragon --;
                        this.selectCombo = this.selectCombo.filter((w,id)=>{
                            return id > 2
                        })
                        if(!this.status.isSelectDragon){
                            this.status.isSelectCombo = false;
                            this.selectCombo = []
                        }
                    }
                }else{
                    this.status.isSelectFish --;
                    this.selectCombo = this.selectCombo.filter((w,id)=>{
                        return id > 2
                    })
                    if(!this.status.isSelectFish){
                        this.status.isSelectCombo = false;
                        this.selectCombo = []
                    }
                }

            },300)
        },
        //冷冻按钮
        freezeMinionsFunction(){
            //执行按钮动画
            this.$refs.freeze_btn.classList.add('active')
            setTimeout(()=>{
                this.$refs.freeze_btn.classList.remove('active')
            },800)

            //按钮功能
            if(this.status.isFreezeMinions){
                for(let i=0;i<7;i++){
                    if(this.bob_minions[i].name != ''){
                        this.bob_minions[i].isFreeze = false
                    }
                }
                this.status.isFreezeMinions = false
            }else{
                for(let i=0;i<7;i++){
                    if(this.bob_minions[i].name != ''){
                        this.bob_minions[i].isFreeze = true
                    }
                }
                this.status.isFreezeMinions = true
            }
        },
        //判断是否应该过滤某个随从,true表示过滤掉
        isFilterSomeMinions(arr,name){
            if(name == '阿迦玛甘，野猪之神'){
                
                for(let j=0;j<2;j++){
                    if(arr[j] == '野猪人'){
                        //只要是野猪人被ban，野猪之神就要ban
                        return true
                    }else if(arr[j] == '野兽'){
                        if(j == 1){
                            if(arr[j-1] == '野猪人'){
                                return true
                            }else{
                                return false
                            }
                        }else{
                            if(arr[j+1] == '野猪人'){
                                return true
                            }else{
                                return false
                            }
                        }
                    }
                }
            }
        },
        //过滤酒馆随从,filter_arr为要过滤的随从数组,level为过滤的酒馆等级随从池
        filterMinionsFunction(filter_arr){
            //基本类型处理
            for(let i=0;i<2;i++){
                this.minions_pool.one = this.minions_pool.one.filter((m)=>{
                    return m.type != filter_arr[i]
                })
            }
            for(let i=0;i<2;i++){
                this.minions_pool.two = this.minions_pool.two.filter((m)=>{
                    return m.type != filter_arr[i]
                })
                this.two_minions = this.two_minions.filter((m)=>{
                    return m.type != filter_arr[i]
                })
            }
            for(let i=0;i<2;i++){
                this.minions_pool.three = this.minions_pool.three.filter((m)=>{
                    return m.type != filter_arr[i]
                })
                this.three_minions = this.three_minions.filter((m)=>{
                    return m.type != filter_arr[i]
                })
            }
            for(let i=0;i<2;i++){
                this.minions_pool.four = this.minions_pool.four.filter((m)=>{
                    return m.type != filter_arr[i]
                })
                this.four_minions = this.four_minions.filter((m)=>{
                    return m.type != filter_arr[i]
                })
            }
            for(let i=0;i<2;i++){
                if(this.isFilterSomeMinions(filter_arr,'阿迦玛甘，野猪之神')){
                    this.minions_pool.five = this.minions_pool.five.filter((m)=>{
                        return m.type != filter_arr[i]
                    })
                    this.five_minions = this.five_minions.filter((m)=>{
                        return m.type != filter_arr[i]
                    })
                }else{
                    this.minions_pool.five = this.minions_pool.five.filter((m)=>{
                        return m.name == '阿迦玛甘，野猪之神' || m.type != filter_arr[i]
                    })
                    this.five_minions = this.five_minions.filter((m)=>{
                        return m.name == '阿迦玛甘，野猪之神' || m.type != filter_arr[i]
                    })
                }
                
            }
            for(let i=0;i<2;i++){
                if(this.isFilterSomeMinions(filter_arr,'阿迦玛甘，野猪之神')){
                    this.minions_pool.six = this.minions_pool.six.filter((m)=>{
                        return m.type != filter_arr[i]
                    })
                    this.six_minions = this.six_minions.filter((m)=>{
                        return m.type != filter_arr[i]
                    })
                }else{
                    this.minions_pool.six = this.minions_pool.six.filter((m)=>{
                        return m.name == '阿迦玛甘，野猪之神' || m.type != filter_arr[i]
                    })
                    this.six_minions = this.six_minions.filter((m)=>{
                        return m.type != filter_arr[i]
                    })
                }
                
            }
            // console.log(this.minions_pool.one)
        },
        //抽取需要禁用的随从
        banMinions(){
            let arr = ['野兽','野猪人','恶魔','海盗','元素','鱼人','机械','龙']
            for(let i=0;i<2;i++){
                let random = Math.floor(Math.random() * arr.length)
                this.pub_info.ban_arr.push(arr[random])
                arr = arr.filter((w,id)=>{
                    return id != random
                })
                
            }
        },
        //初步过滤中立特殊随从
        initFilterMinions(){
            for(let i=0;i<2;i++){
                //恶魔被ban，愤怒编织者也需要被ban
                if(this.pub_info.ban_arr[i] == '恶魔'){
                    this.one_minions = this.one_minions.filter((m)=>{
                        return m.name != '愤怒编织者'
                    })
                    this.three_minions = this.three_minions.filter((m)=>{
                        return m.name != '灵魂杂耍者'
                    })
                    this.four_minions = this.four_minions.filter((m)=>{
                        return m.name != '不耐烦的末日预言者'
                    })
                }else if(this.pub_info.ban_arr[i] == '野猪人'){
                    this.two_minions = this.two_minions.filter((m)=>{
                        return m.name != '野猪预言者'
                    })
                }else if(this.pub_info.ban_arr[i] == '龙'){
                    this.two_minions = this.two_minions.filter((m)=>{
                        return m.name != '雏龙走私商'
                    })
                    this.six_minions = this.six_minions.filter((m)=>{
                        return m.name != '红衣纳迪娜'
                    })
                }else if(this.pub_info.ban_arr[i] == '野兽'){
                    this.three_minions = this.three_minions.filter((m)=>{
                        return m.name != '驯兽师' && m.name != '鸟类的伙伴'
                    })
                }else if(this.pub_info.ban_arr[i] == '元素'){
                    this.four = this.four_minions.filter((m)=>{
                        return m.name != '管理者埃克索图斯'
                    })
                    this.five_minions = this.five_minions.filter((m)=>{
                        return m.name != '“厨房煞星”诺米' && m.name != '现境大师' 
                    })
                }else if(this.pub_info.ban_arr[i] == '机械'){
                    this.five_minions = this.five_minions.filter((m)=>{
                        return m.name != '坎格尔的学徒'  
                    })
                }else if(this.pub_info.ban_arr[i] == '鱼人'){
                    this.six_minions = this.six_minions.filter((m)=>{
                        return m.name != '海鲜投喂手'  
                    })
                }
            }
        },
        //退出战斗界面函数
        exitCombat(){
            this.status.isCombat = false
        }
        
    },
    watch: {
        'my.money'(newValue, oldValue) {
            if(newValue < oldValue){
                if(this.pub_info.level > 4){
                    for(let i=0;i<7;i++){
                        if(this.my_minions[i].name == '獠牙队长'){
                            this.my_minions[i].skill.special.call(this,i,(oldValue-newValue))
                        }
                    }
                }
                this.all_info.cost += (oldValue - newValue)
            }
        },
    }, 
    beforeMount(){
        //过滤
        this.banMinions();
        //初步过滤掉部分中立特殊随从
        this.initFilterMinions();
        //进入游戏首次刷新酒馆
        this.minions_pool.one = this.one_minions;
        this.minions_pool.two = this.minions_pool.one.concat(this.two_minions);
        this.minions_pool.three = this.minions_pool.two.concat(this.three_minions);
        this.minions_pool.four = this.minions_pool.three.concat(this.four_minions);
        this.minions_pool.five = this.minions_pool.four.concat(this.five_minions);
        this.minions_pool.six = this.minions_pool.five.concat(this.six_minions);


        //过滤类型随从
        this.filterMinionsFunction(this.pub_info.ban_arr);

        this.copy_pool.one = JSON.parse(JSON.stringify(this.one_minions))
        this.copy_pool.two = JSON.parse(JSON.stringify(this.copy_pool.one.concat(this.two_minions)))
        this.copy_pool.three= JSON.parse(JSON.stringify(this.copy_pool.two.concat(this.three_minions)))
        this.copy_pool.four = JSON.parse(JSON.stringify(this.copy_pool.three.concat(this.four_minions)))
        this.copy_pool.five = JSON.parse(JSON.stringify(this.copy_pool.four.concat(this.five_minions)))
        this.copy_pool.six = JSON.parse(JSON.stringify(this.copy_pool.five.concat(this.six_minions)))
        this.refreshPub();
    },
    mounted(){
        this.$bus.$on('closeSelectHero',this.selectHero);
        this.$bus.$on('addMyHeroMsg',this.addMyHeroMsg);
        this.$bus.$on('openQuestion',this.openQuestion);
        this.$bus.$on('exitCombatPanel',this.exitCombat)

        
        

        // setInterval(()=>{
        //     setTimeout(()=>{
        //     let data = new Date()
        //             console.log('这是第一次',data);
        //             setTimeout(()=>{
        //                 let data = new Date()
        //                 console.log('这是第二次',data)
        //             },3000)
        //     },3000)
        // },1000)
    }
}
</script>

<style lang='less'>
.main_panel{
    cursor: pointer;
    
    
    
}
</style>