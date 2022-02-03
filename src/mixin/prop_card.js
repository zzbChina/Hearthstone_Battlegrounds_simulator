let prop_cards = {
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
            //鲜血宝石
            bloodstone :{
                ad:'',
                hp:'',
                type : '道具',
                level : '',
                isGold : false, 
                skill : {
                    type : 'none',
                    info : '使一个随从+1/+1',
                    use(index,hand_index){
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
                        this.my_minions[index].ad += (1 + god_pig);
                        this.my_minions[index].hp += (1 + god_pig);
                        //金色加圣盾
                        if(this.my_minions[index].name == '坚牙野猪人' && this.my_minions[index].isGold){
                            this.my_minions[index].character.shield = true
                        }
                        //刺背蛮兵
                        this.ariseCiBei(index);
                        if(this.my_minions[index].type == '元素' || this.my_minions[index].type == '混合'){
                            //触发现境大师
                            this.realMasterFunction()
                        }
                        if(this.my_minions[index].type == '野猪人' || this.my_minions[index].type == '混合'){
                            //触发劲爆函数
                            this.ariseJinBao()
                        }
                        //数据增加动画
                        this.dataAnimation(index,'all');
                        if(this.my_minions[index].name == '阿格姆棘咒'){
                            this.my_minions[index].skill.special.call(this,index)
                        }
                        //使用之后消除手牌中的该鲜血宝石
                        this.my.hands = this.my.hands.filter((h,id)=>{
                            return id != hand_index
                        })
                        
                    }
                },
                name : '鲜血宝石',
                img:require('../assets/minions/野猪人/bloodstone.png')
            },
            //铸币卡
            moneyCard:{
                ad:'',
                hp:'',
                type : '道具',
                level : '',
                isGold : false, 
                skill : {
                    type : 'now',
                    info : '获得一个铸币',
                    use_now(index){
                            this.my.money ++;
                            this.my.hands = this.my.hands.filter((m,id)=>{
                                return id != index
                            })
                    }
                },
                name : '一枚铸币',
                img:require('../assets/minions/海盗/xinyunbi.png')
            },
            //好奇的掠夺者标志
            theSignByLooter:[],//表示海需要两回合
            //海盗购买次数标志
            pirate_buy_num : 0,
            //元素放置次数标志
            ele_put_num : 0
            
        }
    }
}
export default prop_cards