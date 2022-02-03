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
            three_minions:[
                //龙
                {
                    name : '青铜守卫',
                    ad : 2,
                    hp : 1,
                    level : 3,
                    type : '龙',
                    skill:{
                        type:'fight',
                        info  :'圣盾，复生',
                        fight(){

                        }
                    },
                    character:{
                        shield:true,
                        windFury:false,
                        relive:true,
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:2,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/qingtongshouwei.jpg')
                },
                {
                    name : '暮光使者',
                    ad : 4,
                    hp : 4,
                    level : 3,
                    type : '龙',
                    skill:{
                        type:'single_cry_select',
                        info : '嘲讽，战吼：使一条友方的龙获得+2/+2。',
                        single_cry_select(index){
                            //计数鱼人的数目
                            let dragon_number = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '龙' || this.my_minions[i].type == '混合') && i!= index){
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
                                if((this.my_minions[index].type == '龙' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 4;
                                            this.my_minions[index].hp += 4;
                                        }
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += 4;
                                        this.my_minions[index].hp += 4;

                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }
                                }
                            }else{
                                if((this.my_minions[index].type == '龙' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 2;
                                            this.my_minions[index].hp += 2;
                                            this.ariseChuLong(index)
                                        }
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += 2;
                                        this.my_minions[index].hp += 2;
                                        this.ariseChuLong(index)

                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
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
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/muguangshizhe.png')
                },
                {
                    name : '泰蕾苟萨',
                    ad : 4,
                    hp : 4,
                    level : 3,
                    type : '龙',
                    skill:{
                        type:'none',
                        info  :'该随从可永久保留 战斗阶段受到的强化效果。',
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
                        ad:4,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/taileiguosa.png')
                },
                //野兽
                {
                    name : '巨大的金刚鹦鹉',
                    ad : 5,
                    hp : 3,
                    level : 3,
                    type : '野兽',
                    skill:{
                        type:'fight',
                        info  :'在该随从攻击后，触发另一个友方随从的亡语。',
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
                        ad:5,
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/jinggangyinwu.jpg')
                },
                {
                    name : '瘟疫鼠群',
                    ad : 2,
                    hp : 2,
                    level : 3,
                    type : '野兽',
                    skill:{
                        type:'death',
                        info  :'亡语：召唤若干个1/1的老鼠，数量等同于该随从的攻击力。',
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
                    img:require('../../assets/minions/野兽/wenyishuqun.jpg')
                },
                //恶魔
                {
                    name : '卡萨纳提尔',
                    ad : 5,
                    hp : 4,
                    level : 3,
                    type : '恶魔',
                    skill:{
                        type:'none',
                        info  :'你的其他恶魔获得+2攻击力。你的英雄获得免疫。',
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
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/kasanatier.png')
                },
                {
                    name : '噬魂者',
                    ad : 3,
                    hp : 3,
                    level : 3,
                    type : '恶魔',
                    skill:{
                        type:'single_cry_select',
                        info : '战吼：选择一个友方恶魔，将其移除，获得其属性值和三枚铸币。',
                        single_cry_select(index){
                            //计数鱼人的数目
                            let dragon_number = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '恶魔' || this.my_minions[i].type == '混合') && i!= index){
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
                                if((this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){

                                            this.my_minions[this.my.putOriginIndex].ad += this.my_minions[index].ad * 2
                                            this.my_minions[this.my.putOriginIndex].hp += this.my_minions[index].hp * 2

                                            this.my.money += 6;
                                            if(this.my.money > 10){
                                                this.my.money = 10
                                            }
                                        }
                                        //数据增加动画
                                        this.dataAnimation(this.my.putOriginIndex,'all');

                                        this.clearMinionData(this.my_minions,index)

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                        
                                    }else{
                                        this.my_minions[this.my.putOriginIndex].ad += this.my_minions[index].ad * 2
                                        this.my_minions[this.my.putOriginIndex].hp += this.my_minions[index].hp * 2

                                        //数据增加动画
                                        this.dataAnimation(this.my.putOriginIndex,'all');

                                        this.clearMinionData(this.my_minions,index)

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                        this.my.money += 6;
                                        if(this.my.money > 10){
                                            this.my.money = 10
                                        }
                                    }
                                }
                            }else{
                                if((this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[this.my.putOriginIndex].ad += this.my_minions[index].ad 
                                            this.my_minions[this.my.putOriginIndex].hp += this.my_minions[index].hp
                                            
                                            this.my.money += 3;
                                            if(this.my.money > 10){
                                                this.my.money = 10
                                            }
                                        }
                                        ///数据增加动画
                                        this.dataAnimation(this.my.putOriginIndex,'all');

                                        this.clearMinionData(this.my_minions,index)

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                        
                                    }else{
                                        this.my_minions[this.my.putOriginIndex].ad += this.my_minions[index].ad 
                                        this.my_minions[this.my.putOriginIndex].hp += this.my_minions[index].hp 

                                        //数据增加动画
                                        this.dataAnimation(this.my.putOriginIndex,'all');

                                        this.clearMinionData(this.my_minions,index)

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                        this.my.money += 3;
                                        if(this.my.money > 10){
                                            this.my.money = 10
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
                    img:require('../../assets/minions/恶魔/shihunzhe.png')
                },
                //元素
                {
                    name : '爆裂飓风',
                    ad : 4,
                    hp : 1,
                    level : 3,
                    type : '元素',
                    skill:{
                        type:'none',
                        info  :'圣盾，风怒',
                        none(){

                        }
                    },
                    character:{
                        shield:true,
                        windFury:true,
                        relive:false,
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:4,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/元素/baoliejufen.png')
                },
                {
                    name : '烟雾元素',
                    ad : 3,
                    hp : 3,
                    level : 3,
                    type : '元素',
                    skill:{
                        type:'single_cry_select',
                        info  :'战吼：使一个友方元素获得等同于你的酒馆等级的属性值。',
                        single_cry_select(index){
                            //计数鱼人的数目
                            let dragon_number = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合') && i!= index){
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
                                if((this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += this.pub_info.level * 2;
                                            this.my_minions[index].hp += this.pub_info.level * 2;
                                    
                                        }
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.realMasterFunction();

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += this.pub_info.level * 2;
                                        this.my_minions[index].hp += this.pub_info.level * 2;
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.realMasterFunction();

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }
                                }
                            }else{
                                if((this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += this.pub_info.level ;
                                            this.my_minions[index].hp += this.pub_info.level ;
                                        }
                                        //数据增加动画
                                        this.dataAnimation(index,'all');
                                        this.realMasterFunction();

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += this.pub_info.level ;
                                        this.my_minions[index].hp += this.pub_info.level ;

                                        //数据增加动画
                                        this.dataAnimation(index,'all');
                                        this.realMasterFunction();

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
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
                    img:require('../../assets/minions/元素/yanwuyuansu.png')
                },
                {
                    name : '静滞元素',
                    ad : 4,
                    hp : 4,
                    level : 3,
                    type : '元素',
                    skill:{
                        type:'all_cry',
                        info  :'战吼：随机在鲍勃的酒馆中添加一个其他元素并使其冻结。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                    let gold_times = 2;
                                    for(let i=0;i<7;i++){
                                        if(this.bob_minions[i].name == ''){
                                            if(this.pub_info.level == 2){
                                                //获取所有2星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.two.length;i++){
                                                    if((this.minions_pool.two[i].type == '元素' || this.minions_pool.two[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }
                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.two[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                gold_times -- ;
                                                if(gold_times <= 0){
                                                    return
                                                }
                                            }else if(this.pub_info.level == 3){
                                                //获取所有3星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.three.length;i++){
                                                    if((this.minions_pool.three[i].type == '元素' || this.minions_pool.three[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }
                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.three[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                gold_times -- ;
                                                if(gold_times <= 0){
                                                    return
                                                }
                                            }else if(this.pub_info.level == 4){
                                                //获取所有四星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.four.length;i++){
                                                    if((this.minions_pool.four[i].type == '元素' || this.minions_pool.four[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }
                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.four[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                gold_times -- ;
                                                if(gold_times <= 0){
                                                    return
                                                }
                                            }else if(this.pub_info.level == 5){
                                                //获取所有五星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.five.length;i++){
                                                    if((this.minions_pool.five[i].type == '元素' || this.minions_pool.five[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }
    
                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.five[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                gold_times -- ;
                                                if(gold_times <= 0){
                                                    return
                                                }
                                            }else if(this.pub_info.level == 6){
                                                //获取所有六星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.six.length;i++){
                                                    if((this.minions_pool.six[i].type == '元素' || this.minions_pool.six[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }
    
                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.six[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                gold_times -- ;
                                                if(gold_times <= 0){
                                                    return
                                                }
                                            }
                                        }
                                    }
                                
                            }else{
                                for(let i=0;i<7;i++){
                                        if(this.bob_minions[i].name == ''){
                                            if(this.pub_info.level == 2){
                                                //获取所有2星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.two.length;i++){
                                                    if((this.minions_pool.two[i].type == '元素' || this.minions_pool.two[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }
                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.two[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                return
                                            }else if(this.pub_info.level == 3){
                                                //获取所有3星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.three.length;i++){
                                                    if((this.minions_pool.three[i].type == '元素' || this.minions_pool.three[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }
                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.three[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                return
                                            }else if(this.pub_info.level == 4){
                                                //获取所有四星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.four.length;i++){
                                                    if((this.minions_pool.four[i].type == '元素' || this.minions_pool.four[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }
                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.four[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                return
                                            }else if(this.pub_info.level == 5){
                                                //获取所有五星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.five.length;i++){
                                                    if((this.minions_pool.five[i].type == '元素' || this.minions_pool.five[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }

                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.five[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                return
                                            }else if(this.pub_info.level == 6){
                                                //获取所有六星酒馆的元素
                                                let ele_level__arr = []
                                                for(let i=0;i<this.minions_pool.six.length;i++){
                                                    if((this.minions_pool.six[i].type == '元素' || this.minions_pool.six[i].type == '混合') ){
                                                        ele_level__arr.push(i)
                                                    }
                                                }

                                                let random = Math.floor(Math.random()*ele_level__arr.length);//获得该等级酒馆元素索引
                                                this.transferData(this.bob_minions[i],this.minions_pool.six[ele_level__arr[random]])
                                                this.bob_minions[i].isFreeze = true
                                                return
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
                    img:require('../../assets/minions/元素/jinzhiyuansu.png')
                },
                //机械
                {
                    name : '废旧螺栓机甲',
                    ad : 2,
                    hp : 5,
                    level : 3,
                    type : '机械',
                    skill:{
                        type:'single_cry_select',
                        info : '战吼：使一个友方机械获得+2/+2。',
                        single_cry_select(index){
                            //计数机械的数目
                            let dragon_number = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '机械' || this.my_minions[i].type == '混合') && i!= index){
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
                                if((this.my_minions[index].type == '机械' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 4;
                                            this.my_minions[index].hp += 4;
                                        }
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += 4;
                                        this.my_minions[index].hp += 4;

                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }
                                }
                            }else{
                                if((this.my_minions[index].type == '机械' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 2;
                                            this.my_minions[index].hp += 2;
                                        }
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += 2;
                                        this.my_minions[index].hp += 2;

                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
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
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/feijiuluoshuangjijia.png')
                },
                {
                    name : '量产型恐吓机',
                    ad : 3,
                    hp : 1,
                    level : 3,
                    type : '机械',
                    skill:{
                        type:'single_cry_select',
                        info  :'磁力 亡语：召唤三个1/1的微型机器人。',
                        single_cry_select(index){
                            this.my.putOriginIndex = '';
                            if(index <6){
                                if(this.my_minions[index+1].type == '机械' || this.my_minions[index+1].type == '混合'){
                                    this.my_minions[index+1].ad += this.my_minions[index].ad
                                    this.my_minions[index+1].hp += this.my_minions[index].hp
    
                                    this.my_minions[index+1].character.death = true;
                                    //数据增加动画
                                    this.dataAnimation(index+1,'all');
    
                                    this.clearMinionData(this.my_minions,index)
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
                        ad:3,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/laingchangjiqiren.png')
                },
                {
                    name : '偏折机器人',
                    ad : 3,
                    hp : 2,
                    level : 3,
                    type : '机械',
                    skill:{
                        type:'none',
                        info  :'圣盾 在战斗阶段中，每当你召唤一个机械，便获得+2攻击力和圣盾。',
                        none(){

                        }
                    },
                    character:{
                        shield:true,
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
                    img:require('../../assets/minions/机械/painzhejiqiren.png')
                },
                //鱼人
                {
                    name : '寒光先知',
                    ad : 2,
                    hp : 3,
                    level:3,
                    type : '鱼人',
                    // isPurchase:false,
                    skill:{
                        type:'all_cry',
                        info : '战吼：使你的其他鱼人获得+2生命值。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name != '' && (this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && i!= index){
                                        this.my_minions[i].hp += 4;
                                        if(this.my_minions[i].type == '混合'){
                                            this.realMasterFunction();
                                        }
                                        //数据增加动画
                                        this.dataAnimation(i,'hp');
                                    }
                                }
                            }else{
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name != '' && (this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && i!= index){
                                        this.my_minions[i].hp += 2;
                                        if(this.my_minions[i].type == '混合'){
                                            this.realMasterFunction();
                                        }
                                        //数据增加动画
                                        this.dataAnimation(i,'hp');
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
                    img:require('../../assets/minions/鱼人/hanguangxianzhi.jpg')
                },
                {
                    name : '筋肉鱼人',
                    ad : 4,
                    hp : 2,
                    level : 3,
                    type : '鱼人',
                    skill:{
                        type:'all_cry',
                        info  :'战吼：每有一个其他友方鱼人，便获得+2/+1。',
                        all_cry(index){
                            let fish_num = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && i != index){
                                    fish_num +=1;
                                }
                            }
                            if(fish_num>0){
                                if(this.my_minions[index].isGold){
                                    this.my_minions[index].ad += 4 * fish_num;
                                    this.my_minions[index].hp += 2 * fish_num;

                                    //数据增加动画
                                    this.dataAnimation(index,'all');
                                }else{
                                    this.my_minions[index].ad += 2 * fish_num;
                                    this.my_minions[index].hp += 1 * fish_num;

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
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/鱼人/jinrouyuren.png')
                },
                {
                    name : '邪鳍导航员',
                    ad : 4,
                    hp : 4,
                    level : 3,
                    type : '鱼人',
                    skill:{
                        type : 'all_cry',
                        info : '战吼:使你的其他鱼人获得+1/+1。',
                        all_cry(index){

                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合') && i != index){
                                    if(this.my_minions[index].isGold){
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
                    img:require('../../assets/minions/鱼人/xieqidaohangyuan.png')
                },
                //野猪人
                {
                    name : '宝石切分者',
                    ad : 2,
                    hp : 4,
                    level : 3,
                    type : '野猪人',
                    skill:{
                        type:'passive',
                        info  :'在一个友方随从失去圣盾后，获得一张鲜血宝石。',
                        passive(index){
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].character.shield){
                                    if(this.my_minions[index].isGold){
                                        for(let j=0;j<2;j++){
                                            if(this.my.hands.length<10){
                                                this.my.hands.push(this.bloodstone);
                                                //手牌放入，触发佩吉
                                                this.peiJiReactive()
                                            }
                                        }
                                    }else{
                                        if(this.my.hands.length<10){
                                            this.my.hands.push(this.bloodstone);
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
                        ad:2,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/baoshiqiefenzhe.png')
                },
                {
                    name : '荆棘召唤者',
                    ad : 4,
                    hp : 3,
                    level : 3,
                    type : '野猪人',
                    skill:{
                        type:'all_cry',
                        info  :'在一个友方恶魔死亡后，随机对一个敌方随从造成3点伤害。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<2;i++){
                                    if(this.my.hands.length <10){
                                        this.my.hands.push(this.bloodstone);
                                        //手牌放入，触发佩吉
                                        this.peiJiReactive()
                                    }
                                }  
                            }else{
                                if(this.my.hands.length <10){
                                    this.my.hands.push(this.bloodstone);
                                    //手牌放入，触发佩吉
                                    this.peiJiReactive()
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
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/jinjichaohuanzhe.png')
                },
                {
                    name : '扛旗野猪人',
                    ad : 1,
                    hp : 4,
                    level : 3,
                    type : '野猪人',
                    skill:{
                        type:'passive',
                        info  :'在你的回合结束时，对相邻的野猪人使用一张鲜血宝石。',
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
                            if((index-1)>=0){
                                if(this.my_minions[index].isGold){
                                    for(let j=0;j<2;j++){
                                        if(this.my_minions[index-1].type == '野猪人' || this.my_minions[index-1].type == '混合'){
                                            this.my_minions[index-1].ad += (1+god_pig);
                                            this.my_minions[index-1].hp += (1+god_pig);
                                            this.ariseCiBei(index-1);
                                            //触发劲爆函数
                                            this.ariseJinBao()
                                            //金色加圣盾
                                            if(this.my_minions[index-1].name == '坚牙野猪人' && this.my_minions[index-1].isGold){
                                                this.my_minions[index-1].character.shield = true
                                            }
                                            if(this.my_minions[index-1].name == '阿格姆棘咒'){
                                                this.my_minions[index-1].skill.special.call(this,index-1)
                                            }
                                        }
                                        //数据增加动画
                                    this.dataAnimation(index-1,'all');
                                    }
                                }else{
                                    if(this.my_minions[index-1].type == '野猪人' || this.my_minions[index-1].type == '混合'){
                                        this.my_minions[index-1].ad += (1+god_pig);
                                        this.my_minions[index-1].hp += (1+god_pig);
                                        this.ariseCiBei(index-1)
                                        //触发劲爆函数
                                        this.ariseJinBao()
                                        //金色加圣盾
                                        if(this.my_minions[index-1].name == '坚牙野猪人' && this.my_minions[index-1].isGold){
                                            this.my_minions[index-1].character.shield = true
                                        }
                                        if(this.my_minions[index-1].name == '阿格姆棘咒'){
                                            this.my_minions[index-1].skill.special.call(this,index-1)
                                        }
                                    }
                                    //数据增加动画
                                    this.dataAnimation(index-1,'all');
                                }
                            }
                            if((index+1)<=6){
                                if(this.my_minions[index].isGold){
                                    for(let j=0;j<2;j++){
                                        if(this.my_minions[index+1].type == '野猪人' || this.my_minions[index+1].type == '混合'){
                                            this.my_minions[index+1].ad += (1+god_pig);
                                            this.my_minions[index+1].hp += (1+god_pig);
                                            this.ariseCiBei(index+1)
                                            //触发劲爆函数
                                            this.ariseJinBao()
                                            //金色加圣盾
                                            if(this.my_minions[index+1].name == '坚牙野猪人' && this.my_minions[index+1].isGold){
                                                this.my_minions[index+1].character.shield = true
                                            }
                                            if(this.my_minions[index+1].name == '阿格姆棘咒'){
                                                this.my_minions[index+1].skill.special.call(this,index+1)
                                            }
                                        }
                                        //数据增加动画
                                    this.dataAnimation(index+1,'all');
                                    }
                                }else{
                                    if(this.my_minions[index+1].type == '野猪人' || this.my_minions[index+1].type == '混合'){
                                        this.my_minions[index+1].ad += (1+god_pig);
                                        this.my_minions[index+1].hp += (1+god_pig);
                                        this.ariseCiBei(index+1)
                                        //触发劲爆函数
                                        this.ariseJinBao()
                                        //金色加圣盾
                                        if(this.my_minions[index+1].name == '坚牙野猪人' && this.my_minions[index+1].isGold){
                                            this.my_minions[index+1].character.shield = true
                                        }
                                        if(this.my_minions[index+1].name == '阿格姆棘咒'){
                                            this.my_minions[index+1].skill.special.call(this,index+1)
                                        }
                                    }
                                    //数据增加动画
                                    this.dataAnimation(index+1,'all');
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
                        ad:1,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/kangqiyezhuren.png')
                },
                {
                    name : '刺背蛮兵',
                    ad : 3,
                    hp : 3,
                    level : 3,
                    type : '野猪人',
                    skill:{
                        type:'none',
                        info  :'每个回合中第一张被用于该随从的鲜血宝石使其额外获得+3/+3。',
                        clear(index){
                            this.my_minions[index].skill.type = 'none'
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
                    img:require('../../assets/minions/野猪人/cibeimanbin.png')
                },
                //海盗
                {
                    name : '南海勇夫',
                    ad : 5,
                    hp : 3,
                    level : 3,
                    type : '海盗',
                    skill:{
                        type:'single_cry_select',
                        info  :'战吼：使一个友方海盗获得+1/+1。在本回合中你每购买过一个海盗，重复一次。',
                        single_cry_select(index){
                            //计数鱼人的数目
                            let dragon_number = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '海盗' || this.my_minions[i].type == '混合') && i!= index){
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
                                if((this.my_minions[index].type == '海盗' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 2*this.pirate_buy_num;
                                            this.my_minions[index].hp += 2*this.pirate_buy_num;
                                        }
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += 2*this.pirate_buy_num;
                                        this.my_minions[index].hp += 2*this.pirate_buy_num;

                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }
                                }
                            }else{
                                if((this.my_minions[index].type == '海盗' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += this.pirate_buy_num;
                                            this.my_minions[index].hp += this.pirate_buy_num;
                                        }
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += this.pirate_buy_num;
                                        this.my_minions[index].hp += this.pirate_buy_num;

                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
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
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/nanhaiyongfu.png')
                },
                {
                    name : '海上掠夺者',
                    ad : 4,
                    hp : 5,
                    level : 3,
                    type : '海盗',
                    skill:{
                        type:'continue',
                        info  :'每当你使用一张海盗牌时，获得+1/+1。',
                        continue(index,id){
                            if(this.my_minions[id].isGold){
                                if((this.my_minions[index].type == '海盗' || this.my_minions[index].type == '混合') && index != id){
                                    this.my_minions[id].ad += 2;
                                    this.my_minions[id].hp += 2;
                                    //数据增加动画
                                    this.$refs.myMinionAd[id].classList.add('active');
                                    this.$refs.myMinionHp[id].classList.add('active');
                                    setTimeout(()=>{
                                        this.$refs.myMinionAd[id].classList.remove('active');
                                        this.$refs.myMinionHp[id].classList.remove('active');
                                    },400)
                                    
                                }
                            }else{
                                if((this.my_minions[index].type == '海盗' || this.my_minions[index].type == '混合') && index != id){
                                    this.my_minions[id].ad += 1;
                                    this.my_minions[id].hp += 1;
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
                        ad:4,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/haishanglueduozhe.png')
                },
                {
                    name : '海上走私贩',
                    ad : 4,
                    hp : 4,
                    level : 3,
                    type : '海盗',
                    skill:{
                        type:'passive',
                        info  :'在你的回合结束时，如果你拥有另一个海盗，将一枚铸币置入你的手牌。',
                        passive(index){
                            let pirate_num = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '海盗' || this.my_minions[i].type == '混合') && i != index){
                                    pirate_num ++ ;
                                }
                            }
                            if(pirate_num > 0){
                                if(this.my_minions[index].isGold){
                                    for(let i=0;i<2;i++){
                                        if(this.my.hands.length<10){
                                            this.my.hands.push(this.moneyCard)
                                            this.peiJiReactive()
                                        }
                                    }
                                }else{
                                    if(this.my.hands.length<10){
                                        this.my.hands.push(this.moneyCard)
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
                        ad:4,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/haishangzousifan.png')
                },
                //中立
                {
                    name : '鸟类的伙伴',
                    ad : 2,
                    hp : 4,
                    level : 3,
                    type : '中立',
                    skill:{
                        type:'none',
                        info  :'复仇（1）：使你的野兽获得+1/+1。',
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
                        ad:2,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/niaoleidehuoban.png')
                },
                {
                    name : '灵魂杂耍者',
                    ad : 3,
                    hp : 5,
                    level : 3,
                    type : '中立',
                    skill:{
                        type:'death',
                        info  :'在一个友方恶魔死亡后，随机对一个敌方随从造成3点伤害。',
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
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/linghunzashuazhe.png')
                },
                {
                    name : '幼苗催生员',
                    ad : 1,
                    hp : 4,
                    level : 3,
                    type : '中立',
                    skill:{
                        type:'passive',
                        info  :'复仇（3）：使相邻的随从永久获得+2/+1。',
                        passive(index){
                            if(this.my_minions[index].isGold){
                                if((index-1) >= 0){
                                    if(this.my_minions[index-1].name != ''){
                                        this.my_minions[index-1].ad += 4;
                                        this.my_minions[index-1].hp += 2;
                                        //数据增加动画
                                        this.dataAnimation(index-1,'all');
                                    }
                                }
                                if((index + 1) <= 6){
                                    if(this.my_minions[index+1].name != ''){
                                        this.my_minions[index+1].ad += 4;
                                        this.my_minions[index+1].hp += 2;
                                        //数据增加动画
                                        this.dataAnimation(index+1,'all');
                                    }
                                }
                            }else{
                                if((index-1) >= 0){
                                    if(this.my_minions[index-1].name != ''){
                                        this.my_minions[index-1].ad += 2;
                                        this.my_minions[index-1].hp += 1;
                                        //数据增加动画
                                        this.dataAnimation(index-1,'all');
                                    }
                                }
                                if((index + 1) <= 6){
                                    if(this.my_minions[index+1].name != ''){
                                        this.my_minions[index+1].ad += 2;
                                        this.my_minions[index+1].hp += 1;
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
                        ad:1,
                        hp:4
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/yamiaozhuzhangyuan.png')
                },
                {
                    name : '驯兽师',
                    ad : 4,
                    hp : 3,
                    level : 3,
                    type : '中立',
                    skill:{
                        type:'single_cry_select',
                        info  :'战吼：使一个友方野兽获得+2/+2和嘲讽。',
                        single_cry_select(index){
                            //计数鱼人的数目
                            let dragon_number = 0
                            for(let i=0;i<7;i++){
                                if((this.my_minions[i].type == '野兽' || this.my_minions[i].type == '混合') && i!= index){
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
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 4;
                                            this.my_minions[index].hp += 4;
                                        }
                                        this.my_minions[index].character.ridicule = true
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += 4;
                                        this.my_minions[index].hp += 4;

                                        this.my_minions[index].character.ridicule = true
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }
                                }
                            }else{
                                if((this.my_minions[index].type == '野兽' || this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 2;
                                            this.my_minions[index].hp += 2;
                                        }
                                        this.my_minions[index].character.ridicule = true
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
                                    }else{
                                        this.my_minions[index].ad += 2;
                                        this.my_minions[index].hp += 2;

                                        this.my_minions[index].character.ridicule = true
                                        //数据增加动画
                                        this.dataAnimation(index,'all');

                                        this.my.putOriginIndex = '',
                                        this.status.isSelectMinionsPlace = false
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
                    img:require('../../assets/minions/中立/xunshoushi.png')
                },
                {
                    name : '卡德加',
                    ad : 2,
                    hp : 2,
                    level : 3,
                    type : '中立',
                    skill:{
                        type:'none',
                        info  :'你的召唤随从的卡牌召唤数量翻倍。',
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
                        ad:2,
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/kadejia.png')
                },
                {
                    name : '帝国之手',
                    ad : 4,
                    hp : 5,
                    level : 3,
                    type : '中立',
                    skill:{
                        type:'passive',
                        info  :'每当一个友方嘲讽随从受到攻击时，使其永久获得+2攻击力。',
                        passive(index){
                            if(this.my_minions[index].isGold){
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].character.ridicule){
                                        this.my_minions[i].ad += 4;

                                        //数据增加动画
                                        this.dataAnimation(i,'ad');
                                        if(this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合'){
                                            this.realMasterFunction();
                                        }
                                    }
                                }
                            }else{
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].character.ridicule){
                                        this.my_minions[i].ad += 2;

                                        //数据增加动画
                                        this.dataAnimation(i,'ad');
                                        if(this.my_minions[i].type == '元素' || this.my_minions[i].type == '混合'){
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
                        ad:4,
                        hp:5
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/diguozhishou.png')
                },
                
            ]
        }
    }
}
export default twoMinionData