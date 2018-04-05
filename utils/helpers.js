import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'


export function getDailyReminderValue () {
  return {
    today: "👋 Don't forget to log your data today!"
  }
}
export function guid() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

// To manage your AsyncStorage database, you'll want to create four different helper methods.
//
// getDecks: return all of the decks along with their titles, questions, and answers.

// getDeck: take in a single id argument and return the deck associated with that id.

// saveDeckTitle: take in a single title argument and add it to the decks.

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to log your stats for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMintutes(0)

              Notifications.scheduleLocalNotificationsAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
