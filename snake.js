let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let coll = false;
let PAUSE = false;
const scale = 20;
let ms = 75;
const HEIGHT = cvs.height;
const WIDTH = cvs.width;
let dir;
let score = 0;
let availbale = [];
for (let i = 0; i <= HEIGHT - scale; i+= 20) availbale.push(i);

let snake = {
    x : WIDTH / 2 - 10,
    y : HEIGHT / 2 - 10,
    width : 20,
    height : 20,
    body : [],
    speedx : 0,
    speedy : 0,
    speed : 20,
};
let food = {
    x : availbale[Math.floor(Math.random() * availbale.length)],
    y : availbale[Math.floor(Math.random() * availbale.length)],
    width : 20,
    height : 20
};
document.addEventListener("keydown", (e) => {
        if ((e.keyCode == 37 || e.key == "a") && dir != "R") {
            dir = "L";
            snake.speedx = -snake.speed;
            snake.speedy = 0;
            console.log("left");
        }
            
            
        if ((e.keyCode == 38 || e.key == "w") && dir != "D"){
            dir = "U";
            snake.speedy = -snake.speed;
            snake.speedx = 0;
            console.log("up");
        }
            
            
        if ((e.keyCode == 39 || e.key == "d") && dir != "L"){
            dir ="R";
            snake.speedx = snake.speed;
            snake.speedy = 0;
        }
           
        if ((e.keyCode == 40 || e.key == "s") && dir != "U") {
            dir = "D";
            snake.speedy = snake.speed;
            snake.speedx = 0;
        }    
        if (e.keyCode == 27) {
            pause();
        } 
});

let f = {x: snake.x, y: snake.y};
snake.body.push(f);
console.log(snake.body[0].x);

function collision() {
    if (((snake.body[0].x == food.x) && (snake.body[0].y == food.y))) {
        food.x = availbale[Math.floor(Math.random() * availbale.length)];
        food.y = availbale[Math.floor(Math.random() * availbale.length)];
        drawFood(food.x, food.y);
        coll = true;
        score ++;
    }
};
function pause() {
  if (PAUSE) {
    PAUSE = false;
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "blue";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Paused", WIDTH / 2, HEIGHT / 2);
  }  
  else {
      PAUSE = true;
  }
};
function scoring() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "#02FF3C";
    ctx.fillText(`Score: ${score}`, 20, 40);
};
function borders() {
    if (snake.body[0].x <= 0) snake.body[0].x = 0;
    if (snake.body[0].x >= WIDTH - snake.width) snake.body[0].x = WIDTH - snake.width;
    if (snake.body[0].y <= 0) snake.body[0].y = 0;
    if (snake.body[0].y >= HEIGHT - snake.width) snake.body[0].y =  HEIGHT - snake.width;
};

function drawSnake(x, y) {
    snake.body.forEach((value, i) => {
        ctx.fillStyle = "#fff";
        ctx.fillRect(snake.body[i].x, snake.body[i].y, 20, 20);
    });
};
function drawFood(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, food.width, food.height);
};
function drawBg() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
};
function update() {
    
    snake.x += snake.speedx;
    snake.y += snake.speedy;
    
};

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawBg();
    drawSnake(snake.x, snake.y);
    if (!coll)
    {let newHead = {
        x : snake.x,
        y : snake.y
    };

    snake.body.unshift(newHead);
    snake.body.pop();
}
else {
    let newHead = {
        x : snake.x,
        y : snake.y
    };
    snake.body.unshift(newHead);
    coll = false;
}
    // else {
    //     snake.body.pop();
    // }
    drawFood(food.x, food.y);
};

console.log(food.x, food.y);

setInterval(function() {
    if (PAUSE) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "blue";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Paused", WIDTH / 2 - 30, HEIGHT / 2);
    return;
    }
    borders();
    update();
    draw();
    collision();
    scoring();
}, ms);