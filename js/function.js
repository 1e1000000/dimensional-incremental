// Upgrades

const upgradeCost1 = 
    [null,
      [null,new ExpantaNum(30),new ExpantaNum(1.5e4),new ExpantaNum(1e23),new ExpantaNum("2e643"),
      new ExpantaNum("1e22059"),new ExpantaNum("2e148605"),new ExpantaNum("5e3632587"),new ExpantaNum("1e16815179")]
    ]

const upgradeCost2 = 
    [null,
      [null,new ExpantaNum(3),new ExpantaNum(4),new ExpantaNum(9),new ExpantaNum(130),
        new ExpantaNum(1176),new ExpantaNum(3634),new ExpantaNum(22789),new ExpantaNum(54004)]
    ]

function canAffordUpgrade(layer,id){
if (player.upgrade[layer].includes(id)) return false // upgrade already bought
    if (upgradeCost1[layer][id] == undefined || upgradeCost2[layer][id] == undefined) return false // upgrade not found
    switch(layer) {
    case 1:
        if (player.points.lt(upgradeCost1[layer][id]) || player.prestige[1].lt(upgradeCost2[layer][id])) return false // not enough require
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
        player.upgrade[layer].push(id)
        player.points = player.points.sub(upgradeCost1[layer][id])
        player.prestige[1] = player.prestige[1].sub(upgradeCost2[layer][id])
        if (player.points.lt(1) && player.prestige[1].eq(0)) player.points = new ExpantaNum(1) // prevent softlock
    break;
    default: // layer not found
        return
    }
}
  
function upgradeEffect(layer,id){
    let x
    switch(layer) {
    case 1:
        switch(id) {
        case 1:
            x = player.prestige[1].max(1).tetr(2)
            if (player.upgrade[1].includes(5)) x = x.pow(upgradeEffect(1,5))
            return x
        break;
        case 2:
            x = player.points.max(10).logBase(10).pow(player.prestige[1].max(1))
            return x
        break;
        case 3:
            x = player.points.max(1e10).logBase(10).logBase(10)
            return x
        break;
        case 4:
            x = player.prestige[1].max(10).logBase(10).mul(0.032).add(1)
            if (x.gte(1.16)) x = x.div(1.16).pow(0.5).mul(1.16)
            return x
        break;
        case 5:
            x = player.prestige[1].max(10).logBase(10).pow(0.5)
            return x
        break;
        case 6:
            x = player.prestige[1].max(1).pow(0.35)
            return x
        break;
        case 8:
            x = player.points.max(10).slog(10).pow(1.625)
            return x
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
        case 1:
            return player.prestige[1].gte(2) || player.upgrade[1].includes(1)
        break;
        case 2:
            return player.upgrade[1].includes(1)
        break;
        case 3:
            return player.upgrade[1].includes(2)
        break;
        case 4:
            return player.upgrade[1].includes(3)
        break;
        case 5:
            return player.upgrade[1].includes(4) && player.milestone[2].includes(1)
        break;
        case 6:
            return player.upgrade[1].includes(5) && player.milestone[2].includes(1)
        break;
        case 7:
            return player.upgrade[1].includes(6) && player.milestone[2].includes(2)
        break;
        case 8:
            return player.upgrade[1].includes(7) && player.milestone[2].includes(2)
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
        [null,2,2,4,4,4,4,2,4],
    ]

// Milestones

function canGainMilestone(layer, id){
    if (player.milestone[layer].includes(id)) return false
    switch(layer) {
        case 1: // no milestones
            return false
        break;
        case 2:
            switch(id) {
            case 1:
                return player.prestige[2].gte(1)
            break;
            case 2:
                return player.prestige[2].gte(2)
            break;
            case 3:
                return player.prestige[2].gte(3)
            break;
            default: // milestone not found
                return false
            }
        break;
        default: // layer not found
            return false
        }
}

function updateMilestones(){
    for (let i=1;i<=2;i++){
        for (let j=1;j<=loadMilestones[i];j++){
            if (canGainMilestone(i, j)) player.milestone[i].push(j)
        }
    }
}

// other

function getProductionRateDisplay(curr, gain){
    let now = new ExpantaNum(curr)
    let next = new ExpantaNum(curr).add(gain)
    let rate
    if (next.div(now).gte(10) && now.gte(1e10)) rate = format(next.div(now).log10()) + " OoM"
    else rate = format(next.sub(now))
    return rate
}

function changeOption(id){
    switch(id){
        case 0:
            player.options.notation = (player.options.notation+1)%10
        break;
        case 1:
            player.options.debug = (player.options.debug+1)%2
        break;
        default: // option not found
        return 
    }
}