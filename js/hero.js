'use strict'

const HERO = {}
// { 
//     laserSpeed: 80,
//     pos: { i: 12, j: 5 },
//     isShoot: false
//     className: false
// }


function initHero() {
    console.log('initHero()↓');
    HERO.laserSpeed = 80
    HERO.isShoot = false
    HERO.className = CLASSES.hero
    HERO.pos = { i: 12, j: 5 }
    gBoard[12][5] = HERO

}
function createHero() {
    console.log('createHero(board)→')
    updateCell(HERO.pos, getImgPath(OBJECTS.hero))
    

}

// Handle game keys
function onKeyDown(ev) {
    console.log(ev.key)
    // var nextLocation = {
    //     i: gPacman.location.i,
    //     j: gPacman.location.j,
    // }
    // switch (eventKeyboard.code) {
    //     case 'ArrowUp':
    //         nextLocation.i--
    //         gPacman.dirClass = 'up'
    //         break
    //     case 'ArrowDown':
    //         nextLocation.i++
    //         gPacman.dirClass = 'down'
    //         break
    //     case 'ArrowLeft':
    //         nextLocation.j--
    //         gPacman.dirClass = 'left'
    //         break;
    //     case 'ArrowRight':
    //         nextLocation.j++
    //         gPacman.dirClass = 'right'
    //         break
    //     default:
    //         return null
    // }
    // return nextLocation

}

// Move the hero right (1) or left (-1)
function moveHero(dir) { }

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() { }

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) { }


function getNextLocation(eventKeyboard) {
}