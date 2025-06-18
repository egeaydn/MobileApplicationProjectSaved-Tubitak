import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Sayfa importları
import Login from './Screens/Ogrenci';
import Menu from './Menu/Menu';
import Screen1 from './Screens/Screen1';
import Screen3 from './Screens/Screen3';
import Ogretmen from './Screens/Ogretmen';
import DetailsScreen from './Screens/DetailsScreen';
import DersProgrami from './Screens/DersProgrami';
import Etkinlikler from './Screens/Etkinlikler';
import ExamSchedule from './Screens/ExamSchedule';
import Duyurular from './Screens/Duyurular';
import DuyuruDetay from './Screens/DuyuruDetay';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer içeriği
function CustomDrawerContent(props) {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={[styles.drawerContainer, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.drawerHeader, { borderBottomColor: theme.colors.border }]}>
        <View style={[styles.logoContainer, { backgroundColor: theme.isDarkMode ? '#374151' : '#F8FAFC' }]}>
          <Image source={require('./assets/GaremtaPNG.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={[styles.schoolName, { color: theme.colors.text }]}>Garemtal Okulu</Text>
        <Text style={[styles.appVersion, { color: theme.colors.textSecondary }]}>Mobil Uygulama</Text>
      </View>

      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Tema ve çıkış butonları */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Ionicons
            name={theme.isDarkMode ? 'sunny-outline' : 'moon-outline'}
            size={24}
            color={theme.isDarkMode ? '#fff' : '#000'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.drawerFooter, { borderTopColor: theme.colors.border }]}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          ©{new Date().getFullYear()} GAREMTAL. Tüm hakları saklıdır.
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Drawer ekranları
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
      <Drawer.Screen name="Garemtal Menu" component={Menu} options={{
        drawerLabel: 'Ana Menü',
        drawerIcon: ({ color }) => <Ionicons name="menu-outline" size={22} color={color} />,
      }} />
      <Drawer.Screen name="Ana Sayfa" component={Screen1} options={{
        drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
      }} />
      <Drawer.Screen name="Öğretmenlerim" component={Screen3} options={{
        drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} />,
      }} />
      <Drawer.Screen name="Ders Programı" component={DersProgrami} options={{
        drawerIcon: ({ color }) => <Ionicons name="school" size={22} color={color} />,
      }} />
      <Drawer.Screen name="Etkinlikler" component={Etkinlikler} options={{
        drawerIcon: ({ color }) => <Ionicons name="calendar" size={22} color={color} />,
      }} />
      <Drawer.Screen name="Sınav Takvimi" component={ExamSchedule} options={{
        drawerIcon: ({ color }) => <Ionicons name="pencil" size={22} color={color} />,
      }} />
      <Drawer.Screen name="Duyurular" component={Duyurular} options={{
        drawerIcon: ({ color }) => <Ionicons name="megaphone-outline" size={22} color={color} />,
      }} />
    </Drawer.Navigator>
  );
}

// App bileşeni
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Öğretmen" component={Ogretmen} options={{ headerShown: false }} />
          <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DuyuruDetay" component={DuyuruDetay} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

// Stiller
const styles = StyleSheet.create({
  drawerContainer: { flex: 1 },
  drawerHeader: { padding: 20, borderBottomWidth: 1, alignItems: 'center', marginTop: 20 },
  logoContainer: {
    width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center',
    marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  logo: { width: 80, height: 80 },
  schoolName: { fontSize: 20, fontWeight: '700', marginBottom: 4, textAlign: 'center' },
  appVersion: { fontSize: 14, fontWeight: '500' },
  drawerItemsContainer: { flex: 1, paddingTop: 12 },
  drawerFooter: { padding: 20, borderTopWidth: 1, alignItems: 'center' },
  footerText: { fontSize: 13, fontWeight: '500' },
  themeButton: {
    padding: 10,
    marginRight: 10,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
});
