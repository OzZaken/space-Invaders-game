'use strict'

function initHero(posI, posJ) {
    GAME.hero = {
        pos: { i: posI, j: posJ },
        isShoot: false,
        shootInterval: null,
        gameEl: '<div class="hero" role="img"><img src="assets/img/hero.svg" alt="spaceShip"><div/>',
        laser: {
            pos: {},
            speed: 250,
            gameEl: '<div class="laser" role="img"><img src="assets/img/laser.png" alt="Laser Shoot"><div/>',
        },
        rocket: {
            pos: {},
            speed: 1000,
        },
    }
    return GAME.hero
}

// Hero move, Shoot,Pause,
function onHandleEvent() {
    if (!GAME.isOn) return
    const { hero } = GAME
    const { i, j } = hero.pos

    switch (event.key) {
        case 'ArrowUp':
            if (hero.isShoot) return
            moveHero(i - 1, j, hero)
            break
        case 'ArrowLeft':
            moveHero(i, j - 1, hero)
            break
        case 'ArrowRight':
            moveHero(i, j + 1, hero)
            break
        case 'ArrowDown':
            moveHero(i + 1, j, hero)
            break
        case ' ':
            if (hero.isShoot) return
            shoot(i - 1, j, hero.laser)
            playAudio('laser')
            break
        case 'Enter':
            if (hero.isShoot) return
            shoot(i - 1, j, hero.rocket)
            playAudio('rocket')
            break
        case 'p':
            console.log('pause')
            toggleAliensInt()
            onPause()
            break
        default:
            return
    }
}

function shoot(i, j, shootType) {
    const { board, hero } = GAME
    const { speed, pos } = shootType

    hero.isShoot = true

    if (board[i][j].gameEl) {
        endShoot()
        return
    }

    pos.i = i
    pos.j = j

    // Closure Pitfall - only happen when creating functions within a loop || interval
    hero.shootInterval = setInterval(shootInterval, speed, shootType)
}

// Closure Pitfall SOLUTION using a named function:
function shootInterval(shootType) {
    const { pos, speed } = shootType
    const { i, j } = pos

    if (!isOnBoard(i, j)) {
        endShoot()
        return
    }

    blinkCell(i, j, shootType.gameEl, speed / 5)

    const { alien, board } = GAME
    if (board[i][j].gameEl) {
        if (board[i][j].gameEl === alien.gameEl) alienHit(i, j, shootType)
        else blinkCell(i, j, gameEls.explode, 780)
        endShoot()
        return
    }
    else pos.i--
}

function endShoot() {
    const { hero } = GAME
    hero.isShoot = false
    clearInterval(hero.shootInterval)
    hero.interval = null
}