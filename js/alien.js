'use strict'

const ALIENS = {
    aliens: null,
    id: null,
    speed: null, // 500
    topRowIdx: null, // 1
    bottomRowIdx: null, // 3 
    isFreeze: null, // 
    aliens: null, // []
}
///////////////////////////////////////////////////////////////////////////////////////////////
function initAliens() {
    console.log('initAliens():↓');
    
    ALIENS.id = 1
    ALIENS.aliens ={}
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
                id: ALIENS.id++,
                isHit: false,
                currPos:{i,j}
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
    setTimeout(updateCell,800,pos)
    var whatAppendToU = {
        i:pos.i + 1,
        j:pos.j 
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