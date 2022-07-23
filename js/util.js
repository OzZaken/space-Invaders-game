'sue strict'

function isValidMove(dir) {
    if (!GAME.isOn) return false
    else if (dir.j < 0 || dir.j > gBoard[0].length - 1) return false
    else if (gBoard[dir.i][dir.j].gameObject !== OBJECTS.empty) return false
    return true
}
///////////////////////////////////////////////////////////////////////////////////////////////
function createCell(pos, gameObject = OBJECTS.empty) {
    return {
        pos: pos,
        gameObject: gameObject,
    }
}
function updateCell(pos, gameObject = OBJECTS.empty) {
    // console.log(`updateCell(${pos.i},${pos.j},${gameObject})`)
    // Model
    gBoard[pos.i][pos.j].gameObject = gameObject
    //  Dom
    var elCell = getElCell(pos)
    elCell.innerHTML = getImgPath(gameObject)
}
function renderCell(pos, gameObject = OBJECTS.empty) {
    var elCell = getElCell(pos)
    if (gameObject === OBJECTS.laser) {
        elCell.innerHTML = getImgPath(OBJECTS.laser)
        return
    }
    elCell.innerHTML = getImgPath(gameObject)
    return
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
function getRandEmptyPos() {
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
function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j].gameObject === OBJECTS.OBJECTS
}
///////////////////////////////////////////////////////////////////////////////////////////////
function openModal(state) {
    gGame.isOn = false
    console.log('TODO: open modal with reset Game');
}
function playAudio(AudioName) {
    if (gAudio) {
        gAudio.pause()
        return
    }
    new Audio(`audio/${AudioName}.mp3`).play()
}
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
///////////////////////////////////////////////////////////////////////////////////////////////
function checkGameOver() {
    if (gPlayer.score <= 0) openModal('LOSE')
    var targetsCover = 0
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isTarget && gBoard[i][j].gameElement === CARGO_ON_TARGET) targetsCover++
        }
        if (targetsCover === gGame.currLvlTargets) {
            console.log('Win')
            var nextLvl = gGame.currLvl + 1
            openModal('WIN')
            setTimeout(() => {
                initGame(nextLvl)
            }, 3000);
        }
    }
}