var tmp = {
    offlineActive: 0,
    offlineMult: 1,
}

function updateTemp(){
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
}