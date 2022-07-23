'use strict'

const ALIENS = {
    movementInterval: null,
    currDirPos: null, //{1,0}left.. {0,1}right..{1 ,1}downRight..
    aliens: null,//[{}{pos,isHit}]
    nextId: null,
    movementSpeed: null, // 500
    topRowIdx: null, // 1
    bottomRowIdx: null, // 3 
    isFreeze: null, // 
}
function initAliens() {
    console.log('initAliens():↓')
    ALIENS.aliens = [] // [{}{..]
    ALIENS.nextId = 1
    ALIENS.topRowIdx = 1
    ALIENS.bottomRowIdx = 3
    ALIENS.movementSpeed = 1000
    ALIENS.currDirPos = { i: 0, j: 1 }
    ALIENS.isFreeze = false
}
function placeAliens(rowIdxStart = ALIENS.topRowIdx, rowIdxEnd = ALIENS.bottomRowIdx, colIdxStart = 3, colIdxEnd = 10) {
    // console.log(`placeAliensOnBoard(${rowIdxStart}, ${rowIdxEnd}, ${colIdxStart}, ${colIdxEnd})`);

    GAME.aliensCount = GAME.board.aliensRowLength * GAME.board.aliensRowCount
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            ALIENS.aliens.push({
                currMovDir: ALIENS.dirPos,
                id: ALIENS.nextId++,
                isHit: false,
                currPos: { i, j },
                nextPos: { i: i + ALIENS.currDirPos.i, j: j + ALIENS.currDirPos.j },
            })
            updateCell({ i, j }, OBJECTS.alien)
        }
    }
    return
}
///////////////////////////////////////////////////////////////////////////////////////////////
function handleAlienHit(pos) {
    console.log(`handleAlienHit(${pos.i},${pos.j})`)
    //Alien
    gBoard[HERO.laser.pos.i][HERO.laser.pos.j].isHit = true
    // Model & Board 
    updateCell(pos, OBJECTS.explode)
    setTimeout(updateCell, 800, pos)
    // GAME
    GAME.aliensCount--
    if (GAME.aliensCount === 0) {
        GAME.isOn = false
        document.querySelector('.modal').classList.remove('display-none')
    }
    renderScore(10)
    // HERO
    endShoot()
    return
}
///////////////////////////////////////////////////////////////////////////////////////////////
// last 
function moveAliens(currDirPos) { // *interval
    //! moveAliens → change currDirPos
    var liveAliensPoss = getLiveAliensPoss()
    var relevantAliens = getRelevantAliensPoss(liveAliensPoss, currDirPos)



    return
}

function getRelevantAliensPoss(aliens, currDirPos) {
    // return [{}{}{}.. ]
    switch (currDirPos) {

        case currDirPos.i === 0 < currDirPos.i === 1://* Curr Dir → Right
            for (let i = 0; i < aliens.length; i++) {

            }
            break

        case currDirPos.i === 0 > currDirPos.j === -1: //* Curr Dir ← Left 

            break

        case currDirPos.i === 1 === currDirPos.j: // *Curr Dir ↓ Down 

            break

        case currDirPos.i === -1 === currDirPos.j: // *Curr Dir ↑ Up  

            break
        default: //* No Valid move 
            return null
    }

}

if (!isValidMove()) return


function getLiveAliensPoss() {
    var aliensPoss = []
    for (let i = 0; i < ALIENS.aliens.length; i++) {
        var currAlien = ALIENS.aliens[i]
        if (!currAlien.isHit) aliensPoss.push(currAlien.currPos)
    }
    return aliensPoss
}
function moveAlien(fromPosA, toPosB) {
    if (!GAME.isOn) return
    // PrevCell
    updateCell(HERO.pos)
    // NextCell
    HERO.pos.i = dir.i
    HERO.pos.j = dir.j
    updateCell(HERO.pos, OBJECTS.hero)
}
function moveAlien(fromPosA, toPosB) {
    // console.log('fromPosA:', fromPosA)
    // console.log('toPosB:', toPosB)
    console.log('like move hero || change move hero name') // TODO:
}