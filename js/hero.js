'use strict'
//*                                                                HERO
function initHero() {
    const { hero, gameEls } = GAME
    const { board } = GAME
    hero.pos = { i: 12, j: 5 }
    board[12][5].gameEl = gameEls.hero
    hero.isShoot = false
    hero.laserAudio = null
    hero.explodeAudio = null
    hero.laser = {
        pos: {}, // {}
        interval: null,
        speedInterval: 300,
        travelCells: [], // []
    }
}

function onHeroEvent() {
    // if (!GAME.isOn) return
    const { hero } = GAME
    const { i, j } = hero.pos
    switch (event.key) {
        case 'ArrowUp':
            moveHero({ i: +i - 1, j: +j })
            break
        case 'ArrowLeft':
            moveHero({ i: i, j: j - 1 })
            break
        case 'ArrowRight':
            moveHero({ i: i, j: j + 1 })
            break
        case 'ArrowDown':
            moveHero({ i: i + 1, j: j })
            break
        case ' ':
            if (hero.isShoot) return
            shoot({ i: i - 1, j })
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

function moveHero(pos) {
    if (!isOnBoard(pos)) return
    const { i, j } = pos
    const { hero, gameEls, board } = GAME
    if (board[i][j].gameEl) return
    // PrevCell
    updateCell(hero.pos)
    // NextCell
    hero.pos.i = i
    hero.pos.j = j
    updateCell(hero.pos, gameEls.hero)
}

function shoot(pos) {
    const { hero, board, gameEls } = GAME
    const { laser } = hero
    hero.isShoot = true
    laser.interval = setInterval(() => {
        let laserPos = pos
        laserPos.i--
        playAudio('laser')
        if (!isOnBoard(laserPos)) endShoot()
        const { i, j } = laserPos
        if (board[i][j].gameEl === gameEls.alien) alienHit(laserPos)
        else if (board[i][j].gameEl !== gameEls.alien && board[i][j].gameEl) elementHit(laserPos)
        else blinkCell(laserPos, gameEls.laser)
    }, 200)
}

function endShoot() {
    const { hero } = GAME
    const { laser } = hero
    hero.isShoot = false
    clearInterval(laser.interval)
    laser.interval = null
    return
}


function heroLunchScrollEffect() {
    const { elHero, elSky, elEx } = GAME.domEls
    const { scroller } = GAME

    let windowHeight = window.innerHeight
    let scrollerY = document.documentElement.scrollTop
    let docOffSetY = document.body.offsetHeight - 250
    let perc = scrollerY / (docOffSetY - windowHeight)

    // Bottom 
    if (perc < 1) elSky.style.bottom = -1 * (perc) * 100 + '%'
    // Set hero engine 
    if (perc > 0) {
        elHero.classList.add('shake_hero')
        elEx.classList.add('exhaust')
    } else {
        elHero.classList.remove('shake_hero')
        elEx.classList.remove('exhaust')
    }
    // Remove hero engine 
    if (perc > .37) elEx.classList.remove('exhaust')

    // Remove hero engine 
    if (perc > .25) scroller.bottom = (perc - .25) * 133

    if (perc > 0) {
        scroller.bottom = (perc - .25) * 133
        if (perc - .25 < 0) scroller.bottom = 0
    }
    elHero.style.bottom = scroller.bottom + '%'
    scroller.lastY = scrollerY

}