var newsArray;

const msg6844 = ["YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","YOU MUST DIE!!!","HR5171 is Boiling You","is Dead!!!(1971-2021)","F**k!!!"]
const msg6844_2 = ["RIP","F**k You","LOL"]
const gabrielList = ["Gabrieldebastiani","Gabrieldebastiani","Gabrieldebastiani","gabrieldebastiani123","gabriel1","gabriel2","gabriel3","Gabriel1847"] // total: 8
const laporteList = ["0936","3903","4362","5356","5419","5490","5545","5854","6409","6927","8032","8046"]
const incrementalList = ["5038","9124","0298","6539","4002","2236","3898","2218","1821","4271"]
const ggghhhhggtList = ["Ggghhhhggt","Jakekekekejej","Davidsew","Davavvavavavavavavvevaaadivid","Smacg the best","Wong stop banning me","Orange boss"]
const smacg13toGhgtMSG = ["Vandalism","Blocking","Final warning"]
const wth05toGhgtMSG = ["NO","NEVER","ALWAYS FAIR"]
const usertoEMRMSG = ["Permaban on Eliezer's marble race","The change of my username on EMR Committee"]
const wth05toEMRMSG = [
  "YOU ARE ONLY MAKING THE WIKI WORSE",
  "YOU ARE ONLY MAKING THE WIKI MORE WORSE",
  "YOU ARE ONLY MAKING THE WIKI EVEN WORSE",
  "YOU ARE ONLY MAKING THE WIKI ABOUT TO BE CLOSED",
  "YOU ARE ONLY HURTING THE WIKI",

  "THIS IS USELESS",
  "THIS IS USELESS, YOU STILL CAN BANNED FOR EVADE THE BAN",
  "THIS IS USELESS, YOU STILL CAN GET BANNED FOR EVADE THE BAN"
]
const wth05toSmacg13MSG = [ // may extended later
  "Outdated Information on ML2020 Showdown Page",
  "Vandalism report",
  "Delete DNS page?",
  "Algosonic putting false/unconfirmed information twice in ML2022 page",
  "Jakekekekejej vandalism pages",
  "a new user is coming",
  "Incorrect Information found in couple pages",
  "Underage user found", // really?
  "Another Vandalizer",
  "Algosonic doing low quality edits on Savage Speeders page for the third times",
  "Can you block EMR forever?",
  "Delete below page",
  "Look below",
  "Ban Jakekekekejej forever because underage",
  "Ban Davidsew for spamming/harassing in a Thread",
  "Spammer found",
  "Block request",
  "Block Davidsew for harassing FlameMr317",
  "Check every edit that make by EMR",
  "Block request (?)",
  "Requests",
  "Block request",
  "Optical4937 should be blocked for edit warring",
  "Request",
  "Vandalism (yet again)",
  ".", // huh?
  "Hi", // request to delete 2 user pages
  "Delete these messages",
  "First request in 2022",
  "Unblock these users",
  "Delete this",
  "Hi Smacg",
  "Random",
]

const randomMessageBy6844 = [
    "@Patashu WHAT IS HE 1523-0901?!!",
    "@IdleSquadron  WHAT IS HE 1523-0901?!!",
    "@DEMEMZEA  HOW LARGE IS THE UNIVERSE",
    "@Yahtzee Master HOW OLD IS HD 140283 STAR?!!",
    "@DEMEMZEA  WHAT IS HD 140283?",
    "@DEMEMZEA WHAT IS HE 1523-0901?",
    "@DEMEMZEA HE 1523-0901 is Insulting you!",
    "@DEMEMZEA What is SMSS J031300.36-670839.3",
    "@DEMEMZEA SMSS J031300.36-670839.3 is bullying you",
    "@DEMEMZEA HE 1523-0901 is COVID-19 Creator:underage:",
    "@TheMKeyHolder NOT BAN",
    "@IdleSquadron @DEMEMZEA What is HR 8799",
    "@MEE6 Attack @Despacit2.0",
    "@MEE6 Insult @IdleSquadron",
    "@MEE6 and @DEMEMZEA Insult @Hevipelle",
    "@IdleSquadron  is Defaming @Hevipelle",
    "@IdleSquadron  You Can Type HD 122563",
    "@MEE6 HD 122563 is Freezing You",
    "@Omsi HD 114762 is Freezing You",
    "@Moderator",
    "@unpingabot HE 1327-2326 is Boiling You",
    "@unpingabot  try to type [Ordinal Markup link]",
    "@Reinhardt try to type [HD 172167 wiki page]",
    "@Reinhardt try to type [Max Planck wiki page]",
    "@unpingabot try to type [HD 10180 wiki page]",
    "@Reinhardt Try to Type [HE 0107-5240 wiki page] with file below",
    "He1523a.jpg @IdleSquadron HE 1523-0901",
]

function number2digits(num){
  if (num > 100) num = num % 100
  let output = num
  if (num < 10) output = "0" + output
  return output.toString()
}

function classifiedredactedcomingsoonquestionmarkrandomgenerate(){
  if (Math.random() < 0.01) return "Milestones of this wiki"
  let random1 = Math.random()
  let random2 = Math.random()
  if (random1 > 0.5){
    if (random2 > 0.5){
      return "Redacted"
    } else return "Coming Soon"
  } else {
    if (random2 > 0.5){
      return "Classified"
    } else return "???"
  }
}

function fakeupdatepagerandomgenerate(){
  if (Math.random() < 0.01) return "Extensions of Updates on the switch"
  let random = Math.random()
  if (random < 1/3) return "Updates on the switch"
  else return "Extensions of Updates" // this appear 2x more common than presious one because it has 2 versions
}

function numToOrd(num){
  let numMod100 = num % 100
  let ord = ""
  if (Math.floor(numMod100 / 10) == 1) ord = "th"
  else {
    switch(numMod100 % 10) {
    case 1:
      ord = "st"
      break;
    case 2:
      ord = "nd"
      break;
    case 3:
      ord = "rd"
      break;
    default:
      ord = "th"
    }
  }
  return num.toLocaleString() + ord
}

