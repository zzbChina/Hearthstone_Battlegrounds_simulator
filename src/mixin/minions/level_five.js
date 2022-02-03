let fiveMinionData = {
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
            five_minions:[
                //龙
                {
                    name : '狂野的拉佐格尔',
                    ad : 4,
                    hp : 6,
                    level : 5,
                    type : '龙',
                    skill:{
                        type : 'passive',
                        passive(index){
                            let dragon = 0;
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].type == '龙' || this.my_minions[i].type == '混合'){
                                    dragon += 1;
                                }
                            }
                            if(this.my_minions[index].isGold){
                                this.my_minions[index].ad += dragon*2;
                                this.my_minions[index].hp += dragon*2;
                                this.ariseChuLong(index)
                                //数据增加动画
                                this.dataAnimation(index,'all');
                            }else{
                                this.my_minions[index].ad += dragon*1;
                                this.my_minions[index].hp += dragon*1;
                                this.ariseChuLong(index)
                                //数据增加动画
                                this.dataAnimation(index,'all');
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
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/kaungyedelazuogeer.jpg')
                },
                {
                    name : '姆诺兹多',
                    ad : 5,
                    hp : 5,
                    level : 5,
                    type : '龙',
                    skill:{
                        type : 'all_cry',
                        info : '战吼：将你上一个对手的战队中的一个随从置入你的手牌。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                if(this.pub_info.level == 4){
                                    let random = Math.floor(Math.random()*this.minions_pool.four.length);
                                    let  ob = {
                                        name : '',
                                        ad : '',
                                        hp : '',
                                        level : '',
                                        type : '',
                                        skill : '',
                                        character:{
                                            shield:'',
                                            windFury: '',
                                            relive: '',
                                            toxic: '',
                                            ridicule: '',
                                            death  : ''
                                        },
                                        init:{
                                            ad : '',
                                            hp : ''
                                        },
                                        isGold : false,
                                        img : ''
                                    }
                                    this.transferData(ob,this.minions_pool.four[random])
                                    ob.isGold = true;
                                    ob.ad += ob.init.ad;
                                    ob.hp += ob.init.hp;
                                    this.my.hands.push(ob)
                                    //手牌放入，触发佩吉
                                    this.peiJiReactive()
                                }else if(this.pub_info.level == 5){
                                    let random = Math.floor(Math.random()*this.minions_pool.five.length);
                                    let  ob = {
                                        name : '',
                                        ad : '',
                                        hp : '',
                                        level : '',
                                        type : '',
                                        skill : '',
                                        character:{
                                            shield:'',
                                            windFury: '',
                                            relive: '',
                                            toxic: '',
                                            ridicule: '',
                                            death  : ''
                                        },
                                        init:{
                                            ad : '',
                                            hp : ''
                                        },
                                        isGold : false,
                                        img : ''
                                    }
                                    this.transferData(ob,this.minions_pool.five[random])
                                    ob.isGold = true;
                                    ob.ad += ob.init.ad;
                                    ob.hp += ob.init.hp;
                                    this.my.hands.push(ob)
                                    //手牌放入，触发佩吉
                                    this.peiJiReactive()
                                }else if(this.pub_info.level == 6){
                                    let random = Math.floor(Math.random()*this.minions_pool.six.length);
                                    let  ob = {
                                        name : '',
                                        ad : '',
                                        hp : '',
                                        level : '',
                                        type : '',
                                        skill : '',
                                        character:{
                                            shield:'',
                                            windFury: '',
                                            relive: '',
                                            toxic: '',
                                            ridicule: '',
                                            death  : ''
                                        },
                                        init:{
                                            ad : '',
                                            hp : ''
                                        },
                                        isGold : false,
                                        img : ''
                                    }
                                    this.transferData(ob,this.minions_pool.six[random])
                                    ob.isGold = true;
                                    ob.ad += ob.init.ad;
                                    ob.hp += ob.init.hp;
                                    this.my.hands.push(ob)
                                    //手牌放入，触发佩吉
                                    this.peiJiReactive()
                                }
                            }else{
                                if(this.pub_info.level == 4){
                                    let random = Math.floor(Math.random()*this.minions_pool.four.length);
                                    if(this.isCombo.call(this,this.minions_pool.four[random])){
                                        //若函数返回true，表示达成三连条件，调用三联函数
                                        this.getCombo.call(this,this.minions_pool.four[random])
                
                                        this.bob.msg = '精彩的三连';
                                        this.bob.say = true;
                                        setTimeout(()=>{
                                                this.bob.say = false;
                                        },1500)
                                        
                                    }else{
                                        this.my.hands.push(this.minions_pool.four[random])
                                        //手牌放入，触发佩吉
                                        this.peiJiReactive()
                                    }
                                }else if(this.pub_info.level == 5){
                                    let random = Math.floor(Math.random()*this.minions_pool.five.length);
                                    if(this.isCombo.call(this,this.minions_pool.five[random])){
                                        //若函数返回true，表示达成三连条件，调用三联函数
                                        this.getCombo.call(this,this.minions_pool.five[random])
                
                                        this.bob.msg = '精彩的三连';
                                        this.bob.say = true;
                                        setTimeout(()=>{
                                                this.bob.say = false;
                                        },1500)
                                        
                                    }else{
                                        this.my.hands.push(this.minions_pool.five[random])
                                        //手牌放入，触发佩吉
                                        this.peiJiReactive()
                                    }
                                }else if(this.pub_info.level == 6){
                                    let random = Math.floor(Math.random()*this.minions_pool.six.length);
                                    if(this.isCombo.call(this,this.minions_pool.six[random])){
                                        //若函数返回true，表示达成三连条件，调用三联函数
                                        this.getCombo.call(this,this.minions_pool.six[random])
                
                                        this.bob.msg = '精彩的三连';
                                        this.bob.say = true;
                                        setTimeout(()=>{
                                                this.bob.say = false;
                                        },1500)
                                        
                                    }else{
                                        this.my.hands.push(this.minions_pool.six[random])
                                        //手牌放入，触发佩吉
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
                        ad:5,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/nuoziduomu.png')
                },
                //野兽
                {
                    name : '熊妈妈',
                    ad : 5,
                    hp : 5,
                    level : 5,
                    type : '野兽',
                    skill:{
                        type : 'continue',
                        info : '每当你召唤一个野兽，使其获得+5/+5。',
                        continue(index,id){
                            if(index != id &&  this.my_minions[index].type == '野兽' || this.my_minions[index].type == '混合' ){
                                if(this.my_minions[id].isGold){
                                    this.my_minions[index].ad += 10;
                                    this.my_minions[index].hp += 10;
                                    //数据增加动画
                                    this.dataAnimation(index,'all');
                                }else{
                                    this.my_minions[index].ad += 5;
                                    this.my_minions[index].hp += 5;
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
                        ad:5,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/xiongmama.png')
                },
                {
                    name : '阿迦玛甘，野猪之神',
                    ad : 6,
                    hp : 6,
                    level : 5,
                    type : '野兽',
                    skill:{
                        type : 'none',
                        info : '你的鲜血宝石使随从额外获得+1/+1。',
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
                        ad:6,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/yezhuzhisheng.png')
                },
                {
                    name : '苍鳞鳄鱼',
                    ad : 4,
                    hp : 5,
                    level : 5,
                    type : '野兽',
                    skill:{
                        type : 'death',
                        info : '复仇（2），亡语：使另一个友方野兽获得+6/+6。',
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
                        ad:4,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/canglingeyu.png')
                },
                //恶魔
                {
                    name : '贪食的乌祖尔',
                    ad : 4,
                    hp : 6,
                    level : 5,
                    type:'恶魔',
                    skill:{
                        type : 'continue',
                        continue(index,id){
                            let num = 0
                            for(let i=0;i<7;i++){
                                if(this.bob_minions[i].name != ''){
                                    num = num + 1;
                                }
                            }
                            if((this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合') && index != id){
                                if(this.my_minions[id].isGold){
                                    while(num){
                                        let random = Math.floor(Math.random()*7)
                                        if(this.bob_minions[random].name != ''){
                                            
                                            this.my_minions[id].ad += this.bob_minions[random].ad * 2;
                                            this.my_minions[id].hp += this.bob_minions[random].hp * 2;
                                            //触发购买动画
                                            this.$refs.bobM[random].classList.add('active');
                                            setTimeout(()=>{
                                                this.$refs.bobM[random].classList.remove('active');
                                            },500)
                                            //数据增加动画
                                            this.dataAnimation(id,'all');
                                            //删除该酒馆随从
                                            this.clearMinionData(this.bob_minions,random);
                                            return;
                                        }
                                    }
                                }else{
                                    while(num){
                                        let random = Math.floor(Math.random()*7)
                                        if(this.bob_minions[random].name != ''){
                                            
                                            this.my_minions[id].ad += this.bob_minions[random].ad * 1;
                                            this.my_minions[id].hp += this.bob_minions[random].hp * 1;
                                            //触发购买动画
                                            this.$refs.bobM[random].classList.add('active');
                                            setTimeout(()=>{
                                                this.$refs.bobM[random].classList.remove('active');
                                            },500)
                                            //数据增加动画
                                            this.dataAnimation(id,'all');
                                            //删除该酒馆随从
                                            this.clearMinionData(this.bob_minions,random);
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
                        ridicule:true
                    },
                    init:{
                        ad:4,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/tanshidewuzuer.jpg')
                },
                {
                    name : '安尼赫兰战场军官',
                    ad : 3,
                    hp : 1,
                    level : 5,
                    type : '恶魔',
                    skill:{
                        type : 'all_cry',
                        info : '战吼：你的英雄每受到一点伤害，便获得+1生命值。',
                        all_cry(index){
                            let lost_blood = ''
                            if(this.hero.name == '帕奇维克'){
                                lost_blood = 40 - this.hero.health
                            }else{
                                lost_blood = 40 - this.hero.health
                            }
                            if(this.my_minions[index].isGold){
                                this.my_minions[index].hp += lost_blood*2
                                //数据增加动画
                                this.dataAnimation(index,'all');
                            }else{
                                this.my_minions[index].hp += lost_blood
                                //数据增加动画
                                this.dataAnimation(index,'all');
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
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/anihelanzhangchangjunguan.png')
                },
                {
                    name : '虚空领主',
                    ad : 3,
                    hp : 9,
                    level : 5,
                    type : '恶魔',
                    skill:{
                        type : 'none',
                        info : '嘲讽，亡语： 召唤三个1/3并具有嘲讽的恶魔。'
                        
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
                        ad:3,
                        hp:9
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/xukonglingzhu.png')
                },
                //元素
                {
                    name : '酒馆旋风',
                    ad : 4,
                    hp : 4,
                    level : 5,
                    type : '元素',
                    skill:{
                        type : 'all_cry',
                        info : '战吼：随机将一张其他元素牌置入你的 手牌。',
                        all_cry(index){
                            if(this.pub_info.level == 4){
                                //获取所有四星酒馆的元素
                                let ele_level__arr = []
                                for(let i=0;i<this.minions_pool.four.length;i++){
                                    if((this.minions_pool.four[i].type == '元素' || this.minions_pool.four[i].type == '混合') && this.minions_pool.four[i].name != '酒馆旋风'){
                                        ele_level__arr.push(i)
                                    }
                                }

                                if(this.my_minions[index].isGold){
                                    for(let i=0;i<2;i++){
                                        if(this.my.hands.length<10){
                                            let random_jiu = Math.floor(Math.random()*ele_level__arr.length)
                                            if(this.isCombo.call(this,this.minions_pool.four[ele_level__arr[random_jiu]])){
                                                //若函数返回true，表示达成三连条件，调用三联函数
                                                this.getCombo.call(this,this.minions_pool.four[ele_level__arr[random_jiu]])
                        
                                                this.bob.msg = '精彩的三连';
                                                this.bob.say = true;
                                                setTimeout(()=>{
                                                        this.bob.say = false;
                                                },1500)
                                                
                                            }else{
                                                let  ob = {
                                                    name : '',
                                                    ad : '',
                                                    hp : '',
                                                    level : '',
                                                    type : '',
                                                    skill : '',
                                                    character:{
                                                        shield:'',
                                                        windFury: '',
                                                        relive: '',
                                                        toxic: '',
                                                        ridicule: '',
                                                        death  : ''
                                                    },
                                                    init:{
                                                        ad : '',
                                                        hp : ''
                                                    },
                                                    isGold : false,
                                                    img : ''
                                                }
                                                this.transferData(ob,this.minions_pool.four[ele_level__arr[random_jiu]])
                                                ob.ad = ob.init.ad
                                                ob.hp = ob.init.hp
                                                this.my.hands.push(ob);
                                                //手牌放入，触发佩吉
                                                this.peiJiReactive()
                                            }
                                            
                                            
                                        }
                                    }
                                }else{
                                    if(this.my.hands.length<10){
                                        let random_jiu = Math.floor(Math.random()*ele_level__arr.length)
                                        if(this.isCombo.call(this,this.minions_pool.four[ele_level__arr[random_jiu]])){
                                            //若函数返回true，表示达成三连条件，调用三联函数
                                            this.getCombo.call(this,this.minions_pool.four[ele_level__arr[random_jiu]])
                    
                                            this.bob.msg = '精彩的三连';
                                            this.bob.say = true;
                                            setTimeout(()=>{
                                                    this.bob.say = false;
                                            },1500)
                                            
                                        }else{
                                            let  ob = {
                                                name : '',
                                                ad : '',
                                                hp : '',
                                                level : '',
                                                type : '',
                                                skill : '',
                                                character:{
                                                    shield:'',
                                                    windFury: '',
                                                    relive: '',
                                                    toxic: '',
                                                    ridicule: '',
                                                    death  : ''
                                                },
                                                init:{
                                                    ad : '',
                                                    hp : ''
                                                },
                                                isGold : false,
                                                img : ''
                                            }
                                            this.transferData(ob,this.minions_pool.four[ele_level__arr[random_jiu]])
                                            ob.ad = ob.init.ad
                                            ob.hp = ob.init.hp
                                            this.my.hands.push(ob);
                                            //手牌放入，触发佩吉
                                            this.peiJiReactive()
                                        }
                                    }
                                }
                            }else if(this.pub_info.level == 5){
                                //获取所有五星酒馆的元素
                                let ele_level__arr = []
                                for(let i=0;i<this.minions_pool.five.length;i++){
                                    if((this.minions_pool.five[i].type == '元素' || this.minions_pool.five[i].type == '混合') && this.minions_pool.five[i].name != '酒馆旋风'){
                                        ele_level__arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                    for(let i=0;i<2;i++){
                                        if(this.my.hands.length<10){
                                            let random_jiu = Math.floor(Math.random()*ele_level__arr.length)
                                            if(this.isCombo.call(this,this.minions_pool.five[ele_level__arr[random_jiu]])){
                                                //若函数返回true，表示达成三连条件，调用三联函数
                                                this.getCombo.call(this,this.minions_pool.five[ele_level__arr[random_jiu]])
                        
                                                this.bob.msg = '精彩的三连';
                                                this.bob.say = true;
                                                setTimeout(()=>{
                                                        this.bob.say = false;
                                                },1500)
                                                
                                            }else{
                                                let  ob = {
                                                    name : '',
                                                    ad : '',
                                                    hp : '',
                                                    level : '',
                                                    type : '',
                                                    skill : '',
                                                    character:{
                                                        shield:'',
                                                        windFury: '',
                                                        relive: '',
                                                        toxic: '',
                                                        ridicule: '',
                                                        death  : ''
                                                    },
                                                    init:{
                                                        ad : '',
                                                        hp : ''
                                                    },
                                                    isGold : false,
                                                    img : ''
                                                }
                                                this.transferData(ob,this.minions_pool.five[ele_level__arr[random_jiu]])
                                                ob.ad = ob.init.ad
                                                ob.hp = ob.init.hp
                                                this.my.hands.push(ob);
                                                //手牌放入，触发佩吉
                                                this.peiJiReactive()
                                            }
                                        }
                                    }
                                }else{
                                    if(this.my.hands.length<10){
                                        let random_jiu = Math.floor(Math.random()*ele_level__arr.length)
                                        if(this.isCombo.call(this,this.minions_pool.five[ele_level__arr[random_jiu]])){
                                            //若函数返回true，表示达成三连条件，调用三联函数
                                            this.getCombo.call(this,this.minions_pool.five[ele_level__arr[random_jiu]])
                    
                                            this.bob.msg = '精彩的三连';
                                            this.bob.say = true;
                                            setTimeout(()=>{
                                                    this.bob.say = false;
                                            },1500)
                                            
                                        }else{
                                            let  ob = {
                                                name : '',
                                                ad : '',
                                                hp : '',
                                                level : '',
                                                type : '',
                                                skill : '',
                                                character:{
                                                    shield:'',
                                                    windFury: '',
                                                    relive: '',
                                                    toxic: '',
                                                    ridicule: '',
                                                    death  : ''
                                                },
                                                init:{
                                                    ad : '',
                                                    hp : ''
                                                },
                                                isGold : false,
                                                img : ''
                                            }
                                            this.transferData(ob,this.minions_pool.five[ele_level__arr[random_jiu]])
                                            ob.ad = ob.init.ad
                                            ob.hp = ob.init.hp
                                            this.my.hands.push(ob);
                                            //手牌放入，触发佩吉
                                            this.peiJiReactive()
                                        }
                                    }
                                }
                            }else if(this.pub_info.level == 6){
                                //获取所有六星酒馆的元素
                                let ele_level__arr = []
                                for(let i=0;i<this.minions_pool.six.length;i++){
                                    if((this.minions_pool.six[i].type == '元素' || this.minions_pool.six[i].type == '混合') && this.minions_pool.six[i].name != '酒馆旋风'){
                                        ele_level__arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                    for(let i=0;i<2;i++){
                                        if(this.my.hands.length<10){
                                            let random_jiu = Math.floor(Math.random()*ele_level__arr.length)
                                            if(this.isCombo.call(this,this.minions_pool.six[ele_level__arr[random_jiu]])){
                                                //若函数返回true，表示达成三连条件，调用三联函数
                                                this.getCombo.call(this,this.minions_pool.six[ele_level__arr[random_jiu]])
                        
                                                this.bob.msg = '精彩的三连';
                                                this.bob.say = true;
                                                setTimeout(()=>{
                                                        this.bob.say = false;
                                                },1500)
                                                
                                            }else{
                                                let  ob = {
                                                    name : '',
                                                    ad : '',
                                                    hp : '',
                                                    level : '',
                                                    type : '',
                                                    skill : '',
                                                    character:{
                                                        shield:'',
                                                        windFury: '',
                                                        relive: '',
                                                        toxic: '',
                                                        ridicule: '',
                                                        death  : ''
                                                    },
                                                    init:{
                                                        ad : '',
                                                        hp : ''
                                                    },
                                                    isGold : false,
                                                    img : ''
                                                }
                                                this.transferData(ob,this.minions_pool.six[ele_level__arr[random_jiu]])
                                                ob.ad = ob.init.ad
                                                ob.hp = ob.init.hp
                                                this.my.hands.push(ob);
                                                //手牌放入，触发佩吉
                                                this.peiJiReactive()
                                            }
                                        }
                                    }
                                }else{
                                    if(this.my.hands.length<10){
                                        let random_jiu = Math.floor(Math.random()*ele_level__arr.length)
                                        if(this.isCombo.call(this,this.minions_pool.six[ele_level__arr[random_jiu]])){
                                            //若函数返回true，表示达成三连条件，调用三联函数
                                            this.getCombo.call(this,this.minions_pool.six[ele_level__arr[random_jiu]])
                    
                                            this.bob.msg = '精彩的三连';
                                            this.bob.say = true;
                                            setTimeout(()=>{
                                                    this.bob.say = false;
                                            },1500)
                                            
                                        }else{
                                            let  ob = {
                                                name : '',
                                                ad : '',
                                                hp : '',
                                                level : '',
                                                type : '',
                                                skill : '',
                                                character:{
                                                    shield:'',
                                                    windFury: '',
                                                    relive: '',
                                                    toxic: '',
                                                    ridicule: '',
                                                    death  : ''
                                                },
                                                init:{
                                                    ad : '',
                                                    hp : ''
                                                },
                                                isGold : false,
                                                img : ''
                                            }
                                            
                                            this.transferData(ob,this.minions_pool.six[ele_level__arr[random_jiu]])
                                            ob.ad = ob.init.ad
                                            ob.hp = ob.init.hp
                                            this.my.hands.push(ob);
                                            //手牌放入，触发佩吉
                                            this.peiJiReactive()
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
                        ad:4,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/元素/jiuguanxuanfen.png')
                },
                //鱼人
                {
                    name : '拜格尔国王',
                    ad : 6,
                    hp : 3,
                    level : 5,
                    type : '鱼人',
                    skill:{
                        type : 'all_cry',
                        info : '战吼，亡语：使你的其他鱼人获得+2/+2。',
                        all_cry(index){

                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && i != index){
                                    if(this.my_minions[index].isGold){
                                        this.my_minions[i].ad += 4;
                                        this.my_minions[i].hp += 4;
                                        //数据增加动画
                                        this.dataAnimation(i,'all');
                                    }else{
                                        this.my_minions[i].ad += 2;
                                        this.my_minions[i].hp += 2;
                                        //数据增加动画
                                        this.dataAnimation(i,'all');
                                    }
                                }
                            }
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
                        ad:6,
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/鱼人/baigeerguowang.png')
                },
                {
                    name : '军情鳍处鱼人',
                    ad : 2,
                    hp : 6,
                    level : 5,
                    type : '鱼人',
                    skill:{
                        type : 'passive',
                        info : '复仇（3）：使一个友方鱼人永久获得 剧毒。',
                        passive(index){
                            
                            if(this.my_minions[index].isGold){
                                let fish_arr = []
                                for(let i=0;i<7;i++){
                                    if((this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && this.my_minions[i].character.toxic == false){
                                        fish_arr.push(i)
                                    }
                                }
                                if(fish_arr.length>0){
                                    let fish_random = Math.floor(Math.random()*fish_arr.length);
                                    this.my_minions[fish_arr[fish_random]].character.toxic = true
                                }
                            }else{
                                let fish_arr = []
                                for(let i=0;i<7;i++){
                                    if((this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && this.my_minions[i].character.toxic == false){
                                        fish_arr.push(i)
                                    }
                                }
                                if(fish_arr.length > 0){
                                    let half_chance = Math.floor(Math.random()*3);
                                    if(half_chance != 2){
                                        let fish_random = Math.floor(Math.random()*fish_arr.length);
                                        this.my_minions[fish_arr[fish_random]].character.toxic = true
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
                    img:require('../../assets/minions/鱼人/junqingqichuyuren.png')
                },
                //机械
                {
                    name : '机鱼圣者',
                    ad : 6,
                    hp : 4,
                    level : 5,
                    type : '机械',
                    skill:{
                        type : 'none',
                        info : '在另一个友方随从失去圣盾后，获得 圣盾。'
                        
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
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/jiyushenzhe.png')
                },
                //野猪人
                {
                    name : '阿格姆棘咒',
                    ad : 3,
                    hp : 6,
                    level : 5,
                    type : '野猪人',
                    skill:{
                        type : 'special',
                        info : '在鲜血宝石被用于该随从后，使每个随从类型的各一个友方随从获得+1/+1。',
                        special(index){
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
                                            if(this.my_minions[i].type == '混合'){
                                                let ob = {
                                                    type : this.my_minions[i].type,
                                                    index : i
                                                }
                                                diff_arr.push(ob)
                                                break;
                                            }else{
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
                            }
                            if(diff_arr.length>0){
                                for(let i=0;i<diff_arr.length;i++){
                                    if(this.my_minions[index].isGold){
                                        this.my_minions[diff_arr[i].index].ad += 2
                                        this.my_minions[diff_arr[i].index].hp += 2
                                        //数据增加动画
                                        this.dataAnimation(diff_arr[i].index,'all');
                                        if(this.my_minions[diff_arr[i].index].type == '元素' || this.my_minions[diff_arr[i].index].type == '混合'){
                                            this.realMasterFunction();
                                        }
                                    }else{
                                        this.my_minions[diff_arr[i].index].ad += 1
                                        this.my_minions[diff_arr[i].index].hp += 1
                                        //数据增加动画
                                        this.dataAnimation(diff_arr[i].index,'all');
                                        if(this.my_minions[diff_arr[i].index].type == '元素' || this.my_minions[diff_arr[i].index].type == '混合'){
                                            this.realMasterFunction();
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
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/jizhou.png')
                },
                //海盗
                {
                    name : '托尼双牙',
                    ad : 4,
                    hp : 6,
                    level : 5,
                    type : '海盗',
                    skill:{
                        type : 'passive',
                        info : '复仇（4）：使另一个友方海盗永久变成 金色。',
                        passive(index){
                            //获得场上我的海盗数组
                            let pirate_arr = []
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '海盗' || this.my_minions[i].type == '混合') && this.my_minions[i].isGold == false){
                                    pirate_arr.push(i)
                                }
                            }
                            if(pirate_arr.length>0){
                                if(this.my_minions[index].isGold){
                                    let half_chance = Math.floor(Math.random()*2);
                                    if(half_chance != 1){
                                        let pirate_random = Math.floor(Math.random()*pirate_arr.length);
                                        this.my_minions[pirate_arr[pirate_random]].isGold = true
                                        if(this.my_minions[pirate_arr[pirate_random]].name == '海盗无赖'){
                                            this.my_minions[pirate_arr[pirate_random]].ad += 3;
                                            this.my_minions[pirate_arr[pirate_random]].hp += 1;
                                        }else if(this.my_minions[pirate_arr[pirate_random]].name == '甲板杂兵'){
                                            this.my_minions[pirate_arr[pirate_random]].ad += 2;
                                            this.my_minions[pirate_arr[pirate_random]].hp += 2;
                                        }else if(this.my_minions[pirate_arr[pirate_random]].name == '托尼双牙'){
                                            this.my_minions[pirate_arr[pirate_random]].ad += 4;
                                            this.my_minions[pirate_arr[pirate_random]].hp += 6;
                                        }

                                        //触发动画
                                        this.$refs.myM[pirate_arr[pirate_random]].classList.add('active');
                                        setTimeout(()=>{
                                            this.$refs.myM[pirate_arr[pirate_random]].classList.remove('active');
                                        },500)
                                    }
                                }else{
                                    let half_chance = Math.floor(Math.random()*4);
                                    if(half_chance == 0){
                                        let pirate_random = Math.floor(Math.random()*pirate_arr.length);
                                        this.my_minions[pirate_arr[pirate_random]].isGold = true
                                        if(this.my_minions[pirate_arr[pirate_random]].name == '海盗无赖'){
                                            this.my_minions[pirate_arr[pirate_random]].ad += 3;
                                            this.my_minions[pirate_arr[pirate_random]].hp += 1;
                                        }else if(this.my_minions[pirate_arr[pirate_random]].name == '甲板杂兵'){
                                            this.my_minions[pirate_arr[pirate_random]].ad += 2;
                                            this.my_minions[pirate_arr[pirate_random]].hp += 2;
                                        }else if(this.my_minions[pirate_arr[pirate_random]].name == '托尼双牙'){
                                            this.my_minions[pirate_arr[pirate_random]].ad += 4;
                                            this.my_minions[pirate_arr[pirate_random]].hp += 6;
                                        }
                                        

                                        //触发动画
                                        this.$refs.myM[pirate_arr[pirate_random]].classList.add('active');
                                        setTimeout(()=>{
                                            this.$refs.myM[pirate_arr[pirate_random]].classList.remove('active');
                                        },500)
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
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/tuonishuangya.png')
                },
                {
                    name : '霍格船长',
                    ad : 6,
                    hp : 6,
                    level : 5,
                    type : '海盗',
                    skill:{
                        type : 'none',
                        info : '每当你购买一个海盗，在本回合中获得一枚铸币。',
                        special(){

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
                    img:require('../../assets/minions/海盗/huogechuanzhang.png')
                },
                //中立
                {
                    name : '瑞文戴尔男爵',
                    ad : 1,
                    hp : 7,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'none',
                        info : '你的随从的亡语将触发两次。'
                        
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
                        ad:1,
                        hp:7
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/ruiwendaiernanjue.jpg')
                },
                {
                    name : '硬壳清道夫',
                    ad : 2,
                    hp : 3,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'all_cry',
                        info : '战吼：使你具有嘲讽的随从获得+2/+2。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].character.ridicule){
                                        this.my_minions[i].ad +=  4;
                                        this.my_minions[i].hp +=  4;
                                        if(this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合'){
                                            //现境大师函数
                                            this.realMasterFunction();
                                        }
                                        //数据增加动画
                                        this.dataAnimation(i,'all');
                                    }
                                }
                            }else{
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].character.ridicule){
                                        this.my_minions[i].ad +=  2;
                                        this.my_minions[i].hp +=  2;
                                        if(this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合'){
                                            //现境大师函数
                                            this.realMasterFunction();
                                        }
                                        //数据增加动画
                                        this.dataAnimation(i,'all');
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
                    img:require('../../assets/minions/中立/yingheqingdaofu.png')
                },
                {
                    name : '拆解者米斯拉克斯',
                    ad : 4,
                    hp : 4,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'passive',
                        info : '在你的回合结束时，你每控制一个随从类型的随从，便获得+1/+2。',
                        passive(index){
                            let diff_arr = []
                            //两个for遍历数组，同名丢弃，异名存入diff数组
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name != '' && i != index && this.my_minions[i].type != '中立'){
                                    if(diff_arr.length == 0){
                                        diff_arr.push(this.my_minions[i].type)
                                    }else{
                                        for(let j=0;j<diff_arr.length;j++){
                                            if(this.my_minions[i].type == '混合'){
                                                diff_arr.push(this.my_minions[i].type);
                                                break;
                                            }else{
                                                if(this.my_minions[i].type != diff_arr[j]){
                                                    if(j == diff_arr.length-1){
                                                        diff_arr.push(this.my_minions[i].type);
                                                    }
                                                }else{
                                                    break;
                                                }
                                            }
                                        }
                                    } 
                                }
                            }
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<diff_arr.length;i++){
                                    this.my_minions[index].ad += 2;
                                    this.my_minions[index].hp += 4;
                                }
                                //数据增加动画
                                this.dataAnimation(index,'all');
                            }else{
                                for(let i=0;i<diff_arr.length;i++){
                                    this.my_minions[index].ad += 1;
                                    this.my_minions[index].hp += 2;
                                }
                                //数据增加动画
                                this.dataAnimation(index,'all');
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
                    img:require('../../assets/minions/中立/chaijiezhe.png')
                },
                {
                    name : '现境大师',
                    ad : 6,
                    hp : 6,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'special',
                        info : '嘲讽 在一个友方元素获得属性值后，获得+1/+1。',
                        special(index){
                            if(this.my_minions[index].isGold){
                                this.my_minions[index].ad += 2;
                                this.my_minions[index].hp += 2;
                                //数据增加动画
                                this.dataAnimation(index,'all');
                            }else{
                                this.my_minions[index].ad += 1;
                                this.my_minions[index].hp += 1;
                                //数据增加动画
                                this.dataAnimation(index,'all');
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
                        ad:6,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/xianjindashi.png')
                },
                {
                    name : '“厨房煞星”诺米',
                    ad : 4,
                    hp : 4,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'continue',
                        info : '在你使用一张元素牌后，鲍勃的酒馆中的元素在本局对战的剩余时间内获得+1/+1。',
                        continue(index,id){
                            if(this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合'){
                                //将酒馆的卡池元素卡全部加属性
                                for(let i =0;i<this.minions_pool.six.length;i++){
                                    if(this.minions_pool.six[i].type == '元素' || this.minions_pool.six[i].type == '混合'){
                                        if(this.my_minions[id].isGold){
                                            this.minions_pool.six[i].ad += 2;
                                            this.minions_pool.six[i].hp += 2;
                                        }else{
                                            this.minions_pool.six[i].ad += 1;
                                            this.minions_pool.six[i].hp += 1;
                                        }
                                    }
                                }
                                //将目前bob酒馆的随从增加属性值
                                for(let i=0;i<7;i++){
                                    if(this.bob_minions[i].type == '元素' || this.bob_minions[i].type == '混合'){
                                        if(this.my_minions[id].isGold){
                                            this.bob_minions[i].ad += 2;
                                            this.bob_minions[i].hp += 2;
                                        }else{
                                            this.bob_minions[i].ad += 1;
                                            this.bob_minions[i].hp += 1;
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
                        ad:4,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/nuomi.png')
                },
                {
                    name : '致命孢子',
                    ad : 1,
                    hp : 1,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'none',
                        info : '剧毒'
                        
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        death : false,
                        toxic:true,
                        ridicule:false
                    },
                    init:{
                        ad:1,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/zhimingbaozi.png')
                },
                {
                    name : '布莱恩铜须',
                    ad : 2,
                    hp : 4,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'none',
                        info : '你的战吼会触发 两次。'
                        
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
                    img:require('../../assets/minions/中立/bulaientongxu.png')
                },
                {
                    name : '坎格尔的学徒',
                    ad : 3,
                    hp : 6,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'none',
                        info : '亡语：召唤本场战斗中最先死亡的两个友方机械。'
                        
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
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/kanteerdexuetu.png')
                },
                {
                    name : '光牙执行者',
                    ad : 2,
                    hp : 2,
                    level : 5,
                    type : '中立',
                    skill:{
                        type : 'passive',
                        info : '在你的回合结束时，随机使每个随从类型的各一个友方随从获得+2/+2。',
                        passive(index){
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
                                            if(this.my_minions[i].type == '混合'){
                                                let ob = {
                                                    type : this.my_minions[i].type,
                                                    index : i
                                                }
                                                diff_arr.push(ob)
                                                break;
                                            }else{
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
                            }
                            if(diff_arr.length>0){
                                for(let i=0;i<diff_arr.length;i++){
                                    if(this.my_minions[index].isGold){
                                        this.my_minions[diff_arr[i].index].ad += 4
                                        this.my_minions[diff_arr[i].index].hp += 4
                                        //数据增加动画
                                        this.dataAnimation(diff_arr[i].index,'all');
                                        if(this.my_minions[diff_arr[i].index].type == '元素' || this.my_minions[diff_arr[i].index].type == '混合'){
                                            this.realMasterFunction();
                                        }
                                    }else{
                                        this.my_minions[diff_arr[i].index].ad += 2
                                        this.my_minions[diff_arr[i].index].hp += 2
                                        //数据增加动画
                                        this.dataAnimation(diff_arr[i].index,'all');
                                        if(this.my_minions[diff_arr[i].index].type == '元素' || this.my_minions[diff_arr[i].index].type == '混合'){
                                            this.realMasterFunction();
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
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/guanyazhixingzhe.png')
                },
            ]
        }
    }
}
export default fiveMinionData