import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // ikon kütüpanemiz
import * as Animatable from 'react-native-animatable'; // Animasyonlar için ekliyoruz

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try { //kullanıcı sorgulama kısmı G
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();

      let userFound = false;

      for (let user of users) {
        if (user.username === username) {
          if (user.password === password) {
            setErrorMessage('');
            navigation.navigate('DrawerRoutes');
            userFound = true;
            break;
          } else {
            setErrorMessage('Şifre yanlış.');
            userFound = true;
            break;
          }
        }
      }

      if (!userFound) {
        setErrorMessage('TC kimlik no yanlış');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

    /*
      APİ KONTROL KISMIYLA ALAKALI RAPOR:
      önce handloginle bir giriş paremetresi başlatırıyoruz daha sonra fetch ile gerekli apiyi çekiyoruz
      daha sonra reponse.json formatına dönüştürdüğümüz users adında sabit bir değişken atıyoruz

      userfound adında değiştirilebilir boolen bir değişken oluşturup buna false değerinin atıyoruz

      sonraki aşamada users dizisi üzerinde user adlı bir for döngüsü başlatıyoruz

      if (user.username === username) bu if koşulu eğer eğer username adlı değişken apideki username eşitse if sorgusu else gitmeden devam eder ama eğer hata var ise else çalışır
      devamındaki koşulda ise  if (user.password === password) aynı şeilde bu sorguda öyle çalışır ve bu giriş aşamasının son sorgusu olduğundan dolayı bu sorguyu geçerseniz 
      giriş yapabilirsiniz

      setErrorMessage(''); eğer giriş yapıldıysa son ifin içndeki bu hata mesajı silinir ve kullanıcıya gösterilmez ardından  navigation.navigate('DrawerRoutes'); DrawerRouts
      ekranına yönlendirilir ve userfound = true olarak işaretlenir ve döngü en sonunda break ifadesi ile kırılır

      eğer giriş aşamasında bişeyleri yanlış tuşladıysanız setErrorMessage('TC kimlik no yanlış'); böyle bir ifade size error mesajı gönderecektir

      bunun dışında ise if else döngülerinin tamamı try catch döngüsüne alınarak hatalı tuşlama hatasından başka bir hata çıkma durumua karşı önlem alınmıştır
    */

  return (
    <View style={styles.container}>
      <Animatable.Image //okul logosunun animasyonunu buraya ekledim G alttada texinputların animasyonlarını koydum daha dinamik bi yapı olacaktır G
        animation="bounceIn"
        source={require('../assets/GaremtaPNG.png')} 
        style={styles.logo} 
      />

      <Animatable.View animation="fadeInUp" delay={500} style={styles.inputContainer}> 
        <FontAwesome name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="TC Numarası"
          keyboardType="numeric"
          maxLength={11}
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={700} style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry={true}
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
        />
      </Animatable.View>

      {errorMessage ? ( //Error mesajını buraya tam iki texbox ın altına yazdım ve animasyonuda burada bulunuyor G
        <Animatable.Text animation="shake" style={styles.errorText}>{errorMessage}</Animatable.Text>
      ) : null} 

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text> 
      </TouchableOpacity>
      
      <Text style={styles.or}>Yada</Text>
      <View style={styles.hr} />

      <View style={styles.createbutton}>
        <TouchableOpacity style={styles.create} onPress={() => navigation.navigate('Öğretmen')}> 
          <Text style={styles.createText}>Öğretmen Girişi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.copyrightcontainer}>
        <Text style={styles.copyright}>© 2024 A. GAREMTAL. Tüm hakları saklıdır.</Text> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({// Burasıda kodların Css Kısmıdır css kısmı biraz uzun kaldı sebebi giriş ekranın görüntüsüne önem verilmesidir bu kodu devralacak arkadaşıma kolay gelsin G
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8ecf4',
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
    height: 40,
    backgroundColor: '#075eec',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
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

