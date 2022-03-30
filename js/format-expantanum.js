var AFactived = Boolean(new Date().getMonth() == 3 && new Date().getDate() == 1)
var pL = new ExpantaNum(1.61622837e-35)
var uni = new ExpantaNum(299792458*365.2422*86400*9.3e10)

// format-expantanum.js by cloudytheconqueror
// Code snippets from NumberFormating.js of ducdat0507's The Communitree,
// which is based on The Modding Tree by Acamaeda (and ported to OmegaNum by upvoid),
// in turn based on The Prestige Tree by Jacorb and Aarex

// Set to 1 to print debug information to console
let FORMAT_DEBUG = 0

// Maximum number of times you can apply 1+log10(x) to number < 10 until the result is
// indistinguishable from 1. I calculated it myself and got 45, though I set it to 48 to be safe.
// Reducing this will speed up formatting, but may lead to inaccurate results.
let MAX_LOGP1_REPEATS = 48

// Base 5 logarithm of e, used to calculate log base 5, which is used in the definition of J.
let LOG5E = 0.6213349345596119 // 1 / Math.log(5)

function commaFormat(num, precision) {
    if (AFactived) return ""
    if (num === null || num === undefined) return "NaN"
    let zeroCheck = num.array ? num.array[0][1] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let init = num.toString()
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return portions[0]
}

function regularFormat(num, precision=player.options.notationOption[0]) {
    if (AFactived) return ""
    if (isNaN(num)) return "NaN"
    let zeroCheck = num.array ? num.array[0][1] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let fmt = num.toString()
    let f = fmt.split(".")
    if (precision == 0) return commaFormat(num.floor ? num.floor() : Math.floor(num))
    else if (f.length == 1) return fmt + "." + "0".repeat(precision)
    else if (f[1].length < precision) return fmt + "0".repeat(precision - f[1].length)
    else return f[0] + "." + f[1].substring(0, precision)
}

// Basically does the opposite of what standardize in ExpantaNum does
// Set smallTop to true to force the top value in the result below 10
function polarize(array, smallTop=false) {
    if (FORMAT_DEBUG >= 1) console.log("Begin polarize: "+JSON.stringify(array)+", smallTop "+smallTop)
    if (array.length == 0) array = [[0,0]]
    
    let bottom = array[0][0] == 0 ? array[0][1] : 10, top = 0, height = 0
    if (!Number.isFinite(bottom)) {}
    else if (array.length <= 1 && array[0][0] == 0) {
        while (smallTop && bottom >= 10) {
            bottom = Math.log10(bottom)
            top += 1
            height = 1
        }
    }
    else {
        let elem = array[0][0] == 0 ? 1 : 0
        top = array[elem][1]
        height = array[elem][0]
        while (bottom >= 10 || elem < array.length || (smallTop && top >= 10)) {
            if (bottom >= 10) { // Bottom mode: the bottom number "climbs" to the top
                if (height == 1) {
                    // Apply one increment
                    bottom = Math.log10(bottom)
                    if (bottom >= 10) { // Apply increment again if necessary
                        bottom = Math.log10(bottom)
                        top += 1
                    }
                }
                else if (height < MAX_LOGP1_REPEATS) {
                    // Apply the first two increments (one or two logs on first, one log on second)
                    if (bottom >= 1e10) bottom = Math.log10(Math.log10(Math.log10(bottom))) + 2
                    else bottom = Math.log10(Math.log10(bottom)) + 1
                    // Apply the remaining increments
                    for (i=2;i<height;i++) bottom = Math.log10(bottom) + 1
                }
                else bottom = 1 // The increment result is indistinguishable from 1
                
                top += 1
                if (FORMAT_DEBUG >= 1) console.log("Bottom mode: bottom "+bottom+", top "+top+", height "+height+", elem "+elem)
            }
            else { // Top mode: height is increased by one, or until the next nonzero value
                // Prevent running top mode more times than necessary
                if (elem == array.length-1 && array[elem][0] == height && !(smallTop && top >= 10)) break
                
                bottom = Math.log10(bottom) + top
                height += 1
                if (elem < array.length && height > array[elem][0]) elem += 1
                if (elem < array.length) {
                    if (height == array[elem][0]) top = array[elem][1] + 1
                    else if (bottom < 10) { // Apply top mode multiple times
                        let diff = array[elem][0] - height
                        if (diff < MAX_LOGP1_REPEATS) {
                            for (i=0;i<diff;i++) bottom = Math.log10(bottom) + 1
                        }
                        else bottom = 1 // The increment result is indistinguishable from 1
                        height = array[elem][0]
                        top = array[elem][1] + 1
                    }
                    else top = 1
                }
                else top = 1
                if (FORMAT_DEBUG >= 1) console.log("Top mode: bottom "+bottom+", top "+top+", height "+height+", elem "+elem)
            }
        }
    }
    
    if (FORMAT_DEBUG >= 1) console.log("Polarize result: bottom "+bottom+", top "+top+", height "+height)
    return {bottom: bottom, top: top, height: height}
}

// Search for the value at the requested height of an ExpantaNum array,
// and return the value if it exists; otherwise return a default value.
function arraySearch(array, height) {
    for (i=0;i<array.length;i++) {
        if (array[i][0] == height) return array[i][1]
        else if (array[i][0] > height) break
    }
    return height > 0 ? 0 : 10
}

// Search for the value at the requested height of an ExpantaNum array,
// and set it to zero if it exists.
function setToZero(array, height) {
    for (i=0;i<array.length;i++) {
        if (array[i][0] == height) break
    }
    if (i<array.length) array[i][1] = 0
}

function formatWhole(num) {
    if (AFactived) return ""
    num = new ExpantaNum(num)
    if (player.options.notation >= 7) return format(num, 0, false, true)
    if (num.lt(Math.min(1000,10**player.options.notationOption[5]))) return regularFormat(num, 0)
    else if (num.lt(10**player.options.notationOption[5])) return commaFormat(num)
    else return format(num)
}

function formatSmall(num, precision=2) { 
    if (AFactived) return ""
    return format(num, precision, true)    
}

