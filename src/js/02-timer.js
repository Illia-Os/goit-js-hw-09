//Import libraries and configure flatpickr:
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

//Definition of elements:
const ref = {
  input: document.querySelector("#datetime-picker"),
  btn: document.querySelector("button[data-start]"),
  daysEl: document.querySelector("span[data-days]"),
  hoursEl: document.querySelector("span[data-hours]"),
  minutesEl: document.querySelector("span[data-minutes]"),
  secondsEl: document.querySelector("span[data-seconds]"),
};

ref.btn.disabled = true;
let newDate = null;
let intervalId = null;

//Setting the initial value of the date, setting flatpickr, 
//and the function that is called after the calendar is closed(onClose):
flatpickr(ref.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    newDate = selectedDates[0].getTime();
    if (newDate < Date.now()) {
      ref.btn.disabled = true;
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      ref.btn.disabled = false;
    }
  },
});

//Function to start the timer:
function onTimerStart() {
  intervalId = setInterval(() => {
    let leftTime = convertMs(newDate - Date.now());

    if (newDate < Date.now()) {
      clearInterval(intervalId);
      return dataDisplay();
    }
    dataDisplay(leftTime);
    ref.btn.disabled = true;
    ref.input.disabled = true;
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, 0);
}

function dataDisplay(obj = { days: 0, hours: 0, minutes: 0, seconds: 0 }) {
  ref.daysEl.textContent = pad(obj.days);
  ref.hoursEl.textContent = pad(obj.hours);
  ref.minutesEl.textContent = pad(obj.minutes);
  ref.secondsEl.textContent = pad(obj.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//Attaching an event handler for a button:
ref.btn.addEventListener("click", onTimerStart);
