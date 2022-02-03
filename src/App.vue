<template>
  <div class="app">
    <img :src="require('./assets/main/bg.jpg')" alt="" class="bg">
    <Main/>

    <div class="orient_mask" v-show='isHorizontalScreen'>
      <h3>请将手机设置成横屏,然后刷新页面</h3>
    </div>

    <!-- 提示面板 -->
      <transition name='alert_panel'>
      <div class="alert" v-show="alert.show">
          {{alert.msg}}
      </div>
      </transition>

      <!-- 是否重开界面 -->
      <transition name='bob_say'>
      <div class="confirmRemake" v-show="isRemake">
          <div class="center_box">确定重新开始吗？
              <div class="confirm_btn" @click="remake">确定</div>
              <div class="cancel_btn" @click="cancel">取消</div>
          </div>
      </div>
      </transition>
  </div>
</template>

<script>
import Main from './components/Main.vue'
export default {
  name: 'App',
  components : {
    Main,
  },
  data(){
    return{
      height:'',
      width : '',
      isHorizontalScreen : false,
      alert:{
        msg : '',
        show:false
      },
      isRemake:false
    }
  },
  methods:{
    //弹出提示框
    alertPanel(msg){
        this.alert.msg = msg;
        this.alert.show = true;
        setTimeout(()=>{
          this.alert.show = false
        },1000)
    },
    //重开
    remakeBtn(){
        this.isRemake = true
    },
    remake(){
        location.reload();
    },
    cancel(){
        this.isRemake = false
    }
  },
  mounted(){
    //判断手机是否为横屏模式，不为横屏则抛出一个提示界面
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    if(this.height>this.width){
      this.isHorizontalScreen = true;
    }

    //提示框总线
    this.$bus.$on('alertPanel',this.alertPanel);
    //重启
    this.$bus.$on('remakeBtn',this.remakeBtn)
  }

}
</script>

