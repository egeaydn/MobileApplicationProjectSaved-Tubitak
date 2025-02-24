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
    <View style={styles.cardOverlay} />
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 220,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});