import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function DetailsScreen({ route }) {
  const { title, details, imageSource } = route.params; // Resim, başlık ve detayları alıyoruz

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} /> {/* Resmi burada gösteriyoruz */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});
