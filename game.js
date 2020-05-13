let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let gameState = "PLAYING";
class Player {
    constructor(width, height, maxSpeed=7) {
        this.width = width;
        this.height = height;
        this.position = {
            x : 250 - this.width / 2,
            y : cvs.height - this.height -15
        };
        this.speed = 0;
        this.maxSpeed = maxSpeed;
    }
    clear(c) {
        c.clearRect(0, 0, cvs.width, cvs.height);
    }
    draw(c) {
        c.fillStyle = "#00f";
        c.fillRect(this.position.x, this.position.y , this.width, this.height);
    }
    moving() {
        document.addEventListener("keydown", (event) => {
            if (event.keyCode == 37) {
                this.speed = -this.maxSpeed;
            }
            if (event.keyCode == 39) {
                this.speed = this.maxSpeed;
            }
            if (event.keyCode == 27 && gameState == "PAUSED") {
                gameState = "PLAYING";
                console.log(gameState);
            }
            else if (event.keyCode == 27 && gameState == "PLAYING") {
                gameState = "PAUSED";
                console.log(gameState);
            }
        });
        document.addEventListener("keyup", (event) => {
            if((event.keyCode == 37 && this.speed < 0) || (event.keyCode == 39 && this.speed > 0)) {
                this.speed = 0;
            }
        });
    }
    borders() {
        if (this.position.x <= 0) this.position.x = 0;
        if (this.position.x >= cvs.width - this.width) this.position.x = cvs.width - this.width;
    }
    autoMove(cst) {
        this.position.x += cst;
    }
    togglePause(ctx) {
        if (gameState == "PAUSED") {
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, 500, 500);
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Paused", cvs.width / 2, cvs.height / 2);
        }
    }
    update() {
        if (gameState == "PAUSED") return;
        this.position.x += this.speed;
    }
}

let ball = {
    draw : function() {
        radius : 40,
        ctx.beginPath();
        ctx.arc(cvs.width / 2, 75, ball.radius, 0, 2 * Math.PI);
        ctx.stroke();
    },
};


let mainPlayer = new Player(50, 50);
mainPlayer.moving();
function loop() {
    mainPlayer.clear(ctx);
    mainPlayer.draw(ctx);
    mainPlayer.togglePause(ctx);
    mainPlayer.update(ctx);
    mainPlayer.borders();

    requestAnimationFrame(loop)
};
loop();