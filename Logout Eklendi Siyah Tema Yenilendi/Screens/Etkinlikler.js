import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Etkinlikler = () => {
  // Etkinlikleri manuel olarak tanımlıyoruz
  const etkinlikler = [
    { tarih: '2025-04-05', etkinlik: 'Okul Yıl Sonu Konseri' },
    { tarih: '2025-04-10', etkinlik: 'Bilim Fuarı' },
    { tarih: '2025-04-15', etkinlik: 'Spor Şenlikleri' },
    // Diğer etkinlikleri buraya ekleyebilirsin
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Okul Etkinlikleri</Text>
      {etkinlikler.map((etkinlik, index) => (
        <View key={index} style={styles.etkinlikContainer}>
          <Text style={styles.tarihText}>{etkinlik.tarih}</Text>
          <Text style={styles.etkinlikText}>{etkinlik.etkinlik}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f9fafb', // Daha temiz bir gri ton
  },
  title: {
    fontSize: 30,
    fontWeight: '700', // Güçlü başlık
    textAlign: 'center',
    marginVertical: 30,
    color: '#2b3a42', // Başlık için daha sofistike koyu gri ton
    letterSpacing: 1, // Harf aralığını açarak şıklık kattık
  },
  etkinlikContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#4caf50', // Etkinlik kartlarına özel renk
    shadowColor: '#000', 
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    overflow: 'hidden',
    transform: [{ scale: 0.98 }], // Etkinlik kartlarına zoom-out efekti
  },
  tarihText: {
    fontSize: 18,
    fontWeight: '500', // Tarih metnini biraz daha ince yapmak
    color: '#607d8b', // Tarih için serin gri ton
    marginBottom: 5,
  },
  etkinlikText: {
    fontSize: 20,
    fontWeight: '600', // Etkinlik metnini kalın yaparak dikkat çekici
    color: '#333333', // Etkinlik adı için koyu gri renk
    lineHeight: 26, // Satır aralığını artırarak okunabilirliği yükseltmek
  },
});

export default Etkinlikler;
