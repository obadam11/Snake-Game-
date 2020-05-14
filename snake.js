let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let coll = false;
let PAUSE = false;
let overScreen = false;
let lose = false;
const scale = 20;
let ms = 75;
const HEIGHT = cvs.height;
const WIDTH = cvs.width;
let dir;
let pages = [true, false, false];
let score = 0;
let scores = [];
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
        }
            
            
        if ((e.keyCode == 38 || e.key == "w") && dir != "D"){
            dir = "U";
            snake.speedy = -snake.speed;
            snake.speedx = 0;
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
        if(e.key == "p") {
            pages = [false, true, false];
        }
        if (e.key == "a") {
            localStorage.clear();
        }
        if (e.key == "c") {
            pages = [false, false, true];
        }
        if (e.key == "a") {
            localStorage.clear();
        }
});
document.addEventListener("mousedown", () => {
    if (score > 0) localStorage.setItem(new Date(), score);
    playAgain();
})
let f = {x: snake.x, y: snake.y};
snake.body.push(f);
console.log(snake.body[0].x);
readStrorage();
function readStrorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        scores.push(value);
    }
};
let readScores = false;
function screens() {
    if (pages[0]) {
        ctx.fillStyle = "#1BFC00";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "white";
        ctx.font = "30px Comic Sans MS";
        ctx.fillText("P for Play", WIDTH / 2 - 50, HEIGHT / 2);
        ctx.fillText("C for Scores", WIDTH / 2 - 70, HEIGHT / 2 - 100);
    }
    if (pages[2]) {
        ctx.fillStyle = "#1BFC00";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "white";
        ctx.font = "15px Comic Sans MS";
            for (let i = 0; i < scores.length; i++) {
            let x = WIDTH / 2;
            let y = (i + 1) * 30;
            ctx.fillText(`${i + 1} ${scores[i]}`, x, y);
        }
        if (scores.length === 0) {
            ctx.fillText("No Scores are found!", WIDTH / 2 - 20, HEIGHT / 2);
        }
        readScores = true;
    }
};

function playAgain() {
    location.reload();
};

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
function selfCollision() {
    for (let i = 0; i < snake.body.length; i++) {
        if ((i >= 1) && (snake.body[0].x == snake.body[i].x) && (snake.body[0].y == snake.body[i].y)) {
            console.log("Snake collided with itself", snake.body[i].x, snake.body[i].y, i);
            return true;
        }
    }
    return false;
};
function scoring() {
    if (pages[1]) {
        ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 20, 40);
    }
};
function borders() {
    if (snake.body[0].x <= 0 - scale) return true;
    else if (snake.body[0].x >= WIDTH - snake.width + scale) return true;
    else if (snake.body[0].y <= 0 - scale) return true;
    else if (snake.body[0].y >= HEIGHT - snake.width + scale) return true;
};

function drawSnake(x, y) {
    snake.body.forEach((value, i) => {
        ctx.fillStyle = (i == 0) ? "#001BFF" : "#6081F0";
        ctx.fillRect(snake.body[i].x, snake.body[i].y, 20, 20);
    });
};
function drawFood(x, y) {
     ctx.fillStyle = "red";
     ctx.fillRect(x, y, food.width, food.height);
};
function drawBg() {
    ctx.fillStyle = "#1BFC00";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
};
function update() {
    
    snake.x += snake.speedx;
    snake.y += snake.speedy;
    
};

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    if (pages[1]) drawBg();
    drawSnake(snake.x, snake.y);
    // Growing the snake part 🔥🔥🔥

    // if the snake didn't eat the food
    if (!coll) 
    // Making the newHead object to save the coordinates of the snake's head
    {let newHead = {
        x : snake.x,
        y : snake.y
    };

    snake.body.unshift(newHead); // adding the object to the begging of the snake's body
    snake.body.pop(); // and then removing the last part from the snak's body.
    // Leaving us with a net parts of 0
}
// If the collision occured
else {
    // Making an object to save the coordinates of the snake's head
    let newHead = {
        x : snake.x,
        y : snake.y
    };
    // adding the object to the begging of the snak's body
    snake.body.unshift(newHead);
    // Reset coll to false to check it another collision with food occured.
    coll = false;
    // Leaving us with a net parts of 1.
}
    drawFood(food.x, food.y);
    screens();
};

console.log(food.x, food.y);
let newHead = {
    x : snake.x,
    y : snake.y
};
const loop = function() {
    if (PAUSE) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "blue";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Paused", WIDTH / 2 - 30, HEIGHT / 2);
    return;
    }
    if ((selfCollision() || borders()) && !lose) {
        console.log("COLLSIION");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "blue";
        ctx.font = "30px Comic Sans MS";
        let text = (selfCollision()) ? "The Snake ate itself" : "The Snake fell off the screen";
        ctx.fillText(text, WIDTH / 2 - 200, HEIGHT / 2);
        ctx.font = "15px Comic Sans MS";
        ctx.fillText("Right click to play again", WIDTH / 2 - 100, HEIGHT / 2 + 150);
        overScreen = true;
        return;
    }
    update();
    draw();
    collision();
    scoring();
}
;
setInterval(loop, ms);