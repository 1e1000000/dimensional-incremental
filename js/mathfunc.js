// Math Functions, may move later

function powExp(n, exp){
    n = new ExpantaNum(n)
	if (n.lt(10)) return n
	return ExpantaNum.pow(10,n.log10().pow(exp))
}

function powExp2(n, exp){
    n = new ExpantaNum(n)
	if (n.lt(1e10)) return n
	return ExpantaNum.pow(10,ExpantaNum.pow(10,n.log10().log10().pow(exp)))
}

function powExp3(n, exp){
    n = new ExpantaNum(n)
	if (n.lt(ExpantaNum.pow(10,1e10))) return n
	return ExpantaNum.pow(10,ExpantaNum.pow(10,ExpantaNum.pow(10,n.log10().log10().log10().pow(exp))))
}

function inf(x = 1){
	return new ExpantaNum(Number.MAX_VALUE).pow(x)
}

function inflog(x = 1){
	return new ExpantaNum(Number.MAX_VALUE).log10().pow(x)
}

function slog(n){
	n = new ExpantaNum(n)
	return n.slog()
}

function slogadd(n,add){
	n = new ExpantaNum(n)
	return ExpantaNum.tetrate(10,slog(n).add(add))
}

function mulSlog(n, mul){
	if (n.lt(1)) return n
	return tet10(slog(n).mul(mul))
}

function powSlog(n, exp){
	if (n.lt(10)) return n
	return tet10(slog(n).pow(exp))
}

function tet10(n){
	n = new ExpantaNum(n)
	return ExpantaNum.tetrate(10,n)
}

function pent10(n){
	n = new ExpantaNum(n)
	return ExpantaNum.pentate(10,n)
}

// Not fully Implemented yet

function ackB10(arrow, n){
    arrow = new ExpantaNum(arrow).add(2).floor()
    n = new ExpantaNum(n)
    return ExpantaNum.hyper(arrow)(10,n)
}

function hyper(arrow){
    arrow = new ExpantaNum(arrow)
    let n = arrow.sub(arrow.floor())
    n = ExpantaNum.pow(5,n).mul(2)
    arrow = arrow.floor()
    return ExpantaNum.hyper(arrow)(10,n)
}

function expansion(base, n){
    base = new ExpantaNum(base).floor()
    n = new ExpantaNum(n).floor()
    return ExpantaNum.expansion(base, n)
}

function graham(n = 64){
	n = new ExpantaNum(n).floor()
	if (n.lte(0)) return new ExpantaNum(4)
	return expansion(new ExpantaNum(3).arrow(4)(3), n)
}