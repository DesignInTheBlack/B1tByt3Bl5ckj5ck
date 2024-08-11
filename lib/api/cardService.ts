const BASE_URL = 'https://deckofcardsapi.com/api/deck';

export const cardService = {
  newDeck: async () => {
    const response = await fetch(`${BASE_URL}/new/shuffle/?deck_count=6`);
    return response.json();
  },

  drawCard: async (deckId: string, count: number = 1) => {
    const response = await fetch(`${BASE_URL}/${deckId}/draw/?count=${count}`);
    return response.json();
  },

  resetDeck: async (deckId: string) => {
    const response = await fetch(`${BASE_URL}/${deckId}/return/`);
    return response.json();
  },

  shuffleDeck: async (deckId: string) => {
    const response = await fetch(`${BASE_URL}/${deckId}/shuffle/`);
    return response.json();
  },

  resetAndShuffle: async (deckId: string) => {
    await cardService.resetDeck(deckId);
    return cardService.shuffleDeck(deckId);
  }
};