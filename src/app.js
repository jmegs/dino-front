const ttsButton = document.querySelector('#js-tts-button')
const ttsForm = document.querySelector('#js-tts-form')
const ttsModal = document.querySelector('#js-tts-modal')

const roarButton = document.querySelector('#js-roar-button')
const alertModal = document.querySelector('#js-alert-modal')

const modalCancel = document.querySelector('#js-modal-cancel')

const katyButton = document.querySelector('#js-katy')
const katyModal = document.querySelector('#js-katy-modal')

// Modal Utilities
function activateModalWithTimeout(el, duration = 3000) {
  el.classList.add('Modal--active')
  setTimeout(() => {
    el.classList.remove('Modal--active')
  }, duration)
}

function activateModal(el) {
  el.classList.add('Modal--active')
}

function activateAlertModalWithText(text = 'Alert Alert') {
  let el = alertModal
  el.classList.add('Modal--active')
  el.querySelector('h1').innerHTML = text
}

function removeModal(el) {
  el.classList.remove('Modal--active')
}

modalCancel.addEventListener('click', function(event) {
  let el = event.target
  let theModal = el.closest('.Modal--active')
  theModal.classList.remove('Modal--active')
  document.querySelector('#js-tts-input').value = ''
})

// Check if Dino is Online
window.onload = event => {
  if (/fluffy/.test(window.location.href)) {
    fetch(`/online`).then(res => {
      let code = res.status
      switch (code) {
        case 404:
          activateAlertModalWithText('Error<br>Cyndie is Offline')
          break
        case 503:
          activateAlertModalWithText('ERROR<br>Dino Not Found')
          break
        default:
          console.log(`${code}: Dino Found`)
          break
      }
    })
  }
  // .catch(err => {
  //   console.error(error)
  // })
}

// Button Listeners
roarButton.addEventListener('click', function(event) {
  activateModalWithTimeout(alertModal)
  fetch(`/pre/roar2`)
    .then(res => console.log(`Responded ${res.status}`))
    .catch(err => console.error(err))
})

ttsButton.addEventListener('click', function(event) {
  activateModal(ttsModal)
  document.querySelector('#js-tts-input').focus()
})

// Submit TTS form to say endpoint
ttsForm.onsubmit = function(event) {
  event.preventDefault()
  let value = document.querySelector('#js-tts-input').value
  fetch(`/tts?say=${encodeURIComponent(value)}`)
    .then(res => console.log(`Responded ${res.status}`))
    .catch(err => console.error(err))
  document.querySelector('#js-tts-input').value = ''
  removeModal(ttsModal)
}

katyButton.addEventListener('click', function(event) {
  activateModalWithTimeout(katyModal, 5000)
  fetch(`/pre/katy-perry`)
    .then(res => console.log(`Responded ${res.status}`))
    .catch(err => console.error(err))
})

// Blinking Buttons
const buttons = document.querySelectorAll('.Buttons__Panel .Button')

function getRandomNumber(max) {
  return Math.floor(Math.random() * max)
}

function clearButtons() {
  buttons.forEach(button => {
    button.classList.remove('Button--Active')
  })
}

function lightRandomButtons() {
  const total = buttons.length
  let newIndexes = [
    getRandomNumber(total),
    getRandomNumber(total),
    getRandomNumber(total)
  ]
  for (let index of newIndexes) {
    buttons[index].classList.add('Button--Active')
  }
}

setInterval(() => {
  clearButtons()
  lightRandomButtons()
}, 2000)

// Animate Values
function animateValue(el, start, end, duration) {
  // assumes integer values for start and end

  // var obj = document.getElementById(id)
  var range = end - start
  // no timer shorter than 50ms (not really visible any way)
  var minTimer = 50
  // calc step time to show all interediate values
  var stepTime = Math.abs(Math.floor(duration / range))

  // never go below minTimer
  stepTime = Math.max(stepTime, minTimer)

  // get current time and calculate desired end time
  var startTime = new Date().getTime()
  var endTime = startTime + duration
  var timer

  function run() {
    var now = new Date().getTime()
    var remaining = Math.max((endTime - now) / duration, 0)
    var value = Math.round(end - remaining * range)
    el.innerHTML = value
    if (value == end) {
      clearInterval(timer)
    }
  }

  timer = setInterval(run, stepTime)
  run()
}

setInterval(() => {
  const els = document.querySelectorAll('.Stat__Value')
  const selectedEl = els[getRandomNumber(els.length)]

  let prevValue = parseInt(selectedEl.innerHTML)
  let newValue = getRandomNumber(9999)
  animateValue(selectedEl, prevValue, newValue, 2000)
}, 3000)
