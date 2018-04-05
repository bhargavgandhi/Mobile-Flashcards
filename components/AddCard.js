import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import {
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification,
 } from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'
import { submitCard } from '../utils/api'
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

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add new card',
  })

  constructor (props) {
    super(props)
    this.state = {
      id: this.props.navigation.state.params.id,
      title: this.props.navigation.state.params.title,
      question: '',
      answer: '',
      isQueFilled: false,
      isAnsFilled: false
    }
  }

  onQueChange = (question) => {
    const isQueFilled =  question.length > 0 || false
    this.setState({ question, isQueFilled })
  }
  onAnsChange = (answer) => {
    const isAnsFilled =  answer.length > 0 || false
    this.setState({ answer, isAnsFilled })
  }

  submit = () => {
    const { id, title, question, answer } = this.state
    const newQue = {
      question,
      answer
    }

    this.toCardHome(id)

    submitCard(id, question, answer)

    this.setState({
      question: '',
      answer: ''
    })

    clearLocalNotification()
      .then(setLocalNotification)
  }

  toCardHome = (id) => {
    this.props.navigation.state.params.updateData(id)
    this.props.navigation.goBack()
  }
  render() {
    const { title, question, answer } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>
            Enter New Question Answer for {title}
          </Text>
          <TextInput
            placeholder='Type Question here...?'
            value={question}
            style={styles.input}
            onChangeText={this.onQueChange}
          />
          <TextInput
            placeholder='Type Answer here...'
            value={answer}
            style={styles.input}
            onChangeText={this.onAnsChange}
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


export default AddCard
