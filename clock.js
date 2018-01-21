const deadline = new Date("{{ project.deadline }}");
let countdownTimer = setInterval(() => {
  let now = new Date();
  let distance = deadline - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("countdownClock").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById("countdownClock").innerHTML =
      "The deadline has passed.";
  }
}, 1000);
