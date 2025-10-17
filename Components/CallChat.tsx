import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CallChat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Call & Chat</Text>
    </View>
  )
}

export default CallChat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
})
