function id(i){
  return document.getElementById(i);
}
function write(str){
  var scroll=id("m");
  scroll.value+="\n"+str;
  scroll.scrollTop=scroll.scrollHeight;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var keys=[0,0,0,0];
var box, ctx;
var guy, guyY;
var rotation=0;
var people=[];
var easystar=new EasyStar.js();
var dron=new Image;
dron.src="dron.gif";
var boy= new Image, girl=new Image;
boy.src="boy.gif";
girl.src="girl.gif";
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

function key(evt,state){
  switch(evt.key){
    case "w" : keys[0]=state;break;
    case "s" : keys[1]=state;break;
    case "a" : keys[2]=state;break;
    case "d" : keys[3]=state;break;
  }
}

function loop(){
  id("z1").onclick=function(){

  }
  id("z2").onclick=function(){

  }
  id("z3").onclick=function(){

  }
  id("z4").onclick=function(){

  }

  // Render
  var draw=city.map(function(val){
    switch(val){
      case 0: return "rgba(91,196,124,1)";
      case 1: return "rgb(76, 77, 76)";
      case 2: return "rgb(84, 230, 54)";
      case 3: return "rgb(37, 88, 219)";
      case 4: return "rgb(223, 155, 23)";
    }
  });
  var x=0,y=0;
  draw.forEach(function(cell){
    ctx.fillStyle=cell;
    ctx.fillRect(x,y,box,box);
    x+=box;
    if((x+box)>id("a").width){
      x=0;
      y+=box;
    }
  });
  if(keys[0]){
    if(guyY-1 > 0){
      guyY--;
    }
  }
  if(keys[1]){
    if(guyY+1 < id("a").height){
      guyY++;
    }
  }
  if(keys[2]){
    if(guyX-1 > 0){
      guyX--;
    }
  }
  if(keys[3]){
    if(guyX+1 < id("a").width){
      guyX++;
    }
  }

  /*ctx.fillStyle="black";
  ctx.beginPath();
  ctx.arc(guyX,guyY,box*1/3,0,Math.PI*2,true);
  ctx.closePath();
  ctx.fill();*/
  ctx.drawImage(dron,guyX,guyY,box*2/3,box*2/3);

  // Simulate people

/* TODO - TODO - TODO */
/*  people.forEach(function(person){
    var available=person.filter(function(per){
      return !per.show;
    });
    var index=getRandomInt(0,available.length);
    available[index].show=true;
    // CALCULAR INICIO ALEATORIAMENTE

    // CALCULAR FINAL ALEATORIAMENTE
  });*/
  /*easystar.findPath(0,0,6,1,function(path){
    //console.log(path);
    // Path is an array of objects {x, y}
  });*/
  easystar.calculate();

  people.forEach(function(person){
    if(person.show){
      ctx.drawImage(person.img,box*person.x,box*person.y,box*2/3,box*2/3);
    }
  });

  //ctx.drawImage(boy,box,box*17,box*2/3,box*2/3);
  //ctx.drawImage(girl,0,box*17,box*2/3,box*2/3);

  // Update votes value
  var votes=people.reduce(function(prev,current){
    return prev+current.vote;
  },0);
  id("v").value=votes;

  requestAnimationFrame(loop);
}

function main(){
  // Sound?
  id("m").value="";
  write("Welcome to MissCity - The reversed SsimCity - js13k");
  write("-----------------------------------------------");
  write("Look! It's Euralia. It's like the perfect city. Darío Paz is the perfect mayor... but not for us");
  write("Our company, Encisa, is trying to build a super mall in an old house. The mayor however has promised that if he wins the elections, he will do a library");
  write("We must stop it! You have a week (15 minutes) to win the elections. Use our dron!!");
  id("a").height=id("a").width*3/4;
  box=id("a").width/25;
  guyX=box;
  guyY=box;
  ctx=id("a").getContext("2d");
  ctx.fillStyle="rgb(91, 196, 124)";
  ctx.fillRect(0,0,id("a").width,id("a").width*3/4);

  // Draw city
  // 0 is nothing
  // 1 is road
  // 2 - Green are houses
  // 3 - Blue are stores
  // 4 - Orange is industry

  var time=setInterval(function(){
    id("t").value+=1;
    if(id("t").value==15){
      // END GAME
      write("Elections day! - Darío Paz continues as mayor. You have lost!! Maybe trying again...");
      clearInterval(time);
    }
  },1000*60);

  window.onkeyup=function(evt){
    key(evt,0);
  }
  window.onkeydown=function(evt){
    key(evt,1);
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
      x: 0,
      y: 0
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

  requestAnimationFrame(loop);
}

window.onload=main;
