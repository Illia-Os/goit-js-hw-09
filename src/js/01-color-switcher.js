const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStop.disabled = true; // disabled
let colorInterval = null; // timer

// button start
btnStart.addEventListener("click", () => {
  btnStart.disabled = true; // deactivation start
  btnStop.disabled = false; // activation stop

  // Timer for changing color
  colorInterval = setInterval(() => {
    
   // RandomHexColor
    document.body.style.background = getRandomHexColor();
  }, 1000); // one sec change color
});

// button stop
btnStop.addEventListener("click", () => {
  
   // clearing timer
  clearInterval(colorInterval);

  btnStart.disabled = false; // activation start
  btnStop.disabled = true; // deactivation stop
});
