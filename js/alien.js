'use strict'

function initAlien() {
    GAME.alien = {
        liveAliens: [],
        deadAliens: [],
        gameEl: '<div class="space-invader space-invader-1 animate" role="img"><div/>',
        isFreeze: true,
        moveInterval: 1000,
        dirPos: { i: 0, j: 1 },
        posMap: {
            topRowIdx: 1,
            bottomRowIdx: 3,
            colIdxStart: 3,
            colIdxEnd: 10,
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
                color: _getRandomColor(),
            })
        }
    }
}

function placeAliens() {
    const { liveAliens } = GAME.alien
    liveAliens.forEach(alien => {
        const { board } = GAME
        const { i, j } = alien.pos
        board[i][j] = alien
        renderCell({ i, j })
    })
}

function alienHit(pos) {

    const { i, j } = pos
    const { board, gameEls } = GAME

    const cell = board[i][j]
    cell.isHit = true

    const { liveAliens, deadAliens } = GAME.alien
    const alienIdx = liveAliens.findIndex(alien => alien.isHit)
    deadAliens.push(liveAliens.splice(alienIdx, 1))

    if (!liveAliens.length) console.log('win:', liveAliens)

    setScore(10)
    playAudio('explode')
    blinkCell(pos, gameEls.explode, 780)
}

function moveAliensInterval() {
    console.log('move Interval');
    const { alien } = GAME

    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = alien
    cleanAlienCells(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd)
    setAlienDir()
    setAliensPos()
    placeAliens()
    console.log(`Placed Aliens`);
}

function setAlienDir() {
    const { board, alien } = GAME
    const { dirPos } = GAME.alien
    const { bottomRowIdx, colIdxStart, colIdxEnd } = alien.posMap

    // Lose
    if (bottomRowIdx === board.length - 1) {
        console.log('LOSE', GAME);
        onToggleAliensInterval()
    }

    // If Already moving down force Choose other Direction
    const { i, j } = dirPos
    const isMovedDown = i === j === 1
    // Left Edge
    if (colIdxStart === 0) {
        if (!isDirBlock('bottomRowIdx') && !isMovedDown) {
            dirPos.i = 1
            dirPos.j = 1
        } else {
            dirPos.i = 0
            dirPos.j = 1
        }
        return
    }
    // Right Edge
    if (colIdxEnd === board[0].length - 1) {
        if (!isDirBlock('bottomRowIdx') && !isMovedDown) {
            dirPos.i = 1
            dirPos.j = 1
        } else {
            dirPos.i = 0
            dirPos.j = -1
        }
        return
    }

    switch (i, j) { // dirPos 
        //  Right
        case i === 0 && j === 1:
            if (isDirBlock('colIdxEnd')) {
                if (!isDirBlock('bottomRowIdx')) dirPos.i = 1 // Blocked  ? Set dirPos Down
                // All ways blocked From Game Elements, double time aliens run on the same row
                else dirPos.j = -1
            }
            break
        //  Left
        case i === 0 && j === -1:
            if (isDirBlock('colIdxStart')) {
                if (!isDirBlock('bottomRowIdx')) dirPos.i = 1
                else dirPos.j
            }
            break
        //  Down
        case i === 1 === j:
            dirPos.i = 0
            if (isDirBlock('colIdxEnd')) dirPos.j = -1
            else dirPos.j = 1
        default:
            console.log('No need to Change DirPos:', GAME.alien.dirPos)
            break;
    }
}

function isDirBlock(edgeDirStr) {
    const { board, alien } = GAME
    const { posMap } = alien

    const posStr = /bottomRowIdx/.test(edgeDirStr) ? 'i' : 'j'
    const edgeAlienPoss = getEdgePoss(posMap[edgeDirStr], posStr, edgeDirStr)

    const { i, j } = alien.dirPos
    return edgeAlienPoss.every(pos => !board[pos.i + i][pos.j + j].gameEl)
}

function setAliensPos() {
    const { alien } = GAME
    const { liveAliens, dirPos } = alien
    const { i, j } = dirPos
    const { posMap } = alien
    // Update Aliens pos
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
function getEdgePoss(EdgeNum, posStr, edgeStr) {
    const { liveAliens } = GAME.alien

    const edgeAliens = liveAliens.filter(alien => alien.pos[posStr] === EdgeNum)

    const edgePoss = []
    if (edgeAliens.length >= 1) return edgeAliens.forEach(alien => edgePoss.push(alien.pos))

    // only in case of moving right the edge is Smaller
    if (/colIdxEnd/.test(edgeStr)) EdgeNum--
    // in case of moving Down or Left the edge Bigger
    else EdgeNum++

    getEdgePoss(EdgeNum, posStr, edgeStr)
}

function cleanAlienCells(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd) {
    const { board } = GAME
    for (let i = topRowIdx; i <= bottomRowIdx; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            board[i][j] = { pos: { i, j } }
            renderCell({ i, j })
        }
    }
    console.log('board[3][3]:', board[3][3])
}

// UT...Later on Pause Game
function onToggleAliensInterval() {
    const { alien, domEls } = GAME
    if (alien.isFreeze) {
        console.log('alien.isFreeze:', alien.isFreeze)
        domEls.elMove.innerText = 'Pause Aliens'
        alien.isFreeze = false
        alien.moveInterval = setInterval(moveAliensInterval, 2000)
        return
    }
    alien.isFreeze = true
    clearInterval(alien.moveInterval)
    alien.moveInterval = null
    domEls.elMove.innerText = 'Move Aliens'
}