let combat_func = {
    methods:{
        //决定先后手函数,如果是真，表示我先出手，如果是假表示对手先出手
        decideWhoFirst(){
            if(this.my_minions.length > this.enemy_minions.length){
                return true
            }else if(this.enemy_minions.length > this.my_minions.length){
                return false
            }else if(this.enemy_minions.length == this.my_minions.length){
                let random =  Math.floor(Math.random()*2)
                if(random){
                    return true
                }else{
                    return false
                }
            }
        },
        //目标选择函数,type参数为对手方,返回目标的索引值
        selectAimIndex(type){
            if(type == 'toEnemy'){
                let ridicule_arr = [] //存储嘲讽随从的索引
                for(let i=0;i<this.enemy_minions.length;i++){
                    if(this.enemy_minions[i].character.ridicule){
                        ridicule_arr.push(i)
                    }
                }
                //大于0说明存在嘲讽随从
                if(ridicule_arr.length>0){
                    let random = Math.floor(Math.random()*ridicule_arr.length)
                    return ridicule_arr[random]
                }else{
                    let random = Math.floor(Math.random()*this.enemy_minions.length)
                    return random
                }
                
            }else{
                let ridicule_arr = [] //存储嘲讽随从的索引
                for(let i=0;i<this.my_minions.length;i++){
                    if(this.my_minions[i].character.ridicule){
                        ridicule_arr.push(i)
                    }
                }
                if(ridicule_arr.length>0){
                    let random = Math.floor(Math.random()*ridicule_arr.length)
                    return ridicule_arr[random]
                }else{
                    let random = Math.floor(Math.random()*this.my_minions.length)
                    return random
                }
            }
        },
        //选择攻击者的索引
        selectIndexOfAttacker(isMe){
            if(isMe){
                for(let i=0;i<this.my_minions.length;i++){
                    if(!this.my_minions[i].isAttacked){
                        return i
                    }
                    if(i == this.my_minions.length-1){
                        for(let j=0;j<this.my_minions.length;j++){
                            this.my_minions[j].isAttacked = false
                        }
                        return 0
                    }
                }
            }else{
                for(let i=0;i<this.enemy_minions.length;i++){
                    if(!this.enemy_minions[i].isAttacked){
                        return i
                    }
                    if(i == this.enemy_minions.length-1){
                        for(let j=0;j<this.enemy_minions.length;j++){
                            this.enemy_minions[j].isAttacked = false
                        }
                        return 0
                    }
                }
            }
        },
        //我方攻击函数
        myAttack(all_turns){
                //我方出手
                if(this.my_minions.length > 0){
                    if(this.enemy_minions.length > 0){
                        let way = {
                            type : 'none'
                        }
                        //获得攻击者的索引
                        let m_index = this.selectIndexOfAttacker(true)
                        //获得目标索引
                        let m_random = this.selectAimIndex('toEnemy')
                        
                        //动画
                        this.animationOfAttack(m_index,m_random,true)
                        // this.animationOfDamage(m_index,m_random,true)         
                        setTimeout(()=>{
                            // this.animationOfDamage(m_index,m_random,true)                 
                            //伤害计算
                            this.damageCalculation(this.my_minions[m_index],this.enemy_minions[m_random],way)
                            //将该随从的攻击标志修改
                            this.my_minions[m_index].isAttacked = true
                            //删除死亡随从
                            this.delDeadMinions('toEnemy');
                            this.delDeadMinions('toMe');
                            // setTimeout(()=>{
                            //     console.log('it work')
                            //     this.clearAllMinionsDamage()
                            // },300)
                           
                        },650)
                    }else{
                        console.log('我方胜利')
                        clearInterval(all_turns)
                        return
                    }
                }else{
                    if(this.enemy_minions.length > 0){
                        console.log('对手胜利')
                        clearInterval(all_turns)
                        return
                    }
                    else{
                        console.log('平局')
                        clearInterval(all_turns)
                        return
                    }
                }
            
            
            
        },
        //敌方攻击函数
        enemyAttack(all_turns){
            if(this.enemy_minions.length > 0){
                if(this.my_minions.length > 0){
                    let way = {
                        type : 'none'
                    }
                    //获得攻击者的索引
                    let e_index = this.selectIndexOfAttacker(false)
                    //获得目标索引
                    let e_random = this.selectAimIndex('toMe')
                    //动画
                    this.animationOfAttack(e_index,e_random,false)
                    // this.animationOfDamage(e_index,e_random,false)
                    setTimeout(()=>{
                        
                        //伤害计算
                        this.damageCalculation(this.enemy_minions[e_index],this.my_minions[e_random],way)
                        //将该随从的攻击标志修改
                        this.enemy_minions[e_index].isAttacked = true
                        //删除死亡随从
                        this.delDeadMinions('toMe');
                        this.delDeadMinions('toEnemy');
                        // setTimeout(()=>{
                        //     this.clearAllMinionsDamage()
                        // },300)
                    },650)
                    
                }else{
                    console.log('对手胜利')
                    clearInterval(all_turns)
                    return
                }
            }else{
                if(this.my_minions.length > 0){
                    console.log('我方胜利')
                    clearInterval(all_turns)
                    return
                }else{
                    console.log('平局')
                    clearInterval(all_turns)
                    return
                }
            }    
        },
        //触发战斗前效果
        ariseFightBefore(isMe){
            if(isMe){
                for(let i=0;i<this.my_minions.length;i++){
                    if(this.my_minions[i].skill.type == 'fight_before'){
                        this.my_minions[i].skill.fight.call(this,this.my_minions[i].isGold,true)
                    }
                }
                for(let i=0;i<this.enemy_minions.length;i++){
                    if(this.enemy_minions[i].skill.type == 'fight_before'){
                        this.enemy_minions[i].skill.fight.call(this,this.enemy_minions[i].isGold,false)
                    }
                }
            }else{
                for(let i=0;i<this.enemy_minions.length;i++){
                    if(this.enemy_minions[i].skill.type == 'fight_before'){
                        this.enemy_minions[i].skill.fight.call(this,this.enemy_minions[i].isGold,false)
                    }
                }
                for(let i=0;i<this.my_minions.length;i++){
                    if(this.my_minions[i].skill.type == 'fight_before'){
                        this.my_minions[i].skill.fight.call(this,this.my_minions[i].isGold,true)
                    }
                }
            }
        },
        //第一阶段，选择目标进行攻击,确定两个目标，攻击者和被攻击者,
        //我方攻击者为this.my_minions[my_queue[0]],对手方的攻击者为enemy_minions[en_queue[0]]
        selectAimToAttack(){
            if(this.decideWhoFirst()){
                //触发战斗前效果
                this.ariseFightBefore(true)

                let all_turns = setInterval(() => {
                   this.clearAllMinionsDamage()
                   this.myAttack(all_turns)
                   
                   setTimeout(()=>{
                    // this.clearAllMinionsDamage()
                        this.enemyAttack(all_turns)
                        
                   },1500)
                   
                }, 2800);
            }else{    
                //触发战斗前效果
                this.ariseFightBefore(false)

                let all_turns = setInterval(() => {
                    this.clearAllMinionsDamage()
                    this.enemyAttack(all_turns);
                    
                    setTimeout(()=>{
                        // this.clearAllMinionsDamage()
                        this.myAttack(all_turns)
                        
                    },1500)
                }, 2800);
                
            }
        },
        //清除所有随从的伤害效果
        clearAllMinionsDamage(){
            for(let i=0;i<this.my_minions.length;i++){
                if(this.my_minions[i].isDamaged){
                    this.my_minions[i].isDamaged = false
                }
            }
            for(let i=0;i<this.enemy_minions.length;i++){
                if(this.enemy_minions[i].isDamaged){
                    this.enemy_minions[i].isDamaged = false
                }
            }
        },
        //攻击动画,一个动作消耗950ms
        animationOfAttack(attacker,defender,isMe){
            if(isMe){
                let li = document.querySelectorAll(`.fight_panel .my_minions ul li`)
                li[attacker].style.transform = 'scale(1.2)'
                li[attacker].style.boxShadow = '20px'
                setTimeout(()=>{
                    li[attacker].style.left = 1 + defender * 8.4 + 'vw'
                    li[attacker].style.top = '-9.5vw'
                    li[attacker].style.zIndex = 3
                    setTimeout(()=>{
                        li[attacker].style.transform = 'scale(1)'
                        li[attacker].style.left = 1 + attacker * 8.4 + 'vw'
                        li[attacker].style.top = '.5vw'
                        li[attacker].style.zIndex = 1
                        
                    },200)
                },250)
            }else{
                let li = document.querySelectorAll(`.fight_panel .bob_minions ul li`)
                li[attacker].style.transform = 'scale(1.2)'
                li[attacker].style.boxShadow = '20px'
                setTimeout(()=>{    
                    li[attacker].style.left = 1 + defender * 8.4 + 'vw'
                    li[attacker].style.top = '10.5vw'
                    li[attacker].style.zIndex = 3
                    setTimeout(()=>{
                        li[attacker].style.transform = 'scale(1)'
                        li[attacker].style.left = 1 + attacker * 8.4 + 'vw'
                        li[attacker].style.top = '.5vw'
                        li[attacker].style.zIndex = 1
                    },200)
                },250)
                
            }
            
        },
        //
        animationOfDamage(attacker,defender){
            defender.isDamaged = true
            defender.getDamaged = attacker.ad
        },
        //伤害计算函数,att为攻击者,def为防御者,way为攻击方式等一系列参数
        damageCalculation(att,def){
            if(def.character.shield){
                if(att.character.shield){
                    console.log(`【${att.name}】攻击【${def.name}】，【${att.name}】的圣盾被击破，【${def.name}】的圣盾被击破`)
                    def.character.shield = false
                    att.character.shield = false
                    
                }else{
                    console.log(`【${att.name}】攻击【${def.name}】，【${def.name}】的圣盾被击破`)
                    def.character.shield = false
                    
                    if(def.character.toxic){
                        console.log(`【${att.name}】受到到来自【${def.name}】的剧毒效果`)
                        att.hp = 0
                    }else{
                        console.log(`【${att.name}】受到到来自【${def.name}】的${def.ad}点反击伤害`)
                        att.hp -= def.ad
                    }
                }
            }else{
                if(att.character.shield){
                    console.log(`【${att.name}】攻击【${def.name}】，【${att.name}】的圣盾被击破`)
                    att.character.shield = false

                    if(att.character.toxic){
                        console.log(`【${def.name}】受到到来自【${att.name}】的剧毒效果`)
                        def.hp = 0
                    }else{
                        console.log(`【${att.name}】对【${def.name}】造成${att.ad}点伤害`)
                        def.hp -= att.ad
                        def.getDamaged = att.ad
                        def.isDamaged = true
                    }
                    
                }else{
                    console.log(`【${att.name}】攻击【${def.name}】，造成的${att.ad}点伤害`)
                    console.log(`【${att.name}】受到到来自【${def.name}】的${def.ad}点反击伤害`)
                    def.hp -= att.ad
                    att.hp -= def.ad
                    def.getDamaged = att.ad
                    def.isDamaged = true
                }
            }
        },

        //删除掉死亡随从的索引项,arr为我方随从的索引数组或者敌方
        delDeadMinions(type){
            if(type == 'toEnemy'){
                //清除死亡随从
                if(this.enemy_minions.length > 0){
                    for(let i=0;i<this.enemy_minions.length;i++){
                        if(this.enemy_minions[i].hp <= 0){
                            
                            this.enemy_minions = this.enemy_minions.filter((e,id)=>{
                                return id != i
                            })
                        }
                    }
                }
            }else{
                //清除死亡随从
                if(this.my_minions.length > 0){
                    for(let i=0;i<this.my_minions.length;i++){
                        if(this.my_minions[i].hp <= 0){
                            this.executeFunction(i,true)
                        }
                    }
                }
            }
        },
        //执行效果
        executeFunction(i,isMe){
            if(isMe){
                //复生随从的设置
                if(this.my_minions[i].character.relive){
                    this.my_minions[i].character.relive = false
                    if(this.my_minions[i].name == '青铜守卫'){
                        this.my_minions[i].character.shield = true
                    }
                    this.my_minions[i].hp = 1
                    this.my_minions[i].ad = this.my_minions[i].init.ad
                    //如果死的是亡语随从的话
                    if(this.my_minions[i].character.death){
                        let temp = this.my_minions[i]
                        let tempId = i
                        this.my_minions = this.my_minions.filter((e,id)=>{
                            return id != i
                        })
                        //如果是召唤类亡语随从，需要通过函数来获取他触发技能后的真实的索引
                        if(temp.skill.type == 'death_call'){
                            temp.skill.death.call(this,temp.isGold,tempId,true)  
                        }else if(temp.skill.type == 'death_select_single'){
                            temp.skill.death.call(this,temp,true)
                        }else if(temp.skill.type == 'death_select_all'){
                            temp.skill.death.call(this,temp.isGold,true)
                        }
                    }
                }else{
                    //如果死的是亡语随从的话
                    if(this.my_minions[i].character.death){
                        let temp = this.my_minions[i]
                        let tempId = i
                        this.my_minions = this.my_minions.filter((e,id)=>{
                            return id != i
                        })
                        //如果是召唤类亡语随从，需要通过函数来获取他触发技能后的真实的索引
                        if(temp.skill.type == 'death_call'){
                            temp.skill.death.call(this,temp.isGold,tempId,true)  
                        }else if(temp.skill.type == 'death_select_single'){
                            temp.skill.death.call(this,temp,true)
                        }else if(temp.skill.type == 'death_select_all'){
                            temp.skill.death.call(this,temp.isGold,true)
                        }
                    }else{
                        this.my_minions = this.my_minions.filter((e,id)=>{
                            return id != i
                        })
                    }
                }
            }
            
        }
    }
}

export default combat_func