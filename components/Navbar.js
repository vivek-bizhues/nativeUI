import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Welcome,Login,Signup,Home } from '../screens';

const Stack = createNativeStackNavigator();

const Navbar = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Welcome'
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navbar
