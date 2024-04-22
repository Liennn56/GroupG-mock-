const symbols = ['🍎', '🍊', '🍋', '🍉']; // 4 symbols for simplicity
const gridSize = 4; // 4x4 grid

let cards = [];
let flippedCards = [];

function createCards() {
  const gameContainer = document.getElementById('game-container');

  symbols.forEach(symbol => {
    for (let i = 0; i < 2; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = '<span class="hidden">' + symbol + '</span>';
      card.addEventListener('click', () => flipCard(card));
      gameContainer.appendChild(card);
      cards.push(card);
    }
  });

  shuffleCards();
}

function shuffleCards() {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || flippedCards.includes(card)) return;

  card.children[0].classList.remove('hidden');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  if (flippedCards[0].children[0].textContent === flippedCards[1].children[0].textContent) {
    flippedCards.forEach(card => card.removeEventListener('click', flipCard));
    flippedCards = [];
  } else {
    setTimeout(() => {
      flippedCards.forEach(card => card.children[0].classList.add('hidden'));
      flippedCards = [];
    }, 1000);
  }
}

createCards();
