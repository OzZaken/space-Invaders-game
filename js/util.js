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
function toggle(button) {
    const {elMusic} = GAME.domEls
    elMusic.classList.toggle("paused")
    if (button.innerHTML == "Kill the Joy.") {
        button.innerHTML = "Crank it up!"
    } else button.innerHTML = "Kill the Joy."
}
