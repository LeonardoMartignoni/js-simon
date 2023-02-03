const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const titleEl = document.getElementById("title");

// const countdownDateEnd = new Date().getTime() + 3000; // Debug time

// Creo una variabile che indica il giorno e l'ora della fine del countdown
const countdownDateEnd = new Date('2023-02-06 09:30:00').getTime();
console.log('Tomorrow ms: ' + countdownDateEnd);

// Invoco la funzione così al caricamento della pagina non uscirà 00 sul timer
countdownCounter();

// Creo un intervallo per l'orologio
const clockCountdown = setInterval(countdownCounter, 1000);
function countdownCounter() {

    // Recupero la data di oggi in millisecondi
    const now = new Date().getTime();
    // console.log('Today ms: ' + now);

    // Calcolo quanti millisecondi mancano tra la data della fine e del tempo attuale;
    const countdownDistance = countdownDateEnd - now;
    // console.log('Distance ms: ' + countdownDistance);

    // Calcolo il tempo per giorni, ore, minuti e secondi
    const seconds = Math.floor((countdownDistance % (1000 * 60)) / 1000);
    const minutes = Math.floor((countdownDistance % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((countdownDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(countdownDistance / (1000 * 60 * 60 * 24));

    // Scrivo il tempo rimanente nell'HTML
    secondsEl.innerHTML = (seconds < 10) ? "0" + seconds : seconds;
    minutesEl.innerHTML = (minutes < 10) ? "0" + minutes : minutes;
    hoursEl.innerHTML = (hours < 10) ? "0" + hours : hours;
    daysEl.innerHTML = (days < 10) ? "0" + days : days;

    // Se il countdown è arrivato a 0
    if (countdownDistance <= 1000) {

        // Ferma il countdown
        clearInterval(clockCountdown);

        // Scrivo nel titolo un messaggio di fine
        titleEl.innerHTML = 'Ora della correzione!';

        // Confetti Firework Effect
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
}
