let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let player = {
    x : 250,
    y : cvs.height - 50 - 10,
    speed : 0,
    maxSpeed : 7,
    width : 50,
    height : 50
};

document.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        player.speed = -player.maxSpeed
    }
    if (e.keyCode == 39) {
        player.speed = player.maxSpeed;
    }
});
document.addEventListener("keyup", (event) => {
    if (event.keyCode == 37 || event.keyCode == 39) {
        player.speed = 0;
    }
});

function borders() {
    if (player.x <= 0) {
        player.x = 0;
    }
    if (player.x >= cvs.width - player.width) {
        player.x = cvs.width - player.width;
    }
};
function draw() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(player.x, player.y, player.width, player.height);
};
function update() {
    player.x += player.speed;
};

function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    borders();
    draw();
    update();
    requestAnimationFrame(loop);
};
loop();
