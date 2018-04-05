import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import {
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification,
  guid,
} from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'
import { submitEntry, removeEntry } from '../utils/api'
import { blue, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}
class AddDeck extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: guid(),
      title: '',
      isFilled: false,
    }
  }
  onTitleChange = (title) => {
    const isFilled = title.length > 0 || false
    this.setState({ title, isFilled })
  }

  submit = () => {
    const { id, title } = this.state
    const newDeck = {
      [title]: {
        id,
        title,
        questions: []
      }
    }

    this.toHome()

    submitEntry({ newDeck })

    clearLocalNotification()
      .then(setLocalNotification)
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }
  render() {
    const { title } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>
            Please Add Title for New Deck
          </Text>
          <TextInput
            placeholder='Type Deck Title here...'
            value={title}
            style={styles.input}
            onChangeText={this.onTitleChange}
          />
        </View>
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
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


export default AddDeck
