'use strict'

const ALIENS = {
    movementInterval: null,
    dirPos: null, //{1,0}left.. {0,1}right..{1 ,1}downRight..
    aliens: null,//[{}{pos,isHit}]
    idx: null,
    movementSpeed: null, // 500
    topRowIdx: null, // 1
    bottomRowIdx: null, // 3 
    isFreeze: null, // 
}
function initAliens() {
    console.log('initAliens():↓')
    ALIENS.aliens = [] // [{}{..]
    ALIENS.aliens = null
    // ALIENS.movementSpeed = 1000
    ALIENS.dirPos = { i: 0, j: 1 }
    ALIENS.isFreeze = false
    //!!!!                  :for placeAliens
    ALIENS.idx = 0 //?
    ALIENS.topRowIdx = 1
    ALIENS.bottomRowIdx = 3
    ALIENS.colIdxStart = 3
    ALIENS.colIdxEnd = 10
}
function createAliens(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    var newAliens = []
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            newAliens.push({
                gameObject: OBJECTS.alien,
                id: ALIENS.idx++,
                isHit: false,
                currPos: { i, j },
            })

            GAME.aliensCount++
        }
    }
    return newAliens
}
///////////////////////////////////////////////////////////////////////////////////////////////
function placeAliens(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    console.log(`placeAliensOnBoard(${rowIdxStart}, ${rowIdxEnd}, ${colIdxStart}, ${colIdxEnd})`);
    var alienIdx = 0
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            // console.log(' ALIENS.aliens[alienIdx]:', ALIENS.aliens[alienIdx])
            gBoard[i][j] = ALIENS.aliens[alienIdx].isHit ? updateCell({ i, j }) : ALIENS.aliens[alienIdx]
            alienIdx++
        }
    }
    renderBoard()
    return
}
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
///////////////////////////////////////////////////////////////////////////////////////////////
// last 
function moveAliensInterval() {
    console.log(`moveAliensInterval(${ALIENS.dirPos.i},${ALIENS.dirPos.j})`)

    var liveAliensPoss = getLiveAliensPoss()// Get only those alive
    var relevantAliens = getAliensEdges(liveAliensPoss)// Get only the relevant for the checking
    // var currAliensPoss = [] // possA
    // var nextAliensPoss = [] // possB

    console.log('liveAliensPoss:', liveAliensPoss)
    console.log('relevantAliens', relevantAliens);

    for (let i = 0; i < relevantAliens.length; i++) {
        var currAlienPoss = relevantAliens[i]
        var hisNextPos = { i: currAlienPoss.i + ALIENS.dirPos.i, j: currAlienPoss.j + ALIENS.dirPos.j }
        var hisNextCell = gBoard[currAlienPoss.i + ALIENS.dirPos.i][currAlienPoss.j + ALIENS.dirPos.j]

        console.log('currAlienPoss:', currAlienPoss)
        console.log('hisNextPos:', hisNextPos)
        console.log('Valid Move:', hisNextCell.gameObject === OBJECTS.empty);
        // Saved If All valid Move
        // currAliensPoss.push(currAlienPoss)//* posA[i]
        //*                                   ↨
        // nextAliensPoss.push(hisNextPos)//*   posB[i]
        if (!isValidMove({ i: hisNextCell.pos.i, j: hisNextCell.pos.j })) {
            console.log('nextCell : ', { i: hisNextCell.pos.i, j: hisNextCell.pos.j });
            console.log(gBoard[currAlienPoss.i][currAlienPoss.j]);
            console.log('cant move!');
            changeAlienDir()
            return //TODO: no valid Move → Change ALIENS.dirPos  
        }
    }
    console.log(`\tThey can Move!\nMoving Every life aliens(${liveAliensPoss.length})`);
    placeAliens()

    ALIENS.topRowIdx += ALIENS.dirPos.i
    ALIENS.bottomRowIdx += ALIENS.dirPos.i
    ALIENS.colIdxStart += ALIENS.dirPos.j
    ALIENS.colIdxEnd += ALIENS.dirPos.j
    
    
    // moveAliens(liveAliensPoss) //TODO: place instead!!!
    return
}
function moveAliens(liveAliens) {
    
    // var alienPoss = []// posA
    // var nextAliensPoss = []// posB
    // for (let i = 0; i < liveAliens.length; i++) {
    //     var currAlienPoss = liveAliens[i]
    //     var hisNextPos = { i: currAlienPoss.i + ALIENS.dirPos.i, j: currAlienPoss.j + ALIENS.dirPos.j }
    //     alienPoss.push(currAlienPoss)
    //     nextAliensPoss.push(hisNextPos)
    // }
    // moveObjects(alienPoss, nextAliensPoss)
    return
}
///////////////////////////////////////////////////////////////////////////////////////////////
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
    // else if (ALIENS.dirPos.i === -1 && ALIENS.dirPos.j === -1) {// * ↑ Up
    //     console.log(' Dir ↑ Up');
    // }
    // else if (ALIENS.dirPos.i === 1 && ALIENS.dirPos.j === 1) {// * ↓ Down
    //     console.log(' Dir ↑ Up');
    // }
    // else if (ALIENS.dirPos.i === 1 && ALIENS.dirPos.j === 1) {// * //* ← Left 
    //     console.log(' Dir ↑ Up');
    // }
    return relevantAliensPoss
}
///////////////////////////////////////////////////////////////////////////////////////////////
function changeAlienDir() { //* Last
    if (ALIENS.dirPos.i === 0 && ALIENS.dirPos.j === 1) {
        console.log('right');
    }
}