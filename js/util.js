'use strict'

// Audio
function playAudio(audioKey) {
    const { audio } = GAME
    let audioEco = audio[audioKey]
    if (audioEco) audioEco.pause()
    return new Promise((resolve, reject) => { // return a promise
        let newAudio = new Audio()            // create audio wo/ src
        newAudio.preload = "auto"             // intend to play through
        newAudio.autoplay = true              // autoplay when loaded
        if (/music/.test(audioKey)) {
            newAudio.loop = true
            newAudio.volume = 0.4
        }
        newAudio.src = `assets/audio/${audioKey}.mp3`
        newAudio.onerror = reject                            // on error, reject
        newAudio.onended = resolve                           // when done, resolve
    })
}
function onStopMusic() {
    const { audio } = GAME
    console.log(audio['music'])
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
function _getRandomColor() {
    let colorLetters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += colorLetters[Math.floor(Math.random() * 16)]
    }
    return color
}
function makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}