function formatTime(num, precision=player.options.notationOption[0]){
    if (AFactived) return ""
    precision = Math.max(player.options.notationOption[0], precision)
    let mlt = new ExpantaNum("ee9")
    let uni = new ExpantaNum(86400*365*1.38e10)
    let uniYrs = new ExpantaNum(1.38e10)
    let y = new ExpantaNum(86400*365)
    let d = new ExpantaNum(86400)
    let h = new ExpantaNum(3600)
    let m = new ExpantaNum(60)
    let s = new ExpantaNum(1)
    num = new ExpantaNum(num)
    if (num.lt(s)){
      return regularFormat(num.mul(1000), precision) + " milliseconds"
    } else if (num.lt(m)) {
      return regularFormat(num, precision) + " seconds"
    } else if (num.lt(h)) {
      let modS = num.sub(num.div(m).floor().mul(m)) // seconds
      return formatWhole(num.div(m).floor()) + " minutes and " + regularFormat(modS, precision) + " seconds"
    } else if (num.lt(d)) {
      let modS = num.sub(num.div(m).floor().mul(m)) // seconds
      let modM = num.sub(num.div(h).floor().mul(h)) // minutes
      return formatWhole(num.div(h).floor()) + " hours, " + formatWhole(modM.div(m).floor()) + " minutes and " + regularFormat(modS, precision) + " seconds"
    } else if (num.lt(y)) {
      let modS = num.sub(num.div(m).floor().mul(m)) // seconds
      let modM = num.sub(num.div(h).floor().mul(h)) // minutes
      let modH = num.sub(num.div(d).floor().mul(d)) // hours
      return formatWhole(num.div(d).floor()) + " days, " + formatWhole(modH.div(h).floor()) + " hours, " + formatWhole(modM.div(m).floor()) + " minutes and " + regularFormat(modS, precision) + " seconds"
    } else if (num.lt(y.mul(1000))){
      let modS = num.sub(num.div(m).floor().mul(m)) // seconds
      let modM = num.sub(num.div(h).floor().mul(h)) // minutes
      let modH = num.sub(num.div(d).floor().mul(d)) // hours
      let modD = num.sub(num.div(y).floor().mul(y)) // days
      return commaFormat(num.div(y).floor()) + " years, " + formatWhole(modD.div(d).floor()) + " days, " + formatWhole(modH.div(h).floor()) + " hours, " + formatWhole(modM.div(m).floor()) + " minutes and " + regularFormat(modS, precision) + " seconds"
    } else if (num.lt(uni)){
      return format(num.div(y)) + " years"
    } else if (num.lt(uni.mul(1000))) {
      let yrs = num.div(y)
      let modY = yrs.sub(yrs.div(uniYrs).floor().mul(uniYrs)) // years
      return commaFormat(yrs.div(uniYrs).floor()) + " uni, " + format(modY) + " years"
    } else if (num.lt(mlt.mul(uni))){
      return format(num.div(uni), precision) + " uni"
    } else if (num.lt(mlt.pow(1000).mul(uni))){
      let unis = num.div(uni)
      let modUni = unis.div(mlt.pow(unis.log10().div(1e9).floor()))
      return commaFormat(unis.log10().div(1e9).floor()) + " mlt, " + format(modUni) + " uni"
    } else {
      return format(num.div(uni).log10().div(1e9), precision) + " mlt"
    }
}

function formatLength(num, precision=player.options.notationOption[0]){
    if (AFactived) return ""
    precision = Math.max(player.options.notationOption[0], precision)
    num = new ExpantaNum(num)
    if (num.lt(1e-24)){
        return formatWhole(num.div(pL).round()) + "pL"
    } else if (num.lt(1e-21)){
        return format(num.mul(1e24),4) + "ym"
    } else {
        return format(num,4) + "m"
    }
}

function format(num, precision=player.options.notationOption[0], small=false, fixed0=false, color=false){
    if (AFactived) return ""
    precision = Math.max(player.options.notationOption[0], precision)
    if (fixed0) precision = 0
    switch(player.options.notation) {
        case 0:
        case 1:
        case 2:
            return formatDefault(num, precision, small, color)
        break;
        case 3:
        case 4:
        case 5:
            return formatUpArrow(num, precision, small, color)
        break;
        case 6:
            return formatBAN(num, precision, small)
        break;
        case 7:
        case 8:
            return formatLetter(num, precision, small)
        break;
        case 9:
            return formatNumTroll(num, precision, small)
        break;
        case 10:
            return formatLetterTroll(num, precision, small)
        break;
        case 11:
            return btoa(formatDefault(num, precision, small))
        break;
        case 12:
            return reverseString(formatDefault(num, precision, small))
        break;
        case 13:
        default: // notation not found, or notation #12
            return "???"
        }
}

function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

function formatDefault(num, precision=player.options.notationOption[0], small=false, color=false) {
    if (AFactived) return ""
    if (ExpantaNum.isNaN(num)) return "NaN"
    let precision2 = player.options.notationOption[1] // for e
    let precision3 = player.options.notationOption[2] // for F, G, H
    let precision4 = player.options.notationOption[3] // for J, K
    num = new ExpantaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision, small)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.0001")) { return format(num.rec(), precision) + "⁻¹" }
    else if (num.lt(1)) return regularFormat(num, precision + (small ? 2 : 0))
    else if (num.lt(Math.min(1000,10**player.options.notationOption[5]))) return regularFormat(num, precision)
    else if (num.lt(10**player.options.notationOption[5])) return commaFormat(num)
    else if (player.options.notation == 1 && player.options.fullStandard && num.lt(ExpantaNum.mul("e1e3000",1000))) return standardize(num, precision2)
    else if (num.lt("10^^" + player.options.notationOption[4])) { // 1e9 ~ 1F5
        let bottom = arraySearch(array, 0)
        let rep = arraySearch(array, 1)-1
        if (bottom >= (player.options.notation == 1 && rep >= 0 ? 10**player.options.notationOption[5]*3+3 : 10**player.options.notationOption[5])) {
            bottom = Math.log10(bottom)
            rep += 1
        }
        let m = 10**(bottom-Math.floor(bottom))
        let e = Math.floor(bottom)
        let p = num.lt(1000) ? precision : precision2
        return "e".repeat(rep) + (player.options.notation == 1 || (player.options.notation == 2 && e < 33) ? standardize(ExpantaNum.pow(10,e).mul(m), p) : regularFormat(m, p) + "e" + commaFormat(e))
    }
    else if (num.lt("10^^" + 10**player.options.notationOption[5])) { // 1F5 ~ F1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "F" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^" + player.options.notationOption[4])) { // F1,000,000,000 ~ 1G5
        let rep = arraySearch(array, 2)
        if (rep >= 1) {
            setToZero(array, 2)
            return "F".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 1) + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "F" + format(n, precision)
    }
    else if (num.lt("10^^^" + 10**player.options.notationOption[5])) { // 1G5 ~ G1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "G" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^" + player.options.notationOption[4])) { // G1,000,000,000 ~ 1H5
        let rep = arraySearch(array, 3)
        if (rep >= 1) {
            setToZero(array, 3)
            return "G".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 2) + 1
        if (num.gte("10^^^" + (n + 1))) n += 1
        return "G" + format(n, precision)
    }
    else if (num.lt("10^^^^" + 10**player.options.notationOption[5])) { // 1H5 ~ H1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "H" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^^" + player.options.notationOption[4])) { // H1,000,000,000 ~ 5J4
        let rep = arraySearch(array, 4)
        if (rep >= 1) {
            setToZero(array, 4)
            return "H".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 3) + 1
        if (num.gte("10^^^^" + (n + 1))) n += 1
        return "H" + format(n, precision)
    }
    else if (num.lt("J" + 10**player.options.notationOption[5])) { // 5J4 ~ J1,000,000,000
        let pol = polarize(array, true)
        return regularFormat(Math.log10(pol.bottom) + pol.top, precision4) + "J" + commaFormat(pol.height)
    }
    else if (num.lt("J^" + (player.options.notationOption[4]-1) + " 10")) { // J1,000,000,000 ~ 1K5
        let rep = num.layer
        if (rep >= 1) return "J".repeat(rep) + format(array, precision)
        let n = array[array.length-1][0]
        if (num.gte("J" + (n + 1))) n += 1
        return "J" + format(n, precision)
    }
    else if (num.lt("J^" + (10**player.options.notationOption[5]-1) + " 10")) { // 1K5 ~ K1,000,000,000
        // https://googology.wikia.org/wiki/User_blog:PsiCubed2/Letter_Notation_Part_II
        // PsiCubed2 defined Jx as Gx for x < 2, resulting in J1 = 10 rather than 10^10, to
        // prevent issues when defining K and beyond. Therefore, there should be separate
        // cases for when the "top value" is below 2, and above 2.
        // ExpantaNum.js considers J1 to be equal to 1e10 rather than 10,
        // hence num.lt("J^999999 10") rather than num.lt("J^1000000 1").
        let pol = polarize(array, true)
        let layerLess = new ExpantaNum(array)
        let layer = num.layer
        let topJ
        if (layerLess.lt("10^^10")) { // Below J2: use Jx = Gx
            // layerLess is equal to (10^)^top bottom here, so calculate x in Gx directly.
            topJ = 1 + Math.log10(Math.log10(pol.bottom) + pol.top)
            layer += 1
        }
        else if (layerLess.lt("10{10}10")) { // J2 ~ J10
            topJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            layer += 1
        }
        else { // J10 and above: an extra layer is added, thus becoming JJ1 and above, where Jx = Gx also holds
            let nextToTopJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            let bottom = nextToTopJ >= 1e10 ? Math.log10(Math.log10(nextToTopJ)) : Math.log10(nextToTopJ)
            let top = nextToTopJ >= 1e10 ? 2 : 1
            topJ = 1 + Math.log10(Math.log10(bottom) + top)
            layer += 2
        }
        return regularFormat(topJ, precision4) + "K" + commaFormat(layer)
    }
    // K1,000,000,000 and beyond
    let n = num.layer + 1
    if (num.gte("J^" + n + " 10")) n += 1
    return "K" + format(n, precision)
}

