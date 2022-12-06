'use strict'

//*                                                               Initiation
const GAME = {}

function initGame() {

    GAME.gameEls = {
        moon: '<div class="emoji moon" role="img"></div>',
        satellite: '<div class="satellite" role="img"><img src="assets/img/satellite.gif" alt="spaceShip"></div>',
        explode: '<div class="explode" role="img"><img src="assets/img/explode.gif" alt="Exploding"></div>',
        floor: '<div class="floor" role="img"></div>',
    }

    GAME.domEls = {
        elBoard: document.querySelector('.board'),
        elHeading: document.querySelector('.heading'),
        elMusic: document.querySelector('.music'),
        elScore: document.querySelector('.score'),
        elLife: document.querySelector('.life'),
        elMove: document.querySelector('.alien-move'),
        elCellMap: {}
    }

    GAME.audio = {}
    GAME.score = 0
    GAME.boardMap = { size: 14, rowsCount: 14, colsCount: 14 }

    // document.body.style.zoom = "90%";

    const { rowsCount, colsCount } = GAME.boardMap
    buildBoard(rowsCount, colsCount)
    const { board } = GAME

    board[12][5] = initHero(12, 5)
    initAlien()
    placeAliens()

    renderBoard()
    // Set elCellMap for less working on render each Cell 
    GAME.domEls.elCells = [...document.querySelectorAll('.cell')]
    const { elCells, elCellMap } = GAME.domEls
    elCells.forEach(elCell => {
        const { i, j } = elCell.dataset
        elCellMap[i][j] = elCell
    })

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
    const { elCellMap } = GAME.domEls
    let board = []
    for (let i = 0; i < rowsCount; i++) {
        board.push([])
        elCellMap[i] = []
        for (let j = 0; j < colsCount; j++) {
            board[i][j] = { pos: { i, j } }
            if (i === rowsCount - 1) board[i][j].gameEl = gameEls.floor
            elCellMap[i][j] = {}
        }
    }
    GAME.board = board
}

function renderBoard() {
    const { board } = GAME
    const { elBoard } = GAME.domEls
    let strHTML = ''
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const color = `style="box-shadow: ${cell.color || ''} !important;"`
            strHTML += `\t<td ${color} class="cell [${i}][${j}] " data-i="${i}" data-j="${j}">${cell.gameEl || ''}</td>`
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML
}

//*                                                                  Cell

// Model
function updateCell(pos, gameObj) {
    if (!isOnBoard(pos)) return
    const { i, j } = pos
    const { board } = GAME
    if (!gameObj) board[i][j] = { pos: { i, j } }
    else board[i][j] = { ...gameObj, pos: { i, j } }
    renderCell(pos)
}

// Dom
function renderCell(pos) {
    const { i, j } = pos
    const { board } = GAME
    const cell = board[i][j]

    const { elCellMap } = GAME.domEls
    const elCell = elCellMap[i][j]

    elCell.innerHTML = cell.gameEl || ''
}

function moveObj(pos, gameObj) {
    if (!isOnBoard(pos)) return
    const { i, j } = pos
    const { board } = GAME

    if (board[i][j].gameEl) return
    updateCell(gameObj.pos)
    gameObj.pos = pos
    updateCell(gameObj.pos, gameObj)
}

function blinkCell(pos, gameObj, timeout = 50) {
    updateCell(pos, gameObj)
    setTimeout(updateCell, timeout, pos)
}

//*                                                                 Validation
function isOnBoard(pos) {
    const { i, j } = pos
    const { board } = GAME
    if (
        i < 0 || // topRowIdx
        j < 0 || // colIdxStart
        j > board[0].length - 1 || // colIdxEnd
        i > board.length - 1 // BottomRowIdx

    ) return false
    return true
}

//*                                                                 Score
function setScore(diff) {
    GAME.score += diff
    const { elScore } = GAME.domEls
    elScore.innerText = GAME.score
}

//*                                                                 Rocket
function blowUpNeighbors(cellI, cellJ) {
    for (let i = cellI; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length) continue
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue


        }
    }
}