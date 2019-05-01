const roarButton = document.querySelector('#js-roar-button')
const ttsButton = document.querySelector('#js-tts-button')
const roarModal = document.querySelector('#js-roar-modal')
const ttsModal = document.querySelector('#js-tts-modal')
const modalCancel = document.querySelector('#js-modal-cancel')

const ttsForm = document.querySelector('#js-tts-form')

modalCancel.addEventListener('click', function(event) {
  let el = event.target
  let theModal = el.closest('.Modal--active')
  theModal.classList.remove('Modal--active')
})

roarButton.addEventListener('click', function(event) {
  // `GET /pre/<name>`
  console.log(`Fluffy Roars!\nGET /pre/<name>`)
  activateModalWithTimeout(roarModal)
  fetch(`/pre/roar2`)
    .then(res => console.log(`Responded ${res.status}`))
    .catch(err => console.error(err))
})

ttsButton.addEventListener('click', function(event) {
  activateModal(ttsModal)
  document.querySelector('#js-tts-input').focus()
})

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

ttsForm.onsubmit = function(event) {
  // `GET /tts?say=<text>`
  let value = document.querySelector('#js-tts-input').value
  event.preventDefault()
  console.log(`Fluffy Says: ${value}`)
  fetch(`/tts?say=${encodeURIComponent(value)}`)
    .then(res => console.log(`Responded ${res.status}`))
    .catch(err => console.error(err))
  removeModal(ttsModal)
}
