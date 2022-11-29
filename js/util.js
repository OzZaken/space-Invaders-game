'use strict'

// Audio
function playAudio(audioKey) {
    const { audio } = GAME.audio
    const audioEco = audio[audioKey]
    if (audioEco) audioEco.pause()
    new Audio(`assets/audio/${audioKey}.mp3`).play()
}

function toggleMusic() {
    const elMusic = document.querySelector('.music')
    if (elMusic.isOn) elMusic.classList.toggle("paused")
    else {
        let strHTML = ''
        for (let i = 1; i <= 10; i++) {
            strHTML += `<span class="bar n${i}"></span>`
        }
        elMusic.innerHTML = strHTML
        elMusic.classList.toggle("paused")
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}