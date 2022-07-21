'use strict'

const HERO = {}
///////////////////////////////////////////////////////////////////////////////////////////////
function initHero() {
    console.log('initHero()↓');
    //* init HERO
    HERO.pos = { i: 12, j: 5 }
    //* init Shootings
    HERO.laserInterval = null // on shoot()
    HERO.laserPos = null // on shoot()
    HERO.laserSpeed = 300// 80
    HERO.isShoot = false // on shoot()
    HERO.startShottingAt = null // Date.now()

    // HERO.shootingPos = null // need it?

}
function createHero() {
    gBoard[HERO.pos.i][HERO.pos.j].gameObject = OBJECTS.hero
    updateCell(HERO.pos,OBJECTS.hero)
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
            console.log('←Moving Left')
            moveHero({ i: HERO.pos.i, j: HERO.pos.j - 1 })
            break
        case 'ArrowRight':
            console.log('moving Right→')
            moveHero({ i: HERO.pos.i, j: HERO.pos.j + 1 })
            break
        case ' ':
            console.log('laser Shootings')
            if (HERO.isShoot) return
            HERO.laserPos = { i: HERO.pos.i - 1, j: HERO.pos.j }
            shoot(OBJECTS.laser)
            break
        default:
            return null
    }
    return nextLocation
}
function moveHero(dir) {
    if (dir.j < 0 || dir.j > gBoard[0].length - 1) return
    else if (!GAME.isOn) return
    // *PrevCell
    // Model
    updateCell(HERO.pos, OBJECTS.empty,null,getImgPath(OBJECTS.empty))
    //Dom
    // * NextCell
    // model
    HERO.pos.i = dir.i
    HERO.pos.j = dir.j
    //Dom
    updateCell(HERO.pos, OBJECTS.hero,null,getImgPath(OBJECTS.hero), CLASSES.sky)
}
///////////////////////////////////////////////////////////////////////////////////////////////
function shoot(shottingType = OBJECTS.laser) {
    console.log(`shoot(${shottingType} = ${OBJECTS.laser}) :`)

    HERO.isShoot = true
    if (shottingType === OBJECTS.laser) {
        console.log('shooting laser')// 
        HERO.startShootingAt = Date.now()


        HERO.laserInterval = setInterval(() => {
            blinkLaser(HERO.laserPos)
            RaiseLaser();
        }, HERO.laserSpeed);

    }
    //* else if (missile === OBJECTS.rocket) console.log('shooting rocket')
}
function RaiseLaser() {
    var diff = Date.now() - HERO.startShootingAt

    if (diff / 1000 > 1) {
        console.log('diff:', diff)
        HERO.startShootingAt = HERO.startShootingAt - 1000
        HERO.laserPos.i = HERO.laserPos.i - 1
    }

}

function blinkLaser(pos) {
    console.log(`blinkLaser(${pos})`)
    // if (!HERO.laserInterval) return

    if (HERO.laserPos.i === 0) {
        endShoot()
        return
    }
    if (gBoard[pos.i][pos.j].gameObject === OBJECTS.alien) {
        handleAlienHit(pos)
        endShoot()
        return
    }
    updateCell(pos, OBJECTS.laser,null, `<img src="img/laser.png" />`)
    setTimeout(() => { updateCell(pos) }, 200)
    setTimeout(() => { updateCell(pos, OBJECTS.laser,null, `<img src="img/laser.png" />`) }, 300);
    setTimeout(() => { updateCell(pos) }, 500)
}
function endShoot() {
    clearInterval(HERO.laserInterval)
    HERO.laserInterval = null
    HERO.isShooting = false
}
///////////////////////////////////////////////////////////////////////////////////////////////