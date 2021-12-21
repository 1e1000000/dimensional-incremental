const saveId = "dimensionincremental-v1.0"

function ENify(x){
    let nx = new ExpantaNum(0);
    nx.array = x.array;
    nx.sign = x.sign;
    nx.layer = x.layer;
    return nx;
}

function calc(dt, dt_offline){
  player.points = player.points.add(getPointsGain().mul(dt))
  player.offline.time = Math.max(player.offline.time-tmp.offlineMult*dt_offline,0)
}

function getPlayerData(){
  let s = {
    points: new ExpantaNum(1),
    tab: 1,
    subtab: [null,1],
    prestige: [null,new ExpantaNum(0)],
    upgrade: [null,[]],
    majorVer: 1, // usually meta-layer
    version: 0, // usually a layer
    version2: 0, // usually a new content on a layer
    version3: 0, // usually more content on existing content
    patchVer: 0, // usually a bug fix
    offline: {
      current: Date.now(),
      time: 0,
    },
  }
  return s
}

function wipe() {
  player = getPlayerData()
}

function save(){
    if (tmp.offlineActive) return
    else {
      if (localStorage.getItem(saveId) == '') getPlayerData()
      localStorage.setItem(saveId,btoa(JSON.stringify(player)))
      console.log("Game saved at Timestamp " + (Date.now()/1000).toLocaleString())
    }
}

function load(x){
    if(typeof x == "string" & x != ''){
      loadPlayer(JSON.parse(atob(x)))
    } else {
      wipe()
    }
}

function loadPlayer(load) {
  //getPlayerData()
  player = Object.assign(getPlayerData(), player)
  for (let x = 0; x < Object.keys(player).length; x++) {
    let k = Object.keys(player)[x]
    if (typeof player[k] == 'object' && getPlayerData()[k]) player[k] = Object.assign(getPlayerData()[k], load[k])
  }
  convertToExpNum()
  tab(1)
  for (let i=1;i<=player.subtab.length-1;i++){
    subtab(i,1)
  }
  let off_time = (Date.now() - player.offline.current)/1000
  if (off_time >= 10) player.offline.time += off_time
  console.log("Game loaded at Timestamp " + (Date.now()/1000).toLocaleString())
}

function convertToExpNum(){
  player.points = ENify(player.points)
  for (let i=1;i<=player.prestige.length-1;i++){
    player.prestige[i] = ENify(player.prestige[i])
  }
}

function loadGame() {
  wipe()
  load(localStorage.getItem(saveId))
  updateTemp()
  updateHTML()
}

window.setInterval(function() {
  if (!tmp.offlineActive) save()
}, 5000)

function hardReset() {
  if (confirm("Are you sure you want to reset? You will lose everything!")) {
    reset()
    save()
    console.log("Save resetted at Timestamp " + (Date.now()/1000).toLocaleString())
    location.reload()
  }
}

function exportGame() {
  save()
  navigator.clipboard.writeText(btoa(JSON.stringify(player))).then(function() {
    alert("Copied to clipboard!")
    console.log("Save exported at Timestamp " + (Date.now()/1000).toLocaleString())
  }, function() {
    alert("Error copying to clipboard, try again...")
    console.log("Save failed to export at Timestamp " + (Date.now()/1000).toLocaleString())
  });
}

function importGame() {
  let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")
  if (loadgame != null) {
      load(loadgame)
      save()
      console.log("Save imported at Timestamp " + (Date.now()/1000).toLocaleString())
      location.reload()
  } else console.log("Save failed to import at Timestamp " + (Date.now()/1000).toLocaleString())
}
