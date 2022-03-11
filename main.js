//import Decimal from './decimal'; I am dumb and cannot get modules to work for the life of me

var stats = {
    wallsCleared: 0,
    timeSinceLastWallCleared: 10000000,
    wallTime: /**new Decimal(10000)**/ 10000,
    timeToolLevel: 0,
    lastTick: Date.now()
}

var toolNames = ["None", "Trowel(not to be confused with Time Travel)", "Hammer", "Pickaxe"]
var timeToolRequirements = [2, 3, 4]
var hasToolClicked = false

function buyTimeTool() {
    if (stats.wallsCleared >= timeToolRequirements[stats.timeToolLevel]) {
        stats.timeToolLevel++
        var timeGain = 4 ** stats.timeToolLevel
        document.getElementById("gainTimeButton").innerHTML = "Click to instantly pass " + timeGain + " seconds"
        document.getElementById("gainTimeUpgrade").innerHTML = "Find an tool[Requires " + timeToolRequirements[stats.timeToolLevel] + " Time Wall Clears]"
        document.getElementById("timeToolText").innerHTML = "Current tool: Time " + toolNames[stats.timeToolLevel]
    }
}

function manualTimeGain() {
    //get rekted auto clickers
    if (!hasToolClicked) {
        hasToolClicked = true
    }
}

const baseWallTime = 10

function getTimeForWall(wall = 1) {
    /**var x = new Decimal(baseWallTime)
    return x.pow(wall).times(1000)**/
    return (10 ** wall) * 1000
}

function clearMaxWalls() {
    while (stats.timeSinceLastWallCleared >= stats.wallTime) {
        stats.timeSinceLastWallCleared -= stats.wallTime
        stats.wallsCleared += 1
        stats.wallTime = getTimeForWall(stats.wallsCleared+1)
    }
    document.getElementById("timeWallCounter").innerHTML = stats.wallsCleared + " Walls Cleared"
}

var deltaTime = 0
var mainGameLoop = window.setInterval(function() {
    deltaTime = Date.now() - stats.lastTick
    stats.lastTick = Date.now()
    stats.timeSinceLastWallCleared += deltaTime
    if (hasToolClicked) {
        stats.timeSinceLastWallCleared += (4 ** stats.timeToolLevel) * 1000
        hasToolClicked = false
    }
    clearMaxWalls()
    var t = (stats.wallTime - stats.timeSinceLastWallCleared)/1000
    document.getElementById("wallTimer").innerHTML = t + " Seconds Until Next Wall Clear"
  }, 10)