import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { blue, white } from '../utils/colors'

export default class Question extends Component {

  constructor (props) {
    super(props)
    this.state = {
      qaToggle: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.question !== this.props.question) {
      this.setState({
        qaToggle: false
      })
    }
  }

  render(){
    const { question, answer } = this.props
    const { qaToggle } = this.state

    return (
      <View style={styles.deck}>
        <View>
          {
            !qaToggle && (
              <Text style={styles.title}>
                {question}
              </Text>
            )
          }
          {
            qaToggle && (
              <Text style={styles.title}>
                {answer}
              </Text>
            )
          }
        </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <TouchableOpacity
              style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
              onPress={() => this.setState({ qaToggle: !qaToggle})}>
              <Text style={styles.BtnText}>
                {qaToggle ? 'Show Question' : 'Show Answer' }
              </Text>
            </TouchableOpacity>
          </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: blue,
    fontSize: 24,
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
    width: 120,
    height: 25,
    marginTop: 15,
    alignSelf: 'center'
  },
  AndroidBtn: {
    backgroundColor: blue,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: 120,
    height: 25,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnText: {
    color: white,
    fontSize: 11,
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
