class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__time');
    
    this.langChange = ['Shift', 'Alt', 'Control', 'CapsLock', 'Meta', 'AltGraph'];
    this.lastIndex = null;
    // this.timer = null;
    // this.timerDuration = null;
    
    this.reset();
    this.registerEvents();
  }
/*
  Q  
  setTimer работает как ожидал.
  Он устанавливает значение для свойства и отображает его на старнице,
  а вот changeTimer не может прочитать это свойство.
  
  A
  setInterval(this.changeTimer, 1000) - мы не можем передать просто this.changeTimer,
  самый надёжный способ - сохранить контекст this и передавать в setInterval анонимную функцию
  (занести this можно в переменную и байндить или использовать стрелочную функцию(рекомендую)).
  https://developer.mozilla.org/ru/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
*/

  setTimer(word) {
    clearInterval(this.timer);
    this.timerDuration = word.length;
    this.timerElement.textContent = this.timerDuration;
    this.timer = setInterval(() => {
      this.timerDuration--;
      this.timerElement.textContent = this.timerDuration;
      if (this.timerDuration === 0) {
        this.fail();
      } 
    }, 1000);
  }
  
  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keydown', (e) => {
      if (this.langChange.includes(e.key)) {
        return;
      } else if (this.currentSymbol.textContent.toLowerCase() === e.key.toLowerCase()) {
        this.success();
      } else  {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
    this.setTimer(word);
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript',
      'я люблю kitkat',
      'русско-engl',
      'double язык'
    ];
    
    let index;
    do {
      index = Math.floor(Math.random() * words.length);
    } while (index === this.lastIndex);
    
    this.lastIndex = index;
    
    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

