let twoMinionData = {
    /*
        随从属性说明
        level == 随从的星级
        name --随从的昵称，名字
        type -- 随从的类型
        attack -- 随从的攻击力
        health -- 随从的生命值
        skill -- 随从的技能   
            type : skill 的内置属性，表示该随从具体是触发什么类型技能效果的
        img  -- 随从的图片资源
    */
    data(){
        return{
            two_minions:[
                //龙
                {
                    name : '雕文守卫者',
                    ad : 2,
                    hp : 4,
                    level : 2,
                    type : '龙',
                    skill:{
                        type:'fight',
                        info : '每当该随从攻击，便使其攻击力翻倍。',
                        fight(){

                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:2,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/diaowenshouweizhe.jpg')
                },
                //野兽
                {
                    name : '下水道老鼠',
                    ad : 3,
                    hp : 2,
                    level : 2,
                    type : '野兽',
                    skill:{
                        type:'death',
                        info : '亡语：召唤一只2/3并具有嘲讽的龟。',
                        death(){

                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : true,
                        toxic:false,
                        ridicule:false
                   },
                   init:{
                    ad:3,
                    hp:2
                },
                    isGold : false,
                    img:require('../../assets/minions/野兽/xiashuidaolaoshu.png')
                },
                {
                    name : '跳蛙骑士',
                    ad : 3,
                    hp : 3,
                    level : 2,
                    type : '野兽',
                    skill:{
                        type:'death',
                        info : '亡语：使一个友方野兽获得+1/+1以及此 亡语。',
                        death(){

                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : true,
                        toxic:false,
                        ridicule:false
                   },
                   init:{
                    ad:3,
                    hp:3
                },
                    isGold : false,
                    img:require('../../assets/minions/野兽/tiaowaqishi.png')
                },
                {
                    name : '暴怒的巨蜥',
                    ad : 3,
                    hp : 2,
                    level : 2,
                    type : '野兽',
                    skill:{
                        type:'continue',
                        info : '在你使用一张亡语随从牌后，获得+1/+2。',
                        continue(index,id){
                            if(this.my_minions[id].isGold){
                                if(this.my_minions[index].character.death){
                                    this.my_minions[id].ad += 2;
                                    this.my_minions[id].hp += 4;
                                    //数据增加动画
                                    this.$refs.myMinionAd[id].classList.add('active');
                                    this.$refs.myMinionHp[id].classList.add('active');
                                    setTimeout(()=>{
                                        this.$refs.myMinionAd[id].classList.remove('active');
                                        this.$refs.myMinionHp[id].classList.remove('active');
                                    },400)
                                    
                                }
                            }else{
                                if(this.my_minions[index].character.death){
                                    this.my_minions[id].ad += 1;
                                    this.my_minions[id].hp += 2;
                                    //数据增加动画
                                    this.$refs.myMinionAd[id].classList.add('active');
                                    this.$refs.myMinionHp[id].classList.add('active');
                                    setTimeout(()=>{
                                        this.$refs.myMinionAd[id].classList.remove('active');
                                        this.$refs.myMinionHp[id].classList.remove('active');
                                    },400)
                                    
                                }
                            }
                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                   },
                   init:{
                    ad:3,
                    hp:2
                },
                    isGold : false,
                    img:require('../../assets/minions/野兽/baonujuxi.png')
                },
                //恶魔
                {
                    name : '小鬼囚徒',
                    ad : 2,
                    hp : 3,
                    level : 2,
                    type : '恶魔',
                    skill:{
                        type:'death',
                        info  :'嘲讽，亡语：召唤一个1/1的小鬼。',
                        death(){

                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : true,
                        toxic:false,
                        ridicule:true
                    },
                    init:{
                        ad:2,
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/xiaoguiqiutu.jpg')
                },
                {
                    name : '纳斯雷兹姆监工',
                    ad : 2,
                    hp : 4,
                    level : 2,
                    type : '恶魔',
                    skill:{
                        type:'single_cry_select',
                        info :'战吼：使一个友方恶魔获得+2/+2。',
                        single_cry_select(index){
                            //计数恶魔的数目
                            let fish_num = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '恶魔' || this.my_minions[i].type == '混合') && i!= index){
                                    fish_num ++;
                                }
                            }
                            if(fish_num>0){
                                if(this.my_minions[index].isGold){
                                    this.status.isSelectMinionsPlace = true
                                }else{
                                    this.status.isSelectMinionsPlace = true
                                }
                            }else{
                                this.my.putOriginIndex = ''
                            }
                        },
                        cry(index){
                            if(this.my_minions[this.my.putOriginIndex].isGold){
                                if((this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 4;
                                            this.my_minions[index].hp += 4;
                                        }
                                    }else{
                                        this.my_minions[index].ad += 4;
                                        this.my_minions[index].hp += 4;
                                    }
                                    //数据增加动画
                                    this.dataAnimation(index,'all');

                                    this.my.putOriginIndex = '',
                                    this.status.isSelectMinionsPlace = false
                                }
                            }else{
                                if((this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 2;
                                            this.my_minions[index].hp += 2;
                                        }
                                    }else{
                                        this.my_minions[index].ad += 2;
                                        this.my_minions[index].hp += 2;
                                    }
                                    //数据增加动画
                                    this.dataAnimation(index,'all');

                                    this.my.putOriginIndex = '',
                                    this.status.isSelectMinionsPlace = false
                                }
                            }
                        }
                   },
                   character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                   },
                   init:{
                    ad:2,
                    hp:4
                },
                   isGold : false,
                   img:require('../../assets/minions/恶魔/nasileizimujiangong.png')
                },
                //元素
                {
                    name : '派对元素',
                    ad : 3,
                    hp : 2,
                    level : 2,
                    type : '元素',
                    skill:{
                        type:'continue',
                        info :'在你使用一张元素牌后，随机使另一个友方元素获得+1/+1。',
                        continue(index,id){
                            if(this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合'){
                                //存储所有元素索引
                                let ele_arr = []
                                for(let i=0;i<7;i++){
                                    if((this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合') && id != index && index != i){
                                        ele_arr.push(i)
                                    }
                                }
                                if(ele_arr.length > 0){
                                    let random = Math.floor(Math.random()*ele_arr.length)
                                    if(this.my_minions[id].isGold){
                                        this.my_minions[ele_arr[random]].ad += 2
                                        this.my_minions[ele_arr[random]].hp += 2
                                    }else{
                                        this.my_minions[ele_arr[random]].ad += 1
                                        this.my_minions[ele_arr[random]].hp += 1
                                        
                                    }
                                    //现境大师函数
                                    this.realMasterFunction();
                                    //数据增加动画
                                    this.dataAnimation(ele_arr[random],'all');
                                }
                            }
                        }
                   },
                   character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:3,
                        hp:2
                    },
                   isGold : false,
                   img:require('../../assets/minions/元素/paiduiyuansu.png')
                },
                {
                    name : '熔融岩石',
                    ad : 2,
                    hp : 4,
                    level : 2,
                    type : '元素',
                    skill:{
                        type:'continue',
                        info :'嘲讽 在你使用一张元素牌后，获得+1生命值。',
                        continue(index,id){
                            if((this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合') && index != id){
                                if(this.my_minions[id].isGold){
                                    this.my_minions[id].hp += 2;
                                    //现境大师函数
                                    this.realMasterFunction();
                                    //数据增加动画
                                    this.dataAnimation(id,'hp');

                                }else{
                                    this.my_minions[id].hp += 1;
                                    //现境大师函数
                                    this.realMasterFunction();
                                    //数据增加动画
                                    this.dataAnimation(id,'hp');
                                }
                            }
                        }
                   },
                   character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:true
                    },
                    init:{
                        ad:2,
                        hp:4
                    },
                   isGold : false,
                   img:require('../../assets/minions/元素/rongrongyanshi.png')
                },
                //机械
                {
                    name : '爆爆机器人',
                    ad : 2,
                    hp : 2,
                    level : 2,
                    type : '机械',
                    skill:{
                        type:'death',
                        info  :'亡语：随机对一个敌方随从造成4点伤害。',
                        death(){

                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : true,
                        toxic:false,
                        ridicule:false
                   },
                   init:{
                    ad:2,
                    hp:2
                },
                    isGold : false,
                    img:require('../../assets/minions/机械/baobaojiqiren.jpg')
                },
                {
                    name : '金刚刃爪兽',
                    ad : 3,
                    hp : 3,
                    level : 2,
                    type : '机械',
                    skill:{
                        type:'all_cry',
                        info  :'战吼：使你的其他机械获得+2攻击力。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name != '' && this.my_minions[i].type == '机械' && i!= index){
                                        this.my_minions[i].ad += 4;
                                        //数据增加动画
                                        this.dataAnimation(i,'ad');
                                    }
                                }
                            }else{
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name != '' && this.my_minions[i].type == '机械' && i!= index){
                                        this.my_minions[i].ad += 2;
                                        //数据增加动画
                                        this.dataAnimation(i,'ad');
                                    }
                                }
                            }
                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                   },
                   init:{
                    ad:3,
                    hp:3
                },
                    isGold : false,
                    img:require('../../assets/minions/机械/jinganlinzhuashou.png')
                },
                {
                    name : '麦田傀儡',
                    ad : 2,
                    hp : 3,
                    level : 2,
                    type : '机械',
                    skill:{
                        type:'death',
                        info :'亡语：召唤一个2/1的损坏的傀儡。',
                        death(){

                        }
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : true,
                    toxic:false,
                    ridicule:false
               },
               init:{
                ad:2,
                hp:3
            },
                   isGold : false,
                   img:require('../../assets/minions/机械/maitiankuilei.png')
                },
                //海盗
                {
                    name : '白赚赌徒',
                    ad : 3,
                    hp : 3,
                    level : 2,
                    type : '海盗',
                    skill:{
                        type:'death',
                        info : '出售该随从可以获得3枚铸币。',
                        death(){

                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                   },
                   init:{
                    ad:3,
                    hp:3
                },
                    isGold : false,
                    img:require('../../assets/minions/海盗/baizhuandutu.jpg')
                },
                {
                    name : '喊号食人魔',
                    ad : 3,
                    hp : 5,
                    level : 2,
                    type : '海盗',
                    skill:{
                        type:'death',
                        info : '嘲讽 在该随从受到攻击并没有死亡后，立即发起攻击。',
                        death(){

                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:true
                   },
                   init:{
                    ad:3,
                    hp:5
                },
                    isGold : false,
                    img:require('../../assets/minions/海盗/hanhaoshirenmo.png')
                },
                {
                    name : '南海船长',
                    ad : 3,
                    hp : 3,
                    level : 2,
                    type : '海盗',
                    skill:{
                        type:'on',
                        info : '你的其他海盗获得+1/+1。',
                        on(){

                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                   },
                   init:{
                    ad:3,
                    hp:3
                },
                    isGold : false,
                    img:require('../../assets/minions/海盗/nanhaichuanzhang.png')
                },
                //鱼人
                {
                    name : '老瞎眼',
                    ad : 2,
                    hp : 4,
                    level : 2,
                    type : '鱼人',
                    skill:{
                        type:'none',
                        info :'冲锋，在战场上每有一个其他鱼人便获得+1攻击力。',
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : false,
                    toxic:false,
                    ridicule:false
               },
               init:{
                ad:2,
                hp:4
            },
                   isGold : false,
                   img:require('../../assets/minions/鱼人/laoxiayan.png')
                },
                {
                    name : '鱼人领军',
                    ad : 3,
                    hp : 3,
                    level : 2,
                    type : '鱼人',
                    skill:{
                        type:'on',
                        info :'你的其他鱼人获得+2攻击力。',
                        on(){

                        }
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : false,
                    toxic:false,
                    ridicule:false
               },
               init:{
                    ad:3,
                    hp:3
                },
                   isGold : false,
                   img:require('../../assets/minions/鱼人/yurenlinjun.png')
                },
                {
                    name : '盐鳞队长',
                    ad : 3,
                    hp : 2,
                    level : 2,
                    type : '鱼人',
                    skill:{
                        type:'continue',
                        info :'在你使用一张 鱼人牌后，使其他两个友方鱼人获得+1生命值。',
                        continue(index,id){
                            if((this.my_minions[index].type == '鱼人' || this.my_minions[index].type == '混合') && index != id){
                                let fish_arr = []//存入鱼人的索引
                                for(let i=0;i<7;i++){
                                    if((this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && i != index){
                                        fish_arr.push(i)
                                    }
                                }
                                if(fish_arr.length == 1){
                                    if(this.my_minions[id].isGold){
                                        this.my_minions[fish_arr[0]].hp += 2
                                        //数据增加动画
                                        this.dataAnimation(fish_arr[0],'hp');
                                    }else{
                                        this.my_minions[fish_arr[0]].hp += 1
                                        //数据增加动画
                                        this.dataAnimation(fish_arr[0],'hp');
                                    }
                                }else if(fish_arr.length > 1){
                                    for(let i=0;i<2;i++){
                                        let random = Math.floor(Math.random() * fish_arr.length)
                                        if(this.my_minions[id].isGold){
                                            this.my_minions[fish_arr[random]].hp += 2
                                            //数据增加动画
                                            this.dataAnimation(fish_arr[random],'hp');
                                            fish_arr = fish_arr.filter((w,id)=>{
                                                return id != random
                                            })
                                        }else{
                                            this.my_minions[fish_arr[random]].hp += 1
                                            //数据增加动画
                                            this.dataAnimation(fish_arr[random],'hp');
                                            fish_arr = fish_arr.filter((w,id)=>{
                                                return id != random
                                            })
                                        }
                                    }
                                }
                            }
                        }
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : false,
                    toxic:false,
                    ridicule:false
               },
               init:{
                    ad:3,
                    hp:2
                },
                   isGold : false,
                   img:require('../../assets/minions/鱼人/yanlingduizhan.png')
                },
                //野猪人
                {
                    name : '路霸野猪人',
                    ad : 2,
                    hp : 4,
                    level : 2,
                    type : '野猪人',
                    skill:{
                        type:'passive',
                        info :'暴怒：获得一张鲜血宝石。',
                        passive(index){
                            if(this.my_minions[index].isGold){
                                if(this.my_minions[index].hp >= 2*this.pub_info.level){
                                    for(let i=0;i<2;i++){
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.bloodstone)
                                            this.peiJiReactive()
                                        }
                                    }
                                }
                                
                            }else{
                                if(this.my_minions[index].hp >= 2*this.pub_info.level){
                                    if(this.my.hands.length < 10){
                                        this.my.hands.push(this.bloodstone)
                                        this.peiJiReactive()
                                    }
                                }
                            }
                        }
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : false,
                    toxic:false,
                    ridicule:false
                    },
                    init:{
                        ad:2,
                        hp:4
                    },
                   isGold : false,
                   img:require('../../assets/minions/野猪人/lubayezhuren.png')
                },
                {
                    name : '坚牙野猪人',
                    ad : 5,
                    hp : 3,
                    level : 2,
                    type : '野猪人',
                    skill:{
                        type:'none',
                        info :'在鲜血宝石被用于该随从后，在下一场战斗中获得圣盾。',
                        none(){

                        }
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : false,
                    toxic:false,
                    ridicule:false
                    },
                    init:{
                        ad:5,
                        hp:3
                    },
                   isGold : false,
                   img:require('../../assets/minions/野猪人/shuyayezhuren.png')
                },
                //中立
                {
                    name : '蹒跚的食尸鬼',
                    ad : 1,
                    hp : 3,
                    level : 2,
                    type : '中立',
                    skill:{
                        type:'death',
                        info :'嘲讽，亡语：对所有随从造成1点伤害。',
                        death(){

                        }
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : true,
                    toxic:false,
                    ridicule:true
                    },
                    init:{
                        ad:1,
                        hp:3
                    },
                   isGold : false,
                   img:require('../../assets/minions/中立/panshangdeshishigui.png')
                },
                {
                    name : '无私的英雄',
                    ad : 2,
                    hp : 1,
                    level : 2,
                    type : '中立',
                    skill:{
                        type:'death',
                        info :'亡语：随机使一个友方随从获得圣盾。',
                        death(){

                        }
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : true,
                    toxic:false,
                    ridicule:false
               },
                init:{
                    ad:2,
                    hp:1
                },
                   isGold : false,
                   img:require('../../assets/minions/中立/wusideyingxiong.png')
                },
                {
                    name : '恩佐斯的子嗣',
                    ad : 2,
                    hp : 2,
                    level : 2,
                    type : '中立',
                    skill:{
                        type:'death',
                        info :'亡语：使你的所有随从获得+1/+1。',
                        death(){

                        }
                   },
                   character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : true,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:2,
                        hp:2
                    },
                   isGold : false,
                   img:require('../../assets/minions/中立/enzuosidezisi.png')
                },
                {
                    name : '野猪预言者',
                    ad : 3,
                    hp : 3,
                    level : 2,
                    type : '中立',
                    skill:{
                        type:'continue',
                        info :'每回合一次：在你使用一张野猪人后，获得一张鲜血宝石。',
                        continue(index,id){
                            if(!this.my_minions[id].skill.get){
                                if(this.my_minions[index].type == '野猪人' || this.my_minions[index].type == '混合'){
                                    if(this.my_minions[id].isGold){
                                        for(let i=0;i<2;i++){
                                            if(this.my.hands.length < 10){
                                                this.my.hands.push(this.bloodstone);
                                                this.peiJiReactive()
                                            }
                                        }
                                        this.my_minions[id].skill.get = true
                                    }else{
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.bloodstone);
                                            this.peiJiReactive()
                                        }
                                        this.my_minions[id].skill.get = true
                                    }
                                }
                            }
                        },
                        get:false
                   },
                   character:{
                    shield:false,
                    windFury:false,
                    relive:false,
                    death : false,
                    toxic:false,
                    ridicule:false
                    },
                    init:{
                        ad:3,
                        hp:3
                    },
                   isGold : false,
                   img:require('../../assets/minions/中立/yezhuyuyanzhe.png')
                },
                {
                    name : '雏龙走私商',
                    ad : 2,
                    hp : 5,
                    level : 2,
                    type : '中立',
                    skill:{
                        type:'death',
                        info :'在一条友方的龙获得攻击力后，使其获得+1生命值。',
                        death(){

                        }
                   },
                   character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:2,
                        hp:5
                    },
                   isGold : false,
                   img:require('../../assets/minions/中立/chulongzousishang.png')
                },
                {
                    name : '展馆茶杯',
                    ad : 2,
                    hp : 2,
                    level : 2,
                    type : '中立',
                    skill:{
                        type:'all_cry',
                        info :'战吼：随机使三个不同类型的友方随从获得+1/+1。',
                        all_cry(index){
                            let diff_arr = []
                            //两个for遍历数组，同名丢弃，异名的索引存入diff数组
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name != '' && i != index && this.my_minions[i].type != '中立'){
                                    if(diff_arr.length == 0){
                                        let ob = {
                                            type : this.my_minions[i].type,
                                            index : i
                                        }
                                        diff_arr.push(ob)
                                    }else{
                                        for(let j=0;j<diff_arr.length;j++){
                                            if(this.my_minions[i].type != diff_arr[j].type){
                                                if(j == diff_arr.length-1){
                                                    let ob = {
                                                        type : this.my_minions[i].type,
                                                        index : i
                                                    }
                                                    diff_arr.push(ob)
                                                }
                                            }else{
                                                break;
                                            }
                                        }
                                    } 
                                }
                            }
                            if(diff_arr.length > 0){
                                for(let i=0;i<diff_arr.length;i++){
                                    if(this.my_minions[index].isGold){
                                        this.my_minions[diff_arr[i].index].ad += 2
                                        this.my_minions[diff_arr[i].index].hp += 2
                                        //数据增加动画
                                        this.dataAnimation(diff_arr[i].index,'all');
                                    }else{
                                        this.my_minions[diff_arr[i].index].ad += 1
                                        this.my_minions[diff_arr[i].index].hp += 1
                                        //数据增加动画
                                        this.dataAnimation(diff_arr[i].index,'all');
                                    }
                                    if(i == 2){
                                        return;
                                    }
                                }
                            }
                        }
                   },
                   character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:2,
                        hp:2
                    },
                   isGold : false,
                   img:require('../../assets/minions/中立/zhangguanchabei.png')
                },
            ]
        }
    }
}
export default twoMinionData