<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack - Casino</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }

        .container {
            text-align: center;
            padding: 20px;
            max-width: 900px;
            width: 100%;
        }

        h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .game-info {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            flex-wrap: wrap;
        }

        .info-box {
            background: rgba(255,255,255,0.1);
            padding: 15px 30px;
            border-radius: 10px;
            margin: 5px;
        }

        .info-box h3 {
            font-size: 0.9em;
            opacity: 0.8;
            margin-bottom: 5px;
        }

        .info-box p {
            font-size: 1.5em;
            font-weight: bold;
        }

        .chips {
            color: #ffd700;
            font-size: 1.8em;
        }

        .betting-area {
            background: rgba(0,0,0,0.3);
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
        }

        .betting-title {
            font-size: 1.2em;
            margin-bottom: 15px;
        }

        .bet-amount {
            font-size: 2em;
            color: #ffd700;
            margin: 10px 0;
            font-weight: bold;
        }

        .chip-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            margin: 15px 0;
        }

        .chip {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 4px solid white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            font-size: 0.9em;
        }

        .chip:hover {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255,255,255,0.5);
        }

        .chip-10 { background: #e91e63; }
        .chip-25 { background: #9c27b0; }
        .chip-50 { background: #2196f3; }
        .chip-100 { background: #4caf50; }
        .chip-500 { background: #ff9800; }

        .bet-controls {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 15px;
        }

        .table {
            background: #0d5c0d;
            border-radius: 20px;
            padding: 40px;
            margin: 20px 0;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            border: 3px solid #1a7a1a;
        }

        .hand {
            margin: 30px 0;
            min-height: 140px;
        }

        .hand-title {
            font-size: 1.2em;
            margin-bottom: 15px;
            opacity: 0.9;
        }

        .cards {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .card {
            width: 80px;
            height: 112px;
            background: white;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 1.5em;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            animation: dealCard 0.3s ease;
        }

        @keyframes dealCard {
            from {
                transform: translateY(-50px) rotateY(90deg);
                opacity: 0;
            }
            to {
                transform: translateY(0) rotateY(0);
                opacity: 1;
            }
        }

        .card.red {
            color: #d32f2f;
        }

        .card.black {
            color: #1a1a1a;
        }

        .card-back {
            background: linear-gradient(45deg, #1565c0 25%, #0d47a1 25%, #0d47a1 50%, #1565c0 50%, #1565c0 75%, #0d47a1 75%, #0d47a1);
            background-size: 20px 20px;
            color: transparent;
        }

        .score {
            font-size: 1.3em;
            margin-top: 10px;
            font-weight: bold;
            color: #ffd700;
        }

        .controls {
            margin-top: 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        button {
            padding: 15px 35px;
            font-size: 1.1em;
            font-weight: bold;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .btn-hit {
            background: #4caf50;
            color: white;
        }

        .btn-stand {
            background: #ff9800;
            color: white;
        }

        .btn-deal {
            background: #2196f3;
            color: white;
            font-size: 1.3em;
            padding: 20px 50px;
        }

        .btn-clear {
            background: #f44336;
            color: white;
        }

        .btn-reset {
            background: #9e9e9e;
            color: white;
        }

        .message {
            font-size: 1.5em;
            margin-top: 20px;
            padding: 15px;
            border-radius: 10px;
            font-weight: bold;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .message.win {
            background: rgba(76, 175, 80, 0.3);
            border: 2px solid #4caf50;
        }

        .message.lose {
            background: rgba(244, 67, 54, 0.3);
            border: 2px solid #f44336;
        }

        .message.tie {
            background: rgba(255, 152, 0, 0.3);
            border: 2px solid #ff9800;
        }

        .game-phase {
            display: none;
        }

        .game-phase.active {
            display: block;
        }

        @media (max-width: 600px) {
            h1 {
                font-size: 2em;
            }
            
            .card {
                width: 60px;
                height: 84px;
                font-size: 1.2em;
            }
            
            .chip {
                width: 60px;
                height: 60px;
                font-size: 0.8em;
            }
            
            button {
                padding: 12px 25px;
                font-size: 1em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎰 BLACKJACK 🎰</h1>
        
        <div class="game-info">
            <div class="info-box">
                <h3>💰 Chips</h3>
                <p class="chips" id="chips">1000</p>
            </div>
            <div class="info-box">
                <h3>Wins</h3>
                <p id="wins">0</p>
            </div>
            <div class="info-box">
                <h3>Losses</h3>
                <p id="losses">0</p>
            </div>
        </div>

        <div class="betting-area game-phase active" id="betting-phase">
            <div class="betting-title">PLACE YOUR BET</div>
            <div class="bet-amount" id="current-bet">$0</div>
            
            <div class="chip-buttons">
                <div class="chip chip-10" onclick="addBet(10)">
                    <div>$10</div>
                </div>
                <div class="chip chip-25" onclick="addBet(25)">
                    <div>$25</div>
                </div>
                <div class="chip chip-50" onclick="addBet(50)">
                    <div>$50</div>
                </div>
                <div class="chip chip-100" onclick="addBet(100)">
                    <div>$100</div>
                </div>
                <div class="chip chip-500" onclick="addBet(500)">
                    <div>$500</div>
                </div>
            </div>

            <div class="bet-controls">
                <button class="btn-clear" onclick="clearBet()">Clear Bet</button>
                <button class="btn-deal" onclick="deal()" id="deal-btn">DEAL</button>
            </div>
        </div>

        <div class="table game-phase" id="playing-phase">
            <div class="hand">
                <div class="hand-title">🎩 DEALER</div>
                <div class="cards" id="dealer-cards"></div>
                <div class="score" id="dealer-score"></div>
            </div>

            <div class="hand">
                <div class="hand-title">👤 YOU</div>
                <div class="cards" id="player-cards"></div>
                <div class="score" id="player-score"></div>
            </div>

            <div class="controls">
                <button class="btn-hit" id="hit-btn" onclick="hit()">Hit</button>
                <button class="btn-stand" id="stand-btn" onclick="stand()">Stand</button>
            </div>
        </div>

        <div class="message" id="message"></div>
        
        <button class="btn-reset" onclick="resetGame()" style="margin-top: 20px;">Reset Chips</button>
    </div>

    <script>
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

        createDeck();
        updateDisplay();
    </script>
</body>
</html>
