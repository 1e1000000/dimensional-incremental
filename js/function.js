// Upgrades

const upgradeCost1 = 
    [null,
      [null,
        new ExpantaNum(30),new ExpantaNum(1.5e4),new ExpantaNum(1e23),new ExpantaNum("2e643"),
        new ExpantaNum("1e22059"),new ExpantaNum("2e148605"),new ExpantaNum("5e3632587"),new ExpantaNum("1e16815179"),
        new ExpantaNum("e2.333e11"),new ExpantaNum("e3.122e12"),new ExpantaNum("e3.537e16"),new ExpantaNum("e1.913e17"),
      ],
      [null,
        new ExpantaNum(287913),new ExpantaNum(1366629),new ExpantaNum(2090799),new ExpantaNum(3451291),
        new ExpantaNum(9.836e8),new ExpantaNum(7.176e9),
      ],
    ]

const upgradeCost2 = 
    [null,
      [null,
        new ExpantaNum(3),new ExpantaNum(4),new ExpantaNum(9),new ExpantaNum(130),
        new ExpantaNum(1176),new ExpantaNum(3634),new ExpantaNum(22789),new ExpantaNum(54004),
        new ExpantaNum(1e7),new ExpantaNum(4.0239e7),new ExpantaNum(2.1e10),new ExpantaNum(5.115e10),
      ],
      [null,
        new ExpantaNum(4768.5),new ExpantaNum(226598.9),new ExpantaNum(13099530),new ExpantaNum(4769636261),
        new ExpantaNum(7.495e16),new ExpantaNum(4.4e18),
      ],
    ]

/*
_____________________________________________
|Layer|  Upgrade Cost 1  |  Upgrade Cost 2  |
|  1  |      Points      |       Dots       |
|  2  |       Dots       |   L. Segments    |
|_____|__________________|__________________|
*/

function canAffordUpgrade(layer,id){
if (player.upgrade[layer].includes(id)) return false // upgrade already bought
    if (upgradeCost1[layer][id] == undefined || upgradeCost2[layer][id] == undefined) return false // upgrade not found
    switch(layer) {
    case 1:
        if (player.points.lt(upgradeCost1[layer][id]) || player.prestige[1].lt(upgradeCost2[layer][id])) return false // not enough require
        else return true
        break;
    case 2:
        if (player.prestige[1].lt(upgradeCost1[layer][id]) || player.lineSegments.lt(upgradeCost2[layer][id])) return false // not enough require
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
    case 2:
        if (!canAffordUpgrade(layer,id)) return
        player.upgrade[layer].push(id)
        player.prestige[1] = player.prestige[1].sub(upgradeCost1[layer][id])
        player.lineSegments = player.lineSegments.sub(upgradeCost2[layer][id])
        if (player.points.lt(1) && player.prestige[1].eq(0)) player.points = new ExpantaNum(1) // prevent softlock
    break;
    default: // layer not found
        return
    }
}
  
