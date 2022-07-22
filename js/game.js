'sue strict'

const OBJECTS = {
    alien: 'alien',
    hero: 'hero',
    empty: 'empty',
    laser: 'laser',
    laserGif: 'laser-2s',
    floor: 'floor',
    rocket: 'rocket',
    explode: 'explode',
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
    initGame() // later on button
}
function initGame() {
    // Board
    document.querySelector('.game-container').hidden = false
    renderBoard(gBoard)

    // Aliens
    createHero(gBoard)

    // Aliens
    placeAliens()

    // Game
    elScore = document.querySelector('.game-container span.score').innerText = 0
    GAME.isOn = true

    console.log(GAME);
    console.log(ALIENS);
    console.log(HERO);
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
    board[7][1].gameObject = OBJECTS.satelliteSpace
    board[0][12].gameObject = OBJECTS.satelliteSpace
    board[13][11].gameObject = OBJECTS.satelliteSpace


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