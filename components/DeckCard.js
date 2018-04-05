import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {gray, blue} from '../utils/colors'

export default function DeckCard({ id, title, questions}) {
  return (
    <View>
    {
      <View style={styles.metric}>
          <Text style={{
              color: blue,
              fontSize: 25
            }}>
            {title}
          </Text>
          <Text style={{
              fontSize: 16,
              color: gray,
              marginTop: 10
            }}>
            {questions.length} Cards
          </Text>
        </View>
    }
  </View>)
}

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'column',
    marginTop: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
