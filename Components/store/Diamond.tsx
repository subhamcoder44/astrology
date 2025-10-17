import { StyleSheet, View } from 'react-native'
import React from 'react'
import Store_home from './Store_home'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigator'

const Diamond = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, "Diamond">) => {
  return (
    <View style={styles.container}>
      <Store_home navigation={navigation as any} route={route as any} />
    </View>
  )
}

export default Diamond

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  }
})