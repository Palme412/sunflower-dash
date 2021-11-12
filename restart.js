var canvas = document.querySelector("#game"),
    ctx = canvas.getContext("2d"),
    width = 1000,
    height = 600,
    playerwidth = 20,
    playerheight = 20,
    player = {
        x: 10,
        y: 590,
        width: playerwidth,
        height: playerheight,
        color: "red",
        speed: 3,
        velocityX: 0,
        velocityY: 0,
        jump: false,
        grounded: false
    };

boxes = [];
keys = [];
friction = 0.8;
gravity = 0.2;

boxes.push({
    x: 0,
    y: 0, //border
    width: 5,
    height: height
});
boxes.push({
    x: 0,
    y: height - 5,
    width: width, //border
    height: 50
});

boxes.push({
    x: width - 5,
    y: 0,
    width: 5,   //border
    height: height
});
boxes.push({
    x: 0,
    y: 0,
    width: width,
    height: 5
});

boxes.push({
    x: 90,
    y: 510,      //platforms all the way down
    width: 70,
    height: 5
});
boxes.push({
    x: 190,
    y: 460,
    width: 70,
    height: 5
});
boxes.push({
    x: 290,
    y: 410,
    width: 70,
    height: 5
});
boxes.push({
    x: 10,
    y: 340,
    width: 240,
    height: 5
});
boxes.push({
    x: 20,
    y: 270,
    width: 30,
    height: 5
});
boxes.push({
    x: 80,
    y: 210,
    width: 70,
    height: 5
});
boxes.push({
    x: 300,
    y: 150,
    width: 20,
    height: 5
});
boxes.push({
    x: 90,
    y: 100,
    width: 20,
    height: 5
});
boxes.push({
    x: 30,
    y: 50,
    width: 20,
    height: 5
});
boxes.push({
    x: 290,
    y: 270,
    width: 70,
    height: 5
});
boxes.push({
    x: 370,
    y: 200,
    width: 70,
    height: 5
});
boxes.push({
    x: 270,
    y: 150,
    width: 70,
    height: 5
});
boxes.push({
    x: 370,
    y: 90,
    width: 350,
    height: 5
});
boxes.push({
    x: 790,
    y: 180,
    width: 70,
    height: 5
});
boxes.push({
    x: 945,
    y: 80,
    width: 50,
    height: 5
});
boxes.push({
    x: 880,
    y: 120,
    width: 10,
    height: 5
});
boxes.push({
    x: 595,
    y: 300,
    width: 395,
    height: 5
});
boxes.push({
    x: 570,
    y: 410,
    width: 70,
    height: 5
});
boxes.push({
    x: 700,
    y: 480,
    width: 70,
    height: 5
});
boxes.push({
    x: 810,
    y: 420,
    width: 20,
    height: 5
});
boxes.push({
    x: 895,
    y: 370,
    width: 100,
    height: 5
});
boxes.push({
    x: 600,
    y: 550,
    width: 70,
    height: 5
});
boxes.push({
    x: 400,
    y: 595,
    width: 5,
    height: 95
});
boxes.push({
    x: 500,
    y: 595,
    width: 5,
    height: 100
});
boxes.push({
    x: 25,
    y: 150,
    width: 5,
    height: 5
})

canvas.width = width;
canvas.height = height;



function gamePlay() {
    if (keys[87]) {
        if (!player.jump && player.grounded) {
            player.jump = true;
            player.grounded = false;
            player.velocityY = -player.speed * 2;
        }
    }
    if (keys[68]) {
        if (player.velocityX < player.speed) {
            player.velocityX++;
        }
    }
    if (keys[65]) {
        if (player.velocityX > -player.speed) {
            player.velocityX--;
        }
    }

    player.velocityX *= friction;
    player.velocityY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.beginPath();
    player.grounded = false;

    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        ctx.fill();
        var dir = collisionCheck(player, boxes[i]);

        if (dir === "left" || dir === "right") {
            player.velocityX = 0;
            player.jump = false;
        } else if (dir === "bottom") {
            player.grounded = true;
            player.jump = false;
        } else if (dir === "top") {
            player.velocityY *= -1;
        }
    }

    if (player.grounded) {
        player.velocityY = 0;
    }

    player.x += player.velocityX;
    player.y += player.velocityY;

    ctx.fill();
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(gamePlay);
}
function collisionCheck(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        halfWidth = (shapeA.width / 2) + (shapeB.width / 2),
        halfHeight = (shapeA.height / 2) + (shapeB.height / 2),
        collisionDirection = null;

    if (Math.abs(vX) < halfWidth && Math.abs(vY) < halfHeight) {
        var boxBottomTop = halfWidth - Math.abs(vX),
            boxSides = halfHeight - Math.abs(vY);
        if (boxBottomTop >= boxSides) {
            if (vY > 0) {
                collisionDirection = "top";
                shapeA.y += boxSides;
            } else {
                collisionDirection = "bottom";
                shapeA.y -= boxSides;
            }
        } else {
            if (vX > 0) {
                collisionDirection = "left";
                shapeA.x += boxBottomTop;
            } else {
                collisionDirection = "right";
                shapeA.x -= boxBottomTop;
            }
        }
    }

    return collisionDirection;
};

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

gamePlay();
collisionCheck();