let heroData = {
    data(){
        return {
            heros:[
                //克苏恩
                {
                    name : '克苏恩',
                    health : 40,
                    img : require('../assets/hero/kesuen.png'),
                    skill:{
                        name : '古神崇拜',
                        use:1,
                        need:2,
                        level:1,
                        type : 'select_all',
                        select_all(){
                            if(this.my.money < 2){
                                this.$bus.$emit('alertPanel',`铸币不足`);
                            }else{
                                let t_arr =[]
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name != ''){
                                        t_arr.push(i)
                                    }
                                }
                                if(t_arr.length > 0){
                                    for(let i=0;i<this.hero.skill.level;i++){
                                        let random = Math.floor(Math.random()*t_arr.length)
                                        this.my_minions[t_arr[random]].ad += 1;
                                        this.my_minions[t_arr[random]].hp += 1;
                                    }
                                    this.hero.skill.use --;
                                    this.hero.skill.level ++;
                                    this.my.money -= 2;
                                }else{
                                    this.$bus.$emit('alertPanel',`没有目标随从`);
                                }
                            }
                        },
                        info:`在回合结束时，使一个友方随从获得+1/+1（每次使用后都会升级）`,
                        img : require('../assets/skill/morijisi.png'),
                    }
                },
                //海盗帕奇斯
                {
                    name : '海盗帕奇斯',
                    health : 40,
                    img : require('../assets/hero/paqisi.png'),
                    skill:{
                        name : '海盗聚会',
                        use:1,
                        need:3,
                        type : 'select_all',
                        select_all(){
                            
                            if(this.my.money < this.hero.skill.need){
                                this.$bus.$emit('alertPanel',`铸币不足`);
                            }else{
                                this.hero.skill.use --;
                                this.my.money -= this.hero.skill.need
                                this.hero.skill.need = 3;
                                if(this.pub_info.level == 1){
                                    //1级酒馆海盗
                                    let p_arr = []
                                    for(let i=0;i<this.minions_pool.one.length;i++){
                                        if(this.minions_pool.one[i].type == '海盗' || this.minions_pool.one[i].type == '混合'){
                                            p_arr.push(i)
                                        }
                                    }
                                    let random = Math.floor(Math.random()*p_arr.length)
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
                                    this.transferData(ob,this.minions_pool.one[p_arr[random]])
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
                                }else if(this.pub_info.level == 2){
                                    //2级酒馆海盗
                                    let p_arr = []
                                    for(let i=0;i<this.minions_pool.two.length;i++){
                                        if(this.minions_pool.two[i].type == '海盗' || this.minions_pool.two[i].type == '混合'){
                                            p_arr.push(i)
                                        }
                                    }
                                    let random = Math.floor(Math.random()*p_arr.length)
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
                                    this.transferData(ob,this.minions_pool.two[p_arr[random]])
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
                                }else if(this.pub_info.level == 3){
                                    //3级酒馆海盗
                                    let p_arr = []
                                    for(let i=0;i<this.minions_pool.three.length;i++){
                                        if(this.minions_pool.three[i].type == '海盗' || this.minions_pool.three[i].type == '混合'){
                                            p_arr.push(i)
                                        }
                                    }
                                    let random = Math.floor(Math.random()*p_arr.length)
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
                                    this.transferData(ob,this.minions_pool.three[p_arr[random]])
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
                                }else if(this.pub_info.level == 4){
                                    //4级酒馆海盗
                                    let p_arr = []
                                    for(let i=0;i<this.minions_pool.four.length;i++){
                                        if(this.minions_pool.four[i].type == '海盗' || this.minions_pool.four[i].type == '混合'){
                                            p_arr.push(i)
                                        }
                                    }
                                    let random = Math.floor(Math.random()*p_arr.length)
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
                                    this.transferData(ob,this.minions_pool.four[p_arr[random]])
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
                                }else if(this.pub_info.level == 5){
                                    //5级酒馆海盗
                                    let p_arr = []
                                    for(let i=0;i<this.minions_pool.five.length;i++){
                                        if(this.minions_pool.five[i].type == '海盗' || this.minions_pool.five[i].type == '混合'){
                                            p_arr.push(i)
                                        }
                                    }
                                    let random = Math.floor(Math.random()*p_arr.length)
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
                                    this.transferData(ob,this.minions_pool.five[p_arr[random]])
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
                                }else if(this.pub_info.level == 6){
                                    //6级酒馆海盗
                                    let p_arr = []
                                    for(let i=0;i<this.minions_pool.six.length;i++){
                                        if(this.minions_pool.six[i].type == '海盗' || this.minions_pool.six[i].type == '混合'){
                                            p_arr.push(i)
                                        }
                                    }
                                    let random = Math.floor(Math.random()*p_arr.length)
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
                                    this.transferData(ob,this.minions_pool.six[p_arr[random]])
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
                            
                            
                            
                        },
                        info:'获得一个海盗。在你购买一个海盗后，你的下一个英雄技能消耗减少（1）枚铸币。',
                        img : require('../assets/skill/haidaojuhui.png'),
                    }
                },
                //堕落的乔治
                {
                    name : '堕落的乔治',
                    health : 40,
                    img : require('../assets/hero/duoluodeqiaozhi.png'),
                    skill:{
                        name : '圣光恩泽',
                        use:1,
                        need:2,
                        type : 'select_single',
                        select_single(){
                            if(this.my.money < 2){
                                this.$bus.$emit('alertPanel',`铸币不足`);
                            }else{
                                this.status.isSelectMinionsPlace = true
                                this.my.heroChose = true
                            }
                        },
                        done(index){
                            if(this.my_minions[index].name != '' && this.my_minions[index].character.shield == false){
                                this.my_minions[index].character.shield = true
                                this.hero.skill.use -= 1;
                                this.my.money -= 2;
                            }else if(this.my_minions[index].character.shield){
                                this.$bus.$emit('alertPanel',`选择一个有效目标`);
                            }
                            this.status.isSelectMinionsPlace = false
                            this.my.heroChose = false
                            
                        },
                        info:'使一个友方随从获得圣盾。',
                        img : require('../assets/skill/shenguanenze.png'),
                    }
                },
                //齐恩瓦拉
                {
                    name : '齐恩瓦拉',
                    health : 40,
                    img : require('../assets/hero/qienwala.png'),
                    skill:{
                        name : '雪崩',
                        use:1,
                        ele:0,
                        need:3,
                        type : 'passive',
                        passive(){
                            this.hero.skill.ele ++;
                            this.hero.skill.need --;
                            if(this.hero.skill.ele == 3){
                                this.pub_info.upNeed -= 3;
                                this.hero.skill.ele = 0
                                this.hero.skill.need = 3;
                                if(this.pub_info.upNeed < 0){
                                    this.pub_info.upNeed = 0
                                }
                            }
                        },
                        info:'被动 在你使用三张元素牌后，提升酒馆等级所需的铸币减少（3）枚。',
                        img : require('../assets/skill/xueben.png'),
                    }
                },
                //恐龙大师布莱恩
                {
                    name : '恐龙大师布莱恩',
                    health : 40,
                    img : require('../assets/hero/konglongdashitongxu.png'),
                    skill:{
                        name : '战斗印记',
                        use:1,
                        need:0,
                        type : 'fight',
                        fight(){
                            this.getTongxu += 1;
                            if(this.getTongxu == 5){
                                let ob ={
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
                                    img:require('../assets/minions/中立/bulaientongxu.png')
                                }
                                this.my.hands.push(ob)
                                this.getTongxu -= 10000;
                            }
                            
                        },
                        info:'被动 在你购买5个战吼随从后，将布莱恩·铜须置入你的手牌。（每场对战限一次）',
                        img : require('../assets/skill/zhandouyingji.png'),
                    }
                },
                //挂机的阿凯
                {
                    name : '挂机的阿凯',
                    health : 40,
                    img : require('../assets/hero/guajideakai.png'),
                    skill:{
                        name : '挂机成瘾',
                        use:1,
                        need:0,
                        type : 'gua',
                        gua(){
                            this.status.isSelectCombo = true;
                            this.status.isSelectDragon = 2;
                            for(let j=0;j<2;j++){
                                let arr = this.three_minions
                                for(let i=0;i<3;i++){
                                    let random = Math.floor(Math.random()*arr.length)
                                    this.selectCombo.push(arr[random])
                                    arr = arr.filter((d,id)=>{
                                        return id != random
                                    })
                                }
                            }
                        },
                        info:'被动 跳过你的前两个回合。开局时获得两个等级3的随从。',
                        img : require('../assets/skill/guajichengying.png'),
                    }
                },
                //吞噬者穆坦努斯
                {
                    name : '吞噬者穆坦努斯',
                    health : 40,
                    img : require('../assets/hero/tunshizhe.png'),
                    skill:{
                        name : '缝合完毕',
                        use:1,
                        need:0,
                        type : 'select_single',
                        select_single(){
                            let num = 0
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name != ''){
                                    num ++;
                                }
                            }
                            if(num <2){
                                this.$bus.$emit('alertPanel','你的随从不够')
                            }else{
                                this.status.isSelectMinionsPlace = true
                                this.my.heroChose = true
                            }
                            
                        },
                        done(index){
                            
                            if(this.my_minions[index].name != ''){
                                let temp_ad = this.my_minions[index].ad;
                                let temp_hp = this.my_minions[index].hp;
                                let my_arr = []
                                for(let j=0;j<7;j++){
                                    if(this.my_minions[j].name != '' && j != index){
                                        my_arr.push(j)
                                    }
                                }
                                let random = Math.floor(Math.random() * my_arr.length)
                                this.my_minions[my_arr[random]].ad += temp_ad
                                this.my_minions[my_arr[random]].hp += temp_hp
                                //数据增加动画
                                this.dataAnimation(my_arr[random],'all');

                                this.hero.skill.use --;
                                this.my.money ++;
                                this.clearMinionData(this.my_minions,index)
                            }
                            this.status.isSelectMinionsPlace = false
                            this.my.heroChose = false
                            
                        },
                        info:'移除一个友方随从，将它的属性值吐到另一个随从身上。获得一枚铸币。',
                        img : require('../assets/skill/tunshi.png'),
                    }
                },
                //伊瑟拉
                {
                    name : '伊瑟拉',
                    health : 40,
                    img : require('../assets/hero/yisela.png'),
                    skill:{
                        name : '梦境之门',
                        use:1,
                        need:0,
                        type : 'passive',
                        passive(){
                            for(let i=0;i<7;i++){
                                if(this.bob_minions[i].name == ''){
                                    if(this.pub_info.level == 1){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.one.length;j++){
                                            if(this.minions_pool.one[j].type == '龙' || this.minions_pool.one[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.one[fish_men[random]])
                                        return;

                                    }else if(this.pub_info.level == 2){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.two.length;j++){
                                            if(this.minions_pool.two[j].type == '龙' || this.minions_pool.two[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.two[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 3){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.three.length;j++){
                                            if(this.minions_pool.three[j].type == '龙' || this.minions_pool.three[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.three[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 4){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.four.length;j++){
                                            if(this.minions_pool.four[j].type == '龙' || this.minions_pool.four[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.four[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 5){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.five.length;j++){
                                            if(this.minions_pool.five[j].type == '龙' || this.minions_pool.five[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.five[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 6){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.six.length;j++){
                                            if(this.minions_pool.six[j].type == '龙' || this.minions_pool.six[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.six[fish_men[random]])
                                        return;
                                    }
                                }
                                if(i == 6){
                                    if(this.pub_info.level == 1){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.one.length;j++){
                                            if(this.minions_pool.one[j].type == '龙' || this.minions_pool.one[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.one[fish_men[random]])
                                        return;

                                    }else if(this.pub_info.level == 2){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.two.length;j++){
                                            if(this.minions_pool.two[j].type == '龙' || this.minions_pool.two[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.two[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 3){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.three.length;j++){
                                            if(this.minions_pool.three[j].type == '龙' || this.minions_pool.three[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.three[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 4){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.four.length;j++){
                                            if(this.minions_pool.four[j].type == '龙' || this.minions_pool.four[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.four[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 5){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.five.length;j++){
                                            if(this.minions_pool.five[j].type == '龙' || this.minions_pool.five[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.five[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 6){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.six.length;j++){
                                            if(this.minions_pool.six[j].type == '龙' || this.minions_pool.six[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.six[fish_men[random]])
                                        return;
                                    }
                                }
                            }
                        },
                        info:'被动 每当酒馆刷新时，鲍勃总会额外提供一条龙。',
                        img : require('../assets/skill/mengjinzhimen.png'),
                    }
                },
                //林地守护者欧穆
                {
                    name : '林地守护者欧穆',
                    health : 40,
                    img : require('../assets/hero/lindishouhuzhe.png'),
                    skill:{
                        name : '永远绽放',
                        use:1,
                        need:0,
                        type : 'bloom',
                        bloom(){
                            this.my.money += 2
                            if(this.my.money>10){
                                this.my.money = 10
                            }
                        },
                        info:'被动 在你升级鲍勃的酒馆后，在本回合中获得两枚铸币。',
                        img : require('../assets/skill/yongyuanzhanfang.png'),
                    }
                },
                //菌菇术士弗洛格尔
                {
                    name : '菌菇术士弗洛格尔',
                    health : 40,
                    img : require('../assets/hero/jungushushi.png'),
                    skill:{
                        name : '愿者上钩',
                        use:1,
                        need:0,
                        type : 'fish',
                        fish(){
                            for(let i=0;i<7;i++){
                                if(this.bob_minions[i].name == ''){
                                    if(this.pub_info.level == 1){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.one.length;j++){
                                            if(this.minions_pool.one[j].type == '鱼人' || this.minions_pool.one[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.one[fish_men[random]])
                                        return;

                                    }else if(this.pub_info.level == 2){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.two.length;j++){
                                            if(this.minions_pool.two[j].type == '鱼人' || this.minions_pool.two[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.two[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 3){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.three.length;j++){
                                            if(this.minions_pool.three[j].type == '鱼人' || this.minions_pool.three[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.three[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 4){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.four.length;j++){
                                            if(this.minions_pool.four[j].type == '鱼人' || this.minions_pool.four[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.four[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 5){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.five.length;j++){
                                            if(this.minions_pool.five[j].type == '鱼人' || this.minions_pool.five[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.five[fish_men[random]])
                                        return;
                                    }else if(this.pub_info.level == 6){
                                        let fish_men = []
                                        for(let j=0;j<this.minions_pool.six.length;j++){
                                            if(this.minions_pool.six[j].type == '鱼人' || this.minions_pool.six[j].type == '混合'){
                                                fish_men.push(j)
                                            }
                                        }
                                        let random = Math.floor(Math.random()*fish_men.length)
                                        this.transferData(this.bob_minions[i],this.minions_pool.six[fish_men[random]])
                                        return;
                                    }
                                }
                            }
                        },
                        info:'被动 在你出售一个随从后，随机在鲍勃的酒馆中添加一个鱼人。',
                        img : require('../assets/skill/yuanzheshanggou.png'),
                    }
                },
                //炎魔之王拉格纳罗斯
                {
                    name : '炎魔之王拉格纳罗斯',
                    health : 40,
                    img : require('../assets/hero/yanmozhiwan.png'),
                    skill:{
                        name : '死吧，虫子',
                        use:1,
                        need:0,
                        type : 'evolution',
                        evolution(){
                            if(this.pub_info.turn == 9){
                                this.hero.skill.img = require('../assets/skill/safulasi.png')
                            }
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name != ''){
                                    this.my_minions[i].ad += 3;
                                    this.my_minions[i].hp += 3;
                                    //数据增加动画
                                    this.dataAnimation(i,'all');
                                    for(let j=6;j>=0;j--){
                                        if(this.my_minions[j].name != '' && j != i){
                                            this.my_minions[j].ad += 3;
                                            this.my_minions[j].hp += 3;
                                            //数据增加动画
                                            this.dataAnimation(j,'all');
                                            return;
                                        }
                                    }
                                }
                            }
                            
                        },
                        info:'被动 在你消灭25个敌方随从后，获得萨弗拉斯。(改动，到游戏的第9回合时解锁)',
                        img : require('../assets/skill/sibachongzi.png'),
                    }
                },
                //亡语者布莱克松
                {
                    name : '亡语者布莱克松',
                    health : 40,
                    img : require('../assets/hero/wangyuzhekelaison.png'),
                    skill:{
                        name : '血脉连接',
                        use:1,
                        need:0,
                        type : 'get',
                        get(){
                            for(let i=0;i<2;i++){
                                if(this.my.hands.length < 10){
                                    this.my.hands.push(this.bloodstone);
                                }
                            }
                        },
                        info:'被动 在你升级鲍勃的酒馆后，获得两张鲜血宝石。',
                        img : require('../assets/skill/xuemailianjie.png'),
                    }
                },
                //阿莱克丝塔萨
                {
                    name : '阿莱克丝塔萨',
                    health : 40,
                    img : require('../assets/hero/alaikesitasa.jpg'),
                    skill:{
                        name : '红龙女王',
                        use:1,
                        need:0,
                        type : 'red_dragon',
                        red_dragon(){
                            let dragon_arr = []
                            for(let i = 0;i<this.minions_pool.six.length;i++){
                                if(this.minions_pool.six[i].type == '龙' || this.minions_pool.six[i].type == '混合'){
                                    dragon_arr.push(i)
                                }
                            }
                            this.status.isSelectCombo = true;
                            this.status.isSelectDragon = 2;
                            for(let j=0;j<2;j++){
                                for(let i=0;i<3;i++){
                                    let random_dragon = Math.floor(Math.random()*dragon_arr.length);
                                    this.selectCombo.push(this.minions_pool.six[dragon_arr[random_dragon]])
                                    dragon_arr = dragon_arr.filter((d,id)=>{
                                        return id != random_dragon
                                    })
                                }
                            }
                            
                        },
                        info:'被动 在你将鲍勃的酒馆升至5级后，发现两条龙。',
                        img : require('../assets/skill/honglongnuwang.png'),
                    }
                },
                //拉卡尼休
                {
                    name : '拉卡尼休',
                    health : 40,
                    img : require('../assets/hero/lakanixiu.png'),
                    skill:{
                        name : '点亮酒馆',
                        use:1,
                        need:2,
                        type : 'select_single',
                        select_single(){
                            let j_arr = []
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name != ''){
                                    j_arr.push(i);//将随从的索引赋值给一个数组中
                                }
                            }
                            if(j_arr.length > 0){
                                if(this.my.money < 2){
                                    this.$bus.$emit('alertPanel',`铸币不足`);
                                }else{
                                    this.status.isSelectMinionsPlace = true
                                    this.my.heroChose = true
                                }
                            }else{
                                this.$bus.$emit('alertPanel',`没有目标`);
                            }
                        },
                        done(index){
                            if(this.my_minions[index].name != ''){
                                this.my_minions[index].ad += this.pub_info.level;
                                this.my_minions[index].hp += this.pub_info.level;

                                if(this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合'){
                                    this.realMasterFunction();
                                }
                                //数据增加动画
                                this.dataAnimation(index,'all');
                                this.hero.skill.use -= 1;
                                this.my.money -= 2;
                            }
                            this.status.isSelectMinionsPlace = false
                            this.my.heroChose = false
                        },
                        info:'使一个友方随从获得等同于你的酒馆等级的属性值。',
                        img : require('../assets/skill/dianliangjiuguan.png'),
                    }
                },
                //帕奇维克
                {
                    name : '帕奇维克',
                    health : 55,
                    img : require('../assets/hero/paqiweike.jpg'),
                    skill:{
                        name : '缝合完毕',
                        use:1,
                        need:0,
                        type : 'none',
                        none(){

                        },
                        info:'初始生命值为55点，而非40点。',
                        img : require('../assets/skill/fenhewangbi.png'),
                    }
                },
                //加拉克苏斯大王
                {
                    name : '加拉克苏斯大王',
                    health : 40,
                    img : require('../assets/hero/jialakesusidawang.jpg'),
                    skill:{
                        name : '血怒',
                        use: 1,
                        need:1,
                        type:'select_all',
                        select_all(){
                            if(this.my.money<1){
                                this.$bus.$emit('alertPanel',`铸币不足`);
                            }else{
                                for(let i=0;i<7;i++){
                                    if(this.my_minions[i].name != '' && this.my_minions[i].type == '恶魔' || this.my_minions[i].type == '混合'){
                                        this.my_minions[i].ad += 1;
                                        this.my_minions[i].hp += 1;

                                        //数据增加动画
                                        this.dataAnimation(i,'all');
                                    }
                                }
                                this.my.money--;
                                this.hero.skill.use--;
                            }
                            
                        },
                        info:'使你的恶魔获得+1/+1。',
                        img : require('../assets/skill/xuenu.png'),
                    }
                },
                //疯狂金字塔
                {
                    name : '疯狂金字塔',
                    health : 40,
                    img : require('../assets/hero/fenkuangjinzita.jpg'),
                    skill:{
                        name : '添砖加瓦',
                        use:1,
                        need:1,
                        type : 'select_all',
                        select_all(){
                            let j_num = 0;
                            let j_arr = []
                            for(let i=0;i<7;i++){
                                if(this.my_minions[i].name != ''){
                                    j_num += 1;
                                    j_arr.push(i);//将随从的索引赋值给一个数组中
                                }
                            }
                            if(j_num > 0){
                                if(this.my.money == 0){
                                    this.$bus.$emit('alertPanel',`铸币不足`);
                                }else{
                                    if(j_num == 1){
                                        this.my_minions[j_arr[0]].hp += 4;
                                        if(this.my_minions[j_arr[0]].type == '元素' || this.my_minions[j_arr[0]].type == '混合'){
                                            this.realMasterFunction();
                                        }
                                        //数据增加动画
                                        this.dataAnimation(j_arr[0],'hp');
                                        this.hero.skill.use -= 1;
                                        this.my.money --;
                                    }else{
                                        let random = Math.floor(Math.random()*j_arr.length);
                                        this.my_minions[j_arr[random]].hp += 4;
                                        if(this.my_minions[j_arr[random]].type == '元素' || this.my_minions[j_arr[random]].type == '混合'){
                                            this.realMasterFunction();
                                        }
                                        //数据增加动画
                                        this.dataAnimation(j_arr[random],'hp');
                                        this.hero.skill.use -= 1;
                                        this.my.money --;
                                    }
                                }
                            }else{
                                this.$bus.$emit('alertPanel',`没有对象`);
                            }
                        },
                        info:'随机使一个友方随从获得+4生命值。',
                        img : require('../assets/skill/tainzhuanjiawa.png'),
                    }
                },
                //雷诺
                {
                    name : '雷诺',
                    health : 40,
                    img : require('../assets/hero/leinuo.jpg'),
                    skill:{
                        name : '要发财了',
                        use:1,
                        need:0,
                        type : 'select_single',
                        select_single(){
                            this.status.isSelectMinionsPlace = true
                            this.my.heroChose = true
                        },
                        done(index){
                            if(this.my_minions[index].name != '' && this.my_minions[index].isGold == false){
                                this.my_minions[index].ad += this.my_minions[index].init.ad;
                                this.my_minions[index].hp += this.my_minions[index].init.hp;
                                this.my_minions[index].init.ad = this.my_minions[index].init.ad*2;
                                this.my_minions[index].init.hp = this.my_minions[index].init.hp*2;
                                this.my_minions[index].isGold = true
                                this.hero.skill.use -= 1;
                                
                            }
                            this.status.isSelectMinionsPlace = false
                            this.my.heroChose = false
                        },
                        info:'使一个友方随从变成金色。（每场对战限一次。）',
                        img : require('../assets/skill/yaofacaile.png'),
                    }
                },
            ]
        }
    }
}

export default heroData