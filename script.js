/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
window.setInterval(function() {
  let now=Date.now()
  loop((now-player.lastTick)/1000)
  player.lastTick=now
}, 10)

function loop(s){
  player.points = new ExpantaNum(player.points).add(getPointsGain().mul(s))
  document.getElementById("points").innerHTML = format(player.points)
  document.getElementById("pps").innerHTML = format(getPointsGain())
  document.getElementById("z").innerHTML = format(player.points) + " points, " + formatWhole(player.prestige1) + " dots"
  for (let i=1;i<=1;i++){
    document.getElementById("layer" + i + "amt").innerHTML = formatWhole(player["prestige" + i])
    document.getElementById("layer" + i + "reset").style.borderColor = (canReset(i)?"#00FF00":"#FF0000")
    document.getElementById("layer" + i + "gain").innerHTML = formatWhole(prestigeGain(i))
    document.getElementById("layer" + i + "req").innerHTML = format(canGainMax(i)?nextPrestigeReq(i):prestigeReq(i))
    document.getElementById("layer" + i + "eff").innerHTML = format(layerEff(i))
    document.getElementById("layer" + i + "extra").innerHTML = canGainMax(i)?"Next at":"Require"
    for (let j=0;j<=loadUpgrades[i]-1;j++){
      // border
      if (player["upgrade" + i][j]) document.getElementById("layer" + i + "upg" + j).style.borderColor = "#00FF00"
      else if (canAffordUpgrade(i,j)) document.getElementById("layer" + i + "upg" + j).style.borderColor = "#00FF00"
      else document.getElementById("layer" + i + "upg" + j).style.borderColor = "#FF0000"
      // background
      if (player["upgrade" + i][j]) document.getElementById("layer" + i + "upg" + j).style.backgroundColor = "#00FF00"
      // visibly
      document.getElementById("layer" + i + "upg" + j).style.display = (upgradeShow(i,j)?"inline-block":"none")
      document.getElementById("layer" + i + "upg" + j + "eff").innerHTML = format(upgradeEffect(i,j),displayUpgradeAccuracy[i][j])
    }
  }
  document.getElementById("tab2").style.display = (player.points.gte("e17500")?"inline-block":"none")
}

const loadUpgrades=[null,4]