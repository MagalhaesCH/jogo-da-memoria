const gameBoard = document.getElementById('game-board');
let cards = [];
let flippedCards = [];

// Array de emojis para as cartas
const emojis = ['', '', '', '', '', '', '', ''];

// Função para criar um card
function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = emoji;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => {
        if (card.classList.contains('flip') || flippedCards.length === 2) {
            return;
        }

        card.classList.add('flip');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            const firstCard = flippedCards[0];
            const secondCard = flippedCards[1];

            if (firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent) {
                // Pare encontrado
                firstCard.removeEventListener('click', null);
                secondCard.removeEventListener('click', null);
                flippedCards = [];
            } else {
                // Pare não encontrado
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    flippedCards = [];
                }, 1000);
            }
        }
    });

    return card;
}

// Função para iniciar o jogo
function startGame() {
    // Cria um array com pares de emojis
    const emojisDuplicados = emojis.concat(emojis);
    shuffle(emojisDuplicados);

    // Cria as cartas e adiciona ao jogo
    emojisDuplicados.forEach(emoji => {
        const card = createCard(emoji);
        cards.push(card);
        gameBoard.appendChild(card);
    });
}

// Função para embaralhar um array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

startGame();
