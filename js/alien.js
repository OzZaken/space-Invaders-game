'use strict'

//*                                                                  Alien
function initAlien() {
    // ALIENS.movementSpeed = 1000
    const { alienMap } = GAME
    alienMap.aliens = []
    alienMap.dirPos = { i: 0, j: 1 }
    alienMap.isFreeze = false
    alienMap.topRowIdx = 1
    alienMap.bottomRowIdx = 3
    alienMap.colIdxStart = 3
    alienMap.colIdxEnd = 10
    alienMap.aliens = []
}

function createAliens(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    const { board, gameEls, alienMap } = GAME
    const { aliens } = alienMap
    for (let i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            const newAlien = board[i][j]
            newAlien.gameEl = gameEls.alien
            newAlien.isHit = false
            newAlien.pos = { i, j }
            aliens.push(newAlien)
            GAME.aliensCount++
        }
    }
}