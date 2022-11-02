let timer_time_install = document.querySelector(".timer_time_install");
const btnStart = document.querySelector(".timer_btn_start");
const btnStop = document.querySelector(".timer_btn_stop");
let timer_time = document.querySelector(".timer_time");

let intervalId;
let timer = function () {
  let timeMinut = timer_time_install.value * 60;
  intervalId = setInterval(() => {
    let seconds = timeMinut % 60;
    let minutes = (timeMinut / 60) % 60;
    let hour = (timeMinut / 60 / 60) % 60;
    timer_time.innerHTML = "";
    if (!timer_time_install.value) {
      timer_time.innerHTML = "Необходимо ввести время отчета!";
      btnStart.removeAttribute("disabled");
    } else if (timeMinut <= 0) {
      clearInterval(intervalId);
      timer_time.innerHTML = "";
      alert("Время закончилось");
      btnStart.removeAttribute("disabled");
      btnStop.setAttribute("disabled", true);
    } else {
      btnStop.removeAttribute("disabled");
      let strTimer = `${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
      timer_time.innerHTML = strTimer;
    }
    --timeMinut;
  }, 1000);
};

var sound = new Howl({
  src: ["./sound/whatsapp_iphone.mp3"],
});

export const getStart = btnStart.addEventListener("click", event => {
  sound.play();
  event.preventDefault();
  btnStart.setAttribute("disabled", true);
  timer();
  btnStop.removeAttribute("disabled");
});

export const getStop = btnStop.addEventListener("click", event => {
  event.preventDefault();
  clearInterval(intervalId);
  timer_time.innerHTML = "";
  btnStop.setAttribute("disabled", true);
  btnStart.removeAttribute("disabled");
});