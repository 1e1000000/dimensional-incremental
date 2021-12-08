const saveId = "dimensionincremental"

function reset(){
  player = {
    points: new ExpantaNum(1),
    lastTick: Date.now(),
    tab: 1,
    subtab1: 1,
    prestige1: new ExpantaNum(0),
    upgrade1: [false,false,false,false],
  }
}

function loadGame(loadgame) {
  //Sets each variable in 'player' to the equivalent variable in 'loadgame' (the saved file)
  for (i=0; i<Object.keys(loadgame).length; i++) {
    if (loadgame[Object.keys(loadgame)[i]] != "undefined") {
      if (typeof loadgame[Object.keys(loadgame)[i]] == "string") {player[Object.keys(loadgame)[i]] = new ExpantaNum(loadgame[Object.keys(loadgame)[i]])}
      else {player[Object.keys(player)[i]] = loadgame[Object.keys(loadgame)[i]]}
    }
  }
}

function hardReset() {
  if (confirm("Are you sure you want to reset? You will lose everything!")) {
    reset()
    save()
    location.reload()
  }
}

function save() {localStorage.setItem(saveId, JSON.stringify(player))}

setInterval(save, 5000)

function exportGame() {
  save()
  navigator.clipboard.writeText(btoa(JSON.stringify(player))).then(function() {
    alert("Copied to clipboard!")
  }, function() {
    alert("Error copying to clipboard, try again...")
  });
}

function importGame() {
  loadgame = JSON.parse(atob(prompt("Input your save here:")))
  if (loadgame && loadgame != null && loadgame != "") {
    reset()
    loadGame(loadgame)
    save()
  }
  else {
    alert("Invalid input.")
  }
}

function load() {
	reset()
	let loadgame = JSON.parse(localStorage.getItem(saveId))
	if (loadgame != null) {
		loadGame(loadgame)
    tab(player.tab)
    subtab(1,player.subtab1)
	}
}

load()