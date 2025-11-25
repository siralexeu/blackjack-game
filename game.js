let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = false;
let chips = 1000;
let currentBet = 0;
let wins = 0;
let losses = 0;

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function getCardValue(card) {
    if (card.value === 'A') return 11;
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    return parseInt(card.value);
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    for (let card of hand) {
        score += getCardValue(card);
        if (card.value === 'A') aces++;
    }

    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }

    return score;
}

function addBet(amount) {
    if (chips >= amount) {
        currentBet += amount;
        chips -= amount;
        updateDisplay();
    } else {
        showMessage('Not enough chips!', 'lose');
    }
}

function clearBet() {
    chips += currentBet;
    currentBet = 0;
    updateDisplay();
    showMessage('');
}

function updateDisplay() {
    document.getElementById('chips').textContent = chips;
    document.getElementById('current-bet').textContent = '$' + currentBet;
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
}

function switchPhase(phase) {
    document.querySelectorAll('.game-phase').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(phase).classList.add('active');
}

function deal() {
    if (currentBet === 0) {
        showMessage('Place a bet first!', 'lose');
        return;
    }

    if (deck.length < 20) createDeck();

    playerHand = [];
    dealerHand = [];
    gameOver = false;

    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);

    switchPhase('playing-phase');
    displayCards(playerHand, 'player-cards');
    displayCards(dealerHand, 'dealer-cards', true);
    displayScore(playerHand, 'player-score');
    displayScore(dealerHand, 'dealer-score', true);

    document.getElementById('hit-btn').disabled = false;
    document.getElementById('stand-btn').disabled = false;
    showMessage('');

    const playerScore = calculateScore(playerHand);
    if (playerScore === 21) {
        setTimeout(() => stand(), 500);
    }
}

function displayCards(hand, elementId, hideFirst = false) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';

    hand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        
        if (hideFirst && index === 0) {
            cardDiv.className = 'card card-back';
            cardDiv.textContent = '?';
        } else {
            const isRed = card.suit === '♥' || card.suit === '♦';
            cardDiv.className = `card ${isRed ? 'red' : 'black'}`;
            cardDiv.innerHTML = `${card.value}<br>${card.suit}`;
        }
        
        container.appendChild(cardDiv);
    });
}

function displayScore(hand, elementId, hide = false) {
    const scoreElement = document.getElementById(elementId);
    if (hide) {
        scoreElement.textContent = '?';
    } else {
        const score = calculateScore(hand);
        scoreElement.textContent = `Score: ${score}`;
    }
}

function showMessage(text, type = '') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
}

function dealCard(hand) {
    if (deck.length === 0) createDeck();
    hand.push(deck.pop());
}

function hit() {
    if (gameOver) return;

    dealCard(playerHand);
    displayCards(playerHand, 'player-cards');
    displayScore(playerHand, 'player-score');

    const playerScore = calculateScore(playerHand);
    if (playerScore > 21) {
        endGame('BUST! You lose $' + currentBet, 'lose', false);
        losses++;
    }
}

function stand() {
    if (gameOver) return;

    gameOver = true;
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;

    displayCards(dealerHand, 'dealer-cards', false);
    displayScore(dealerHand, 'dealer-score', false);

    let dealerActions = 0;
    const dealerInterval = setInterval(() => {
        if (calculateScore(dealerHand) < 17) {
            dealCard(dealerHand);
            displayCards(dealerHand, 'dealer-cards', false);
            displayScore(dealerHand, 'dealer-score', false);
            dealerActions++;
        } else {
            clearInterval(dealerInterval);
            determineWinner();
        }

        if (dealerActions > 10) {
            clearInterval(dealerInterval);
            determineWinner();
        }
    }, 800);
}

function determineWinner() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    if (dealerScore > 21) {
        endGame('Dealer BUST! You win $' + (currentBet * 2) + '!', 'win', true);
        wins++;
    } else if (playerScore > dealerScore) {
        endGame('You WIN $' + (currentBet * 2) + '!', 'win', true);
        wins++;
    } else if (playerScore < dealerScore) {
        endGame('Dealer wins! You lose $' + currentBet, 'lose', false);
        losses++;
    } else {
        endGame('PUSH! Bet returned', 'tie', 'push');
    }
}

function endGame(message, type, won) {
    gameOver = true;
    showMessage(message, type);
    
    if (won === true) {
        chips += currentBet * 2;
    } else if (won === 'push') {
        chips += currentBet;
    }

    currentBet = 0;
    updateDisplay();

    setTimeout(() => {
        switchPhase('betting-phase');
        showMessage('');
    }, 3000);
}

function resetGame() {
    chips = 1000;
    wins = 0;
    losses = 0;
    currentBet = 0;
    updateDisplay();
    switchPhase('betting-phase');
    showMessage('');
}

// Initializarea jocului la incarcarea scriptului
createDeck();
updateDisplay();
