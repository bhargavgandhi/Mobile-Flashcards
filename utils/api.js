import {AsyncStorage} from 'react-native';
import {DATA_STORAGE_KEY, getDecks} from './data';

export function fetchInitialData() {
  return AsyncStorage.getItem(DATA_STORAGE_KEY).then(getDecks)
}

export function fetchSingleDeck(id) {
  return AsyncStorage.getItem(DATA_STORAGE_KEY).then(results => JSON.parse(results)).then(data => Object.keys(data).map(key => data[key].id === id && data[key]).filter(e => e)[0])
}

export function submitEntry({newDeck}) {
  return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
    ...newDeck
  }))
}

export function submitCard(id, question, answer) {
  return AsyncStorage.getItem(DATA_STORAGE_KEY)
  .then((results) => JSON.parse(results))
  .then((decks) => Object.keys(decks).map((key) => {
    if (decks[key].id === id) {
      decks[key].questions.push({question, answer})
    }
    return decks[key]
  })).then((res) => {
    return AsyncStorage.removeItem(DATA_STORAGE_KEY).then(() => {
      return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        ...res
      }))
    })
  })

}

export function removeEntry(key) {
  return AsyncStorage.getItem(DATA_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
  })
}
