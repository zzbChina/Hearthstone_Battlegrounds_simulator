let functions = {
    methods:{
        //刷新时随从数据的替换函数,number为循环刷新出多少个随从
        replace(number,arr){      
            if(this.hero.name == '伊瑟拉'){
                for(let i=0;i<7;i++){
                    if(i<number){
                        let random = Math.floor(Math.random()*arr.length)//random为0-4
                        if(this.bob_minions[i].isFreeze == false){
                            this.transferData(this.bob_minions[i],arr[random]);
                        }
                    }else{  
                        if(!this.bob_minions[i].isFreeze){
                            this.clearMinionData(this.bob_minions,i)
                        }  
                    }
                }
            }else{
                for(let i=0;i<7;i++){
                
                    if(i<number){
                        let random = Math.floor(Math.random()*arr.length)//random为0-4
                        if(this.bob_minions[i].isFreeze == false){
                            this.transferData(this.bob_minions[i],arr[random]);
                        }
                        
                    }else{  
                        this.clearMinionData(this.bob_minions,i)
                        
                    }
                }
            }
            
        },
        //清除随从数据,ob是清除对象
        clearMinionData(arr,index){
            arr[index].name = '',
            arr[index].ad = '',
            arr[index].hp = '',
            arr[index].isFreeze = false,
            arr[index].level = '',
            arr[index].type = '',
            arr[index].skill = '',
            arr[index].character.shield = false,
            arr[index].character.windFury = false,
            arr[index].character.relive = false,
            arr[index].character.toxic = false,
            arr[index].character.ridicule = false,
            arr[index].character.death = false,
            arr[index].init.ad = '',
            arr[index].init.hp = '',
            arr[index].isGold = false,
            arr[index].img = require('../assets/card.jpg')
        },
        //将购买的随从卡加入自己的手牌中
        addMinionToMyHand(item){
            let object = {
                name : item.name,
                ad : item.ad,
                hp : item.hp,
                level : item.level,
                type:item.type,
                skill : item.skill,
                character:{
                    shield:item.character.shield,
                    windFury:item.character.windFury,
                    relive:item.character.relive,
                    toxic:item.character.toxic,
                    ridicule:item.character.ridicule,
                    death : item.character.death
                },
                init:{
                    ad:item.init.ad,
                    hp:item.init.hp
                },
                img : item.img,
                isGold : item.isGold
            }
            this.my.hands.push(object)
        },
        //三连判断函数,ob为所购买的随从对象
        isCombo(ob){
            //打开计数器
            let same = 0;
            //遍历手牌是否有三张相同的非金随从
            for(let i=0;i<this.my.hands.length;i++){
                if(this.my.hands[i].name == ob.name && this.my.hands[i].isGold == false){
                    same=same+1;
                    if(same == 1){
                        this.material[0].ad = this.my.hands[i].ad
                        this.material[0].hp = this.my.hands[i].hp
                        //重置共同属性数据
                        this.material[2].shield = false;
                        this.material[2].windFury = false;
                        this.material[2].relive = false;
                        this.material[2].toxic = false;
                        this.material[2].ridicule = false;
                        this.material[2].death = false;
                        
                        //将共同属性合成到一个对象上，金色三连后的随从就继承这个共有属性
                        if(this.my.hands[i].character.shield){
                            this.material[2].shield = true
                        }
                        if(this.my.hands[i].character.windFury){
                            this.material[2].windFury = true
                        }
                        if(this.my.hands[i].character.relive){
                            this.material[2].relive = true
                        }
                        if(this.my.hands[i].character.ridicule){
                            this.material[2].ridicule = true
                        }
                        if(this.my.hands[i].character.toxic){
                            this.material[2].toxic = true
                        }
                        if(this.my.hands[i].character.death){
                            this.material[2].death = true
                        }
                    }
                    if(same == 2){
                        this.material[1].ad = this.my.hands[i].ad
                        this.material[1].hp = this.my.hands[i].hp
                        //将共同属性合成到一个对象上，金色三连后的随从就继承这个共有属性
                        if(this.my.hands[i].character.shield){
                            this.material[2].shield = true
                        }
                        if(this.my.hands[i].character.windFury){
                            this.material[2].windFury = true
                        }
                        if(this.my.hands[i].character.relive){
                            this.material[2].relive = true
                        }
                        if(this.my.hands[i].character.ridicule){
                            this.material[2].ridicule = true
                        }
                        if(this.my.hands[i].character.toxic){
                            this.material[2].toxic = true
                        }
                        if(this.my.hands[i].character.death){
                            this.material[2].death = true
                        }
                        return true;
                    }
                }
            }
            //再遍历场上我的随从
            for(let i=0;i<this.my_minions.length;i++){
                if(this.my_minions[i].name == ob.name && this.my_minions[i].isGold == false){
                    same=same+1;
                    if(same == 1){
                        this.material[0].ad = this.my_minions[i].ad
                        this.material[0].hp = this.my_minions[i].hp

                        //重置共同属性数据
                        this.material[2].shield = false;
                        this.material[2].windFury = false;
                        this.material[2].relive = false;
                        this.material[2].toxic = false;
                        this.material[2].ridicule = false;
                        this.material[2].death = false;
                        
                        //将共同属性合成到一个对象上，金色三连后的随从就继承这个共有属性
                        if(this.my_minions[i].character.shield){
                            this.material[2].shield = true
                        }
                        if(this.my_minions[i].character.windFury){
                            this.material[2].windFury = true
                        }
                        if(this.my_minions[i].character.relive){
                            this.material[2].relive = true
                        }
                        if(this.my_minions[i].character.ridicule){
                            this.material[2].ridicule = true
                        }
                        if(this.my_minions[i].character.toxic){
                            this.material[2].toxic = true
                        }
                        if(this.my_minions[i].character.death){
                            this.material[2].death = true
                        }
                    }
                    if(same == 2){
                        this.material[1].ad = this.my_minions[i].ad
                        this.material[1].hp = this.my_minions[i].hp
                        //将共同属性合成到一个对象上，金色三连后的随从就继承这个共有属性
                        if(this.my_minions[i].character.shield){
                            this.material[2].shield = true
                        }
                        if(this.my_minions[i].character.windFury){
                            this.material[2].windFury = true
                        }
                        if(this.my_minions[i].character.relive){
                            this.material[2].relive = true
                        }
                        if(this.my_minions[i].character.ridicule){
                            this.material[2].ridicule = true
                        }
                        if(this.my_minions[i].character.toxic){
                            this.material[2].toxic = true
                        }
                        if(this.my_minions[i].character.death){
                            this.material[2].death = true
                        }
                        return true;
                    }
                }
            }
        },
        //三连函数,ob为所购买的随从对象
        getCombo(ob){
            //过滤掉相同随从，然后合成一张金色随从卡至自己手牌
            this.my.hands = this.my.hands.filter((x)=>{
                return x.name != ob.name || x.isGold
            })
            this.my_minions.forEach((m)=>{
                if(m.name == ob.name && m.isGold == false){
                    m.name = '';
                    m.ad = '';
                    m.hp = '';
                    m.level = '';
                    m.type = '';
                    m.skill = '';
                    m.character = {
                        shield:false,
                        windFury:false,
                        relive:false,
                        toxic:false,
                        ridicule:false,
                        death : false
                    },
                    m.init = {
                        ad : '',
                        hp : ''
                    }
                    m.isGold = false;
                    m.img = require('../assets/card.jpg');
                }
            })
            if(ob.ad > ob.init.ad || ob.hp > ob.init.hp){
                let  gold_minion = {
                    name : ob.name,
                    ad : this.material[0].ad + this.material[1].ad + ob.ad,
                    hp : this.material[0].hp + this.material[1].hp + ob.hp,
                    level : ob.level,
                    type : ob.type,
                    skill : ob.skill,
                    character:{
                        shield:this.material[2].shield,
                        windFury:this.material[2].windFury,
                        relive:this.material[2].relive,
                        toxic:this.material[2].toxic,
                        ridicule:this.material[2].ridicule,
                        death  :this.material[2].death
                    },
                    init:{
                        ad : ob.init.ad*2,
                        hp : ob.init.hp*2
                    },
                    isGold : true,
                    img : ob.img
                }

                //重置共有属性
                this.material[2].shield = false;
                this.material[2].windFury = false;
                this.material[2].relive = false;
                this.material[2].toxic = false;
                this.material[2].ridicule = false;
                this.material[2].death = false;

                this.my.hands.push(gold_minion);
                //手牌放入，触发佩吉
                this.peiJiReactive()
                
                this.all_info.combo ++;
            }else{
                let  gold_minion = {
                    name : ob.name,
                    ad : this.material[0].ad + this.material[1].ad,
                    hp : this.material[0].hp + this.material[1].hp,
                    level : ob.level,
                    type : ob.type,
                    skill : ob.skill,
                    character:{
                        shield:this.material[2].shield,
                        windFury:this.material[2].windFury,
                        relive:this.material[2].relive,
                        toxic:this.material[2].toxic,
                        ridicule:this.material[2].ridicule,
                        death  :this.material[2].death
                    },
                    init:{
                        ad : ob.init.ad*2,
                        hp : ob.init.hp*2
                    },
                    isGold : true,
                    img : ob.img
                }

                //重置共有属性
                this.material[2].shield = false;
                this.material[2].windFury = false;
                this.material[2].relive = false;
                this.material[2].toxic = false;
                this.material[2].ridicule = false;
                this.material[2].death = false;

                this.my.hands.push(gold_minion);
                //手牌放入，触发佩吉
                this.peiJiReactive()

                this.all_info.combo ++;
            }
            
            
            
            
        },
        //清除对应手牌数据
        clearMyHandCard(id){
            this.my.hands = this.my.hands.filter((m,index)=>{
                return index!= id
            })
        },
        //对象数据转移公用函数,x为接受数据方，y为发送方
        transferData(x,y){
            x.name = y.name;
            x.ad = y.ad;
            x.hp = y.hp;
            x.level = y.level;
            x.type = y.type;
            x.skill = y.skill,
            x.character.shield = y.character.shield;
            x.character.windFury = y.character.windFury;
            x.character.death = y.character.death;
            x.character.toxic = y.character.toxic;
            x.character.ridicule = y.character.ridicule;
            x.character.relive = y.character.relive;
            x.init.ad = y.init.ad;
            x.init.hp = y.init.hp;
            x.isGold = y.isGold;
            x.img = y.img;
        },
        //三连随从奖励
        getComboGift(level){
            
            if(level == 1){ 
                this.randomMinions(this.two_minions);   
            }else if(level == 2){
                this.randomMinions(this.three_minions); 
            }else if(level == 3){
                this.randomMinions(this.four_minions); 
            }else if(level == 4){
                this.randomMinions(this.five_minions); 
            }else if(level == 5 || level == 6){
                this.randomMinions(this.six_minions); 
            }
        },
        //三连抓取随从函数
        randomMinions(pool){
            let arr = []
            for(let i=0;i<pool.length;i++){
                arr.push(i)
            }
            for(let i=0;i<3;i++){ 
                let random = Math.floor(Math.random()*arr.length)
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
                this.transferData(ob,pool[arr[random]])
                ob.ad = ob.init.ad
                ob.hp = ob.init.hp
                this.selectCombo.push(ob)
                arr = arr.filter((a,index)=>{
                    return index != random
                })
                
            }
        },
        //数据动画,第一个参数是数组索引，即那个随从需要该动画,第二个参数表示类型，'ad'表示只做攻击力加成动画，'hp'表示做生命值动画，'all'表示都做
        //
        dataAnimation(index,type,){
            index = Number(index);
            if(type == 'all'){
                this.$refs.myMinionAd[index].classList.add('active');
                this.$refs.myMinionHp[index].classList.add('active');
                setTimeout(()=>{
                    this.$refs.myMinionAd[index].classList.remove('active');
                    this.$refs.myMinionHp[index].classList.remove('active');
                },400)
            }else if(type == 'ad'){
                this.$refs.myMinionAd[index].classList.add('active');
                setTimeout(()=>{
                    this.$refs.myMinionAd[index].classList.remove('active');
                },400)
            }else{
                this.$refs.myMinionHp[index].classList.add('active');
                setTimeout(()=>{
                    this.$refs.myMinionHp[index].classList.remove('active');
                },400)
            }
        },
        //现境大师属性加成函数
        realMasterFunction(){
            for(let j=0;j<7;j++){
                if(this.my_minions[j].name == '现境大师'){
                    this.my_minions[j].skill.special.call(this,j)
                }
            }
        },
        //佩吉触发函数
        peiJiReactive(){
            for(let i=0;i<7;i++){
                if(this.my_minions[i].name == '佩吉布里特伯'){
                    this.my_minions[i].skill.special.call(this,i)
                }
            }
        },
        //铜须判断函数,返回战吼翻倍次数
        tongxuFunction(){
            let cry_mul = ''
            for(let i=0;i<7;i++){
                if(this.my_minions[i].name == '布莱恩铜须' && this.my_minions[i].isGold){
                    return 3
                }
                else if(this.my_minions[i].name == '布莱恩铜须'){
                    cry_mul = 2
                }
                if(i == 6){
                    return cry_mul
                }
            }
        },
        //判断卡德加,返回的值等于需多召唤的随从个数
        checkKaDeJia(){
            let mul_num = 0
            for(let i=0;i<7;i++){
                if(this.my_minions[i].name == '卡德加' && this.my_minions[i].isGold){
                    mul_num += 2;
                }else if(this.my_minions[i].name == '卡德加'){
                    mul_num += 1;
                }
                if(i == 6){
                    return mul_num;
                }   
            }
        },
        //刺背蛮兵触发函数,index为鉴别是否是刺背蛮兵的索引
        ariseCiBei(index){
            if(this.my_minions[index].name == '刺背蛮兵' && this.my_minions[index].skill.type  == 'none'){
                if(this.my_minions[index].isGold){
                    this.my_minions[index].ad += 6;
                    this.my_minions[index].hp += 6;
                }else{
                    this.my_minions[index].ad += 3;
                    this.my_minions[index].hp += 3;
                }
                this.my_minions[index].skill.type = 'get'
            }
        },
        //劲爆二人组触发函数
        ariseJinBao(){
            for(let x=0;x<7;x++){
                if(this.my_minions[x].name == '劲爆二人组'){
                    if(this.my_minions[x].isGold){
                        this.my_minions[x].ad += 2;
                        this.my_minions[x].hp += 2;
                        this.dataAnimation(x,'all');
                    }else{
                        this.my_minions[x].ad += 1;
                        this.my_minions[x].hp += 1;
                        this.dataAnimation(x,'all');
                    }
                }
            }
        },
        //霍格船长触发
        ariseHuoGe(){
            for(let i=0;i<7;i++){
                if(this.my_minions[i].name == '霍格船长'){
                    if(this.my_minions[i].isGold){
                        for(let j=0;j<2;j++){
                            if(this.my.money < 10){
                                this.my.money ++;
                            }
                        }
                    }else{
                        if(this.my.money < 10){
                            this.my.money ++;
                        }
                    }
                }
            }
        },
        //雏龙走私商人调用函数,index为需要加成的龙的索引
        ariseChuLong(index){
            for(let i =0;i<7;i++){
                if(this.my_minions[i].name == '雏龙走私商'){
                    if(this.my_minions[i].isGold){
                        this.my_minions[index].hp += 2;
                        //数据增加动画
                        this.dataAnimation(index,'hp');
                    }else{
                        this.my_minions[index].hp += 1;
                        //数据增加动画
                        this.dataAnimation(index,'hp');
                    }
                }
            }
        },
        //回收魔灵触发
        moLinFunction(){
            let reduce = 0
            for(let i=0;i<7;i++){
                if(this.my_minions[i].name == '回收魔灵'){
                    if(this.my_minions[i].isGold){
                        return 2;
                    }else{
                        reduce = 1
                    }
                }
                if(i == 6){
                    return reduce
                }
            }
        },
        
        


        
        
    }
}

export default functions