import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Menu({ navigation }) {
  const handleMenuPress = (screen) => {
    navigation.navigate(screen);
  };

 // Garemtal Menu kısmındaki çıkan sayfalar

 //DİP NOT!!! returnün içine yazdığımız çoğu yorum satırı hatalı çalışır
  return (
    <View style={styles.container}>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Ana Sayfa')}>
          <Text style={styles.menuText}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Ayarlar')}>
          <Text style={styles.menuText}>Ayarlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Profil')}>
          <Text style={styles.menuText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
});