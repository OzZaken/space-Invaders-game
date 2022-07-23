'sue strict'

const OBJECTS = {
    alien: 'alien',
    alien2: 'alien2',
    empty: 'empty',
    earth: 'earth',
    explode: 'explode',
    floor: 'floor',
    hero: 'hero',
    laser: 'laser',
    modalBye: 'modal-bye',
    modal: 'modal',
    moon: 'moon',
    rocket: 'rocket',
    satelliteSpace: 'satellite-space'

}
const GAME = {
    isOn: null,
    aliensCount: null,
    board: {
        size: null,
        aliensRowLength: null,
        aliensRowCount: null
    },
}
var gBoard
///////////////////////////////////////////////////////////////////////////////////////////////
function init() {
    //init GAME
    GAME.score = 0
    GAME.isOn = false
    GAME.aliensCount = 0
    // init Board
    GAME.board.size = 14
    GAME.board.aliensRowLength = 8
    GAME.board.aliensRowCount = 3
    gBoard = buildBoard()
    // init Hero
    initHero()
    // init Aliens
    initAliens()
    initGame() // *later on button
}
function initGame() {
    // *Dom → btns, score, modal, board
    document.querySelector('.start-btn').hidden = true
    elScore = document.querySelector('.game-container span.score').innerText = 0
    document.querySelector('.game-container').hidden = false
    renderBoard(gBoard)
    // Hero
    createHero()
    // Aliens
    placeAliens()
    // Game
    GAME.isOn = true
    // intervals
    // GAME.satelliteSpaceInterval = setInterval(addObject, 15000, OBJECTS.satelliteSpaceInterval)
    toggleAliensInt()
}
function playAgin() {
    document.querySelector('.modal').classList.add('display-none')
    init()
    initGame()
}
function toggleAliensInt() {
    if (ALIENS.movementInterval) {
        document.querySelector('button.unit-testing').innerText = 'Continue'
        clearInterval(ALIENS.movementInterval)
        ALIENS.movementInterval = null
    }
    else {
        document.querySelector('button.unit-testing').innerText = 'Pause'
        ALIENS.movementInterval = setInterval(moveAliens, 1000, ALIENS.currDirPos)
    }
    return
}
///////////////////////////////////////////////////////////////////////////////////////////////
function buildBoard(ROWS = GAME.board.size, COLUMNS = GAME.board.size) {
    // console.log('buildBoard()↓');
    var board = []
    for (var i = 0; i < ROWS; i++) {
        board.push([])
        for (var j = 0; j < COLUMNS; j++) {
            board[i][j] = createCell({ i, j })
        }
    }
    // board[0][7].gameObject = OBJECTS.earth
    board[0][GAME.board.size - 1].gameObject = OBJECTS.moon
    board[7][1].gameObject = OBJECTS.satelliteSpace

    for (let i = 0; i < GAME.board.size; i++) {
        board[GAME.board.size - 1][i].gameObject = OBJECTS.floor
    }
    return board
}
function renderBoard(board = gBoard) {
    console.log('← renderBoard(board)');
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var objectName = gBoard[i][j].gameObject
            strHTML += `<td data-i="${i}" data-j="${j}" class="cell" >${getImgPath(objectName)}</td>`
        }
        strHTML += '</tr>'
    }
    document.querySelector('tbody.board').innerHTML = strHTML
    return
}
///////////////////////////////////////////////////////////////////////////////////////////////
// TODO: later
function addObject(value, gameObject) {
    var randCell = getRandEmptyPos()
    if (!randCell) return
    randCell.gameElement = value
    updateCell(randCell.pos, getImgPath(gameObject))
    setTimeout(() => {
        removeObject(randCell, value)
    }, 4000)
}
function removeObject(cell, value) {
    if (cell.gameElement !== value) return

}