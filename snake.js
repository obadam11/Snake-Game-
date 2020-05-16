let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let coll = false;
let PAUSE = false;
let overScreen = false;
let playAgainVar = false;
const bgColor = "#A2FF00";
let lose = false;
const scale = 20;
let ms = 75;
const HEIGHT = cvs.height;
const WIDTH = cvs.width;
let dir;
let pages = [true, false, false];
const highScore = () => Math.max(...scores);
const gameHighScore = () => (score >= highScore());
let score = 0;
// let scores = [];
let scores = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let availbale = [];
for (let i = 0; i <= HEIGHT - scale; i+= 20) availbale.push(i);

// Intializing .mp3 and .png files
let headUp = new Image();
headUp.src = "assets/img/upmouth.png";

let headDown = new Image();
headDown.src = "assets/img/downmouth.png";

let headRight = new Image();
headRight.src = "assets/img/rightmouth.png";

let headLeft = new Image();
headLeft.src = "assets/img/leftmouth.png";

let snakeBody = new Image();
snakeBody.src = "assets/img/snakeimage.png";

let apple = new Image();
apple.src = "assets/img/sprite_0.png";

let eatingSound = new Audio();
eatingSound.src = "assets/audio/eating.mp3";


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
    width :30,
    height : 30
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
        if(e.key == "1") {
            if (scores.length > 16) localStorage.clear();
            if (score > 0) localStorage.setItem(new Date(), score);
            playAgain();
            playAgainVar = false;
        }
        if (e.key == "2") {
            pages = [false, false, true];
        }
        if (e.key == "3") {
            localStorage.clear();
        }
});

// Toggling buttons
let enableGrid = true;
let gridButton = document.getElementById("grid");
gridButton.onclick = () => {
    if (enableGrid) enableGrid = false;
    else enableGrid = true;
}
let enableSound = true;
let soundButton = document.getElementById("sound");
soundButton.onclick = () => {
    if (enableSound) enableSound = false;
    else enableSound = true;

}

function styleButton(enable, b) {
    if (enable) b.style.backgroundColor = "green";
    else b.style.backgroundColor = "red";
}
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

function grid() {
    ctx.beginPath();
    // Horizantal Lines
    for (let i = 0; i < WIDTH; i += scale) {
        ctx.moveTo(0, i);
        ctx.lineTo(WIDTH, i);
        ctx.stroke();
    }
    // Vertical lines
    for (let i = 0; i < HEIGHT; i += scale) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, HEIGHT);
        ctx.stroke();
    }
};
let readScores = false;
function screens() {
    if (pages[0]) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "white";
        ctx.font = "30px Comic Sans MS";
        ctx.fillText("1 for Play", WIDTH / 2 - 50, HEIGHT / 2);
        ctx.fillText("2 for Scores", WIDTH / 2 - 70, HEIGHT / 2 - 100);
    }
    if (pages[2]) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "white";
        ctx.font = "15px Comic Sans MS";
        if (scores.length < 16) {
            for (let i = 0; i < scores.length; i++) {
                    let xScore =  WIDTH / 2;
                    let y = (i + 1) * 30;
                    ctx.fillText(`(${i + 1}) ${scores[i]}`, xScore, y);
            }
        }
        if (scores.length === 0) {
            ctx.fillText("No Scores are found!", WIDTH / 2 - 20, HEIGHT / 2);
        }
        readScores = true;
    }
};

function playAgain() {
coll = false;
PAUSE = false;
overScreen = false;
dir = undefined;
pages = [false, true, false];
score = 0;
playAgainVar = true;
snake.x = WIDTH / 2 - scale / 2;
snake.y = HEIGHT / 2 - scale / 2;
snake.speedx = 0;
snake.speedy = 0;
snake.body = [{x: snake.x, y: snake.y}];
}

function collision() {
    if (((snake.body[0].x == food.x) && (snake.body[0].y == food.y))) {
        console.log("h");
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
            // ctx.fillStyle = (i == 0) ? "#001BFF" : "#6081F0";
            if (i == 0 && dir == "U") ctx.drawImage(headUp, snake.body[i].x, snake.body[i].y, snake.width, snake.height);
            else if (i == 0 && dir == "D") ctx.drawImage(headDown, snake.body[i].x, snake.body[i].y, snake.width, snake.height);
            else if (i == 0 && dir == "L") ctx.drawImage(headLeft, snake.body[i].x, snake.body[i].y, snake.width, snake.height);
            else if (i == 0 && dir == "R") ctx.drawImage(headRight, snake.body[i].x, snake.body[i].y, snake.width, snake.height);
            else if (i == 0 && dir == undefined) ctx.drawImage(headUp, snake.body[i].x, snake.body[i].y, snake.width, snake.height);
            else {
                ctx.drawImage(snakeBody, snake.body[i].x, snake.body[i].y, snake.width, snake.height);
            }
    });

};
function drawFood(x, y) {
        ctx.drawImage(apple, x - 5, y - 5, food.width, food.height);
};
function drawBg() {
    ctx.fillStyle = bgColor;
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
    if (enableGrid) grid();
    // Growing the snake part 🔥🔥🔥

    // if the snake didn't eat the food
    if (!coll)
    // Making the newHead object to save the coordinates of the snake's head
    {let newHead = {
        x : snake.x,
        y : snake.y
    };

    snake.body.unshift(newHead); // adding the object to the begging of the snake's body (New Head)
    snake.body.pop(); // and then removing the last part from the snak's body.
    // Leaving us with a net parts of 0
}
// If the collision occured
else {
    if (enableSound) eatingSound.play();
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
    styleButton(enableSound, soundButton);
    styleButton(enableGrid, gridButton);
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
        ctx.font = "20px Comic Sans MS";
        let text = (selfCollision()) ? `The Snake ate itself and scored ${score}` : `The Snake fell off the screen and scored ${score}`;
        ctx.fillText(text, WIDTH / 2 - 200, HEIGHT / 2);
        ctx.font = "15px Comic Sans MS";
        ctx.fillText("Press '1' key to play again", WIDTH / 2 - 100, HEIGHT / 2 + 150);
        overScreen = true;
        if (!playAgainVar)return;
    }
    update();
    draw();
    collision();
    scoring();
};
setInterval(loop, ms);