function formatUpArrow(num, precision=player.options.notationOption[0], small=false) {
    if (AFactived) return ""
    if (ExpantaNum.isNaN(num)) return "NaN"
    let precision2 = player.options.notationOption[1] // for e
    let precision3 = player.options.notationOption[2] // for F, G, H
    let precision4 = player.options.notationOption[3] // for J, K
    num = new ExpantaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision, small)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.0001")) { return "(" + format(num.rec(), precision) + ")⁻¹" }
    else if (num.lt(1)) return regularFormat(num, precision + (small ? 2 : 0))
    else if (num.lt(Math.min(1000,10**player.options.notationOption[5]))) return regularFormat(num, precision)
    else if (num.lt(10**player.options.notationOption[5])) return commaFormat(num)
    else if (player.options.notation == 4 && player.options.fullStandard && num.lt(ExpantaNum.mul("e1e3000",1000))) return standardize(num,precision2)
    else if (num.lt("10^^" + player.options.notationOption[4])) { // 1e9 ~ 1F5
        let bottom = arraySearch(array, 0)
        let rep = arraySearch(array, 1)-1
        if (bottom >= (player.options.notation == 4 && rep >= 0 ? 10**player.options.notationOption[5]*3+3 : 10**player.options.notationOption[5])) {
            bottom = Math.log10(bottom)
            rep += 1
        }
        let m = 10**(bottom-Math.floor(bottom))
        let e = Math.floor(bottom)
        let p = num.lt(1000) ? precision : precision2
        return "10^(".repeat(rep) + (player.options.notation == 4 || (player.options.notation == 5 && e < 33) ? standardize(ExpantaNum.pow(10,e).mul(m), p) : regularFormat(m, p) + "*10^" + commaFormat(e)) + ")".repeat(rep)
    }
    else if (num.lt("10^^" + 10**player.options.notationOption[5])) { // 1F5 ~ F1,000,000,000
        let pol = polarize(array)
        return "(10^)^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("10^^^" + player.options.notationOption[4])) { // F1,000,000,000 ~ 1G5
        let rep = arraySearch(array, 2)
        if (rep >= 1) {
            setToZero(array, 2)
            return "10^^".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 1) + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "10^^" + format(n, precision)
    }
    else if (num.lt("10^^^" + 10**player.options.notationOption[5])) { // 1G5 ~ G1,000,000,000
        let pol = polarize(array)
        return "(10^^)^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("10^^^^" + player.options.notationOption[4])) { // G1,000,000,000 ~ 1H5
        let rep = arraySearch(array, 3)
        if (rep >= 1) {
            setToZero(array, 3)
            return "10^^^".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 2) + 1
        if (num.gte("10^^^" + (n + 1))) n += 1
        return "10^^^" + format(n, precision)
    }
    else if (num.lt("10^^^^" + 10**player.options.notationOption[5])) { // 1H5 ~ H1,000,000,000
        let pol = polarize(array)
        return "(10^^^)^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("10^^^^^" + player.options.notationOption[4])) { // H1,000,000,000 ~ 5J4
        let rep = arraySearch(array, 4)
        if (rep >= 1) {
            setToZero(array, 4)
            return "10^^^^".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 3) + 1
        if (num.gte("10^^^^" + (n + 1))) n += 1
        return "10^^^^" + format(n, precision)
    }
    else if (num.lt("10^^^^^" + 10**player.options.notationOption[5])) { // 5J4 ~ J4$1,000,000,000
        let pol = polarize(array)
        return "(10^^^^)^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("10^^^^^^" + player.options.notationOption[4])) { // J4$1,000,000,000 ~ 5J5
        let rep = arraySearch(array, 5)
        if (rep >= 1) {
            setToZero(array, 5)
            return "10{5}".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 4) + 1
        if (num.gte("10^^^^^" + (n + 1))) n += 1
        return "10{5}" + format(n, precision)
    }
    else if (num.lt("10^^^^^^" + 10**player.options.notationOption[5])) { // 5J5 ~ J5$1,000,000,000
        let pol = polarize(array)
        return "(10{5})^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("10^^^^^^^" + player.options.notationOption[4])) { // J5$1,000,000,000 ~ 5J6
        let rep = arraySearch(array, 6)
        if (rep >= 1) {
            setToZero(array, 6)
            return "10{6}".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 5) + 1
        if (num.gte("10^^^^^^" + (n + 1))) n += 1
        return "10{6}" + format(n, precision)
    }
    else if (num.lt("10^^^^^^^" + 10**player.options.notationOption[5])) { // 5J6 ~ J6$1,000,000,000
        let pol = polarize(array)
        return "(10{6})^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("10^^^^^^^^" + player.options.notationOption[4])) { // J6$1,000,000,000 ~ 5J7
        let rep = arraySearch(array, 7)
        if (rep >= 1) {
            setToZero(array, 7)
            return "10{7}".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 6) + 1
        if (num.gte("10^^^^^^^" + (n + 1))) n += 1
        return "10{7}" + format(n, precision)
    }
    else if (num.lt("10^^^^^^^^" + 10**player.options.notationOption[5])) { // 5J7 ~ J7$1,000,000,000
        let pol = polarize(array)
        return "(10{7})^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("10^^^^^^^^^" + player.options.notationOption[4])) { // J7$1,000,000,000 ~ 5J8
        let rep = arraySearch(array, 8)
        if (rep >= 1) {
            setToZero(array, 8)
            return "10{8}".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 7) + 1
        if (num.gte("10^^^^^^^^" + (n + 1))) n += 1
        return "10{8}" + format(n, precision)
    }
    else if (num.lt("10^^^^^^^^^" + 10**player.options.notationOption[5])) { // 5J8 ~ J8$1,000,000,000
        let pol = polarize(array)
        return "(10{8})^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("10^^^^^^^^^^" + player.options.notationOption[4])) { // J8$1,000,000,000 ~ 5J9
        let rep = arraySearch(array, 9)
        if (rep >= 1) {
            setToZero(array, 9)
            return "10{9}".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 8) + 1
        if (num.gte("10^^^^^^^^^" + (n + 1))) n += 1
        return "10{9}" + format(n, precision)
    }
    else if (num.lt("10^^^^^^^^^^10")) { // 5J9 ~ J10
        let pol = polarize(array)
        return "(10{9})^" + commaFormat(pol.top) + " " + regularFormat(pol.bottom, precision3)
    }
    else if (num.lt("J" + 10**player.options.notationOption[5])) { // J10 ~ J1,000,000,000
        let pol = polarize(array, true)
        return "10{" + commaFormat(pol.height+1) + "}" + regularFormat(Math.log10(pol.bottom) + pol.top, precision4)
    }
    else if (num.lt("J^" + (player.options.notationOption[4]-1) + " 10")) { // J1,000,000,000 ~ 1K5
        let rep = num.layer
        if (rep >= 1) return "10{".repeat(rep) + format(array, precision) + "}10".repeat(rep)
        let n = array[array.length-1][0]
        if (num.gte("J" + (n + 1))) n += 1
        return "10{" + format(n, precision) + "}10"
    }
    else if (num.lt("J^" + (10**player.options.notationOption[5]-1) + " 10")) { // 1K5 ~ K1,000,000,000
        // https://googology.wikia.org/wiki/User_blog:PsiCubed2/Letter_Notation_Part_II
        // PsiCubed2 defined Jx as Gx for x < 2, resulting in J1 = 10 rather than 10^10, to
        // prevent issues when defining K and beyond. Therefore, there should be separate
        // cases for when the "top value" is below 2, and above 2.
        // ExpantaNum.js considers J1 to be equal to 1e10 rather than 10,
        // hence num.lt("J^999999 10") rather than num.lt("J^1000000 1").
        let pol = polarize(array, true)
        let layerLess = new ExpantaNum(array)
        let layer = num.layer
        let topJ
        if (layerLess.lt("10^^10")) { // Below J2: use Jx = Gx
            // layerLess is equal to (10^)^top bottom here, so calculate x in Gx directly.
            topJ = 1 + Math.log10(Math.log10(pol.bottom) + pol.top)
            layer += 1
        }
        else if (layerLess.lt("10{10}10")) { // J2 ~ J10
            topJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            layer += 1
        }
        else { // J10 and above: an extra layer is added, thus becoming JJ1 and above, where Jx = Gx also holds
            let nextToTopJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            let bottom = nextToTopJ >= 1e10 ? Math.log10(Math.log10(nextToTopJ)) : Math.log10(nextToTopJ)
            let top = nextToTopJ >= 1e10 ? 2 : 1
            topJ = 1 + Math.log10(Math.log10(bottom) + top)
            layer += 2
        }
        return "10{10{...10{" + format(layerLess, precision4) + "}10...}10}10 (" + commaFormat(layer) + " layers)"
    }
    // K1,000,000,000 and beyond
    let n = num.layer + 1
    if (num.gte("J^" + n + " 10")) n += 1
    return "10{{1}}" + format(n, precision)
}

