/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
    var diff = 0;
    var date = Date.now();
    var player

    window.setInterval(function() {
      loop()
    }, 10)
      
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
      for (let i=1;i<=1;i++){
        document.getElementById("layer" + i + "amt").innerHTML = formatWhole(player.prestige[i])
        document.getElementById("layer" + i + "reset").style.borderColor = (canReset(i)?"#00FF00":"#FF0000")
        document.getElementById("layer" + i + "gain").innerHTML = formatWhole(prestigeGain(i))
        document.getElementById("layer" + i + "req").innerHTML = format(canGainMax(i)?nextPrestigeReq(i):prestigeReq(i))
        document.getElementById("layer" + i + "eff").innerHTML = format(layerEff(i))
        document.getElementById("layer" + i + "extra").innerHTML = canGainMax(i)?"Next at":"Require"
        for (let j=1;j<=loadUpgrades[i];j++){
          // border
          if (player.upgrade[i].includes(j)) document.getElementById("layer" + i + "upg" + j).style.borderColor = "#00FF00"
          else if (canAffordUpgrade(i,j)) document.getElementById("layer" + i + "upg" + j).style.borderColor = "#00FF00"
          else document.getElementById("layer" + i + "upg" + j).style.borderColor = "#FF0000"
          // background
          if (player.upgrade[i].includes(j)) document.getElementById("layer" + i + "upg" + j).style.backgroundColor = "#00FF00"
          // visibly
          document.getElementById("layer" + i + "upg" + j).style.display = (upgradeShow(i,j)?"inline-block":"none")
          document.getElementById("layer" + i + "upg" + j + "eff").innerHTML = format(upgradeEffect(i,j),displayUpgradeAccuracy[i][j])
        }
      }
      document.getElementById("tab2").style.display = (player.points.gte("e17500")?"inline-block":"none")
      document.getElementById("tab1st2").style.display = (false?"inline-block":"none")
      document.getElementById("ver").innerHTML = player.majorVer + "." + player.version + (player.version2 || player.version3 ? "." + player.version2 + (player.version3 ? "." + player.version3 : "") : "") + (player.patchVer ? " Patch " + player.patch : "") 
    }
      
const loadUpgrades=[null,4]

loadGame(localStorage.getItem(saveId))