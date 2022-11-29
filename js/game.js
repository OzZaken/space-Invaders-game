'use strict'

const GAME = {
    board: [],
    domEls: {},
    hero: {},
    boardMap: {},
    gameEls: {
        hero: '<div class="hero"><img src="assets/img/hero.svg" alt="spaceShip"><div/>',
        alien: '<div class="space-invader space-invader-1 animate"><div/>',
        moon: '🌓',
        laser: '|',
        empty: '',
        floor: '🕸',
    },
    alienMap: {},
}

    //*                                                               Initiation
    ; (() => {
        const { domEls } = GAME
        domEls.elBoard = document.querySelector('.board')
        domEls.elHeading = document.querySelector('.heading')
        domEls.elMusic = document.querySelector('.music')
        // gDomEls.elLife = document.querySelector('.life')
        // gDomEls.elScore = document.querySelector('.score')
        // gDomEls.elTime = document.querySelector('.time')
        // gDomEls.elUserMsg = document.querySelector('.user-msg')
        // window.onresize = () => {
        //     location.reload()
        // }
    })()

function initGame() {
    // document.body.style.zoom = "90%";

    // Model
    GAME.isOn = true
    GAME.score = 0
    GAME.aliensCount = 0
    const { boardMap } = GAME
    boardMap.size = 14
    boardMap.aliensRowLength = 8
    boardMap.aliensRowCount = 3
    GAME.board = buildBoard()
    initHero()
    initAlien()
    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = GAME.alienMap
    createAliens(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd)
    renderBoard()
    GAME.domEls.elCells = [...document.querySelectorAll('.cell')]

    // Game
    // elHeading.hidden = true
    // elHeading.style.display = 'none'
}

function onStartPlay() {

}

//*                                                                   Board
function buildBoard() {
    const { size } = GAME.boardMap
    const { gameEls } = GAME
    let board = []
    for (let i = 0; i < size; i++) {
        board.push([])
        for (let j = 0; j < size; j++) {
            board[i][j] = { pos: { i, j } }
            if (j === size - 1) board[i][j].gameEl === gameEls.floor
        }
    }
    board[0][GAME.boardMap.size - 1].gameEl = gameEls.moon
    // board[7][1].gameEl = OBJECTS.satelliteSpace
    return board
}

function renderBoard() {
    const { board, gameEls } = GAME
    const { elBoard } = GAME.domEls
    let strHTML = ''
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (let j = 0; j < board[0].length; j++) {
            const curCell = board[i][j]
            const curCellVal = curCell.isHit ? '' : curCell.gameEl
            strHTML += `\t<td class="cell" data-i="${i}" data-j="${j}">${curCellVal || ''}</td>`
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML
}

//*                                                                   Cell
function createCell(pos, gameEl = '') {
    const { i, j } = pos
    return {
        pos: { i, j },
        gameEl
    }
}

function renderCell(pos) {
    const { i, j } = pos
    const { board } = GAME
    const { elCells } = GAME.domEls
    const curCell = elCells.find(elCell => +elCell.dataset.i === i && +elCell.dataset.j === j)
    if (board[i][j].gameEl) curCell.innerHTML = board[i][j].gameEl
    else curCell.innerText = ''
}

function updateCell(pos, gameEl = '') {
    const { i, j } = pos
    const { board } = GAME
    // Model
    board[i][j].gameEl = gameEl
    //  Dom
    renderCell(pos)
}

//*                                                                 Score
function renderScore(diff) {
    GAME.score += diff
    const { elScore } = GAME.domEls
    elScore.innerText = GAME.score
}

function isOnBoard(pos) {
    const { i, j } = pos
    const { board } = GAME
    if (
        j < 0 || // Left
        j > board[0].length - 1 || // Right
        i < 0 || // Up
        i > board[0].length - 1 // Down
    ) return false
    return true
}

function blowUpNeighbors(cellI, cellJ) {
    for (let i = cellI; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length) continue
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
        }
    }
}

// function createAliens(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
//     let newAliens = []
//     const { gameEls ,alienMap} = GAME
//     const { alien } = gameEls
//     for (let i = rowIdxStart; i <= rowIdxEnd; i++) {
//         for (let j = colIdxStart; j <= colIdxEnd; j++) {
//             newAliens.push({
//                 gameEl: alien,
//                 id: ALIENS.idx++,
//                 isHit: false,
//                 currPos: { i, j },
//             })
//             GAME.aliensCount++
//         }
//     }
//     return newAliens
// }



function getLiveAliensPoss() {
    var liveAliensPoss = []
    for (let i = 0; i < ALIENS.aliens.length; i++) {
        var currAlien = ALIENS.aliens[i]
        if (!currAlien.isHit) liveAliensPoss.push(currAlien.currPos)
    }
    return liveAliensPoss
}

