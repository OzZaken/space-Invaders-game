'use strict'

const GAME = {
    isOn: null,
    board: [],
    boardMap: {
        size: null,
        aliensRowLength: null,
        aliensRowCount: null
    },
    gameEls: {
        hero: '✈',
        alien: '👽',
        explode: '💥',
        floor: '🚩',
        laser: ':',
        moon: '🌒',
        rocket: '🚀',
        satellite: '🛰'

    },
    alienMap: {
        dirPos: null, // | {1,0} left | {0,1} right | {1 ,1} down | {-1 ,-1} up
        aliensCount: null,
        movementInterval: null,
        aliens: null,
        idx: null,
        movementSpeed: null,
        topRowIdx: null,
        bottomRowIdx: null,
    },
    heroMap: {
        pos: {}
    },
    domEls: {
        elHeading: null,
        elBoard: null,
    },

}

    // An IIFE Call the Constant Dom Elements at loading page. 
    ; (() => {
        const { domEls } = GAME
        domEls.elBoard = document.querySelector('.board')
        domEls.elHeading = document.querySelector('.heading')
        // gDomEls.elLife = document.querySelector('.life')
        // gDomEls.elScore = document.querySelector('.score')
        // gDomEls.elTime = document.querySelector('.time')
        // gDomEls.elUserMsg = document.querySelector('.user-msg')
    })()

function initGame() {
    // Model
    GAME.score = 0
    GAME.isOn = false
    GAME.aliensCount = 0
    GAME.boardMap.size = 14
    GAME.boardMap.aliensRowLength = 8
    GAME.boardMap.aliensRowCount = 3
    GAME.board = buildBoard()
    initHero()
    initAliens()
    const { domEls } = GAME
    console.log('GAME:', GAME)
    domEls.elCells = document.querySelectorAll('.cell')

    // Aliens
    const { alienMap } = GAME
    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = alienMap
    alienMap.aliens = []
    createAliens(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd)

    // Intervals
    // GAME.satelliteSpaceInterval = setInterval(addObject, 15000, OBJECTS.satelliteSpaceInterval)
    // toggleAliensInt()

    // Game
    GAME.isOn = true
    const { elHeading } = GAME.domEls
    setTimeout(() => {
        // elHeading.hidden = true
        elHeading.style.display = 'none'
        renderBoard()
    }, 3000)
}
//*                                                         Board
function buildBoard() {
    const { size } = GAME.boardMap
    let board = []
    for (let i = 0; i < size; i++) {
        board.push([])
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                pos: { i, j },
                gameEl: ''
            }
        }
    }
    // board[0][GAME.boardMap.size - 1].gameEl = OBJECTS.moon
    // board[7][1].gameEl = OBJECTS.satelliteSpace
    // for (let i = 0; i < size; i++) {
    //     board[size - 1][i].gameEl = OBJECTS.floor
    // }
    return board
}

function renderBoard() {
    const { board } = GAME
    const { elBoard } = GAME.domEls
    let strHTML = ''
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (let j = 0; j < board[0].length; j++) {
            const curCell = board[i][j]
            const curCellVal = curCell.isHit ? ' ' : curCell.gameEl
            strHTML += `\t<td data-i="${i}" data-j="${j}">${curCellVal}</td>`
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML
}

//*                                                         Cell
function createCell(pos, gameEl = '') {
    const { i, j } = pos
    return {
        pos: { i, j },
        gameEl
    }
}
//*                                                         Aliens
function createAliens(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    console.log('createAliens:')
    const { board, gameEls, alienMap } = GAME
    const { aliens } = alienMap
    for (let i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            const newAlien = board[i][j]
            newAlien.gameEl = gameEls.alien
            newAlien.isHit = false
            newAlien.pos = { i, j }
            aliens.push(newAlien)
            GAME.aliensCount++
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////
function renderCell(pos) {
    var elCell = getElCell(pos)

    return
}
function updateCell(pos, gameEl = '') {
    const { i, j } = pos
    const { board } = GAME
    // Model
    board[i][j].gameEl = gameEl
    //  Dom
    renderCell(pos)
}
function renderScore(diff) {
    GAME.score += diff
    document.querySelector('.game-container span.score').innerText = GAME.score
}
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
            if (gBoard[i][j].gameEl === OBJECTS.empty) {
                emptyCells.push({ i, j })
            }
        }
    }
    if (emptyCells.length === 0) return -1
    return emptyCells.splice(getRandomIntInclusive(0, emptyCells.length - 1), 1)[0]
}
function moveObjects(fromPossA, toPossB) { // TODO
    for (let i = 0; i < fromPossA.length; i++) {


    }
    return
}
function moveObject(gameEl, fromPosA, toPosB) { // TODO.
    // PrevCell

    updateCell(fromPosA)
    // NextCell
    updateCell(toPosB, gameEl)
}
function playAgin() {
    document.querySelector('.modal').classList.add('display-none')
    init()
    initGame()
}
function toggleAliensInt() {
    if (ALIENS.movementInterval) {
        document.querySelector('button.unit-testing').innerText = 'Continue'
        clearInterval(ALIENS.movementInterval)
        ALIENS.movementInterval = null
    }
    else {
        document.querySelector('button.unit-testing').innerText = 'Pause'
        ALIENS.movementInterval = setInterval(moveAliens, 2000)
    }
    return
}
function isValidMove(pos) {
    if (!GAME.isOn) return false
    else if (pos.j < 0 || pos.j > gBoard[0].length - 1) return false
    else if (gBoard[pos.i][pos.j].gameEl !== OBJECTS.empty) return false
    return true
}

