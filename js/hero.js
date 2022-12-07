'use strict'

function initHero(posI, posJ) {
    GAME.hero = {
        pos: { i: posI, j: posJ },
        isShoot: false,
        domEl: '<div class="hero" role="img"><img src="assets/img/hero.svg" alt="spaceShip"><div/>',
        laser: {
            pos: {},
            interval: null,
            speed: 250,
            domEl: '<div class="laser" role="img"><img src="assets/img/laser.png" alt="Laser Shoot"><div/>',
        },
        rocket: {
            pos: {},
            interval: null,
            speed: 1000,
        },
    }
    return GAME.hero
}

function onHeroEvent() {
    if (!GAME.isOn) return
    const { hero } = GAME
    const { i, j } = hero.pos

    switch (event.key) {
        case 'ArrowUp':
            if (hero.isShoot) return
            moveObj(i - 1, j, hero)
            break
        case 'ArrowLeft':
            moveObj(i, j - 1, hero)
            break
        case 'ArrowRight':
            moveObj(i, j + 1, hero)
            break
        case 'ArrowDown':
            moveObj(i + 1, j, hero)
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
    hero.isShoot = true

    const { speed ,pos} = shootType

    if (board[i][j].domEl) {
        endShoot(shootType.interval)
        return
    }

    pos.i = i
    pos.j = j

    // Closure Pitfall - only happen when creating functions within a loop || interval
    shootType.interval = setInterval(shootInterval, speed, shootType)
}

// Closure Pitfall SOLUTION using a named function:
function shootInterval(shootType) {
    const { pos, speed } = shootType

    const { i, j } = pos
    blinkCell(i, j, shootType.domEl, speed / 5)

    if (!isOnBoard(i, j )) {
        endShoot(shootType.interval)
        return
    }

    const { alien, board } = GAME
    if (board[i][j].domEl) {
        if (board[i][j].domEl === alien.domEl) alienHit(i, j, shootType)
        else blinkCell(i, j, domEls.explode, 780)
        endShoot(shootType)
        return
    }
    else pos.i--
}

function endShoot(shootType) {
    const { hero } = GAME
    hero.isShoot = false
    shootType.pos = {}
    clearInterval(shootType.interval)
    shootType.interval = null
}

function blinkCell(i, j, domEl, timeout = 30) {
    // Change only Dom 
    renderCell(i, j, domEl)
    // Update based model
    setTimeout(renderCell, timeout, i, j)
}

// Model & Dom
function updateCell(i, j, gameObj) {
    console.log(`updateCell(${i}, ${j}, ${gameObj})`);
    // if (!isOnBoard(i, j)) return
    const { board } = GAME
    const newCell = gameObj ? { ...gameObj, pos: { i, j } } : { pos: { i, j } }

    board[i][j] = newCell
    renderCell(i, j)
}

// Dom By Model || optional value 
function renderCell(i, j, val) {
    const { board } = GAME
    const cell = board[i][j]

    const { elCellMap } = GAME.domEls
    const elCell = elCellMap[i][j]

    if (!val) elCell.innerHTML = cell.domEl || ''
    else elCell.innerHTML = val
}