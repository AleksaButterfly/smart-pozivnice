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
var confirmDate = new Date("Apr 20, 2026 23:59:59").getTime();

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

// =============================================
// ФОРМА - Слање података у Google Sheets
// =============================================

// ВАЖНО: Замените ово са вашим Google Apps Script URL-ом
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbznn6_wL6N1NBYJbrlS40_xPfYgXs9Nu9FCqGb2W2JZGi15cCSBU1ZpU7gL5-LKqAta/exec";

document.getElementById("sendMessage").addEventListener("click", function(e) {
    e.preventDefault();

    // Узми вредности из форме
    const ime = document.querySelector('input[name="ime"]').value.trim();
    const dolazakRadio = document.querySelector('input[name="potvrda"]:checked');
    const brojGostiju = document.querySelector('select[name="broj"]').value;
    const imenaGostiju = document.querySelector('textarea[name="gosti"]').value.trim();
    const poruka = document.querySelector('textarea[name="poruka"]').value.trim();

    // Валидација
    let hasError = false;

    // Ресетуј грешке
    document.querySelectorAll('.greska').forEach(el => el.textContent = '');

    if (!ime) {
        document.querySelector('.greska').textContent = 'Молимо унесите име и презиме.';
        hasError = true;
    }

    if (!dolazakRadio) {
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const dolazak = dolazakRadio.value;

    // Припреми податке
    const data = {
        ime: ime,
        dolazak: dolazak === "1" ? "Да" : "Не",
        brojGostiju: brojGostiju,
        imenaGostiju: imenaGostiju,
        poruka: poruka
    };

    // Промени текст дугмета
    const btn = document.getElementById("sendMessage");
    const originalText = btn.textContent;
    btn.textContent = "Шаљем...";
    btn.disabled = true;

    // Пошаљи податке
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Успешно послато
        btn.textContent = "Послато ✓";
        btn.style.backgroundColor = "#4CAF50";

        // Ресетуј форму
        document.getElementById("form").reset();

        // Врати дугме после 3 секунде
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = "";
        }, 3000);
    })
    .catch((error) => {
        console.error("Грешка:", error);
        btn.textContent = "Грешка - покушајте поново";
        btn.style.backgroundColor = "#f44336";
        btn.disabled = false;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = "";
        }, 3000);
    });
});
