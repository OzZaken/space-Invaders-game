'use strict'

function initAlien() {
    GAME.alien = {
        liveAliens: [],
        deadAliens: [],
        gameEl: '<div class="alien alien-1 animate" role="img"><div/>',
        isFreeze: true,
        moveInterval: 1000,
        dirPos: { i: 0, j: 1 },
        posMap: {
            colIdxStart: 3,
            topRowIdx: 1,
            colIdxEnd: 10,
            bottomRowIdx: 3,
        },
    }
    createAliens()
}

function createAliens() {
    const { alien } = GAME
    const { liveAliens } = alien
    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = alien.posMap

    for (let i = topRowIdx; i <= bottomRowIdx; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            liveAliens.push({
                pos: { i, j },
                gameEl: alien.gameEl,
                isHit: false,
                // color: _getRandomColor(),
            })
        }
    }
}

function placeAliens1() {
    const { alien, board } = GAME
    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = alien.posMap

    for (let i = topRowIdx; i <= bottomRowIdx; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            if (board[i][j].gameEl === alien.gameEl) {

            }
        }
    }
}

function placeAliens() {
    const { liveAliens } = GAME.alien
    liveAliens.forEach(alien => {
        const { i, j } = alien.pos
        updateCell(i, j, alien)
    })
}

function alienHit(i, j) {
    const { board, gameEls, alien } = GAME
    const { liveAliens, deadAliens } = alien

    const hitAlien = board[i][j]
    hitAlien.isHit = true
    const alienIdx = liveAliens.findIndex(alien => alien.isHit)
    deadAliens.push(liveAliens.splice(alienIdx, 1))

    if (!liveAliens.length) console.log('win:', liveAliens, deadAliens)

    setScore(10)
    playAudio('explode')
    board[i][j] = { pos: { i, j } }
    blinkCell(i, j, gameEls.explode)
}

function moveAliensInterval() {
    cleanAlienCells()

    setAlienDir()

    setAliensPos()

    placeAliens()
}

function setAlienDir() {
    const { alien, boardMap } = GAME
    const { rowsCount, colsCount } = boardMap

    const { dirPos, posMap } = alien
    const { colIdxEnd, colIdxStart, bottomRowIdx } = posMap

    const { i, j } = dirPos

    if (i === 0 && j === 1) {
        if (colIdxEnd === colsCount - 1) {
            dirPos.i = 1
            dirPos.j = 0
        }
    }
    else if (i === 0 && j === -1) {
        if (colIdxStart <= 0) {
            dirPos.i = 1
            dirPos.j = 0
        }
    }
    else {
        if (bottomRowIdx >= rowsCount - 1) console.log('LOSE')

        else if (colIdxEnd === colsCount - 1) {
            dirPos.i = 0
            dirPos.j = -1
        }

        else if (colIdxStart === 0) {
            dirPos.i = 0
            dirPos.j = 1
        }
    }
}

function isDirBlock(edgeDirStr) {
    const { board, alien } = GAME
    const { posMap } = alien

    const posStr = /bottomRowIdx/.test(edgeDirStr) ? 'i' : 'j'
    const edgeAlienPoss = getEdgePoss(posMap[edgeDirStr], posStr, edgeDirStr)
    console.log('edgeAlienPoss:', edgeAlienPoss)

    const { i, j } = alien.dirPos
    return edgeAlienPoss.every(pos => {
        console.log('board[pos.i + i][pos.j + j].gameEl:', board[pos.i + i][pos.j + j].gameEl)
        return !board[pos.i + i][pos.j + j].gameEl
    })
}

function setAliensPos() {
    const { liveAliens, dirPos, posMap } = GAME.alien
    const { i, j } = dirPos

    // Update liveAliens pos
    liveAliens.forEach(alien => {
        alien.pos.i += i
        alien.pos.j += j
    })

    // Update posMap
    posMap.topRowIdx += i
    posMap.bottomRowIdx += i
    posMap.colIdxStart += j
    posMap.colIdxEnd += j

}

// Recursive Func to find only the live on the current edge
function getEdgePoss(edgeNum, posStr, edgeStr) {
    const { liveAliens, posMap } = GAME.alien
    const { bottomRowIdx } = posMap

    if (edgeNum < 0 || edgeNum > bottomRowIdx) {
        console.log('Huston we have a problem 🐞')
        return
    }
    const edgeAliens = liveAliens.filter(alien => alien.pos[posStr] === edgeNum)
    console.log('edgeAliens:', edgeAliens)


    if (edgeAliens.length >= 1) {
        const edgePoss = []
        console.log('edgePoss.push(alien.pos):', edgeAliens.forEach(alien => edgePoss.push(alien.pos)))
        return edgeAliens.forEach(alien => edgePoss.push(alien.pos))
    }
    else {
        // only in case of moving right the edge is Smaller
        if (/colIdxEnd/.test(edgeStr)) edgeNum--
        else edgeNum++
    }
    console.log('EdgeNum:', edgeNum)

    getEdgePoss(edgeNum, posStr, edgeStr)
}

function cleanAlienCells() {
    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = GAME.alien.posMap
    for (let i = topRowIdx; i <= bottomRowIdx; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            updateCell(i, j)
        }
    }
}

// UT...Later on Pause Game
function onToggleGame() {
    const { alien, domEls } = GAME
    const { elMove } = domEls
    if (alien.isFreeze) {
        alien.moveInterval = setInterval(moveAliensInterval, 1000)
        elMove.innerText = 'Pause Aliens'
    }
    else {
        clearInterval(alien.moveInterval)
        alien.moveInterval = null
        elMove.innerText = 'Move Aliens'
    }
    alien.isFreeze = !alien.isFreeze
}

function setAlienColor(color) {
    // console.log('color:', color)
}