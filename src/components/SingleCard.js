import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="card-front" onClick={handleClick}>
          {card.number} of {card.suit}
        </div>
        <div className="card-back" onClick={handleClick}>
          &
        </div>
      </div>
    </div>
  );
}
