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
        laserInterval: null,
        blinkingInterval: null,
        speed: 80,
        nextLaserPos: {},
        pos: {}, // {}
        possPast: [], // []
        movingDiff: 1
    }
}

function onMoveHero() {
    // if (!GAME.isOn) return
            const { hero } = GAME
    const { i, j } = hero
console.log('event.type.key:', event)
    switch (event.key) {
        case 'ArrowUp':
            console.log('ArrowUp:')
            moveHero({ i: i - 1, j: j })
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
            if (gBoard[startShootingPos.i][startShootingPos.j].gameEl === OBJECTS.alien)
                shoot({ i: hero.pos.i, j: hero.pos.j }, OBJECTS.laser)
            else
                shoot({ i: hero.pos.i + hero.laser.movingDiff, j: hero.pos.j }, OBJECTS.laser)
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

function moveHero(dirPos) {
    if (!isValidMove(dirPos)) return
    const { i, j } = dirPos
    const { hero, gameEls } = GAME
    // PrevCell
    updateCell(hero.pos)
    // NextCell
    hero.pos.i = i
    hero.pos.j = j
    updateCell(hero.pos, gameEls.hero)
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