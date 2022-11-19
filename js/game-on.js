const elRocket = document.querySelector('#rocket')
const elSky = document.querySelector('#sky')
const elEx = document.querySelector('#exhaust')

var bottom = 0
var last_y = 0
var wheel

window.addEventListener('wheel', function(e){
  wheel = e.deltaY
})

window.addEventListener('scroll', function(e){
  var h = window.innerHeight
  var y = document.documentElement.scrollTop
  var doc = document.body.offsetHeight - 250
  var perc = y / (doc - h)

  if(perc < 1) elSky.style.bottom = -1*(perc)*100 + '%'    

  if(perc > 0) {
    elRocket.classList.add('shake_rocket')
    elEx.classList.add('exhaust')
  } else {
    elRocket.classList.remove('shake_rocket')
    elEx.classList.remove('exhaust')
  }
  
  if(perc > .37) elEx.classList.remove('exhaust')
  
  if(perc > .25) bottom = (perc - .25)*133
  
  if(perc > 0) {
    bottom = (perc - .25)*133
    if(perc - .25 < 0) bottom = 0
  }
  elRocket.style.bottom = bottom + '%'

  last_y = y
})