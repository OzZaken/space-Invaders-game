'sue strict'
///////////////////////////////////////////////////////////////////////////////////////////////
function createCell(pos, gameObject = OBJECTS.empty) {
    return {
        pos: pos,
        gameObject: gameObject,
    }
}
function updateCell(pos, gameObject = OBJECTS.empty) {
    // console.log(`updateCell(${pos.i}|${pos.j},${gameObject})`)
    // Model
    gBoard[pos.i][pos.j].gameObject = gameObject
    //  Dom
    var elCell = getElCell(pos)
    if (gameObject === OBJECTS.laser) {
        elCell.innerHTML = getImgPath(gBoard[pos.i][pos.j].gameObject)
        return
    }
    elCell.innerHTML = getGifPath(gBoard[pos.i][pos.j].gameObject)
    return
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
function getGifPath(elementName) {
    // console.log(`getGifPath(${elementName})`);
    return `<img src="img/${elementName}.gif" />`
}
function getImgPath(elementName) {
    // console.log(`getImgPath(${elementName}) `);
    return `<img src="img/${elementName}.png" />`
}
function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j].gameObject === OBJECTS.OBJECTS
}
function isAlien(coord) {
    return gBoard[coord.i][coord.j].gameObject === OBJECTS.alien
}
///////////////////////////////////////////////////////////////////////////////////////////////
function isMovingByOneCell(iAbsDiff, jAbsDiff) {
    if ((iAbsDiff + jAbsDiff === 1) ||
        (jAbsDiff + iAbsDiff === 1) ||
        (iAbsDiff === gBoard.length - 1) ||
        (jAbsDiff === gBoard[0].length - 1)) return true
    return false
}
function playAudio(AudioName) {
    if (gAudio) {
        gAudio.pause()
        return
    }
    new Audio(`audio/${AudioName}.mp3`).play()
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
function updateScore(diff) {

     var currScore = parseInt(document.querySelector('.game-status .score').innerText)
        console.log('currScore:', currScore)
    console.log('diff:', diff)
     += parseInt(diff)
}