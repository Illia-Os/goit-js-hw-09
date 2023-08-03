// Import the `Notify` class from the `notiflix` library
import { Notify } from "notiflix/build/notiflix-notify-aio";

const form = document.querySelector(".form");

// Add an event listener to the `submit` event of the `form` element
form.addEventListener("submit", onSubmitForm);

// This function is called when the `form` element is submitted
function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Виконана обіцянка ${position} за ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Відхилена обіцянка ${position} за ${delay}ms`);
      });
    delay += Number(form.step.value);
  }
}

// This function creates a promise that will be fulfilled or rejected after a `delay` of milliseconds
function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}
