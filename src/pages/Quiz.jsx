import { useState } from "react";


const cards = [
  { question: "Which nation does Aang belong to?", answer: "Air Nation", difficulty: "Easy" },
  { question: "Who is the last Airbender and the Avatar during the Hundred Year War?", answer: "Aang", difficulty: "Easy" },
  { question: "What animal companion can fly and carries Team Avatar around the world?", answer: "Appa", difficulty: "Easy" },
  { question: "Who is the Fire Nation prince that spends most of the series hunting the Avatar before changing sides?", answer: "Prince Zuko", difficulty: "Easy" },
  { question: "Which blind earthbender invented metalbending?", answer: "Toph", difficulty: "Easy" },
  { question: "What powerful comet greatly increases firebending abilities during the final battle?", answer: "Sozin's Comet", difficulty: "Medium" },
  { question: "Who becomes the Avatar after Aang?", answer: "Korra", difficulty: "Easy" },
  { question: "What is the name of the city where most of Korra’s early adventures take place?", answer: "Republic City", difficulty: "Medium" },
  { question: "What rare bending ability allows someone to control another person's body using water?", answer: "Blood Bending", difficulty: "Hard" },
  { question: "Which Avatar created Republic City after the Hundred Year War?", answer: "Avatar Aang", difficulty: "Medium" },
  { question: "What spirit becomes permanently connected with the Avatar as the spirit of light and peace?", answer: "Raava", difficulty: "Hard" },
  { question: "Which Avatar lived long before Aang and was famous for being extremely strict about justice?", answer: "Avatar Kyoshi", difficulty: "Medium" }
];

function Quiz() {

  const [displayCards, setDisplayCards] = useState(cards);
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [guess, setGuess] = useState("");

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const [masteredCards, setMasteredCards] = useState([]);

  const normalize = (str) =>
    str.toLowerCase().replace(/[^\w\s]/gi, "").trim();

  const submitGuess = () => {
    const correctAnswer = normalize(displayCards[cardIndex].answer);
    const userGuess = normalize(guess);

    if (
      correctAnswer.includes(userGuess) ||
      userGuess.includes(correctAnswer)
    ) {
      alert("Correct!");

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);

      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      alert("Incorrect!");
      setCurrentStreak(0);
    }

    setGuess("");
  };

  const nextCard = () => {
    if (cardIndex < displayCards.length - 1) {
      setCardIndex(cardIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
      setShowAnswer(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...displayCards].sort(() => Math.random() - 0.5);
    setDisplayCards(shuffled);
    setCardIndex(0);
    setShowAnswer(false);
  };

  const markMastered = () => {
    const mastered = displayCards[cardIndex];

    setMasteredCards([...masteredCards, mastered]);

    const newCards = displayCards.filter((_, index) => index !== cardIndex);
    setDisplayCards(newCards);

    if (cardIndex >= newCards.length) {
      setCardIndex(Math.max(0, newCards.length - 1));
    }

    setShowAnswer(false);
  };

  return (
    <div>

      <div className="body">

        {displayCards.length > 0 ? (
          <p>
            Question {cardIndex + 1} of {displayCards.length} | Difficulty:{" "}
            {displayCards[cardIndex].difficulty}
          </p>
        ) : (
          <p>🎉 You mastered all cards!</p>
        )}

        <p>
          Current Streak: {currentStreak} | Longest Streak: {longestStreak}
        </p>

        <button onClick={shuffleCards}>Shuffle Cards</button>

        <div className="container">

          {displayCards.length > 0 && (
            <div
              className={`card ${displayCards[cardIndex].difficulty}`}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <h3>
                {showAnswer
                  ? displayCards[cardIndex].answer
                  : displayCards[cardIndex].question}
              </h3>

              {!showAnswer && displayCards[cardIndex].questionImage && (
                <img
                  src={displayCards[cardIndex].questionImage}
                  alt="card visual"
                />
              )}
            </div>
          )}

          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your guess..."
          />

          <button onClick={submitGuess}>Submit</button>

          <button onClick={prevCard}>Previous</button>
          <button onClick={nextCard}>Next</button>

          <button
            onClick={markMastered}
            disabled={displayCards.length === 0}
          >
            Mark as Mastered
          </button>

          <div className="mastered-section">
            <h3>Mastered Cards</h3>

            {masteredCards.length === 0 && <p>No cards mastered yet.</p>}

            <ul>
              {masteredCards.map((card, index) => (
                <li key={index}>
                  <strong>Q:</strong> {card.question} <br />
                  <strong>A:</strong> {card.answer}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Quiz;