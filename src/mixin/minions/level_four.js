

let fourMinionData = {
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
            four_minions:[
                //龙
                {
                    name : '深蓝刃鳞龙人',
                    ad : 5,
                    hp : 5,
                    level : 4,
                    type : '龙',
                    skill:{
                        type:'passive',
                        info : '在你的回合结束时，随机使另一个友方随从获得+3攻击力。',
                        passive(index){
                            if(this.my_minions[index].isGold){            
                                let min = 0;
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name != ''){
                                        min = min+1;
                                    }
                                }
                                if(min >= 2){
                                    while(min){
                                        let random = Math.floor(Math.random()*7)//random为0-4
                                        if(this.my_minions[random].name != '' && random != index){
                                            this.my_minions[random].ad+=6;
                                            this.ariseChuLong(random)
                                            if(this.my_minions[random].type == '元素' || this.my_minions[random].type == '混合'){
                                                this.realMasterFunction();
                                            }
                                            //数据增加动画
                                            this.$refs.myMinionAd[random].classList.add('active');
                                            setTimeout(()=>{
                                                this.$refs.myMinionAd[random].classList.remove('active');
                                            },400)
                                            return;
                                        }
                                    }
                                }
                            }else{
                                let min = 0;
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name != ''){
                                        min = min+1;
                                    }
                                }
                                if(min >= 2){
                                    while(min){
                                        let random = Math.floor(Math.random()*7)//random为0-4
                                        if(this.my_minions[random].name != '' && random != index){
                                            this.my_minions[random].ad+=3;
                                            this.ariseChuLong(random)
                                            if(this.my_minions[random].type == '元素' || this.my_minions[random].type == '混合'){
                                                this.realMasterFunction();
                                            }
                                            //数据增加动画
                                            this.$refs.myMinionAd[random].classList.add('active');
                                            setTimeout(()=>{
                                                this.$refs.myMinionAd[random].classList.remove('active');
                                            },400)
                                            return;
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
                        ad:5,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/shenlanrenlinlongren.jpg')
                },
                {
                    name : '珍稀增强幼龙',
                    ad : 3,
                    hp : 3,
                    level : 4,
                    type : '龙',
                    skill:{
                        type:'passive',
                        info  :'战斗开始时：每有一条友方的龙，便使相邻的随从获得+1/+1。',
                        passive(index){
                            let dragon_num = 0
                            for(let i =0;i<7;i++){
                                if((this.my_minions[i].type == '龙' || this.my_minions[i].type == '混合') && i != index){
                                    dragon_num ++;
                                }
                            }

                            if(dragon_num>0){
                                if(this.my_minions[index].isGold){
                                    if((index-1) >= 0){
                                        if(this.my_minions[index-1].name == '泰蕾苟萨'){
                                            if(this.my_minions[index-1].isGold){
                                                this.my_minions[index-1].ad += dragon_num*4;
                                                this.my_minions[index-1].hp += dragon_num*4;
                                                //数据增加动画
                                                this.dataAnimation(index-1,'all');
                                            }else{
                                                this.my_minions[index-1].ad += dragon_num*2;
                                                this.my_minions[index-1].hp += dragon_num*2;
                                                //数据增加动画
                                                this.dataAnimation(index-1,'all');
                                            }
                                        }
                                    }
                                    if((index+1) <= 6){
                                        if(this.my_minions[index+1].name == '泰蕾苟萨'){
                                            if(this.my_minions[index+1].isGold){
                                                this.my_minions[index+1].ad += dragon_num*4;
                                                this.my_minions[index+1].hp += dragon_num*4;
                                                //数据增加动画
                                                this.dataAnimation(index+1,'all');
                                            }else{
                                                this.my_minions[index+1].ad += dragon_num*2;
                                                this.my_minions[index+1].hp += dragon_num*2;
                                                //数据增加动画
                                                this.dataAnimation(index+1,'all');
                                            }
                                        }
                                    }
                                }else{
                                    if((index-1) >= 0){
                                        if(this.my_minions[index-1].name == '泰蕾苟萨'){
                                            if(this.my_minions[index-1].isGold){
                                                this.my_minions[index-1].ad += dragon_num*2;
                                                this.my_minions[index-1].hp += dragon_num*2;
                                                //数据增加动画
                                                this.dataAnimation(index-1,'all');
                                            }else{
                                                this.my_minions[index-1].ad += dragon_num;
                                                this.my_minions[index-1].hp += dragon_num;
                                                //数据增加动画
                                                this.dataAnimation(index-1,'all');
                                            }
                                        }
                                    }
                                    if((index+1) <= 6){
                                        if(this.my_minions[index+1].name == '泰蕾苟萨'){
                                            if(this.my_minions[index+1].isGold){
                                                this.my_minions[index+1].ad += dragon_num*2;
                                                this.my_minions[index+1].hp += dragon_num*2;
                                                //数据增加动画
                                                this.dataAnimation(index+1,'all');
                                            }else{
                                                this.my_minions[index+1].ad += dragon_num;
                                                this.my_minions[index+1].hp += dragon_num;
                                                //数据增加动画
                                                this.dataAnimation(index+1,'all');
                                            }
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
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/zhengxizengqiangyoulong.png')
                },
                {
                    name : '龙人执行者',
                    ad :3,
                    hp : 6,
                    level : 4,
                    type : '龙',
                    skill:{
                        type:'none',
                        info : '在一个友方随从失去圣盾后，获得+2/+2。'
                            
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
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/longrenzhixingzhe.png')
                },
                {
                    name : '普瑞斯托的火炎子嗣',
                    ad :3,
                    hp : 5,
                    level : 4,
                    type : '龙',
                    skill:{
                        type:'none',
                        info : '每当另一条友方的龙攻击时，对其目标造成3点伤害。'
                            
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
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/huoyanzisi.png')
                },
                //野兽
                {
                    name : '洞穴多头蛇',
                    ad : 2,
                    hp : 4,
                    level : 4,
                    type : '野兽',
                    skill:{
                        type:'none',
                        info  :'同时对其攻击目标相邻的随从造成伤害。'
                            
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
                    img:require('../../assets/minions/野兽/dongxueduotyoushe.png')
                },
                {
                    name : '唤生响尾蛇',
                    ad : 7,
                    hp : 3,
                    level : 4,
                    type : '野兽',
                    skill:{
                        type:'single_cry_select',
                        info  :'战吼：使一只友方野兽获得复生。',
                        single_cry_select(index){
                            //计数机械的数目
                            let dragon_number = 0
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].type == '野兽' && i!= index){
                                    dragon_number ++;
                                }
                            }
                            if(dragon_number>0){
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
                                if((this.my_minions[index].type == '野兽' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.my_minions[index].character.relive == false){
                                        this.my_minions[index].character.relive = true
                                    }
                                    


                                    this.my.putOriginIndex = '',
                                    this.status.isSelectMinionsPlace = false
                                }
                            }else{
                                if((this.my_minions[index].type == '野兽' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.my_minions[index].character.relive == false){
                                        this.my_minions[index].character.relive = true
                                    }

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
                        ad:7,
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/huangshengxiangweishe.png')
                },
                //恶魔
                {
                    name : '鬼狱火',
                    ad : 6,
                    hp : 6,
                    level : 4,
                    type : '恶魔',
                    skill:{
                        type:'continue',
                        info : '在你召唤一个恶魔后，便永久获得+1/+1。',
                        continue(index,id){
                            if(this.my_minions[id].isGold){
                                if(this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合'){
                                    this.my_minions[id].ad += 2;
                                    this.my_minions[id].hp += 2;

                                    //数据增加动画
                                    this.dataAnimation(id,'all');
                                }
                            }else{
                                if(this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合'){
                                    this.my_minions[id].ad += 1;
                                    this.my_minions[id].hp += 1;
                                    //数据增加动画
                                    this.dataAnimation(id,'all');
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
                        ad:6,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/guiyuhuo.png')
                },
                {
                    name : '火圈鬼母',
                    ad : 6,
                    hp : 4,
                    level : 4,
                    type : '恶魔',
                    skill:{
                        type:'none',
                        info : '嘲讽，亡语：召唤两个3/2的小鬼。'
                            
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
                        ad:6,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/huoquanguimu.png')
                },
                //鱼人
                {
                    name : '蛮鱼斥候',
                    ad : 3,
                    hp : 2,
                    level : 4,
                    type : '鱼人',
                    skill:{
                        type:'all_cry',
                        info : '战吼：如果你控制其他任何鱼人，则发现一张鱼人牌。',
                        all_cry(index){
                            let fish_num = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && i != index){
                                    fish_num ++;
                                }
                            }
                            if(fish_num > 0){
                                //打开三连选择版
                                
                                this.status.isSelectCombo = true;
                                if(this.my_minions[index].isGold){
                                    this.status.isSelectFish += 2
                                    for(let j=0;j<2;j++){
                                        if(this.pub_info.level == 3){
                                            let fishs = []//存取鱼人的索引
                                            for(let i=0;i<this.minions_pool.three.length;i++){
                                                if((this.minions_pool.three[i].type == '鱼人' || this.minions_pool.three[i].type == '混合') && this.minions_pool.three[i].name != '蛮鱼斥候'){
                                                    fishs.push(i)
                                                }
                                            }
                                            for(let i=0;i<3;i++){
                                                let random = Math.floor(Math.random()*fishs.length)
                                                this.selectCombo.push(this.minions_pool.three[fishs[random]])
                                                fishs = fishs.filter((w,id)=>{
                                                    return id != random
                                                })
                                            }
                                        }else if(this.pub_info.level == 4){
                                            let fishs = []//存取鱼人的索引
                                            for(let i=0;i<this.minions_pool.four.length;i++){
                                                if((this.minions_pool.four[i].type == '鱼人' || this.minions_pool.four[i].type == '混合') && this.minions_pool.four[i].name != '蛮鱼斥候'){
                                                    fishs.push(i)
                                                }
                                            }
                                            for(let i=0;i<3;i++){
                                                let random = Math.floor(Math.random()*fishs.length)
                                                this.selectCombo.push(this.minions_pool.four[fishs[random]])
                                                fishs = fishs.filter((w,id)=>{
                                                    return id != random
                                                })
                                            }
                                        }else if(this.pub_info.level == 5){
                                            let fishs = []//存取鱼人的索引
                                            for(let i=0;i<this.minions_pool.five.length;i++){
                                                if((this.minions_pool.five[i].type == '鱼人' || this.minions_pool.five[i].type == '混合') && this.minions_pool.five[i].name != '蛮鱼斥候'){
                                                    fishs.push(i)
                                                }
                                            }
                                            for(let i=0;i<3;i++){
                                                let random = Math.floor(Math.random()*fishs.length)
                                                this.selectCombo.push(this.minions_pool.five[fishs[random]])
                                                fishs = fishs.filter((w,id)=>{
                                                    return id != random
                                                })
                                            }
                                        }else if(this.pub_info.level == 6){
                                            let fishs = []//存取鱼人的索引
                                            for(let i=0;i<this.minions_pool.six.length;i++){
                                                if((this.minions_pool.six[i].type == '鱼人' || this.minions_pool.six[i].type == '混合') && this.minions_pool.six[i].name != '蛮鱼斥候'){
                                                    fishs.push(i)
                                                }
                                            }
                                            for(let i=0;i<3;i++){
                                                let random = Math.floor(Math.random()*fishs.length)
                                                this.selectCombo.push(this.minions_pool.six[fishs[random]])
                                                fishs = fishs.filter((w,id)=>{
                                                    return id != random
                                                })
                                            }
                                        }
                                    }
                                }else{
                                    this.status.isSelectFish += 1
                                    if(this.pub_info.level == 3){
                                        let fishs = []//存取鱼人的索引
                                        for(let i=0;i<this.minions_pool.three.length;i++){
                                            if((this.minions_pool.three[i].type == '鱼人' || this.minions_pool.three[i].type == '混合') && this.minions_pool.three[i].name != '蛮鱼斥候'){
                                                fishs.push(i)
                                            }
                                        }
                                        for(let i=0;i<3;i++){
                                            let random = Math.floor(Math.random()*fishs.length)
                                            this.selectCombo.push(this.minions_pool.three[fishs[random]])
                                            fishs = fishs.filter((w,id)=>{
                                                return id != random
                                            })
                                        }
                                    }else if(this.pub_info.level == 4){
                                        let fishs = []//存取鱼人的索引
                                        for(let i=0;i<this.minions_pool.four.length;i++){
                                            if((this.minions_pool.four[i].type == '鱼人' || this.minions_pool.four[i].type == '混合') && this.minions_pool.four[i].name != '蛮鱼斥候'){
                                                fishs.push(i)
                                            }
                                        }
                                        for(let i=0;i<3;i++){
                                            let random = Math.floor(Math.random()*fishs.length)
                                            this.selectCombo.push(this.minions_pool.four[fishs[random]])
                                            fishs = fishs.filter((w,id)=>{
                                                return id != random
                                            })
                                        }
                                    }else if(this.pub_info.level == 5){
                                        let fishs = []//存取鱼人的索引
                                        for(let i=0;i<this.minions_pool.five.length;i++){
                                            if((this.minions_pool.five[i].type == '鱼人' || this.minions_pool.five[i].type == '混合') && this.minions_pool.five[i].name != '蛮鱼斥候'){
                                                fishs.push(i)
                                            }
                                        }
                                        for(let i=0;i<3;i++){
                                            let random = Math.floor(Math.random()*fishs.length)
                                            this.selectCombo.push(this.minions_pool.five[fishs[random]])
                                            fishs = fishs.filter((w,id)=>{
                                                return id != random
                                            })
                                        }
                                    }else if(this.pub_info.level == 6){
                                        let fishs = []//存取鱼人的索引
                                        for(let i=0;i<this.minions_pool.six.length;i++){
                                            if((this.minions_pool.six[i].type == '鱼人' || this.minions_pool.six[i].type == '混合') && this.minions_pool.six[i].name != '蛮鱼斥候'){
                                                fishs.push(i)
                                            }
                                        }
                                        for(let i=0;i<3;i++){
                                            let random = Math.floor(Math.random()*fishs.length)
                                            this.selectCombo.push(this.minions_pool.six[fishs[random]])
                                            fishs = fishs.filter((w,id)=>{
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
                    img:require('../../assets/minions/鱼人/manyuchihou.png')
                },
                //元素
                {
                    name : '野火元素',
                    ad : 7,
                    hp : 4,
                    level : 4,
                    type : '元素',
                    skill:{
                        type:'none',
                            
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
                        ad:7,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/元素/yehuoyuansu.jpg')
                },
                {
                    name : '炫目的光耀之子',
                    ad : 2,
                    hp : 5,
                    level : 4,
                    type : '元素',
                    skill:{
                        type:'none',
                            
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
                    img:require('../../assets/minions/元素/guangyaozhizi.jpg')
                },
                {
                    name : '回收魔灵',
                    ad : 5,
                    hp : 4,
                    level : 4,
                    type : '元素',
                    skill:{
                        type:'continue',
                        info : '在你使用一张元素牌后，你下一次刷新酒馆的消耗减少（1）枚铸币。',
                        continue(index,id){
                            this.pub_info.nextFreeRefresh = 0
                            if((this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合') && index != id){
                                this.pub_info.nextFreeRefresh += this.moLinFunction()
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
                        ad:5,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/元素/huishoumoling.png')
                },
                //机械
                {
                    name : '机械蛋',
                    ad : 0,
                    hp : 5,
                    level : 4,
                    type : '机械',
                    skill:{
                        type:'none',
                        info : '亡语：召唤一个8/8的机械暴龙。'
                            
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
                        ad:0,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/jiexiedan.png')
                },
                {
                    name : '吵吵模组',
                    ad : 2,
                    hp : 4,
                    level : 4,
                    type : '机械',
                    skill:{
                        type:'single_cry_select',
                        info : '磁力 圣盾 嘲讽',
                        single_cry_select(index){
                            this.my.putOriginIndex = '';
                            if(index <6){
                                if(this.my_minions[index+1].type == '机械' || this.my_minions[index+1].type == '混合'){
                                    this.my_minions[index+1].ad += this.my_minions[index].ad
                                    this.my_minions[index+1].hp += this.my_minions[index].hp
    
                                    this.my_minions[index+1].character.shield = true;
                                    this.my_minions[index+1].character.ridicule = true;
                                    //数据增加动画
                                    this.dataAnimation(index+1,'all');
    
                                    this.clearMinionData(this.my_minions,index)
                                }
                            }
                        }    
                    },
                    character:{
                        shield:true,
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
                    img:require('../../assets/minions/机械/chaochaomozhu.png')
                },
                {
                    name : '滑油机器人',
                    ad : 3,
                    hp : 6,
                    level : 4,
                    type : '机械',
                    skill:{
                        type:'passive',
                        info : '在一个友方随从失去圣盾后，使其永久获得+1/+1。',
                        passive(index){
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].character.shield){
                                    if(this.my_minions[index].isGold){
                                        
                                            this.my_minions[index].ad += 2;
                                            this.my_minions[index].hp += 2;
                                            //数据增加动画
                                            this.dataAnimation(index,'all');
                                        
                                    }else{
                                        this.my_minions[index].ad += 2;
                                        this.my_minions[index].hp += 2;

                                        //数据增加动画
                                        this.dataAnimation(index,'all');
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
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/huayoujiqiren.png')
                },
                {
                    name : '步行坦克',
                    ad : 5,
                    hp : 5,
                    level : 4,
                    type : '机械',
                    skill:{
                        type:'none',
                        info : '复仇（2）：对生命值最高的敌方随从造成5点伤害。'
                            
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
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/buxingdanke.png')
                },
                //海盗
                {
                    name : '佩吉布里特伯',
                    ad : 6,
                    hp : 5,
                    level : 4,
                    type : '海盗',
                    skill:{
                        type:'special',
                        info : '在一张卡牌被置入你的手牌后，使另一个友方海盗获得+1/+1。',
                        special(index){
                            let pei_arr = [];//存入我另一个友方海盗的随从索引，用于随机抽取
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '海盗' || this.my_minions[i].type == '混合') && i != index){
                                    pei_arr.push(i)//存入索引
                                }
                            }
                            if(pei_arr.length>0){
                                let random_pei = Math.floor(Math.random()*pei_arr.length)//随机抽取索引号
                                if(this.my_minions[index].isGold){
                                    this.my_minions[pei_arr[random_pei]].ad += 2;
                                    this.my_minions[pei_arr[random_pei]].hp += 2;
                                    //数据增加动画
                                this.dataAnimation(pei_arr[random_pei],'all');
                                }else{
                                    this.my_minions[pei_arr[random_pei]].ad += 1;
                                    this.my_minions[pei_arr[random_pei]].hp += 1;
                                    //数据增加动画
                                this.dataAnimation(pei_arr[random_pei],'all');
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
                        ad:6,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/peijibulitebo.png')
                },
                {
                    name : '撕心狼队长',
                    ad : 4,
                    hp : 6,
                    level : 4,
                    type : '海盗',
                    skill:{
                        type:'none',
                        info : '每当其他友方海盗攻击时，使其获得+2/+2。'
                            
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
                        ad:4,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/sixinglangduizhang.png')
                },
                {
                    name : '掘金者',
                    ad : 4,
                    hp : 4,
                    level : 4,
                    type : '海盗',
                    skill:{
                        type:'passive',
                        info : '在你的回合结束时，你每有一个金色友方随从，便获得+2/+2。',
                        passive(index){
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].isGold){
                                    if(this.my_minions[index].isGold){
                                        this.my_minions[index].ad+= 4;
                                        this.my_minions[index].hp+= 4;
                                        //数据增加动画
                                        this.dataAnimation(index,'all');
                                    }else{
                                        this.my_minions[index].ad+= 2;
                                        this.my_minions[index].hp+= 2;
                                        //数据增加动画
                                        this.dataAnimation(index,'all');
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
                        ad:4,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/juejinzhe.png')
                },
                //野猪人
                {
                    name : '劲爆二人组',
                    ad : 5,
                    hp : 6,
                    level : 4,
                    type : '野猪人',
                    skill:{
                        type:'none',
                        info : '嘲讽 在鲜血宝石被用于另一个野猪人后，获得+1/+1。'
                            
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
                        ad:5,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/jibaoerrenzu.png')
                },
                {
                    name : '狂棍野猪人',
                    ad : 3,
                    hp : 7,
                    level : 4,
                    type : '野猪人',
                    skill:{
                        type:'passive',
                        info : '风怒 在该随从攻击后，获得一张鲜血宝石。',
                        passive(index){
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<2;i++){
                                    if(this.my.hands.length<10){
                                        this.my.hands.push(this.bloodstone)
                                        //手牌放入，触发佩吉
                                        this.peiJiReactive()
                                    }
                                }
                            }else{
                                if(this.my.hands.length<10){
                                    this.my.hands.push(this.bloodstone)
                                    //手牌放入，触发佩吉
                                    this.peiJiReactive()
                                }
                            }
                        }
                            
                    },
                    character:{
                        shield:false,
                        windFury:true,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:3,
                        hp:7
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/kaunggunyazhuren.png')
                },
                {
                    name : '震地者',
                    ad : 2,
                    hp : 6,
                    level : 4,
                    type : '野猪人',
                    skill:{
                        type:'none',
                        info : '在鲜血宝石被用于该随从后，使你的其他随从在下一场战斗中获得+2攻击力。'
                            
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
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/zhendizhe.png')
                },
                {
                    name : '亡灵侍僧',
                    ad : 3,
                    hp : 3,
                    level : 4,
                    type : '野猪人',
                    skill:{
                        type:'single_cry_select',
                        info : '战吼：对一个友方随从使用两张鲜血宝石并使其偷取相邻随从的所有鲜血宝石。',
                        single_cry_select(index){
                            //计数野猪人的数目
                            let fish_num = 0
                            for(let i=0;i<7;i++){
                                if(i!= index && this.my_minions[i].type == '野猪人' || this.my_minions[i].type == '混合' ){
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
                            let god_pig = 0;
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name == '阿迦玛甘，野猪之神'){
                                    if(this.my_minions[i].isGold){
                                        god_pig += 2;
                                    }else{
                                        god_pig ++;
                                    }
                                }
                            }
                            if(index != this.my.putOriginIndex){
                                if(this.my_minions[this.my.putOriginIndex].isGold){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            for(let i=0;i<4;i++){
                                                this.my_minions[index].ad += (1+god_pig);
                                                this.my_minions[index].hp += (1+god_pig);
        
                                                if(this.my_minions[index].name != '劲爆二人组' && (this.my_minions[index].type == '野猪人' || this.my_minions[index].type == '混合')){
                                                    //触发劲爆函数
                                                    this.ariseJinBao()
                                                }
                                                //金色加圣盾
                                                if(this.my_minions[index].name == '坚牙野猪人' && this.my_minions[index].isGold){
                                                    this.my_minions[index].character.shield = true
                                                }
                                                if(this.my_minions[index].name == '阿格姆棘咒'){
                                                    this.my_minions[index].skill.special.call(this,index)
                                                }
                                            }
                                        }
                                    }else{
                                        for(let i=0;i<4;i++){
                                            this.my_minions[index].ad += (1+god_pig);
                                            this.my_minions[index].hp += (1+god_pig);
    
                                            if(this.my_minions[index].name != '劲爆二人组' && (this.my_minions[index].type == '野猪人' || this.my_minions[index].type == '混合')){
                                                //触发劲爆函数
                                                this.ariseJinBao()
                                            }
                                            //金色加圣盾
                                            if(this.my_minions[index].name == '坚牙野猪人' && this.my_minions[index].isGold){
                                                this.my_minions[index].character.shield = true
                                            }
                                            if(this.my_minions[index].name == '阿格姆棘咒'){
                                                this.my_minions[index].skill.special.call(this,index)
                                            }
                                        }
                                    }
                                    //数据增加动画
                                    this.dataAnimation(index,'all');
                                    this.my.putOriginIndex = '',
                                    this.status.isSelectMinionsPlace = false
                                }else{
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            for(let i=0;i<2;i++){
                                                this.my_minions[index].ad += (1+god_pig);
                                                this.my_minions[index].hp += (1+god_pig);
        
                                                if(this.my_minions[index].name != '劲爆二人组' && (this.my_minions[index].type == '野猪人' || this.my_minions[index].type == '混合')){
                                                    //触发劲爆函数
                                                    this.ariseJinBao()
                                                }
                                                //金色加圣盾
                                                if(this.my_minions[index].name == '坚牙野猪人' && this.my_minions[index].isGold){
                                                    this.my_minions[index].character.shield = true
                                                }
                                                if(this.my_minions[index].name == '阿格姆棘咒'){
                                                    this.my_minions[index].skill.special.call(this,index)
                                                }
                                            }
                                        }
                                    }else{
                                        for(let i=0;i<2;i++){
                                            this.my_minions[index].ad += (1+god_pig);
                                            this.my_minions[index].hp += (1+god_pig);
    
                                            if(this.my_minions[index].name != '劲爆二人组' && (this.my_minions[index].type == '野猪人' || this.my_minions[index].type == '混合')){
                                                //触发劲爆函数
                                                this.ariseJinBao()
                                            }
                                            //金色加圣盾
                                            if(this.my_minions[index].name == '坚牙野猪人' && this.my_minions[index].isGold){
                                                this.my_minions[index].character.shield = true
                                            }
                                            if(this.my_minions[index].name == '阿格姆棘咒'){
                                                this.my_minions[index].skill.special.call(this,index)
                                            }
                                        }
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
                        ad:3,
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/wanlingshiseng.png')
                },
                //中立
                {
                    name : '亚煞极的勇士',
                    ad : 4,
                    hp : 4,
                    level : 4,
                    type : '中立',
                    skill:{
                        type:'passive',
                        info : '每当一个友方嘲讽随从受到攻击时，便永久获得+1/+1。',
                        passive(index){
                            let ridicule_num = 0;
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].character.ridicule){
                                    ridicule_num++;
                                }
                            }
                            if(ridicule_num>0){
                                if(this.my_minions[index].isGold){
                                    this.my_minions[index].ad += 2*ridicule_num;
                                    this.my_minions[index].hp += 2*ridicule_num;
                                    //数据增加动画
                                    this.dataAnimation(index,'all');
                                }else{
                                    this.my_minions[index].ad += ridicule_num;
                                    this.my_minions[index].hp += ridicule_num;
                                    //数据增加动画
                                    this.dataAnimation(index,'all');
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
                        ad:4,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/yashajideyongshi.png')
                },
                {
                    name : '展馆茶壶',
                    ad : 3,
                    hp : 3,
                    level : 4,
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
                                        this.my_minions[diff_arr[i].index].ad += 4
                                        this.my_minions[diff_arr[i].index].hp += 4
                                        //数据增加动画
                                        this.dataAnimation(diff_arr[i].index,'all');
                                    }else{
                                        this.my_minions[diff_arr[i].index].ad += 2
                                        this.my_minions[diff_arr[i].index].hp += 2
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
                        ad:3,
                        hp:3
                    },
                   isGold : false,
                   img:require('../../assets/minions/中立/zhangguanchahu.png')
                },
                {
                    name : '阿古斯防御者',
                    ad : 2,
                    hp : 3,
                    level : 4,
                    type : '中立',
                    skill:{
                        type:'all_cry',
                        info : '在鲜血宝石被用于该随从后，使你的其他随从在下一场战斗中获得+2攻击力。',
                        all_cry(index){
                            if((index-1)>=0){
                                if(this.my_minions[index].isGold){
                                    if(this.my_minions[index-1].name != ''){
                                        this.my_minions[index-1].ad += 2;
                                        this.my_minions[index-1].hp += 2;
                                        this.my_minions[index-1].character.ridicule = true

                                        //数据增加动画
                                        this.dataAnimation(index-1,'all');

                                    }
                                }else{
                                    if(this.my_minions[index-1].name != ''){
                                        this.my_minions[index-1].ad += 1;
                                        this.my_minions[index-1].hp += 1;
                                        this.my_minions[index-1].character.ridicule = true

                                        //数据增加动画
                                        this.dataAnimation(index-1,'all');
                                    }
                                }
                            }
                            if((index+1)<=6){
                                if(this.my_minions[index].isGold){
                                    if(this.my_minions[index+1].name != ''){
                                        this.my_minions[index+1].ad += 2;
                                        this.my_minions[index+1].hp += 2;
                                        this.my_minions[index+1].character.ridicule = true


                                        //数据增加动画
                                        this.dataAnimation(index+1,'all');
                                    }
                                }else{
                                    if(this.my_minions[index+1].name != ''){
                                        this.my_minions[index+1].ad += 1;
                                        this.my_minions[index+1].hp += 1;
                                        this.my_minions[index+1].character.ridicule = true


                                        //数据增加动画
                                        this.dataAnimation(index+1,'all');
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
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/agusifangyuzhe.png')
                },
                {
                    name : '巫翼巢穴主母',
                    ad : 3,
                    hp : 5,
                    level : 4,
                    type : '中立',
                    skill:{
                        type:'passive',
                        info : '复仇（3）：随机将一张战吼随从牌置入你的手牌。',
                        passive(index){
                            if(this.pub_info.level == 3){
                                //三星酒馆的战吼随从
                                let arr = []
                                for(let i=0;i<this.minions_pool.three.length;i++){
                                    if((this.minions_pool.three[i].skill.type == 'all_cry' 
                                    || this.minions_pool.three[i].skill.type == 'single_cry_select' 
                                    || this.minions_pool.three[i].skill.type == 'all_cry_select')
                                    && (this.minions_pool.three[i].name != '吵吵模组' && this.minions_pool.three[i].name != '量产型恐吓机')){
                                        arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.three[arr[random]])
                                        }
                                    
                                }else{
                                    let random_chose = Math.floor(Math.random() * 2)
                                    if(random_chose){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.three[arr[random]])
                                        }
                                    }
                                }
                            }else if(this.pub_info.level == 4){
                                //4星酒馆的战吼随从
                                let arr = []
                                for(let i=0;i<this.minions_pool.four.length;i++){
                                    if((this.minions_pool.four[i].skill.type == 'all_cry' 
                                    || this.minions_pool.four[i].skill.type == 'single_cry_select' 
                                    || this.minions_pool.four[i].skill.type == 'all_cry_select')
                                    && (this.minions_pool.four[i].name != '吵吵模组' && this.minions_pool.four[i].name != '量产型恐吓机')){
                                        arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.four[arr[random]])
                                        }
                                }else{
                                    let random_chose = Math.floor(Math.random() * 2)
                                    if(random_chose){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.four[arr[random]])
                                        }
                                    }
                                }
                            }else if(this.pub_info.level == 5){
                                //5星酒馆的战吼随从
                                let arr = []
                                for(let i=0;i<this.minions_pool.five.length;i++){
                                    if((this.minions_pool.five[i].skill.type == 'all_cry' 
                                    || this.minions_pool.five[i].skill.type == 'single_cry_select' 
                                    || this.minions_pool.five[i].skill.type == 'all_cry_select')
                                    && (this.minions_pool.five[i].name != '吵吵模组' && this.minions_pool.five[i].name != '量产型恐吓机')){
                                        arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.five[arr[random]])
                                        }
                                    
                                }else{
                                    let random_chose = Math.floor(Math.random() * 2)
                                    if(random_chose){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.five[arr[random]])
                                        }
                                    }
                                }
                            }else if(this.pub_info.level == 6){
                                //6星酒馆的战吼随从
                                let arr = []
                                for(let i=0;i<this.minions_pool.six.length;i++){
                                    if((this.minions_pool.six[i].skill.type == 'all_cry' 
                                    || this.minions_pool.six[i].skill.type == 'single_cry_select' 
                                    || this.minions_pool.six[i].skill.type == 'all_cry_select')
                                    && (this.minions_pool.six[i].name != '吵吵模组' && this.minions_pool.six[i].name != '量产型恐吓机')){
                                        arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.six[arr[random]])
                                        }
                                }else{
                                    let random_chose = Math.floor(Math.random() * 2)
                                    if(random_chose){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.six[arr[random]])
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
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/wuyichaoxuzhumu.png')
                },
                {
                    name : '不耐烦的末日预言者',
                    ad : 2,
                    hp : 6,
                    level : 4,
                    type : '中立',
                    skill:{
                        type:'passive',
                        info : '复仇（4）：随机将一张恶魔牌置入你的 手牌。',
                        passive(index){
                            if(this.pub_info.level == 3){
                                //三星酒馆的战吼随从
                                let arr = []
                                for(let i=0;i<this.minions_pool.three.length;i++){
                                    if(this.minions_pool.three[i].type == '恶魔' || this.minions_pool.three[i].type == '混合'){
                                        arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.three[arr[random]])
                                        }
                                    
                                }else{
                                    let random_chose = Math.floor(Math.random() * 2)
                                    if(random_chose){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.three[arr[random]])
                                        }
                                    }
                                }
                            }else if(this.pub_info.level == 4){
                                //4星酒馆的战吼随从
                                let arr = []
                                for(let i=0;i<this.minions_pool.four.length;i++){
                                    if(this.minions_pool.five[i].type == '恶魔' || this.minions_pool.five[i].type == '混合'){
                                        arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.four[arr[random]])
                                        }
                                }else{
                                    let random_chose = Math.floor(Math.random() * 2)
                                    if(random_chose){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.four[arr[random]])
                                        }
                                    }
                                }
                            }else if(this.pub_info.level == 5){
                                //5星酒馆的战吼随从
                                let arr = []
                                for(let i=0;i<this.minions_pool.five.length;i++){
                                    if(this.minions_pool.five[i].type == '恶魔' || this.minions_pool.five[i].type == '混合'){
                                        arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.five[arr[random]])
                                        }
                                    
                                }else{
                                    let random_chose = Math.floor(Math.random() * 2)
                                    if(random_chose){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.five[arr[random]])
                                        }
                                    }
                                }
                            }else if(this.pub_info.level == 6){
                                //6星酒馆的战吼随从
                                let arr = []
                                for(let i=0;i<this.minions_pool.six.length;i++){
                                    if(this.minions_pool.six[i].type == '恶魔' || this.minions_pool.six[i].type == '混合'){
                                        arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.six[arr[random]])
                                        }
                                }else{
                                    let random_chose = Math.floor(Math.random() * 2)
                                    if(random_chose){
                                        let random = Math.floor(Math.random()*arr.length)
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.minions_pool.six[arr[random]])
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
                        ad:2,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/bunaifandemoriyuyanzhe.png')
                },
                {
                    name : '管理者埃克索图斯',
                    ad : 6,
                    hp : 3,
                    level : 4,
                    type : '中立',
                    skill:{
                        type:'passive',
                        info : '在你的回合结束时，使你最左边的随从获得+1/+1。在本回合中你每使用过一张元素牌，就重复一次。',
                        passive(index){
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合'){
                                        this.my_minions[i].ad += 2*this.ele_put_num
                                        this.my_minions[i].hp += 2*this.ele_put_num

                                        //数据增加动画
                                        this.dataAnimation(i,'all');
                                        //现境大师函数
                                        this.realMasterFunction();
                                    }
                                }
                            }else{
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合'){
                                        this.my_minions[i].ad += this.ele_put_num
                                        this.my_minions[i].hp += this.ele_put_num

                                        //数据增加动画
                                        this.dataAnimation(i,'all');
                                        //现境大师函数
                                        this.realMasterFunction();
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
                        ad:6,
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/tushuguanliyuan.png')
                },
            ]
        }
    }
}
export default fourMinionData