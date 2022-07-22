'sue strict'
///////////////////////////////////////////////////////////////////////////////////////////////
function createCell(pos, gameObject = OBJECTS.empty) {
    return {
        pos: pos,
        gameObject: gameObject,
    }
}
function updateCell(pos, gameObject = OBJECTS.empty, key) {
    // console.log(`updateCell(${pos.i}|${pos.j},${gameObject})`)
    // Model
    gBoard[pos.i][pos.j].gameObject = gameObject
    //  Dom
    var elCell = getElCell(pos)

    elCell.innerHTML = getObjectPath(gameObject)
}
function renderCell(pos, gameObject = OBJECTS.empty) {
    var elCell = getElCell(pos)

    if (gameObject === OBJECTS.laser) {
        elCell.innerHTML = getImgPath(OBJECTS.laser)
        return
    }
    elCell.innerHTML = getGifPath(gameObject)
    return
}
function getElCell(pos) {
    // console.log(`getElCell(${pos.i},${pos.j})↓`)
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}
///////////////////////////////////////////////////////////////////////////////////////////////
function getObjectPath(elementName) {
    var imgPath = elementName === OBJECTS.laser ? getImgPath(elementName) : getGifPath(elementName)
    return imgPath
}
function getGifPath(elementName) {
    // console.log(`getGifPath(${elementName})`);
    return `<img src="img/${elementName}.gif" />`
}
function getImgPath(elementName) {
    // console.log(`getImgPath(${elementName}) `);
    return `<img src="img/${elementName}.png" />`
}
///////////////////////////////////////////////////////////////////////////////////////////////
function playAudio(AudioName) {
    if (gAudio) {
        gAudio.pause()
        return
    }
    new Audio(`audio/${AudioName}.mp3`).play()
}
function updateScore(diff) {
    console.log(GAME.score);
    GAME.score += diff
    document.querySelector('.game-container span.score').innerText = GAME.score
}
///////////////////////////////////////////////////////////////////////////////////////////////
function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j].gameObject === OBJECTS.OBJECTS
}
function isAlien(coord) {
    return gBoard[coord.i][coord.j].gameObject === OBJECTS.alien
}
function isMovingByOneCell(iAbsDiff, jAbsDiff) {
    if ((iAbsDiff + jAbsDiff === 1) ||
        (jAbsDiff + iAbsDiff === 1) ||
        (iAbsDiff === gBoard.length - 1) ||
        (jAbsDiff === gBoard[0].length - 1)) return true
    return false
}
function blowUpNeighbors(cellI, cellJ) {
    for (let i = cellI; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length) continue
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
        }
    }
}
