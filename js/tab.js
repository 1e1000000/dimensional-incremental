function tab(x){
    player.tab = x
    document.getElementById("Tab1").style.display = "none";
    document.getElementById("Tab0").style.display = "none";
    document.getElementById("Tab2").style.display = "none";
    document.getElementById("Tab" + x).style.display = "block";
  }
  
  function subtab(x,y){
    player["subtab" + x] = y
    for (let i=1;i<=loadSubtabs[x];i++){
      document.getElementById("Tab" + x + "St" + i).style.display = "none";
    }
    document.getElementById("Tab" + x + "St" + y).style.display = "block";
  }
  
  const loadSubtabs=[null,2]