'use strict'

const GAME = {
    isOn: null,
    board: [],
    audio: {},
    boardMap: {
        size: null,
        aliensRowLength: null,
        aliensRowCount: null
    },
    gameEls: {
        hero: `<div id='hero' class="on-board"></div>`,
        alien: `<div class="space-invader space-invader-1 animate"></div>`,
        empty: `<div class="empty-space"></div>`,
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
    hero: {
        pos: {}
    },
    domEls: {
        elHeading: null,
        elBoard: null,
        elHero: null,
    },
}

    //*                                                               Initiation
    ; (() => {
        document.body.style.zoom = "90%";
        const { domEls } = GAME
        domEls.elBoard = document.querySelector('.board')
        domEls.elHeading = document.querySelector('.heading')
        domEls.elHero = document.querySelector('#hero')
        domEls.elSky = document.querySelector('#sky')
        domEls.elEx = document.querySelector('#exhaust')
        domEls.elBGSpace = document.querySelectorAll('#bg-space')
        domEls.elMusic = document.querySelector('.music')
        // gDomEls.elLife = document.querySelector('.life')
        // gDomEls.elScore = document.querySelector('.score')
        // gDomEls.elTime = document.querySelector('.time')
        // gDomEls.elUserMsg = document.querySelector('.user-msg')
    })()

function initGame() {
    console.log('initGame')
    // Model
    GAME.score = 0
    GAME.isOn = false
    GAME.aliensCount = 0
    GAME.isOn = true

    // Board
    const { boardMap } = GAME
    boardMap.size = 14
    boardMap.aliensRowLength = 8
    boardMap.aliensRowCount = 3
    GAME.board = buildBoard()
    const { domEls } = GAME

    // Hero
    initHero()

    // Aliens
    initAlien()
    const { topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd } = GAME.alienMap
    createAliens(topRowIdx, bottomRowIdx, colIdxStart, colIdxEnd)
    renderBoard()
    setTimeout(() => {
        domEls.elCells = [...document.querySelectorAll('.cell')]
    })
    // Intervals
    // GAME.satelliteSpaceInterval = setInterval(addObject, 15000, OBJECTS.satelliteSpaceInterval)
    // toggleAliensInt()

    // Game
    // elHeading.hidden = true
    // elHeading.style.display = 'none'

}

//*                                                                   Board
function buildBoard() {
    const { size } = GAME.boardMap
    const { gameEls } = GAME
    let board = []
    for (let i = 0; i < size; i++) {
        board.push([])
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                pos: { i, j },
                gameEl: gameEls.empty
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
    const { board, gameEls } = GAME
    const { elBoard } = GAME.domEls
    let strHTML = ''
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (let j = 0; j < board[0].length; j++) {
            const curCell = board[i][j]
            const curCellGameEl = curCell.isHit ? gameEls.empty : curCell.gameEl
            strHTML += `\t<td class="cell" data-i="${i}" data-j="${j}">${curCellGameEl}</td>`
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML
}

//*                                                                   Cell
function createCell(pos, gameEl = GAME.gameEls.empty) {
    const { i, j } = pos
    return {
        pos: { i, j },
        gameEl
    }
}

function renderCell(pos) {
    const { i, j } = pos
    const { elCells } = GAME.domEls
    const { board } = GAME
    const curCell = elCells.find((elCell) => elCell.dataset.i === i && elCell.dataset.j === j)
    curCell.innerHTML = board[i][j].gameEl
}

function updateCell(pos, gameEl = GAME.gameEls.empty) {
    const { i, j } = pos
    const { board } = GAME
    // Model
    board[i][j].gameEl = gameEl
    //  Dom
    renderCell(pos)
}

//*                                                                 Score
function renderScore(diff) {
    GAME.score += diff
    const { elScore } = GAME.domEls
    elScore.innerText = GAME.score
}



//*                                                                Scroller
// var scroller = setInterval(()=> {  
//     window.scrollTo(0,document.body.scrollHeight)
// }, 10) // update every 10 ms, change at will

// $(window).on('scroll', function() {
//     if($(window).scrollTop() >= $('.div').offset().top + $('.div').outerHeight() - window.innerHeight) {
//       alert('Bottom');
//     }
//   });


///////////////////////////////////////////////////////////////////////////////////////////////

function isValidMove(pos) {
    const { i, j } = pos
    const { board, gameEls } = GAME
    if (!GAME.isOn) return
    else if (j < 0 || j > board[0].length - 1) return
    return true
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