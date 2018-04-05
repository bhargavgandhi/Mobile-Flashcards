import {AsyncStorage} from 'react-native'
import {getMetricMetaInfo} from './helpers'

export const DATA_STORAGE_KEY = 'MobileFlashcards:Deck'

let decks = {
  React: {
    id: 1,
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      }, {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  Javascript: {
    id: 2,
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Redux: {
    id: 3,
    title: 'Redux',
    questions: [
      {
        question: 'What is Redux?',
        answer: 'A library for managing state in your application.'
      }, {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
}

export function initDecks () {
  AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(decks))
  return decks;
}
export function getDecks (results) {
  return results === null
    ? initDecks()
    : JSON.parse(results)
}

export function getDeck (id) {
  return decks[id];
}

export function saveDeckTitle (title) {
  return decks.push(title)
}

export function addCardToDeck (title, card) {
  return decks[title].questions.push(card)
}

// getDecks: return all of the decks along with their titles, questions, and answers.

// getDeck: take in a single id argument and return the deck associated with that id.

// saveDeckTitle: take in a single title argument and add it to the decks.

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
