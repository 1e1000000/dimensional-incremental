function getPointsGain(){
  let gain = new ExpantaNum(layerEff(1))
  return gain
}

const upgradeCost1 = 
      [null,
       [new ExpantaNum(30),new ExpantaNum(1.5e4),new ExpantaNum(1e23),new ExpantaNum("2e643")]
      ]
const upgradeCost2 = 
      [null,
       [new ExpantaNum(3),new ExpantaNum(4),new ExpantaNum(9),new ExpantaNum(130)]
      ]

function canAffordUpgrade(layer,id){
  if (player["upgrade" + layer][id]) return false // upgrade already bought
  if (upgradeCost1[layer][id] == undefined || upgradeCost2[layer][id] == undefined) return false // upgrade not found
  switch(layer) {
  case 1:
      if (player.points.lt(upgradeCost1[layer][id]) || player.prestige1.lt(upgradeCost2[layer][id])) return false // not enough require
      else return true
      break;
  default: // layer not found
      return false
  }
}

function buyUpgrade(layer,id){
  switch(layer) {
  case 1:
      if (!canAffordUpgrade(layer,id)) return
      player.upgrade1[id] = true
      player.points = player.points.sub(upgradeCost1[layer][id])
      player.prestige1 = player.prestige1.sub(upgradeCost2[layer][id])
      if (player.points.lt(1) && player.prestige1.eq(0)) player.points = new ExpantaNum(1) // prevent softlock
  break;
  default: // layer not found
      return
  }
}

function upgradeEffect(layer,id){
  switch(layer) {
  case 1:
      switch(id) {
      case 0:
          return player.prestige1.max(1).tetr(2)
      break;
      case 1:
          return player.points.max(10).logBase(10).pow(player.prestige1.max(1))
      break;
      case 2:
          return player.points.max(1e10).logBase(10).logBase(10)
      break;
      case 3:
          return player.prestige1.max(10).logBase(10).mul(0.032).add(1)
      break;
      default: // upgrade not found
          return new ExpantaNum(1)
      }
  break;
  default: // layer not found
      return new ExpantaNum(1)
  }
}

function upgradeShow(layer,id){
  switch(layer) {
  case 1:
      switch(id) {
      case 0:
          return player.prestige1.gte(2) || player.upgrade1[0]
      break;
      case 1:
          return player.upgrade1[0]
      break;
      case 2:
          return player.upgrade1[1]
      break;
      case 3:
          return player.upgrade1[2]
      break;
      default: // upgrade not found
          return false
      }
  break;
  default: // layer not found
      return false
  }
}

const displayUpgradeAccuracy = 
      [null,
       [2,2,4,4]
      ]