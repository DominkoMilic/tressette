import "./App.css";
import { useState } from "react";
import SingleCard from "./components/SingleCard";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Home from "./pages/home";

const CardValues = [
  { number: 1, suit: "denari", open: false, player: undefined, trueValue: 8 },
  { number: 2, suit: "denari", open: false, player: undefined, trueValue: 9 },
  { number: 3, suit: "denari", open: false, player: undefined, trueValue: 10 },
  { number: 4, suit: "denari", open: false, player: undefined, trueValue: 1 },
  { number: 5, suit: "denari", open: false, player: undefined, trueValue: 2 },
  { number: 6, suit: "denari", open: false, player: undefined, trueValue: 3 },
  { number: 7, suit: "denari", open: false, player: undefined, trueValue: 4 },
  { number: 11, suit: "denari", open: false, player: undefined, trueValue: 5 },
  { number: 12, suit: "denari", open: false, player: undefined, trueValue: 6 },
  { number: 13, suit: "denari", open: false, player: undefined, trueValue: 7 },
  { number: 1, suit: "spade", open: false, player: undefined, trueValue: 8 },
  { number: 2, suit: "spade", open: false, player: undefined, trueValue: 9 },
  { number: 3, suit: "spade", open: false, player: undefined, trueValue: 10 },
  { number: 4, suit: "spade", open: false, player: undefined, trueValue: 1 },
  { number: 5, suit: "spade", open: false, player: undefined, trueValue: 2 },
  { number: 6, suit: "spade", open: false, player: undefined, trueValue: 3 },
  { number: 7, suit: "spade", open: false, player: undefined, trueValue: 4 },
  { number: 11, suit: "spade", open: false, player: undefined, trueValue: 5 },
  { number: 12, suit: "spade", open: false, player: undefined, trueValue: 6 },
  { number: 13, suit: "spade", open: false, player: undefined, trueValue: 7 },
  { number: 1, suit: "bastoni", open: false, player: undefined, trueValue: 8 },
  { number: 2, suit: "bastoni", open: false, player: undefined, trueValue: 9 },
  { number: 3, suit: "bastoni", open: false, player: undefined, trueValue: 10 },
  { number: 4, suit: "bastoni", open: false, player: undefined, trueValue: 1 },
  { number: 5, suit: "bastoni", open: false, player: undefined, trueValue: 2 },
  { number: 6, suit: "bastoni", open: false, player: undefined, trueValue: 3 },
  { number: 7, suit: "bastoni", open: false, player: undefined, trueValue: 4 },
  { number: 11, suit: "bastoni", open: false, player: undefined, trueValue: 5 },
  { number: 12, suit: "bastoni", open: false, player: undefined, trueValue: 6 },
  { number: 13, suit: "bastoni", open: false, player: undefined, trueValue: 7 },
  { number: 1, suit: "coppe", open: false, player: undefined, trueValue: 8 },
  { number: 2, suit: "coppe", open: false, player: undefined, trueValue: 9 },
  { number: 3, suit: "coppe", open: false, player: undefined, trueValue: 10 },
  { number: 4, suit: "coppe", open: false, player: undefined, trueValue: 1 },
  { number: 5, suit: "coppe", open: false, player: undefined, trueValue: 2 },
  { number: 6, suit: "coppe", open: false, player: undefined, trueValue: 3 },
  { number: 7, suit: "coppe", open: false, player: undefined, trueValue: 4 },
  { number: 11, suit: "coppe", open: false, player: undefined, trueValue: 5 },
  { number: 12, suit: "coppe", open: false, player: undefined, trueValue: 6 },
  { number: 13, suit: "coppe", open: false, player: undefined, trueValue: 7 },
];

