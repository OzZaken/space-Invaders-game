'sue strict'

const OBJECTS = {
    alien: 'alien',
    alien2: 'alien2',
    empty: 'empty',
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
const GAME = { // Game data 
    isOn: null, // false on init true in initGame
    aliensCount: null, // ++ when adding to board
    board: {  // Board data
        size: null, // 14
        aliensRowLength: null, // 8
        aliensRowCount: null // 3
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
    // Dom → (btns, board, score)
    document.querySelector('.game-container').hidden = false
    document.querySelector('.start-btn').hidden = true
    elScore = document.querySelector('.game-container span.score').innerText = 0
    renderBoard(gBoard)
    // start btn
    // Hero
    createHero(gBoard)
    // Aliens
    placeAliens()
    // Game
    GAME.isOn = true
}
function playAgin() {
    document.querySelector('.modal').classList.add('display-none')

    init()
    initGame()
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
    board[0][12].gameObject = OBJECTS.moon
    // board[0][].gameObject = OBJECTS.satelliteSpace
    board[7][1].gameObject = OBJECTS.satelliteSpace

    for (let i = 0; i < GAME.board.size; i++) {
        board[GAME.board.size - 1][i].gameObject = OBJECTS.floor
    }
    return board
}
function renderBoard(board) {
    console.log('← renderBoard(board)');
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var imgPath = gBoard[i][j].gameObject
            strHTML += `<td data-i="${i}" data-j="${j}" class="cell" >${getGifPath(imgPath)}</td>`

        }
        strHTML += '</tr>'
    }
    document.querySelector('tbody.board').innerHTML = strHTML
}