<style lang='less'>
.app{
  width: 100vw;
  height: 100vh;
  user-select: none;
  overflow: hidden;
  .bg{
    width: 100vw;
    min-height: 100vh;
    // height: 98vh;
  }
  .orient_mask{
    position: absolute; left: 0; top: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    h3{
      color: white;
      position: absolute; left: 50%; top : 50%;
      transform : translate(-50%,-50%);
    }
  }
  .alert{
    position: fixed; left: 50%; top : 50%;
    margin: -3vw 0 0 -10vw;
    width: 20vw;
    height: 6vw;
    background: url('./assets/main/alert.png')no-repeat;
    background-size: cover;
    box-sizing: border-box;
    border: 2px solid rgb(150, 72, 0);
    text-align: center;
    font-size:1vw;
    line-height: 5.5vw;
    color: white;
    border-radius: 10px;
    box-shadow: 0 0 25px rgb(250, 233, 0);
    transition: all .2s;
  }
  .confirmRemake{
      position:fixed;top:0;left:0;
      width:100vw;
      height:100vh;
      transition:all .25s;
      background:rgba(0, 0, 0, 0.6);
      box-shadow: 0 0 100px black;
      .center_box{
          position: absolute; left:24.5vw;top:24vh;
          border-radius: 3vw;
          width:50vw;
          height:50vh;
          color:white;
          font-size:2vw;
          text-align: center;
          line-height: 32vh;
          border:.5vw solid rgb(194, 194, 194);
          background: linear-gradient(to right top,rgb(19, 19, 19),rgb(53, 53, 53),rgb(37, 37, 37));
          .confirm_btn{
              position:absolute;left:50%;bottom:10vh;
              margin:0 0 0 -14vw;
              width:12vw;
              height:4vw;
              font-size:1vw;
              line-height: 4vw;
              border-radius:1vw;
              background:rgb(119, 0, 155);
              box-shadow: 3px 3px 10px rgb(32, 32, 32);
          }
          .cancel_btn{
              position:absolute;left:50%;bottom:10vh;
              margin:0 0 0 2vw;
              width:12vw;
              height:4vw;
              font-size:1vw;
              line-height: 4vw;
              border-radius:1vw;
              background:rgb(121, 0, 0);
              box-shadow: -3px 3px 10px rgb(32, 32, 32);
          }
      }
  }
  .container{
        position: absolute; top: 50vh; left: 15vw;
        margin: -20vw 0 0 0;
        transform: translate(-2.5px,-2.5px);
        width: 70vw;
        height: 40vw;
        border: 5px solid rgb(85, 40, 3);
        border-radius: 15px;
        background: url('./assets/main/container.jpg')no-repeat;
        background-size: cover;
        // color: rgb(0, 248, 0);
        .pub{
            position: absolute; top: 0; left: 0;
            width: 70vw;
            height: 10vw;
            .check_my_team{
                position: absolute; left: 1vw; top: 1vw;
                width: 10vw;
                height: 3vw;
                border: 3px solid rgb(80, 52, 0);
                border-radius: 5px;
                background: rgb(109, 37, 4);
                color: rgb(255, 255, 188);
                font-size: 1vw;
                font-size: 2vw;
                text-align: center;
                line-height: 3vw;
                box-shadow: 1px 1px 5px black;
            }
            .check_ban:hover .panel{
                display:block;
            }
            .combat_btn{
                position: absolute; left: -7vw; top: 1vw;
                width: 5vw;
                height: 5vw;
                border: 3px solid rgb(80, 52, 0);
                border-radius: 1vw;
                background: rgb(119, 0, 155);
                color: rgb(255, 255, 188);
                font-size: 1vw;
                font-size: 2vw;
                text-align: center;
                line-height: 6vw;
                box-shadow: 1px 1px 5px black;
                background: url('./assets/main/combat_btn.png')no-repeat;
                background-size: cover;
            }
            .check_ban{
                position: absolute; right: 6vw; top: 1vw;
                width: 3vw;
                height: 3vw;
                border: 3px solid rgb(122, 122, 122);
                border-radius: 5px;
                background: rgb(31, 31, 31);
                color: rgb(255, 119, 119);
                font-size: 2vw;
                text-align: center;
                line-height: 3vw;
                box-shadow: -1px 1px 5px black;
                .panel{
                    position: absolute; left: -4.5vw; top: 4vw;
                    width: 10vw;
                    height: 3vw;
                    font-size:1vw;
                    border: .5vw solid rgb(153, 153, 153);
                    border-radius:1vw;
                    background: #000;
                    color:white;
                    display:none;
                    animation:emerge .1s linear 1;
                }
            }
            .remake{
                position: absolute; left: 13vw; top: 1vw;
                width: 3vw;
                height: 3vw;
                border: 3px solid rgb(80, 52, 0);
                border-radius: 5px;
                background: rgb(119, 0, 155);
                color: rgb(255, 255, 188);
                font-size: 1vw;
                font-size: 2vw;
                text-align: center;
                line-height: 3vw;
                box-shadow: 1px 1px 5px black;
            }
            .question{
                position: absolute; right: 1vw; top: 1vw;
                width: 3vw;
                height: 3vw;
                border: 3px solid rgb(80, 52, 0);
                border-radius: 5px;
                background: rgb(109, 72, 4);
                color: rgb(231, 231, 15);
                font-size: 2vw;
                text-align: center;
                line-height: 3vw;
                box-shadow: -1px 1px 5px black;
            }
            .up_need{
                position: absolute; left: 24vw; top: -1vw;
                width: 5vw;
                height: 8vw;
                background: #000;
                text-align: center;
                line-height: 10vw;
                color: white;
                box-sizing: border-box;
                border-radius: 5px;
                border: 3px solid rgb(167, 91, 4);
                box-shadow: 0 2px 5px black;
                background: linear-gradient(to bottom,rgb(78, 2, 74),rgb(48, 1, 45));
                .sign{
                    position: absolute; left: 50%; top : 50%;
                    transform : translate(-50%,-65%);
                    color: rgb(238, 127, 0);
                    text-shadow: 0 0 2px rgb(124, 124, 124);
                }
            }
            .up_need.active{
                animation: click .2s linear 1;
            }
            .bob{
                position: absolute; left: 30vw; top: -2vw;
                width: 10vw;
                height: 10vw;
                box-sizing: border-box;
                background: rgb(161, 72, 0);
                border: .5vw solid rgb(61, 35, 0);
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 5px 5px rgb(44, 44, 44);
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
                .level{
                    position: absolute; left: -5px; bottom: -5px;
                    width: 3vw;
                    height: 3vw;
                    border-radius: 50%;
                    border: .5vw solid rgb(161, 72, 0);
                    line-height: 2.8vw;
                    color: rgb(233, 107, 4);
                    text-align: center;
                    box-shadow: 0 5px 5px rgb(44, 44, 44);
                    background: linear-gradient(to bottom,rgb(78, 2, 74),rgb(48, 1, 45));
                }
                .bob_words{
                    position: absolute; top: -2vw; left: 5vw;
                    width: 18vw;
                    height: 5vw;
                    line-height: 5vw;
                    text-align: center;
                    font-size: 1vw;
                    font-weight: bolder;
                    border: 2px solid black;
                    background: rgb(228, 228, 228);
                    // box-shadow: 0 0 10px white;
                    border-radius: 1vw 1vw 1vw 0;
                    z-index: 1;
                    transition: all .2s;
                }
            }
            .refresh_btn,.freeze_btn{
                position: absolute; left: 41vw; top: -1vw;
                width: 5vw;
                height: 6vw;
                // background: url('../assets/main/refresh_btn.jpg')no-repeat;
                // background-size: cover;
                box-sizing: border-box;
                border-radius: 5px;
                border: 3px solid rgb(167, 91, 4);
                box-shadow: 0 3px 6px black;
                background: linear-gradient(to bottom,rgb(78, 2, 74),rgb(48, 1, 45));
                .sign{
                    position: absolute; left: 50%; top : 50%;
                    transform : translate(-50%,-50%);
                    width: 3vw;
                    height: 3vw;
                    font-size: 3vw;
                    color: rgb(255, 153, 0);
                }
                .coin{
                  position: absolute; left: 50%; bottom: -1.5vw;
                  margin: 0 0 0 -1vw;
                  width: 2vw;
                  height:2vw;
                  box-shadow: 0 0 10px black;
                  text-align: center;
                  line-height: 2vw;
                  font-size: 1.5vw;
                  color: rgb(82, 82, 82);
                  border-radius: 50%;
                  font-weight: border;
                  background: rgb(255, 196, 0);
                }
            }
            .freeze_btn{
                left: 47vw;
                border: 3px solid rgb(6, 111, 180);
                .sign{
                    color: rgb(57, 143, 255);
                }
            }
            .freeze_btn.active,.refresh_btn.active{
                animation: click .2s linear 1;
            }
        }
        .player{
            position: absolute; bottom: 0; left: 0;
            width: 70vw;
            height: 10vw;
            // background: #000;
            .hero{
                position: absolute; left: 30vw; bottom: -2vw;
                width: 10vw;
                height: 10vw;
                box-sizing: border-box;
                background: rgb(161, 72, 0);
                border: .5vw solid rgb(61, 35, 0);
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 -1px 5px rgb(0, 0, 0);
                button{
                    position: absolute; left: 50%; top : 50%;
                    transform : translate(-50%,-50%);
                    width: 6vw;
                    height: 2vw;
                    text-align: center;
                    line-height: 2vw;
                    font-size: 1vw;
                    color: white;
                    border-radius: 5px;
                    background: rgb(73, 34, 2);
                }
                img{
                    width: 100%;height: 100%;
                    border-radius: 50%;
                    transition: all .2s;
                }
                .blood{
                    position: absolute;left: -1vw; bottom: 0vw;
                    width: 4vw;
                    height: 4vw;
                    box-sizing: border-box;
                    background:url('./assets/main/blood.png')no-repeat;
                    background-size: cover;
                    color: white;
                    line-height: 5vw;
                    font-weight: bolder;
                    font-size: 1.5vw;
                    border-radius: 50%;
                    text-align: center;
                    img{
                        z-index:1;
                    }
                    span{
                        z-index:2;
                    }
                }
            }
            .skill{
                position: absolute; left: 41vw; bottom: -2vw;
                width: 7vw;
                height: 7vw;
                box-sizing: border-box;
                background: rgb(161, 72, 0);
                border: .8vw solid rgb(61, 35, 0);
                border-radius: 50%;
                box-shadow: -1px 2px 5px rgb(0, 0, 0);
                transition: all .25s;
                .needCoin{
                    position: absolute; left: 50%; top: -1.8vw;
                    margin:0 0 0 -1.4vw;
                    width:2.8vw;
                    height:2.8vw;
                    text-align: center;
                    line-height: 2vw;
                    color:rgb(80, 59, 0);
                    font-size:1vw;
                    box-sizing: border-box;
                    background:rgb(255, 166, 0);
                    border-radius:50%;
                    font-weight:bolder;
                    border: .4vw solid rgb(105, 68, 0);
                    box-shadow: -1px 2px 5px rgb(0, 0, 0);
                }
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .money{
                position: absolute; left: 0; bottom: 0;
                width: 28vw;
                height: 3vw;
                box-sizing: border-box;
                background: rgb(65, 37, 6);
                border: .5vw solid rgb(150, 80, 15);
                border-radius: 5px;
                // background: #000; 
                line-height: 2vw;  
                overflow: hidden;
                .now_number{
                    position: absolute; left: 0;top: 0;
                    font-size: 2vw;
                    line-height: 1.5vw;
                    font-weight: bold;
                    text-align: center;
                    color: rgb(255, 153, 0);
                    width: 5vw;
                }
                ul{
                    position: absolute; left: 5vw;
                    li{
                        float: left;
                        width: 2vw;
                        height: 2vw;
                        color: rgb(255, 153, 0);
                        text-align: center;
                        line-height: 2vw;
                        font-size: 2vw;
                        text-shadow: 0 0 5px rgb(44, 34, 0);
                        transition: all .2s;
                        z-index:2;
                        text-shadow: 0 0 2px rgb(255, 153, 0);
                    }
                }
                ol{
                    position: absolute; left: 5vw;
                    li{
                        float: left;
                        width: 2vw;
                        height: 2vw;
                        color: rgb(100, 100, 100);
                        text-align: center;
                        line-height: 2vw;
                        font-size: 2vw;
                        text-shadow: 0 0 5px rgb(44, 34, 0);
                        
                    }
                }
            }
        }
        .minions_panel{
            position: absolute; left: 50%; top : 50%;
            transform : translate(-50%,-50%);
            width: 60vw;
            height: 20vw;
            z-index: 1;
            .bob_minions,.my_minions{
                width: 60vw;
                height: 10vw;
                ul{
                    
                    li{
                        position: relative;
                        float: left;
                        margin: .5vw 0 0 1.4vw;
                        width: 7vw;
                        height: 9vw;
                        box-sizing: border-box;
                        background: rgb(102, 0, 0);
                        cursor: pointer;
                        border: .3vw solid rgb(102, 0, 0);
                        box-shadow: 0 1px 4px rgb(85, 85, 85);
                        transition: all .2s;
                        border-radius: 10px;
                        .wind_fury_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: linear-gradient(to right bottom,rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.9));
                            // background: rgba(255, 255, 255, 0.473);
                            border: .3vw solid rgb(102, 0, 0);
                            animation: windFury 5s linear infinite;
                        }
                        .toxic_mask{
                            position: absolute; left: 2.2vw; bottom: -1.2vw;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.5vw;
                            line-height: 1.5vw;
                            text-align: center;
                            text-shadow: 0 0 2px greenyellow;
                            color: rgb(0, 161, 40);
                            border-radius: 50%;
                            transition: all .5s;
                        }
                        .death_mask{
                            position: absolute; left: 2.2vw; bottom: -1vw;
                            width: 2vw;
                            height: 2vw;
                            font-size: 2vw;
                            line-height: 2vw;
                            text-align: center;
                            color: rgb(168, 168, 168);
                            text-shadow: 0 0 10px black;
                            border-radius: 50%;
                        }
                        .ridicule_mask{
                            position: absolute; left: -.6vw; top: -.6vw;
                            width: 6.4vw;
                            height: 8.4vw;
                            // box-sizing: border-box;
                            border-radius: 0 0 12px 12px;
                            background: rgba(255, 208, 0, 0);
                            border: .6vw solid rgb(105, 105, 105);
                            box-shadow: 0 2px 3px rgb(49, 49, 49);
                            transition: all .6s;
                        }
                        .shield_mask{
                            position: absolute; left: -.8vw; top: -.8vw;
                            width: 8vw;
                            height: 10vw;
                            box-sizing: border-box;
                            border-radius: 75%;
                            background: rgba(255, 208, 0, 0.3);
                            border: .3vw solid rgb(255, 208, 0);
                            box-shadow: 0 0 10px yellow;
                            transition: all .5s;
                        }
                        .alive_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: linear-gradient(to right bottom,rgba(0, 119, 128, 0.9),rgba(0, 119, 128, 0.3),rgba(0, 119, 128, 0.9));
                            border: .3vw solid rgb(102, 0, 0);
                        }
                        .info_mask{
                            display: none;
                            position: absolute; top: -6.5vw; left: -2.5vw;
                            width: 12vw;
                            height: 6vw;
                            font-size: 1vw;
                            overflow-x: hidden;
                            overflow-y: scroll;
                            border-radius: 5px;
                            color: white;
                            background: rgb(31, 31, 31);
                            border: .5vw solid rgb(153, 153, 153);
                            box-sizing: border-box;
                            animation: emerge .2s linear 1;
                            .name{
                                display: inline-block;
                                width: 11vw;
                                height: 1vw;
                                text-align: center;
                            }
                        }
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 7px;
                            z-index: 1;
                        }
                        
                        .purchase_mask,.sell_change_mask{
                            position: absolute; top: 0; left: 0;
                            display: none;
                            width: 100%;
                            height: 100%;
                            border-radius: 6px;
                            background: rgba(0, 0, 0);
                            transition: all .8s;
                            z-index: 3;
                            .purchase_btn,.sell_btn,.change_btn{
                                position: absolute; left: 50%; top : 50%;
                                transform : translate(-50%,-50%);
                                width: 5vw;
                                height: 2vw;
                                text-align: center;
                                line-height: 2vw;
                                font-size: 1.2vw;
                                border-radius: 5px;
                                color: white;
                                background: rgb(169, 4, 190);
                                z-index: 2;

                            }
                            .sell_btn{
                                background: rgb(219, 117, 0);
                                transform: translate(-50%,-140%);
                            }
                            .change_btn{
                                background: rgb(2, 167, 131);
                                transform: translate(-50%,40%);
                            }
                        }
                        .level{
                            position: absolute; left: 0; top: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.2vw;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bold;
                            border-radius: 7px 0 8px 0;
                            background: rgb(146, 5, 182);
                        }
                        .ad{
                            position: absolute; left: 0; bottom: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.3vw;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bolder;
                            border-radius: 0 8px 0 7.5px;
                            background: rgb(255, 153, 0);
                            // text-shadow: 0 0 2px black;
                        }
                        .ad.active,.hp.active{
                            animation: live_number .4s linear 1;
                        }
                        .hp{
                            position: absolute; right: 0; bottom: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.3vw;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bold;
                            border-radius: 8px 0 7.5px 0;
                            background: red;
                        }
                        .gold_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: rgba(255, 208, 0, 0.3);
                            border: .3vw solid rgb(255, 230, 0);
                            box-shadow: 0 0 5px yellow;
                        }
                        .freeze_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: rgba(0, 204, 255, 0.3);
                            border: .3vw solid rgb(0, 247, 255);
                            z-index: 1;
                            transition: all .3s;
                        }
                    }
                    // li:hover{
                    //     .info_mask{
                    //         display:block
                    //     }
                    // }
                }
            }
            .bob_minions{
              ul{
                li.active{
                    animation: refresh .3s linear 1;
                }
                li:nth-of-type(1).active{
                    animation-delay: -0.2s;
                }
                li:nth-of-type(2).active{
                    animation-delay: -0.16s;
                }
                li:nth-of-type(3).active{
                    animation-delay: -0.12s;
                }
                li:nth-of-type(4).active{
                    animation-delay: -0.08s;
                }
                li:nth-of-type(5).active{
                    animation-delay: -0.04s;
                }
                li:nth-of-type(6).active{
                    animation-delay: -0s;
                }
                li:nth-of-type(7).active{
                    animation-delay: -0s;
                }
              }
            }
            .my_minions{
              ul{
                li.active{
                    animation: refresh .18s linear 1;
                }
              }
            }
        }
        .turns{
            width: 70vw;
            height: 10vw;
            position: absolute; left: 0;top: 15vw;
            .pre_turn{
                position: absolute; left: -9vw; top: 2vw;
                width: 15vw;
                height: 6vw;
                text-align: center;
                line-height: 5.5vw;
                font-size: 1.5vw;
                color: rgb(92, 42, 8);
                font-weight: bolder;
                border-radius: 5px;
                // background: rgb(153, 82, 0);
                background: url('./assets/main/1_tm_hearthstone_landing_vBFCojlahgpl_btns.png')no-repeat;
                background-size: 100%;

            }
            .next_turn{
                position: absolute; right: -6vw; top: 3vw;
                width: 12vw;
                height: 4vw;
                text-align: center;
                line-height: 3vw;
                font-size: 2vw;
                color: rgb(218, 167, 0);
                border-radius: 5px;
                box-sizing: border-box;
                border: .5vw solid rgb(218, 167, 0);
                background: rgb(153, 82, 0);
                box-shadow: 0 2px 5px rgb(70, 70, 70);
                transition: all .2s;
            }
            .next_turn.active{
                animation: click .2s linear 1;
            }
            
        }
        .my_hands{
            position: absolute; left: 50vw;bottom: 0vw;
            width: 30vw;
            height: 10vw;
            overflow: hidden;
            // background: rgb(216, 45, 45);
            .status{
                position: absolute; left: 45vw; top : 12vw;
                width: 20vw;
                height: 4vw;
                border-radius: 5px;
                line-height: 1.8vw;
                text-align: center;
                // background: rgb(4, 170, 101);
                // box-shadow: 0 0 20px rgb(9, 223, 80);
                color: white;
                font-size:1vw;
            }
            .pre_chose_item{
                position: absolute; left: 5vw; top : 12vw;
                width: 20vw;
                height: 4vw;
                border-radius: 5px;
                line-height: 4vw;
                text-align: center;
                // background: rgb(121, 4, 4);
                // box-shadow: 0 0 20px rgb(223, 9, 9);
                color: white;
                font-size:1vw;
            }
            ul{
                
                li{
                    position: relative;
                    float: left;
                    margin: .5vw 0 0 -5vw;
                    width: 7vw;
                    height: 9vw;
                    box-sizing: border-box;
                    background: rgb(102, 0, 0);
                    cursor: pointer;
                    border: .3vw solid rgb(102, 0, 0);
                    box-shadow: 0 1px 4px rgb(43, 43, 43);
                    transition: all .3s;
                    border-radius: 10px;
                    animation:emerge .25s ease-out 1 ;
                    .select_mask{
                        display:none;
                        position: absolute; left: -.3vw; top: -.3vw;
                        width: 7vw;
                        height: 9vw;
                        box-sizing: border-box;
                        border-radius: 10px;
                        background: rgba(255, 255, 255, 0.432);
                        border: .3vw solid rgba(255, 230, 0, 0);
                    }
                    .level{
                        position: absolute; left: 0; top: 0;
                        width: 2vw;
                        height: 2vw;
                        font-size: 1px;
                        text-align: center;
                        line-height: 2vw;
                        color: white;
                        font-weight: bold;
                        border-radius: 7px 0 8px 0;
                        background: rgb(146, 5, 182);
                    }
                    .ad{
                        position: absolute; left: 0; bottom: 0;
                        width: 2vw;
                        height: 2vw;
                        font-size: 1px;
                        text-align: center;
                        line-height: 2vw;
                        color: white;
                        font-weight: bold;
                        border-radius: 0 8px 0 7.5px;
                        background: rgb(255, 153, 0);
                    }
                    .hp{
                        position: absolute; right: 0; bottom: 0;
                        width: 2vw;
                        height: 2vw;
                        font-size: 1px;
                        text-align: center;
                        line-height: 2vw;
                        color: white;
                        font-weight: bold;
                        border-radius: 8px 0 7.5px 0;
                        background: red;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 7px;
                        z-index: 1;
                    }
                    .gold_mask{
                        position: absolute; left: -.3vw; top: -.3vw;
                        width: 7vw;
                        height: 9vw;
                        box-sizing: border-box;
                        border-radius: 10px;
                        background: rgba(255, 208, 0, 0.3);
                        border: .3vw solid rgb(255, 230, 0);
                    }
                }
                li:nth-of-type(1){
                    margin: .5vw 0 0 0vw;
                }
            }
            .put_minions{
                position: absolute; left: 5vw; top : 20vw;
                width: 60vw;
                height: 10vw;
                // background: red;
                ol{
                    li{
                        position: relative;
                        float: left;
                        margin: .5vw 0 0 1.4vw;
                        width: 7vw;
                        height: 9vw;
                        box-sizing: border-box;
                        background: rgb(180, 162, 162);
                        cursor: pointer;
                        border: .3vw solid rgb(102, 0, 0);
                        box-shadow: 0 1px 4px rgb(85, 85, 85);
                        border-radius: 10px;
                        .ad{
                            position: absolute; left: 0; bottom: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1px;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bold;
                            border-radius: 0 8px 0 8px;
                            background: rgb(255, 153, 0);
                        }
                        .hp{
                            position: absolute; right: 0; bottom: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1px;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bold;
                            border-radius: 8px 0 8px 0;
                            background: red;
                        }
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 7px;
                            z-index: 1;
                            opacity: 0.5;
                        }
                        .gold_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: rgba(255, 208, 0, 0.3);
                            border: .3vw solid rgb(255, 230, 0);
                        }
                    }
                }
            }
            .close_my_hands{
                position: absolute; left: 30vw; top : 12vw;
                width: 10vw;
                height: 4vw;
                border-radius: 5px;
                background: rgb(121, 4, 4);
                box-shadow: 0 0 20px rgb(223, 9, 9);
                color: white;
            }
        }
        .my_hands.active{
            left: 0;bottom: 0vw;
            width: 100%;
            height: 100%;
            z-index: 3;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.514);
            box-shadow: 0 0 100px black;
            ul{
                position: absolute; left: 0;bottom: 0vw;
                width: 100%;
                height: 10vw;
                li{
                    margin: .5vw 0 0 0vw;
                }
            }
        }
        .select_combo_panel{
            position: absolute; left: 50%; top : 50%;
            margin: -7.5vw 0 0 -20vw;
            width: 40vw;
            height: 15vw;
            border-radius: 10px;
            box-shadow: 0 0 200px rgb(241, 129, 0);
            border: 5px solid rgb(218, 120, 9);
            background: url('./assets/main/combo.jpg')no-repeat;
            background-size: cover;
            z-index: 10;
            transition: all .25s;
            overflow: hidden;
            ul{
                li{
                    position: relative;
                    float: left;
                    margin: 2.5vw 0 0 4vw;
                    width: 8vw;
                    height: 10vw;
                    box-sizing: border-box;
                    background: rgb(102, 0, 0);
                    cursor: pointer;
                    border: .3vw solid rgb(252, 185, 0);
                    box-shadow: 0 2px 5px rgb(0, 0, 0);
                    border-radius: 10px;
                    transition: all .4s;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 7px;
                    }
                    .ad{
                        position: absolute; left: 0; bottom: 0;
                        width: 2vw;
                        height: 2vw;
                        font-size: 1px;
                        text-align: center;
                        line-height: 2vw;
                        color: white;
                        font-weight: bold;
                        border-radius: 0 8px 0 8px;
                        background: rgb(255, 153, 0);
                    }
                    .hp{
                        position: absolute; right: 0; bottom: 0;
                        width: 2vw;
                        height: 2vw;
                        font-size: 1px;
                        text-align: center;
                        line-height: 2vw;
                        color: white;
                        font-weight: bold;
                        border-radius: 8px 0 8px 0;
                        background: red;
                    }
                }
                li:hover{
                    z-index: 3;
                    animation: combo .25s ease-out 1;
                }
                
            }
        }
        
  }
  .change_minions_place_panel{
      position: absolute; top: 50vh; left: 15vw;
      margin: -20vw 0 0 0;
      transform: translate(-2.5px,-2.5px);
      width: 70vw;
      height: 40vw;
      border: 5px solid rgba(85, 40, 3, 0);
      border-radius: 15px;
      box-shadow: 0 0 50px black;
      background: rgba(0, 0, 0, 0.6);
      .copy_place{
        position: absolute; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 60vw;
        height: 20vw;
        z-index: 1;
        ul,ol{
          width: 60vw;
          height: 10vw;
            li{
                position: relative;
                float: left;
                margin: .5vw 0 0 1.4vw;
                width: 7vw;
                height: 9vw;
                box-sizing: border-box;
                background: rgba(202, 202, 202, 0.2);
                cursor: pointer;
                border: .3vw solid rgb(102, 0, 0);
                transition: all .2s;
                border-radius: 10px;
            }
        }
      }
  }
  .report_panel{
    position: absolute; left: 0; top : 0;
    transition: all .3s;
    width: 100vw;
    height: 100vh;
    background: #000;
    .bg_img{
        position: absolute; left: 50%; top : 50%;
        margin: -45vh 0 0 -40vw;
        width: 80vw;
        height: 90vh;
        // animation: report_show .5s ease-out 1;
        .all_info{
            position: absolute; left: 10vw; top : 45vh;
            width: 60vw;
            height:35vh;
            // background: rgb(163, 163, 163);
            color: rgb(88, 50, 0);
            font-weight: bolder;
            font-size:1vw;
            .your_hero{ 
                ul{
                    width: 60vw;
                    height: 20vw;
                    max-height: 35vh;
                    overflow-x:hidden ;
                    overflow-y: scroll;
                    li{
                        position: relative;
                        float:left;
                        width: 12vw;
                        height:12vw;
                        padding: 0 0 3vw 0;
                        .title{
                            margin:.5vw 0 0 1vw;
                            width:10vw;
                            height:3vw;
                            text-align:center;
                            line-height:3vw;
                            font-size:1.6vw;
                            color:white;
                            border-radius: .3vw;
                            background: rgb(88, 50, 0);
                        }
                        .box{
                            position: relative;
                            margin:.5vw 0 0 1vw;
                            width:10vw;
                            height:10vw;
                            text-align:center;
                            line-height:3vw;
                            font-size:2vw;
                            color:white;
                            text-align: center;
                            line-height: 10vw;
                            border-radius: .3vw;
                            background: rgb(88, 50, 0);
                            img{
                                position: absolute; left: 50%; top : 50%;
                                transform : translate(-50%,-50%);
                                width: 8vw;
                                height:8vw;
                                box-sizing: border-box;
                                border-radius: 50%;
                                border:1vw solid rgb(59, 29, 2);
                            }
                        }
                    }
                }
                
            }
        }
        .close_btn{
            position: absolute; right: -10vw; top:50%;
            margin:-15vh 0 0 0;
            width: 20vw;
            height:30vh
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 5vw;
        }
        .my_minions{
        position: absolute; top: 20vh;
        left: 50%;
        margin: 0 0 0 -30vw;
                width: 60vw;
                height: 10vw;
                ul{
                    
                    li{
                        position: relative;
                        float: left;
                        margin: .5vw 0 0 1.4vw;
                        width: 7vw;
                        height: 9vw;
                        box-sizing: border-box;
                        background: rgb(102, 0, 0);
                        cursor: pointer;
                        border: .3vw solid rgb(102, 0, 0);
                        box-shadow: 0 1px 4px rgb(85, 85, 85);
                        transition: all .2s;
                        border-radius: 10px;
                        .wind_fury_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: linear-gradient(to right bottom,rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.9));
                            // background: rgba(255, 255, 255, 0.473);
                            border: .3vw solid rgb(102, 0, 0);
                            animation: windFury 5s linear infinite;
                        }
                        .toxic_mask{
                            position: absolute; left: 2.2vw; bottom: -1.2vw;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.5vw;
                            line-height: 1.5vw;
                            text-align: center;
                            text-shadow: 0 0 2px greenyellow;
                            color: rgb(0, 161, 40);
                            border-radius: 50%;
                            transition: all .5s;
                        }
                        .death_mask{
                            position: absolute; left: 2.2vw; bottom: -1vw;
                            width: 2vw;
                            height: 2vw;
                            font-size: 2vw;
                            line-height: 2vw;
                            text-align: center;
                            color: rgb(168, 168, 168);
                            text-shadow: 0 0 10px black;
                            border-radius: 50%;
                        }
                        .ridicule_mask{
                            position: absolute; left: -.6vw; top: -.6vw;
                            width: 6.4vw;
                            height: 8.4vw;
                            // box-sizing: border-box;
                            border-radius: 0 0 12px 12px;
                            background: rgba(255, 208, 0, 0);
                            border: .6vw solid rgb(105, 105, 105);
                            box-shadow: 0 2px 3px rgb(49, 49, 49);
                            transition: all .6s;
                        }
                        .shield_mask{
                            position: absolute; left: -.8vw; top: -.8vw;
                            width: 8vw;
                            height: 10vw;
                            box-sizing: border-box;
                            border-radius: 75%;
                            background: rgba(255, 208, 0, 0.3);
                            border: .3vw solid rgb(255, 208, 0);
                            box-shadow: 0 0 10px yellow;
                            transition: all .5s;
                        }
                        .alive_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: linear-gradient(to right bottom,rgba(0, 119, 128, 0.9),rgba(0, 119, 128, 0.3),rgba(0, 119, 128, 0.9));
                            border: .3vw solid rgb(102, 0, 0);
                        }
                        .info_mask{
                            display: none;
                            position: absolute; top: -6.5vw; left: -2.5vw;
                            width: 12vw;
                            height: 6vw;
                            font-size: 1vw;
                            overflow-x: hidden;
                            overflow-y: scroll;
                            border-radius: 5px;
                            color: white;
                            background: rgb(31, 31, 31);
                            border: .5vw solid rgb(153, 153, 153);
                            box-sizing: border-box;
                            animation: emerge .2s linear 1;
                            .name{
                                display: inline-block;
                                width: 11vw;
                                height: 1vw;
                                text-align: center;
                            }
                        }
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 7px;
                            z-index: 1;
                        }
                        
                        .purchase_mask,.sell_change_mask{
                            position: absolute; top: 0; left: 0;
                            display: none;
                            width: 100%;
                            height: 100%;
                            border-radius: 6px;
                            background: rgba(0, 0, 0);
                            transition: all .8s;
                            z-index: 3;
                            .purchase_btn,.sell_btn,.change_btn{
                                position: absolute; left: 50%; top : 50%;
                                transform : translate(-50%,-50%);
                                width: 5vw;
                                height: 2vw;
                                text-align: center;
                                line-height: 2vw;
                                font-size: 1.2vw;
                                border-radius: 5px;
                                color: white;
                                background: rgb(169, 4, 190);
                                z-index: 2;

                            }
                            .sell_btn{
                                background: rgb(219, 117, 0);
                                transform: translate(-50%,-140%);
                            }
                            .change_btn{
                                background: rgb(2, 167, 131);
                                transform: translate(-50%,40%);
                            }
                        }
                        .level{
                            position: absolute; left: 0; top: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1px;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bold;
                            border-radius: 7px 0 8px 0;
                            background: rgb(146, 5, 182);
                        }
                        .ad{
                            position: absolute; left: 0; bottom: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.3vw;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bolder;
                            border-radius: 0 8px 0 7.5px;
                            background: rgb(255, 153, 0);
                            // text-shadow: 0 0 2px black;
                        }
                        .ad.active,.hp.active{
                            animation: live_number .4s linear 1;
                        }
                        .hp{
                            position: absolute; right: 0; bottom: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.3vw;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bold;
                            border-radius: 8px 0 7.5px 0;
                            background: red;
                        }
                        .gold_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: rgba(255, 208, 0, 0.3);
                            border: .3vw solid rgb(255, 230, 0);
                            box-shadow: 0 0 5px yellow;
                        }
                        .freeze_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: rgba(0, 204, 255, 0.3);
                            border: .3vw solid rgb(0, 247, 255);
                            z-index: 1;
                        }
                    }
                }
        }
    }
    

  }
  .container_c{
        position: absolute; top: 50vh; left: 14vw;
        margin: -20vw 0 0 0;
        width: 70vw;
        height: 40vw;
        border: .5vw solid rgb(85, 40, 3);
        border-radius: 15px;
        background: url('./assets/main/container.jpg')no-repeat;
        background-size: cover;
        animation: combat_table 1.2s ease-in-out 1;
        .exit{
            position: absolute; right: 1vw; top: 1vw;
            width: 10vw;
            height: 4vw;
            text-align: center;
            line-height: 3vw;
            font-size: 1vw;
            box-sizing: border-box;
            border-radius: 3px;
            border: .5vw solid rgb(63, 36, 0);
            background: linear-gradient(to right,#502c0f,#8d603b,#502c0f);
            color: rgb(255, 255, 255);
            box-shadow: -1px 1px 2px rgb(36, 36, 36);
        }
        .exit::after{
            background-image: linear-gradient(180deg,#2cc0a9,#09332c);
        }
        .enemy_hero{
            position: absolute; left: 30vw; top: -2vw;
            width: 10vw;
            height: 10vw;
            box-sizing: border-box;
            background: rgb(161, 72, 0);
            border: .5vw solid rgb(61, 35, 0);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 5px 5px rgb(44, 44, 44);
            .chose_btn{
                position: absolute; left: 50%; top : 50%;
                transform : translate(-50%,-50%);
                width: 6vw;
                height: 3vw;
                text-align: center;
                line-height: 1.8vw;
                font-size: 1vw;
                box-sizing: border-box;
                border-radius: 3px;
                border: .5vw solid rgb(63, 36, 0);
                background: rgb(107, 49, 2);
                color: white;
            }
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .my_hero{
            position: absolute; left: 30vw; bottom: -2vw;
            width: 10vw;
            height: 10vw;
            box-sizing: border-box;
            background: rgb(161, 72, 0);
            border: .5vw solid rgb(61, 35, 0);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 5px rgb(44, 44, 44);
            .skill{
                position: absolute; left: 10vw; bottom: -0vw;
                width: 7vw;
                height: 7vw;
                box-sizing: border-box;
                background: rgb(161, 72, 0);
                border: .8vw solid rgb(61, 35, 0);
                border-radius: 50%;
                box-shadow: -1px 2px 5px rgb(0, 0, 0);
                transition: all .25s;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            img{
                width: 100%;
                height:100%;
                border-radius: 50%;
            }
        }
        .minions_panel{
            position: absolute; left: 50%; top : 50%;
            transform : translate(-50%,-50%);
            width: 60vw;
            height: 20vw;
            z-index: 1;
            .bob_minions,.my_minions{
                width: 60vw;
                height: 10vw;
                ul{
                    position: relative;
                    li{
                        // position: absolute;
                        // float: left;
                        // margin: .5vw 0 0 1.4vw;
                        width: 7vw;
                        height: 9vw;
                        box-sizing: border-box;
                        background: rgb(102, 0, 0);
                        // cursor: pointer;
                        border: .3vw solid rgb(102, 0, 0);
                        box-shadow: 0 1px 4px rgb(61, 61, 61);
                        // transition: all .2s;
                        border-radius: 10px;
                        .wind_fury_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: linear-gradient(to right bottom,rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.9));
                            // background: rgba(255, 255, 255, 0.473);
                            border: .3vw solid rgb(102, 0, 0);
                            animation: windFury 5s linear infinite;
                        }
                        .toxic_mask{
                            position: absolute; left: 2.2vw; bottom: -1.2vw;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.5vw;
                            line-height: 1.5vw;
                            text-align: center;
                            text-shadow: 0 0 2px greenyellow;
                            color: rgb(0, 161, 40);
                            border-radius: 50%;
                            transition: all .5s;
                        }
                        .death_mask{
                            position: absolute; left: 2.2vw; bottom: -1vw;
                            width: 2vw;
                            height: 2vw;
                            font-size: 2vw;
                            line-height: 2vw;
                            text-align: center;
                            color: rgb(168, 168, 168);
                            text-shadow: 0 0 10px black;
                            border-radius: 50%;
                        }
                        .ridicule_mask{
                            position: absolute; left: -.6vw; top: -.6vw;
                            width: 6.4vw;
                            height: 8.4vw;
                            // box-sizing: border-box;
                            border-radius: 0 0 12px 12px;
                            background: rgba(255, 208, 0, 0);
                            border: .6vw solid rgb(105, 105, 105);
                            box-shadow: 0 2px 3px rgb(49, 49, 49);
                            transition: all .6s;
                        }
                        .shield_mask{
                            position: absolute; left: -.8vw; top: -.8vw;
                            width: 8vw;
                            height: 10vw;
                            box-sizing: border-box;
                            border-radius: 75%;
                            background: rgba(255, 208, 0, 0.3);
                            border: .3vw solid rgb(255, 208, 0);
                            box-shadow: 0 0 10px yellow;
                            transition: all .5s;
                        }
                        .alive_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: linear-gradient(to right bottom,rgba(0, 119, 128, 0.9),rgba(0, 119, 128, 0.3),rgba(0, 119, 128, 0.9));
                            border: .3vw solid rgb(102, 0, 0);
                        }
                        .info_mask{
                            display: none;
                            position: absolute; top: -6.5vw; left: -2.5vw;
                            width: 12vw;
                            height: 6vw;
                            font-size: 1vw;
                            overflow-x: hidden;
                            overflow-y: scroll;
                            border-radius: 5px;
                            color: white;
                            background: rgb(31, 31, 31);
                            border: .5vw solid rgb(153, 153, 153);
                            box-sizing: border-box;
                            animation: emerge .2s linear 1;
                            .name{
                                display: inline-block;
                                width: 11vw;
                                height: 1vw;
                                text-align: center;
                            }
                        }
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 7px;
                            z-index: 1;
                        }
                        
                        .purchase_mask,.sell_change_mask{
                            position: absolute; top: 0; left: 0;
                            display: none;
                            width: 100%;
                            height: 100%;
                            border-radius: 6px;
                            background: rgba(0, 0, 0);
                            transition: all .8s;
                            z-index: 3;
                            .purchase_btn,.sell_btn,.change_btn{
                                position: absolute; left: 50%; top : 50%;
                                transform : translate(-50%,-50%);
                                width: 5vw;
                                height: 2vw;
                                text-align: center;
                                line-height: 2vw;
                                font-size: 1.2vw;
                                border-radius: 5px;
                                color: white;
                                background: rgb(169, 4, 190);
                                z-index: 2;

                            }
                            .sell_btn{
                                background: rgb(219, 117, 0);
                                transform: translate(-50%,-140%);
                            }
                            .change_btn{
                                background: rgb(2, 167, 131);
                                transform: translate(-50%,40%);
                            }
                        }
                        .level{
                            position: absolute; left: 0; top: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1px;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bold;
                            border-radius: 7px 0 8px 0;
                            background: rgb(146, 5, 182);
                        }
                        .ad{
                            position: absolute; left: 0; bottom: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.3vw;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bolder;
                            border-radius: 0 8px 0 7.5px;
                            background: rgb(255, 153, 0);
                            // text-shadow: 0 0 2px black;
                        }
                        .ad.active,.hp.active{
                            animation: live_number .4s linear 1;
                        }
                        .hp{
                            position: absolute; right: 0; bottom: 0;
                            width: 2vw;
                            height: 2vw;
                            font-size: 1.3vw;
                            text-align: center;
                            line-height: 2vw;
                            color: white;
                            font-weight: bold;
                            border-radius: 8px 0 7.5px 0;
                            background: red;
                        }
                        .gold_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: rgba(255, 208, 0, 0.3);
                            border: .3vw solid rgb(255, 230, 0);
                            box-shadow: 0 0 5px yellow;
                        }
                        .freeze_mask{
                            position: absolute; left: -.3vw; top: -.3vw;
                            width: 7vw;
                            height: 9vw;
                            box-sizing: border-box;
                            border-radius: 10px;
                            background: rgba(0, 204, 255, 0.3);
                            border: .3vw solid rgb(0, 247, 255);
                            z-index: 1;
                            transition: all .3s;
                        }
                    }
                }
            }
            .bob_minions{
              ul{
                li.active{
                    animation: refresh .3s linear 1;
                }
                li:nth-of-type(1).active{
                    animation-delay: -0.2s;
                }
                li:nth-of-type(2).active{
                    animation-delay: -0.16s;
                }
                li:nth-of-type(3).active{
                    animation-delay: -0.12s;
                }
                li:nth-of-type(4).active{
                    animation-delay: -0.08s;
                }
                li:nth-of-type(5).active{
                    animation-delay: -0.04s;
                }
                li:nth-of-type(6).active{
                    animation-delay: -0s;
                }
                li:nth-of-type(7).active{
                    animation-delay: -0s;
                }
              }
            }
            .my_minions{
              ul{
                li.active{
                    animation: refresh .18s linear 1;
                }
              }
            }
        }
        .begin_btn{
            position: absolute; right: -5vw; top: 50%;
            margin: -2vw 0 0 0 ;
            width: 10vw;
            height: 4vw;
            box-sizing: border-box;
            font-size: 1vw;
            color: white;
            text-align: center;
            line-height: 3vw;
            font-weight: bolder;
            border-radius: .5vw;
            border: .5vw solid rgb(59, 26, 1);
            background: rgb(137, 3, 163);
            box-shadow: -1px 2px 3px rgb(51, 51, 51);
        }

  }
  .container_c.active{
        animation: combat_table_leave 1.2s ease-in-out 1;
  }
  .select_enemy_hero_panel{
        position: absolute; left: 0; top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        transition: all .2s;
        z-index:1;
        .box{
            position: absolute; top: 8vh; left: 15vw;
            width: 71vw;
            height: 84vh;
            background: url('./assets/main/container.jpg')no-repeat;
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
                    border: 1vw solid rgb(94, 7, 86);
                    background: rgb(94, 7, 86);
                    box-sizing: border-box;
                    border-radius: 10px;
                    box-shadow: 0 3px 5px rgb(54, 54, 54);
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 1px;
                    }
                }
            }
        }
  }
  .hero_info_panel{
        position: absolute; top: 8vh; left: 15vw;
        width: 71vw;
        height: 84vh;
        background: url('./assets/main/container.jpg')no-repeat;
        background-size: cover;
        box-sizing: border-box;
        border-radius: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        border: 1vw solid rgb(85, 40, 3);
        transition: all .2s;
        z-index:2;
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
            position: absolute; left: 20vw; top: 44vh;
            width: 30vw;
            height: 10vw;
            font-weight: bolder;
            font-size: 1.5vw;
        }
        .select_btn{
            position: absolute; left: 27vw ; bottom: 3vw;
            width: 16vw;
            height: 4vw;
            text-align: center;
            line-height: 4vw;
            font-size: 1.5vw;
            border-radius: 10px;
            cursor: pointer;
            color: white;
            background: rgb(114, 4, 4);
            box-shadow: 0 2px 5px black;
        }
  }
}


</style>
