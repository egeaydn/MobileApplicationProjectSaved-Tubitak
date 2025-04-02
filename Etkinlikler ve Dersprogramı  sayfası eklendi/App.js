import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Login from './Screens/Ogrenci'; //import edilen ısımlar aşşağıda verilmiştir
import Menu from './Menu/Menu';
import Screen1 from './Screens/Screen1';
import Screen2 from './Screens/Screen2';
import Screen3 from './Screens/Screen3';
import Ogretmen from './Screens/Ogretmen';
import DetailsScreen from './Screens/DetailsScreen';
import { Button } from 'react-native';
import DersProgrami from './Screens/DersProgrami';  // Yeni eklenen Ders Programı sayfası
import Etkinlikler from './Screens/Etkinlikler';    // Yeni eklenen Etkinlikler sayfası
const Stack = createStackNavigator(); // Stack Navigation Öğretmen ve öğrenciye ait giriş sayfalarında son olaraksa giriş yaptıktan sonra çıkan Garemtal Menu sayfasına geçmemizi sağlar
const Drawer = createDrawerNavigator(); // Drawer Navigation kısmını Hamburger Menude kullanacağız

function CustomDrawerContent(props) {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[ 
        styles.drawerContainer,
        { backgroundColor: theme.colors.background },
      ]}>
      <View
        style={[
          styles.drawerHeader,
          { borderBottomColor: theme.colors.border },
        ]}>
        <View
          style={[
            styles.logoContainer,
            { backgroundColor: theme.isDarkMode ? '#374151' : '#F8FAFC' },
          ]}>
          <Image
            source={require('./assets/GaremtaPNG.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.schoolName, { color: theme.colors.text }]}>
          Garemtal Okulu
        </Text>
        <Text
          style={[styles.appVersion, { color: theme.colors.textSecondary }]}>
          Mobil Uygulama v1.0
        </Text>
      </View>
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>
      <View
        style={[styles.drawerFooter, { borderTopColor: theme.colors.border }]}>
        <Text
          style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          ©{new Date().getFullYear()} GAREMTAL. Tüm hakları saklıdır.
        </Text>
      </View>
    </SafeAreaView>
  );
}

/*
Function Drawer Routsun İçeriği 
  Garemtal Menu
  Ayarlar sayfası
  Ana Sayfa
  Profilim Sayfası
*/
function DrawerRoutes() {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Menu"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 300,
        },
        drawerActiveBackgroundColor: theme.isDarkMode ? '#374151' : '#E2E8F0',
        drawerActiveTintColor: theme.isDarkMode ? '#60A5FA' : '#2563EB',
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}>
      <Drawer.Screen
        name="Garemtal Menu"
        component={Menu}
        options={{
          drawerLabel: 'Ana Menü',
          drawerIcon: ({ color }) => (
            <Ionicons name="menu-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Ana Sayfa"
        options={{
          drawerLabel: 'Ana Sayfa',
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
        component={Screen1}
      />
      <Drawer.Screen
        name="Ayarlar"
        options={{
          drawerLabel: 'Ayarlar',
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
        component={Screen2}
      />
      <Drawer.Screen
        name="Öğretmenlerim"
        options={{
          drawerLabel: 'Öğretmenlerim',
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={22} color={color} />
          ),
        }}
        component={Screen3}
      />
       <Drawer.Screen 
          name="Ders Programı" 
          component={DersProgrami} 
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="school" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Etkinlikler" 
          component={Etkinlikler} 
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="calendar" size={22} color={color} />
            ),
          }}
        />
    </Drawer.Navigator>
  );
}
//  options={{ headerShown: false }} />  bu kod ekranın üstünde namein yazmasını engeller görünüş açısından önemlidir

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logo: {
    width: 80,
    height: 80,
  },
  schoolName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '500',
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 12,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Öğretmen"
            component={Ogretmen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerRoutes"
            component={DrawerRoutes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Ders Programı" 
            component={DersProgrami} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Etkinlikler" 
            component={Etkinlikler} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
