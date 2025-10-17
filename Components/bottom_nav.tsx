import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const bottom_nav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <Image 
        source={require('../Components/home__nav.png')}
        style={styles.home__nav}
      />
      <Pressable onPress={()=>navigation.navigate('AiChatBot' as never)}>
      <Image
      source={require('../Components/ai.png')}
      style={styles.ai}
      />
      </Pressable>
      <Pressable onPress={() =>navigation.navigate('Diamond' as never)  }>
      <Image
      source={require('../Components/diamon.jpg')}
        style={styles.login}
      />
      </Pressable>
    </View>
  )
}

export default bottom_nav

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70, // or any fixed height you prefer
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'grey',
    },
//     icon: {
//     width: 32,    // set your desired width
//     height: 32,   // set your desired height
//     resizeMode: 'contain',
//   },
  home__nav: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  ai: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
     login: {
    width: 40,
    height: 39,
    resizeMode: 'contain',
  },
})