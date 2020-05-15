let canvas = document.getElementById("controls");
let context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const writingOnCanavs = (color, fontSize, msg, x, y,fontFamily = "Comic Sans MS") => {
    context.fillStyle = color;
    context.font = `${fontSize}px ${fontFamily}`;
    context.fillText(msg, x, y);
    console.error("done");
}
writingOnCanavs("black", "30", "Directions", String(width / 2 - 30), String(height / 2 - 100));
writingOnCanavs("black", "15", "WASD or Arrow keys for control", String(width / 2 - 100), String(height / 2 + 100));

//  ctx.fillStyle = "blue";
//     ctx.font = "30px Comic Sans MS";
//     ctx.fillText("Paused", WIDTH / 2 - 30, HEIGHT / 2);