const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const graund = new Image();
graund.src = "img/ground.png";

const food = new Image();
food.src = "img/food.png";


let box = 20;
let score = 0;

let coordFood = {
    x: Math.floor(Math.random() * 25 + 1) * box,
    y: Math.floor(Math.random() * 25 + 1) * box
}

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 9 * box
}

document.addEventListener("keydown", direction);

let dir;

function direction(event){
    if(event.keyCode == "37" && dir != "right"){
        dir = "left";
    } else if(event.keyCode == "38" && dir != "down"){
        dir = "up";
    } else if(event.keyCode == "39" && dir != "left"){
        dir = "right";
    } else if(event.keyCode == "40" && dir != "up"){
        dir = "down";
    }
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y){
            clearInterval(start);
        }
    }
}

function drawGame(){
    ctx.drawImage(graund, 0, 0);
    ctx.drawImage(food, coordFood.x, coordFood.y );
    
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "green": "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    };

    ctx.fillStyle = "green";
    ctx.font = "20px Arial";
    ctx.fillText(score,  box, box);

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    if(snakeX == coordFood.x && snakeY == coordFood.y) {
        score++;
        coordFood = {
            x: Math.floor(Math.random() * 25 + 1) * box,
            y: Math.floor(Math.random() * 25 + 1) * box
        } 
    } else {
        snake.pop()
    }

    if(snakeX < box || snakeX > box * 25
        || snakeY < 2 * box || snakeY > box * 25) {
        clearInterval(start);
    }


    if(dir == "left") snakeX -=box;
    if(dir == "right") snakeX +=box;
    if(dir == "up") snakeY -=box;
    if(dir == "down")snakeY +=box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}


let start = setInterval(drawGame, 100);