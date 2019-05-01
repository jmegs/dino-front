const ttsButton = document.querySelector('#js-tts-button')
const ttsForm = document.querySelector('#js-tts-form')
const ttsModal = document.querySelector('#js-tts-modal')

const roarButton = document.querySelector('#js-roar-button')
const roarModal = document.querySelector('#js-roar-modal')

const modalCancel = document.querySelector('#js-modal-cancel')

// Modal Utilities
function activateModalWithTimeout(el) {
  el.classList.add('Modal--active')
  setTimeout(() => {
    el.classList.remove('Modal--active')
  }, 3000)
}

function activateModal(el) {
  el.classList.add('Modal--active')
}

function removeModal(el) {
  el.classList.remove('Modal--active')
}

modalCancel.addEventListener('click', function(event) {
  let el = event.target
  let theModal = el.closest('.Modal--active')
  theModal.classList.remove('Modal--active')
})

roarButton.addEventListener('click', function(event) {
  activateModalWithTimeout(roarModal)
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
  removeModal(ttsModal)
}

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
}, 1000)
