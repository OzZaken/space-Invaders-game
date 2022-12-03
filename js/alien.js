'use strict'

function initAlien() {
    // ALIENS.movementSpeed = 1000
    GAME.alien = {
        liveAliens: [],
        deadAliens: [],
        isFreeze: true,
        moveInterval: null,
        dirPos: { i: 0, j: 1 },
        posMap: {
            topRowIdx: 1,
            bottomRowIdx: 3,
            colIdxStart: 3,
            colIdxEnd: 10,
        },
    }
}

function createAliens(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd) {
    const { gameEls, alien } = GAME
    const { liveAliens } = alien

    for (let i = topRowIdx; i <= bottomRowIdx; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            liveAliens.push({
                pos: { i, j },
                gameEl: gameEls.alien,
                isHit: false,
                color: _getRandomColor(),
            })
        }
    }
}

function placeAliens() {
    const { board } = GAME
    const { liveAliens } = GAME.alien
    liveAliens.forEach(alien => {
        const { i, j } = alien.pos
        board[i][j] = alien
    })
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
    const { dirPos, bottomRowIdx, colIdxStart, colIdxEnd } = alien

    // If Already moving down force Choose other Direction
    const { i, j } = dirPos
    const isAlreadyDown = i === j === 1
    // console.log('isAlreadyDown:', isAlreadyDown)

    console.log(`colIdxEnd ${colIdxEnd}=== board[0].length - 1:${board[0].length - 1}:`, colIdxEnd === board[0].length - 1)
    switch (dirPos) {
        // can set in better place...
        case bottomRowIdx === board.length - 1:
            // if there is live aliens on that pos    
            console.log('LOSE', GAME);
            onToggleAliensInterval()
            break;
        // Border Edges 
        case colIdxStart === 0:
            if (!isDirBlock('bottomRowIdx') && !isAlreadyDown) {
                dirPos.i = 1
                dirPos.j = 1
            }
            else {
                dirPos.i = 0
                dirPos.j = 1
            }
            break;
        case colIdxEnd === board[0].length - 1:
            console.log('On Right Edge:')
            if (!isDirBlock('bottomRowIdx') && !isAlreadyDown) {
                dirPos.i = 1
                dirPos.j = 1
            }
            else {
                dirPos.i = 0
                dirPos.j = -1
            }
            break;
        // dirPos Right
        case dirPos.i === 0 & 1 === dirPos.j:
            console.log('Keeping Right');
            if (isDirBlock('colIdxEnd') && !isDirBlock('bottomRowIdx')) dirPos.i = 1 // Blocked  ? Set dirPos Down
            else dirPos.j = -1 // no other option Set Left
            break;
        //  Left
        case dirPos.i === 0 & -1 === dirPos.j:
            if (isDirBlock('colIdxStart') && !isDirBlock('bottomRowIdx')) dirPos.i = 1// Move Down
            else dirPos.j
            break;
        //  Down
        case dirPos.i === 1 === dirPos.j:
            if (isAlreadyDown) {
                if (!isDirBlock('colIdxEnd')) dirPos.i = 0 // Set right || Left
                else {
                    dirPos.i = 0
                    dirPos.j = -1
                }
            }
            else if (isDirBlock()) { // Blocked 
                if (isDirBlock('bottomRowIdx') && !isDirBlock('colIdxEnd')) { // Right || Left  
                    dirPos.i = 0
                    dirPos.j = 1
                }
                else {
                    dirPos.i = 0
                    dirPos.j = -1
                }
            }
            break;
        default:
            console.log('Nothing Change DirPos:', GAME.alien.dirPos)
            break;
    }
}

function isDirBlock(edgeDirStr) {
    const { board, alien } = GAME
    const { bottomRowIdx, colIdxStart, colIdxEnd } = alien

    const edgePoss = (/colIdxEnd/.test(edgeDirStr)) ? getEdgePos(colIdxEnd, 'j', 'colIdxEnd') // Right
        : (/colIdxStart/.test(edgeDirStr)) ? getEdgePos(colIdxStart, 'j', 'colIdxStart') // Left
            : getEdgePos(bottomRowIdx, 'i', 'bottomRowIdx') // Down
    console.log('edgePoss', edgePoss);
    const { i, j } = alien.dirPos
    return edgePoss.every(pos => board[pos.i + i][pos.j + j].gameEl === gameEls.empty)
}

function setAliensPos() {
    const { alien } = GAME
    const { liveAliens, dirPos } = alien
    const { i, j } = dirPos
    liveAliens.forEach(alien => {
        // console.log(`alien${alien.pos.i}-${alien.pos.j}`)
        alien.pos.i += i
        alien.pos.j += j
    })
    alien.topRowIdx += i
    alien.bottomRowIdx += i
    alien.colIdxStart += j
    alien.colIdxEnd += j
    // if I want to place 
}

function getEdgePos(EdgeNum, dirStr, edgeStr) {
    const { liveAliens } = GAME.alien
    const edgeAliens = liveAliens.filter(alien => alien.pos[dirStr] === EdgeNum)
    const edgePoss = []

    if (!edgeAliens || !edgeAliens.length) {
        if (/colIdxEnd/.test(edgeStr)) EdgeNum--
        else if (/colIdxStart/.test(edgeStr) || /bottomRowIdx/.test(edgeStr)) EdgeNum++
        else {
            console.log('Houston ... we have a problem!')
            return
        }
        getEdgePos(EdgeNum, dirStr, edgeStr)
        return
    }
    else edgeAliens.forEach(alien => edgePoss.push(alien.pos))
}

function cleanAlienCells(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd) {
    const { board } = GAME
    for (let i = topRowIdx; i <= bottomRowIdx; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            // console.log(`Clean Cell ${i}-${j}`);
            board[i][j] = { pos: { i, j } }
            renderCell({ i, j })
        }
    }
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