function App() {
  const [cards, setCards] = useState([]);

  const [selectedCard1] = useState(null);

  const [playerOneDeck, setPlayerOneDeck] = useState([]);
  const [playerTwoDeck, setPlayerTwoDeck] = useState([]);

  const [tableCards, setTableCards] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);

  let [playerTwoTurn, setPlayerTwoTurn] = useState(false);

  let [playerOnePoints, setPlayerOnePoints] = useState(0);
  let [playerTwoPoints, setPlayerTwoPoints] = useState(0);

  const newGame = () => {
    setTableCards([]);
    setPlayerTwoTurn(true);
    setPlayerOnePoints(0);
    setPlayerTwoPoints(0);
    shuffleCards();
    openPlayerCards();
  };

  const shuffleCards = () => {
    const shuffleCards = [...CardValues]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);

    firstCardDealing(shuffleCards);
  };

  const firstCardDealing = (shuffleCards) => {
    const deck1 = [];
    const deck2 = [];

    for (let i = 0; i < 20; i++) {
      if (i % 2 === 0) deck1.push(shuffleCards.shift());
      else deck2.push(shuffleCards.shift());
    }

    deck1.forEach((element) => {
      element.player = "playerOne";
    });
    deck2.forEach((element) => {
      element.player = "playerTwo";
    });

    setPlayerOneDeck(deck1);
    setPlayerTwoDeck(deck2);
    setCards((prevDeck) => prevDeck.map((card) => ({ ...card, open: true })));

    openPlayerCards(playerTwoTurn);
  };

  const dealingNewCard = () => {
    if (cards.length < 2) return false;

    const newCardForPlayerOne = cards[0];
    const newCardForPlayerTwo = cards[1];

    setTableCards((prevDeck) => [newCardForPlayerOne, newCardForPlayerTwo]);
    setTableCards([]);

    newCardForPlayerOne.player = "playerOne";
    newCardForPlayerTwo.player = "playerTwo";

    setDrawnCards([
      { ...newCardForPlayerOne, player: undefined, open: false },
      { ...newCardForPlayerTwo, player: undefined, open: false },
    ]);

    setTimeout(() => {
      closeNewCards();
    }, 2000);

    const remainingCards = cards.slice(2);

    setPlayerOneDeck((prevDeck) => [...prevDeck, newCardForPlayerOne]);
    setPlayerTwoDeck((prevDeck) => [...prevDeck, newCardForPlayerTwo]);

    setCards(remainingCards);

    return true;
  };

  const openPlayerCards = (condition) => {
    if (condition) {
      setPlayerOneDeck((prevDeck) =>
        prevDeck.map((card) => ({ ...card, open: true, player: "playerOne" }))
      );
      setPlayerTwoDeck((prevDeck) =>
        prevDeck.map((card) => ({ ...card, open: false, player: "playerTwo" }))
      );
    } else {
      setPlayerTwoDeck((prevDeck) =>
        prevDeck.map((card) => ({ ...card, open: true, player: "playerTwo" }))
      );
      setPlayerOneDeck((prevDeck) =>
        prevDeck.map((card) => ({ ...card, open: false, player: "playerOne" }))
      );
    }
  };

  const closeNewCards = () => {
    setDrawnCards([]);
  };

  const closeAllCards = () => {
    setPlayerOneDeck((prevDeck) =>
      prevDeck.map((card) => ({ ...card, open: true }))
    );
    setPlayerTwoDeck((prevDeck) =>
      prevDeck.map((card) => ({ ...card, open: true }))
    );
  };

  const doesPlayerHaveSuit = (card) => {
    let temp;
    if (playerTwoTurn) {
      temp = playerOneDeck.find((element) => element.suit === card.suit);
      if (temp) return true;
      else return false;
    } else {
      temp = playerTwoDeck.find((element) => element.suit === card.suit);
      if (temp) return true;
      else return false;
    }
  };

  const handleChoice = (card) => {
    if (
      (playerTwoTurn && card.player === "playerOne") ||
      (!playerTwoTurn && card.player === "playerTwo")
    ) {
      const newTableDeck = [
        ...tableCards,
        { ...card, open: true, player: undefined },
      ];
      if (
        (newTableDeck.length === 2 && newTableDeck[0].suit === card.suit) ||
        newTableDeck.length === 1 ||
        !doesPlayerHaveSuit(newTableDeck[0])
      ) {
        setTableCards(newTableDeck);
        setPlayerOneDeck(removeCardFromDeck(playerOneDeck, card));
        setPlayerTwoDeck(removeCardFromDeck(playerTwoDeck, card));

        closeAllCards();

        setTimeout(() => {
          let nextTurn = cycleEnd(newTableDeck);
          let newTurn;
          if (nextTurn === playerTwoTurn) {
            setPlayerTwoTurn((prevTurn) => {
              newTurn = !prevTurn;
              openPlayerCards(!newTurn);
              return newTurn;
            });
          } else {
            setPlayerTwoTurn((prevTurn) => {
              newTurn = prevTurn;
              openPlayerCards(!newTurn);
              return newTurn;
            });
          }
        }, 2000);
      }
    }
  };

  const pointCalculation = (cardPlayerOne, cardPlayerTwo) => {
    if (cardPlayerOne.suit !== cardPlayerTwo.suit) return true;
    else if (cardPlayerOne.trueValue > cardPlayerTwo.trueValue) return true;
    else if (cardPlayerOne.trueValue < cardPlayerTwo.trueValue) return false;
  };

  const cycleEnd = (table) => {
    let nextTurn = playerTwoTurn;
    if (table.length === 2) {
      let points1 = 0;
      let points2 = 0;
      if (playerTwoTurn) {
        if (pointCalculation(table[0], table[1])) {
          points2 += pointsCounter(table[0]);
          points2 += pointsCounter(table[1]);
          nextTurn = true;
        } else {
          points1 += pointsCounter(table[0]);
          points1 += pointsCounter(table[1]);
          nextTurn = false;
        }
      } else {
        if (pointCalculation(table[0], table[1])) {
          points1 += pointsCounter(table[0]);
          points1 += pointsCounter(table[1]);
          nextTurn = false;
        } else {
          points2 += pointsCounter(table[0]);
          points2 += pointsCounter(table[1]);
          nextTurn = true;
        }
      }
      setTableCards([]);
      setPlayerOnePoints(points1 + playerOnePoints);
      setPlayerTwoPoints(points2 + playerTwoPoints);
      dealingNewCard();
      console.log("ukupno bodova ", playerOnePoints + playerTwoPoints);
      if (playerOnePoints + playerTwoPoints === 10 + 2 / 3) {
        if (nextTurn) setPlayerTwoPoints(Math.ceil(points2));
        else setPlayerOnePoints(Math.ceil(points1));
        const winner =
          playerOnePoints > playerTwoPoints ? "player 1 won" : "player 2 won";
        showResults(playerOnePoints, playerTwoPoints, winner);
      }
      return nextTurn;
    }
    return playerTwoTurn;
  };

  function showResults(points1, points2, winner) {
    alert(`Points 1: ${points1}\nPoints 2: ${points2}\nWinner: ${winner}`);
  }

  const pointsCounter = (card) => {
    if (card.number === 1) return 1;
    if (
      card.number === 2 ||
      card.number === 3 ||
      card.number === 11 ||
      card.number === 12 ||
      card.number === 13
    )
      return 1 / 3;
    return 0;
  };

  const removeCardFromDeck = (deck, card) => {
    const updatedDeck = deck.filter((element) => element !== card);
    return updatedDeck;
  };

  return (
    <div>
      <h1>Tresete</h1>
      <button onClick={newGame} className="new-game-btn">
        New Game
      </button>

      <h2>player 1 cards</h2>
      <div className="player-one-cards">
        <div className="card-grid">
          {playerOneDeck.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === selectedCard1 || card.open}
            />
          ))}
        </div>
      </div>

      <h2>table</h2>
      <div className="cards-on-table">
        <div className="card-grid">
          {tableCards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={false}
            />
          ))}
        </div>
      </div>

      <h2>player 2 cards</h2>
      <div className="player-two-cards">
        <div className="card-grid">
          {playerTwoDeck.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === selectedCard1 || card.open}
            />
          ))}
        </div>
      </div>

      <h2>drawn cards</h2>
      <div className="drawn-cards">
        <div className="card-grid">
          {drawnCards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === selectedCard1 || card.open}
            />
          ))}
        </div>
      </div>

      <div className="card-deck">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === selectedCard1 || card.open}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
