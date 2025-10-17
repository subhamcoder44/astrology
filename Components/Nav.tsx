import { StyleSheet, Text, View,Image , Pressable} from 'react-native'
import React, { use } from 'react'
import { useNavigation } from '@react-navigation/native'
export default function Card() {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
     
      <Text style={styles.header}>GeoMax</Text>
      <Image
        source={require('../Components/shop_icon.jpg')}
        style={styles.logo}

      />
      <Pressable onPress={() => navigation.navigate('Login' as never)}>
        <Image 
          source={require('../Images/loginn.png')}
          style={styles.login}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffc107',
        padding: 22,
        borderRadius: 13,
        margin:2,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    header:{
        color: "white",
        fontSize: 18,
        fontWeight: 'bold'
    },
    logo:{
       width: 28,
       height: 28,
       borderRadius: 14,
    },

    button:{
        backgroundColor:"black",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    buttonText:{
        color:"white",
        fontSize: 16,
        fontWeight: 'bold'
    },
      login: {
    width: 40,
    height: 39,
    resizeMode: 'contain',
  },

})