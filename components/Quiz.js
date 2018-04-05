import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import Question from './Question'
import { blue, white, red, green } from '../utils/colors'

export default class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Quiz',
  })

  constructor (props) {
    super(props)
    this.state = {
      deck: this.props.navigation.state.params.currentDeck,
      questions: '',
      correct: 0,
      incorrect: 0,
      currentQue: 1,
      maxQue: 0,
      ended: false
    }
  }

  componentWillMount() {
    const { deck } = this.state
    const questions = deck.questions
    const maxQue = questions.length

    this.setState({
      questions,
      maxQue
    })
  }

  endQuiz(){
    this.setState({
      ended: true
    })
  }

  moveQuestion() {
    let { questions, currentQue, maxQue } = this.state

    currentQue < maxQue && this.setState({
      currentQue: currentQue + 1
    })
  }

  handleAnswer (type) {
    const { correct, incorrect, currentQue, maxQue } = this.state
    let { questions } = this.state

    currentQue === maxQue ? this.endQuiz() : this.moveQuestion()

    type === 'correct' && this.setState({correct:correct+1})
    type === 'incorrect' && this.setState({incorrect:incorrect+1})

  }

  restartQuiz() {
    this.setState({
      questions: this.state.deck.questions,
      correct: 0,
      incorrect: 0,
      currentQue: 1,
      maxQue: this.state.deck.questions.length,
      ended: false,
    })
  }

  toCardHome() {
    this.props.navigation.goBack()
  }

  render() {
    const {
      questions,
      correct,
      incorrect,
      currentQue,
      maxQue,
      ended
    } = this.state

    if (!ended) {
          return (
          <View>
            <Text style={styles.pager}>{ currentQue } / { maxQue} </Text>
            <Question
              question={questions[currentQue-1].question}
              answer={questions[currentQue-1].answer}
            />


              <View>
                <TouchableOpacity
                  style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.AndroidCorrectBtn}
                  onPress={() =>
                  this.handleAnswer('correct')
                }>
                  <Text style={styles.BtnText}>Correct</Text>
                </TouchableOpacity>


                <TouchableOpacity
                  style={Platform.OS === 'ios' ? styles.iosIncorrectBtn : styles.AndroidIncorrectBtn}
                  onPress={() =>
                  this.handleAnswer('incorrect')
                }>
                  <Text style={styles.BtnText}>Incorrect</Text>
                </TouchableOpacity>
              </View>

          </View>
        )} else {
          return (
          <View style={styles.container}>
            <Text style={styles.mainHeader}>Results:</Text>
            <Text style={styles.headers}>Correct: {correct}</Text>
            <Text style={styles.headers}>Incorrect: {incorrect}</Text>

            <View>
              <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
                onPress={() => this.restartQuiz()}>
                <Text style={styles.BtnText}>
                  Restart Quiz
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
                onPress={() => this.toCardHome()}>
                <Text style={styles.BtnText}>
                  Back to Deck View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    alignItems: 'center',
  },
  pager: {
    color: blue,
    fontSize: 14,
    padding: 10,
  },
  mainHeader: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  headers: {
    marginTop: 15,
    marginBottom: 40,
    color: blue,
    fontSize: 18,
    fontWeight: 'bold'
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
    padding: 5,
    borderRadius: 5,
    width: 200,
    height: 35,
    marginTop: 15,
    alignSelf: 'center'
  },
  AndroidBtn: {
    backgroundColor: blue,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: 200,
    height: 35,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },


  iosCorrectBtn: {
    backgroundColor: green,
    padding: 5,
    borderRadius: 5,
    width: 200,
    height: 35,
    marginTop: 15,
    alignSelf: 'center'
  },
  AndroidCorrectBtn: {
    backgroundColor: green,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: 200,
    height: 35,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },


  iosIncorrectBtn: {
    backgroundColor: red,
    padding: 5,
    borderRadius: 5,
    width: 200,
    height: 35,
    marginTop: 15,
    alignSelf: 'center'
  },
  AndroidIncorrectBtn: {
    backgroundColor: red,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: 200,
    height: 35,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
})
