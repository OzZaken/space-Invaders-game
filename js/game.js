'sue strict'

const OBJECTS = {
    alien: 'alien',
    hero: 'hero',
    empty: 'empty',
    laser: 'laser',
    floor: 'floor',
    rocket: 'rocket',
    explode: 'explode'
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
    GAME.isOn = false
    GAME.aliensCount = 0
    GAME.intervals = {}
    // init Board
    GAME.board.size = 14
    GAME.board.aliensRowLength = 8
    GAME.board.aliensRowCount = 3
    gBoard = buildBoard()
    console.log('gBoard:', gBoard)
    // init Hero
    initHero()
    // init Aliens
    initAliens()
    initGame() // later on button
}
function initGame() {
    // Board
    document.querySelector('.game-container').hidden = false
    renderBoard(gBoard)

    // Aliens
    createHero(gBoard)
    console.log(gBoard)

    // Aliens
    placeAliens()

    // Game
    updateScore(0)
    GAME.isOn = true
}
///////////////////////////////////////////////////////////////////////////////////////////////
function buildBoard(ROWS = GAME.board.size, COLUMNS = GAME.board.size) {
    console.log('buildBoard()↓');
    var board = []
    for (var i = 0; i < ROWS; i++) {
        board.push([])
        for (var j = 0; j < COLUMNS; j++) {
            board[i][j] = createCell({ i, j })
        }
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