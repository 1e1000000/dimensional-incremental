// cost toggles

function prestigeReqBase(layer){ //1st require
    switch(layer) {
    case 1:
      let x = new ExpantaNum(1)
      return x
    break;
    default:
      return ExpantaNum(Infinity)
    }
  }
  
  function prestigeReqScaling(layer){
    switch(layer) {
    case 1:
      let x = new ExpantaNum(2)
      return x
    break;
    default:
      return ExpantaNum(Infinity)
    }
  }
  
  function prestigeReqExp(layer){
    switch(layer) {
    case 1:
      let x = new ExpantaNum(2)
      return x
    break;
    default:
      return ExpantaNum(Infinity)
    }
  }
  
  function prestigeMulti(layer){ // multiply resource gain, before softcap
    switch(layer) {
    case 1:
      let x = new ExpantaNum(1)
      if (player.upgrade[1].includes(3)) x = x.mul(upgradeEffect(1,3))
      return x
    break;
    default:
      return ExpantaNum(0)
    }
  }
  
  function prestigeSoftcapStart(layer){
    switch(layer) {
    case 1:
      let x = new ExpantaNum(1e12)
      return x
    break;
    default:
      return ExpantaNum(Infinity)
    }
  }
  
  function prestigeSoftcapExp(layer){
    switch(layer) {
    case 1:
      let x = new ExpantaNum(2)
      return x
    break;
    default:
      return ExpantaNum(Infinity)
    }
  }
  
  // reset functions
  
  function prestigeReq(layer){
    switch(layer) {
    case 1:
      let x = player.prestige[1].div(prestigeMulti(layer))
      if (x.gte(prestigeSoftcapStart(layer))) x = x.div(prestigeSoftcapStart(layer)).pow(prestigeSoftcapExp(layer)).mul(prestigeSoftcapStart(layer))
      let req = prestigeReqScaling(layer).pow(x.pow(prestigeReqExp(layer))).mul(prestigeReqBase(layer))
      return req
    break;
    default:
      return ExpantaNum(Infinity)
    }
  }
  
  function nextPrestigeReq(layer){
    switch(layer) {
    case 1:
      let x = player.prestige[1].add(canGainMax(layer)?prestigeGain(layer):0).div(prestigeMulti(layer))
      if (x.gte(prestigeSoftcapStart(layer))) x = x.div(prestigeSoftcapStart(layer)).pow(prestigeSoftcapExp(layer)).mul(prestigeSoftcapStart(layer))
      let req = prestigeReqScaling(layer).pow(x.pow(prestigeReqExp(layer))).mul(prestigeReqBase(layer))
      return req
    break;
    default:
      return ExpantaNum(Infinity)
    }
  }
  
  function canReset(layer){
    switch(layer) {
    case 1:
      return player.points.gte(prestigeReq(layer))
    break;
    default:
      return false
    }
  }
  
  function prestigeGain(layer){
    switch(layer) {
    case 1:
      let x = player.points.div(prestigeReqBase(layer)).logBase(prestigeReqScaling(layer)).pow(prestigeReqExp(layer).rec()).mul(prestigeMulti(layer)).add(1)
      if (x.gte(prestigeSoftcapStart(layer))) x = x.div(prestigeSoftcapStart(layer)).pow(prestigeSoftcapExp(layer).rec()).mul(prestigeSoftcapStart(layer))
      let gain = x.sub(player.prestige[1])
      if (!canGainMax(layer)) return new ExpantaNum(1)
      return gain.max(0).floor()
    break;
    default:
      return ExpantaNum(0)
    }
  }
  
  function canGainMax(layer){
    switch(layer) {
    case 1:
      return player.upgrade[1].includes(4)
    break;
    default:
      return false
    }
  }
  
  function autoGain(layer){ // not implemented
    switch(layer) {
    case 1:
      return false
    break;
    default:
      return false
    }
  }
  
  function resetNothing(layer){
    switch(layer) {
    case 1:
      return false
    break;
    default:
      return false
    }
  }
  
  function layerReset(layer, forced = false){
    switch(layer) {
    case 1:
      if (canReset(layer) || forced){
        if (!forced) player.prestige[1] = player.prestige[1].add(prestigeGain(layer))
        if (resetNothing(layer) && !forced) return
        player.points = new ExpantaNum(0)
      }
    break;
    default:
        return
    }
  }
  
  function layerEff(layer){
    switch(layer) {
    case 1:
        let x = player.prestige[1]
        if (player.upgrade[1].includes(1)) x = x.mul(upgradeEffect(1,1))
        if (player.upgrade[1].includes(2)) x = x.mul(upgradeEffect(1,2))
        if (player.upgrade[1].includes(4) && x.gte(10)) x = new ExpantaNum(10).pow(x.logBase(10).pow(upgradeEffect(1,4)))
        return x
    break;
    default:
        return new ExpantaNum(0)
    }
  }