function getNumberBasedOnArrayLength(){
  let x = newsArray.length
  let r = Math.random()
  if (r < 1e-5){
    x = ExpantaNum.expansion(10,x)
  } else if (r < 1e-4){
    x = ExpantaNum.hyper(x)(10,10)
  } else if (r < 1e-3){
    x = ExpantaNum.pent(10,x)
  } else if (r < 1e-2){
    x = ExpantaNum.tetr(10,x)
  } else if (r < 1e-1){
    x = ExpantaNum.pow(10,x)
  } else {

  }
  return x
}

function random12abba(length=6){
  let list = ["1","2","a","b","A","B"]
  let string = ""
  for (let i=1;i<=length;i++){
    string = string+list[Math.floor(Math.random()*list.length)]
  }
  return string
}

function randomGgghhhhggt(length=8){
  let list = ["e","f","g","h"]
  let string = ""
  for (let i=1;i<=length;i++){
    string = string+list[Math.floor(Math.random()*list.length)]
  }
  return "G" + string + "t"
}

function layerNameGenerate(x = player.points){
  x = new ExpantaNum(x).max(10)
  let input = x
  let slogInf = new ExpantaNum(inf()).slog(10)
  let superLayer = x.slog(10).sub(slogInf).max(0).floor()
  if (x.gte(inf())){
    if (x.slog(10).gte(inf())){
      x = x.slog(10)
    } else {
      x = slogadd(x, superLayer.mul(-1))
    }
  }
  let layer = x.log10().logBase(inflog()).floor()
  let res = ExpantaNum.pow(10,x.log10().div(inflog().pow(layer))).div(10)
  if (input.slog(10).gte(inf())) return "Your points is enough to do a Meta Layer " + formatWhole(layer.max(1)) + " reset. When you reset, you will have " + format(isNaN(res)?1:res) + " layer points."
  else if (input.log10().gte(inf())) return "Your points is enough to do a Mk" + formatWhole(superLayer.add(1)) + " Layer " + formatWhole(layer.max(1)) + " reset. When you reset, you will have " + format(isNaN(res)?1:res) + " layer points."
  else if (input.gte(inf())) return "Your points is enough to do a Layer " + formatWhole(layer) + " reset. When you reset, you will have " + format(res) + " layer points."
  else return "Your points isn't enough to do a Layer " + formatWhole(1) + " reset, sorry about that."
}

// newsticker function start

