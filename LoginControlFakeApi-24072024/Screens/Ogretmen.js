import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Login({ navigation }) {
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
            navigation.navigate('DrawerRoutes'); // Eğer herşey doğru çalışığ buraya kadar geldiyse artık giriş yapabilirsin G
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
      console.error(error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./OkulLogo.jpg')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        keyboardType="phone-pad"
        maxLength={15}
        placeholderTextColor="gray"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry={true}
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <Text style={styles.or}>Yada</Text>
      <View style={styles.hr} />
      <View style={styles.createbutton}>
        <TouchableOpacity style={styles.create} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createText}>Öğrenci Girişi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.copyrightcontainer}>
        <Text style={styles.copyright}>© 2024 A. GAREMTAL. Tüm hakları saklıdır.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  input: {
    width: '95%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 15,
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    borderRadius: 5,
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
