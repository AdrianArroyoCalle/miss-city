function writemsg(str){
  var scroll=document.getElementById("m");
  scroll.value+="\n"+str;
  scroll.scrollTop=scroll.scrollHeight;
}

function main(){
  document.getElementById("m").value="";
  writemsg("Welcome to MissCity - The reversed SsimCity - js13k");
  writemsg("-----------------------------------------------");
  writemsg("Look! It's Euralia. It's like the perfect city. Darío Paz is the perfect mayor... but not for us");
  writemsg("Our company, Encisa, is trying to build a super mall in an old house. The mayor however has promised that if he wins the elections, he will do a library");
  writemsg("We must stop it! You have a week (15 minutes) to win the elections. Do whatever you want!");
  var ctx=document.getElementById("a").getContext("2d");
}

window.addEventListener("load",main);
