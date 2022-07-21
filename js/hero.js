'use strict'

const HERO = {}


function initHero() {
    console.log('initHero()↓');
    HERO.laserSpeed = 80
    HERO.isShoot = false
    HERO.className = CLASSES.hero
    HERO.pos = { i: 12, j: 5 }
    gBoard[12][5] = HERO

}
function createHero() {
    console.log('← createHero()')
    refreshElCellByPos(HERO.pos, getImgPath(OBJECTS.hero), CLASSES.sky)
}

function onKeyDown(ev) {
    console.log(ev.key)
    var nextLocation = {
        i: HERO.pos.i,
        j: HERO.pos.j,
    }
    switch (ev.key) {
        case 'ArrowUp':
            console.log('Moving Up↑')
            break
        case 'ArrowLeft':
            console.log('←Moving Left')
            moveHero({ i: HERO.pos.i, j: HERO.pos.j - 1 });
            break;
        case 'ArrowRight':
            console.log('moving Right→')
            moveHero({ i: HERO.pos.i, j: HERO.pos.j + 1 });
            break;
        case ' ':
            console.log('space Shootings')
            break;
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
    refreshElCellByPos(HERO.pos, OBJECTS.empty, CLASSES.sky)
    //Dom
    // * NextCell
    // model
    HERO.pos.i = dir.i
    HERO.pos.j = dir.j
    //Dom
    refreshElCellByPos(HERO.pos, getImgPath(OBJECTS.hero), CLASSES.sky)
}



// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {

}

// renders a LASER at specific cell for short time and removes it

function blinkLaser(pos) {
    //  putting laser
    updateCell(pos, getImgPath(OBJECTS.laser), CLASSES.sky)
    // removing 
    setTimeout(() => { updateCell(pos, OBJECTS.empty, CLASSES.sky) }, 200);
    //  putting agin
    setTimeout(() => { updateCell(pos, getImgPath(OBJECTS.laser), CLASSES.sky) }, 400);
    // removing agin
    setTimeout(() => { updateCell(pos, OBJECTS.empty, CLASSES.sky) }, 600);
    //  putting agin....why not
    setTimeout(() => { updateCell(pos, getImgPath(OBJECTS.laser), CLASSES.sky) }, 800);
    //  and removing agin
    setTimeout(() => { updateCell(pos, OBJECTS.empty, CLASSES.sky) }, 1000);
}


function getNextLocation(eventKeyboard) {
}