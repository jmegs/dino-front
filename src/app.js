const roarButton = document.querySelector("#roar");
const alert = document.querySelector('.Alert')

roarButton.addEventListener('click', function(event) {
  roar()})

function roar() {
  alert.classList.add('Alert--active')
  setTimeout(() => {
    alert.classList.remove('Alert--active')
  }, 5000);
}