const holes = document.getElementsByClassName('hole');
const elDead = document.getElementById('dead');
const elLost = document.getElementById('lost');

let deadCounter = 0;
let lostCounter = 0;

function setCountersToZero() {
    deadCounter = 0;
    lostCounter = 0;
    elDead.textContent = 0;
    elLost.textContent = 0;

}

for (let hole of holes) {
    hole.onclick = function() {
        if (hole.className.includes('hole_has-mole')) {
            deadCounter++;
            elDead.textContent = deadCounter;
        } else {
            lostCounter++;
            elLost.textContent = lostCounter;
        }

        if (deadCounter === 10) {
            // Тот же вопрос, что и в первом задании.
            // Alert появляется до того как обновилось значение счетчика
            alert('Победа');
            setCountersToZero();
        }

        if (lostCounter === 5) {
            alert('Проигрыш');
            setCountersToZero();
        }
    }
}