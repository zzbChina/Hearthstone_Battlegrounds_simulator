let enemyData = {
    data(){
        return{
            enemyHeros:[
                //demo
                {
                    id:1,
                    name : '融合巨怪国王',
                    health:999,
                    skill:{
                        img : require('../assets/skill/guanzhanqizhen.png'),
                    },
                    call:{
                        minions(){  
                            for(let i=0;i<7;i++){
                                //直接创建一个融合怪
                                let ob = {
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
                                    id : i,
                                    isDamaged : false,
                                    getDamaged : 0,
                                    isGold : false,
                                    img:require('../assets/minions/中立/ronghejuguai.png')
                                }
                                this.enemy_minions[i] = ob
                                this.enemy_minions[i].name = i + '号' +  this.enemy_minions[i].name
                                // this.enemy_minions[i].ad += this.pub_info.turn*6
                                // this.enemy_minions[i].hp += this.pub_info.turn*6
                                this.enemy_minions[i].ad = 1
                                this.enemy_minions[i].hp = 10
                            }
                        }
                    },
                    info : '一个可怕的对手,它拥有7个每回合都在成长的融合巨怪，能躲多远躲多远吧',
                    img : require('../assets/hero/guanzhan.png'),
                }
            ],
            enemy_minions:[],
            my_minions:[],
        }
    }
}


export default enemyData