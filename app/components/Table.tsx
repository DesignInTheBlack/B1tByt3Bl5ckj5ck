'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Player from './Player';
import HandView from './HandView';
import { cardService } from '../../lib/api/cardService';

function Table() {
  // Game state variables
  const [deckId, setDeckId] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [houseScore, setHouseScore] = useState(0);
  const [gameState, setGameState] = useState('Initial');
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [houseHand, setHouseHand] = useState<string[]>([]);

  // Convert card values to numeric scores
  function convertCardValueToNumber(value: string | number, playerScore: number) {
    if (value === "KING" || value === "JACK" || value === "QUEEN") return 10;
    if (value === "ACE") return playerScore + 11 <= 21 ? 11 : 1;
    return typeof value === 'number' ? value : parseInt(value, 10);
  }

  // Reset the game state
  const resetGame = () => {
    setPlayerScore(0);
    setHouseScore(0);
    setGameState('Initial');
    setPlayerHand([]);
    setHouseHand([]);
  };

  // Draw a card for the house
  const HouseDraw = async () => {
    const nextCard = await cardService.drawCard(deckId, 1);
    const nextValue = convertCardValueToNumber(nextCard.cards[0].value, playerScore);
    const nextImage = nextCard.cards[0].image;
    setHouseHand(prevHand => [...prevHand, nextImage]);
    setHouseScore(prevScore => prevScore + nextValue);
  }

  // Draw a card for the player
  const Hit = async () => {
    const nextCard = await cardService.drawCard(deckId, 1);
    const nextValue = convertCardValueToNumber(nextCard.cards[0].value, playerScore);
    const nextImage = nextCard.cards[0].image;
    setPlayerHand(prevHand => [...prevHand, nextImage]);
    setPlayerScore(prevScore => {
      const newScore = prevScore + nextValue;
      if (newScore > 21) setGameState('lost');
      return newScore;
    });
  }

  // Player chooses to wait, triggers end of round
  const Wait = async () => {
    // Check if player has won
    if (playerScore <= 21 && (playerScore > houseScore || houseScore > 21)) {
      setGameState('won');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Delay for 2 seconds
    }
    
    await cardService.resetAndShuffle(deckId); // Reset and shuffle the deck
    resetGame(); // Reset game state
    
    // Start a new round if a deck is available
    if (deckId) {
      await HouseDraw();
      await HouseDraw();
      await Hit();
      await Hit();
    }
  }

  // Initialize the game when the component mounts
  useEffect(() => {
    const initializeGame = async () => {
      try {
        const newDeck = await cardService.newDeck();
        setDeckId(newDeck.deck_id);
      } catch (error) {
        console.error("Error initializing game:", error);
      }
    };
    initializeGame();
  }, []);

  // Initial deal when the deck is ready
  useEffect(() => {
    if (deckId) {
      HouseDraw();
      HouseDraw();
      Hit();
      Hit();
    }
  }, [deckId]);

  // Render the game UI
  return (
    <div className="w-full">
      <h1 className="text-center text-4xl">
        {gameState === 'lost' ? "You've Lost. Click Stand to Go Again!" :
          gameState === 'won' ? "You've Won. We'll Begin Again Shortly..." :
            "B1tByt3 Bl5ckj5ck"}
      </h1>
      <div className="flex flex-row justify-between w-full mb-4">
        <h1>{playerScore}</h1>
        <h1>{houseScore}</h1>
      </div>
      <HandView playerHand={playerHand} houseHand={houseHand} />
      <Player onHit={Hit} onWait={Wait} current={gameState} />
    </div>
  );
}

export default Table;