function upgradeEffect(layer,id){
    let x
    let e
    switch(layer) {
    case 1:
        switch(id) {
        case 1:
            x = player.prestige[1].max(1).tetr(2)
            if (player.upgrade[1].includes(5)) x = x.pow(upgradeEffect(1,5))
            return x
        break;
        case 2:
            x = player.points.max(10).log10().pow(player.prestige[1].max(1))
            return x
        break;
        case 3:
            x = player.points.max(1e10).log10().log10()
            return x
        break;
        case 4:
            x = player.prestige[1].max(1).log10().mul(0.032).add(1)
            e = new ExpantaNum(0.5)
            if (player.upgrade[2].includes(5)) e = e.root(upgradeEffect(2,5))
            if (x.gte(1.16)) x = x.div(1.16).pow(e).mul(1.16)
            return x
        break;
        case 5:
            x = player.prestige[1].max(10).log10().pow(0.5)
            return x
        break;
        case 6:
            x = player.prestige[1].max(1).pow(0.35)
            return x
        break;
        case 8:
            x = player.points.max(10).slog(10).pow(1.625)
            if (player.upgrade[1].includes(12)) x = x.pow(upgradeEffect(1,12))
            return x
        break;
        case 9:
            x = player.prestige[1].max(10).log10().log10().mul(0.2).add(1)
            return x
        break;
        case 10:
            x = player.prestige[2].max(1).pow(0.475)
            return x
        break;
        case 11:
            x = player.points.max(10).log10().log10().mul(0.02).add(1)
            return x
        break;
        case 12:
            x = player.prestige[2].max(1).pow(0.910413)
            return x
        break;
        default: // upgrade not found
            return new ExpantaNum(1)
        }
    break;
    case 2:
        switch(id) {
        case 1:
            x = powExp(player.points, 2/3).max(10).log10().pow(2500).div(slogadd(4,2)).pow(20.8).max(1)
            return x
        break;
        case 2:
            x = player.lineSegments.add(10).log10()
            return x
        break;
        case 3:
            x = upgradeEffect(1,3)
            return x
        break;
        case 5:
            x = player.prestige[2].add(1).pow(0.2)
            return x
        break;
        case 6:
            x = new ExpantaNum(0)
            for (let i=1;i<=player.buyables[2].length-1;i++){
                x = x.add(player.buyables[2][i])
            }
            return x.mul(0.01).add(1)
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
            return player.upgrade[1].includes(1) || player.upgrade[1].includes(2)
        break;
        case 3:
            return player.upgrade[1].includes(2) || player.upgrade[1].includes(3)
        break;
        case 4:
            return player.upgrade[1].includes(3) || player.upgrade[1].includes(4)
        break;
        case 5:
            return (player.upgrade[1].includes(4) && player.milestone[2].includes(1)) || player.upgrade[1].includes(5)
        break;
        case 6:
            return (player.upgrade[1].includes(5) && player.milestone[2].includes(1)) || player.upgrade[1].includes(6)
        break;
        case 7:
            return (player.upgrade[1].includes(6) && player.milestone[2].includes(2)) || player.upgrade[1].includes(7)
        break;
        case 8:
            return (player.upgrade[1].includes(7) && player.milestone[2].includes(2)) || player.upgrade[1].includes(8)
        break;
        case 9:
            return (player.upgrade[1].includes(8) && player.buyables[2][1].gte(9)) || player.upgrade[1].includes(9)
        break;
        case 10:
            return (player.upgrade[1].includes(9) && player.buyables[2][1].gte(9)) || player.upgrade[1].includes(10)
        break;
        case 11:
            return player.upgrade[1].includes(10) || player.upgrade[1].includes(11)
        break;
        case 12:
            return player.upgrade[1].includes(11) || player.upgrade[1].includes(12)
        break;
        default: // upgrade not found
            return false
        }
    break;
    case 2:
        switch(id) {
        case 1:
            return player.buyables[2][2].gte(2) || player.upgrade[2].includes(1)
        break;
        case 2:
            return (player.upgrade[2].includes(1) && player.prestige[2].gte(3)) || player.upgrade[2].includes(2)
        break;
        case 3:
            return (player.upgrade[2].includes(2) && player.buyables[2][1].gte(5)) || player.upgrade[2].includes(3)
        break;
        case 4:
            return (player.upgrade[2].includes(3) && player.buyables[2][2].gte(5)) || player.upgrade[2].includes(4)
        break;
        case 5:
            return (player.upgrade[2].includes(4) && player.prestige[2].gte(4)) || player.upgrade[2].includes(5)
        break;
        case 6:
            return (player.upgrade[2].includes(5) && player.buyables[2][3].gte(3)) || player.upgrade[2].includes(6)
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
        [null,2,2,4,4,4,4,2,4,4,4,4,4],
        [null,2,4,4,2,4,2]
    ]

function getUpgExtra(layer,id,x=0){
    switch(layer) {
        case 1:
            switch(id) {
            case 1:
                let mult = new ExpantaNum(1)
                if (player.upgrade[1].includes(5)) mult = mult.mul(upgradeEffect(1,5))
                return mult.eq(1) ? "Dots" : "(Dots*" + format(mult,4) + ")" 
            break;
            case 8:
                let mult2 = new ExpantaNum(1.625)
                if (player.upgrade[1].includes(12)) mult2 = mult2.mul(upgradeEffect(1,12))
                return format(mult2,4)
            break;
            default: // upgrade not found
                return ""
        }
        break;
        case 2:
            switch(id) {
            case 1:
                return format(slogadd(4,2))
            break;

            default: // upgrade not found
                return ""
        }
        break;
        default: // layer not found
            return ""
    }
}

// Buyables

function getBaseBuyableCost(layer,id){ // cost at level 1
    switch(layer) {
        case 2:
            switch(id) {
            case 1:
                return new ExpantaNum(100)
            break;
            case 2:
                return new ExpantaNum(200)
            break;
            case 3:
                return new ExpantaNum(5e16)
            break;
            default: // buyable not found
                return new ExpantaNum(Infinity)
            }
        break;
        default: // layer not found
            return new ExpantaNum(Infinity)
        }
}

function getBuyableCost(layer,id){
    switch(layer) {
        case 2:
            switch(id) {
            case 1:
                return getBaseBuyableCost(layer,id).mul(ExpantaNum.pow(3,player.buyables[layer][id].pow(1.5)))
            break;
            case 2:
                return getBaseBuyableCost(layer,id).mul(ExpantaNum.pow(4.8,player.buyables[layer][id].pow(1.6)))
            break;
            case 3:
                return getBaseBuyableCost(layer,id).mul(ExpantaNum.pow(2,player.buyables[layer][id].pow(2)))
            break;
            default: // buyable not found
                return new ExpantaNum(Infinity)
            }
        break;
        default: // layer not found
            return new ExpantaNum(Infinity)
        }
}

function getMaxBuyableCost(layer,id){
    switch(layer) {
        case 2:
            switch(id) {
            case 1:
                return getBaseBuyableCost(layer,id).mul(ExpantaNum.pow(3,getMaxBulkBuyable(layer,id).add(player.buyables[layer][id]).sub(1).pow(1.5)))
            break;
            case 2:
                return getBaseBuyableCost(layer,id).mul(ExpantaNum.pow(4.8,getMaxBulkBuyable(layer,id).add(player.buyables[layer][id]).sub(1).pow(1.6)))
            break;
            case 3:
                return getBaseBuyableCost(layer,id).mul(ExpantaNum.pow(2,getMaxBulkBuyable(layer,id).add(player.buyables[layer][id]).sub(1).pow(2)))
            break;
            default: // buyable not found
                return new ExpantaNum(Infinity)
            }
        break;
        default: // layer not found
            return new ExpantaNum(Infinity)
        }
}

function getMaxBulkBuyable(layer,id){
    let res
    switch(layer) {
        case 2:
            res = player.lineSegments
            switch(id) {
            case 1:
                return res.div(getBaseBuyableCost(layer,id)).logBase(3).pow(1/1.5).add(1).max(0).sub(player.buyables[layer][id]).floor().max(0)
            break;
            case 2:
                return res.div(getBaseBuyableCost(layer,id)).logBase(4.8).pow(1/1.6).add(1).max(0).sub(player.buyables[layer][id]).floor().max(0)
            break;
            case 3:
                return res.div(getBaseBuyableCost(layer,id)).logBase(2).pow(1/2).add(1).max(0).sub(player.buyables[layer][id]).floor().max(0)
            break;
            default: // buyable not found
                return new ExpantaNum(0)
            }
        break;
        default: // layer not found
            return new ExpantaNum(0)
        }
}

function canAffordBuyable(layer,id){
    switch(layer) {
        case 2:
            if (player.lineSegments.lt(getBuyableCost(layer,id))) return false // not enough require
            else return true
            break;
        default: // layer not found
        return false
        }
}

function buyBuyable(layer,id,max=false){
    let bulk
    switch(layer) {
        case 2:
            bulk = getMaxBulkBuyable(layer,id)
            if (!canAffordBuyable(layer,id)) return
            player.lineSegments = player.lineSegments.sub(max?getMaxBuyableCost(layer,id):getBuyableCost(layer,id))
            player.buyables[layer][id] = player.buyables[layer][id].add(max?bulk:1)
        break;
        default: // layer not found
            return
        }
}

function getBuyableEffect(layer,id){
    let x
    switch(layer) {
    case 2:
        switch(id) {
        case 1:
            x = player.buyables[layer][id]
            return x
        break;
        case 2:
            x = player.buyables[layer][id].div(2)
            return x
        break;
        case 3:
            x = ExpantaNum.pow(1.3,player.buyables[layer][id].pow(0.5))
            return x
        break;
        default: // buyable not found
            return new ExpantaNum(1)
        }
    break;
    default: // layer not found
        return new ExpantaNum(1)
    }
}

function buyableShow(layer,id){
    switch(layer) {
    case 2:
        switch(id) {
        case 1:
            return player.milestone[2].includes(2)
        break;
        case 2:
            return player.buyables[2][1].gte(1)
        break;
        case 3:
            return player.milestone[2].includes(4)
        break;
        default: // buyable not found
            return false
        }
    break;
    default: // layer not found
        return false
    }
}

const displayBuyableAccuracy = 
    [null,
        [],
        [null,2,2,2],
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
            case 4:
                return player.prestige[2].gte(4)
            break;
            case 5:
                return player.prestige[2].gte(5)
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

function milestoneShow(layer,id){
    switch(layer) {
    case 2:
        switch(id) {
        case 1:
            return true
        break;
        case 2:
            return player.milestone[2].includes(1)
        break;
        case 3:
            return player.milestone[2].includes(2)
        break;
        case 4:
            return player.milestone[2].includes(3)
        break;
        case 5:
            return player.milestone[2].includes(4)
        break;
        default: // upgrade not found
            return false
        }
    break;
    default: // layer not found
        return false
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
            player.options.notation = (player.options.notation+1)%14
        break;
        case 1:
            player.options.debug = (player.options.debug+1)%2
        break;
        default: // option not found
        return 
    }
}

const notationOptionRange = [[0,15],[0,15],[0,15],[0,15],[3,10],[1,15]]
const notationOptionDefault = [2,3,4,6,5,9]
const notationOptionName = [
    "accuracy of the number",
    "accuracy of the number at e",
    "accuracy of the number at F,G,H",
    "accuracy of the number at J,K",
    "amount of letters to next letter",
    "exponent of number to next exponent"
]

function changeAccuracyOptionButton(id){
    let num = prompt("You want to change the " + notationOptionName[id] + " to... (min: " + notationOptionRange[id][0] + ", max: " + notationOptionRange[id][1] + ", default to " + notationOptionDefault[id] + ")",player.options.notationOption[id])
    if (num === null || num == "") num = notationOptionDefault[id]
    num = Math.round(Number(num))
    if (isNaN(num)) num = notationOptionDefault[id]
    if (num < notationOptionRange[id][0]) num = notationOptionRange[id][0]
    if (num > notationOptionRange[id][1]) num = notationOptionRange[id][1]
    player.options.notationOption[id] = num
}

function getStatHTML(){
    let output = `Resources:<br>`
    output = output + `Points: <b>` + format(player.points) + `</b><br>`
    output = output + `Dimensional Shifts: <b>` + formatWhole(player.dimShift) + `</b><br>`
    output = output + `Dots: <b>` + formatWhole(player.prestige[1]) + `</b> (Next require: <b>` + format(LAYERS.req(1)) + `</b> Points, Effect: +<b>` + format(LAYERS.eff(1)) + `</b> points/s)<br>`
    if (player.dimShift>=1) output = output + `Lines: <b>` + formatWhole(player.prestige[2]) + `</b> (Next require: <b>` + format(LAYERS.req(2)) + `</b> Dots, Effect: +<b>` + format(LAYERS.eff(2)) + `</b>x points gain)<br>`
    if (player.milestone[2].includes(2)) output = output + `Line Segments: <b>` + format(player.lineSegments) + `</b> (Effect: ^<b>` + format(LAYERS.lineSegEff(),4) + `</b> points gain)<br>`
    return output
}