function initHero() {  //^                       HERO
    const { heroMap: hero, gameEls } = GAME

    hero.pos = { i: 12, j: 5 }
    hero.isShoot = false
    hero.laserAudio = null
    hero.explodeAudio = null
    hero.gameEl = gameEls.hero
    hero.laser = {
        laserInterval: null,
        blinkingInterval: null,
        speed: 80,
        nextLaserPos: {},
        pos: {}, // {}
        possPast: [], // []
        movingDiff: 1
    }
}

function getNextLocation(eventKeyboard) {
    console.log(eventKeyboard.key)
    if (!GAME.isOn) return
    var startShootingPos = {
        i: HERO.pos.i,
        j: HERO.pos.j,
    }
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            moveHero({ i: HERO.pos.i - 1, j: HERO.pos.j })
            break
        case 'ArrowLeft':
            moveHero({ i: HERO.pos.i, j: HERO.pos.j - 1 })
            break
        case 'ArrowRight':
            moveHero({ i: HERO.pos.i, j: HERO.pos.j + 1 })
            break
        case 'ArrowDown':
            moveHero({ i: HERO.pos.i + 1, j: HERO.pos.j })
            break
        case ' ':
            console.log('HERO.isShoot:', HERO.isShoot)
            if (HERO.isShoot) return
            if (gBoard[startShootingPos.i][startShootingPos.j].gameEl === OBJECTS.alien)
                shoot({ i: HERO.pos.i, j: HERO.pos.j }, OBJECTS.laser)
            else
                shoot({ i: HERO.pos.i + HERO.laser.movingDiff, j: HERO.pos.j }, OBJECTS.laser)
            break
        case 'p':
            console.log('pause')
            toggleAliensInt()
            endShoot()
            break
        default:
            return null
    }
    return startShootingPos
}
function moveHero(dir) {
    if (!isValidMove(dir)) return
    // PrevCell
    updateCell(HERO.pos)
    // NextCell
    HERO.pos.i = dir.i
    HERO.pos.j = dir.j
    updateCell(HERO.pos, OBJECTS.hero)
}
function shoot(pos, shottingType = OBJECTS.laser) {
    // console.log(`shoot(${shottingType} = ${OBJECTS.laser})`)

    HERO.isShoot = true
    HERO.laser.pos = { i: pos.i + HERO.laser.movingDiff, j: HERO.pos.j }

    // if (shottingType === OBJECTS.laser) {
    HERO.laser.laserInterval = setInterval(blinkLaser, HERO.laser.speed, HERO.laser.pos)
    // }
    // else if (missile === OBJECTS.rocket) console.log('shooting rocket')
    return
}
function endShoot() {
    clearInterval(HERO.laser.laserInterval)
    HERO.laser.laserInterval = null
    HERO.isShoot = false
    renderBoard() //TODO Check All cell in place
}
function blinkLaser(pos) {
    if (gBoard[pos.i][pos.j].gameEl === OBJECTS.alien) {
        console.log('(gBoard[pos.i][pos.j].gameEl === OBJECTS.alien) ');
        endShoot()
    }
    else if (!pos.i || pos.i <= 0) {
        console.log('(!pos.i || pos.i <= 0) valid Move Function?');
        endShoot()
        return
    }
    else
        console.log('blinkLaser(pos) → HERO.laser.pos:', HERO.laser.pos)
    playAudio(OBJECTS.laser, HERO.laserAudio)
    var prevLaserPos = {
        i: HERO.laser.pos.i + 1,
        j: HERO.laser.pos.j
    }
    for (let i = 0; i < 2; i++) {
        blinkingCell(prevLaserPos)
    }

    if (gBoard[HERO.laser.pos.i][HERO.laser.pos.j].gameEl === OBJECTS.alien) {
        console.log('gBoard[HERO.laser.pos.i][HERO.laser.pos.j]:', gBoard[HERO.laser.pos.i][HERO.laser.pos.j])
        handleAlienHit(pos)
        return
    }
    HERO.laser.pos.i = HERO.laser.pos.i + HERO.laser.movingDiff
    return
}
function blinkingCell(pos, gameEl = OBJECTS.laser) {
    updateCell(pos, OBJECTS.laser)
    setTimeout(updateCell, HERO.laser.speed / 2, pos)
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
function initAliens() {
    // ALIENS.movementSpeed = 1000
    const { alienMap: alien } = GAME

    alien.aliens = []
    alien.dirPos = { i: 0, j: 1 }
    alien.isFreeze = false

    alien.topRowIdx = 1
    alien.bottomRowIdx = 3
    alien.colIdxStart = 3
    alien.colIdxEnd = 10
}



// function createAliens(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
//     let newAliens = []
//     const { gameEls ,alienMap} = GAME
//     const { alien } = gameEls
//     for (let i = rowIdxStart; i <= rowIdxEnd; i++) {
//         for (let j = colIdxStart; j <= colIdxEnd; j++) {
//             newAliens.push({
//                 gameEl: alien,
//                 id: ALIENS.idx++,
//                 isHit: false,
//                 currPos: { i, j },
//             })

//             GAME.aliensCount++
//         }
//     }
//     return newAliens
// }



function handleAlienHit(pos) {
    console.log(`handleAlienHit(${pos.i},${pos.j})`)
    //Alien
    gBoard[HERO.laser.pos.i][HERO.laser.pos.j].isHit = true
    console.log('gBoard[HERO.laser.pos.i][HERO.laser.pos.j]:', gBoard[HERO.laser.pos.i][HERO.laser.pos.j])
    console.log('ALIEN.aliens:', ALIENS.aliens)
    console.log('gBoard:', gBoard)
    //Dom
    updateCell(pos, OBJECTS.explode)
    playAudio(OBJECTS.explode, HERO.explodeAudio)
    setTimeout(updateCell, 800, pos)
    // GAME
    GAME.aliensCount--
    if (GAME.aliensCount === 0) {
        GAME.isOn = false
        document.querySelector('.modal').classList.remove('display-none')
    }
    renderScore(10)
    // HERO
    endShoot()
    return
}

function getLiveAliensPoss() {
    var liveAliensPoss = []
    for (let i = 0; i < ALIENS.aliens.length; i++) {
        var currAlien = ALIENS.aliens[i]
        if (!currAlien.isHit) liveAliensPoss.push(currAlien.currPos)
    }
    return liveAliensPoss
}

function getAliensEdges(liveAliens) {
    console.log('getRelevantAliensEdges()');
    var relevantAliensPoss = []
    if (ALIENS.dirPos.i === 0 && 1 === ALIENS.dirPos.j) { //* → Right   
        console.log(' Dir → Right');
        var biggestJ = 0
        for (let i = 0; i < liveAliens.length; i++) {
            // console.log(`liveAliens[${i}].j: ${liveAliens[i].j}`);
            if (liveAliens[i].j > biggestJ) {
                biggestJ = liveAliens[i].j
            }
        }
        for (let i = 0; i < liveAliens.length; i++) { //TODO: make in the first loop
            if (liveAliens[i].j === biggestJ) {
                relevantAliensPoss.push(liveAliens[i])
            }
        }
        return relevantAliensPoss
    }
    //TODO:
    // else if (ALIENS.dirPos.i === 1 && ALIENS.dirPos.j === 1) {// * ↓ Down
    //     console.log(' Dir ↑ Up');
    // }
    // else if (ALIENS.dirPos.i === 1 && ALIENS.dirPos.j === 1) {// * //* ← Left 
    //     console.log(' Dir ↑ Up');
    // }
    // else if (ALIENS.dirPos.i === -1 && ALIENS.dirPos.j === -1) {// * ↑ Up
    //     console.log(' Dir ↑ Up');
    // }
    return relevantAliensPoss
}

function moveAliens() {
    if (ALIENS.dirPos.i === 1 && ALIENS.dirPos.j === 1) changeAliensDir()
    console.log(`moveAliensInterval(${ALIENS.dirPos.i},${ALIENS.dirPos.j})`)

    var liveAliensPoss = getLiveAliensPoss()
    var relevantAliensPos = getAliensEdges(liveAliensPoss) // Get only the relevant for the checking
    var currAliensPoss = []
    var nextAliensPoss = []

    console.log('liveAliensPoss:', liveAliensPoss)
    console.log('relevantAliens', relevantAliensPos);

    for (let i = 0; i < relevantAliensPos.length; i++) {
        var currAlienPoss = relevantAliensPos[i]
        var hisNextPos = { i: currAlienPoss.i + ALIENS.dirPos.i, j: currAlienPoss.j + ALIENS.dirPos.j }
        var hisNextCell = gBoard[currAlienPoss.i + ALIENS.dirPos.i][currAlienPoss.j + ALIENS.dirPos.j]

        console.log(`currAlienPoss,${currAlienPoss},hisNextPos${hisNextPos}`)
        // console.log('Valid Move:', hisNextCell.gameEl === OBJECTS.empty);
        //! Saved If All valid Move
        currAliensPoss.push(currAlienPoss)//! posA[i]
        //!                                       ↨
        nextAliensPoss.push(hisNextPos)//!   posB[i]
    }

    for (let i = 0; i < hisNextPos.length; i++) {
        const element = array[i];

    }
    console.log(`\tThey can Move!\nMoving Every life aliens(${liveAliensPoss.length})`)
    cleanBoard(
        ALIENS.topRowIdx,
        ALIENS.bottomRowIdx,
        ALIENS.colIdxStart,
        ALIENS.colIdxEnd
    )
    //! Change model
    for (let i = 0; i < ALIENS.aliens.length; i++) {
        var currAlien = ALIENS.aliens[i]
        ALIENS.aliens[i].currPos.i += ALIENS.dirPos.i
        ALIENS.aliens[i].currPos.j += ALIENS.dirPos.j
    }
    placeAliens(
        ALIENS.topRowIdx + ALIENS.dirPos.i,
        ALIENS.bottomRowIdx + ALIENS.dirPos.i,
        ALIENS.colIdxStart + ALIENS.dirPos.j,
        ALIENS.colIdxEnd + ALIENS.dirPos.j)
    return
}

function changeAliensDir() {
    if (ALIENS.dirPos.i === 0 && 1 === ALIENS.dirPos.j || // → Right
        ALIENS.dirPos.i === -1 && 0 === ALIENS.dirPos.j) { // ← Left
        ALIENS.dirPos = { i: 1, j: 1 } // ↓ Down
    }
    else if (ALIENS.dirPos.i === 1 && 1 === ALIENS.dirPos.j) { // ↓ Down
        var aliensEdges = getAliensEdges(getLiveAliensPoss())[0]
        if (aliensEdges.j === gBoard[0].length - 1) ALIENS.dirPos = { i: 1, j: 1 } // ← Left
        elseALIENS.dirPos = { i: 1, j: 1 } // → Right
    }
    // if (ALIENS.dirPos.i === -1 && -1 === ALIENS.dirPos.j) { // Up }
    return
}

function cleanBoard(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    console.log(`cleanBoard(${rowIdxStart}, ${rowIdxEnd}, ${colIdxStart}, ${colIdxEnd})`);
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            gBoard[i][j] = createCell({ i, j })
        }
    }
    renderBoard()
    return
}