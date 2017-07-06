let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTime(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    
    if (secondsLeft < 0){
      clearInterval(countdown);
      return;
    }
    
    displayTime(secondsLeft);
  }, 1000);
}

function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}


function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}


function startTimer() {
  const seconds = this.dataset.time;
  timer(seconds);
}
buttons.forEach(button => button.addEventListener('click', startTimer));


document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
