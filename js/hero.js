'use strict'

const HERO = {}
///////////////////////////////////////////////////////////////////////////////////////////////
function initHero() {
    // init HERO
    HERO.pos = { i: 12, j: 5 }
    HERO.isShoot = false
    // init Shootings
    HERO.laserInterval = null
    HERO.laser = {
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
    var nextLocation = {
        i: HERO.pos.i,
        j: HERO.pos.j,
    }
    switch (eventKeyboard.key) {
        // case 'ArrowUp':
        //     console.log('Moving Up↑')
        //     break
        case 'ArrowLeft':
            moveHero({ i: HERO.pos.i, j: HERO.pos.j - 1 })
            break
        case 'ArrowRight':
            moveHero({ i: HERO.pos.i, j: HERO.pos.j + 1 })
            break
        case ' ':
            console.log('HERO.isShoot:', HERO.isShoot)
            if (HERO.isShoot) return
            shoot({ i: HERO.pos.i + HERO.laser.movingDiff, j: HERO.pos.j }, OBJECTS.laser)
            break
        case 'p':
            console.log('pause')
            GAME.isOn = true
            break
        default:
            return null
    }
    return nextLocation
}
function moveHero(dir) {
    if (dir.j < 0 || dir.j > gBoard[0].length - 1) return
    else if (!GAME.isOn) return
    // PrevCell
    updateCell(HERO.pos)
    // NextCell
    HERO.pos.i = dir.i
    HERO.pos.j = dir.j
    updateCell(HERO.pos, OBJECTS.hero)
}
///////////////////////////////////////////////////////////////////////////////////////////////
function shoot(pos, shottingType = OBJECTS.laser) {
    // console.log(`shoot(${shottingType} = ${OBJECTS.laser})`)

    HERO.isShoot = true
    HERO.laser.pos = { i: pos.i + HERO.laser.movingDiff, j: HERO.pos.j }

    // if (shottingType === OBJECTS.laser) {
    HERO.laserInterval = setInterval(blinkLaser, HERO.laser.speed, HERO.laser.pos)
    // }
    // else if (missile === OBJECTS.rocket) console.log('shooting rocket')
    return
}
function endShoot() {
    clearInterval(HERO.laserInterval)
    HERO.isShoot = false
    HERO.laserInterval = null
    renderBoard(gBoard)
}
function blinkLaser(pos) {
    if (gBoard[pos.i][pos.j].gameObject === OBJECTS.alien) {
        console.log('(gBoard[pos.i][pos.j].gameObject === OBJECTS.alien) ');
        endShoot()
    }
    if (!pos.i || pos.i <= 0) {
        console.log('(!pos.i || pos.i <= 0)');
        endShoot()
        return
    }
    else
        console.log('HERO.laser.pos:', HERO.laser.pos)
    var prevLaserPos = {
        i: HERO.laser.pos.i + 1,
        j: HERO.laser.pos.j
    }
    console.log('prevLaserPos:', prevLaserPos)
    console.log('gBoard[prevLaserPos.i][prevLaserPos.j].gameObject:', gBoard[prevLaserPos.i][prevLaserPos.j].gameObject)
    console.log('gBoard[HERO.laser.pos.i][HERO.laser.pos.j].gameObject:', gBoard[HERO.laser.pos.i][HERO.laser.pos.j].gameObject)
for (let i = 0; i < 2; i++) {
    blinkingCell(prevLaserPos)
    blinkingCell(HERO.laser.pos)
}

    if (gBoard[HERO.laser.pos.i][HERO.laser.pos.j].gameObject === OBJECTS.alien) {
        console.log('gBoard[HERO.laser.pos.i][HERO.laser.pos.j]:', gBoard[HERO.laser.pos.i][HERO.laser.pos.j])
        handleAlienHit(pos)
        return
    }
    HERO.laser.pos.i = HERO.laser.pos.i + HERO.laser.movingDiff
    return
}
function blinkingCell(pos) {
    renderCell(pos, OBJECTS.laser)
    setTimeout(renderCell, HERO.laser.speed / 2, pos) 
}