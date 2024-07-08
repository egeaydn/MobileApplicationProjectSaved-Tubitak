import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import LoginScreen from '../Screens/Ogrenci'
import SigninScreen from '../Screens/Ogretmen'

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Öğrenci' >
        <Stack.Screen name='Öğrenci' component={LoginScreen}/>
         <Stack.Screen name='Öğretmen' component={SigninScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}