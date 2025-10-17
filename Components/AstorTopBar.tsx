import { StyleSheet, Text, View ,Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const AstorTopBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Kundli_Form' as never)}>
        <Image 
          source={require('../Images/kundli.jpg')}
          style={styles.kundli}
        /> 
      </Pressable>
      <Image 
      source={require('../Images/love.jpg')}
      style={styles.love}
      />
    <Image 
      source={require('../Images/horos.jpg')}
      style={styles.horos}
      />    
    </View>
  )
}

export default AstorTopBar

// ...existing code...
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    borderRadius: 13,
    margin: 2,
    display: 'flex',
    flexDirection: 'row', // <-- set row direction
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  horos: {
    width: 80, // set fixed width
    height: 80,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  love: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  kundli: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
});
// ...existing code...