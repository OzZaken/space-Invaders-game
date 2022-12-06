'use strict'

function initHero(posI, posJ) {
    GAME.hero = {
        pos: { i: posI, j: posJ },
        isShoot: false,
        gameEl: '<div class="hero" role="img"><img src="assets/img/hero.svg" alt="spaceShip"><div/>',
        laser: {
            pos: null,
            interval: null,
            speed: 250,
            gameEl: '<div class="laser" role="img"><img src="assets/img/laser.png" alt="Laser Shoot"><div/>',
        },
        rocket: {
            pos: null,
            interval: null,
            speed: 1000,
        },
    }
    return GAME.hero
}

function onHeroEvent() {
    // if (!GAME.isOn) return
    const { hero } = GAME
    const { i, j } = hero.pos
    switch (event.key) {
        case 'ArrowUp':
            if (hero.isShoot) return
            moveObj({ i: +i - 1, j: +j }, hero)
            break
        case 'ArrowLeft':
            moveObj({ i: i, j: j - 1 }, hero)
            break
        case 'ArrowRight':
            moveObj({ i: i, j: j + 1 }, hero)
            break
        case 'ArrowDown':
            moveObj({ i: i + 1, j: j }, hero)
            break
        case ' ':
            if (hero.isShoot) return
            hero.isShoot = true
            shoot({ i: i - 1, j }, hero.laser)
            playAudio('laser')
            break
        case 'Enter':
            if (hero.isShoot) return
            hero.isShoot = true
            shoot({ i: i - 1, j }, hero.rocket)
            playAudio('rocket')
            break
        case 'p':
            console.log('pause')
            toggleAliensInt()
            endShoot()
            break
        default:
            return
    }
}

function shoot(pos, shootType) {

    const { board } = GAME
    const { i, j } = pos
    if (board[i][j].gameEl) {
        endShoot()
        return
    }

    const { hero } = GAME
    shootType.pos = pos
    // Closure Pitfall - only happen when creating functions within a loop || interval
    const { speed } = shootType
    // SOLUTION using a named function:
    hero.shootInterval = setInterval(shootTravel, speed, shootType)
}

function shootTravel(shootType) {
    const { pos, speed } = shootType
    const { i, j } = pos
    const { alien, board } = GAME

    if (!isOnBoard(pos)) {
        console.log('!isOnBoard(shootType.pos)):', !isOnBoard(pos))
        endShoot()
        return
    }

    else if (board[i][j].gameEl === alien.gameEl) {
        alienHit(pos, shootType)
        endShoot()
        return
    }

    else if (board[i][j].gameEl) {
        elementHit(pos, shootType)
        endShoot()
        return
    }

    if (!board[i][j].gameEl) {
        pos.i--
        blinkCell(pos, shootType, speed / 4)
    }
}
function elementHit(pos) {
    const { i, j } = pos
    const { board, gameEls } = GAME
    const cell = board[i][j]
    cell = { pos: i, j }
    blinkCell(pos, gameEls.explode, 780)
}

function endShoot() {
    const { hero } = GAME
    hero.isShoot = false
    clearInterval(hero.shootInterval)
    hero.shootInterval = null
    return
}