import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(false); //Switch Düğmeleri için kullanılmıştır


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Ayarlar</Text>

      <View style={styles.option}>
        <Icon name="account-circle" size={24} color="gray" />
        <TouchableOpacity style={styles.optionTextContainer} onPress={() => handleOptionPress('Hesap')}>
          <Text style={styles.optionText}>Hesap</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Icon name="notifications" size={24} color="gray" />
        <Text style={styles.optionText}>Bildirimler</Text>
        <View style={styles.switchContainer}>
          <Switch
            value={isNotificationsEnabled}// isPrivacyEnabled ve Set IsPrivacyEnabled ayarlar kısmındaki açma ve kapama yani switch düğmeleri için kullandık ve yukarıda set ettik
            onValueChange={setIsNotificationsEnabled}
          />
        </View>
      </View>

      <View style={styles.option}>
        <Icon name="lock" size={24} color="gray" />
        <Text style={styles.optionText}>Gizlilik</Text>
        <View style={styles.switchContainer}>
          <Switch
            value={isPrivacyEnabled} // isPrivacyEnabled ve Set IsPrivacyEnabled ayarlar kısmındaki açma ve kapama yani switch düğmeleri için kullandık ve yukarıda set ettik
            onValueChange={setIsPrivacyEnabled}
          />
        </View>
      </View>

      <View style={styles.option}>
        <Icon name="language" size={24} color="gray" />
        <TouchableOpacity style={styles.optionTextContainer} onPress={() => handleOptionPress('Dil')}>
          <Text style={styles.optionText}>Dil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Icon name="info" size={24} color="gray" />
        <TouchableOpacity style={styles.optionTextContainer} onPress={() => handleOptionPress('Hakkında')}>
          <Text style={styles.optionText}>Hakkında</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  optionText: {
    fontSize: 18,
  },
  switchContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
