'use strict'

//*                                                               Initiation
const GAME = {}

    // Call Dom Elements 
    ; (() => {
        GAME.domEls = {
            elBoard: document.querySelector('.board'),
            elHeading: document.querySelector('.heading'),
            elMusic: document.querySelector('.music'),
            elScore: document.querySelector('.score'),
            elLife: document.querySelector('.life'),
            elMove: document.querySelector('.alien-move'),
        }
        GAME.gameEls = {
            hero: '<div class="hero" role="img"><img src="assets/img/hero.svg" alt="spaceShip"><div/>',
            alien: '<div class="space-invader space-invader-1 animate" role="img"><div/>',
            moon: '<div class="emoji moon" role="img"></div>',
            laser: '<div class="laser" role="img"><img src="assets/img/laser.png" alt="Laser Shoot"><div/>',
            satellite: '<div class="satellite" role="img"><img src="assets/img/satellite.gif" alt="spaceShip"></div>',
            explode: '<div class="explode" role="img"><img src="assets/img/explode.gif" alt="Exploding"></div>',
            floor: '<div class="floor" role="img"></div>',
        },
            GAME.audio = {}
        // gDomEls.elTime = document.querySelector('.time')
        // gDomEls.elUserMsg = document.querySelector('.user-msg')
    })()

function initGame() {
    // document.body.style.zoom = "90%";

    // Model
    GAME.score = 0

    GAME.boardMap = {
        size: 14,
        // aliensRowLength: 8,
        // aliensRowCount: 3
    }
    GAME.board = buildBoard(14, 14)
    initHero()
    initAlien()

    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = GAME.alien.posMap
    createAliens(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd)
    placeAliens(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd)

    renderBoard()
    GAME.domEls.elCells = [...document.querySelectorAll('.cell')]

    // Game
    startPlay()
}

function startPlay() {
    const { audio } = GAME
    // audio['music'] = playAudio('music')
    // console.log('audio:', audio)
    // console.dir(audio['music'])

    // elHeading.hidden = true
    // elHeading.style.display = 'none'
    // console.dir(GAME.audio['game'] )
    GAME.isOn = true
    console.log('GAME:', GAME)
}

//*                                                                  Board
function buildBoard(rowsCount, colsCount) {
    const { gameEls } = GAME
    let board = []
    for (let i = 0; i < rowsCount; i++) {
        board.push([])
        for (let j = 0; j < colsCount; j++) {
            board[i][j] = { pos: { i, j } }
            if (i === rowsCount - 1) board[i][j].gameEl = gameEls.floor
        }
    }
    board[0][colsCount - 1].gameEl = gameEls.moon
    board[Math.floor(rowsCount / 2)][1].gameEl = gameEls.satellite
    return board
}

function renderBoard() {
    const { board } = GAME
    const { elBoard } = GAME.domEls
    let strHTML = ''
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            strHTML += `\t<td class="cell" data-i="${i}" data-j="${j}">${cell.gameEl || ' '}</td>`
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML
}

//*                                                                  Cell
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
    // find relevant By +'[NodeList].dataset'
    const { elCells } = GAME.domEls
    const elCell = elCells.find(curElCell =>
        +curElCell.dataset.i === i && +curElCell.dataset.j === j
    )

    const { board } = GAME
    const cell = board[i][j]
    elCell.innerHTML = cell.gameEl || ''
}

function blinkCell(pos, gameEl, timeout = 30) {
    updateCell(pos, gameEl)
    setTimeout(updateCell, timeout, pos)
}

function elementHit(pos) {
    const { i, j } = pos
    const { board, gameEls } = GAME
    const cell = board[i][j]
    cell.gameEl = ''
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

