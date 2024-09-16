let playerDeck = [];
let opponentDeck = [];
let playerScore = 0;
let opponentScore = 0;
let roundCounter = 0;
let audioPlayer;  
let musicStarted = false; 


function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}


function playMusic() {
    if (!musicStarted) {
        audioPlayer = new Audio('battle theme.mp3'); 
        audioPlayer.loop = true; 
        audioPlayer.play();
        musicStarted = true;
    }
}



function initializeDeck() {
    let deck = [
        { value: 68.75, front: "cartas/carta 1.jpg" },
        { value: 87.75, front: "cartas/carta 2.jpg" },
        { value: 25, front: "cartas/carta 3.jpg" },
        { value: 99, front: "cartas/carta 4.jpg" },
        { value: 63.5, front: "cartas/carta 5.jpg" },
        { value: 86.25, front: "cartas/carta 6.jpg" },
        { value: 20, front: "cartas/carta 7.jpg" },
        { value: 0, front: "cartas/carta 8.jpg" },
        { value: 92.25, front: "cartas/carta 9.jpg" },
        { value: 72, front: "cartas/carta 10.jpg" },
        { value: 81.75, front: "cartas/carta 11.jpg" },
        { value: 83, front: "cartas/carta 12.jpg" },
        { value: 0, front: "cartas/carta 13.jpg" },
        { value: 94.5, front: "cartas/carta 14.jpg" },
        { value: 58, front: "cartas/carta 15.jpg" },
        { value: 73, front: "cartas/carta 16.jpg" },
        { value: 76.5, front: "cartas/carta 17.jpg" },
        { value: 66, front: "cartas/carta 18.jpg" },
        { value: 71, front: "cartas/carta 19.jpg" },
        { value: 98, front: "cartas/carta 20.jpg" },
        { value: 97, front: "cartas/carta 21.jpg" },
        { value: 99, front: "cartas/carta 22.jpg" },
        { value: 0, front: "cartas/carta 23.jpg" },
        { value: 86.75, front: "cartas/carta 24.jpg" },
        { value: 82.75, front: "cartas/carta 25.jpg" },
        { value: 65.75, front: "cartas/carta 26.jpg" },
        { value: 38.5, front: "cartas/carta 27.jpg" },
        { value: 62.5, front: "cartas/carta 28.jpg" },
        { value: 58.75, front: "cartas/carta 29.jpg" },
        { value: 99, front: "cartas/carta 30.jpg" },
        { value: 55, front: "cartas/carta 31.jpg" },
        { value: 97, front: "cartas/carta 32.jpg" },
        { value: 97, front: "cartas/carta 33.jpg" },
        { value: 65, front: "cartas/carta 34.jpg" },
        { value: 88.25, front: "cartas/carta 35.jpg" },
        { value: 80.75, front: "cartas/carta 36.jpg" },
        { value: 0, front: "cartas/carta 37.jpg" },
        { value: 95.75, front: "cartas/carta 38.jpg" },
        { value: 99, front: "cartas/carta 39.jpg" },
        { value: 97, front: "cartas/carta 40.jpg" },
        { value: 97.75, front: "cartas/carta 41.jpg" },
        { value: 83.75, front: "cartas/carta 42.jpg" },
        { value: 0, front: "cartas/carta 43.jpg" },
        { value: 97.75, front: "cartas/carta 44.jpg" },
        { value: 69.5, front: "cartas/carta 45.jpg" },
        { value: 97, front: "cartas/carta 46.jpg" },
        { value: 98, front: "cartas/carta 47.jpg" },
        { value: 98, front: "cartas/carta 48.jpg" },
        { value: 98, front: "cartas/carta 49.jpg" },
        { value: 98, front: "cartas/carta 50.jpg" },
        { value: 98, front: "cartas/carta 51.jpg" },
        { value: 99, front: "cartas/carta 52.jpg" },
        { value: 77.5, front: "cartas/carta 53.jpg" },
        { value: 55.5, front: "cartas/carta 54.jpg" },
        { value: 25, front: "cartas/carta 55.jpg" },
        { value: 999, front: "cartas/carta 56.jpg" },
        { value: 0, front: "cartas/carta 57.jpg" }
    ];
    return shuffle(deck);
}


function dealCards() {
    const deck = initializeDeck();
    playerDeck = deck.slice(0, 15); 
    opponentDeck = deck.slice(15, 30); 
    renderHands();
    updateHealthBars(); 
}


