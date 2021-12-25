const LAYERS = {
  reqBase(layer){
    let x
    switch(layer) {
      case 1:
        x = new ExpantaNum(1)
        return x
      break;
      case 2:
        x = new ExpantaNum(1000)
        return x
      break;
      default:
        return ExpantaNum(Infinity)
    }
  },
  reqScaling(layer){
    let x
    switch(layer) {
      case 1:
        x = new ExpantaNum(2)
        return x
      break;
      case 2:
        x = new ExpantaNum(10)
        return x
      break;
      default:
        return ExpantaNum(Infinity)
    }
  },
  reqExp(layer){
    let x
    switch(layer) {
      case 1:
        x = new ExpantaNum(2)
        return x
      break;
      case 2:
        x = new ExpantaNum(2)
        return x
      break;
      default:
        return ExpantaNum(Infinity)
    }
  },
  gainMulti(layer){
    let x
    switch(layer) {
      case 1:
        x = new ExpantaNum(1)
        if (player.upgrade[1].includes(3)) x = x.mul(upgradeEffect(1,3))
        return x
      break;
      case 2:
        x = new ExpantaNum(1)
        return x
      break;
      default:
        return ExpantaNum(1)
    }
  },
  gainSoftcap(layer){
    let x
    switch(layer) {
      case 1:
        x = new ExpantaNum(1e12)
        return x
      break;
      case 2:
        x = new ExpantaNum(1e12)
        return x
      break;
      default:
        return ExpantaNum(Infinity)
    }
  },
  softcapExp(layer){
    let x
    switch(layer) {
      case 1:
        x = new ExpantaNum(2)
        return x
      break;
      case 2:
        x = new ExpantaNum(2)
        return x
      break;
      default:
        return ExpantaNum(Infinity)
    }
  },
  base(layer){
    switch(layer) {
      case 1:
        return player.points
      break
      case 2:
        return player.prestige[1]
      break;
      default:
        return ExpantaNum(0)
    }
  },
  req(layer){
    let x
    let req
    switch(layer) {
      case 1:
      case 2:
        x = player.prestige[layer]
        if (x.gte(LAYERS.gainSoftcap(layer))) x = x.div(LAYERS.gainSoftcap(layer)).pow(LAYERS.softcapExp(layer)).mul(LAYERS.gainSoftcap(layer))
        x = x.div(LAYERS.gainMulti(layer))
        req = LAYERS.reqScaling(layer).pow(x.pow(LAYERS.reqExp(layer))).mul(LAYERS.reqBase(layer))
        return req
      break;
      default:
        return ExpantaNum(Infinity)
    }
  },
  nextReq(layer){
    let x
    let req
    switch(layer) {
      case 1:
      case 2:
        x = player.prestige[layer].add(LAYERS.canGainMax(layer)?LAYERS.gain(layer):0)
        if (x.gte(LAYERS.gainSoftcap(layer))) x = x.div(LAYERS.gainSoftcap(layer)).pow(LAYERS.softcapExp(layer)).mul(LAYERS.gainSoftcap(layer))
        x = x.div(LAYERS.gainMulti(layer))
        req = LAYERS.reqScaling(layer).pow(x.pow(LAYERS.reqExp(layer))).mul(LAYERS.reqBase(layer))
        return req
      break;
      default:
        return ExpantaNum(Infinity)
    }
  },
  canReset(layer){
    switch(layer) {
      case 1:
      case 2:
        return LAYERS.base(layer).gte(LAYERS.req(layer))
      break;
      default:
        return false
    }
  },
  canGainMax(layer){
    switch(layer) {
      case 1:
        return player.upgrade[1].includes(4) || player.milestone[2].includes(3)
      break;
      case 2:
        return false
      break;
      default:
        return false
    }
  },
  autoGain(layer){ // not implemented
    switch(layer) {
      case 1:
        return false
      break;
      case 2:
        return false
      break;
      default:
        return false
    }
  },
  resetNothing(layer){
    switch(layer) {
      case 1:
        return false
      break;
      case 2:
        return false
      break;
      default:
        return false
    }
  },
  gain(layer){
    let x
    let gain
    switch(layer) {
      case 1:
      case 2:
        x = LAYERS.base(layer).div(LAYERS.reqBase(layer)).logBase(LAYERS.reqScaling(layer)).pow(LAYERS.reqExp(layer).rec()).mul(LAYERS.gainMulti(layer)).add(1)
        if (x.gte(LAYERS.gainSoftcap(layer))) x = x.div(LAYERS.gainSoftcap(layer)).pow(LAYERS.softcapExp(layer).rec()).mul(LAYERS.gainSoftcap(layer))
        gain = x.sub(player.prestige[layer])
        if (!LAYERS.canGainMax(layer)) return new ExpantaNum(1)
        return gain.max(0).floor()
      break;
      default:
        return ExpantaNum(0)
    }
  },
  doReset(layer, forced = false){
    switch(layer) {
      case 1:
        if (LAYERS.canReset(layer) || forced){
          if (!forced) player.prestige[layer] = player.prestige[layer].add(LAYERS.gain(layer))
          if (LAYERS.resetNothing(layer) && !forced) return
          player.points = new ExpantaNum(0)
        }
      break;
      case 2:
        if (LAYERS.canReset(layer) || forced){
          if (!forced) player.prestige[layer] = player.prestige[layer].add(LAYERS.gain(layer))
          if (LAYERS.resetNothing(layer) && !forced) return
          player.points = new ExpantaNum(1)
          player.prestige[1] = new ExpantaNum(0)
          player.upgrade[1] = []
          player.lineSegments = new ExpantaNum(0)
        }
      break;
      default:
          return
    }
  },
  eff(layer){
    let x
    switch(layer) {
      case 1:
        x = player.prestige[1]
        if (player.upgrade[1].includes(1)) x = x.mul(upgradeEffect(1,1))
        if (player.upgrade[1].includes(2)) x = x.mul(upgradeEffect(1,2))
        if (player.upgrade[1].includes(4) && x.gte(10)) x = powExp(x, upgradeEffect(1,4))
        return x
      break;
      case 2:
        x = powExp(player.points.max(1), 2/3).min(slogadd(4,2)).pow(player.prestige[2])
        if (player.upgrade[1].includes(6)) x = x.pow(upgradeEffect(1,6))
        if (player.upgrade[1].includes(8)) x = x.pow(upgradeEffect(1,8))
        return x
      break;
      default:
          return new ExpantaNum(0)
      }
  },
  lineSegGain(){
    let x = new ExpantaNum(0)
    if (player.milestone[2].includes(2)){
      x = player.prestige[2].pow(LAYERS.lineSegGainExp()[1]).mul(player.prestige[1].max(10).logBase(10).pow(LAYERS.lineSegGainExp()[0]))
    }
    return x
  },
  lineSegGainExp(){
    let x = [new ExpantaNum(0),new ExpantaNum(1)] // first one is OoM of Dots, second one is Lines
    if (player.upgrade[1].includes(7)) x[0] = x[0].add(1)
    return x
  },
  lineSegEff(){
    let x = player.lineSegments.max(10).logBase(10)
    return x
  },
}

function getDimShiftCost(x = player.dimShift){
  let cost = [new ExpantaNum("e17610")]
  if (x >= cost.length || x < 0) return new ExpantaNum(Infinity)
  else return cost[x]
}

function buyDimShift(){
  if (player.points.gte(getDimShiftCost(player.dimShift))){
    player.dimShift++
  }
}

function getPointsGain(){
  let gain = LAYERS.eff(1)
  gain = gain.mul(LAYERS.eff(2))
  if (player.milestone[2].includes(2)) gain = gain.pow(LAYERS.lineSegEff())
  return gain
}