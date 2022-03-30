function tab(x){
    player.tab = x
    document.getElementById("Tab1").style.display = "none";
    document.getElementById("Tab0").style.display = "none";
    document.getElementById("Tab2").style.display = "none";
    document.getElementById("Tab100").style.display = "none";
    document.getElementById("Tab" + x).style.display = "block";
  }
  
function subtab(x,y){
  player.subtab[x] = y
  for (let i=1;i<=loadSubtabs[x];i++){
    document.getElementById("Tab" + x + "St" + i).style.display = "none";
  }
  document.getElementById("Tab" + x + "St" + y).style.display = "block";
}

function subsubtab(x,y,z){
  player.subsubtab[x][y] = z
  for (let i=1;i<=loadSubSubtabs[x][y];i++){
    document.getElementById("Tab" + x + "St" + y + "_" + i).style.display = "none";
  }
  document.getElementById("Tab" + x + "St" + y + "_" + z).style.display = "block";
}

const loadSubtabs=[null,2]
const loadSubSubtabs=[null,[null,1,3]]