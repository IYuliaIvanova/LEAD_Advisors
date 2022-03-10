function getTimeRemaining(endTime) {
  const t = Date.parse(endTime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endTime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector(".days");
  const hoursSpan = clock.querySelector(".hours");
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining(endTime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }

  updateClock();
  const timeInterval = setInterval(updateClock, 1000);
}

function updateText() {
  const daysSpan = document.querySelector("#daysTxt");
  const hoursSpan = document.querySelector("#hoursTxt");
  const minutesSpan = document.querySelector("#minutesTxt");
  const secondsSpan = document.querySelector("#secondsTxt");

  window.addEventListener("resize", () => {
    const screenWidth = document.documentElement.clientWidth;

    if (screenWidth > 870) {
      daysSpan.innerText = "Days";
      hoursSpan.innerText = "Hours";
      minutesSpan.innerText = "Minutes";
      secondsSpan.innerText = "Seconds";
    } else {
      daysSpan.innerText = "DD";
      hoursSpan.innerText = "HH";
      minutesSpan.innerText = "MM";
      secondsSpan.innerText = "SS";
    }
  });
}

const deadline = "2022-12-31";
initializeClock("timer", deadline);
updateText();
