import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/homeScreen';
import DetailsScreen from '../screens/Details/detailsScreen';
import { ROUTE_NAMES } from '../helpers/routes';


const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={ROUTE_NAMES.HOME} screenOptions={{headerShown:false}}>
      <Stack.Screen name={ROUTE_NAMES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTE_NAMES.DETAILS} component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default RootNavigation