const saveId = "dimensionincremental"

function ENify(x){
    let nx = new ExpantaNum(0);
    nx.array = x.array;
    nx.sign = x.sign;
    nx.layer = x.layer;
    return nx;
}

function calc(dt, dt_offline){
  AFactived = Boolean(new Date().getMonth() == 3 && new Date().getDate() == 1)
  player.points = player.points.add(getPointsGain().mul(dt))
  player.offline.time = Math.max(player.offline.time-tmp.offlineMult*dt_offline,0)
  player.lineSegments = player.lineSegments.add(LAYERS.lineSegGain().mul(dt)).min(LAYERS.lineSegGain().mul(10))
  for (let i=1;i<=amtLayers;i++){
    if (LAYERS.autoGain(i)) LAYERS.doReset(i)
  }
  updateMilestones()
}

function getPlayerData(){
  let s = {
    points: new ExpantaNum(1),
    tab: 1,
    subtab: [null,1],
    subsubtab: [null,[null,1,1]],
    prestige: [null,new ExpantaNum(0),new ExpantaNum(0)],
    upgrade: [null,[],[]],
    buyables: [null,[],[null,new ExpantaNum(0),new ExpantaNum(0),new ExpantaNum(0)]],
    milestone: [null,[],[]],
    majorVer: 1, // usually meta-layer
    version: 0, // usually a layer
    version2: 0, // usually a new content on a layer
    version3: 0, // usually more content on existing content
    patchVer: 0, // usually a bug fix
    updateName: "",
    offline: {
      current: Date.now(),
      time: 0,
    },
    options: {
      notation: 0,
      debug: 0,
      notationOption: [2,3,4,6,5,9], // from left to right are base, e, FGH, JK, Letters to next, Exp of Num to next
      font: 'Courier Prime'
    },
    dimShift: 0,
    lineSegments: new ExpantaNum(0),
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
      if (player.options.debug) console.log("Game saved at Timestamp " + (Date.now()/1000).toLocaleString())
    }
}

function load(x){
    if(typeof x == "string" & x != ''){
      loadPlayer(JSON.parse(atob(x)))
    } else {
      wipe()
      tab(1)
      for (let i=1;i<=player.subtab.length-1;i++){
        subtab(i,1)
        for (let j=1;j<=player.subsubtab[i].length-1;j++){
          if ([2].includes(j)){
            subsubtab(i,j,1)
          }
        }
      }
    }
}

function loadPlayer(load) {
  const DATA = getPlayerData()
  player = Object.assign(getPlayerData(), player)
  player = deepNaN(load, DATA)
  player = deepUndefinedAndExpantaNum(player, DATA)
  convertToExpNum()
  for (let i=1;i<=10;i++){
    updateTemp()
  }
  tab(player.tab === undefined ? 1 : player.tab)
  for (let i=1;i<=player.subtab.length-1;i++){
    subtab(i,player.subtab[i] === undefined ? 1 : player.subtab[i])
    for (let j=1;j<=player.subsubtab[i].length-1;j++){
      if ([2].includes(j)){
        subsubtab(i,j,player.subsubtab[j] === undefined ? 1 : player.subsubtab[j])
      }
    }
  }
  // fix issues, empty yet

  // setup offline progression
  let off_time = (Date.now() - player.offline.current)/1000
  if (off_time >= 10) player.offline.time += off_time
  // set version
  player.majorVer = 1
  player.version = 1
  player.version2 = 1
  player.version3 = 1
  player.patchVer = 0
  player.updateName = "Text Font Update"
  console.log("Game loaded at Timestamp " + (Date.now()/1000).toLocaleString())
  scrollNextMessage()
}

function deepNaN(obj, data) {
  for (let x = 0; x < Object.keys(obj).length; x++) {
      let k = Object.keys(obj)[x]
      if (typeof obj[k] == 'string') {
          if ((obj[k] == "NaN" || obj[k] == null) && Object.getPrototypeOf(data[k]).constructor.name == "ExpantaNum") obj[k] = data[k]
      } else {
          if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
          if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
      }
  }
  return obj
}

function deepUndefinedAndExpantaNum(obj, data) {
  if (obj == null) return data
  for (let x = 0; x < Object.keys(data).length; x++) {
      let k = Object.keys(data)[x]
      if (obj[k] === null) continue
      if (obj[k] === undefined) obj[k] = data[k]
      else {
          if (Object.getPrototypeOf(data[k]).constructor.name == "ExpantaNum") obj[k] = E(obj[k])
          else if (typeof obj[k] == 'object') deepUndefinedAndExpantaNum(obj[k], data[k])
      }
  }
  return obj
}

function convertToExpNum(){
  player.points = ENify(player.points)
  for (let i=1;i<=player.prestige.length-1;i++){
    player.prestige[i] = ENify(player.prestige[i])
    for (let j=1;j<=player.buyables[i].length-1;j++){
      player.buyables[i][j] = ENify(player.buyables[i][j])
    }
  }
  player.lineSegments = ENify(player.lineSegments)
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
    wipe()
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