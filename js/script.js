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
  document.getElementById("ptsSC").innerHTML = (player.points.gte(getPointsGainSoftcapStart()) ? `<br>Points gain ` + (getPointsGainSoftcapExp().eq(1/0) ? `is hardcapped at ` + format(getPointsGainSoftcapStart()) : `past ` + format(getPointsGainSoftcapStart()) + ` are Exponent<sup>2</sup> ` + format(getPointsGainSoftcapExp(),4) + `th rooted`) : "")
  document.getElementById("ptsPrefix").style.display = (player.points.gte("ee3")&&!AFactived ? "none" : "initial")
  document.getElementById("ptsSuffix").style.display = (player.points.gte("ee6")&&!AFactived ? "none" : "initial")
  document.getElementById("pps").innerHTML = getProductionRateDisplay(player.points, getPointsGain())
  document.getElementById("z").innerHTML = (AFactived?"Dimensional Incremental":"Dimensional Incremental | " + format(player.points,player.options.notationOption[0],false,false,false) + " points, " + formatWhole(player.prestige[player.subtab[1]],player.options.notationOption[0],false,false,false) + " " + resourceName[player.subtab[1]])
  document.getElementById("tab2").style.display = (player.prestige[1].gte(1027) || player.dimShift >= 1?"inline-block":"none")
  document.getElementById("tab1st2").style.display = (player.dimShift >= 1?"inline-block":"none")
  document.getElementById("tab1st2_2").style.display = (player.milestone[2].includes(2)?"inline-block":"none")
  document.getElementById("tab1st2_3").style.display = (player.milestone[2].includes(5)?"inline-block":"none")
  if (player.tab==1) for (let i=1;i<=amtLayers;i++){
    document.getElementById("tab1st" + i).style.borderColor = (AFactived ? "#000000" : ((LAYERS.canGainMax(i) ? LAYERS.gain(i).gt(0) : LAYERS.canReset(i)) ? "#00FF00":"#FF0000"))
    if (i==player.subtab[1]){ // Update based on current subtab
      document.getElementById("layer" + i + "amt").innerHTML = formatWhole(player.prestige[i])
      document.getElementById("layer" + i + "reset").style.borderColor = (AFactived ? "#000000":((LAYERS.canGainMax(i) ? LAYERS.gain(i).gt(0) : LAYERS.canReset(i)) ? "#00FF00":"#FF0000"))
      document.getElementById("layer" + i + "gain").innerHTML = formatWhole(LAYERS.gain(i))
      document.getElementById("layer" + i + "req").innerHTML = format(LAYERS.canGainMax(i)?LAYERS.nextReq(i):LAYERS.req(i))
      document.getElementById("layer" + i + "base").innerHTML = format(LAYERS.base(i))
      document.getElementById("layer" + i + "eff").innerHTML = format(LAYERS.eff(i))
      document.getElementById("layer" + i + "extra").innerHTML = LAYERS.canGainMax(i)?"Next at":"Require"
      document.getElementById("layer" + i + "sc").style.display = (player.prestige[i].gte(LAYERS.gainSoftcap(i)) && !AFactived) ? "initial" : "none"
      document.getElementById("layer" + i + "sc").style.color = (AFactived ? "#000000" : "#FF0000")
      document.getElementById("layer" + i + "sc").innerHTML = LAYERS.softcapExp(i).eq(1/0) ? resourceNameCapital[i] + ` amount are hardcapped at <b>` + format(LAYERS.gainSoftcap(i)) + `</b><br>` : resourceNameCapital[i] + ` amount past <b>` + format(LAYERS.gainSoftcap(i)) + `</b> are <b>` + format(LAYERS.softcapExp(i),4) + `</b>th rooted.<br>`
      for (let j=1;j<=loadUpgrades[i];j++){ // upgrades
        // border
        document.getElementById("layer" + i + "upg" + j).style.borderColor = (AFactived ? "#000000" : (player.upgrade[i].includes(j) || canAffordUpgrade(i,j) ? "#00FF00" : "#FF0000"))
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
        document.getElementById("layer" + i + "buyable" + j).style.borderColor = (AFactived ? "#000000" : (canAffordBuyable(i,j) ? "#00FF00" : "#FF0000"))
        // visibly
        document.getElementById("layer" + i + "buyable" + j).style.display = (buyableShow(i,j)?"inline-block":"none")
        document.getElementById("layer" + i + "buyable" + j + "desc").innerHTML = buyableDescription(i,j)
        document.getElementById("layer" + i + "buyable" + j + "eff").innerHTML = effectDisplay(buyableEffect(i,j),displayBuyableAccuracy[i][j],buyableEffectType(i,j))
        document.getElementById("layer" + i + "buyable" + j + "level").innerHTML = formatWhole(player.buyables[i][j]) + (freeBuyableLevel(i,j).eq(0) ? "" : " + " + format(freeBuyableLevel(i,j)))
        document.getElementById("layer" + i + "buyable" + j + "cost").innerHTML = buyableCostDisplay(i,j)
      }
      for (let j=1;j<=loadMilestones[i];j++){ // milestones
        document.getElementById("layer" + i + "milestone" + j).style.color = player.milestone[i].includes(j) && !AFactived ? "#00FF00" : "#000000"
        document.getElementById("layer" + i + "milestone" + j).style.fontWeight = player.milestone[i].includes(j) && !AFactived ? "700" : "400"
        document.getElementById("layer" + i + "milestone" + j).style.display = milestoneShow(i,j) ? "inline-block" : "none"
        document.getElementById("layer" + i + "milestone" + j + "req").innerHTML = milestoneReq(i,j)
        document.getElementById("layer" + i + "milestone" + j + "desc").innerHTML = milestoneDescription(i,j)
      }
    }
    if (i==2){ // Layer 2
      document.getElementById("lineSegAmt").innerHTML = format(player.lineSegments)
      document.getElementById("lineSegProd").innerHTML = getProductionRateDisplay(player.lineSegments,LAYERS.lineSegGain())
      document.getElementById("lineSegEff").innerHTML = format(LAYERS.lineSegEff(), 4)
      document.getElementById("lineSegExp1").innerHTML = format(LAYERS.lineSegGainExp()[0])
      document.getElementById("lineSegExp2").innerHTML = format(LAYERS.lineSegGainExp()[1])
      document.getElementById("lineSegMulti").innerHTML = format(LAYERS.lineSegGainMulti())
      document.getElementById("lineSegPow").innerHTML = format(LAYERS.lineSegGainPow(),4)
      document.getElementById("lineSegCap").innerHTML = formatWhole(LAYERS.lineSegCap())

      document.getElementById("stringReset").style.borderColor = (AFactived ? "#000000" : (LAYERS.canStringReset()?"#00FF00":"#FF0000"))
      document.getElementById("lineSegAmt2").innerHTML = format(player.lineSegments)
      document.getElementById("stringLength").innerHTML = formatLength(player.string.mul(pL))
      document.getElementById("stringGain").innerHTML = formatLength(LAYERS.stringGain().sub(player.string).max(0).mul(pL))
      document.getElementById("stringReq").innerHTML = format(LAYERS.stringReq(LAYERS.stringGain().max(player.string)))
      document.getElementById("stringEff").innerHTML = format(LAYERS.stringEff(), 4)
    }
  }
  if (player.tab==2){
    document.getElementById("dimShiftAmt").innerHTML = formatWhole(player.dimShift)
    document.getElementById("dimShift").style.borderColor = (AFactived ? "#000000" : (player.points.gte(getDimShiftCost(player.dimShift))?"#00FF00":"#FF0000"))
    document.getElementById("dimShiftReq").innerHTML = format(getDimShiftCost(player.dimShift))
  }
  if (player.tab==0){
    if (AFactived){
      for (let i=0;i<=3;i++){
        document.getElementById("save" + i).style.borderColor="#000000"
      }
      for (let i=0;i<=13;i++){
        document.getElementById("notationOpt" + i).style.color="#000000"
      }
      for (let i=1;i<=2;i++){
        document.getElementById("notationOptG" + i).style.color="#000000"
      }
    }
    document.getElementById("ver").innerHTML = player.majorVer + "." + player.version + (player.version2 || player.version3 ? "." + player.version2 + (player.version3 ? "." + player.version3 : "") : "") + 
    (player.patchVer ? " Patch " + player.patchVer : "") + (player.updateName ? " - " + player.updateName : "") 
    document.getElementById("notation-select").style.color = (AFactived ? "#000000" : player.options.notation < 8.5 ? "green" : "maroon")
    for (let i=1;i<=2;i++){
      document.getElementById("option" + i).innerHTML = optionList[i][player.options[optionName[i]]]
    }
    for (let i=0;i<=5;i++){
      document.getElementById("accuracy" + i).innerHTML = (AFactived ? "" : player.options.notationOption[i])
    }
    document.getElementById("accuracy5_1").innerHTML = (AFactived ? "" : player.options.notationOption[5])
    document.getElementById("endgame").innerHTML = 
    format("e5.3e45") + " points, " + 
    formatWhole(4.45e16) + " Dots, " + 
    formatWhole(7) + " Lines, " + 
    format(3.95e172) + " Line Segments and " + 
    formatLength(pL.mul(72700)) + " of String"
    document.getElementById("endgameProgression").innerHTML = format(slogadd(player.points.max(10),-2).div(slogadd("e5.3e45",-2)).mul(100).min(100),4)
  }
  if (player.tab==100){
    document.getElementById("stats").innerHTML = (AFactived ? "" : getStatHTML())
  }
}
      
const resourceName=[null,"dots","lines"]
const resourceNameCapital=[null,"Dots","Lines"]
const optionList=[["Default","Standard","Mixed","Up arrow","Standard (Up arrow)","Mixed (Up arrow)","Bird array","Letter (UCF)","Letter (BCF)","Number Troll","Letter Troll","Base64","Reverse","???"],["Off","On"],["Off","On"]]
const optionName=["notation","debug","fullStandard"]

loadGame(localStorage.getItem(saveId))