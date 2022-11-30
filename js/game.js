'use strict'

//*                                                               Initiation
const GAME = {
    board: [],
    domEls: {},
    hero: {},
    boardMap: {},
    alienMap: {},
    gameEls: {
        empty: '',//'' === false // ' ' === true
        hero: '<div class="hero" role="img"><img src="assets/img/hero.svg" alt="spaceShip"><div/>',
        alien: '<div class="space-invader space-invader-1 animate" role="img"><div/>',
        moon: '<div class="emoji moon" role="img"></div>',
        laser: '<div class="laser" role="img"><img src="assets/img/laser.png" alt="Laser Shoot"><div/>',
        satellite: '<div class="satellite" role="img"><img src="assets/img/satellite.gif" alt="spaceShip"></div>',
        explode: '<div class="explode" role="img"><img src="assets/img/explode.gif" alt="Exploding"></div>',
        floor: '<div class="floor" role="img"></div>',
    },
    audio: {},
}

    ; (() => {
        const { domEls } = GAME
        domEls.elBoard = document.querySelector('.board')
        domEls.elHeading = document.querySelector('.heading')
        domEls.elMusic = document.querySelector('.music')
        domEls.elScore = document.querySelector('.score')
        // gDomEls.elLife = document.querySelector('.life')
        // gDomEls.elTime = document.querySelector('.time')
        // gDomEls.elUserMsg = document.querySelector('.user-msg')
        // window.onresize = () => {
        //     location.reload()
        // }
    })()

function initGame() {
    document.body.style.zoom = "90%";

    // Model
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
    startPlay()
    // elHeading.hidden = true
    // elHeading.style.display = 'none'
}
function startPlay() {
    const { audio } = GAME
    // audio['music'] = playAudio('music')
    // console.log('audio:', audio)
    // console.dir(audio['music'])


    // console.dir(GAME.audio['game'] )
    GAME.isOn = true
}

//*                                                                   Board
function buildBoard() {
    const { size } = GAME.boardMap
    const { gameEls } = GAME
    let board = []
    for (let i = 0; i < size; i++) {
        board.push([])
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                id: makeId(),
                pos: { i, j }
            }
            if (i === size - 1) {
                board[i][j].gameEl = gameEls.floor
            }
        }
    }
    board[0][size - 1].gameEl = gameEls.moon
    board[7][1].gameEl = gameEls.satellite
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
function updateCell(pos, gameEl = '') {
    const { i, j } = pos
    const { board } = GAME
    // Model
    board[i][j].gameEl = gameEl
    //  Dom
    renderCell(pos)
}
function renderCell(pos) {
    const { i, j } = pos
    const { board } = GAME
    const { elCells } = GAME.domEls
    const curCell = elCells.find(elCell => +elCell.dataset.i === i && +elCell.dataset.j === j)
    if (board[i][j].gameEl) curCell.innerHTML = board[i][j].gameEl
    else curCell.innerText = ''
}
function blinkCell(pos, gameEl, timeout = 30) {
    updateCell(pos, gameEl)
    setTimeout(updateCell, timeout, pos)
}

function elementHit(pos) {
    const { i, j } = pos
    const { board, gameEls } = GAME
    const cell = board[i][j]
    cell.gameEl === gameEls.empty
    blinkCell(pos, gameEls.explode, 780)
    endShoot()
}

//*                                                                 Validation
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

//*                                                                 Score
function setScore(diff) {
    GAME.score += diff
    const { elScore } = GAME.domEls
    elScore.innerText = GAME.score
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
    cleanAlienCells(
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
    const {dirPos} = GAME.alienMap
    if (dirPos.i === 0 && 1 === dirPos.j || // → Right
        dirPos.i === -1 && 0 === dirPos.j) { // ← Left
        // ↓ Set Down
        dirPos.i = 1
        dirPos.j = 1
    }
    else if (dirPos.i === 1 && 1 === dirPos.j) { // Already Down
        var aliensEdges = getAliensEdges(getLiveAliensPoss())[0]
        if (aliensEdges.j === gBoard[0].length - 1) dirPos = { i: 1, j: 1 } // ← Left
        else dirPos = { i: 1, j: 1 } // → Right
    }
    // if (ALIENS.dirPos.i === -1 && -1 === ALIENS.dirPos.j) { // Up }
    return
}

function cleanAlienCells(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    const {board} = GAME
    console.log(`cleanBoard(${rowIdxStart}, ${rowIdxEnd}, ${colIdxStart}, ${colIdxEnd})`);
    for (let i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            board[i][j] = createCell({ i, j })
        }
    }
    renderBoard()
    return
}