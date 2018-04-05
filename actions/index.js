export const FETCH_DECKS = 'FETCH_DECKS'
export const FETCH_SINGLE_DECK = 'FETCH_SINGLE_DECK'
export const SUBMIT_DECK = 'SUBMIT_DECK'
export const SUBMIT_CARD = 'SUBMIT_CARD'
export const DECK_DETAILS = 'DECK_DETAILS'

export function fetchDecks(decks) {
  return {
    type: FETCH_DECKS,
    decks,
  }
}

export function fetchSingleDeck(id) {
  return {
    type: FETCH_SINGLE_DECK,
    id,
  }
}

export function submitDeck(deck) {
  return {
    type: SUBMIT_DECK,
    deck,
  }
}

export function submitNewCard(params) {
  return {
    type: SUBMIT_CARD,
    params
  }
}

export function deckDetails(deck) {
  return {
    type: DECK_DETAILS,
    deck,
  }
}
