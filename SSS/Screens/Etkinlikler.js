import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { commonStyles } from '../styles/commonStyles';

const Etkinlikler = () => {
  const { theme } = useTheme();
  
  // Etkinlikleri manuel olarak tanımlıyoruz
  const etkinlikler = [
    { tarih: '2025-04-05', etkinlik: 'Okul Yıl Sonu Konseri' },
    { tarih: '2025-04-10', etkinlik: 'Bilim Fuarı' },
    { tarih: '2025-04-15', etkinlik: 'Spor Şenlikleri' },
    // Diğer etkinlikleri buraya ekleyebilirsin
  ];

  return (
    <ScrollView style={[commonStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[commonStyles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[commonStyles.headerTitle, { color: theme.colors.text }]}>Okul Etkinlikleri</Text>
      </View>
      
      <View style={commonStyles.listContainer}>
        {etkinlikler.map((etkinlik, index) => (
          <View 
            key={index} 
            style={[
              styles.etkinlikContainer, 
              { 
                backgroundColor: theme.colors.card,
                borderLeftColor: theme.colors.primary 
              }
            ]}
          >
            <Text style={[styles.tarihText, { color: theme.colors.textSecondary }]}>
              {etkinlik.tarih}
            </Text>
            <Text style={[styles.etkinlikText, { color: theme.colors.text }]}>
              {etkinlik.etkinlik}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  etkinlikContainer: {
    ...commonStyles.card,
    borderLeftWidth: 5,
    marginBottom: 15,
    transform: [{ scale: 0.98 }],
  },
  tarihText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  etkinlikText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default Etkinlikler;
