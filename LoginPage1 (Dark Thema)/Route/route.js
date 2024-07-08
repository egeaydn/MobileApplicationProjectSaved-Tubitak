import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import LoginScreen from '../Screens/Login'
import SigninScreen from '../Screens/Signin'

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name='Login' component={LoginScreen}/>
         <Stack.Screen name='Signin' component={SigninScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}