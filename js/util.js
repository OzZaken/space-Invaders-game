//*                                                                 Util
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function playAudio(audioKey) {
    const { audio } = GAME.audio
    const audioEco = audio[audioKey]
    if (audioEco) audioEco.pause()
    new Audio(`assets/audio/${audioKey}.mp3`).play()
}

// Music
function initMusic(){
    let strHTML = ''
    for (let i = 1; i <= 10; i++) {
        strHTML+=`<span class="bar n${i}"></span>`
    }
    document.querySelector('.music').innerHTML = strHTML
}

function toggleMusic() {
    document.querySelector('.music').classList.toggle("paused")
}