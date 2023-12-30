function getRandomValue(min,max){
    return Math.floor(Math.random() *(max-min)) + min;
}
//let currentRound = 0; can't approach this way need to get access of this variable. 
const app =  Vue.createApp({
    data(){
        return {
            playerHealth:100,
            monsterHealth:100,
            currentRound:0,
            winner: null,
            logMessages:[],

        };
    },
    computed:{        
        monsterBarStyles(){
            if(this.monsterHealth < 0){
              return {width: '0%'}; 
            }
           return {width: this.monsterHealth + '%'} 
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'};   
            }
            return {width:this.playerHealth + '%' }
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },
    },
    watch:{
        playerHealth(value){
           if(value<= 0 && this.monsterHealth <=0)
           {
            // A draw
            this.winner = 'draw';
           }else if(value <= 0){
            //Player lost
            this.winner = 'monster';
           }    
        },
        monsterHealth(value ){
          if(value<=0 && this.playerHealth <=0){
            // A draw
            this.winner = 'draw';
          } else if(value <= 0){
            //Monster lost
            this.winner = 'player';
          }
        }
    },
    methods:{ 
        startGame(){
            this.playerHealth = 100; 
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
     //reducing Monster health when Attack Button Pressed(HUMAN ATTACK MONSTER). 
    // we Attack Monster
       attackMonster(){
        this.currentRound++;
        const attackValue = getRandomValue(5,12);
        this.monsterHealth = this.monsterHealth - attackValue;
        this.addLogMessage('player','attack',attackValue);
        this.attackPlayer();   
       },
       //MONSTER ATTACKS US
       attackPlayer(){
        const attackValue = getRandomValue(8,15);
        this.playerHealth = this.playerHealth - attackValue;
        this.addLogMessage('monster','attack',attackValue);
        
       },
       //Special Attack should not available all the Time should be Available only 3 Times. 
       specialAttackMonster(){
        this.currentRound++;
        const attackValue = getRandomValue(10,25);
        this.monsterHealth -= attackValue;
        this.addLogMessage('player','special-attack',attackValue);
        this.attackPlayer();
       },
       healPlayer(){
        this.currentRound++;
        const healValue = getRandomValue(8,20);
        if(this.playerHealth + healValue >100){
            this.playerHealth =100;
        } else {
        this.playerHealth = this.playerHealth + healValue;
        }
        this.addLogMessage('player','heal',healValue);
        this.attackPlayer();
       },
       surrender(){
         this.winner = 'monster';
       },
       addLogMessage(who,what,value ){
          this.logMessages.unshift({
            actionBy: who,
            actionType:what,
            actionValue:value,

          });

       },

    }
});
app.mount('#game');
