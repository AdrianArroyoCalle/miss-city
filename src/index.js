function id(i){
  return document.getElementById(i);
}
function write(str){
  var scroll=id("m");
  scroll.value+="\n"+str;
  scroll.scrollTop=scroll.scrollHeight;
}

var keys=[0,0,0,0];
var box;
var ctx;
var city=[
  0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // 25
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // 9 - the half
  0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,
  0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,
  0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,
  0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,
  0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
  0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,
  0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,
  1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0
];

function key(evt,state){
  switch(evt.keyCode){
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
      case 0: return "rgba(91,196,124,0)";
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
}

function main(){
  id("m").value="";
  write("Welcome to MissCity - The reversed SsimCity - js13k");
  write("-----------------------------------------------");
  write("Look! It's Euralia. It's like the perfect city. Darío Paz is the perfect mayor... but not for us");
  write("Our company, Encisa, is trying to build a super mall in an old house. The mayor however has promised that if he wins the elections, he will do a library");
  write("We must stop it! You have a week (15 minutes) to win the elections. Do whatever you want!");
  id("a").height=id("a").width*3/4;
  box=id("a").width/25;
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
    }
  },1000*60);

  window.onkeyup=function(evt){
    key(evt,0);
  }
  window.onkeydown=function(evt){
    key(evt,1);
  }

  requestAnimationFrame(loop);
}

window.onload=main;
