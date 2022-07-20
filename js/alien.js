'use strict'

///////////////////////////////////////////////////////////////////////////////////////////////
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and
// (2) last alien was cleared from row
// const ALIEN_SPEED = 500;
// var gIntervalAliens;
// var gAliensTopRowIdx;
// var gAliensBottomRowIdx;
// var gIsAlienFreeze = true;
const ALIENS = { //* Aliens data
    aliens: null, // []
    speed: null, // 500
    interval: null,
    topRowIdx: null, //
    bottomRowIdx: null,
    isFreeze: null, // Boolean
}


//      aliensRowLength: 8,
//      aliensRowCount: 3

///////////////////////////////////////////////////////////////////////////////////////////////

function initAliens() {
    
    // ALIENS.aliens = createAliens()
}
function createAliens(board) {

    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            gCountAliens++
            board[i][j] = ALIEN
        }
    }
}



function handleAlienHit(pos) { }
function shiftBoardRight(board, fromI, toI) { }
function shiftBoardLeft(board, fromI, toI) { }
function shiftBoardDown(board, fromI, toI) { }
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() { }
