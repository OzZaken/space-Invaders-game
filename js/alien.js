'use strict'

function initAlien() {
    // ALIENS.movementSpeed = 1000
    const { alien } = GAME
    alien.liveAliens = []
    alien.deadAliens = []
    alien.isFreeze = false
    alien.dirPos = { i: 0, j: 1 }
    alien.topRowIdx = 1
    alien.bottomRowIdx = 3
    alien.colIdxStart = 3
    alien.colIdxEnd = 10
}

function createAliens(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    const { board, gameEls, alien } = GAME
    const { liveAliens } = alien
    for (let i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            const newAlien = board[i][j]
            newAlien.gameEl = gameEls.alien
            newAlien.isHit = false
            newAlien.pos = { i, j }
            liveAliens.push(newAlien)
        }
    }
    console.log('liveAliens:', liveAliens)
}

function alienHit(pos) {
    const { i, j } = pos
    const { board, gameEls } = GAME
    const { liveAliens, deadAliens } = GAME.alien
    const cell = board[i][j]
    cell.isHit = true
    endShoot()
    blinkCell(pos, gameEls.explode, 780)
    playAudio('explode')
    const alienIdx = liveAliens.findIndex(alien => alien.isHit)
    deadAliens.push(liveAliens.splice(alienIdx, 1))
    setScore(10)
    if (!liveAliens.length) {
        console.log('win:', liveAliens)
    }
}

function onFreezeAliens() {
    const { alien } = GAME
    alien.isFreeze = true
}


function moveAliens() {
    const { alien } = GAME
    const {
        dirPos,
        topRowIdx,
        bottomRowIdx,
        colIdxStart,
        colIdxEnd,
        liveAliens,
    } = alien
    cleanAlienCells(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd)
    setAlienDir()

    setAliensPos()

}

function cleanAlienCells(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    for (let i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            updateCell({ i, j })
        }
    }
}

function setAlienDir() {
    const { dirPos } = GAME.alien

    switch (dirPos) {
        case dirPos.i === 0 & dirPos.j === 1: //* Moving Right
            if (isDirBlock('colIdxEnd')) dirPos.i = 1 // Blocked  ? Move Down
            break;
        case dirPos.i === 0 & dirPos.j === -1: //* Moving Left
            if (isDirBlock('colIdxStart')) dirPos.i = 1//Move Down
            break;
        case dirPos.i === 1 & dirPos.j === 1: //* Moving Down
            if (isDirBlock()) { // Blocked 
                if (isDirBlock('bottomRowIdx')) { // Move Left || Right
                    dirPos.i = 0
                    dirPos.j = -1
                }
                else {
                    dirPos.i = 0
                    dirPos.j = 1
                }
            }
            break;
        default:
            // * no need to change dirPos
            break;
    }
}

function isDirBlock(dir) {
    const { board, alien } = GAME
    const { bottomRowIdx, colIdxStart, colIdxEnd, } = alien

    const edgePoss = (/colIdxEnd/.test(dir)) ? getEdgePos(colIdxEnd, 'j', 'colIdxEnd') // Right
        : (/colIdxStart/.test(dir)) ? getEdgePos(colIdxStart, 'j', 'colIdxStart') // Left
            : getEdgePos(bottomRowIdx, 'i', 'bottomRowIdx') // Down


    const { i, j } = alien.dirPos
    return edgePoss.every(pos => !board[pos.i + i][pos.j + j].gameEl)// or .gameEl===gameEls.empty 
}

function setAliensPos() {
    const { liveAliens, dirPos } = GAME.alien
    const { i, j } = dirPos
    liveAliens.forEach(alien => {
        alien.pos.i += i
        alien.pos.j += j
    })
}

function getEdgePos(EdgeNum, dirStr, edgeStr) {
    const { liveAliens } = GAME.alien
    const edgeAliens = liveAliens.filter(alien => alien.pos[dirStr] === EdgeNum)
    const edgePoss = []

    if (!edgeAliens || !edgeAliens.length) {
        if (/colIdxEnd/.test(edgeStr)) EdgeNum--
        if (/colIdxStart/.test(edgeStr)) EdgeNum++
        if (/bottomRowIdx/.test(edgeStr)) EdgeNum++

        getEdgePos(EdgeNum, dirStr, edgeStr)
        return
    }
    else edgeAliens.forEach(alien => edgePoss.push(alien.pos))
}

function changeAliensDir() {
    const { dirPos } = GAME.alien
    if (dirPos.i === 0 && 1 === dirPos.j || // → Right
        dirPos.i === -1 && 0 === dirPos.j) { // ← Left
        // ↓ Set Down
        dirPos.i = 1
        dirPos.j = 1
    }
    else if (dirPos.i === 1 && 1 === dirPos.j) { // Already Down
        var aliensEdges = getAliensEdges(getLiveAliensPoss())[0]
        if (aliensEdges.j === gBoard[0].length - 1) dirPos = { i: 1, j: 1 } // ← Left
        else dirPos = { i: 1, j: 1 } // → Right
    }
    // if (ALIENS.dirPos.i === -1 && -1 === ALIENS.dirPos.j) { // Up }
}

// getEdgeAliens
    // const edgeAliens = []
    // liveAliens.forEach(alien => {
    //     if (alien.pos[dirStr] === EdgeNum) edgeAliens.push(alien)
    // })