let oneMinionData = {
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
            one_minions:[
                //龙
                {
                    name : '红色雏龙',
                    ad : 1,
                    hp : 2,
                    level:1,
                    type : '龙',
                    skill:{
                        type:'fight_before',
                        info  :'战斗开始时：随机对一个敌方随从造成等同于友方龙的数量的 伤害。',
                        fight(isGold,isMe){
                            let dragon_num = 0
                            if(isMe){
                                for(let i=0;i<this.my_minions.length;i++){
                                    if(this.my_minions[i].type == '龙' || this.my_minions[i].type == '混合'){
                                        dragon_num ++;
                                    }
                                }
                                if(isGold){
                                    for(let i=0;i<2;i++){
                                        let random = Math.floor(Math.random()*this.enemy_minions.length)
                                        this.enemy_minions[random].hp -= dragon_num
                                        //删除死亡随从
                                        this.delDeadMinions('toEnemy');
                                    }
                                }else{
                                    let random = Math.floor(Math.random()*this.enemy_minions.length)
                                    this.enemy_minions[random].hp -= dragon_num
                                    //删除死亡随从
                                    this.delDeadMinions('toEnemy');
                                }
                                
                            }else{
                                for(let i=0;i<this.enemy_minions.length;i++){
                                    if(this.enemy_minions[i].type == '龙' || this.enemy_minions[i].type == '混合'){
                                        dragon_num ++;
                                    }
                                }
                                if(isGold){
                                    for(let i=0;i<2;i++){
                                        let random = Math.floor(Math.random()*this.my_minions.length)
                                        this.my_minions[random].hp -= dragon_num
                                        //删除死亡随从
                                        this.delDeadMinions('toMe');
                                    }
                                }else{
                                    let random = Math.floor(Math.random()*this.my_minions.length)
                                    this.my_minions[random].hp -= dragon_num
                                    //删除死亡随从
                                    this.delDeadMinions('toMe');
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
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/honsechulon.jpg')
                },
                {
                    name : '异变多彩龙',
                    ad : 1,
                    hp : 3,
                    level:1,
                    type : '龙',
                    skill:{
                        type:'special',
                        info  :'在你提升酒馆等级后，该随从的攻击力翻倍。',
                        special(index){
                            if(this.my_minions[index].isGold){
                                this.my_minions[index].ad = this.my_minions[index].ad*3;
                                this.ariseChuLong(index)
                                //数据增加动画
                                this.dataAnimation(index,'ad');
                            }else{
                                this.my_minions[index].ad = this.my_minions[index].ad*2;
                                this.ariseChuLong(index)
                                //数据增加动画
                                this.dataAnimation(index,'ad');
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
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/龙/yibianduocailong.png')
                },
                //野兽
                {
                    name : '雄斑虎',
                    ad : 1,
                    hp : 1,
                    level:1,
                    type : '野兽',
                    skill:{
                        type:'all_cry',
                        info : '战吼：召唤一个1/1的雌斑虎。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                //合成一个雌斑虎
                                let beast = {
                                    ad:2,
                                    hp:2,
                                    type : '野兽',
                                    level : 1,
                                    isGold : true,
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
                                        hp:1
                                    },
                                    skill : {
                                        type : 'none',
                                        info : '',
                                    },
                                    name : '雌斑虎',
                                    img:require('../../assets/minions/野兽/cibanhu.png')
                                }
                                
                                //检查卡德加
                                if(this.checkKaDeJia()){
                                    let num = this.checkKaDeJia() + 1;
                                    for(let i=0;i<7;i++){
                                        if(this.my_minions[i].name == ''){
                                            if(num > 0){
                                                this.transferData(this.my_minions[i],beast);
                                                //触发熊妈妈的效果
                                                for(let j=0;j<7;j++){
                                                    if(this.my_minions[j].name == '熊妈妈'){
                                                        if(this.my_minions[j].isGold){
                                                            this.my_minions[i].ad += 10;
                                                            this.my_minions[i].hp += 10;
                                                            //数据增加动画
                                                            this.dataAnimation(i,'all');
                                                        }else{
                                                            this.my_minions[i].ad += 5;
                                                            this.my_minions[i].hp += 5;
                                                            //数据增加动画
                                                            this.dataAnimation(i,'all');
                                                        }
                                                    }
                                                }
                                                num --;
                                            }else if(num == 0){
                                                return
                                            }
                                        }
                                    }
                                }else{
                                    for(let i=0;i<7;i++){
                                        if(this.my_minions[i].name == ''){
                                            this.transferData(this.my_minions[i],beast);
                                            //触发熊妈妈的效果
                                            for(let j=0;j<7;j++){
                                                if(this.my_minions[j].name == '熊妈妈'){
                                                    if(this.my_minions[j].isGold){
                                                        this.my_minions[i].ad += 10;
                                                        this.my_minions[i].hp += 10;
                                                        //数据增加动画
                                                        this.dataAnimation(i,'all');
                                                    }else{
                                                        this.my_minions[i].ad += 5;
                                                        this.my_minions[i].hp += 5;
                                                        //数据增加动画
                                                        this.dataAnimation(i,'all');
                                                    }
                                                }
                                            }
                                            return
                                        }
                                    }
                                }
                            }else{
                                //合成一个雌斑虎
                                let fish = {
                                    ad:1,
                                    hp:1,
                                    type : '野兽',
                                    level : 1,
                                    isGold : false,
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
                                        hp:1
                                    },
                                    skill : {
                                        type : 'none',
                                        info : '',
                                    },
                                    name : '雌斑虎',
                                    img:require('../../assets/minions/野兽/cibanhu.png')
                                }
                                

                                if(this.checkKaDeJia()){
                                    let num = this.checkKaDeJia();
                                    for(let i=0;i<num;i++){
                                        if(this.isCombo.call(this,fish)){
                                            //若函数返回true，表示达成三连条件，调用三联函数
                                            this.getCombo.call(this,fish)
        
                                            this.bob.msg = '精彩的操作';
                                            this.bob.say = true;
                                            setTimeout(()=>{
                                                    this.bob.say = false;
                                            },1500)
                                        }else{
                                            for(let j=0;j<7;j++){
                                                if(this.my_minions[j].name == ''){
                                                    this.transferData(this.my_minions[j],fish);
                                                    //触发熊妈妈的效果
                                                    for(let x=0;x<7;x++){
                                                        if(this.my_minions[x].name == '熊妈妈'){
                                                            if(this.my_minions[x].isGold){
                                                                this.my_minions[j].ad += 10;
                                                                this.my_minions[j].hp += 10;
                                                                //数据增加动画
                                                                this.dataAnimation(j,'all');
                                                            }else{
                                                                this.my_minions[j].ad += 5;
                                                                this.my_minions[j].hp += 5;
                                                                //数据增加动画
                                                                this.dataAnimation(j,'all');
                                                            }
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    if(this.isCombo.call(this,fish)){
                                        //若函数返回true，表示达成三连条件，调用三联函数
                                        this.getCombo.call(this,fish)
    
                                        this.bob.msg = '精彩的操作';
                                        this.bob.say = true;
                                        setTimeout(()=>{
                                                this.bob.say = false;
                                        },1500)
                                    }else{
                                        for(let j=0;j<7;j++){
                                            if(this.my_minions[j].name == ''){
                                                this.transferData(this.my_minions[j],fish);
                                                //触发熊妈妈的效果
                                                for(let x=0;x<7;x++){
                                                    if(this.my_minions[x].name == '熊妈妈'){
                                                        if(this.my_minions[x].isGold){
                                                            this.my_minions[j].ad += 10;
                                                            this.my_minions[j].hp += 10;
                                                            //数据增加动画
                                                            this.dataAnimation(j,'all');
                                                        }else{
                                                            this.my_minions[j].ad += 5;
                                                            this.my_minions[j].hp += 5;
                                                            //数据增加动画
                                                            this.dataAnimation(j,'all');
                                                        }
                                                    }
                                                }
                                                return;
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
                        ad:1,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/xiongbanhu.png')
                },
                {
                    name : '食腐土狼',
                    ad : 2,
                    hp : 2,
                    level:1,
                    type : '野兽',
                    
                    skill:{
                        type:'none',
                        info : '每当一个友方野兽死亡，便获得+2/+1。',
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
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/野兽/shifutulang.png')
                },
                //鱼人
                {
                    name : '鱼人猎潮者',
                    ad : 2,
                    hp : 1,
                    level:1,
                    type : '鱼人',
                    skill:{
                        type:'all_cry',
                        info : '战吼：召唤一个1/1的鱼人斥候。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                //合成一个鱼人斥候
                                let fish = {
                                    ad:2,
                                    hp:2,
                                    type : '鱼人',
                                    level : 1,
                                    isGold : true,
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
                                        hp:1
                                    },
                                    skill : {
                                        type : 'none',
                                        info  :'',
                                    },
                                    name : '鱼人斥候',
                                    img:require('../../assets/minions/鱼人/yurenchihou.jpg')
                                }
                                //检查卡德加
                                if(this.checkKaDeJia()){
                                    let num = this.checkKaDeJia() + 1;
                                    for(let i=0;i<7;i++){
                                        if(this.my_minions[i].name == ''){
                                            if(num > 0){
                                                this.transferData(this.my_minions[i],fish);
                                                num --;
                                            }else if(num == 0){
                                                return
                                            }
                                        }
                                    }
                                }else{
                                    for(let i=0;i<7;i++){
                                        if(this.my_minions[i].name == ''){
                                            this.transferData(this.my_minions[i],fish);
                                            return
                                        }
                                    }
                                }
                            }else{
                                //合成一个鱼人斥候
                                let fish = {
                                    ad:1,
                                    hp:1,
                                    type : '鱼人',
                                    level : 1,
                                    isGold : false,
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
                                        hp:1
                                    },
                                    skill : {
                                        type : 'none',
                                        info  :'',
                                    },
                                    name : '鱼人斥候',
                                    img:require('../../assets/minions/鱼人/yurenchihou.jpg')
                                }
                                if(this.checkKaDeJia()){
                                    let num = this.checkKaDeJia();
                                    for(let i=0;i<num;i++){
                                        if(this.isCombo.call(this,fish)){
                                            //若函数返回true，表示达成三连条件，调用三联函数
                                            this.getCombo.call(this,fish)
        
                                            this.bob.msg = '精彩的操作';
                                            this.bob.say = true;
                                            setTimeout(()=>{
                                                    this.bob.say = false;
                                            },1500)
                                        }else{
                                            for(let j=0;j<7;j++){
                                                if(this.my_minions[j].name == ''){
                                                    this.transferData(this.my_minions[j],fish);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    if(this.isCombo.call(this,fish)){
                                        //若函数返回true，表示达成三连条件，调用三联函数
                                        this.getCombo.call(this,fish)
    
                                        this.bob.msg = '精彩的操作';
                                        this.bob.say = true;
                                        setTimeout(()=>{
                                                this.bob.say = false;
                                        },1500)
                                    }else{
                                        for(let j=0;j<7;j++){
                                            if(this.my_minions[j].name == ''){
                                                this.transferData(this.my_minions[j],fish);
                                                return;
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
                        ad:2,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/鱼人/yurenleichaozhe.jpg')
                },
                {
                    name : '石塘猎人',
                    ad : 2,
                    hp : 3,
                    level:1,
                    type : '鱼人',
                    
                    skill:{
                        type:'single_cry_select',
                        info : '战吼：使一个友方鱼人获得+1/+1。',
                        single_cry_select(index){
                            //计数鱼人的数目
                            let fish_num = 0
                            for(let i=0;i<7;i++){
                                if(i!= index && this.my_minions[i].type == '鱼人' || this.my_minions[i].type == '混合' ){
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
                                if((this.my_minions[index].type == '鱼人'|| this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
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
                            }else{
                                if((this.my_minions[index].type == '鱼人'|| this.my_minions[index].type == '混合') && index != this.my.putOriginIndex){
                                    if(this.tongxuFunction()){
                                        for(let j=0;j<this.tongxuFunction();j++){
                                            this.my_minions[index].ad += 1;
                                            this.my_minions[index].hp += 1;
                                        }
                                    }else{
                                        this.my_minions[index].ad += 1;
                                        this.my_minions[index].hp += 1;
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
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/鱼人/shitanglieren.png')
                },
                //恶魔
                {
                    name : '粗鄙小鬼',
                    ad : 1,
                    hp : 1,
                    level:1,
                    type : '恶魔',
                    // isPurchase:false,
                    skill:{
                        type:'death_call',
                        info  :'亡语：召唤两个1/1的小鬼。',
                        death(isGold,index){
                            for(let i=0;i<2;i++){
                                if(this.my_minions.length < 7){
                                    if(isGold){
                                        //生成一个金色小鬼
                                        let ob = {
                                            name : '小鬼',
                                            ad : 1,
                                            hp : 1,
                                            level:1,
                                            type : '恶魔',
                                            skill:{
                                                type:'none',
                                                info  :'小鬼。',
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
                                            isDamaged:false,
                                            getDamaged : 0,
                                            isAttacked:false,
                                            isGold : true,
                                            img:require('../../assets/minions/恶魔/xiaogui.png')
                                        }
                                        this.my_minions.splice(index,0,ob)//从index索引处，添加元素
                                    }else{
                                        //生成一个小鬼
                                        let ob = {
                                            name : '小鬼',
                                            ad : 1,
                                            hp : 1,
                                            level:1,
                                            type : '恶魔',
                                            skill:{
                                                type:'none',
                                                info  :'小鬼。',
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
                                                ad:1,
                                                hp:1
                                            },
                                            isDamaged:false,
                                            getDamaged : 0,
                                            isAttacked:false,
                                            isGold : false,
                                            img:require('../../assets/minions/恶魔/xiaogui.png')
                                        }
                                        this.my_minions.splice(index,0,ob)//从index索引处，添加元素
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
                        ad:1,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/chubixiaogui.png')
                },
                {
                    name : '躁动欺诈者',
                    ad : 2,
                    hp : 2,
                    level:1,
                    type : '恶魔',
                    skill:{
                        type:'death_select_single',
                        info : '亡语：使另一个友方随从获得本随从的生命值上限。',
                        death(temp,isMe){
                            if(isMe){
                                if(this.my_minions.length > 0){
                                    let random = Math.floor(Math.random()*this.my_minions.length)
                                    if(temp.isGold){
                                        this.my_minions[random].hp += temp.hp*2
                                        //数据增加动画
                                        this.dataAnimation(random,'hp');
                                    }else{
                                        this.my_minions[random].hp += temp.hp
                                        //数据增加动画
                                        this.dataAnimation(random,'hp');
                                    }
                                }
                            }else{
                                if(this.enemy_minions.length > 0){
                                    let random = Math.floor(Math.random()*this.enemy_minions.length)
                                    if(temp.isGold){
                                        this.enemy_minions[random].hp += temp.hp*2
                                        //数据增加动画
                                    }else{
                                        this.enemy_minions[random].hp += temp.hp
                                        //数据增加动画
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
                        ad:2,
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/恶魔/zaodongqizhazhe.png')
                },
                //元素
                {
                    name : '商贩元素',
                    ad : 2,
                    hp : 2,
                    level:1,
                    type : '元素',
                    
                    skill:{
                        type:'special',
                        info : '当你出售该随从时，将一张2/2的元素牌置入你的手牌。',
                        spacial(){

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
                    img:require('../../assets/minions/元素/shanfanyuansu.jpg')
                },
                {
                    name : '畸变元素',
                    ad : 1,
                    hp : 3,
                    level:1,
                    type : '元素',
                    
                    skill:{
                        type:'all_cry',
                        info  :'战吼：你下一次刷新酒馆的消耗为（0）枚铸币。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                this.pub_info.nextFreeRefresh +=2;
                            }else{
                                this.pub_info.nextFreeRefresh +=1;
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
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/元素/jibianyuansu.png')
                },
                //机械
                {
                    name : '微型木乃伊',
                    ad : 1,
                    hp : 2,
                    level:1,
                    type : '机械',
                    
                    skill :{
                        type : 'passive',
                        info : '复生 在你的回合结束时，随机使另一个友方随从获得+1攻击力。',
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
                                            this.my_minions[random].ad+=2;
                                            //数据增加动画
                                            this.dataAnimation(random,'ad');
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
                                            this.my_minions[random].ad+=1;
                                            //数据增加动画
                                            this.dataAnimation(random,'ad');
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
                        relive:true,
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:1,
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/weixingmunaiyi.jpg')
                },
                {
                    name : '狗狗机器人',
                    ad : 2,
                    hp : 1,
                    level:1,
                    type : '机械',
                    skill:{
                        type:'shield',
                        info  :'圣盾',
                        shield(){
                            
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
                        ad:2,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/机械/gougoujiqiren.png')
                },
                //海盗
                {
                    name : '甲板杂兵',
                    ad : 2,
                    hp : 2,
                    level:1,
                    type : '海盗',
                    // isPurchase:false,
                    skill:{
                        type:'all_cry',
                        info  :'战吼：提升酒馆等级所需的铸币减少（1）枚。',
                        all_cry(index){
                            if(this.my_minions[index].isGold){
                                this.pub_info.upNeed -= 2;
                                if(this.pub_info.upNeed < 0){
                                    this.pub_info.upNeed = 0;
                                }
                            }else{
                                this.pub_info.upNeed -= 1;
                                if(this.pub_info.upNeed < 0){
                                    this.pub_info.upNeed = 0;
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
                    img:require('../../assets/minions/海盗/jiabanzabin.png')
                },
                {
                    name : '海盗无赖',
                    ad : 3,
                    hp : 1,
                    level:1,
                    type : '海盗',
                    
                    skill:{
                        type:'death',
                        info : '亡语：召唤一个1/1的海盗并使其立即发起攻击。',
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
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/海盗/haidaowulai.png')
                },
                //野猪人
                {
                    name : '剃刀沼泽地卜师',
                    ad : 3,
                    hp : 1,
                    level:1,
                    type : '野猪人',
                    
                    skill:{
                        type:'all_cry',
                        info  :'战吼：获得一张鲜血宝石。',
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
                        death : false,
                        toxic:false,
                        ridicule:false
                    },
                    init:{
                        ad:3,
                        hp:1
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/tidaozaozedibushi.png')
                },
                {
                    name : '晒镖的游客',
                    ad : 1,
                    hp : 2,
                    level:1,
                    type : '野猪人',
                    skill:{
                        type:'special',
                        info  :'当你出售该随从时，获得两张鲜血宝石。',
                        special(index){

                            if(this.my_minions[index].isGold){
                                for(let i=0;i<4;i++){
                                    if(this.my.hands.length <10){
                                        this.my.hands.push(this.bloodstone);
                                        //手牌放入，触发佩吉
                                        this.peiJiReactive()
                                    }
                                } 
                            }else{
                                for(let i=0;i<2;i++){
                                    if(this.my.hands.length <10){
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
                        ad:1,
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/野猪人/saibiaodeyouke.png')
                },
                //中立
                {
                    name : '愤怒编织者',
                    ad : 1,
                    hp : 3,
                    level:1,
                    type : '中立',                 
                    skill:{
                        type:'continue',
                        info  :'在你使用一张恶魔牌后，对你的英雄造成1点伤害并获得+2/+2。',
                        //id为编织者的索引
                        continue(index,id){
                            if(this.my_minions[id].isGold){
                                if(this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合'){
                                    this.my_minions[id].ad += 4;
                                    this.my_minions[id].hp += 4;
                                    //数据增加动画
                                    this.$refs.myMinionAd[id].classList.add('active');
                                    this.$refs.myMinionHp[id].classList.add('active');
                                    setTimeout(()=>{
                                        this.$refs.myMinionAd[id].classList.remove('active');
                                        this.$refs.myMinionHp[id].classList.remove('active');
                                    },400)
                                    for(let i=0;i<7;i++){
                                        if(this.my_minions[i].name == '卡萨纳提尔'){
                                            return;
                                        }
                                    }
                                    this.hero.health--;
                                }
                            }else{
                                if(this.my_minions[index].type == '恶魔' || this.my_minions[index].type == '混合'){
                                    this.my_minions[id].ad += 2;
                                    this.my_minions[id].hp += 2;
                                    //数据增加动画
                                    this.$refs.myMinionAd[id].classList.add('active');
                                    this.$refs.myMinionHp[id].classList.add('active');
                                    setTimeout(()=>{
                                        this.$refs.myMinionAd[id].classList.remove('active');
                                        this.$refs.myMinionHp[id].classList.remove('active');
                                    },400)
                                    for(let i=0;i<7;i++){
                                        if(this.my_minions[i].name == '卡萨纳提尔'){
                                            return;
                                        }
                                    }
                                    this.hero.health--;
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
                        hp:3
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/fennubianzhizhe.jpg')
                },
                {
                    name : '克苏恩的侍僧',
                    ad : 2,
                    hp : 2,
                    level:1,
                    type : '中立',
                    
                    skill:{
                        type:'relive',
                        info : '嘲讽，复生',
                        relive(){
                            
                        }
                    },
                    character:{
                        shield:false,
                        windFury:false,
                        relive:true,
                        death : false,
                        toxic:false,
                        ridicule:true
                    },
                    init:{
                        ad:2,
                        hp:2
                    },
                    isGold : false,
                    img:require('../../assets/minions/中立/kesuendeshiseng.png')
                },
                
            ]
        }
    }
}
export default oneMinionData