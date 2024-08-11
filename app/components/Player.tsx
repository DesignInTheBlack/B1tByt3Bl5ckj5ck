'use client';

import React from 'react';

// Define the props for the Player component
interface PlayerProps {
  onHit: () => void;
  onWait: () => void;
  current: string;
}

function Player({ onHit, onWait, current }: PlayerProps) {
  return (
    <div>
      <div className="flex flex-row mt-4 justify-center">
        {/* Render the "Stand" button */}
        <button className="bg-[#2E236C] px-4 py-3 mr-2" onClick={onWait}>
          Stand
        </button>
        {/* Conditionally render the "Hit" button if the current state is not 'lost' */}
        {current !== 'lost' && (
          <button className="bg-[#C8ACD6] px-4 py-3 ml-2" onClick={onHit}>
            Hit
          </button>
        )}
      </div>
    </div>
  );
}

export default Player;