function updateNewsArray() {
  newsArray = [
    // 2020
    [() => (Math.random() < 0.01 ? "wtf md762 changed team page to app name" : "changing team page to app name, wtf"), true],
    // 1% if generate texts include md762
    [() => "WHO JUST GHOSTPINGED ME 7 TIMES - SuperSpruce; TheMKeyHolder: i know who, it was @" + Math.floor(Math.random()*100), true],
    // 1% if generate 98
    [() => "WHO JUST GHOSTPINGED ME 7 TIMES - SuperSpruce; TheMKeyHolder: i know who, it was @this moment that he know, he fxxked up.", Math.random()<=0.01],
    // 1% if generate this newsticker
    [() => "bruh - red" + (Math.floor(Math.random()*100)).toString(11), true],
    // 1% if generate reda
    [() => (Math.random() < 0.5 ? "Jamie!#0750" : "nonono#8241") + " has been warned, Reason: Bad word usage. (Repeat count: " + Math.floor(Math.random()*100+1)*2 + ")", true],
    // 1% if generate nonono with 160 repeat count or Jamie! with 20 repeat count
    [() => Math.random() < 0.01 ? "Postψ(Ω) post-ψ(Ω) are built on multiplication and Capital Omega (Ω), where copies of part of an Ordinal aren't added together; they are multiplied together. This doesn't really affect how Ordinals post-ψ(Ω) work, as they work mostly identical to Ordinals pre-ψ(Ω). If the amount of copies inside the Ordinal are equal to the value of the Base, they will fuse together and change to a form with its exponent added by 1. For example, ψ(ΩΩ2+Ω+1ψ(ΩΩ2+Ω+1ψ(ΩΩ2+Ω+1))) will be transformed to ψ(ΩΩ2+Ω+2). However there is a key difference between Ordinals post-ψ(Ω) and pre-ψ(Ω). When Ordinals post-ψ(Ω) have a number in them that equals the value of the Base, it doesn't go straight to maximised form. Where the number that had its value equal to the Base will be changed to the contents of the other values in the Ordinal. Say for example you had an Ordinal of ψ(ΩΩ2+Ω2+2ψ(ΩΩ2+Ω2+2ψ(ΩΩ2+Ω2+2))). This would be transformed to ψ(ΩΩ2+Ω2+ω), and 2 copies of it would look like ψ(ΩΩ2+Ω2+ψ(ΩΩ2+Ω2+ω))." : "Ordinal is UselessThis page is bad IP ban me", true],
    // 1% if generate super long text
    [() => "You used to only be able to hit c8x2 with the double OP gain incrementy upgrade, but the quadrupler actually isn't disabled in c8 - NoHaxJust" + (Math.random() < 0.01 ? Math.PI : "Pi"), true],
    // 1% if generate 3.14159...
    [() => "Patcail deleted page Post " + (Math.random() < 0.01 ? "Collapse" : "Factor Boost"), true],
    // 1% if generate Collapse
    [() => "we're " + (Math.random() < 0.01 ? "" : "not ") + "adding an exit the incrementyverse update - TheMKeyHolder", true],
    // 1% if not doesn't generate
    [() => "Minecraft, Factorio, both or n" + (Math.random() < 0.01 ? "ei" : "ie") + "ther?", true],
    // 1% if generate neither
    [() => "IdleSquadron deleted page " + classifiedredactedcomingsoonquestionmarkrandomgenerate(), true],
    // 1% if generate Milestones of this wiki
    [() => "IdleSquadron deleted page " + fakeupdatepagerandomgenerate(), true],
    // 1% if generate Extensions of Updates on the switch
    [() => "Removed " + (Math.random() < 0.5 ? "Facebook " : "Messenger ") + (Math.random() < 0.01 ? "Cardinals" : "Ordinals") + " since it will never exist in the game", true],
    // 1% if generate Cardinals
    [() => "suggestion: " + (Math.random() < 0.01 ? "kick" : "ban") + " this guy [image below the message] - Crimson406" + (Math.random() < 0.5 ? "1" : ""), true],
    // 1% if generate kick
    [() => "They are related- " + format(7) + " is half of " + format(14) + ". - " + (Math.random() < 0.01 ? "Dolphin0" : "McDolphinMarble57") , true],
    // 1% if generate Dolphin0




    



    // 2021
    [() => "How?! @" + (Math.random() < 0.01 ? "everyone" : "Verified") + " is not a pingable role - SuperSpruce", true],
    // 1% if generate everyone
    // Ref: message that SuperSpruce accidentally pinged everyone
    [() => (Math.random() < 0.01 ? "w" : "r") + "eee spoilers", true],
    // 1% if generate weeee
    // Ref: On Late 2020/Early 2021, upvoid keep leak the OM test link, this is one of the reason that TheMKeyHolder leave
    [() => "@" + (Math.random() < 0.01 ? format(1e308) : "WongTingHo05") + " YOU MUST DIE!!! - " + format(6844), true],
    // 1% if generate formatted 1e308 (my old discord username)
    // Ref: On 2021/2/6, 6844 typed "@WongTingHo05 YOU MUST DIE!!!", the user is extremely toxic...
    [() => (Math.random() < 0.01 ? msg6844_2[Math.floor(Math.random()*msg6844_2.length)] + "@WongTingHo05 " : "@WongTingHo05 " + msg6844[Math.floor(Math.random()*msg6844.length)]) + " - " + format(6844), true],
    // 1% if generate any message with prefix
    // Ref: Similar as above
    [() => randomMessageBy6844[Math.floor(Math.random()*randomMessageBy6844.length)] + " - " + (Math.random() < 0.01 ?  "3^8+3^5+3^3+3^2+3^1+3^0" : "6844"), Math.random() < 0.2],
    // 1% if generate 3^8+3^5+3^3+3^2+3^1+3^0 (6844 messages without pinging me)
    // Ref: Similar as above, but 5x rarer
    [() => "Can you " + (Math.random() < 0.01 ? "delete" : "unpin") + " this message, it seem SUPER ANNOYING - me", true],
    // 1% if generate delete
    // Ref: On early February 2021, I request to unpin the message that typed supercesi and pinned on October 2020
    [() => "Can you unpin this message because the message is f**k off " + (Math.random() < 0.01 ? "LowDeath675" : "ld675"), true],
    // 1% if generate LowDeath675
    // Ref: On late February 2021, I request to unpin the message that typed f**k off LowDeath675 and pinned on 13 days before this message sent
    [() => "DNA Ordinal = " + (Math.random() < 0.01 ? NaN : 0), true],
    // 1% if generate NaN
    // Ref: Googology Community in 2021
    [() => "Hi Emb" + (Math.random() < 0.01 ? "y" : "i"), true],
    // 1% if generate Emby
    // Ref: Googology Community in 2021
    [() => "!ban @" + (Math.random() < 0.01 ? "XnoobSpeakable" : gabrielList[Math.floor(Math.random()*gabrielList.length)]) + " underage", true],
    // 1% if generate XnoobSpeakable
    // Ref: On 2021 Quarter 2, A lot of user was banned on VeproGame discord server due to being underaged
    [() => "@Vepro ban @Duuh and @Duuh" + (Math.max(0,Math.random()*10-0.05)).toFixed(1) + " because underage", true],
    // 1% if generate 2.0
    // Ref: This message was leave on Late October 2021, as Duuh and Duuh2.0 was still in VeproGame discord server despite underage  
    [() => "E308.25 blocked JakeCampbell" + number2digits(Math.floor(Math.random()*100)) + " with an expiration time of indefinite (Insect false information: Create Fake Update Page)", true],
    // 1% if generate 19
    // Ref: On Late January 2021, JakeCampbell19 vandalism Time Layers wiki by creating "Extensions of Updates"
    [() => "Smacg" + number2digits(Math.floor(Math.random()*100)) + " blocked Ggghhhhggt with an expiration time of indefinite (Intimidating behavior/harassment)", true],
    // 1% if generate 13
    // Ref: On Late October 2021, Ggghhhhggt was blocked on Jelle's Marble Run wiki due harassing Smacg13
    [() => "Because LEAKING - me with see ya later" + (Math.random() < 0.01 ? " sucker" : "") + "! image", true],
    // 1% if sucker appear
    // Ref: This message was leave on Early March 2021, someone ask why MEME was banned, I sent "Because LEAKING" with see ya later sucker! image below
    [() => "scam" + (Math.random() < 0.01 ? "mer, ban him immediately" : ""), true],
    // 1% if ban him immediately appear
    // Ref: Discord in 2021
    [() => (Math.random() < 0.01 ? "" : "@everyone") + " (scam message) [scam link]", true],
    // 1% if @everyone doesn't appear
    // Ref: Discord in 2021
    [() => (Math.random() < 0.01 ? "Vorona#4626 can't spell" : "misspelled" + (Math.random() < 0.5 ? " the words" : "")) + " 'corona virus'", true],
    // 1% if generate Vorona#4626
    // Ref: #vorona in The Modding Tree discord server on July and August 2021, message by Rhebucks Z
    [() => (Math.random() < 0.01 ? "Laporte 124#6836" : "Laporte124#" + laporteList[Math.floor(Math.random()*laporteList.length)]) + " left", true],
    // 1% if text between Laporte and 124 have a space
    // Ref: On March 2021, a lot of Laporte joins Ordinal Markup discord server, then all but one of them left
    [() => (Math.random() < 0.01 ? "Increm" + ("e").repeat(Math.floor(Math.random()*21)+2) + "ntal#" : "Incremental#") + incrementalList[Math.floor(Math.random()*incrementalList.length)] + " left", true],
    // 1% if Incremental contain more than 1 e's between m and n
    // Ref: On April 2021, a lot of Incremental joins Ordinal Markup discord server, then all but one of them left
    [() => "Where do you know if they were underage - " + (Math.random() < 0.01 ? "Kris" : "Lexi"), true],
    // 1% if generate Kris
    // Ref: The message was typed after XnoobSpeakable was banned due to underage
    [() => "How do you even know if someone is underage??????? - Bullz " + number2digits(Math.floor(Math.random()*100)), true],
    // 1% if generate 04
    // Ref: The message was typed after I request Vepro ban Duuh and Duuh2.0 due to underage
    [() => "Hi my name is jake im 10 years old and im new here - Ja" + ("ke").repeat(Math.floor(Math.random()*100)+1) + "jej", true],
    // 1% if generate Jakekekekejej (4 ke's)
    // Ref: One of the message in Jelle's Marble Run wiki on Early November 2021, this is a message that reveal Jakekekekejej being underaged
    [() => "Smacg13 blocked Jakekekekejej with an expiration time of " + (Math.random() < 0.01 ? "indefinite (Violating Terms of Use: Being underage)" : "1 week (Insecting nonsense/gibberish into pages)"), true],
    // 1% if generate infinite block
    // Ref: On Late October 2021, Jakekekekejej joined Jelle's Marble Run wiki, vandalism 2 pages and harassing 2 users (include me), then 11 days he says yourself 10 which is underage
    [() => "For Jakekekekejej: " + (Math.random() < 0.01 ? "This user is currently blocked across the Fandom network." : "This account has been disabled globally by user choice, or by Fandom."), true],
    // 1% if generate "This user is currently blocked across the Fandom network" with Jakekekekejej
    // Ref: banner that accounts getting disabled
    [() => "For Ggghhhhggt: " + (Math.random() < 0.01 ? "This account has been disabled globally by user choice, or by Fandom." : "This user is currently blocked across the Fandom network."), true],
    // 1% if generate "This account has been disabled globally by user choice, or by Fandom" with Ggghhhhggt
    // Ref: banner that accounts getting blocked globally
    [() => "Pax de 2e blocked EMR Committee with an expiration time of indefinite " + (Math.random() < 0.01 ? "(ban evade)" : "(ban evasion)"), true],
    // 1% if generate evasion
    // Ref: On Early December 2021, EMR Committee joined Jelle's Marble Run wiki, and the first edit was copying User:Eliezer's marble race, it was proven EMR Committee is the same person as Eliezer's marble race
    [() => Math.random() < 0.01 ? "TikTok" : "Gray (Algicosathlon)", true],
    // 1% if generate TikTok
    // Ref: 2 spam pages where Orange boss created on Late December 2021 in Jelle's Marble Run wiki
    [() => "!ban @Maxim Ivushkin underage" + (Math.random() < 0.01 ? "; then I reacted +1" : ""), true],
    // 1% if generate longer text
    // Ref: On Late October 2021, Maxim Ivushkin entered "2009 gang", it was confirmed the age was 12 or 11, which is underage
    [() => "delete that message quick, otherwise you're dead - " + random12abba() + "; Why? Don't you like the number " + (Math.random() < 0.01 ? "2009" : new Date().getFullYear()-12) + "? - Underaged User ", true],
    // 1% if generate static 2009
    // Also having 1/46656 chance to generate 12AbBa on username
    // Ref: Message shortly underaged user type "2009 gang"
    [() => "No, it was a bugfix of achievement 270; If you have less than " + (Math.random() < 0.01 ? format("ee6") : "e1m") + " constant and wonder why your hepteract/s are lower: There was a bug with achievement 270 that has been fixed now. Your hepteract/s just have been higher than they should have been until now. - Gringomaniac", true],
    // 1% if generate formatted ee6
    // Ref: It was the message after Achievement 270 on Synergism was fixed
    [() => ggghhhhggtList[Math.floor(Math.random()*ggghhhhggtList.length)] + " left the message f**k on " + (Math.random() < 0.01 ? "Pax de 2e's wall: You pax dumbass you banned smacg the best" : "FlameMr317's wall: You"), true],
    // 1% if generate message to Pax de 2e
    // Ref: The message that cause Davidsew was blocked on Jelle's Marble Run wiki, with some modification
    [() => "WongTingHo05 replied to the message " + (Math.random() < 0.01 ? "Can you stop vandalism pages?" : smacg13toGhgtMSG[Math.floor(Math.random()*smacg13toGhgtMSG.length)]) + " on Ggghhhhggt's wall: " + wth05toGhgtMSG[Math.floor(Math.random()*wth05toGhgtMSG.length)], true],
    // 1% if generate "Can you stop vandalism pages?"
    // Ref: 3 joke messages to Ggghhhhggt that sent on 2021/12/21 on 3+1 different message in Jelle's Marble Run wiki
    [() => "WongTingHo05 replied to the message im sorry on WongTingHo05's wall: sorry, you must " + (Math.random() < 0.01 ? "die" : "ruining your life"), true],
    // 1% if generate die
    // Ref: a joke messages to Ggghhhhggt that sent on 2021/11/07 in Jelle's Marble Run wiki
    [() => "WongTingHo05 replied to the message sorry for being mean on WongTingHo05's wall: sorry you runied your life because you reported yourself " + (Math.random() < 0.01 ? Math.floor(Math.random()*13) : "underage"), true],
    // 1% if generate number (from 0 to 12)
    // Ref: a joke message to Jakekekekejej that sent on 2021/11/27 in Jelle's Marble Run wiki
    [() => "you should also look message Wall, he sent " + (Math.random() < 0.01 ? "rude" : "nonsense") + " message into your Message Wall - me; me 9 minutes later: also found in my Wall", true],
    // 1% if generate rude
    // Ref: message that Jakekekejej coming into wiki and going to report due to vandalism and harassment
    [() => "Also, you should check message Wall, " + (Math.random() < 0.01 ? "Jakekekekejej did the same thing as Ggghhhhggt" : randomGgghhhhggt() + " did the same thing as Jakekekekejej"), true],
    // 1% if Jakekekekejej show first
    // Also having 1/65536 chance to generate Ggghhhhggt on username
    // Ref: Message sent along with Eliezer's marble race coming into Jelle's Marble Run wiki
    [() => (Math.random() < 0.01 ? "ggghhhhggtggghhhhggtt" : "ggggggggggggggggggggg") + "; [[Gossipy Girlhhhhhhhhhhhhhhhhh|Gossipy Girl]]<ref>babrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</ref>{{BG/Rita}}", true],
    // 1% if generate ggghhhhggtggghhhhggtt
    // Ref: Unnecessary text that Ggghhhhggt added on The Loud House Encyclopedia wiki
    [() => (Math.random() < 0.01 ? "[[Category:Lllllllll]] [[Category:Joy]] [[Category:Joys]]" : "[[Category:Humans]] [[Category:Houses]]"), true],
    // 1% if generate "Category:" thrice
    // Ref: Unnecessary category that Ggghhhhggt added on The Loud House Encyclopedia wiki
    [() => "abilities = " + (Math.random() < 0.01 ? "hes" : "shes") + " a bat; affiliations = loooooooooooooool", true],
    // 1% if generate hes
    // Ref: Unnecessary text that Ggghhhhggt added on Whell of Time wiki
    [() => (Math.random() < 0.01 ? "05:23, 29 October 2021" : "19:49, 17 September 2021 ") + "Ggghhhhggt created page Category:Marbula One Season 2 (look) (Tag: Visual edit)", true],
    // 1% if generate 05:23, 29 October 2021
    // Ref: Time when Ggghhhhggt create the above page
    [() => "08:58, 26 December 2021 TokihikoH11 deleted page Category:Marbula One Season 2 (" + (Math.random() < 0.01 ? "Spam: content before blanking was: 'orangers'" : "vandalism") + ")", true],
    // 1% if generate Spam
    // Ref: Time when TokihikoH11 delete the above page
    [() => "Fix Challenge multiplier row always being " + (Math.random() < 0.01 ? "1.25" : "1.250") + "x", true],
    // 1% if generate number without 0
    // Ref: One of the Pull Request on February 2021 that fix a display bug
    [() => (Math.random() < 0.01 ? "Readd" : "Remove") + " 'Most Hated Feature'", true],
    // 1% if generate Readd
    // Ref: One of the Pull Request on 2021 that remove most hated feature
    [() => "Fix Achievement " + (Math.random() < 0.01 ? "2^2^3" : "256") + " always getting applied", true],
    // 1% if generate 2^2^3
    // Ref: One of the Pull Request on 2021 that fix effect always getting applied
    [() => "The description says -" + format(99) + "%, but actually is -" + format(99.5) + "% (x" + (Math.random() < 0.01 ? "5e-3" : "0.005") + ")", true],
    // 1% if generate 5e-3
    // Ref: One of the Description in Pull Request on 2021 that fix a display bug
    [() => "It include: Achievement 270 reward " + (Math.random() < 0.01 ? "never" : "always") + " getting applied; Achievement " + formatWhole(270) + " reward scaling is " + format(10) + "x faster than intended", true],
    // 1% if generate never
    // Ref: One of the Description in Pull Request on 2021 that list old Achievement 270 bugs
    [() => "Generating " + format(slogadd(91251**2*16384, Math.random() < 0.01 ? Math.random()+0.01 : 0)) + " h0nde accounts...", true],
    // 1% if generate number greater than 1e15 (Range: 1e15 - e1e15)
    // Ref: On June 2021, a bunch of h0nde discord account join discord servers, I later calculated it was around 136 trillion possible combinations
    [() => "@rymino bto wtf stop trying to scam people - pg" + (Math.random() < 0.01 ? "11*12" : "132"), true],
    // 1% if generate 11*12
    // Ref: Message sent after rymino post scam link in #general on The Modding Tree discord server
    [() => "he also posted the scam in every channel on my server and CG's server - the" + (Math.random() < 0.01 ? "slow" : "paper") + "pilot", true],
    // 1% if generate theslowpilot
    // Ref: 69 (nice) minutes after the above message was sent
    [() => "and he just did it in " + (Math.random() < 0.01 ? "Spotky1004's" : "spotky's") + " server, and now he's done it in the IGJ server - thepaperpilot", true],
    // 1% if generate Spotky1004
    // Ref: shortly after the above message was sent
    [() => (Math.random() < 0.01 ? "dancingblob" : "crackedblob"), true],
    // 1% if generate dancingblob
    // Ref: on Mid-2021 water#4237 react :crackedblob: on most of the messages on #mod-log in Synergism server    
    [() => (Math.random() < 0.01 ? "Rickrolled" : "WongTingHo05") + ": no offline progress at all, then the chain starts: Is that a suggestion - Acamaeda; no it's a bug - upvoid; its a feature - Latorin; It's history - Acamaeda; It's chain - jakub; me 40 hours later: still no offline progress at all", true],
    // 1% if generate Rickrolled
    // Ref: Message sent after I report they were no offline progression when the mod was created on TMT version v2.6 onward
    [() => "let primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53," + (Math.random() < 0.01 ? "59" : "57") + ",61] pg subscribes to Grothendieck's theory of primes I see - ab", true],
    // 1% if generate 59 (correct) instead of 57 (incorrect)
    // Ref: A part of code by Tree of Life by pg132 with extras that post by ab
    [() => "heyy su" + (Math.random() < 0.01 ? "n" : "s") + "dex - Flame", true],
    // 1% if generate sundex
    // Ref: a message on The Modding Tree discord server
    [() => "Crimson406 replied to TheMKeyHolder: stop " + (Math.random() < 0.01 ? "multiplying " : "dividing ") + format(0), true],
    // 1% if generate multiplying
    // Ref: notification is same as what you get in mobile, divide by 0 meme
    [() => "Jelle's Marble Run Wiki was killed by " + (Math.random() < 0.01 ? "Davavvavavavavavavvevaaadivid" : "Kira Yoshikage's burner"), true],
    // 1% if generate longer name
    // Ref: One of the Minecraft death message
    [() => (Math.random() < 0.01 ? "Smacg13" : "") + " → Jakekekekejej", true],
    // 1% if Smacg13 is generated
    // Ref: Tetr.io KO message, → leftside with nothing means the player is KO'd by yourself
    // Ref (Cont): Jakekekekejej were KO'd by yourself as he revealed yourself underage, and Smacg13 blocked him due to vandalism
    [() => "how dare you who tf add wong a f**king coward and even " + (Math.random() < 0.01 ? "f-word" : "f**k") + " you into pages?", true],
    // 1% if generate f-word
    // Ref: in Early December, Davavvavavavavavavvevaaadivid harassing on pages
    [() => "How many accounts did Ggghhhhggt created on fandom? It is 7, they were Ggghhhhggt, " + (Math.random() < 0.01 ? "Ggghhhhggt, Ggghhhhggt, Ggghhhhggt, Ggghhhhggt, Ggghhhhggt and Ggghhhhggt" : "Jakekekekejej, Davidsew, Davavvavavavavavavvevaaadivid, Smacg the best, Wong stop banning me and Orange boss"), true],
    // 1% if generate four Ggghhhhggt
    // Ref: in November, Ggghhhhggt start to create alts
    [() => "How many edits did Ggghhhhggt and socks ever did on all wikis? It is " + Math.floor(Math.random()*100) + ".", true],
    // 1% if generate 22
    // 12 from Ggghhhhggt, 2 from Jakekekekejej, 1 from Davidsew, 3 from Davavvavavavavavavvevaaadivid and 4 from Orange boss
    // Ggghhhhggt: 7 in JMR wiki, 2 TLH, 2 in WoT, 1 in Community Cental
    // Ref: similar as above
    [() => "(Removed protection from Marble League " + (Math.random() < 0.01 ? "2021)" : "2020)"), true],
    // 1% if generate 2021
    // Ref: in Late December, Smacg13 remove protection from Marble League 2020 page because it is unnecessary
    [() => "No, pretend of getting banned forever for " + (Math.random() < 0.01 ? "abusing multiple accounts; *evade the ban" : "evading the ban") + " - WongTingHo05", true],
    // 1% if generate "abusing multiple accounts; *evade the ban"
    // Ref: in Early December, EMR Committee come into JMR wiki, and shortly blocked later due to evade the ban
    [() => "Unban me please im bored - Davidsew; I WILL NOT GONNA UNBAN YOU, INSTEAD, EXTEND BAN DURATION TO INFINITE - " + (Math.random() < 0.01 ? "Pax de 2e" : "Pax") + "; I WILL NOT UNBAN YOU TOO, I WILL BLOCK YOU GLOBALLY - a soap member", true],
    // 1% if generate Pax de 2e
    // Ref: in Early December, Davidsew enter this message that want to unban him, but later user is local blocked forever due to he is same user as Davavvavavavavavavvevaaadivid, then a soap member block him globally
    [() => "Anyway, he vandalised multiple wikis, I don't care about result - me at " + (Math.random() < 0.01 ? "2021/12/04" : "4 December 2021"), true],
    // 1% if generate 2021/12/04
    // Ref: Message I leave about I want to block Ggghhhhggt globally
    [() => "!soap Sockpuppet of Ggghhhhggt [Link to Orange boss user pages on Jelle's Marble Run wiki] - WongTingHo05; Can I ask what it is you're reporting? It appears you're already blocked the user and reverted their contributions, what would we do about it? - Zacatero; It appears they were reporting a sockpuppet of a " + (Math.random() < 0.01 ? "global blocked" : "g-blocked") + " user after having already reverted and locally blocked the sock. Then when no one reposnded to the report they pinged despite no further activity from the sock. - CwM; If you report something, you have to tell us what it is you're reporting. By default, we assume you're just reporting vandalism.. but if they are already locally blocked and the edits have been undone already.. there's nothing for us to do - Zacatero; Sock of Ggghhhhggt - WongTingHo05 replying to the message Can I ask what it is you're reporting? by Zacatero; Ggghhhhggt is now posion banned (IP block, all socks banned, account creation suspended from an IP), I confirm that Orange Boss is the same person - Miss Toki; Anyway, why you not global block? - WongTingHo05; Miss Toki: Already done", true],
    // 1% if generate global blocked
    // Ref: Messages about I want to block Orange boss globally, this is current longest ticker without using .repeat parameter (1084+ byte, more than 1 kB)






    
    // 2022
    [() => "Hi @DEMEMZEA, can you ban @Join Discord at Under 13? - WongTingHo05; Can i? Yes, Should i? No. people can lie in the internet, and what if @Join Discord at Under 13 is just lying? if i put my nickname as 'i am 12' doesn't mean i am 12. - DEMEMZEA; I think you need to do because username is underage, you should know on Ordinal Markup server - WongTingHo05; their username doesn't even imply they're underage, it says 'commit a TOS violation' - DEMEMZEA; I can see he was set the nickname to 'a 12 years old girl use discord' on OM server - WongTingHo05 then following an image; yeah - DEMEMZEA; ban " + (Math.random() < 0.01 ? "right now" : "rn") + "? - WongTingHo05; idk how to proceed, so i'll just mute them for 1 day and when the mods wake up they'll probably take care of it - DEMEMZEA; Reda: banned", true],
    // 1% if generate right now
    // Ref: Messages about I want to ban Join Discord at under 13 on MrRedShark77's server, this is current second longest ticker without using .repeat parameter (756+ byte)
    [() => "pg" + (Math.random() < 0.01 ? 132 : "") + ", is this missing " + ("!").repeat(Math.floor(Math.random()*50)*2+1) + " fixed in a later version? - Lordshinjo", true],
    // 1% if generate 132
    // Ref: Another message on Early January 2022, 
    [() => (Math.random() < 0.01 ? "KICK, NOT BAN" : "BAN, NOT KICK"), true],
    // 1% if generate KICK, NOT BAN
    // Ref: On Mid January 2022, I sent this message after scammer post scam link and later deleted
    [() => "WongTingHo05 " + (Math.random() < 0.01 ? "left the message Group B isn't Group of Death on Eliezer's marble race's wall: Group A is" : "replied to the message " + usertoEMRMSG[Math.floor(Math.random()*usertoEMRMSG.length)] + "'s wall: " + wth05toEMRMSG[Math.floor(Math.random()*wth05toEMRMSG.length)]), true],
    // 1% if generate "Group A is"
    // Ref: 2+3 joke message to EMR that sent on 2022/1/3 on 2 different message in Jelle's Marble Run wiki, plus an extra one
    [() => "WongTingHo05 Message on " + (Math.random() < 0.01 ? "Videodude13's " : "Smacg13's ") + "wall: " + wth05toSmacg13MSG[Math.floor(Math.random()*wth05toSmacg13MSG.length)], true],
    // 1% if generate Videodude13
    // Ref: So many messages
    [() => (Math.random() < 0.01 ? "*knock knock knock FBI OPEN UP!* " : "") + "SCAMMER ON TMT SERVER, BAN THE SCAMMER IMMEDIATELY, You also need to delete scam link on every channel - someone on thepaperpilot's DM", true],
    // 1% if *knock knock knock FBI OPEN UP!* show
    // Ref: DM message after scammer appear on TMT server
    [() => "!soap Remove content nearly completely, and harass " + (Math.random() < 0.01 ? "Smacg13" : "MaxTheBlob0112") + " [link to Kira Yoshikage's burner edits on Jelle's Marble Run wiki]", true],
    // 1% if generate Smacg13
    // Ref: Message that I want soap block above user globally







    
    // Exe k LG fan joke, each subsequent tickers are 1.778x rarer, no 1% ticker except first one
    // Total: 17
    [() => "!ban @" + numToOrd(Math.floor(Math.random()*100)) + " Exe k LG Fan ban evade", Math.random() <= 1/1.778**0],
    // 1% if generate 2
    // Range: 0 - 99
    // Ref: On January 2022, the user was banned due to evade the ban on LNGI Game discord server
    [() => "!ban @" + numToOrd(Math.floor(10**(Math.random()*8+2))) + " Exe k LG Fan ban evade", Math.random() <= 1/1.778**1],
    // Range: 100 - 1e10
    [() => "!ban @" + formatWhole(slogadd(Math.random()*9+1,2)) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**2],
    // Range: 1e10 - e1e10
    [() => "!ban @" + formatWhole(tet10(Math.random()*7+3)) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**3],
    // Range: e1e10 - 1F10
    [() => "!ban @" + formatWhole(tet10(slogadd(Math.random()*9+1,1))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**4],
    // Range: 1F10 - F1e10
    [() => "!ban @" + formatWhole(tet10(slogadd(Math.random()*9+1,2))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**5],
    // Range: F1e10 - Fe1e10
    [() => "!ban @" + formatWhole(tet10(tet10(Math.random()*7+3))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**6],
    // Range: Fe1e10 - F1F10
    [() => "!ban @" + formatWhole(pent10(Math.random()*7+3)) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**7],
    // Range: F1F10 - 1G10
    [() => "!ban @" + formatWhole(pent10(slogadd(Math.random()*9+1,1))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**8],
    // Range: 1G10 - G1e10
    [() => "!ban @" + formatWhole(pent10(slogadd(Math.random()*9+1,2))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**9],
    // Range: G1e10 - Ge1e10
    [() => "!ban @" + formatWhole(pent10(tet10(Math.random()*7+3))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**10],
    // Range: Ge1e10 - G1F10
    [() => "!ban @" + formatWhole(pent10(tet10(slogadd(Math.random()*9+1,1)))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**11],
    // Range: G1F10 - GF1e10
    [() => "!ban @" + formatWhole(pent10(tet10(slogadd(Math.random()*9+1,2)))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**12],
    // Range: GF1e10 - GFe1e10
    [() => "!ban @" + formatWhole(pent10(tet10(tet10(Math.random()*7+3)))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**13],
    // Range: GFe1e10 - GF1F10
    [() => "!ban @" + formatWhole(pent10(pent10(Math.random()*7+3))) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**14],
    // Range: GF1F10 - G1G10
    [() => "!ban @" + formatWhole(new ExpantaNum.hyper(6)(10,Math.random()*7+3)) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**15],
    // Range: G1G10 - 1H10
    [() => "!ban @" + formatWhole(hyper(Math.random()*6+7)) + "th Exe k LG Fan ban evade", Math.random() <= 1/1.778**16],
    // Range: 1H10 - 2J10








    // Other
    [() => (Math.random() < 0.01 ? "player fell out of the water" : "death.fell.accident.water"), true],
    // 1% if generate player fell out of the water
    [() => (Math.random() < 0.01 ? "sus" : "amogus"), true],
    // 1% if generate sus
    [() => "Current Newstickers array length: " + formatWhole(getNumberBasedOnArrayLength()), true],
    // 1% if generate 10^^x or above
    [() => "Smacg13 left the message PermaBan on Ggghhhhggt's wall: Hi Despite you not making edit you have been permanently banned for sending rude messages to myself.", true],
    // No 1% news for now
    [() => "Newsticker rarity: " + format(1/Math.random()), true],
    // 1% if generate number >=100
    [() => (Math.random() < 0.01 ? ":rofl:" : ":joy:"), true],
    // 1% if generate rofl
    [() => (Math.random() < 0.01 ? "Uno Reverse Card" : "No U Card"), true],
    // 1% if generate Uno Reverse Card
    [() => "Pneumonoultramicroscopicsilicovolcanoconiosis", true],
    // No 1% news for now
    [() => (Math.random() < 0.01 ? "BRAVO" : (Math.random() < 0.5 ? "PERFECT" : "ALL") + " CLEAR"), true],
    // 1% if generate BRAVO
    [() => (Math.random() < 0.01 ? "Time till Maximum Time on JS: " + formatTime((8.64e15-Date.now())/1000,3) : "Time till Y2038 bug: " + formatTime((2147483648000-Date.now())/1000,3)), true],
    // 1% if generate Time till Maximum Time






    
    // Discord
    [() => "I like fish, I also film marbles racing and watch it too, Please " + (Math.random() < 0.01 ? "" : "don't") + " question it - Dolphin0", true],
    // 1% if don't didn't generate
    [() => "Sorry, What, Wheeee, Meh; DONT PING ME!! - Windows" + (Math.random() < 0.01 ? 3.1 : "3Point1"), true],
    // 1% if generate 3.1
    [() => "S(ystem Shark)O(pharg)F(ence)T(heMKeyHolder)C(" + (Math.random() < 0.01 ? "oolDoge" : "rimson406") + ")A(camaeda)P(acbrad)P(artialbog)E(pyon)D(erpy the Savior)", true],
    // 1% if generate C(oolDoge)




    



    // Game based, no 1%
    [() => layerNameGenerate(), player.points.gte(ExpantaNum.pow(2,1024))],
    [() => "Number Generated: " + format(player.points.add(1).pow(player.prestige[1].max(1).log10())) + " (based on points and dots)", true],
    // Points, Dots
    [() => "Number Generated: " + format(powExp(player.points.add(1),0.5).pow(player.prestige[2].max(1).tetrate(2))) + " (based on points and lines)", player.dimShift >= 1],
    // Points, Lines
    [() => "Number Generated: " + format(powExp(ExpantaNum.pow(10,player.prestige[1]), player.prestige[2].add(1).sqrt())) + " (based on dots and lines)", player.dimShift >= 1],
    // Dots, Lines
    [() => "Number Generated: " + format(ExpantaNum.pow(10,powExp(player.lineSegments,0.5).pow(player.points.max(10).slog(10)))) + " (based on points and line segments)", player.milestone[2].includes(2)],
    // Points, L. Segments
    [() => "Number Generated: " + format(player.lineSegments.add(1).pow(player.prestige[1])) + " (based on dots and line segments)", player.milestone[2].includes(2)],
    // Dots, L.Segments
    [() => "Number Generated: " + format(powExp(player.lineSegments.add(1),player.prestige[2].pow(2))) + " (based on lines and line segments)", player.milestone[2].includes(2)],
    // Lines, L.Segments

    [() => "Number Generated: " + format(powExp(player.points, Math.random()+0.5)) + " (based on points)", true],
    // Points, RNG
    [() => "Number Generated: " + format(player.prestige[1].max(1).tetrate(Math.random()+1.01)) + " (based on dots)", true],
    // Dots, RNG
    [() => "Number Generated: " + format(slogadd(Math.random(),3).pow(player.prestige[2])) + " (based on lines)", player.dimShift >= 1],
    // Lines, RNG
    [() => "Number Generated: " + format(powExp(player.lineSegments,Math.random()*10)) + " (based on line segments)", player.milestone[2].includes(2)],
    // L.Segments, RNG

    [() => "You are currently in " + formatWhole(player.dimShift) + " dimensional space", true],
    [() => "You are having " + format(player.prestige[1].div(LAYERS.gainSoftcap(1)),4) + "x more dots than softcap, dots require now goes " + format(player.prestige[1].div(LAYERS.gainSoftcap(1)).pow(LAYERS.softcapExp(1).sub(1)),4) + "x faster", player.prestige[1].gte(LAYERS.gainSoftcap(1))],
    [() => "You are having " + format(player.prestige[1].div(LAYERS.req(2)).mul(100),4) + "% of dots than lines require", player.dimShift >= 1],
    [() => "Current tab: " + player.tab + ", Current subtab (Tab 1): " + player.subtab[1] + ", Current subsubtab (Tab 1): " + player.subsubtab[1], true],
    [() => "NaN(illion) Detected", player.points.gte("1e3000000003")],
    [() => "Your points is equal to 2^^" + format(player.points.slog(2), 4) + " or 3^^" + format(player.points.slog(3), 4), true],







    // Total Tickers, all are 1%, but rarer with more tickers
    [() => "100 tickers!", true],
  ]
}

// 7 tickers are related to underages

function getAllTickersLength(type = "array", row = 10){
  let output = []
  for (let i=0;i<=newsArray.length-1;i++){
    if (type == "array"){
      output.push(newsArray[i][0]().length)
    } else {
      output = output + (newsArray[i][0]().length).toString() + ", "
      if ((i+1)%row==0) output = output + `<br>`
    }
  }
  return output
}










// newsticker function starts

document.addEventListener("visibilitychange", function() {if (!document.hidden) {scrollNextMessage();}}, false);
var scrollTimeouts = [];
function scrollNextMessage() {
  updateNewsArray();
  var s = document.getElementById('news');
  
  var nextMsgIndex
  var nextMsgCond

  //select a message at random

  try {
    nextMsgCond = false
    while (!nextMsgCond) {
      // randomly choose from either normal news or aarex news
      var array = newsArray
      nextMsgIndex = Math.min(Math.floor(Math.random() * array.length), array.length);
      var func = array[nextMsgIndex][1]
      nextMsgCond = typeof(func) == "function" ? func() : eval(func);
    }
  } catch(e) {
    console.log("Newsarray doesn't work at idx " + nextMsgIndex)
  }

  scrollTimeouts.forEach(function(v) {clearTimeout(v);});
  scrollTimeouts = [];

  //set the text
	var m = array[nextMsgIndex][0];
	if (typeof(m) == "function") m = m()
	s.textContent = m

  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;

  //set the transition to blank so the move happens immediately
  s.style.transition = '';
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = 'translateX('+parentWidth+'px)';

  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(setTimeout( function() {
    //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
    //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
    let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
    let rate = 100; //change this value to change the scroll speed
    let transformDuration = dist / rate;

    //set the transition duration
    s.style.transition = 'transform '+transformDuration+'s linear';
    let textWidth = s.clientWidth;
    //we need to move it to -(width+parent padding) before it won't be visible
    s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
    //automatically start the next message scrolling after this one finishes
    //you could add more time to this timeout if you wanted to have some time between messages
    scrollTimeouts.push(setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000)));
  }, 100));
}