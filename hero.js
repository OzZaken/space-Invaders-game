'use strict'

const HERO = {}
///////////////////////////////////////////////////////////////////////////////////////////////
function initHero() {
    // init HERO
    HERO.pos = { i: 12, j: 5 }
    HERO.isShoot = false
    HERO.laserAudio = null
    HERO.explodeAudio = null
    // init Shootings
    HERO.laser = {
        laserInterval: null,
        blinkingInterval: null,
        speed: 80,
        nextLaserPos: null, //{}
        pos: null, // {}
        poss: null, // []
        movingDiff: -1
    }
}
function createHero() {
    updateCell(HERO.pos, OBJECTS.hero)
}
///////////////////////////////////////////////////////////////////////////////////////////////
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
            if (gBoard[startShootingPos.i][startShootingPos.j].gameObject === OBJECTS.alien)
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
///////////////////////////////////////////////////////////////////////////////////////////////
function shoot(pos, shottingType = OBJECTS.laser) { // TODO: fix shooting when playerfirst line with other object !== empty
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
///////////////////////////////////////////////////////////////////////////////////////////////
function blinkLaser(pos) {
    if (gBoard[pos.i][pos.j].gameObject === OBJECTS.alien) {
        console.log('(gBoard[pos.i][pos.j].gameObject === OBJECTS.alien) ');
        endShoot()
    }
    else if (!pos.i || pos.i <= 0) {
        console.log('(!pos.i || pos.i <= 0) valid Move Function?');
        endShoot()
        return
    }
    else
        console.log('blinkLaser(pos) → HERO.laser.pos:', HERO.laser.pos)
        playAudio(OBJECTS.laser,HERO.laserAudio)
    var prevLaserPos = {
        i: HERO.laser.pos.i + 1,
        j: HERO.laser.pos.j
    }
    for (let i = 0; i < 2; i++) {
        blinkingCell(prevLaserPos)
    }

    if (gBoard[HERO.laser.pos.i][HERO.laser.pos.j].gameObject === OBJECTS.alien) {
        console.log('gBoard[HERO.laser.pos.i][HERO.laser.pos.j]:', gBoard[HERO.laser.pos.i][HERO.laser.pos.j])
        handleAlienHit(pos)
        return
    }
    HERO.laser.pos.i = HERO.laser.pos.i + HERO.laser.movingDiff
    return
}
function blinkingCell(pos, gameObject = OBJECTS.laser) {
    updateCell(pos, OBJECTS.laser)
    setTimeout(updateCell, HERO.laser.speed / 2, pos)
}
///////////////////////////////////////////////////////////////////////////////////////////////
function blowUpNeighbors(cellI, cellJ) {
    for (let i = cellI; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length) continue
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
        }
    }
}