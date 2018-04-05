import {
  FETCH_DECKS,
  FETCH_SINGLE_DECK,
  SUBMIT_DECK,
  SUBMIT_CARD,
  DECK_DETAILS
} from '../actions'

function decks (state = {}, action) {
  switch (action.type){
    case FETCH_DECKS :
      return action.decks;
    case FETCH_SINGLE_DECK :
      return Object.keys(state).map(key => state[key].id === action.id && state[key]).filter(e => e)[0]
    case SUBMIT_DECK :
      return {
        ...state,
        ...action.deck
      };
    case SUBMIT_CARD :
      const { title, questions, question, answer } = action.params;
      const newQuestions = JSON.parse(JSON.stringify(questions)).concat([ { question, answer } ]);
        return {
          ...state,
          [title]: {
            ...state[title],
            questions: newQuestions
          },
        };
    default :
      return state
  }
}

export default decks;
