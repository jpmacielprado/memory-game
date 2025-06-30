
  const cardsContainer = document.querySelector(".cards");
  const timerElement = document.getElementById("timer");
  let cards = Array.from(document.querySelectorAll(".card"));
  let flippedCards = [];
  let matched = 0;
  const totalPairs = cards.length / 2;
  let timeLeft = 60; // segundos
  let timer;

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Tempo: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(false);
      }
    }, 1000);
  }

  function endGame(won) {
    setTimeout(() => {
      alert(won ? "🎉 Você venceu!" : "⏰ Tempo esgotado!");
      location.reload(); // reinicia o jogo
    }, 500);
  }

  function shuffleCards() {
    // Embaralha usando Fisher-Yates
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    cards.forEach(card => cardsContainer.appendChild(card));
  }

 function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.card === card2.dataset.card;

  if (isMatch) {
    setTimeout(() => {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matched++;
      flippedCards = [];

      if (matched === totalPairs) {
        clearInterval(timer);
        endGame(true);
      }
    }, 600);
    
  } else {
    setTimeout(() => {
      card1.classList.add("shake");
      card2.classList.add("shake");

      setTimeout(() => {
        card1.classList.remove("shake");
        card2.classList.remove("shake");

        card1.classList.remove("flipped");
        card2.classList.remove("flipped");

        flippedCards = [];
      }, 400); // duração da vibração
    }, 600); // espera o tempo da animação flip
  }
}

  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (
        flippedCards.length < 2 &&
        !card.classList.contains("flipped") &&
        !card.classList.contains("matched")
      ) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          checkMatch();
        }
      }
    });
  });

  // Inicializa o jogo
  shuffleCards();
  startTimer();

