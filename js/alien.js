'use strict'

const ALIENS = {
    aliens: null,
    nextId: null,
    speed: null, // 500
    topRowIdx: null, // 1
    bottomRowIdx: null, // 3 
    isFreeze: null, // 
    aliens: null, // []
}
///////////////////////////////////////////////////////////////////////////////////////////////
function initAliens() {
    console.log('initAliens():↓');

    ALIENS.nextId = 1
    ALIENS.aliens = {}
    ALIENS.speed = 1000
    ALIENS.topRowIdx = 1
    ALIENS.bottomRowIdx = 3
    ALIENS.isFreeze = false
    ALIENS.aliens = []
}
function placeAliens(rowIdxStart = ALIENS.topRowIdx, rowIdxEnd = ALIENS.bottomRowIdx, colIdxStart = 3, colIdxEnd = 10) {
    // console.log(`placeAliensOnBoard(${rowIdxStart}, ${rowIdxEnd}, ${colIdxStart}, ${colIdxEnd})`);

    GAME.aliensCount = GAME.board.aliensRowLength * GAME.board.aliensRowCount
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            ALIENS.aliens.push({
                id: ALIENS.nextId++,
                isHit: false,
                currPos: { i, j }
            })
            updateCell({ i, j }, OBJECTS.alien)
        }
    }
    return
}
///////////////////////////////////////////////////////////////////////////////////////////////
function handleAlienHit(pos) {
    console.log(`handleAlienHit(${pos.i},${pos.j})`);

    updateCell(pos, OBJECTS.explode)
    setTimeout(updateCell, 800, pos)
    gBoard[pos.i + 1][pos.j]
    GAME.aliensCount--
    if (GAME.aliensCount === 0) {
        console.log('win')
        document.querySelector('.modal').classList.remove('display-none')
    }
    updateScore(10)
    endShoot()
    return
}
///////////////////////////////////////////////////////////////////////////////////////////////
function shiftBoardRight(board, fromI, toI) {

}
function shiftBoardLeft(board, fromI, toI) {

}
function shiftBoardDown(board, fromI, toI) {

}
///////////////////////////////////////////////////////////////////////////////////////////////
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
    for (let i = 0; i < ALIENS.aliens.length; i++) {
        moveAlien()
    }

}
function moveAlien(pos) {
    updateCell(pos)
}
///////////////////////////////////////////////////////////////////////////////////////////////
// Not Working...yet..
function getAliensPos() {
    var aliensPoss = []
    for (let i = 0; i < ALIENS.aliens.length; i++) {
        var currAlien = ALIENS.aliens[i]
        aliensPoss.push(currAlien.currPos)
    }
    console.log('aliensPoss:', aliensPoss)
    return aliensPoss
}