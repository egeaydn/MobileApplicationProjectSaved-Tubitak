import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function Screen1() {
  return (
    // bu sayfayı okuldaki haberlerin yayınlanacağı bir sayfa gibi yaptım kartlar var ve kartların her birine tıklandığında okul hakkındaki gelişmeleri gmrebilecek
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Card title="Kart 1" imageSource={require('../assets/3a6114335e3ed586fb197ba602dff901.jpg')} />
        <Card title="Kart 2" imageSource={require('../assets/3e5b960a17aa788019e65ea43a8ca582.jpg')} />
        <Card title="Kart 3" imageSource={require('../assets/4k-mountain-8fcudhh2u319cqhq.jpg')} />
        <Card title="Kart 4" imageSource={require('../assets/4k-pirate-ship-about-to-land-igpygwjh4kbx07q8.jpg')} />
      </View>
    </ScrollView>
  );
}

const Card = ({ title, imageSource }) => (
  <View style={styles.card}>
    <Image source={imageSource} style={styles.cardImage} />
    <Text style={styles.cardText}>{title}</Text>
  </View>
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
    width: 340, // Genişlik artırıldı
    height: 220, // Yükseklik artırıldı
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20, // Köşelerin yuvarlak olmasını sağlar
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 140, // Resim yüksekliği
    borderRadius: 15,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