function getAliensEdges(liveAliens) {
    console.log('getRelevantAliensEdges()');
    var relevantAliensPoss = []
    if (ALIENS.dirPos.i === 0 && 1 === ALIENS.dirPos.j) { //* → Right   
        console.log(' Dir → Right');
        var biggestJ = 0
        for (let i = 0; i < liveAliens.length; i++) {
            // console.log(`liveAliens[${i}].j: ${liveAliens[i].j}`);
            if (liveAliens[i].j > biggestJ) {
                biggestJ = liveAliens[i].j
            }
        }
        for (let i = 0; i < liveAliens.length; i++) { //TODO: make in the first loop
            if (liveAliens[i].j === biggestJ) {
                relevantAliensPoss.push(liveAliens[i])
            }
        }
        return relevantAliensPoss
    }
    //TODO:
    // else if (ALIENS.dirPos.i === 1 && ALIENS.dirPos.j === 1) {// * ↓ Down
    //     console.log(' Dir ↑ Up');
    // }
    // else if (ALIENS.dirPos.i === 1 && ALIENS.dirPos.j === 1) {// * //* ← Left 
    //     console.log(' Dir ↑ Up');
    // }
    // else if (ALIENS.dirPos.i === -1 && ALIENS.dirPos.j === -1) {// * ↑ Up
    //     console.log(' Dir ↑ Up');
    // }
    return relevantAliensPoss
}

function moveAliens() {
    if (ALIENS.dirPos.i === 1 && ALIENS.dirPos.j === 1) changeAliensDir()
    console.log(`moveAliensInterval(${ALIENS.dirPos.i},${ALIENS.dirPos.j})`)

    var liveAliensPoss = getLiveAliensPoss()
    var relevantAliensPos = getAliensEdges(liveAliensPoss) // Get only the relevant for the checking
    var currAliensPoss = []
    var nextAliensPoss = []

    console.log('liveAliensPoss:', liveAliensPoss)
    console.log('relevantAliens', relevantAliensPos);

    for (let i = 0; i < relevantAliensPos.length; i++) {
        var currAlienPoss = relevantAliensPos[i]
        var hisNextPos = { i: currAlienPoss.i + ALIENS.dirPos.i, j: currAlienPoss.j + ALIENS.dirPos.j }
        var hisNextCell = gBoard[currAlienPoss.i + ALIENS.dirPos.i][currAlienPoss.j + ALIENS.dirPos.j]

        console.log(`currAlienPoss,${currAlienPoss},hisNextPos${hisNextPos}`)
        // console.log('Valid Move:', hisNextCell.gameEl === OBJECTS.empty);
        //! Saved If All valid Move
        currAliensPoss.push(currAlienPoss)//! posA[i]
        //!                                       ↨
        nextAliensPoss.push(hisNextPos)//!   posB[i]
    }

    for (let i = 0; i < hisNextPos.length; i++) {
        const element = array[i];

    }
    console.log(`\tThey can Move!\nMoving Every life aliens(${liveAliensPoss.length})`)
    cleanBoard(
        ALIENS.topRowIdx,
        ALIENS.bottomRowIdx,
        ALIENS.colIdxStart,
        ALIENS.colIdxEnd
    )
    //! Change model
    for (let i = 0; i < ALIENS.aliens.length; i++) {
        var currAlien = ALIENS.aliens[i]
        ALIENS.aliens[i].currPos.i += ALIENS.dirPos.i
        ALIENS.aliens[i].currPos.j += ALIENS.dirPos.j
    }
    placeAliens(
        ALIENS.topRowIdx + ALIENS.dirPos.i,
        ALIENS.bottomRowIdx + ALIENS.dirPos.i,
        ALIENS.colIdxStart + ALIENS.dirPos.j,
        ALIENS.colIdxEnd + ALIENS.dirPos.j)
    return
}

function changeAliensDir() {
    if (ALIENS.dirPos.i === 0 && 1 === ALIENS.dirPos.j || // → Right
        ALIENS.dirPos.i === -1 && 0 === ALIENS.dirPos.j) { // ← Left
        ALIENS.dirPos = { i: 1, j: 1 } // ↓ Down
    }
    else if (ALIENS.dirPos.i === 1 && 1 === ALIENS.dirPos.j) { // ↓ Down
        var aliensEdges = getAliensEdges(getLiveAliensPoss())[0]
        if (aliensEdges.j === gBoard[0].length - 1) ALIENS.dirPos = { i: 1, j: 1 } // ← Left
        elseALIENS.dirPos = { i: 1, j: 1 } // → Right
    }
    // if (ALIENS.dirPos.i === -1 && -1 === ALIENS.dirPos.j) { // Up }
    return
}

function cleanBoard(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    console.log(`cleanBoard(${rowIdxStart}, ${rowIdxEnd}, ${colIdxStart}, ${colIdxEnd})`);
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            gBoard[i][j] = createCell({ i, j })
        }
    }
    renderBoard()
    return
}