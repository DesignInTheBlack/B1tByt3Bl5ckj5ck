'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the props for the HandView component
interface HandViewProps {
  playerHand: string[];
  houseHand: string[];
}

const HandView: React.FC<HandViewProps> = ({ playerHand, houseHand }) => {
  return (
    <div
      className="flex flex-row pt-16 pb-16 w-full justify-between"
      style={{
        borderTop: '2px solid rgba(0, 0, 0, 0.25)',
        borderBottom: '2px solid rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Render the player's hand */}
      <div className="flex flex-row">
        <AnimatePresence>
          {playerHand.map((card, index) => (
            <motion.img
              key={index}
              src={card}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="drop-shadow-md"
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Render the house's hand. */}
      <div className="flex flex-row">
        <AnimatePresence>
          {houseHand.map((card, index) => (
            <motion.img
              key={index}
              src={card}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="drop-shadow-md"
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HandView;