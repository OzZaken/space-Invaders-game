'sue strict'

// TODO: 
//? ObjectMap?
const CLASSES = { //* classes CSS
    sky: 'sky',
    hero: 'hero'
}
const OBJECTS = { //* ImgPath
    alien: 'alien',
    hero: 'hero',
    empty:  getImgPath(CLASSES.sky),
    laser: 'laser'
}
///////////////////////////////////////////////////////////////////////////////////////////////

const GAME = { //* Game data 
    isOn: false,
    aliensCount: 0,
    // currHardLvlIdx: 0
}

const BOARD = { //* Board data
    size: 14,
    aliensRowLength: 8,
    aliensRowCount: 3
}



var gBoard

///////////////////////////////////////////////////////////////////////////////////////////////
function init() {
    console.log('Init()↓')
    // *init GAME
    GAME.isOn = false
    // GAME.currHardLvlIdx = 0
    // *init Board
    gBoard = buildBoard()
    console.log('gBoard:', gBoard)

    //*init Hero
    initHero()
    //*init Aliens




    initGame() // later on button
}

function initGame() {
    console.log('InitGame()↓')
    //* init Game
    GAME.isOn = true
    GAME.aliensCount = 0
    
    //* init Board
    document.querySelector('.game-container').hidden = false
    renderBoard(gBoard)

    createHero(gBoard)
    console.log('initGame():')
    UTBoard()
}
///////////////////////////////////////////////////////////////////////////////////////////////

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function buildBoard(ROWS = BOARD.size, COLUMNS = BOARD.size) {
    console.log('buildBoard()↓');
    var board = []
    for (var i = 0; i < ROWS; i++) {
        board.push([])
        for (var j = 0; j < COLUMNS; j++) {
            board[i][j] = createCell()
            // if (GAME.aliensRowCount === 3) board[i][j] = ''
            // else if (BOARD.aliensRowCount === 4) board[0][j] = ALIEN.alien
            // else BOARD[i][j] = HARD_MAPS[currHardLvl][i][j] // May need objectMap

        }
    }
    return board
}


function createCell(gameObject = OBJECTS.empty) {
    return { className: CLASSES.sky, gameObject: gameObject }
}

function renderBoard(board) {
    console.log('renderBoard(board)↓');
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
    var elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}

///////////////////////////////////////////////////////////////////////////////////////////////
function updateCell(pos, gameObject) {
    var elCell = getElCell(pos)

    // Model
    gBoard[pos.i][pos.j].gameObject = gameObject
    gBoard[pos.i][pos.j].className = gameObject

    // Dom
    elCell.innerHTML = gameObject


}

function getElCell(pos) { return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`) }