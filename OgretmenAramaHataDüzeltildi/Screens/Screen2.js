import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';//https://feathericons.com/ icon kullandığımız kütüphanenin site linki
import { useTheme } from '../context/ThemeContext';

export default function Example() {
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({
    darkMode: theme.isDarkMode,
    emailNotifications: false,
    pushNotifications: false, //Notifications Switch kütüphanesinde kullandığımız Switchlere verdiğimiz issim gibi düşünebiliriz ve burada tüm switchleri kapattıkkullanıcı isterse açabilir
  });

  useEffect(() => {
    setForm(prev => ({ ...prev, darkMode: theme.isDarkMode }));
  }, [theme.isDarkMode]);

  const handleDarkModeChange = (value) => {
    setForm(prev => ({ ...prev, darkMode: value }));
    toggleTheme();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.profile, { backgroundColor: theme.colors.card }]}>
       
          <View style={styles.profilavatrkagıdı}>
            <Image
              alt=""
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s',
              }}
              style={styles.profileAvatar} />
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.profilhareketleri}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        <View>
          <Text style={[styles.profileName, { color: theme.colors.text }]}>Garemtal Öğrencisi</Text>
          <Text style={[styles.profileAddress, { color: theme.colors.textSecondary }]}>
            İstanbul Kadıköy/Acıbadem mah.
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.secenekler}>
          <Text style={[styles.bolumbasligi, { color: theme.colors.textSecondary }]}>Tercihler</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={[styles.row, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
              <FeatherIcon color="#fff" name="globe" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>Diller</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color={theme.colors.textSecondary}
              name="chevron-right"
              size={20} />
          </TouchableOpacity>
          <View style={[styles.row, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>Karanlık Mod</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={handleDarkModeChange}
              value={form.darkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={form.darkMode ? '#007afe' : '#f4f3f4'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={[styles.row, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
              <FeatherIcon
                color="#fff"
                name="navigation"
                size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>Konum</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color={theme.colors.textSecondary}
              name="chevron-right"
              size={20} />
          </TouchableOpacity>
          <View style={[styles.row, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>Bildirimler</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={pushNotifications =>
                setForm({ ...form, pushNotifications })
              }
              value={form.pushNotifications}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={form.pushNotifications ? '#007afe' : '#f4f3f4'}
            />
          </View>
        </View>
        <View style={styles.secenekler}>
          <Text style={[styles.bolumbasligi, { color: theme.colors.textSecondary }]}>Kaynaklar</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={[styles.row, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
              <FeatherIcon color="#fff" name="flag" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>Hata Bildir</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color={theme.colors.textSecondary}
              name="chevron-right"
              size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={[styles.row, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon color="#fff" name="mail" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>Bize Ulaşın</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color={theme.colors.textSecondary}
              name="chevron-right"
              size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={[styles.row, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
              <FeatherIcon color="#fff" name="star" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>App Storeda değerlendirin</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color={theme.colors.textSecondary}
              name="chevron-right"
              size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /** Profile */
  profile: {
    padding: 24,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilavatrkagıdı: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profilhareketleri: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  /** Section */
  secenekler: {
    paddingHorizontal: 24,
  },
  bolumbasligi: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});