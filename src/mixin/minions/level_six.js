let sixMinionData = {
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
            six_minions:[
                //龙
                {
                    name : '奥数守护者卡雷苟斯',
                    ad : 4,
                    hp : 12,
                    level : 6,
                    type : '龙',
                    skill:{
                        type : 'continue',
                        continue(index,id){
                            if(this.my_minions[index].skill.type == 'single_cry_put' || this.my_minions[index].skill.type == 'single_cry_select' || this.my_minions[index].skill.type == 'all_cry'){
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].type == '龙' || this.my_minions[i].type == '混合'){
                                        if(this.my_minions[id].isGold){
                                            this.my_minions[i].ad += 2;
                                            this.my_minions[i].hp += 2;
                                            //数据增加动画
                                            this.dataAnimation(i,'all');
                                        }else{
                                            this.my_minions[i].ad += 1;
                                            this.my_minions[i].hp += 1;
                                            //数据增加动画
                                            this.dataAnimation(i,'all');
                                        }
                                    }
                                }
                            }

                        }
                    },
                    isGold : false,
                    character:{
                        shield:false,
                        windFury:false,
                        relive:false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:4,
                        hp:12
                    },
                    img:require('../../assets/minions/龙/kaleigousi.jpg')
                },
                //野兽
                {
                    name : '巨狼戈德林',
                    ad : 4,
                    hp : 4,
                    level : 6,
                    type : '野兽',
                    skill:{
                        type:'death_select_all',
                        info  :'亡语：使你的野兽获得+5/+5。',
                        death(isGold,isMe){
                            if(isMe){
                                for(let i=0;i<this.my_minions.length;i++){
                                    if(isGold){
                                        this.my_minions[i].hp += 10
                                    }else{
                                        this.my_minions[i].hp += 5
                                    }
                                }
                            }else{
                                for(let i=0;i<this.enemy_minions.length;i++){
                                    if(isGold){
                                        this.enemy_minions[i].hp += 10
                                    }else{
                                        this.enemy_minions[i].hp += 5
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
                        ad:4,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/julanggedelin.png')
                },
                {
                    name : '迈克斯纳',
                    ad : 2,
                    hp : 8,
                    level : 6,
                    type : '野兽',
                    skill:{
                        type:'none',
                        info  :'剧毒',
                        none(){

                        }
                            
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
                        ad:2,
                        hp:8
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/maikesina.png')
                },
                {
                    name : '阴森巨蟒',
                    ad : 7,
                    hp : 7,
                    level : 6,
                    type : '野兽',
                    skill:{
                        type:'death',
                        info  :'亡语：随机召唤 两个亡语随从。',
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
                        ad:7,
                        hp:7
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/yinsenjumang.png')
                },
                //恶魔
                {
                    
                    name : '小鬼妈妈',
                    ad : 6,
                    hp : 10,
                    level : 6,
                    type : '恶魔',
                    skill:{
                        type : 'none',
                        info : '每当该随从受到伤害，随机召唤一个恶魔并使其获得嘲讽。',
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
                        hp:10
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/xiaoguimama.png')
                },
                {
                    
                    name : '饥饿的魔蝠',
                    ad : 9,
                    hp : 5,
                    level : 6,
                    type : '恶魔',
                    skill:{
                        type : 'passive',
                        info : '在你的回合结束时，每个友方恶魔吞食鲍勃的酒馆中的一个随从，获得其属性值。',
                        passive(index){
                            //遍历出场上bob的随从的索引放在一个数组里
                            let mo_arr = []
                            for(let j=0;j<7;j++){
                                if(this.bob_minions[j].name != ''){
                                    mo_arr.push(j);
                                }
                            }
                            //遍历出场上我的恶魔随从的索引放在一个数组里
                            let eat_arr = []
                            for(let j=0;j<7;j++){
                                if(this.my_minions[j].name != '' && this.my_minions[j].type == '恶魔' || this.my_minions[j].type == '混合'){
                                    eat_arr.push(j);
                                }
                            }
                            //当bob有随从可以吃的时候
                            if(mo_arr.length>1){
                                if(this.my_minions[index].isGold){
                                    for(let i=0;i<7;i++){
                                        let random_1 = Math.floor(Math.random()*mo_arr.length);
                                        let random_2 = Math.floor(Math.random()*eat_arr.length);
                                        this.my_minions[eat_arr[random_2]].ad += this.bob_minions[mo_arr[random_1]].ad * 2;
                                        this.my_minions[eat_arr[random_2]].hp += this.bob_minions[mo_arr[random_1]].hp * 2;
    
                                        //数据增加动画
                                        this.dataAnimation(eat_arr[random_2],'all');
                                        
                                        //删除该酒馆随从
                                        this.clearMinionData(this.bob_minions,mo_arr[random_1]);
                                        mo_arr = mo_arr.filter((a,id)=>{
                                            return id != random_1
                                        })
                                        eat_arr = eat_arr.filter((e,id)=>{
                                            return id != random_2
                                        })
                                        //当所有恶魔都迟到buff时或bob随从都被吃完时退出循环
                                        if(eat_arr.length == 0 || mo_arr.length == 0){
                                            return;
                                        }
                                    }
                                }else{
                                    for(let i=0;i<7;i++){
                                        let random_1 = Math.floor(Math.random()*mo_arr.length);
                                        let random_2 = Math.floor(Math.random()*eat_arr.length);
                                        this.my_minions[eat_arr[random_2]].ad += this.bob_minions[mo_arr[random_1]].ad ;
                                        this.my_minions[eat_arr[random_2]].hp += this.bob_minions[mo_arr[random_1]].hp ;
    
                                        //数据增加动画
                                        this.dataAnimation(eat_arr[random_2],'all');
    
                                        //删除该酒馆随从
                                        this.clearMinionData(this.bob_minions,mo_arr[random_1]);
    
                                        mo_arr = mo_arr.filter((a,id)=>{
                                            return id != random_1
                                        })
                                        eat_arr = eat_arr.filter((e,id)=>{
                                            return id != random_2
                                        })
                                        //当所有恶魔都迟到buff时或bob随从都被吃完时退出循环
                                        if(eat_arr.length == 0 || mo_arr.length == 0){
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
                        ad:9,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/jiedemofu.png')
                },
                //元素
                {
                    
                    name : '温和的灯神',
                    ad : 4,
                    hp : 5,
                    level : 6,
                    type : '元素',
                    skill:{
                        type : 'passive',
                        info : '嘲讽，亡语：随机召唤一个其他元素，并将召唤的元素的复制置入你的手牌。',
                        passive(index){
                            
                            
                            if(this.pub_info.level == 5){
                                //获取所有五星酒馆的元素
                                let ele_level__arr = []
                                for(let i=0;i<this.minions_pool.five.length;i++){
                                    if((this.minions_pool.five[i].type == '元素' || this.minions_pool.five[i].type == '混合') && this.minions_pool.five[i].name != '酒馆旋风'){
                                        ele_level__arr.push(i)
                                    }
                                }
                                if(this.my_minions[index].isGold){
                                    for(let j=0;j<2;j++){
                                        if(this.my.hands.length<10){
                                            let random = Math.floor(Math.random() * ele_level__arr.length)
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
                                            this.transferData(ob,this.minions_pool.five[ele_level__arr[random]])
                                            ob.ad = ob.init.ad
                                            ob.hp = ob.init.hp
                                            
                                            if(this.isCombo.call(this,ob)){
                                                //若函数返回true，表示达成三连条件，调用三联函数
                                                this.getCombo.call(this,ob)
                        
                                                this.bob.msg = '精彩的三连';
                                                this.bob.say = true;
                                                setTimeout(()=>{
                                                        this.bob.say = false;
                                                },1500)
                                                
                                            }else{
                                                this.my.hands.push(ob)
                                                //手牌放入，触发佩吉
                                                this.peiJiReactive()
                                            }
                                        }
                                    }
                                }else{
                                    if(this.my.hands.length<10){
                                        let random = Math.floor(Math.random() * ele_level__arr.length)
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
                                        this.transferData(ob,this.minions_pool.five[ele_level__arr[random]])
                                        ob.ad = ob.init.ad
                                        ob.hp = ob.init.hp
                                        if(this.isCombo.call(this,ob)){
                                            //若函数返回true，表示达成三连条件，调用三联函数
                                            this.getCombo.call(this,ob)
                    
                                            this.bob.msg = '精彩的三连';
                                            this.bob.say = true;
                                            setTimeout(()=>{
                                                    this.bob.say = false;
                                            },1500)
                                            
                                        }else{
                                            this.my.hands.push(ob)
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
                                    for(let j=0;j<2;j++){
                                        if(this.my.hands.length<10){
                                            let random = Math.floor(Math.random() * ele_level__arr.length)
                                            // const ob = this.minions_pool.six[ele_level__arr[random]]
                                            // let temp_ad = ''
                                            // let temp_hp = ''
                                            // temp_ad = ob.init.ad
                                            // temp_hp = ob.init.hp
                                            // ob.ad = temp_ad
                                            // ob.hp = temp_hp
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
                                            this.transferData(ob,this.minions_pool.six[ele_level__arr[random]])
                                            ob.ad = ob.init.ad
                                            ob.hp = ob.init.hp
                                            if(this.isCombo.call(this,ob)){
                                                //若函数返回true，表示达成三连条件，调用三联函数
                                                this.getCombo.call(this,ob)
                        
                                                this.bob.msg = '精彩的三连';
                                                this.bob.say = true;
                                                setTimeout(()=>{
                                                        this.bob.say = false;
                                                },1500)
                                                
                                            }else{
                                                this.my.hands.push(ob)
                                                //手牌放入，触发佩吉
                                                this.peiJiReactive()
                                            }
                                        }
                                    }
                                }else{
                                    if(this.my.hands.length<10){
                                        let random = Math.floor(Math.random() * ele_level__arr.length)
                                        // const ob = this.minions_pool.six[ele_level__arr[random]]
                                        // let temp_ad = ''
                                        // let temp_hp = ''
                                        //     temp_ad = ob.init.ad
                                        //     temp_hp = ob.init.hp
                                        //     ob.ad = temp_ad
                                        //     ob.hp = temp_hp
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
                                        this.transferData(ob,this.minions_pool.six[ele_level__arr[random]])
                                        ob.ad = ob.init.ad
                                        ob.hp = ob.init.hp
                                        if(this.isCombo.call(this,ob)){
                                            //若函数返回true，表示达成三连条件，调用三联函数
                                            this.getCombo.call(this,ob)
                    
                                            this.bob.msg = '精彩的三连';
                                            this.bob.say = true;
                                            setTimeout(()=>{
                                                    this.bob.say = false;
                                            },1500)
                                            
                                        }else{
                                            this.my.hands.push(ob)
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
                        death : true,
                        toxic:false,
                        ridicule:true
                    },
                    init:{
                        ad:4,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/元素/wenhededengsheng.png')
                },
                {
                    
                    name : '小拉格',
                    ad : 6,
                    hp : 6,
                    level : 6,
                    type : '元素',
                    skill:{
                        type : 'continue',
                        info : '在你使用一张元素牌后，使一个友方随从获得等同于该元素等级的属性值。',
                        continue(index,id){
                            if((this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合') && index != id){
                                //存储所有元素索引
                                let ele_arr = []
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合' && id != index && index != i){
                                        ele_arr.push(i)
                                    }
                                }
                                if(ele_arr.length > 0){
                                    let random = Math.floor(Math.random()*ele_arr.length)
                                    if(this.my_minions[id].isGold){
                                        this.my_minions[ele_arr[random]].ad += this.my_minions[index].level*2
                                        this.my_minions[ele_arr[random]].hp += this.my_minions[index].level*2
                                    }else{
                                        this.my_minions[ele_arr[random]].ad += this.my_minions[index].level
                                        this.my_minions[ele_arr[random]].hp += this.my_minions[index].level
                                        
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
                        ad:6,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/元素/xiaolage.png')
                },
                //机械
                {
                    
                    name : '死神4000型',
                    ad : 6,
                    hp : 9,
                    level : 6,
                    type : '机械',
                    skill:{
                        type : 'none',
                        info : '同时对其攻击目标相邻的随从造成伤害。',
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
                        hp:9
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/sisheng4000.png')
                },
                {
                    
                    name : '欧米茄破坏者',
                    ad : 5,
                    hp : 5,
                    level : 6,
                    type : '机械',
                    skill:{
                        type : 'death',
                        info : '亡语：召唤五个1/1的微型机器人。每有一个放不下的机器人，便使你的机械获得+1/+1。',
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
                        ad:5,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/oumijiapohuaizhe.png')
                },
                //海盗
                {
                    
                    name : '好奇的掠夺者',
                    ad : 7,
                    hp : 6,
                    level : 6,
                    type : '海盗',
                    skill:{
                        type : 'passive',
                        info : '每两个回合，随机将一张金色随从牌置入你的手牌。',
                        passive(index){
                            if(!this.my_minions[index].skill.getGold){
                                this.my_minions[index].skill.getGold = 2
                            }
                            if(!this.my_minions[index].isGold){
                                this.my_minions[index].skill.getGold -= 1;
                                if(this.my_minions[index].skill.getGold == 0){
                                    this.my_minions[index].skill.getGold = 2
                                    if(this.my.hands.length < 10){
                                        if(this.pub_info.level == 5){
                                            let random =Math.floor(Math.random()*this.minions_pool.five.length);
                                            //创建一张金卡
                                            let newGCard = {
                                                name : '',
                                                level : '',
                                                ad : '',
                                                hp : '',
                                                skill : '',
                                                character:{
                                                    shield:false,
                                                    windFury:false,
                                                    relive:false,
                                                    death : false,
                                                    toxic:false,
                                                    ridicule:false
                                                },
                                                init:{
                                                    ad:'',
                                                    hp:''
                                                },
                                                img : '',
                                                isGold : false,
                                                type : ''
                                            }
                                            this.transferData(newGCard,this.minions_pool.five[random]);
                                            //将其该成金卡
                                            newGCard.ad = newGCard.init.ad*2;
                                            newGCard.hp = newGCard.init.hp*2;
                                            newGCard.isGold = true;
                                            this.my.hands.push(newGCard);
                                        }else if(this.pub_info.level == 6){
                                            let random =Math.floor(Math.random()*this.minions_pool.six.length);
                                            //创建一张金卡
                                            let newGCard = {
                                                name : '',
                                                level : '',
                                                ad : '',
                                                hp : '',
                                                skill : '',
                                                character:{
                                                    shield:false,
                                                    windFury:false,
                                                    relive:false,
                                                    death : false,
                                                    toxic:false,
                                                    ridicule:false
                                                },
                                                init:{
                                                    ad:'',
                                                    hp:''
                                                },
                                                img : '',
                                                isGold : false,
                                                type : ''
                                            }
                                            this.transferData(newGCard,this.minions_pool.six[random]);
                                            //将其该成金卡
                                            newGCard.ad = newGCard.init.ad*2;
                                            newGCard.hp = newGCard.init.hp*2;
                                            newGCard.isGold = true;
                                            this.my.hands.push(newGCard);
                                        }
                                    }
                                }
                            }
                            if(this.my_minions[index].isGold){
                                if(this.my.hands.length < 10){
                                    if(this.pub_info.level == 5){
                                        let random =Math.floor(Math.random()*this.minions_pool.five.length);
                                        //创建一张金卡
                                        let newGCard = {
                                            name : '',
                                            level : '',
                                            ad : '',
                                            hp : '',
                                            skill : '',
                                            character:{
                                                shield:false,
                                                windFury:false,
                                                relive:false,
                                                death : false,
                                                toxic:false,
                                                ridicule:false
                                            },
                                            init:{
                                                ad:'',
                                                hp:''
                                            },
                                            img : '',
                                            isGold : false,
                                            type : ''
                                        }
                                        this.transferData(newGCard,this.minions_pool.five[random]);
                                        //将其该成金卡
                                        newGCard.ad = newGCard.init.ad*2;
                                        newGCard.hp = newGCard.init.hp*2;
                                        newGCard.isGold = true;
                                        this.my.hands.push(newGCard);
                                    }else if(this.pub_info.level == 6){
                                        let random =Math.floor(Math.random()*this.minions_pool.six.length);
                                        //创建一张金卡
                                        let newGCard = {
                                            name : '',
                                            level : '',
                                            ad : '',
                                            hp : '',
                                            skill : '',
                                            character:{
                                                shield:false,
                                                windFury:false,
                                                relive:false,
                                                death : false,
                                                toxic:false,
                                                ridicule:false
                                            },
                                            init:{
                                                ad:'',
                                                hp:''
                                            },
                                            img : '',
                                            isGold : false,
                                            type : ''
                                        }
                                        this.transferData(newGCard,this.minions_pool.six[random]);
                                        //将其该成金卡
                                        newGCard.ad = newGCard.init.ad*2;
                                        newGCard.hp = newGCard.init.hp*2;
                                        newGCard.isGold = true;
                                        this.my.hands.push(newGCard);
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
                        ad:7,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/hapqidehaixiantouweizhe.png')
                },
                {
                    
                    name : '亡灵舰长伊丽扎',
                    ad : 6,
                    hp : 9,
                    level : 6,
                    type : '海盗',
                    skill:{
                        type : 'none',
                        info : '每当一个友方海盗攻击时，使所有友方随从获得+2/+1。'
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
                        hp:9
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/wanglingjianzhang.png')
                },
                //野猪人
                {
                    
                    name : '卡尔加',
                    ad : 4,
                    hp : 4,
                    level : 6,
                    type : '野猪人',
                    skill:{
                        type : 'passive',
                        info : '在你的回合结束时，对所有友方随从各使用一张鲜血宝石。',
                        passive(index){
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
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<7;i++){
                                    for(let j=0;j<2;j++){
                                        if(this.my_minions[i].name != ''){
                                            this.my_minions[i].ad += (1+god_pig);
                                            this.my_minions[i].hp += (1+god_pig);
                                            this.ariseCiBei(i)
                                            if(this.my_minions[i].name != '劲爆二人组' && (this.my_minions[i].type == '野猪人' || this.my_minions[i].type == '混合')){
                                                //触发劲爆函数
                                                this.ariseJinBao()
                                            }
                                            //金色加圣盾
                                            if(this.my_minions[i].name == '坚牙野猪人' && this.my_minions[i].isGold){
                                                this.my_minions[i].character.shield = true
                                            }
                                            if(this.my_minions[i].name == '阿格姆棘咒'){
                                                this.my_minions[i].skill.special.call(this,i)
                                            }
                                            if(this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合'){
                                                //现境大师函数
                                                this.realMasterFunction();
                                            }
                                            //数据增加动画
                                            this.dataAnimation(i,'all');
                                        }
                                    }
                                }
                            }else{
                                for(let i=0;i<7;i++){
                                    for(let j=0;j<1;j++){
                                        if(this.my_minions[i].name != ''){
                                            this.my_minions[i].ad += (1+god_pig);
                                            this.my_minions[i].hp += (1+god_pig);
                                            this.ariseCiBei(i)
                                            if(this.my_minions[i].name != '劲爆二人组' && (this.my_minions[i].type == '野猪人' || this.my_minions[i].type == '混合')){
                                                //触发劲爆函数
                                                this.ariseJinBao()
                                            }
                                            //金色加圣盾
                                            if(this.my_minions[i].name == '坚牙野猪人' && this.my_minions[i].isGold){
                                                this.my_minions[i].character.shield = true
                                            }
                                            if(this.my_minions[i].name == '阿格姆棘咒'){
                                                this.my_minions[i].skill.special.call(this,i)
                                            }
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
                    img:require('../../assets/minions/野猪人/kaerjia.png')
                },
                {
                    
                    name : '獠牙队长',
                    ad : 9,
                    hp : 6,
                    level : 6,
                    type : '野猪人',
                    skill:{
                        type : 'special',
                        info  :'在你花掉4枚铸币后，获得一张鲜血宝石。',
                        special(index,money){
                            if(!this.my_minions[index].skill.needMoneyToBlood){
                                this.my_minions[index].skill.needMoneyToBlood = 4
                            }
                            this.my_minions[index].skill.needMoneyToBlood -= money;
                            if(this.my_minions[index].skill.needMoneyToBlood ==0){
                                if(this.my_minions[index].isGold){
                                    for(let i=0;i<2;i++){
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.bloodstone);
                                            //手牌放入，触发佩吉
                                            this.peiJiReactive()
                                        }
                                    }
                                }else{
                                    if(this.my.hands.length < 10){
                                        this.my.hands.push(this.bloodstone);
                                        //手牌放入，触发佩吉
                                        this.peiJiReactive()
                                    }
                                }
                                this.my_minions[index].skill.needMoneyToBlood = 4
                            }else if(this.my_minions[index].skill.needMoneyToBlood < 0){
                                this.my_minions[index].skill.needMoneyToBlood = 3 + this.my_minions[index].skill.needMoneyToBlood;
                                if(this.my_minions[index].isGold){
                                    for(let i=0;i<2;i++){
                                        if(this.my.hands.length < 10){
                                            this.my.hands.push(this.bloodstone);
                                            //手牌放入，触发佩吉
                                            this.peiJiReactive()
                                        }
                                    }
                                }else{
                                    if(this.my.hands.length < 10){
                                        this.my.hands.push(this.bloodstone);
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
                        ad:9,
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/liaoyaduizhang.png')
                },
                //中立
                {
                    
                    name : '扎普斯里维克',
                    ad : 7,
                    hp : 10,
                    level : 6,
                    type : '中立',
                    skill:{
                        type : 'none',
                        info : '风怒 该随从总会攻击攻击力最低的敌方随从。'
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
                        ad:7,
                        hp:10
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/zhipusiliweike.jpg')
                },
                {
                    
                    name : '红衣纳迪娜',
                    ad : 7,
                    hp : 4,
                    level : 6,
                    type : '中立',
                    skill:{
                        type : 'death_select_all',
                        info  :'亡语：使你的龙获得圣盾。',
                        death(isGold,isMe){
                            if(isMe){
                                for(let i=0;i<this.my_minions.length;i++){
                                    if(this.my_minions[i].type == '龙' || this.my_minions[i].type == '混合'){
                                        this.my_minions[i].character.shield = true
                                        console.log(isGold)
                                    }
                                }
                            }else{
                                for(let i=0;i<this.enemy_minions.length;i++){
                                    if(this.enemy_minions[i].type == '龙' || this.enemy_minions[i].type == '混合'){
                                        this.enemy_minions[i].character.shield = true
                                        console.log(isGold)
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
                        ad:7,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/hongyinadina.jpg')
                },
                {
                    
                    name : '融合巨怪',
                    ad : 6,
                    hp : 6,
                    level : 6,
                    type : `混合`,
                    skill:{
                        type : 'all_cry',
                        info : '战吼：你每有一个不同随从类型的其他随从，随机进化一次。',
                        all_cry(index){
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
                                for(let i=0;i<diff_arr.length*2;i++){
                                    let random = Math.floor(Math.random()*8);
                                    if(random == 0){
                                        this.my_minions[index].character.toxic = true
                                    }else if(random == 1){
                                        this.my_minions[index].character.shield = true
                                    }else if(random == 2){
                                        this.my_minions[index].character.windFury = true
                                    }else if(random == 3){
                                        this.my_minions[index].character.death = true
                                    }else if(random == 4){
                                        this.my_minions[index].character.ridicule = true
                                    }else if(random == 5){
                                        this.my_minions[index].ad += 3;
                                        //现境大师函数
                                        this.realMasterFunction();
                                    }else if(random == 6){
                                        this.my_minions[index].hp += 3;
                                        //现境大师函数
                                        this.realMasterFunction();
                                    }else if(random == 7){
                                        this.my_minions[index].ad += 1;
                                        this.my_minions[index].hp += 1;
                                        //现境大师函数
                                        this.realMasterFunction();
                                    }
                                }    
                            }else{
                                for(let i=0;i<diff_arr.length;i++){
                                    let random = Math.floor(Math.random()*8);
                                    if(random == 0){
                                        this.my_minions[index].character.toxic = true
                                    }else if(random == 1){
                                        this.my_minions[index].character.shield = true
                                    }else if(random == 2){
                                        this.my_minions[index].character.windFury = true
                                    }else if(random == 3){
                                        this.my_minions[index].character.death = true
                                    }else if(random == 4){
                                        this.my_minions[index].character.ridicule = true
                                    }else if(random == 5){
                                        this.my_minions[index].ad += 3;
                                        //现境大师函数
                                        this.realMasterFunction();
                                    }else if(random == 6){
                                        this.my_minions[index].hp += 3;
                                        //现境大师函数
                                        this.realMasterFunction();
                                    }else if(random == 7){
                                        this.my_minions[index].ad += 1;
                                        this.my_minions[index].hp += 1;
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
                        hp:6
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/ronghejuguai.png')
                },
                {
                    
                    name : '海鲜投喂者',
                    ad : 5,
                    hp : 5,
                    level : 6,
                    type : '中立',
                    skill:{
                        type : 'all_cry_select',
                        info : '战吼：使一个鱼人变成金色。',
                        all_cry_select(){
                            let fish_n_arr = [];//鱼人的数组
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && this.my_minions[i].isGold == false){
                                    fish_n_arr.push(i)
                                }
                            }
                            for(let i=0;i<7;i++){
                                if((this.bob_minions[i].type == '鱼人' || this.bob_minions[i].type == '混合') && this.bob_minions[i].isGold == false){
                                    fish_n_arr.push(i)
                                }
                            }
                            if(fish_n_arr.length>0){
                                this.status.isSelectMinionsPlace = true;
                                this.status.isSelectAllMinions = true;//打开选择所有随从阀
                            }
                        },
                        done(from,index){
                            if(from == 'bob'){
                                if(this.bob_minions[index].isGold == false && (this.bob_minions[index].type == '鱼人' || this.bob_minions[index].type == '混合')){
                                    this.bob_minions[index].ad += this.bob_minions[index].init.ad
                                    this.bob_minions[index].hp += this.bob_minions[index].init.hp
                                    this.bob_minions[index].isGold = true

                                    this.status.isSelectMinionsPlace = false;
                                    this.status.isSelectAllMinions = false;//关闭选择所有随从阀
                                }
                            }else{
                                if(this.my_minions[index].isGold == false && (this.my_minions[index].type == '鱼人' || this.my_minions[index].type == '混合')){
                                    this.my_minions[index].ad += this.my_minions[index].init.ad
                                    this.my_minions[index].hp += this.my_minions[index].init.hp
                                    this.my_minions[index].isGold = true

                                    this.status.isSelectMinionsPlace = false;
                                    this.status.isSelectAllMinions = false;//关闭选择所有随从阀
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
                    img:require('../../assets/minions/中立/haixiantouweizhe.png')
                },
                {
                    
                    name : '大德鲁伊哈缪尔',
                    ad : 4,
                    hp : 4,
                    level : 6,
                    type : '中立',
                    skill:{
                        type : 'all_cry',
                        info  :'战吼：刷新鲍勃的酒馆，使其中的随从变为你的多数随从的类型的随从。',
                        all_cry(){
                            let diff_arr = []
                            //两个for遍历数组，同名丢弃，异名存入diff数组
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name != '' && this.my_minions[i].type != '中立'){
                                    if(diff_arr.length == 0){
                                        let ob = {
                                            type : this.my_minions[i].type,
                                            count:0
                                        }
                                        diff_arr.push(ob)
                                    }else{
                                        for(let j=0;j<diff_arr.length;j++){
                                            if(this.my_minions[i].type == '混合'){
                                                break;
                                            }else{
                                                if(this.my_minions[i].type != diff_arr[j].type){
                                                    if(j == diff_arr.length-1){
                                                        let ob = {
                                                            type : this.my_minions[i].type,
                                                            count:0
                                                        }
                                                        diff_arr.push(ob);
                                                    }
                                                }else{
                                                    break;
                                                }
                                            }
                                        }
                                    } 
                                }
                            }
                            let type_arr = []
                            let theMostType = ''
                            let theMostCount = 0
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name != ''  && this.my_minions[i].type != '中立'){
                                    type_arr.push(this.my_minions[i].type) 
                                }
                            }
                            if(diff_arr.length > 0){
                                for(let i =0;i<diff_arr.length;i++){
                                    for(let j=0;j<type_arr.length;j++){
                                        if(type_arr[j] == diff_arr[i].type){
                                            diff_arr[i].count ++ ;
                                        }
                                        if(j == type_arr.length-1){
                                            if(diff_arr[i].count > theMostCount){
                                                theMostType = diff_arr[i].type
                                                theMostCount = diff_arr[i].count
                                                //相同的数目则有1/2的几率替换
                                            }else if(diff_arr[i].count == theMostCount){
                                                let random = Math.floor(Math.random()*2)
                                                if(random){
                                                    theMostType = diff_arr[i].type
                                                    theMostCount = diff_arr[i].count
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(theMostType != ''){
                                if(this.pub_info.level == 5){
                                    let  arr = []
                                    for(let i=0;i<this.minions_pool.five.length;i++){
                                        if(this.minions_pool.five[i].type == theMostType || this.minions_pool.five[i].type == '混合'){
                                            arr.push(i)
                                        }
                                    }
                                    //清除当前场上bob的随从
                                    for(let i=0;i<7;i++){
                                        if(this.bob_minions[i].name != ''){
                                            this.clearMinionData(this.bob_minions,i)
                                        }
                                    }
                                    //刷新一排对应随从
                                    for(let i=0;i<5;i++){
                                        let random = Math.floor(Math.random() * arr.length)
                                        this.minions_pool.five[arr[random]].isFreeze = true
                                        this.transferData(this.bob_minions[i],this.minions_pool.five[arr[random]])
                                    }
                                    for(let i=0;i<7;i++){
                                        this.$nextTick(() => {
                                            this.$refs.bobM[i].classList.add('active');
                                        })
                                        
                                        setTimeout(()=>{
                                            this.$refs.bobM[i].classList.remove('active');
                                        },500)
                                    }
                                }else if(this.pub_info.level == 6){
                                    let  arr = []
                                    for(let i=0;i<this.minions_pool.six.length;i++){
                                        if(this.minions_pool.six[i].type == theMostType || this.minions_pool.six[i].type == '混合'){
                                            arr.push(i)
                                        }
                                    }
                                    //清除当前场上bob的随从
                                    for(let i=0;i<7;i++){
                                        if(this.bob_minions[i].name != ''){
                                            this.clearMinionData(this.bob_minions,i)
                                        }
                                    }
                                    //刷新一排对应随从
                                    for(let i=0;i<6;i++){
                                        let random = Math.floor(Math.random() * arr.length)
                                        this.minions_pool.six[arr[random]].isFreeze = true
                                        this.transferData(this.bob_minions[i],this.minions_pool.six[arr[random]])
                                    }
                                    for(let i=0;i<7;i++){
                                        this.$nextTick(() => {
                                            this.$refs.bobM[i].classList.add('active');
                                        })
                                        
                                        setTimeout(()=>{
                                            this.$refs.bobM[i].classList.remove('active');
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
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/dadeluyi.png')
                },
                
            ]
        }
    }
}
export default sixMinionData