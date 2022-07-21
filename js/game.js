'sue strict'

const CLASSES = { //* classes CSS
    sky: 'sky',
    hero: 'hero'
}
const OBJECTS = {
    alien: 'alien',
    hero: 'hero',
    empty: 'empty',
    laser: 'laser',
    floor: 'floor',
    rocket: 'rocket'
}


const GAME = { //* Game data 
    isOn: null, // false on init true in initGame
    aliensCount: null, // ++ when adding to board
    board: {  //* Board data
        size: null, // 14
        aliensRowLength: null, // 8
        aliensRowCount: null // 3
    }
}
var gBoard
///////////////////////////////////////////////////////////////////////////////////////////////
function init() {
    console.log('Init()↓')

    // *init GAME
    GAME.isOn = false
    GAME.aliensCount = 0
    console.log('GAME:', GAME)

    // *init Board
    GAME.board.size = 14
    GAME.board.aliensRowLength = 8
    GAME.board.aliensRowCount = 3
    console.log('GAME.board:', GAME.board)
    gBoard = buildBoard()
    console.log('gBoard:', gBoard)

    //*init Hero
    initHero()
    console.log('HERO:', HERO)

    //*init Aliens
    initAliens()
    console.log('ALIENS:', ALIENS)
    ALIENS.id = null


    initGame() // later on button

}
function initGame() {
    //* Start Board
    document.querySelector('.game-container').hidden = false
    renderBoard(gBoard)


    //*Start Aliens
    createHero(gBoard)
    console.log(gBoard)

    //*Start Aliens
    placeAliensOnBoard()


    //* Start Game
    GAME.isOn = true
    console.log('GAME:', GAME)

}
///////////////////////////////////////////////////////////////////////////////////////////////

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function buildBoard(ROWS = GAME.board.size, COLUMNS = GAME.board.size) {
    console.log('buildBoard()↓');
    var board = []
    for (var i = 0; i < ROWS; i++) {
        board.push([])
        for (var j = 0; j < COLUMNS; j++) {
            board[i][j] = createCell({ i, j }, OBJECTS.empty, getImgPath(OBJECTS.empty), CLASSES.sky,)
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
            var cellObj = board[i][j].gameObject
            var className = board[i][j].className
            strHTML += `<td data-i="${i}" data-j="${j}" class="cell cell-${i}-${j} ${className}" >${cellObj}</td>`
        }
        strHTML += '</tr>'
    }
    document.querySelector('tbody.board').innerHTML = strHTML
}
///////////////////////////////////////////////////////////////////////////////////////////////