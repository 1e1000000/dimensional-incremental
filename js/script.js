/* If you're feeling fancy you can add interactivity to your site with Javascript */
var diff = 0;
var date = Date.now();
var player

window.setInterval(function() {
  loop()
}, 50)

function loop(){
  diff = Date.now()-date;
  updateTemp()
  updateHTML()
  calc(diff/1000*tmp.offlineMult,diff/1000)
  date = Date.now()
  player.offline.current = date
}

function updateHTML(){
  if (tmp.offlineActive){
    document.getElementById("offMsg").style.display = "block"
    document.getElementById("offSpeed").innerHTML = format(tmp.offlineMult,3)
  } else {
    document.getElementById("offMsg").style.display = "none"
    document.getElementById("offSpeed").innerHTML = ""
  }
  document.getElementById("points").innerHTML = format(player.points)
  document.getElementById("pps").innerHTML = format(getPointsGain())
  document.getElementById("z").innerHTML = format(player.points) + " points, " + formatWhole(player.prestige[1]) + " dots"
  for (let i=1;i<=2;i++){
    document.getElementById("layer" + i + "amt").innerHTML = formatWhole(player.prestige[i])
    document.getElementById("layer" + i + "reset").style.borderColor = (LAYERS.canReset(i)?"#00FF00":"#FF0000")
    document.getElementById("layer" + i + "gain").innerHTML = formatWhole(LAYERS.gain(i))
    document.getElementById("layer" + i + "req").innerHTML = format(LAYERS.canGainMax(i)?LAYERS.nextReq(i):LAYERS.req(i))
    document.getElementById("layer" + i + "base").innerHTML = format(LAYERS.base(i))
    document.getElementById("layer" + i + "eff").innerHTML = format(LAYERS.eff(i))
    document.getElementById("layer" + i + "extra").innerHTML = LAYERS.canGainMax(i)?"Next at":"Require"
    for (let j=1;j<=loadUpgrades[i];j++){
      // border
      if (player.upgrade[i].includes(j)) document.getElementById("layer" + i + "upg" + j).style.borderColor = "#00FF00"
      else if (canAffordUpgrade(i,j)) document.getElementById("layer" + i + "upg" + j).style.borderColor = "#00FF00"
      else document.getElementById("layer" + i + "upg" + j).style.borderColor = "#FF0000"
      // background
      document.getElementById("layer" + i + "upg" + j).style.backgroundColor = player.upgrade[i].includes(j) ? "#00FF00" : "#FFFFFF"
      // visibly
      document.getElementById("layer" + i + "upg" + j).style.display = (upgradeShow(i,j)?"inline-block":"none")
      if (!doesntLoadEff[i].includes(j)) document.getElementById("layer" + i + "upg" + j + "eff").innerHTML = format(upgradeEffect(i,j),displayUpgradeAccuracy[i][j])
      switch(i){
        case 1:
          document.getElementById("layer" + i + "upg" + j + "cost").innerHTML = formatWhole(upgradeCost1[i][j]) + " points and " + formatWhole(upgradeCost2[i][j]) + " dots"
        break
        default:

      }
    }
    document.getElementById("layer1upgExtra1").innerHTML = player.upgrade[1].includes(5) ? "(Dots*" + format(upgradeEffect(1,5),4) + ")": "Dots"
    for (let j=1;j<=loadMilestones[i];j++){
      document.getElementById("layer" + i + "milestone" + j).style.color = player.milestone[i].includes(j) ? "#00FF00" : "#000000"
      document.getElementById("layer" + i + "milestone" + j).style.fontWeight = player.milestone[i].includes(j) ? "bold" : "regular"
    }
  }
  document.getElementById("dimShiftAmt").innerHTML = formatWhole(player.dimShift)
  document.getElementById("dimShift").style.borderColor = (player.points.gte(getDimShiftCost(player.dimShift))?"#00FF00":"#FF0000")
  document.getElementById("dimShiftReq").innerHTML = format(getDimShiftCost(player.dimShift))

  document.getElementById("lineSegALL").style.display = (player.milestone[2].includes(2) ? "inline-block":"none")
  document.getElementById("lineSegAmt").innerHTML = format(player.lineSegments)
  document.getElementById("lineSegProd").innerHTML = format(LAYERS.lineSegGain())
  document.getElementById("lineSegEff").innerHTML = format(LAYERS.lineSegEff(), 4)
  document.getElementById("lineSegExp1").innerHTML = format(LAYERS.lineSegGainExp()[0])
  document.getElementById("lineSegExp2").innerHTML = format(LAYERS.lineSegGainExp()[1])

  document.getElementById("tab2").style.display = (player.prestige[1].gte(1027) || player.dimShift >= 1?"inline-block":"none")
  document.getElementById("tab1st2").style.display = (player.dimShift >= 1?"inline-block":"none")
  document.getElementById("ver").innerHTML = player.majorVer + "." + player.version + (player.version2 || player.version3 ? "." + player.version2 + (player.version3 ? "." + player.version3 : "") : "") + (player.patchVer ? " Patch " + player.patchVer : "") 
}
      
const loadUpgrades=[null,8,0]
const doesntLoadEff=[null,[7],[]]
const loadMilestones=[null,0,3]

loadGame(localStorage.getItem(saveId))