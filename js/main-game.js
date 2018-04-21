var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = window.innerWidth;
var height = window.innerHeight;

// canvas.width = width - 2.01;
// canvas.height = height - 2.01;
// canvas 右邊和下方會超出範圍造成捲軸出現
// 但我完全想不到這個2是怎樣出來的 (而且上方左方沒有--線索不夠阿@@

canvas.width = 0.5 * width ;
canvas.height = 0.5 * height;

// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


// ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballRed = random(0,255);
var ballGreen = random(0,255);
var ballBlue = random(0,255);

// paddle
var paddleHeight = 65;
var paddleWidth = 10;
var paddleX = (canvas.width-paddleWidth)/2
var paddleVelX = 7;
// var paddleVelY = -2;

// magic attact water
var waterHeight = 45;
var waterWidth = 30;
var waterX = paddleX + 20;

// keyboard controls
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;






// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = `rgba(${ballRed},${ballGreen},${ballBlue},0.85)`;
//     ctx.fill();
//     ctx.closePath();
// }


function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD"
	ctx.fill();
	ctx.closePath();
}


function drawWater() {
	ctx.beginPath();
	ctx.rect(waterX, canvas.height-waterHeight-10, waterWidth, waterHeight);
	ctx.fillStyle = "cyan"
	ctx.fill();
	ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawBall();
    drawPaddle();

    if(x + dx > canvas.width-ballRadius || x + dx < 0) {
    	dx = -dx;

		ballRed = random(0,255);
		ballGreen = random(0,255);
		ballBlue = random(0,255);
	}

	if(y + dy > canvas.height-ballRadius || y + dy < 0) {
	    dy = -dy;

		ballRed = random(0,255);
		ballGreen = random(0,255);
		ballBlue = random(0,255);
	}

    x += dx;
    y += dy;


    if(rightPressed && paddleX < canvas.width-paddleWidth) {
    	paddleVelX = 7
    	paddleX += paddleVelX;
	} else if(leftPressed && paddleX > 0) {
		paddleVelX = -7
    	paddleX += paddleVelX;
	}

	if(spacePressed) {
    	if(paddleVelX < 0) {
			waterX = paddleX - paddleWidth - waterWidth;
		} else if(paddleVelX > 0) {
			waterX = paddleX + 20;
		}
		drawWater();
	}


}


// keyboard control
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	// console.log(e.keyCode)
	if(e.keyCode == 39) {
		rightPressed = true;
	} else if(e.keyCode == 37) {
		leftPressed = true;
	} else if(e.keyCode == 32) {
		spacePressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	} else if(e.keyCode == 37) {
		leftPressed = false;
	} else if(e.keyCode == 32) {
		spacePressed = false;
	}
}







setInterval(draw, 10);


