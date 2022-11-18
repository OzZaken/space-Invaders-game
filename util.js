'sue strict'

function isValidMove(pos) {
    if (!GAME.isOn) return false
    else if (pos.j < 0 || pos.j > gBoard[0].length - 1) return false
    else if (gBoard[pos.i][pos.j].gameObject !== OBJECTS.empty) return false
    return true
}

///////////////////////////////////////////////////////////////////////////////////////////////
function createCell(pos, gameObject = OBJECTS.empty) {
    return {
        pos: { i: pos.i, j: pos.j },
        gameObject: gameObject
    }
}
function renderCell(pos, gameObject = OBJECTS.empty) {
    var elCell = getElCell(pos)
    elCell.innerHTML = getImgPath(gameObject)
    return
}
function updateCell(pos, gameObject = OBJECTS.empty) {
    console.log(`updateCell(${pos.i},${pos.j},${gameObject})`)
    // Model
    gBoard[pos.i][pos.j].gameObject = gameObject
    //  Dom
    var elCell = getElCell(pos)
    elCell.innerHTML = getImgPath(gameObject)
}
function renderScore(diff) {
    GAME.score += diff
    document.querySelector('.game-container span.score').innerText = GAME.score
}
///////////////////////////////////////////////////////////////////////////////////////////////
function getElCell(pos) {
    // console.log(`getElCell(${pos.i},${pos.j})↓`)
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}
function getImgPath(elementName) {
    var imgPath = ''
    switch (elementName) {
        case OBJECTS.laser:
            imgPath = `<img src="img/${elementName}.png" />`
            break;
        case OBJECTS.empty:
            imgPath = ''
            break;
        default:
            imgPath = `<img src="img/${elementName}.gif" />`
            break;
    }
    return imgPath
}
///////////////////////////////////////////////////////////////////////////////////////////////
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function playAudio(AudioName, audioEco) {
    if (audioEco) {
        audioEco.pause()
        return
    }
    new Audio(`audio/${AudioName}.mp3`).play()
}
function openModal(isWin) { // TODO.. 
    gGame.isOn = false
    console.log('TODO: open modal with reset Game');
}
function getRandEmptyPos() { // TODO.. 
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].gameObject === OBJECTS.empty) {
                emptyCells.push({ i, j })
            }
        }
    }
    if (emptyCells.length === 0) return -1
    return emptyCells.splice(getRandomIntInclusive(0, emptyCells.length - 1), 1)[0]
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function moveObjects(fromPossA, toPossB) { // TODO
    for (let i = 0; i < fromPossA.length; i++) {


    }
    return
}
function moveObject(gameObject, fromPosA, toPosB) { // TODO.
    // PrevCell

    updateCell(fromPosA)
    // NextCell
    updateCell(toPosB, gameObject)
}