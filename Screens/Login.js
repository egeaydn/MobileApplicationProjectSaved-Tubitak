import React,{useState} from 'react';
import {Text,TextInput,View,StyleSheet,TouchableOpacity} from 'react-native';

export default function Login({navigation}) {

 const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAREMTAL (Öğrenci)</Text>
       <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        placeholder="TC Kimlik Numaranızı Giriniz"
        value={username}
        onChangeText={text => setUsername(text)}
        placeholderTextColor="gray"
      />
      </View>
       <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        placeholder="Okul Numaranızı Giriniz"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        placeholderTextColor="gray"
      />
     </View>
<View style={styles.buttonContainer}>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={()=>navigation.navigate("Home")}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={()=>navigation.navigate("Home")}>Kayıt Ol</Text>
      </TouchableOpacity>
      
    </View>
    <View>
     <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgetText} onPress={()=>navigation.navigate("Disconnected")}>Şifremi unuttum</Text>
      </TouchableOpacity>

              <Text style={styles.or}>Yada</Text>
          <View style={styles.hr} />
    </View>
     <View style={styles.createbutton}>
<TouchableOpacity style={styles.create}>
        <Text style={styles.createText} onPress={()=>navigation.navigate("Signin")}>Öğretmen Girişi</Text>
      </TouchableOpacity>
    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#151515',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFC94A',
    marginBottom: 70,
    textAlign:"center",
  },
  input: {
    borderWidth: 1,
    borderColor: '#EEEDEB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: 'black',
    backgroundColor: "#EEEDEB",
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#FFC94A',
     borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    marginRight:"10px",
     marginTop: 10,
    marginBottom: 10,
    margin:10
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
    fontWeight:"500",
  },
  forgot:{
    textAlign:"center",
    alignItems:"center",
     padding:10
  },
  forgetText:{
    color:"#40A2E3",
    fontSize:"15px",
    paddingTop:"10px",
    backgroundColor:"#transparent",
    fontWeight:"500",
  },
  or:{
    paddingTop:"20px",
    textAlign:"center",
    fontWeight:"500",
    fontSize:"16px",
    color:"#fff",
  },
  hr:{
     borderBottomColor: '#fff',
      borderBottomWidth: 1,
      marginVertical: 5,
      padding:4,
     fontWeight: '900',
  },
  createbutton:{
      flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
     paddingTop:"20px",
          padding:10
  },
  create:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#5BBCFF",
    borderRadius: 5,
    height: 40,
    width:"200px",
  },
  createText:{
   fontSize:"15px",
   textAlign:"center",
    alignItems:"center",
    color:"white",
    fontWeight:"700",
    paddingHorizontal: 20,
  },
});