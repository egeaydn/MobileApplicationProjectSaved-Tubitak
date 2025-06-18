import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function Menu({ navigation }) {
  const { theme } = useTheme();

  const menuItems = [
    {
      title: 'Ana Sayfa',
      icon: 'home-outline',
      screen: 'Ana Sayfa',
      description: 'Okul haberlerini görüntüle'
    },
    {
      title: 'Duyurular',
      icon: 'megaphone-outline',
      screen: 'Duyurular',
      description: 'Okul duyurularını takip et'
    },
    {
      title: 'Öğretmenlerim',
      icon: 'people-outline',
      screen: 'Öğretmenlerim',
      description: 'Öğretmen listesi ve iletişim'
    },
    {
      title: 'Ders Programı',  // Yeni eklenen sayfa
      icon: 'calendar-outline',
      screen: 'Ders Programı',  // Ders Programı sayfasına yönlendirme
      description: 'Kendi ders programını görüntüle'
    },
    {
      title: 'Etkinlikler',  // Yeni eklenen sayfa
      icon: 'calendar-clear-outline',
      screen: 'Etkinlikler',  // Etkinlikler sayfasına yönlendirme
      description: 'Okul etkinliklerini takip et'
    },
    {
      title: 'Sınav Takvimi',
      icon: 'pencil',
      screen: 'Sınav Takvimi',
      description: 'Sınav Takvimini Kontrol'
    }
  ];

  const handleMenuPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <Animatable.View 
        animation="fadeIn" 
        duration={1000} 
        style={styles.header}
      >
        <View style={[styles.profileContainer, { backgroundColor: theme.colors.card }]}>
          <View style={styles.avatarContainer}>
            <Ionicons name="school-outline" size={40} color={theme.colors.text} />
          </View>
          <Text style={[styles.schoolName, { color: theme.colors.text }]}>
            GAREMTAL
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            General Ali Rıza Ersin Mes. Tek. Anadolu Lisesi
          </Text>
        </View>
      </Animatable.View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Animatable.View
            key={item.screen}
            animation="fadeInLeft"
            delay={index * 100}
            duration={500}
          >
            <TouchableOpacity
              style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
              onPress={() => handleMenuPress(item.screen)}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.iconContainer}>
                  <Ionicons 
                    name={item.icon} 
                    size={24} 
                    color={theme.colors.text}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.menuText, { color: theme.colors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.menuDescription, { color: theme.colors.textSecondary }]}>
                    {item.description}
                  </Text>
                </View>
                <Ionicons 
                  name="chevron-forward-outline" 
                  size={20} 
                  color={theme.colors.textSecondary}
                />
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          Versiyon 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  profileContainer: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  schoolName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
  },
  menuContainer: {
    padding: 15,
  },
  menuItem: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});
