'use strict'

const ALIENS = { //* Aliens data
    speed: null, // 500
    topRowIdx: null, //
    bottomRowIdx: null,
    isFreeze: null, // Boolean
    aliens: null, // []
    interval: null,
}

///////////////////////////////////////////////////////////////////////////////////////////////

function initAliens() {
    console.log('initAliens():↓');
    ALIENS.speed = 500
    ALIENS.topRowIdx = 1
    ALIENS.bottomRowIdx = 3
    ALIENS.isFreeze = false
    ALIENS.aliens = []
    createAliens(GAME.board.aliensRowLength * GAME.board.aliensRowCount) 
    console.log('ALIENS.aliens:', ALIENS.aliens)

    // ALIENS.interval =
}
function createAliens(num) {
    console.log(`createAliens(${num}):↓`);
    for (let i = 0; i < num; i++) {
        GAME.aliensCount++
        ALIENS.aliens.push({
            className: CLASSES.sky,
            gameObject: OBJECTS.alien
        })
    }
}


function placeAliensOnBoard(rowIdxStart = 1, rowIdxEnd = 3, colIdxStart = 3, colIdxEnd = 10) {
    console.log(`placeAliensOnBoard(${rowIdxStart}, ${rowIdxEnd}, ${colIdxStart}, ${colIdxEnd})`);
    var alienIdx = 0
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            gBoard[i][j] = ALIENS.aliens[alienIdx]
            updateCell({ i, j }, getImgPath(OBJECTS.alien))
            // refreshElCellByPos({ i, j }, getImgPath(OBJECTS.alien))
            alienIdx++
        }
    }
    return
}

///////////////////////////////////////////////////////////////////////////////////////////////


function handleAlienHit(pos) { }
function shiftBoardRight(board, fromI, toI) { }
function shiftBoardLeft(board, fromI, toI) { }
function shiftBoardDown(board, fromI, toI) { }
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() { }
