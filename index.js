// Game Constants :
let inputDir = {x: 0, y: 0};
const foodsound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let highscore = 0;
let score = 0;
let speed = 15;
let lastPaintTime = 0;
let snakeArr = [
    {x: 9, y:10  }
]

food = {x: 6, y: 5 };

// Game Functions : 
function main(currentTime) {
    window.requestAnimationFrame(main);
    // if currentTime - lastPaintTime (in seconds) < 1/2 
    // console.log(currentTime) 
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime
    gameEngine();
}

function isCollide(snake) {
    // If snake bites Itself :  
    for(let index = 1; index < snakeArr.length; index++) {
        if(snakeArr[index].x === snake[0].x && snakeArr[index].y === snake[0].y) { 
            return true;
        }
         
    // If snake Collides into Wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    }

    
}

function handleClick() {

    musicSound.paused ? musicSound.play() : musicSound.pause();
    musicSound.paused ? MusicButton.innerHTML = "Turn Music On" : MusicButton.innerHTML = "Turn Music Off"
    // MusicButton.innerHTML = "Music On"
    
  
}

function setEasy() {
    speed = 5;
}

function setMedium() {
    speed = 12;
}

function setHard() {
    speed = 25;
}

function gameEngine(){
    // part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over :( Press any key to Play Again!")
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        highscore = Math.max(score, highscore);
        // Highscorediv.innerHTML = "High Score : " + highscore;
        score = 0;
    }

    // After Eating Food : Increment the score and snake AND recreate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        
        foodsound.play();
        score += 100;
        scorediv.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        // Generating random number between a and b : 
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    // Moving the snake : 
    for(let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]} 
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2: Display the snake and Food
    // For Displaying Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement  = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0) {
            snakeElement.classList.add('head');
        }else {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);

        // For Displaying Food :
        foodElement  = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement); 

    })
    
}

// Game Logic :
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1} // Starting the game
    moveSound.play();
    musicSound.play();

    switch(e.key) {
        case "ArrowUp" :
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
        break;
            case "w" :
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
        break;
        case "ArrowDown" :
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
        break;
            case "s" :
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
        break;
        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
        break;
            case "a" :
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
        break;
        case "ArrowRight" :
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
        break;
            case "d" :
            console.log("ArrowLeft");
            inputDir.x = 1;
            inputDir.y = 0;
        break;

    }
})