function renderHands() {
    const playerHand = document.getElementById('player-hand');
    const opponentHand = document.getElementById('opponent-hand');
    playerHand.innerHTML = '';
    opponentHand.innerHTML = '';


    playerDeck.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.style.backgroundImage = `url('${card.front}')`;

        if (card.used) {
            cardElement.classList.add('used');
        } else {
            cardElement.onclick = () => selectCard('player', index);
        }
        playerHand.appendChild(cardElement);
    });


    opponentDeck.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        if (card.used) {
            cardElement.style.backgroundImage = `url('${card.front}')`;
        } else {
            cardElement.classList.add('back');
        }
        opponentHand.appendChild(cardElement);
    });
}


function selectCard(player, index) {
    if (player === 'player') {
        document.querySelectorAll('#player-hand .card')[index].classList.add('selected');
        
        if (!musicStarted) {
            playMusic();
        }

        playRound(index);
    }
}


function playRound(playerCardIndex) {
    checkForNewCards(); 

    const playerCard = playerDeck[playerCardIndex];
    
    let opponentCardIndex;
    do {
        opponentCardIndex = Math.floor(Math.random() * opponentDeck.length);
    } while (opponentDeck[opponentCardIndex].used); 

    const opponentCard = opponentDeck[opponentCardIndex];
    const opponentHand = document.getElementById('opponent-hand');
    const opponentCardElement = opponentHand.children[opponentCardIndex];
    opponentCardElement.classList.remove('back');
    opponentCardElement.style.backgroundImage = `url('${opponentCard.front}')`;

    const roundResult = document.getElementById('round-result');
    const roundImage = document.getElementById('round-image');


    if (playerCard.value > opponentCard.value) {
        roundResult.innerHTML = 'Você venceu a rodada!';
        playerScore++;
        roundImage.src = 'nao classico2.png';
    } else if (playerCard.value < opponentCard.value) {
        roundResult.innerHTML = 'O oponente venceu a rodada!';
        opponentScore++;
        roundImage.src = 'voce perdeu classico.png';
    } else {
        roundResult.innerHTML = 'Empate!';
        roundImage.src = 'empate.png';
    }

  
    playerDeck[playerCardIndex].used = true;
    opponentDeck[opponentCardIndex].used = true;

  
    checkVictory();

    roundCounter++;
    document.getElementById('next-round-btn').disabled = false;

 
    updateHealthBars();

 
    renderHands();
}

function checkForNewCards() {
    const remainingPlayerCards = playerDeck.filter(card => !card.used).length;
    const remainingOpponentCards = opponentDeck.filter(card => !card.used).length;


    if (remainingPlayerCards === 1 || remainingOpponentCards === 1) {
        alert('Uma carta restante! Substituindo por um novo conjunto de 14 cartas.');
        replaceUsedCards(14);  
    }
}

function replaceUsedCards(numberOfCards) {
    const deck = initializeDeck(); 

   
    playerDeck = deck.slice(0, numberOfCards);

  
    opponentDeck = deck.slice(numberOfCards, numberOfCards * 2);

    renderHands(); 
}

function redistributeCards() {
    const deck = initializeDeck();
    playerDeck = deck.slice(0, 15); 
    opponentDeck = deck.slice(15, 30); 
    renderHands(); 
}


function checkVictory() {
    if (playerScore === 15) {
        alert('Você venceu o jogo!');
        window.location.href = 'ganhamos.html'; 
    } else if (opponentScore === 15) {
        alert('O oponente venceu o jogo!');
        window.location.href = 'não deu classic 1.html'; 
    }
}


function resetGame() {
    dealCards();
    playerScore = 0;
    opponentScore = 0;
    roundCounter = 0;
    document.getElementById('round-image').src = '';
}


function updateHealthBars() {
    const playerProgress = document.getElementById('player-progress');
    const opponentProgress = document.getElementById('opponent-progress');
    
    
    playerProgress.style.width = `${(playerScore / 15) * 100}%`;
    opponentProgress.style.width = `${(opponentScore / 15) * 100}%`;
}


document.getElementById('next-round-btn').onclick = function () {
    if (roundCounter >= 15) {
        alert('Fim do jogo! Reiniciando...');
        resetGame();
    } else {
        document.getElementById('next-round-btn').disabled = true;
    }
};


dealCards();
