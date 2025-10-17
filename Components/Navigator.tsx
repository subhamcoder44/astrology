import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import kundli_Form from './Pages/kundli_Form';
import Nav from './Nav';
import BottomNav from './bottom_nav';
import Home from './home/Home';
import AstrologerBooking from './Pages/AstrologerBooking';
import Horoscope from './Pages/Horoscope';

import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './Pages/Login';
import SignIn from './Pages/singin';
import Diamond from './store/Diamond';
import Store_home from './store/Store_home';
import Store_details from './store/Store_details';




const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Nav />
      <Home />
      <BottomNav />
    </SafeAreaView>

  )
}
type Product = {
  id: string;
  phone_name: string;
  main_price: number;
  discount: string;
  final_price: number;
  details: string;
  image_url: string;
};
export type RootStackParamList = {
  Home: undefined;
  Store_home: undefined;
  Store_details: { item: any };
  Diamond: undefined;
  kundli_Form: undefined;
  Login: undefined;
  SignIn: undefined;
  AstrologerBooking: undefined;
  Horoscope: undefined;
};

const Navigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />

        <Stack.Screen name='kundli_Form' component={kundli_Form} options={{ title: 'Kundli Form' }} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Create account' }} />
        <Stack.Screen name='Diamond' component={Diamond} options={{ title: 'Diamond' }} />
        <Stack.Screen name='Store_home' component={Store_home} options={{ title: 'Diamond Store' }} />
        <Stack.Screen name='Store_details' component={Store_details} options={{ title: 'Product Details' }} />
        <Stack.Screen name='AstrologerBooking' component={AstrologerBooking} options={{ title: 'Book an Astrologer' }} />
        <Stack.Screen name='Horoscope' component={Horoscope} options={{ title: 'Horoscope' }} />
        {/* The following screens are not defined in RootStackParamList and will cause type errors.
            To fix, add them to RootStackParamList or remove them from the navigator. */}
        {/* <Stack.Screen name='AiChatBot' component={AiChatBot} options={{ title: 'Ai Chat Bot'  }} /> */}
        {/* <Stack.Screen name='ChatScreen' component={ChatScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#ffc107',
    flex: 1,
  },
})