function formatBAN(num, precision=player.options.notationOption[0], small=false) {
    if (AFactived) return ""
    if (ExpantaNum.isNaN(num)) return "NaN"
    let precision2 = player.options.notationOption[1] // for e
    let precision3 = player.options.notationOption[2] // for F, G, H
    let precision4 = player.options.notationOption[3] // for J, K
    num = new ExpantaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision, small)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.0001")) { return format(num.rec(), precision) + "⁻¹" }
    else if (num.lt(1)) return regularFormat(num, precision + (small ? 2 : 0))
    else if (num.lt(Math.min(1000,10**player.options.notationOption[5]))) return regularFormat(num, precision)
    else if (num.lt(10**player.options.notationOption[5])) return commaFormat(num)
    else if (num.lt("10^^" + player.options.notationOption[4])) { // 1e9 ~ 1F5
        let bottom = arraySearch(array, 0)
        let rep = arraySearch(array, 1)-1
        if (bottom >= 10**player.options.notationOption[5]) {
            bottom = Math.log10(bottom)
            rep += 1
        }
        let m = 10**(bottom-Math.floor(bottom))
        let e = Math.floor(bottom)
        let p = num.lt(1000) ? precision : precision2
        return "{10, ".repeat(rep) + regularFormat(m, p) + "{10, " + formatWhole(e, p) + "}" + "}".repeat(rep)
    }
    else if (num.lt("10^^" + 10**player.options.notationOption[5])) { // 1F5 ~ F1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 2}"
    }
    else if (num.lt("10^^^" + player.options.notationOption[4])) { // F1,000,000,000 ~ 1G5
        let rep = arraySearch(array, 2)
        if (rep >= 1) {
            setToZero(array, 2)
            return "{10, ".repeat(rep) + format(array, precision) + ", 2}".repeat(rep)
        }
        let n = arraySearch(array, 1) + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 2}"
    }
    else if (num.lt("10^^^" + 10**player.options.notationOption[5])) { // 1G5 ~ G1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 3}"
    }
    else if (num.lt("10^^^^" + player.options.notationOption[4])) { // G1,000,000,000 ~ 1H5
        let rep = arraySearch(array, 3)
        if (rep >= 1) {
            setToZero(array, 3)
            return "{10, ".repeat(rep) + format(array, precision) + ", 3}".repeat(rep)
        }
        let n = arraySearch(array, 2) + 1
        if (num.gte("10^^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 3}"
    }
    else if (num.lt("10^^^^" + 10**player.options.notationOption[5])) { // 1H5 ~ H1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 4}"
    }
    else if (num.lt("10^^^^^" + player.options.notationOption[4])) { // H1,000,000,000 ~ 5J4
        let rep = arraySearch(array, 4)
        if (rep >= 1) {
            setToZero(array, 4)
            return "{10, ".repeat(rep) + format(array, precision) + ", 4}".repeat(rep)
        }
        let n = arraySearch(array, 3) + 1
        if (num.gte("10^^^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 4}"
    }
    else if (num.lt("10^^^^^" + 10**player.options.notationOption[5])) { // 5J4 ~ J4$1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 5}"
    }
    else if (num.lt("10^^^^^^" + player.options.notationOption[4])) { // J4$1,000,000,000 ~ 5J5
        let rep = arraySearch(array, 5)
        if (rep >= 1) {
            setToZero(array, 5)
            return "{10, ".repeat(rep) + format(array, precision) + ", 5}".repeat(rep)
        }
        let n = arraySearch(array, 4) + 1
        if (num.gte("10^^^^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 5}"
    }
    else if (num.lt("10^^^^^^" + 10**player.options.notationOption[5])) { // 5J5 ~ J5$1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 6}"
    }
    else if (num.lt("10^^^^^^^" + player.options.notationOption[4])) { // J5$1,000,000,000 ~ 5J6
        let rep = arraySearch(array, 6)
        if (rep >= 1) {
            setToZero(array, 6)
            return "{10, ".repeat(rep) + format(array, precision) + ", 6}".repeat(rep)
        }
        let n = arraySearch(array, 5) + 1
        if (num.gte("10^^^^^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 6}"
    }
    else if (num.lt("10^^^^^^^" + 10**player.options.notationOption[5])) { // 5J6 ~ J6$1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 7}"
    }
    else if (num.lt("10^^^^^^^^" + player.options.notationOption[4])) { // J6$1,000,000,000 ~ 5J7
        let rep = arraySearch(array, 7)
        if (rep >= 1) {
            setToZero(array, 7)
            return "{10, ".repeat(rep) + format(array, precision) + ", 7}".repeat(rep)
        }
        let n = arraySearch(array, 6) + 1
        if (num.gte("10^^^^^^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 7}"
    }
    else if (num.lt("10^^^^^^^^" + 10**player.options.notationOption[5])) { // 5J7 ~ J7$1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 8}"
    }
    else if (num.lt("10^^^^^^^^^" + player.options.notationOption[4])) { // J7$1,000,000,000 ~ 5J8
        let rep = arraySearch(array, 8)
        if (rep >= 1) {
            setToZero(array, 8)
            return "{10, ".repeat(rep) + format(array, precision) + ", 8}".repeat(rep)
        }
        let n = arraySearch(array, 7) + 1
        if (num.gte("10^^^^^^^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 8}"
    }
    else if (num.lt("10^^^^^^^^^" + 10**player.options.notationOption[5])) { // 5J8 ~ J8$1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 9}"
    }
    else if (num.lt("10^^^^^^^^^^" + player.options.notationOption[4])) { // J8$1,000,000,000 ~ 5J9
        let rep = arraySearch(array, 9)
        if (rep >= 1) {
            setToZero(array, 9)
            return "{10, ".repeat(rep) + format(array, precision) + ", 9}".repeat(rep)
        }
        let n = arraySearch(array, 8) + 1
        if (num.gte("10^^^^^^^^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 9}"
    }
    else if (num.lt("10^^^^^^^^^^" + 10**player.options.notationOption[5])) { // 5J9 ~ J9$1,000,000,000
        let pol = polarize(array)
        return "{10, " + format(pol.top+Math.log10(pol.bottom), precision3) + ", 10}"
    }
    else if (num.lt("10^^^^^^^^^^10")) { // J9$1,000,000,000 ~ J10
        let rep = arraySearch(array, 10)
        if (rep >= 1) {
            setToZero(array, 10)
            return "{10, ".repeat(rep) + format(array, precision) + ", 10}".repeat(rep)
        }
        let n = arraySearch(array, 9) + 1
        if (num.gte("10^^^^^^^^^^" + (n + 1))) n += 1
        return "{10, " + format(n, precision) + ", 10}"
    }
    else if (num.lt("J" + 10**player.options.notationOption[5])) { // J10 ~ J1,000,000,000
        let pol = polarize(array, true)
        return "{10, " + regularFormat(Math.log10(pol.bottom) + pol.top, precision4) + ", " + commaFormat(pol.height+1) + "}"
    }
    else if (num.lt("J^" + (player.options.notationOption[4]-1) + " 10")) { // J1,000,000,000 ~ 1K5
        let rep = num.layer
        if (rep >= 1) return "{10, 10, ".repeat(rep) + format(array, precision) + "}".repeat(rep)
        let n = array[array.length-1][0]
        if (num.gte("J" + (n + 1))) n += 1
        return "{10, 10, " + format(n, precision) + "}"
    }
    else if (num.lt("J^" + (10**player.options.notationOption[5]-1) + " 10")) { // 1K5 ~ K1,000,000,000
        // https://googology.wikia.org/wiki/User_blog:PsiCubed2/Letter_Notation_Part_II
        // PsiCubed2 defined Jx as Gx for x < 2, resulting in J1 = 10 rather than 10^10, to
        // prevent issues when defining K and beyond. Therefore, there should be separate
        // cases for when the "top value" is below 2, and above 2.
        // ExpantaNum.js considers J1 to be equal to 1e10 rather than 10,
        // hence num.lt("J^999999 10") rather than num.lt("J^1000000 1").
        let pol = polarize(array, true)
        let layerLess = new ExpantaNum(array)
        let layer = num.layer
        return "{" + format(layerLess, precision4) + ", " + commaFormat(layer) + ", 1, 2}"
    }
    // K1,000,000,000 and beyond
    let n = num.layer + 1
    if (num.gte("J^" + n + " 10")) n += 1
    return "{10, " + format(n, precision4) + ", 1, 2}"
}

function formatLetter(num, precision=player.options.notationOption[0], small=false) {
    if (AFactived) return ""
    if (ExpantaNum.isNaN(num)) return "NaN"
    let precision2 = player.options.notationOption[1] // for e
    let precision3 = player.options.notationOption[2] // for F, G, H
    let precision4 = player.options.notationOption[3] // for J, K
    num = new ExpantaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision, small)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.0001")) { return format(num.rec(), precision) + "⁻¹" }
    else if (num.lt(1)) return regularFormat(num, precision + (small ? 2 : 0))
    else if (num.lt(10)) return regularFormat(num, precision)
    else if (num.lt(1e10)) {
        let base = num.log10()
        let int = base.floor()
        let rem = ExpantaNum.pow(10,base.sub(int))
        return (player.options.notation==8 ? regularFormat(rem,precision2) : "") + "E" + (player.options.notation==8 ? formatWhole(int) : regularFormat(base,precision2))
    }
    else if (num.lt("10^^10")) { // F10
        let pol = polarize(array)
        let base = num.slog(10)
        let int = base.floor()
        let rem = ExpantaNum.pow(10,base.sub(int))
        return (player.options.notation==8 ? regularFormat(rem,precision3) : "") + "F" + (player.options.notation==8 ? formatWhole(int) : regularFormat(base,precision3))
    }
    else if (num.lt("10^^^10")) { // G10
        let pol = polarize(array)
        if (num.lt(ExpantaNum.tetr(10, ExpantaNum.MAX_SAFE_INTEGER))){
            let base
            if (num.lt("10^^1e10")) base = 2+Math.log10(1+Math.log10(Math.log10(pol.top+Math.log10(pol.bottom))))
            else base = 2+Math.log10(2+Math.log10(Math.log10(Math.log10(pol.top+Math.log10(pol.bottom)))))
            base = new ExpantaNum(base)
            let int = base.floor()
            let rem = ExpantaNum.pow(10,base.sub(int))
            return (player.options.notation==8 ? regularFormat(rem,precision3) : "") + "G" + (player.options.notation==8 ? formatWhole(int) : regularFormat(base,precision3))
        }
        return (player.options.notation==8 ? regularFormat(pol.bottom,precision3) : "") + "G" + (player.options.notation==8 ? formatWhole(pol.top) : regularFormat(pol.top + Math.log10(pol.bottom), precision3))
    }
    else if (num.lt("10^^^^10")) { // H10
        let pol = polarize(array)
        if (num.lt(ExpantaNum.pent(10, ExpantaNum.MAX_SAFE_INTEGER))){
            let base
            if (num.lt("10^^^1e10")) base = 2+Math.log10(1+Math.log10(1+Math.log10(Math.log10(pol.top+Math.log10(pol.bottom)))))
            else base = 2+Math.log10(1+Math.log10(2+Math.log10(Math.log10(Math.log10(pol.top+Math.log10(pol.bottom))))))
            base = new ExpantaNum(base)
            let int = base.floor()
            let rem = ExpantaNum.pow(10,base.sub(int))
            return (player.options.notation==8 ? regularFormat(rem,precision3) : "") + "H" + (player.options.notation==8 ? formatWhole(int) : regularFormat(base,precision3))
        }
        return (player.options.notation==8 ? regularFormat(pol.bottom,precision3) : "") + "H" + (player.options.notation==8 ? formatWhole(pol.top) : regularFormat(pol.top + Math.log10(pol.bottom), precision3))
    }
    else if (num.lt("J10")) { // J10
        let pol = polarize(array, true)
        return (player.options.notation==8 ? regularFormat(2*5**(Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E),precision4) : "") + "J" + (player.options.notation==8 ? formatWhole(pol.height) : regularFormat(pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E, precision4))
    }
    else { // K10
        // https://googology.wikia.org/wiki/User_blog:PsiCubed2/Letter_Notation_Part_II
        // PsiCubed2 defined Jx as Gx for x < 2, resulting in J1 = 10 rather than 10^10, to
        // prevent issues when defining K and beyond. Therefore, there should be separate
        // cases for when the "top value" is below 2, and above 2.
        // ExpantaNum.js considers J1 to be equal to 1e10 rather than 10,
        // hence num.lt("J^999999 10") rather than num.lt("J^1000000 1").
        let pol = polarize(array, true)
        let layerLess = new ExpantaNum(array)
        let layer = num.layer
        let topJ
        if (layerLess.lt("10^^10")) { // Below J2: use Jx = Gx
            // layerLess is equal to (10^)^top bottom here, so calculate x in Gx directly.
            topJ = 1 + Math.log10(Math.log10(pol.bottom) + pol.top)
            layer += 1
        }
        else if (layerLess.lt("10{10}10")) { // J2 ~ J10
            topJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            layer += 1
        }
        else { // J10 and above: an extra layer is added, thus becoming JJ1 and above, where Jx = Gx also holds
            let nextToTopJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            let bottom = nextToTopJ >= 1e10 ? Math.log10(Math.log10(nextToTopJ)) : Math.log10(nextToTopJ)
            let top = nextToTopJ >= 1e10 ? 2 : 1
            topJ = 1 + Math.log10(Math.log10(bottom) + top)
            layer += 2
        }
        if (num.lt("J^9 10")) return (player.options.notation==8 ? regularFormat(topJ,precision4) : "") + "K" + (player.options.notation==8 ? formatWhole(layer) : regularFormat(layer + Math.log10(topJ), precision4))
        else {
            let base
            if (num.lt("J^9999999999 10")) base = 2 + Math.log10(1 + Math.log10(1 + Math.log10(1 + Math.log10(Math.log10(layer + Math.log10(topJ))))))
            else base = 2 + Math.log10(1 + Math.log10(1 + Math.log10(2 + Math.log10(Math.log10(Math.log10(layer + Math.log10(topJ)))))))
            base = new ExpantaNum(base)
            let int = base.floor()
            let rem = ExpantaNum.pow(10,base.sub(int)) // idk it is 10^x or 2*5^x
            return (player.options.notation==8 ? regularFormat(rem,precision4) : "") + "L" + (player.options.notation==8 ? formatWhole(int) : regularFormat(base,precision4))
        }
    }
}

function formatNumTroll(num, precision=player.options.notationOption[0], small=false) {
    if (AFactived) return ""
    if (ExpantaNum.isNaN(num)) return "NaN"
    let precision2 = player.options.notationOption[1] // for e
    let precision3 = player.options.notationOption[2] // for F, G, H
    let precision4 = player.options.notationOption[3] // for J, K
    num = new ExpantaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision, small)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.0001")) { return format(num.rec(), precision) + "⁻¹" }
    else if (num.lt(1)) return regularFormat(num.pow(2), precision + (small ? 2 : 0))
    else if (num.lt(1000**0.5)) return regularFormat(num.pow(2), precision)
    else if (num.lt(1e6)) return commaFormat(num.pow(2))
    else if (num.lt("10^^" + player.options.notationOption[4])) { // 1e9 ~ 1F5
        let bottom = arraySearch(array, 0)
        let rep = arraySearch(array, 1)-1
        if (bottom >= 1e6) {
            bottom = Math.log10(bottom)
            rep += 1
        }
        let m = 10**(bottom-Math.floor(bottom))
        let e = Math.floor(bottom)
        let p = num.lt(1000) ? precision : precision2
        return "e".repeat(rep) + regularFormat(m**2, p) + "e" + commaFormat(e**2)
    }
    else if (num.lt("10^^1e6")) { // 1F5 ~ F1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom**2, precision3) + "F" + commaFormat(pol.top**2)
    }
    else if (num.lt("10^^^" + player.options.notationOption[4])) { // F1,000,000,000 ~ 1G5
        let rep = arraySearch(array, 2)
        if (rep >= 1) {
            setToZero(array, 2)
            return "F".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 1) + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "F" + format(n, precision)
    }
    else if (num.lt("10^^^1e6")) { // 1G5 ~ G1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom**2, precision3) + "G" + commaFormat(pol.top**2)
    }
    else if (num.lt("10^^^^" + player.options.notationOption[4])) { // G1,000,000,000 ~ 1H5
        let rep = arraySearch(array, 3)
        if (rep >= 1) {
            setToZero(array, 3)
            return "G".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 2) + 1
        if (num.gte("10^^^" + (n + 1))) n += 1
        return "G" + format(n, precision)
    }
    else if (num.lt("10^^^^1e6")) { // 1H5 ~ H1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom**2, precision3) + "H" + commaFormat(pol.top**2)
    }
    else if (num.lt("10^^^^^" + player.options.notationOption[4])) { // H1,000,000,000 ~ 5J4
        let rep = arraySearch(array, 4)
        if (rep >= 1) {
            setToZero(array, 4)
            return "H".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 3) + 1
        if (num.gte("10^^^^" + (n + 1))) n += 1
        return "H" + format(n, precision)
    }
    else if (num.lt("J1e6")) { // 5J4 ~ J1,000,000,000
        let pol = polarize(array, true)
        return regularFormat((Math.log10(pol.bottom) + pol.top)**2, precision4) + "J" + commaFormat(pol.height**2)
    }
    else if (num.lt("J^" + (player.options.notationOption[4]-1) + " 10")) { // J1,000,000,000 ~ 1K5
        let rep = num.layer
        if (rep >= 1) return "J".repeat(rep) + format(array, precision)
        let n = array[array.length-1][0]
        if (num.gte("J" + (n + 1))) n += 1
        return "J" + format(n, precision)
    }
    else if (num.lt("J^999999 10")) { // 1K5 ~ K1,000,000,000
        // https://googology.wikia.org/wiki/User_blog:PsiCubed2/Letter_Notation_Part_II
        // PsiCubed2 defined Jx as Gx for x < 2, resulting in J1 = 10 rather than 10^10, to
        // prevent issues when defining K and beyond. Therefore, there should be separate
        // cases for when the "top value" is below 2, and above 2.
        // ExpantaNum.js considers J1 to be equal to 1e10 rather than 10,
        // hence num.lt("J^999999 10") rather than num.lt("J^1000000 1").
        let pol = polarize(array, true)
        let layerLess = new ExpantaNum(array)
        let layer = num.layer
        let topJ
        if (layerLess.lt("10^^10")) { // Below J2: use Jx = Gx
            // layerLess is equal to (10^)^top bottom here, so calculate x in Gx directly.
            topJ = 1 + Math.log10(Math.log10(pol.bottom) + pol.top)
            layer += 1
        }
        else if (layerLess.lt("10{10}10")) { // J2 ~ J10
            topJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            layer += 1
        }
        else { // J10 and above: an extra layer is added, thus becoming JJ1 and above, where Jx = Gx also holds
            let nextToTopJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            let bottom = nextToTopJ >= 1e10 ? Math.log10(Math.log10(nextToTopJ)) : Math.log10(nextToTopJ)
            let top = nextToTopJ >= 1e10 ? 2 : 1
            topJ = 1 + Math.log10(Math.log10(bottom) + top)
            layer += 2
        }
        return regularFormat(topJ**2, precision4) + "K" + commaFormat(layer**2)
    }
    // K1,000,000,000 and beyond
    let n = num.layer + 1
    if (num.gte("J^" + n + " 10")) n += 1
    return "K" + format(n, precision)
}

function formatLetterTroll(num, precision=player.options.notationOption[0], small=false) {
    if (AFactived) return ""
    if (ExpantaNum.isNaN(num)) return "NaN"
    let precision2 = player.options.notationOption[1] // for e
    let precision3 = player.options.notationOption[2] // for F, G, H
    let precision4 = player.options.notationOption[3] // for J, K
    num = new ExpantaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision, small)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.0001")) { return format(num.rec(), precision) + "⁻¹" }
    else if (num.lt(1)) return regularFormat(num, precision + (small ? 2 : 0))
    else if (num.lt(Math.min(1000,10**player.options.notationOption[5]))) return regularFormat(num, precision)
    else if (num.lt(10**player.options.notationOption[5])) return commaFormat(num)
    else if (num.lt("10^^" + player.options.notationOption[4])) { // 1e9 ~ 1F5
        let bottom = arraySearch(array, 0)
        let rep = arraySearch(array, 1)-1
        if (bottom >= 10**player.options.notationOption[5]) {
            bottom = Math.log10(bottom)
            rep += 1
        }
        let m = 10**(bottom-Math.floor(bottom))
        let e = Math.floor(bottom)
        let p = num.lt(1000) ? precision : precision2
        return "J".repeat(rep) + regularFormat(m, p) + "J" + commaFormat(e)
    }
    else if (num.lt("10^^" + 10**player.options.notationOption[5])) { // 1F5 ~ F1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "K" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^" + player.options.notationOption[4])) { // F1,000,000,000 ~ 1G5
        let rep = arraySearch(array, 2)
        if (rep >= 1) {
            setToZero(array, 2)
            return "K".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 1) + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "K" + format(n, precision)
    }
    else if (num.lt("10^^^" + 10**player.options.notationOption[5])) { // 1G5 ~ G1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "L" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^" + player.options.notationOption[4])) { // G1,000,000,000 ~ 1H5
        let rep = arraySearch(array, 3)
        if (rep >= 1) {
            setToZero(array, 3)
            return "L".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 2) + 1
        if (num.gte("10^^^" + (n + 1))) n += 1
        return "L" + format(n, precision)
    }
    else if (num.lt("10^^^^" + 10**player.options.notationOption[5])) { // 1H5 ~ H1,000,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "M" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^^" + player.options.notationOption[4])) { // H1,000,000,000 ~ 5J4
        let rep = arraySearch(array, 4)
        if (rep >= 1) {
            setToZero(array, 4)
            return "M".repeat(rep) + format(array, precision)
        }
        let n = arraySearch(array, 3) + 1
        if (num.gte("10^^^^" + (n + 1))) n += 1
        return "M" + format(n, precision)
    }
    else if (num.lt("J" + 10**player.options.notationOption[5])) { // 5J4 ~ J1,000,000,000
        let pol = polarize(array, true)
        return regularFormat(Math.log10(pol.bottom) + pol.top, precision4) + "N" + commaFormat(pol.height)
    }
    else if (num.lt("J^" + (player.options.notationOption[4]-1) + " 10")) { // J1,000,000,000 ~ 1K5
        let rep = num.layer
        if (rep >= 1) return "N".repeat(rep) + format(array, precision)
        let n = array[array.length-1][0]
        if (num.gte("J" + (n + 1))) n += 1
        return "N" + format(n, precision)
    }
    else if (num.lt("J^" + (10**player.options.notationOption[5]-1) + " 10")) { // 1K5 ~ K1,000,000,000
        // https://googology.wikia.org/wiki/User_blog:PsiCubed2/Letter_Notation_Part_II
        // PsiCubed2 defined Jx as Gx for x < 2, resulting in J1 = 10 rather than 10^10, to
        // prevent issues when defining K and beyond. Therefore, there should be separate
        // cases for when the "top value" is below 2, and above 2.
        // ExpantaNum.js considers J1 to be equal to 1e10 rather than 10,
        // hence num.lt("J^999999 10") rather than num.lt("J^1000000 1").
        let pol = polarize(array, true)
        let layerLess = new ExpantaNum(array)
        let layer = num.layer
        let topJ
        if (layerLess.lt("10^^10")) { // Below J2: use Jx = Gx
            // layerLess is equal to (10^)^top bottom here, so calculate x in Gx directly.
            topJ = 1 + Math.log10(Math.log10(pol.bottom) + pol.top)
            layer += 1
        }
        else if (layerLess.lt("10{10}10")) { // J2 ~ J10
            topJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            layer += 1
        }
        else { // J10 and above: an extra layer is added, thus becoming JJ1 and above, where Jx = Gx also holds
            let nextToTopJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            let bottom = nextToTopJ >= 1e10 ? Math.log10(Math.log10(nextToTopJ)) : Math.log10(nextToTopJ)
            let top = nextToTopJ >= 1e10 ? 2 : 1
            topJ = 1 + Math.log10(Math.log10(bottom) + top)
            layer += 2
        }
        return regularFormat(topJ, precision4) + "P" + commaFormat(layer)
    }
    // K1,000,000,000 and beyond
    let n = num.layer + 1
    if (num.gte("J^" + n + " 10")) n += 1
    return "P" + format(n, precision)
}

const standardPreE33 = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"]
const standardUnits = ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"]
const standardTens = ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Ocg", "Nog"]
const standardHundreds = ["", "Ct", "Dct", "Tct", "Qact", "Qict", "Sxct", "Spct", "Occt", "Noct"]
const standardMilestonePreEE33 = ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn", "Ve"]
const standardMilestoneUnits = ["", "Me", "Du", "Tr", "Te", "Pe", "He", "Hp", "Ot", "En", "Ve"]
const standardMilestoneTens = ["", "E", "Is", "Trc", "Tec", "Pec", "Hec", "Hpc", "Otc", "Enc"]
const standardMilestoneHundreds = ["", "Ht", "Dh", "Trh", "Teh", "Peh", "Hxh", "Heh", "Oth", "Enh"]

function standard(t1, t2, more, color = false){
    t1 = t1 % 1000
    t2 = t2 % 1000
    if (t1 == 0) return ""
    let output1 = ""
    let output2 = ""
    if (t1 !== 1 || (t1 == 1 && t2 == 0)){
      let ones1 = t1 % 10
      let tens1 = Math.floor(t1 / 10) % 10
      let hundreds1 = Math.floor(t1 / 100)
      output1 = standardUnits[ones1] + standardTens[tens1] + standardHundreds[hundreds1]
    }
    if (t2 < 10.5) output2 = standardMilestonePreEE33[t2]
    else{
      let mod100 = t2 % 100
      let ones2 = t2 % 10
      let tens2 = Math.floor(t2 / 10) % 10
      let hundreds2 = Math.floor(t2 / 100)
      if (mod100 < 10.5) output2 = standardMilestoneUnits[mod100] + standardMilestoneHundreds[hundreds2]
      else output2 = standardMilestoneUnits[ones2] + standardMilestoneTens[tens2] + standardMilestoneHundreds[hundreds2]
    }
    if (color) return output1 + `<span style="color:red">` + output2 + (more && t2 !== 0 ? "-" : "") + `</span>`
    else return output1 + output2 + (more && t2 !== 0 ? "-" : "")
}

function standardize(num, precision=player.options.notationOption[1], color = false){
    num = new ExpantaNum(num)
    if (num.lt(1000)) return regularFormat(num, precision)
    if (num.gte(ExpantaNum.mul("e1e3000",1000))) return format(num, precision)
    let exponent = num.log10().div(3).floor();
    let mantissa = num.div(new ExpantaNum(1000).pow(exponent))
    /*
    let mSub = mantissa.log10().floor().toNumber()
    precision -= mSub
    */
    let maxT1 = num.log10().sub(3).div(3).floor()
    let maxT2 = maxT1.log10().div(3).floor().toNumber()
    if (maxT1.lt(1e15)) maxT1 = maxT1.toNumber()
    else maxT1 = maxT1.div(new ExpantaNum(1000).pow(maxT2 - 4)).floor().toNumber()
    let tril = Math.floor(maxT1/1e12)
    let bill = Math.floor(maxT1/1e9) % 1000
    let mill = Math.floor(maxT1/1e6) % 1000
    let kill = Math.floor(maxT1/1e3) % 1000
    let ones = maxT1 % 1000
    if (mantissa.gte(1000 - 10 ** (-1 * precision) / 2)){
      mantissa = mantissa.div(1000)
      exponent = exponent.add(1)
    }
    if (num.lt(new ExpantaNum(1e33))) {
      return regularFormat(mantissa,precision) + " " + standardPreE33[maxT1]
    } else if (num.lt(new ExpantaNum(10).pow(3e15).mul(1000))) {
      return regularFormat(mantissa,precision) + " " + standard(tril, 4, 1, color) + standard(bill, 3, 1, color) + standard(mill, 2, 1, color) + standard(kill, 1, 1, color) + standard(ones, 0, 0, color)
    } else {
      return standard(tril, maxT2, (ones + kill + mill + bill !== 0 ? 1 : 0), color) + standard(bill, maxT2 - 1, (ones + kill + mill !== 0 ? 1 : 0), color) + standard(mill, maxT2 - 2, (ones + kill !== 0 ? 1 : 0), color) + standard(kill, maxT2 - 3, (ones !== 0 ? 1 : 0), color) + standard(ones, maxT2 - 4, 0, color)
    }
}

function getPointsDisplay(num, precision=player.options.notationOption[0], color=true){
    return format(num, precision)
    /*
    let x
    let array = num.array
    num = new ExpantaNum(num)
    let precision2 = player.options.notationOption[1] // for e
    let precision3 = player.options.notationOption[2] // for F, G, H
    if (color && (player.options.notation == 1 || player.options.notation == 4) && player.options.fullStandard && num.lt(ExpantaNum.mul("e1e3000",1000))) return standardize(num,precision,true)
    else x = format(num)
    // default
    if (player.options.notation == 0 || player.options.notation == 1 || player.options.notation == 2 || player.options.notation == 9 || player.options.notation == 12){
        x = x
            .replaceAll("e",`<span style="color:red">e</span>`)
            .replaceAll("F",`<span style="color:yellow">F</span>`)
            .replaceAll("G",`<span style="color:lime">G</span>`)
            .replaceAll("H",`<span style="color:cyan">H</span>`)
            .replaceAll("J",`<span style="color:blue">J</span>`)
            .replaceAll("K",`<span style="color:magenta">K</span>`)
    }
    else if (player.options.notation == 10){
        x = x
            .replaceAll("J",`<span style="color:red">J</span>`)
            .replaceAll("K",`<span style="color:yellow">K</span>`)
            .replaceAll("L",`<span style="color:lime">L</span>`)
            .replaceAll("M",`<span style="color:cyan">M</span>`)
            .replaceAll("N",`<span style="color:blue">N</span>`)
            .replaceAll("P",`<span style="color:magenta">P</span>`)
    }
    else if (player.options.notation == 7 || player.options.notation == 8){
        x = x
            .replaceAll("E",`<span style="color:red">E</span>`)
            .replaceAll("F",`<span style="color:orange">F</span>`)
            .replaceAll("G",`<span style="color:yellow">G</span>`)
            .replaceAll("H",`<span style="color:lime">H</span>`)
            .replaceAll("J",`<span style="color:cyan">J</span>`)
            .replaceAll("K",`<span style="color:blue">K</span>`)
            .replaceAll("L",`<span style="color:magenta">L</span>`)
    }
    // up arrow
    else if (player.options.notation == 3 || player.options.notation == 4 || player.options.notation == 5){
        x = x
            .replaceAll("10^",`<span style="color:red">10^</span>`)
            .replaceAll(`<span style="color:red">10^</span>^`,`<span style="color:orange">10^^</span>`)
            .replaceAll(`<span style="color:orange">10^^</span>^`,`<span style="color:yellow">10^^^</span>`)
            .replaceAll(`<span style="color:yellow">10^^^</span>^`,`<span style="color:lime">10^^^^</span>`)
        for (let i = 5; i <= 10; i++){
            x = x.replaceAll("10{" + i + "}",`<span style="color:cyan">10{` + i + `}</span>`)
        }
        if (num.gte("J" + 10**player.options.notationOption[5]) && num.lt("J^" + (player.options.notationOption[4]-1) + " 10")){
            x = x
                .replaceAll("10{",`<span style="color:blue">10{</span>`)
                .replaceAll("}10",`<span style="color:blue">}10</span>`)
        }
        x = x
            .replaceAll("10{{1}}",`<span style="color:magenta">10{{1}}</span>`)
    }
    else if (player.options.notation == 6){
        let color = "red"
        if (num.gte("10^^" + player.options.notationOption[4])) color = "orange"
        if (num.gte("10^^^" + player.options.notationOption[4])) color = "yellow"
        if (num.gte("10^^^^" + player.options.notationOption[4])) color = "lime"
        if (num.gte("10^^^^^" + player.options.notationOption[4])) color = "cyan"
        if (num.gte("10^^^^^^^^^^10")) color = "blue"

        x = x.replaceAll("{10,",`<span style="color:` + color + `">{10,</span>`)
        x = x.replaceAll("}",`<span style="color:red">}</span>`)
        x = x.replaceAll(`, 2<span style="color:red">}</span>`,`<span style="color:orange">, 2}</span>`)
        x = x.replaceAll(`, 3<span style="color:red">}</span>`,`<span style="color:yellow">, 3}</span>`)
        x = x.replaceAll(`, 4<span style="color:red">}</span>`,`<span style="color:lime">, 4}</span>`)
        for (let i = 5; i <= 10; i++){
            x = x.replaceAll(`, ` + i + `<span style="color:red">}</span>`,`<span style="color:cyan">, ` + i + `}</span>`)
        }

    }
    return x
    */
}