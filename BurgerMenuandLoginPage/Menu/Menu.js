import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Menu({ navigation }) {
  const handleMenuPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
 
      
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Screen1')}>
          <Text style={styles.menuText}>Seçenek 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Screen2')}>
          <Text style={styles.menuText}>Seçenek 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Screen3')}>
          <Text style={styles.menuText}>Seçenek 3</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  burgerMenu: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
