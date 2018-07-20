var s = '這顆草莓瑞士捲，草莓沾著奶油吃起來香濃滑口，酸酸甜甜，搭配巧克力蛋糕，滋味絕妙。'
var drops = [];

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 50; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  background(0, 248, 1);
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
}

function Drop() {
  this.x = random(320,640);
  this.y = random(-500, -50);
  this.z = random(0, 20);
  this.len = map(this.z, 0, 20, 10, 20);
  this.yspeed = map(this.z, 0, 20, 1, 20);
  this.size = map(this.z, 0, 20, 10, 32);

  this.i =  Math.floor(random(1, 38));

  this.fall = function() {
    this.y = this.y + this.yspeed;
    var grav = map(this.z, 0, 20, 0, 0.01);
    this.yspeed = this.yspeed + grav;

    if (this.y > height) {
      this.y = random(-200, -100);

      this.i =  Math.floor(random(1, 38));

      this.yspeed = map(this.z, 0, 20, 4, 10);
    }
  }

  this.show = function() {
    var thick = map(this.z, 0, 20, 1, 4);
    strokeWeight(thick);
    textSize(this.size);
    fill(255,255,255);
    text(s[this.i] + s[this.i+1] +s[this.i+2], this.x, this.y, 32, 32);
  }
}
