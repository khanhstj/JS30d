let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('.timer__button')

function timer (secconds) {
   clearInterval(countdown)

   const now = Date.now()
   const then = now + secconds * 1000
   displayTimeLeft(secconds)
   displayEndTime(then)
   countdown = setInterval(() => {
      const seccondsLeft = Math.round((then - Date.now()) / 1000)
      if(seccondsLeft < 0) {
         clearInterval(countdown)
         return
      }
      displayTimeLeft(seccondsLeft)

   }, 1000)

}

function displayTimeLeft(secconds) {
   const minutes = Math.floor(secconds / 60)
   const remainderSecconds = secconds % 60
   const display = `${minutes}:${remainderSecconds < 10 ? '0' : '' }${remainderSecconds}`
   document.title = display
   timerDisplay.textContent = display
   
}

function displayEndTime(timestamp) {
   const end = new Date(timestamp)
   const hour = end.getHours()
   const adjustedHour = hour > 12 ? hour - 12 : hour
   const minutes = end.getMinutes()
   endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer() {
   const secconds = parseInt(this.dataset.time)
   timer(secconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
   e.preventDefault()
   const mins = this.minutes.value
   timer(mins * 60)
   this.reset()
})