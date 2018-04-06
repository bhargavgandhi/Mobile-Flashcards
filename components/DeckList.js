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
import { connect } from 'react-redux';
import { fetchDecks } from '../actions';
import { getDailyReminderValue } from '../utils/helpers'
import { fetchInitialData } from '../utils/api'
import { blue, white } from '../utils/colors'
import DeckCard from './DeckCard'

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Decks',
  })

  state = {
    ready: false,
    decks: ''
  }

  componentDidMount() {
    this.updateDeckList();
  }

  updateDeckList() {

    fetchInitialData()
    .then((data) => this.props.dispatch(fetchDecks(data)))
    .then(() => this.setState(() => ({
      ready: true
    })))
  }

  render() {
    const { ready } = this.state
    let { decks } = this.props


    if (ready === false) {
      return <AppLoading />
    }

    return (
        <ScrollView>
          {decks &&
            Object.keys(decks).map((key, index) => (
              <View style={styles.deck} key={index}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                  'DeckDetails',
                  { deck: decks[key], id: decks[key].id}
                )}>
                  <DeckCard
                    { ...decks[key] }
                    />
                </TouchableOpacity>
              </View>
            )
          )
          }
        </ScrollView>
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

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList);
