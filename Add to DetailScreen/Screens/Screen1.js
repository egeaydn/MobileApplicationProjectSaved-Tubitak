import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function Screen1({ navigation }) {
  const handleCardPress = (title, details) => {
    navigation.navigate('Details', { title, details });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Card
          title="Okulumuz Kartepe Gezisi"
          imageSource={require('../assets/h1.jpg')}
          onPress={() => handleCardPress("Okulumuz Kartepe Gezisi", "Kartepe'deki gezimiz harika geçti. Detaylar...")}
        />
        <Card
          title="1. Dönem Sonu Etkinlik Programımız"
          imageSource={require('../assets/h2.jpg')}
          onPress={() =>
            handleCardPress("1. Dönem Sonu Etkinlik Programımız", "Etkinlik detayları: Konser, sergi, turnuva...")
          }
        />
        <Card
          title="Okulumuzda Futbol Turnuvası Yapıldı"
          imageSource={require('../assets/h3.jpg')}
          onPress={() =>
            handleCardPress("Okulumuzda Futbol Turnuvası Yapıldı", "Turnuvada büyük bir çekişme yaşandı!")
          }
        />
        <Card
          title="Tüketici Hakları Semineri"
          imageSource={require('../assets/h4.jpg')}
          onPress={() =>
            handleCardPress("Tüketici Hakları Semineri", "Öğrencilere tüketici hakları anlatıldı.")
          }
        />
      </View>
    </ScrollView>
  );
}

const Card = ({ title, imageSource, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={imageSource} style={styles.cardImage} />
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 340,
    height: 220,
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 15,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
