import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions'
import { blue, white } from '../utils/colors'
import DeckCard from './DeckCard'
import { fetchInitialData } from '../utils/api'

class DeckDetails extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Deck Details',
  })

  state = {
    activeDeck: '',
    deck: this.props.navigation.state.params.deck,
    decks: this.props.decks
  }

  // componentDidMount() {
  //   this.updateDecks();
  // }
  //
  // updateDecks () {
  //   fetchInitialData()
  //     .then((data) => {
  //       this.setState(() => ({
  //         decks: data
  //       }))
  //       this.props.dispatch(fetchDecks(data))
  //     }
  //   )
  // }

  render() {
    const { activeDeck, deck } = this.state
    const { decks } = this.props
    const currentDeck = Object.keys(decks).map(key => decks[key].id === deck.id && decks[key]).filter(d => d)[0]
    const { id, title, questions } = currentDeck

    return (
      <View style={styles.container}>
        {currentDeck &&
          <View style={styles.deck}>
            <DeckCard
              { ...currentDeck } />
          </View>
        }
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { id, title, questions }
            )}>
              <Text style={styles.BtnText}>ADD CARD</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
            onPress={() => this.props.navigation.navigate(
              'Quiz',
              { currentDeck }
            )}>
              <Text style={styles.BtnText}>START QUIZ</Text>
          </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  deck: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios'
      ? 16
      : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  iosBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    width: 200,
    height: 45,
    marginTop: 15,
    alignSelf: 'center'
  },
  AndroidBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: 200,
    height: 45,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckDetails);
