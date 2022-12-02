'use strict'

//*                                                               Initiation
const GAME = {
    board: [],
    domEls: {},
    hero: {},
    boardMap: {},
    alien: {},
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
        domEls.elLife = document.querySelector('.life')
        // gDomEls.elTime = document.querySelector('.time')
        // gDomEls.elUserMsg = document.querySelector('.user-msg')
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
    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = GAME.alien
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
        i < 0 || // Up
        j < 0 || // Left
        j > board[0].length - 1 || // Right
        i > board.length - 1 // Down
        
    ) {
        console.log('out of board');
        return false
    }
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

