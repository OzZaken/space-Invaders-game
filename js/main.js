'use strict'
// ; (() => {
//     window.GAME = {
//         onInit,
//         onHeroEvent
//     }
// })
//*                                                               Initiation

function initGame() {
    window.GAME = {
        domEls: {
            moon: '<div class="emoji moon" role="img"></div>',
            satellite: '<div class="satellite" role="img"><img src="assets/img/satellite.gif" alt="spaceShip"></div>',
            explode: '<div class="explode" role="img"><img src="assets/img/explode.gif" alt="Exploding"></div>',
            floor: '<div class="floor" role="img"></div>',
        },
        domEls: {
            elBoard: document.querySelector('.board'),
            elHeading: document.querySelector('.heading'),
            elMusic: document.querySelector('.music'),
            elScore: document.querySelector('.score'),
            elLife: document.querySelector('.life'),
            elMove: document.querySelector('.alien-move'),
            elCellMap: {}
        },
        audio: {},
        score: 0,
        boardMap: { size: 14, rowsCount: 14, colsCount: 14 }
    }

    const { rowsCount, colsCount } = GAME.boardMap
    buildBoard(rowsCount, colsCount)

    const { board } = GAME
    board[12][5] = initHero(12, 5)

    initAlien()
    placeAliens()

    renderBoard()
    console.log('🐞');
    GAME.domEls.elCells = [...document.querySelectorAll('.cell')]
    const { elCells, elCellMap } = GAME.domEls
    elCells.forEach(elCell => {
        const { i, j } = elCell.dataset
        elCellMap[i][j] = elCell
    })

    document.body.style.zoom = "95%";
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
    const { domEls } = GAME
    const { elCellMap } = GAME.domEls
    let board = []
    for (let i = 0; i < rowsCount; i++) {
        board.push([])
        elCellMap[i] = []
        for (let j = 0; j < colsCount; j++) {
            board[i][j] = { pos: { i, j } }
            if (i === rowsCount - 1) board[i][j].domEl = domEls.floor
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
            // ${cell.color && setAlienColor(cell.color)}
            strHTML += `\t<td class="cell [${i}]|[${j}]" data-i="${i}" data-j="${j}">${cell.domEl || ''}</td>`
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML
}

//*                                                                  Cell

// Change only Dom && timeOut for update base model 
function blinkCell(i, j, domEl, timeout = 30) {
    renderCell(i, j, domEl)  
    setTimeout(renderCell, timeout, i, j)  
}

// Model & Dom
function updateCell(i, j, gameObj) {
    console.log(`updateCell(${i}, ${j}, ${gameObj})`);
    // if (!isOnBoard(i, j)) return
    const { board } = GAME
    const newCell = gameObj ? { ...gameObj, pos: { i, j } } : { pos: { i, j } }

    board[i][j] = newCell
    renderCell(i, j)
}

// Dom By Model || optional value 
function renderCell(i, j, val) {
    const { board } = GAME
    const cell = board[i][j]

    const { elCellMap } = GAME.domEls
    const elCell = elCellMap[i][j]

    if (!val) elCell.innerHTML = cell.domEl || ''
    else elCell.innerHTML = val
}

function moveObj(i, j, gameObj) {
    if (!isOnBoard(i, j)) return
    const { board } = GAME
    if (board[i][j].domEl) return

    const { pos } = gameObj
    updateCell(pos.i, pos.j)
    pos.i = i
    pos.j = j
    updateCell(pos.i, pos.j, gameObj)
}

// Shoots,hero...
function isOnBoard(i, j) {
    const { board } = GAME
    if (
        i < 0 || // topRowIdx
        j < 0 || // colIdxStart
        i > board.length - 1 || // BottomRowIdx
        j > board[0].length - 1 // colIdxEnd
    )
        return false
    return true
}

// Score
function setScore(diff) {
    GAME.score += diff
    const { elScore } = GAME.domEls
    elScore.innerText = GAME.score
}

// Rocket
function blowUpNeighbors(cellI, cellJ) {
    for (let i = cellI; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length) continue
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue


        }
    }
}