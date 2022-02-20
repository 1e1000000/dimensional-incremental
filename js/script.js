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
  document.documentElement.style.setProperty('--font', player.options.font)
  document.getElementById("currFont").innerHTML = Boolean(player.options.font) ? player.options.font : "Google Default"
  if (tmp.offlineActive){
    document.getElementById("offMsg").style.display = "block"
    document.getElementById("offSpeed").innerHTML = formatDefault(tmp.offlineMult,3)
  } else {
    document.getElementById("offMsg").style.display = "none"
    document.getElementById("offSpeed").innerHTML = ""
  }
  if (getGameSpeed().eq(1) && player.dev.devSpeed.eq(1)){
    document.getElementById("speedMsg").style.display = "none"
    document.getElementById("speedMsg").innerHTML = ""
  } else {
    document.getElementById("speedMsg").style.display = "block"
    document.getElementById("speedMsg").innerHTML = getGameSpeedHTML()
  }
  document.getElementById("points").innerHTML = format(player.points)
  document.getElementById("ptsPrefix").style.display = (player.points.gte("ee3") ? "none" : "initial")
  document.getElementById("ptsSuffix").style.display = (player.points.gte("ee6") ? "none" : "initial")
  document.getElementById("pps").innerHTML = getProductionRateDisplay(player.points, getPointsGain())
  document.getElementById("z").innerHTML = "Dimensional Incremental | " + format(player.points) + " points, " + formatWhole(player.prestige[player.subtab[1]]) + " " + resourceName[player.subtab[1]]
  document.getElementById("tab2").style.display = (player.prestige[1].gte(1027) || player.dimShift >= 1?"inline-block":"none")
  document.getElementById("tab1st2").style.display = (player.dimShift >= 1?"inline-block":"none")
  document.getElementById("tab1st2_2").style.display = (player.milestone[2].includes(2)?"inline-block":"none")
  if (player.tab==1) for (let i=1;i<=amtLayers;i++){
    if (i==player.subtab[1]){ // Update based on current subtab
      document.getElementById("layer" + i + "amt").innerHTML = formatWhole(player.prestige[i])
      document.getElementById("layer" + i + "reset").style.borderColor = (LAYERS.canReset(i)?"#00FF00":"#FF0000")
      document.getElementById("layer" + i + "gain").innerHTML = formatWhole(LAYERS.gain(i))
      document.getElementById("layer" + i + "req").innerHTML = format(LAYERS.canGainMax(i)?LAYERS.nextReq(i):LAYERS.req(i))
      document.getElementById("layer" + i + "base").innerHTML = format(LAYERS.base(i))
      document.getElementById("layer" + i + "eff").innerHTML = format(LAYERS.eff(i))
      document.getElementById("layer" + i + "extra").innerHTML = LAYERS.canGainMax(i)?"Next at":"Require"
      document.getElementById("layer" + i + "sc").style.display = player.prestige[i].gte(LAYERS.gainSoftcap(i)) ? "initial" : "none"
      document.getElementById("layer" + i + "sc").innerHTML = LAYERS.softcapExp(i).eq(1/0) ? resourceNameCapital[i] + ` amount are hardcapped at <b>` + format(LAYERS.gainSoftcap(i)) + `</b><br>` : resourceNameCapital[i] + ` amount past <b>` + format(LAYERS.gainSoftcap(i)) + `</b> are <b>` + format(LAYERS.softcapExp(i),4) + `</b>th rooted.<br>`
      for (let j=1;j<=loadUpgrades[i];j++){ // upgrades
        // border
        document.getElementById("layer" + i + "upg" + j).style.borderColor = (player.upgrade[i].includes(j) || canAffordUpgrade(i,j) ? "#00FF00" : "#FF0000")
        // background
        upgradeStyle(i,j)
        // visibly
        document.getElementById("layer" + i + "upg" + j).style.display = (upgradeShow(i,j)?"inline-block":"none")
        document.getElementById("layer" + i + "upg" + j + "desc").innerHTML = upgradeDescription(i,j)
        document.getElementById("layer" + i + "upg" + j + "eff").innerHTML = effectDisplay(upgradeEffect(i,j),displayUpgradeAccuracy[i][j],upgradeEffectType(i,j))
        document.getElementById("layer" + i + "upg" + j + "cost").innerHTML = upgradeCostDisplay(i,j)
      }
      for (let j=1;j<=loadBuyables[i];j++){ // buyables
        // border
        document.getElementById("layer" + i + "buyable" + j).style.borderColor = (canAffordBuyable(i,j) ? "#00FF00" : "#FF0000")
        // visibly
        document.getElementById("layer" + i + "buyable" + j).style.display = (buyableShow(i,j)?"inline-block":"none")
        document.getElementById("layer" + i + "buyable" + j + "desc").innerHTML = buyableDescription(i,j)
        document.getElementById("layer" + i + "buyable" + j + "eff").innerHTML = effectDisplay(buyableEffect(i,j),displayBuyableAccuracy[i][j],buyableEffectType(i,j))
        document.getElementById("layer" + i + "buyable" + j + "level").innerHTML = formatWhole(player.buyables[i][j])
        document.getElementById("layer" + i + "buyable" + j + "cost").innerHTML = buyableCostDisplay(i,j)
      }
      for (let j=1;j<=loadMilestones[i];j++){ // milestones
        document.getElementById("layer" + i + "milestone" + j).style.color = player.milestone[i].includes(j) ? "#00FF00" : "#000000"
        document.getElementById("layer" + i + "milestone" + j).style.fontWeight = player.milestone[i].includes(j) ? "bold" : "regular"
        document.getElementById("layer" + i + "milestone" + j).style.display = milestoneShow(i,j) ? "inline-block" : "none"
        document.getElementById("layer" + i + "milestone" + j + "req").innerHTML = milestoneReq(i,j)
        document.getElementById("layer" + i + "milestone" + j + "desc").innerHTML = milestoneDescription(i,j)
      }
    }
    if (i==2){ // Layer 2
      document.getElementById("lineSegAmt").innerHTML = format(player.lineSegments)
      document.getElementById("lineSegProd").innerHTML = format(LAYERS.lineSegGain())
      document.getElementById("lineSegEff").innerHTML = format(LAYERS.lineSegEff(), 4)
      document.getElementById("lineSegExp1").innerHTML = format(LAYERS.lineSegGainExp()[0])
      document.getElementById("lineSegExp2").innerHTML = format(LAYERS.lineSegGainExp()[1])
      document.getElementById("lineSegMulti").innerHTML = format(LAYERS.lineSegGainMulti())
    }
  }
  if (player.tab==2){
    document.getElementById("dimShiftAmt").innerHTML = formatWhole(player.dimShift)
    document.getElementById("dimShift").style.borderColor = (player.points.gte(getDimShiftCost(player.dimShift))?"#00FF00":"#FF0000")
    document.getElementById("dimShiftReq").innerHTML = format(getDimShiftCost(player.dimShift))
  }
  if (player.tab==0){
    document.getElementById("ver").innerHTML = player.majorVer + "." + player.version + (player.version2 || player.version3 ? "." + player.version2 + (player.version3 ? "." + player.version3 : "") : "") + 
    (player.patchVer ? " Patch " + player.patchVer : "") + (player.updateName ? " - " + player.updateName : "") 
    document.getElementById("notation-select").style.color = player.options.notation < 8.5 ? "green" : "maroon"
    for (let i=1;i<=1;i++){
      document.getElementById("option" + i).innerHTML = optionList[i][player.options[optionName[i]]]
    }
    for (let i=0;i<=5;i++){
      document.getElementById("accuracy" + i).innerHTML = player.options.notationOption[i]
    }
    document.getElementById("endgame").innerHTML = format("e2.15e18") + " points, " + formatWhole(1.17e11) + " Dots, " + formatWhole(5) + " Lines and " + format(1e21) + " Line Segments."
  }
  if (player.tab==100){
    document.getElementById("stats").innerHTML = getStatHTML()
  }
}
      
const resourceName=[null,"dots","lines"]
const resourceNameCapital=[null,"Dots","Lines"]
const optionList=[["Default","Standard","Mixed","Up arrow","Standard (Up arrow)","Mixed (Up arrow)","Bird array","Letter (UCF)","Letter (BCF)","Number Troll","Letter Troll","Base64","Reverse","???"],["Off","On"]]
const optionName=["notation","debug"]

loadGame(localStorage.getItem(saveId))