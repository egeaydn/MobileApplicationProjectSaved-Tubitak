import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // İkonlar için FontAwesome kullanıyoruz
import * as Animatable from 'react-native-animatable'; // Animasyonlar için ekliyoruz
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const { theme } = useTheme();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();

      let userFound = false;

      for (let user of users) 
      {
        if (user.phone === phone) 
        {
          if (user.password === password) 
          {
            setErrorMessage(''); // Hata mesajı G
            await AsyncStorage.setItem('userType', 'teacher');
            navigation.reset({
              index: 0,
              routes: [{ name: 'DrawerRoutes' }],
            });
            userFound = true;
            break;
          } 
          else
           {
            setErrorMessage('Şifre hatalı');
            userFound = true;
            break;
          }
        }
      }

      if (!userFound) {
        setErrorMessage('Telefon numarası yanlış');
      }
    } catch (error) {
      console.error('Giriş yapılırken hata oluştu:', error);
      Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image 
        source={require('../assets/GaremtaPNG.png')} 
        style={styles.logo} 
      />
      
      <View style={[styles.inputContainer, { backgroundColor: theme.colors.card }]}>
        <FontAwesome name="phone" size={20} color={theme.colors.textSecondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.border
          }]}
          placeholder="Telefon Numarası"
          keyboardType="phone-pad"
          maxLength={15}
          placeholderTextColor={theme.colors.textSecondary}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={[styles.inputContainer, { backgroundColor: theme.colors.card }]}>
        <FontAwesome name="lock" size={20} color={theme.colors.textSecondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.border
          }]}
          placeholder="Şifre"
          secureTextEntry={true}
          placeholderTextColor={theme.colors.textSecondary}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {errorMessage ? ( //Error mesajını buraya tam iki texbox ın altına yazdım ve animasyonuda burada bulunuyor G
        <Animatable.Text animation="shake" style={[styles.errorText, { color: theme.colors.error }]}>{errorMessage}</Animatable.Text>
      ) : null} 

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleLogin}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>Giriş Yap</Text>
      </TouchableOpacity>
      
      <Text style={styles.or}>Yada</Text>
      <View style={styles.hr} />

      <View style={styles.createbutton}>
        <TouchableOpacity style={styles.create} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createText}>Öğrenci Girişi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.copyrightcontainer}>
         <Text style={[styles.copyright, { color: theme.colors.textSecondary }]}> ©{new Date().getFullYear()} GAREMTAL. Tüm hakları saklıdır.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({// Burasıda kodların Css Kısmıdır css kısmı biraz uzun kaldı sebebi giriş ekranın görüntüsüne önem verilmesidir bu kodu devralacak arkadaşıma 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  inputContainer: {
     flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    borderColor: '#C9D3DB',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    fontSize: 15,
    color: '#222',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
     width: '85%',
    height: 45 ,
    backgroundColor: '#075eec',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 50,
  },
  buttonText: {
   fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  or: {
    paddingTop: 20,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  hr: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: 340,
    marginVertical: 5,
    padding: 4,
    fontWeight: '900',
  },
  createbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20,
    padding: 20,
  },
  create: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5BBCFF',
    borderRadius: 10,
    height: 40,
    width: 200,
    marginBottom: 15,
  },
  createText: {
    fontSize: 15,
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: '700',
    paddingHorizontal: 30,
  },
  copyrightcontainer: {
    position: 'absolute',
    bottom: 35,
  },
  copyright: {
    fontSize: 12,
    color: '#666',
    fontWeight: '800',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});
