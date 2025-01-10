import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Image,SafeAreaView } from "react-native";
import {
  SimpleLineIcons,
} from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerItemList,createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Screens/Ogrenci'; //import edilen ısımlar aşşağıda verilmiştir
import Menu from './Menu/Menu';
import Screen1 from './Screens/Screen1';
import Screen2 from './Screens/Screen2';
import Screen3 from './Screens/Screen3';
import Ogretmen from "./Screens/Ogretmen";
import DetailsScreen from './Screens/DetailsScreen';

const Stack = createStackNavigator(); // Stack Navigation Öğretmen ve öğrenciye ait giriş sayfalarında son olaraksa giriş yaptıktan sonra çıkan Garemtal Menu sayfasına geçmemizi sağlar
const Drawer = createDrawerNavigator(); // Drawer Navigation kısmını Hamburger Menude kullanacağız
/*
Function Drawer Routsun İçeriği 
  Garemtal Menu
  Ayarlar sayfası
  Ana Sayfa
  Profilim Sayfası
*/ 
function DrawerRoutes() {
  //Drawer Navigation
  return (
    <Drawer.Navigator initialRouteName="Menu"> 
      <Drawer.Screen  name="Garemtal Menu" component={Menu} />
         
      <Drawer.Screen
       name="Ana Sayfa"
         options={{
            drawerLabel: "Ana Sayfa",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#000000" /> //Burada labelların başına icon ekliyoruz
            )
          }}
        component={Screen1} />

      <Drawer.Screen
       name="Ayarlar" 
       options={{
         drawerLabel: "Ayarlar",
         drawerIcon: () => (
            <SimpleLineIcons name="settings" size={20} color="#000000" /> 
         )
       }}
       component={Screen2} />

      <Drawer.Screen
       name="Öğretmenlerim" 
       options={{
         drawerLabel: "Öğretmenlerim",
         drawerIcon: () => (
            <SimpleLineIcons name="star" size={20} color="#000000" /> 
         )
       }}
       component={Screen3} />

    </Drawer.Navigator>
  );
}
//  options={{ headerShown: false }} />  bu kod ekranın üstünde namein yazmasını engeller görünüş açısından önemlidir

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Öğretmen" component={Ogretmen} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
