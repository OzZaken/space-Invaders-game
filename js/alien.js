'use strict'

function initAlien() {
    GAME.alien = {
        liveAliens: [],
        deadAliens: [],
        domEl: '<div class="alien alien-1 animate" role="img"><div/>',
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
                domEl: alien.domEl,
                isHit: false,
                // color: _getRandomColor(),
            })
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
    const { board, domEls, alien } = GAME
    const { liveAliens, deadAliens } = alien

    const hitAlien = board[i][j]
    hitAlien.isHit = true
    const alienIdx = liveAliens.findIndex(alien => alien.isHit)
    deadAliens.push(liveAliens.splice(alienIdx, 1))

    if (!liveAliens.length) console.log('win:', liveAliens, deadAliens)

    setScore(10)
    playAudio('explode')
    updateCell(i, j)
    blinkCell(i, j, domEls.explode)
}

function moveAliensInterval() {
    const { alien } = GAME
    const { dirPos, posMap } = alien
    console.log('dirPos:', dirPos)

    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = posMap
    cleanAlienCells(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd)

    setAlienDir()

    setAliensPos()

    placeAliens()
}

function setAlienDir() {
    console.log('setAlienDir');
    const { alien } = GAME

    // Update liveAliens pos
    const { dirPos, posMap, liveAliens } = alien
    const { i, j } = dirPos

    liveAliens.forEach(alien => {
        alien.pos.i += i
        alien.pos.j += j
    })

    // Update posMap
    posMap.topRowIdx += i
    posMap.bottomRowIdx += i
    posMap.colIdxStart += j
    posMap.colIdxEnd += j
    const { colIdxEnd, colIdxStart, bottomRowIdx } = posMap

    const { rowsCount, colsCount } = GAME.boardMap
    if (i === 0 && j === 1) {
        console.log('Right, colIdxEnd:', colIdxEnd)
        console.log(`(${colIdxEnd} === ${colsCount - 1})`);
        if (colIdxEnd + 1 === colsCount) {
            console.log('Moving Down', posMap)
            dirPos.i = 1
            dirPos.j = 0
        }
    }
    else if (i === 0 && j === -1) {
        console.log('Left, colIdxEnd:', colIdxStart)
        if (colIdxStart === 0) {

        }
    }
    else {
        console.log('Down, bottomRowIdx:', bottomRowIdx)
        if (bottomRowIdx === rowsCount) console.log('LOSE');
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
        console.log('board[pos.i + i][pos.j + j].domEl:', board[pos.i + i][pos.j + j].domEl)
        return !board[pos.i + i][pos.j + j].domEl
    })
}

function setAliensPos() {
    const { liveAliens, dirPos } = GAME.alien
    const { i, j } = dirPos

    liveAliens.forEach(alien => {
        alien.pos.i += i
        alien.pos.j += j
    })
}

// Recursive Func to find only the live on the current edge
function getEdgePoss(edgeNum, posStr, edgeStr) {
    const { liveAliens, posMap } = GAME.alien
    const { bottomRowIdx } = posMap

    if (edgeNum < 0 || edgeNum > bottomRowIdx) {
        console.log('Huston we have a problem 🐞');
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

function cleanAlienCells(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd) {
    for (let i = topRowIdx; i <= bottomRowIdx; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            updateCell(i, j)
        }
    }
}

// UT...Later on Pause Game
function onToggleAliensInterval() {
    const { alien, domEls } = GAME
    console.log('!alien.isFreeze:', !alien.isFreeze)
    if (alien.isFreeze) {
        alien.moveInterval = setInterval(moveAliensInterval, 2000)
        domEls.elMove.innerText = 'Pause Aliens'
    }
    else {
        clearInterval(alien.moveInterval)
        alien.moveInterval = null
        domEls.elMove.innerText = 'Move Aliens'
    }
    alien.isFreeze = !alien.isFreeze
}
function setAlienColor(color) {
    // console.log('color:', color)
}