// const hero = document.getElementById('hero');
const hero = document.createElement('div');
const background = document.getElementsByClassName('background')[0];
const test = document.getElementsByClassName('enemy')[0];
const startbtn = document.getElementsByClassName('start-btn')[0];
const gameover = document.createElement('div');
let arrowCount = 400;
let gameStart = false;


startbtn.addEventListener('click', ()=>{
    hero.classList.add('hero')
    background.appendChild(hero);
    gameStart = true;
    background.removeChild(gameover);
    hero.classList.add('block');
    
});

function gameOver() {
    background.innerHTML = '';
    gameover.classList.add('gameover');
    gameover.innerHTML = "GAME OVER <br> press start to try again";
    background.appendChild(gameover);
    gameStart = false;
    gameover.classList.add('block');
    hero.classList.remove('block');
}

class Enemy {
    constructor(num) {
        let randomNumber = Math.floor(Math.random() * 800);
        this.number = num;
        this.ghost = document.createElement('div');
        this.ghost.classList.add('enemy');
        this.ghost.style.left = randomNumber + 'px';
        background.appendChild(this.ghost);
    }
    ghostMove() {
        let ghostY = 0;
        let inter = setInterval(()=>{
            ghostY ++;
            this.ghost.style.top = ghostY + 'px';
            if (ghostY > (600-54)) {
                this.ghost.classList.add('enemy-die');
                setTimeout(()=>{
                    this.ghost.remove();
                },1500);
                clearInterval(inter);
            }
            let ghostXL = this.ghost.getBoundingClientRect()['x'];
            let ghostXR = ghostXL + 45;
            let heroXL = hero.getBoundingClientRect()['x'];
            let heroXR = heroXL + 35;
            if (((ghostXR > heroXL) && (ghostXL < heroXR) && (ghostY > 600-108)) || ((ghostXL< heroXR) && (ghostXR > heroXL) && (ghostY > 600-108))) {
                clearInterval(inter);
                this.ghost.remove();
                gameOver()
            }
        }, 5);
    }

}

let spawnEnemy = setInterval(()=>{
    if (gameStart === true) {
        let enemy = new Enemy();
        enemy.ghostMove();
    }
}, 1000);



// let enemyOne = new Enemy(1);
// enemyOne.ghostMove();
// let spawnEnemy = setInterval(function(){
//     new Enemy();
// }, 1000);


// let makeEnemy = setInterval (function() {
//     let enemy = document.createElement('div');
//     enemy.classList.add('enemy');
//     let randomNumber = Math.floor(Math.random() * 94);
//     enemy.style.left = randomNumber + '%';
//     background.appendChild(enemy);
//     let enemyCount = 0;
//     let enemyMove = setInterval (function() {
//         enemyCount ++;
//         enemy.style.top = enemyCount + '%';
//     }, 50);
    
// }, 1000);

// let makeEnemy = setInterval(function() {
//     // if(){
//         const enemy = document.createElement('div');
//         enemy.classList.add('enemy');
//         let randomnumber = Math.floor(Math.random() * 94);
//         enemy.style.left = randomnumber + '%';
//         background.appendChild(enemy);
//         let enemycount = 0;
//         let enemyMove = setInterval(function() {
//             enemycount ++;
//             enemy.style.top = enemycount + '%';
//             if (enemy.offsetTop >= hero.offsetTop){
//                 console.log("game over");
//                 enemy.remove();
//             }
//         }, 50);
        
//         // }
//     },3000);
    
function heroRotate(direction) {
    hero.classList.remove(`hero-front`);
    hero.classList.remove(`hero-left`);
    hero.classList.remove(`hero-right`);
    hero.classList.remove(`hero-back`);
    hero.classList.add(`hero-${direction}`);
}


function heroMoveRight() {
    if (arrowCount < 765){
        arrowCount += 8;
        hero.style.left = arrowCount + `px`;
        
    }
}
function heroMoveLeft() {
    if(arrowCount > -5){
        arrowCount -= 8;
        hero.style.left = arrowCount + `px`;  
    }
}


window.addEventListener('keydown', function(e) {
    e.preventDefault();
    if (e.code === "ArrowLeft") {
        heroRotate(`left`);
        heroMoveLeft()
    } else if (e.code === `ArrowRight`) {
        heroRotate(`right`);
        heroMoveRight()
    } else if (e.code === `ArrowUp`) {
        heroRotate(`back`);
    } else if (e.code === `ArrowDown`){
        heroRotate(`front`);
    }
})

