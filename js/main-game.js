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

// paddle  現在是玩家角色
var paddleHeight = 65;
var paddleWidth = 10;
var paddleX = (canvas.width-paddleWidth)/10;
var paddleVelX = 5;

// NPC
var NPCHeight = 65;
var NPCWidth = 10;
var NPCX = 9 * (canvas.width-NPCWidth)/10;  // 之後試試改成random(10,(canvas.width-10))
var NPCVelX = 7;
var NPCshow = 0;
var NPCisdefeated = 0; 
// NPC's 血條
var NPC_hp_Height = 10;
var NPC_hp_Width = 50;
var NPC_hp_X = NPCX - (0.45 * NPC_hp_Width);
var NPC_hp_Y = canvas.height - NPCHeight - NPC_hp_Height - 10;


// point
var point = false;
var pointHeight = 10;
var pointWidth = 10;
var pointX = NPCX;
var pointY = canvas.height - NPCHeight - pointHeight - 10;



// magic attact water
var waterHeight = 45;
var waterWidth = 30;
var waterX = paddleX + 20;

// keyboard controls
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

//text
var textHeight = 50;





// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = `rgba(${ballRed},${ballGreen},${ballBlue},0.85)`;
//     ctx.fill();
//     ctx.closePath();
// }

function showText() {
	var p = document.getElementsByTagName('p');
	if (NPCisdefeated % 6 == 0) {
		p[0].style.display = 'none';
		p[0].innerText = '目測NPC存活，快給他一點傷害';
	} if (NPCisdefeated % 6 == 1) {
		p[0].style.display = 'block';	
		p[0].innerText = '什麼 他居然會復活';
	} if (NPCisdefeated % 6 == 2) {
		// p[0].style.display = 'flex';	
		p[0].innerText = '你打倒了NPC的次數除三餘二';
	} if (NPCisdefeated % 6 == 3) {
		// p[0].style.display = 'flex';	
		p[0].innerText = '什麼 他居然又復活了';
	} if (NPCisdefeated % 6 == 4) {
		// p[0].style.display = 'flex';	
		p[0].innerText = '雖然NPC又復活了 但是我們總是會有辦法的';
	} if (NPCisdefeated % 6 == 5) {
		// p[0].style.display = 'flex';	
		p[0].innerText = '雖然是這麼說啦 但我還沒想到後面的梗';
	}
	// ctx.beginPath();
	// ctx.rect(0, canvas.height-textHeight, canvas.width, textHeight);
	// ctx.fillStyle = "rgba(255,255,255,0.3)";
	// ctx.fill();
	// ctx.closePath();
	
}

function showOpen() {

	ctx.beginPath();
	ctx.rect(0, canvas.height, canvas.width, canvas.height)
}

function drawNPC() {
	ctx.beginPath();
	ctx.rect(NPCX, canvas.height-NPCHeight, NPCWidth, NPCHeight);
	ctx.fillStyle = "rgba(255,0,100,0.8)"
	ctx.fill();
	ctx.closePath();
}



function drawNPC_hp() {
	ctx.beginPath();
	ctx.rect(NPC_hp_X , NPC_hp_Y, NPC_hp_Width, NPC_hp_Height);
	ctx.fillStyle = "rgba(100,255,100,0.8)"
	ctx.fill();
	ctx.closePath();
}



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

function drawPoint() {
	ctx.beginPath();
	ctx.rect(pointX, pointY, pointWidth, pointHeight);
	ctx.fillStyle = "rgba(0,0,100,0.8)"
	ctx.fill();
	ctx.closePath();
}




function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawBall();
    drawPaddle();
    showText();

    // 畫出NPC
    if (NPC_hp_Width){
    	drawNPC();
    	drawNPC_hp();
		if(spacePressed && NPCX > waterX && NPCX < waterX+waterWidth) {
			// console.log(NPCisBeingHitted);
			// NPCisBeingHitted = true;
			if (NPC_hp_Width > 0) {
				NPC_hp_Width --;
			} else if (NPC_hp_Width <= 0){
				NPC_hp_Width = 0;
				NPCisdefeated += 1;
				NPCshow = 0;
			}
		}
	// } else {
	// 	console.log(NPCisBeingHitted);
	// 	NPCisBeingHitted = false;
	// }
	} else if (!NPC_hp_Width){
		// 讓npc在同一個地方被畫出來看起來會像解決了(若NPCX給random則會因為setinteval而位置更新300次)
		// 這會造成在第一隻NPC消失時+1但之後都不會再加NPC也不會再出現
		// 暫時還沒想到怎麼改 再用個變數來存NPC存活狀態?
		// if (!point){
		// 	drawPoint();
		// 	point ++;
		// 	setTimeout(()=>{NPC_hp_Width=50; NPCX=random(10,canvas.width-10);NPC_hp_X = NPCX - (0.45 * NPC_hp_Width);}, 3000);

		// } else if (point){
		// 	console.log(point);
		// }

		NPCshow += 1
		if ( NPCshow == 300 ) {
			NPC_hp_Width=50;
			NPCshow = 0;
			NPCisdefeated += 1;
			console.log(NPCisdefeated)
			// NPCX=random(10,(canvas.width-10));
			// NPC_hp_X = NPCX - (0.45 * NPC_hp_Width);
			// NPCisdefeated = false;
		}

	}



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
    	paddleVelX = 5;
    	paddleX += paddleVelX;
    	// waterX = paddleX;
	} else if(leftPressed && paddleX > 0) {
		paddleVelX = -5
    	paddleX += paddleVelX;
    	// waterX = paddleX;
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


