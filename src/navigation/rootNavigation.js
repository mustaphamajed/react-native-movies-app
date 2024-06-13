import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/homeScreen';
import DetailsScreen from '../screens/Details/detailsScreen';


const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default RootNavigation