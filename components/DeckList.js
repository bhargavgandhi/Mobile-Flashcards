import React, {Component} from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import { AppLoading } from 'expo'
import { getDailyReminderValue } from '../utils/helpers'
import { fetchInitialData } from '../utils/api'
import { blue, white } from '../utils/colors'
import DeckCard from './DeckCard'


export default class DeckList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Decks',
  })

  state = {
    ready: false,
    decks: ''
  }
  componentDidMount() {
    fetchInitialData().then((data) => this.setState(() => ({decks: data}))).then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const {ready} = this.state
    let {decks} = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <ScrollView>
          {decks &&
            Object.keys(decks).map((key, index) => (
              <View style={styles.deck} key={index}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                  'DeckDetails',
                  { deckId: decks[key].id}
                )}>
                  <DeckCard
                    {...decks[key]}
                    />
                </TouchableOpacity>
              </View>
            )
          )
          }
        </ScrollView>
      </View>
  )
  }

}

const styles = StyleSheet.create({
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
  }
})
