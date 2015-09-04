function id(i){
  return document.getElementById(i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var keys=[0,0,0,0];
var money=200000;
var gameOver=false;
var time, t=0, v=0;
var lock=true;
var box, ctx;
var guyX, guyY;
var lastCalledTime;
var rotation=0;
var people=[];
var actionRadio={
	show: false,
	color: "white",
	radius: 0
};
var DEBUG_GENERATE_PEOPLE=false;
var easystar=new EasyStar.js();
var dron=new Image;
dron.src="dron.gif";
var boy= new Image, girl=new Image, shop=new Image, factory=new Image, house=new Image;
boy.src="boy.gif";
girl.src="girl.gif";
shop.src="shop.gif";
factory.src="factory.gif";
house.src="house.gif";
var city=[
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // 25
  2,2,2,2,2,3,1,2,2,2,2,2,2,2,2,3,3,4,4,4,4,1,4,4,4,
  2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,3,3,4,4,4,4,1,4,4,4,
  2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,1,4,4,4,
  1,1,1,1,1,1,1,2,2,2,3,3,3,3,1,3,3,3,3,3,3,1,4,4,4,
  2,2,2,2,2,2,1,2,2,2,3,3,3,3,1,1,1,1,1,1,1,1,4,4,4,
  2,2,3,3,2,2,1,1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,
  3,3,3,3,3,3,1,0,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // 9 - the half
  4,4,4,4,4,4,1,0,1,2,2,2,1,3,3,3,3,1,2,2,2,2,1,4,4,
  4,4,4,4,4,4,1,1,1,2,2,1,1,3,3,3,3,1,2,2,2,2,1,4,4,
  4,4,4,4,4,4,3,1,2,2,2,1,2,2,2,1,1,1,1,1,1,1,1,4,4,
  4,4,4,4,4,4,3,1,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,4,4,
  4,4,4,4,4,4,3,1,1,1,1,1,2,2,2,1,2,2,2,2,2,2,2,4,4,
  3,3,1,1,1,1,1,1,2,2,2,1,1,1,1,1,2,2,4,4,4,4,4,4,4,
  4,4,1,2,2,2,2,3,2,2,2,4,4,4,4,1,2,2,4,4,4,4,4,4,4,
  3,3,1,2,2,2,2,3,0,0,0,4,4,4,4,1,1,1,1,1,1,1,1,1,1,
  1,1,1,2,2,2,2,3,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4
];

function write(str,cb){
  /*var scroll=id("m");
  scroll.value+="\n"+str;
  scroll.scrollTop=scroll.scrollHeight;*/
  /* use custom message panel */
  
  ctx.fillStyle="rgb(0,0,255)";
  ctx.fillRect(box*3,box*3,box*18,box*4);
  ctx.fillStyle="black";
  // ctx.font
  ctx.fillText(str,box*3,box*4);
  
  // BLOCK GAME
  lock=true;
  var cl=setInterval(function(){
	if(!lock){
		clearInterval(cl);
		cb();
	}  
  },100);
}

function calculateRandomRoad(){
  var roads=city.filter(function(tile){
	  return (tile === 1) ? true : false;
  });
  var initPoint=getRandomInt(0,roads.length);
  var countRoad=0;
  var countCity=0;
  while(countRoad<initPoint){
	  if(city[countCity]=="1")
		countRoad++
	  countCity++;
  }
  // TRANSFORMAR A PATHFINDING
  var yPath=(countCity / 25) >> 0;
  var xPath=countCity % 25;
  return [xPath,yPath];
}

function key(evt,state){
  switch(evt.key){
    case "w" : keys[0]=state;break;
    case "s" : keys[1]=state;break;
    case "a" : keys[2]=state;break;
    case "d" : keys[3]=state;break;
  }
}
function z1(){
	// SPREAD ADVERTISING
	actionRadio={
		prop: 30,
		show: true,
		radius: box*3,
		color: "white",
		current: 0,
		speed: 0.25,
		x: guyX,
		y: guyY,
		price: 2000
	};
}

function z2(){
	// FREE STICKERS
	actionRadio={
		prop: 20,
		show: true,
		radius: box*4,
		color: "purple",
		current: 0,
		speed: 0.15,
		x: guyX,
		y: guyY,
		price: 1500
	};
  }
  
function z3(){
	actionRadio={
		prop: 60,
		show: true,
		radius: box*2,
		color: "orange",
		current: 0,
		speed: 0.07,
		x: guyX,
		y: guyY,
		price: 4000
	};
  }
  
function z4(){
	actionRadio={
		prop: 5,
		show: true,
		radius: box*7,
		color: "brown",
		current: 0,
		speed: 0.4,
		x: guyX,
		y: guyY,
		price: 2500
	};
}
function loop(){
  if(lock){
	requestAnimationFrame(loop);
	return;
  }
  var speed=box*2; // 2 box per second
  var delta=(new Date().getTime() - lastCalledTime)/1000;
  lastCalledTime=Date.now();

  // Render
  ctx.fillStyle="rgb(91, 196, 124)";
  ctx.fillRect(0,0,id("a").width,id("a").width*3/4);
  var draw=city.map(function(val){
    switch(val){
      case 0: return "rgba(91,196,124,1)";
      case 1: return "rgb(76, 77, 76)";
      //case 2: return "rgb(84, 230, 54)";
      case 2: return {img: house};
      //case 3: return "rgb(37, 88, 219)";
      case 3 : return {img: shop};
      //case 4: return "rgb(223, 155, 23)";
      case 4: return {img: factory};
    }
  });
  var x=0,y=0;
  draw.forEach(function(cell){
	if(typeof cell == "object"){
		ctx.drawImage(cell.img,x,y,box,box);
	}else{
		ctx.fillStyle=cell;
		ctx.fillRect(x,y,box,box);
	}
	x+=box;
	if((x+box)>id("a").width){
	  x=0;
	  y+=box;
	}
  });
  if(keys[0]){
    if(guyY-1 > 0){
      guyY-=speed*delta;
    }
  }
  if(keys[1]){
    if(guyY+1 < id("a").height){
      guyY+=speed*delta;
    }
  }
  if(keys[2]){
    if(guyX-1 > 0){
      guyX-=speed*delta;
    }
  }
  if(keys[3]){
    if(guyX+1 < id("a").width){
      guyX+=speed*delta;
    }
  }

  /*ctx.fillStyle="black";
  ctx.beginPath();
  ctx.arc(guyX,guyY,box*1/3,0,Math.PI*2,true);
  ctx.closePath();
  ctx.fill();*/

  // Simulate people
  if(getRandomInt(0,100+1)<3){
  //if(DEBUG_GENERATE_PEOPLE){
	DEBUG_GENERATE_PEOPLE=false;
	var available=people.filter(function(per){
		return !per.show;
	});
	var index=getRandomInt(0,available.length);
	if(index > 0){
		available[index].show=true;
		// CALCULAR INICIO ALEATORIAMENTE
		var initPath=calculateRandomRoad();
		var endPath=calculateRandomRoad();
		
		// CALCULAR FINAL ALEATORIAMENTE
		easystar.findPath(initPath[0],initPath[1],endPath[0],endPath[1],function(path){
			available[index].path=path;
			available[index].pos=0;
			if(path==null || path[0]==undefined){
				//console.log("Ruta con NULL: ("+initPath[0]+","+initPath[1]+") TO ("+endPath[0]+","+endPath[1]+")");
				available[index].path=[];
				available[index].show=false;
			}else{
				available[index].x=path[0].x;
				available[index].y=path[0].y;
			}
		});
	}
  
  }
  easystar.calculate();

  people.forEach(function(person){
    if(person.show){
      ctx.drawImage(person.img,box*person.x,box*person.y,box*2/3,box*2/3);
      if(person.voteChanged){
		ctx.fillStyle="rgba(255,255,0,0.5)";
		ctx.fillRect(box*person.x,box*person.y,box*2/3,box*2/3);  
	  }
    }
  });
  
  ctx.drawImage(dron,guyX,guyY,box*2/3,box*2/3);
  
  // Draw Action Radio
  if(actionRadio.show){
	ctx.strokeStyle=actionRadio.color;
	ctx.lineWidth=box*1/3;
	ctx.beginPath();
	ctx.arc(actionRadio.x,actionRadio.y,actionRadio.current,0,Math.PI*2,true);
	ctx.closePath();
	ctx.stroke();
	actionRadio.current+=actionRadio.speed*box;
	if(actionRadio.current > actionRadio.radius){
		// Do ACTION
		actionRadio.show=false;
		money-=actionRadio.price;
		if(money < 0){
			write("You have wasted all the money!");
			gameOver=true;
			clearInterval(time);
		}
		var filtered=people.map(function(pp){
			if(pp.show && (actionRadio.x-actionRadio.radius) < pp.x*box && pp.x*box < (actionRadio.x+actionRadio.radius)){
				if((actionRadio.y-actionRadio.radius) < pp.y*box && pp.y*box < (actionRadio.y+actionRadio.radius)){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		});
		filtered.forEach(function(pp,index){
			if(pp === true){
				if(getRandomInt(0,100+1) < actionRadio.prop){
					if(people[index].vote !== 1){
						people[index].vote=1;
						people[index].voteChanged=true;
					}
				}
			}
		});
	}
  }

  //ctx.drawImage(boy,box,box*17,box*2/3,box*2/3);
  //ctx.drawImage(girl,0,box*17,box*2/3,box*2/3);

  // Update votes value
  var votes=people.reduce(function(prev,current){
    return prev+current.vote;
  },0);
  if(votes > 50){
	// WIN
	gameOver=true;
	write("Yeah!! You have more than a half votes. You can be the next mayor of the city. You have scored: "+money+" points");
	clearInterval(time);
  }
  
  v=votes;
  
  // DRAW HUD
  
  ctx.lineWidth=box*1/10;
  
  ctx.fillStyle="green";
  ctx.strokeStyle="black";
  ctx.strokeRect(0,box*18,box*5,box*3/4);
  ctx.fillRect(0,box*18,(box*5*t)/120,box*3/4);
  ctx.fillStyle="black";
  ctx.fillText("Time",0,box*18);
  
  ctx.fillStyle="red";
  ctx.strokeStyle="black";
  ctx.strokeRect(box*5,box*18,box*5,box*3/4);
  ctx.fillRect(box*5,box*18,(box*5*v)/51,box*3/4);
  ctx.fillStyle="black";
  ctx.fillText("Votes",box*5,box*18);
  
  ctx.fillStyle="pink";
  ctx.strokeStyle="black";
  ctx.strokeRect(box*10,box*18,box*5,box*3/4);
  ctx.fillRect(box*10,box*18,(box*5*money)/200000,box*3/4);
  ctx.fillStyle="black";
  ctx.fillText("Money",box*10,box*18);
  
  ctx.fillText("WASD - Move, VBNM - Different attacks",box*15,(box*18)+10);

  if(!gameOver)
	requestAnimationFrame(loop);
}

function main(){
	// SCREEN 360x640 is MINIMUM
  // Sound?
  ctx=id("a").getContext("2d");
  //id("a").height=id("a").width*3/4;
  id("a").height=window.innerHeight;
  id("a").width=window.innerHeight/(3/4);
  box=id("a").width/25;
  guyX=box;
  guyY=box;
  
  ctx.fillStyle="rgb(91, 196, 124)";
  ctx.fillRect(0,0,id("a").width,id("a").width*3/4);
  //id("a").height+=75;
  
  //ctx.fillStyle="rgba(47,87,220,0.8)";
  //ctx.fillRect(0,id("a").height*3/4,id("a"),75);
  
  write("Welcome to MissCity - The reversed SsimCity - js13k",function(){
	  write("Look! It's Euralia. It's like the perfect city. Darío Paz is the perfect mayor... but not for us",function(){
		  write("Our company, Encisa, is trying to build a super mall in an old house. ",function(){
			  write("The mayor however has promised that if he wins the elections, he will do a library",function(){
				  write("We must stop it! You have a week (2 minutes) to win the elections. Use our dron!!",function(){
					  
				});
			  });
		  });
	  });
  });

  // Draw city
  // 0 is nothing
  // 1 is road
  // 2 - Green are houses
  // 3 - Blue are stores
  // 4 - Orange is industry

  time=setInterval(function(){
    t+=1;
    console.log("Money - "+money+ " | Votes - "+v+ "%");
    if(t==120){
      // END GAME
      write("Elections day! - Darío Paz continues as mayor. You have lost!! Maybe trying again...");
      gameOver=true;
      clearInterval(time);
    }
  },1000);

  window.onkeyup=function(evt){
	if(lock)
		lock=false;
    key(evt,0);
  }
  window.onkeydown=function(evt){
    key(evt,1);
    switch(evt.key){
		case "v": z1();break;
		case "b": z2();break;
		case "n": z3();break;
		case "m": z4();break;
	}
  }

  var grid=[];
  var q=-1;
  for(var m=0;m<city.length;m++){
    if(m % 25 == 0){
      grid.push(new Array);
      q++;
    }
    grid[q].push(city[m]);
  }
  console.log(grid);

  easystar.setGrid(grid);
  easystar.setAcceptableTiles([1]);

  // Generate 100 or more
  for(var k=0;k<100;k++){
    people.push({
      img: boy,
      vote: 0,
      path: [],
      pos: 0,
      x: 0,
      y: 0,
      voteChanged: false
    });
  }
  people.forEach(function(p){
    if(getRandomInt(1,100+1)>20){
      p.vote=0;
    }else{
      p.vote=1;
    }
    if(getRandomInt(1,2+1)==1){
      p.img=boy;
    }else{
      p.img=girl;
    }
  });

  lastCalledTime = Date.now();
  requestAnimationFrame(loop);
  
  setInterval(function(){
	people.forEach(function(person){
		if(person.path.length-1 > person.pos){
			person.pos++;
			person.x=person.path[person.pos].x;
			person.y=person.path[person.pos].y;
		}
		if(person.path.length-1 == person.pos){
			person.show=false;
		}
		if(person.voteChanged)
			person.voteChanged=false;
	});
  },1000);
}

window.onload=main;

/* TODO - SFX */
/* TODO - New Layout */
/* TODO - Mobile */
