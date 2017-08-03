var c = document.getElementById("canvas");
var ctx = c.getContext('2d');

var res = 100;

function block(x,y,w,h){
	this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = 'blue';
  this.update= function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(x,y,w,h);
  }
}

var map = [];

for(var y = 0; y < res; y++ ){
	map.push([])
	for(var x = 0; x< res; x++ ){
  	map[y].push(new block(x*c.width/res,y*c.height/res,c.width/res,c.height/res));
    if (Math.floor(rand(0,res*res/1)) == res-1) {
      map[y][x].color = 'black';
    }
  }
}

update();

function update() {
  for(var y = 0; y < res; y++ ){
  	for(var x = 0; x< res; x++ ){
    	map[y][x].update();
    }
  }
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

var growChance = 10;//  its actually 1/growChance

document.getElementById('GrowChance').addEventListener('input', function (e) {growChance = this.value});

function cumulativeGrow() { //NOTE: trickle growing
  console.log('it grew');
  for(var y = 0; y < res; y++ ){
    for(var x = 0; x< res; x++ ){
      if (map[y][x].color == 'black') {
        try {
          if (Math.floor(rand(0,growChance)) == 0) {
            map[y-1][x].color = 'black';
          }
        } catch (e) {};
        try {
          if (Math.floor(rand(0,growChance)) == 0) {
            map[y+1][x].color = 'black';
          }
        } catch (e) {};
        try {
          if (Math.floor(rand(0,growChance)) == 0) {
            map[y][x-1].color = 'black';
          }
        } catch (e) {};
        try {
          if (Math.floor(rand(0,growChance)) == 0) {
            map[y][x+1].color = 'black';
          }
        } catch (e) {};
      }
    }
  }
  update();
}

function normalGrow() {
  console.log('it grew');

  function coord(x,y) {
    this.x = x;
    this.y = y;
  }

  var blacks = [];

  for(var y = 0; y < res; y++ ){
    for(var x = 0; x< res; x++ ){
      if (map[y][x].color == 'black') {
        blacks.push(new coord(x,y));
      }
    }
  }

  for (var i = 0; i < blacks.length; i++) {
    try {
      if (Math.floor(rand(0,growChance)) == 0) {
        map[blacks[i].y-1][blacks[i].x].color = 'black';
      }
    } catch (e) {};
    try {
      if (Math.floor(rand(0,growChance)) == 0) {
        map[blacks[i].y+1][blacks[i].x].color = 'black';
      }
    } catch (e) {};
    try {
      if (Math.floor(rand(0,growChance)) == 0) {
        map[blacks[i].y][blacks[i].x-1].color = 'black';
      }
    } catch (e) {};
    try {
      if (Math.floor(rand(0,growChance)) == 0) {
        map[blacks[i].y][blacks[i].x+1].color = 'black';
      }
    } catch (e) {};
  }

  update();
}
