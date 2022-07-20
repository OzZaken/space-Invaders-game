'sue strict'
// Not Working
function UTBoard(board = gBoard) {
    console.log('UTBoard(board = gBoard):↓');
    var uTBoard = []
    for (let i = 0; i < board.length - 1; i++) {
        board[i] = []
        for (let j = 0; j < board.length[0] - 1; j++) {
            uTBoard[i][j] = board[i][j].gameObject
        }
    }
    console.table(uTBoard)
    return uTBoard
}
///////////////////////////////////////////////////////////////////////////////////////////////
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min)
}

function getImgPath(elementName) {
    return `<img src="img/${elementName}.gif" />`
}
///////////////////////////////////////////////////////////////////////////////////////////////