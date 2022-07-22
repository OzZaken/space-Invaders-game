'use strict'

const ALIENS = {
    speed: null, // 500
    topRowIdx: null, // 1
    bottomRowIdx: null, // 3 
    isFreeze: null, // 
    aliens: null, // []
}
///////////////////////////////////////////////////////////////////////////////////////////////
function initAliens() {
    console.log('initAliens():↓');
    ALIENS.speed = 1000
    ALIENS.topRowIdx = 1
    ALIENS.bottomRowIdx = 3
    ALIENS.isFreeze = false
    ALIENS.aliens = []
}

function placeAliens(rowIdxStart = ALIENS.topRowIdx, rowIdxEnd = ALIENS.bottomRowIdx, colIdxStart = 3, colIdxEnd = 10) {
    console.log(`placeAliensOnBoard(${rowIdxStart}, ${rowIdxEnd}, ${colIdxStart}, ${colIdxEnd})`);

    var aliensCount = GAME.board.aliensRowLength * GAME.board.aliensRowCount
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            gBoard[i][j].gameObject = OBJECTS.alien
            updateCell({ i, j }, OBJECTS.alien)
        }
    }
    return
}
///////////////////////////////////////////////////////////////////////////////////////////////
function handleAlienHit(pos) {
    console.log(`handleAlienHit(pos)`);
    updateCell(pos, OBJECTS.explode)
    updateScore(10)
    setTimeout(() => { updateCell(pos) }, 1000)
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
