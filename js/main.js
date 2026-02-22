// Датум венчања: 9. Мај 2026, 17:45
var countDownDate = new Date("May 09, 2026 17:45:00").getTime();

// Ажурирање одбројавања сваке секунде
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector(".box1").innerHTML = "<span>" + days + "</span>";

    // Ћирилица за дане
    if (days == 1) {
        document.querySelector("#dan").innerHTML = "дан";
    } else if (days >= 2 && days <= 4) {
        document.querySelector("#dan").innerHTML = "дана";
    } else {
        document.querySelector("#dan").innerHTML = "дана";
    }

    document.querySelector(".box2").innerHTML = "<span>" + hours + "</span>";

    // Ћирилица за сате
    if (hours == 1) {
        document.querySelector("#sat").innerHTML = "сат";
    } else if (hours >= 2 && hours <= 4) {
        document.querySelector("#sat").innerHTML = "сата";
    } else {
        document.querySelector("#sat").innerHTML = "сати";
    }

    document.querySelector(".box3").innerHTML = "<span>" + minutes + "</span>";

    // Ћирилица за минуте
    if (minutes == 1) {
        document.querySelector("#minut").innerHTML = "минут";
    } else if (minutes >= 2 && minutes <= 4) {
        document.querySelector("#minut").innerHTML = "минута";
    } else {
        document.querySelector("#minut").innerHTML = "минута";
    }

    document.querySelector(".box4").innerHTML = "<span>" + seconds + "</span>";

    // Ћирилица за секунде
    if (seconds == 1) {
        document.querySelector("#sekunda").innerHTML = "секунда";
    } else if (seconds >= 2 && seconds <= 4) {
        document.querySelector("#sekunda").innerHTML = "секунде";
    } else {
        document.querySelector("#sekunda").innerHTML = "секунди";
    }

    // Ако је одбројавање завршено
    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".box1").innerHTML = "<span>0</span>";
        document.querySelector(".box2").innerHTML = "<span>0</span>";
        document.querySelector(".box3").innerHTML = "<span>0</span>";
        document.querySelector(".box4").innerHTML = "<span>0</span>";
    }
}, 1000);

// Датум за потврду доласка - 20 дана пре венчања
var confirmDate = new Date("Apr 19, 2026 23:59:59").getTime();

var y = setInterval(function() {
    var sad = new Date().getTime();
    var distance = confirmDate - sad;
    var dani = Math.floor(distance / (1000 * 60 * 60 * 24));

    if (dani > 1) {
        document.getElementById("potvrdaTimer").innerHTML = "Остало је још " + dani + " дана за потврду.";
    } else if (dani == 1) {
        document.getElementById("potvrdaTimer").innerHTML = "Остао је још " + dani + " дан за потврду.";
    } else if (distance < 0) {
        clearInterval(y);
        document.getElementById("potvrdaTimer").innerHTML = "Време за потврду је истекло.";
    }
}, 1000);
