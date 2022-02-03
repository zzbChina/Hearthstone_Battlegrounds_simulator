<template>
  <div class="question_panel">
      <div class="book_panel">
          <div class="close_question" @click="closeQuestion('close')"></div>
          <div class="logo_q">
            <img src="../assets/main/3_minisite_ways-to-play_icon_mode_fsg.png" alt="">
          </div>
          <div class="title">ABOUT</div>
          <div class="content">
              <h1 style="text-align:center">特殊说明</h1>
                <br>
                <br>
              1.为了更接近实际情况，以下随从进行了一定调整，虽然没有战斗环节，但是也可以发挥效果，其效果尽可能接近实际效果<br>
                --军情鳍处鱼人(new  每回合结束一定几率随机使一个鱼人获得剧毒)<br>
                --托尼双牙(new  每回合结束一定几率随机使一个海盗变成金色)<br>
                --宝石切分者(new 每存在一个圣盾随从，回合结束获得鲜血宝石)<br>
                --幼苗催生员(new  令周围友军回合结束增加属性)<br>
                --亚煞极的勇士(new  每有一个嘲讽随从，回合结束增加自己属性)<br>
                --珍惜增强幼龙(new  将战斗中增加属性变成回合结束，且只对泰蕾苟萨生效)<br>
                --帝国之手(new  回合结束增加嘲讽随从的攻击力)<br>
                --路霸野猪人(new  回合结束，根据自己的属性大小获取鲜血宝石)<br>
                --姆诺兹多(new  随机获得对应酒馆等级的随从)<br>
                --滑油机器人(new  每存在一个圣盾随从，则回合结束增加属性)<br>
                --狂棍野猪人(new 每回合结束获得鲜血宝石)<br>
                --巫翼巢穴主母(new 每回合结束一定几率获得一张战吼卡牌)<br>
                --不耐烦的末日预言者(new 每回合结束一定几率获得一张恶魔卡牌) <br>
                --温和的灯神(new 每回合结束将元素放入自己手中)<br>
              2.考虑部分随从的效果无法直观体现，现不对这些随从做处理
                --鱼人领军<br>
                --南海船长<br>
                --老瞎眼<br>
                --震地者<br>
              <br>
              <h1 style="text-align:center">更新日志</h1>
              <br>
              <br>
              2.2版本：<br>
                --1.修复回收魔灵减少刷新铸币可以叠加的bug，和酒馆旋风的bug<br>
                --2.新增英雄：伊瑟拉，吞噬者，铜须，挂架的阿凯，菌菇术士，林地守护者欧穆<br>
              <br>
              2.3版本：<br>
                --1.修复恶魔被禁用时仍可以使用加拉克苏斯大王的bug<br>
                --2.修复多个融合怪不能享受光牙加成的bug和拆解者的bug<br>
                --3.修复唤生响尾蛇不能给融合巨怪贴buff的bug<br>
                --4.獠牙队长的实际效果恢复至描述的效果<br>
                --5.新增六星随从大德鲁伊<br>
                --6.新增英雄：齐恩瓦拉<br>
              <br>
              2.4版本：<br>
                --1.修复元素糯米流bug<br>
                --2.修复齐恩瓦拉技能bug<br>
                --3.新增英雄：堕落的乔治,海盗帕奇斯,克苏恩<br>
                --4.优化部分效果<br>
              <br>
              2.5版本：<br>
                --1.修复偷偷龙和暴怒巨蜥的bug<br>
                --2.增加战斗模式<br>
                --3.优化铸币界面，增加英雄技能信息查看效果<br>
                <br>
              2.6版本：<br>
                --1.修复战斗攻击次序问题,修复英雄伊瑟拉无法保留冷冻的添加龙问题<br>
                --2.（红色雏龙,粗鄙的小鬼,巨狼戈德林）获得正确的效果<br>
                --3.优化战斗界面，英雄选择问题<br>
                --4.优化界面<br>
                <br>
                <br>
                <br>
                <br>
              <h5>作者：zzb</h5>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'Question',
    methods:{
        closeQuestion(type){
            this.$bus.$emit('openQuestion',type)
        }
    }
}
</script>

<style lang='less'>
.question_panel{
    position: fixed; top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.774);
    transition: all .2s;
    .book_panel{
        position: absolute; top: 5vh; left: 10vw;
        width: 80vw;
        height: 90vh;
        background: url('../assets/main/1_esports_minisite_battlegrounds_match_bg2.jpg')no-repeat;
        background-size: cover;
        .close_question{
            position: absolute; right: 5vh;top: 5vh;
            width: 15px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            color: rgb(255, 136, 0);

        }
        .logo_q{
          position: absolute; left: 5vh; top: 5vh;
          width: 15vh;
          height: 15vh;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .title{
            margin: 5vh 0 0 0;
            width: 100%;
            height: 10vh;
            font-size: 8vh;
            line-height: 10vh;
            color: rgb(255, 255, 255);
            font-weight: bolder;
            // font-family: 'Courier New', Courier, monospace;
            font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            text-align: center;
        }
        .content{
            margin: 0 0 0 5vw;
            width: 70vw;
            height: 70vh;
            overflow-x:hidden ;
            overflow-y: scroll;
            font-size: 1vw;
            font-weight: bold;
            color: rgb(255, 255, 255);
            h5{
                text-align: right;
            }
            animation: showWords 1s linear 1;
        }
    }
}
</style>