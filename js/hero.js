'use strict'
//*                                                                HERO
function initHero() {
    const { gameEls } = GAME
    const { board } = GAME
    GAME.hero = {
        pos: { i: 12, j: 5 },
        isShoot: false,
        laser: {
            pos: null,
            interval: null,
            speed: 300,
            travelCells: [],
        },
        rocket: {
            pos: null,
            interval: null,
            speed: 600,
            travelCells: [],
        },
    }
    board[12][5].gameEl = gameEls.hero
}

function onHeroEvent() {
    // if (!GAME.isOn) return
    const { hero } = GAME
    const { i, j } = hero.pos
    console.log('event.key:', event.key)
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

function shoot(pos, shootType) {
    if (!isOnBoard(pos)) {
        endShoot()
        return
    }

    shootType['interval'] = setInterval(() => {

        shootType['pos'] = !shootType['pos'] ? pos : shootType['pos']
        const { i, j } = shootType['pos']
        shootType['pos'][i]--
        const { board, gameEls } = GAME

        if (board[i][j].gameEl === gameEls.alien) alienHit(shootType['pos'])
        else if (board[i][j].gameEl) elementHit(shootType['pos'])
        else blinkCell(shootType['pos'], shootType['gameEl'])
    }, shootType['speed'])
}

function endShoot() {
    const { hero } = GAME
    const { laser } = hero
    hero.isShoot = false
    clearInterval(laser.interval)
    laser.interval = null
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