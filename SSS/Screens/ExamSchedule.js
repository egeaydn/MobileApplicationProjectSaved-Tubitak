import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { commonStyles } from '../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExamSchedule = () => {
  const { theme } = useTheme();
  const [sinavlar, setSinavlar] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Sınavları yükle
  const loadSinavlar = async () => {
    try {
      const savedSinavlar = await AsyncStorage.getItem('sinavlar');
      if (savedSinavlar) {
        setSinavlar(JSON.parse(savedSinavlar));
      }
    } catch (error) {
      console.error('Sınavlar yüklenirken hata oluştu:', error);
    }
  };

  // Sayfa yüklendiğinde sınavları getir
  useEffect(() => {
    loadSinavlar();
  }, []);

  // Yenileme işlemi
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadSinavlar().finally(() => setRefreshing(false));
  }, []);

  // Sınavları tarihe göre sırala
  const sortedSinavlar = [...sinavlar].sort((a, b) => {
    return new Date(a.tarih) - new Date(b.tarih);
  });

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.subject, { color: theme.colors.text }]}>{item.ders}</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
          Sınıf: {item.sinif}-{item.sube}
        </Text>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
          Tarih: {item.tarih}
        </Text>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
          Saat: {item.saat}
        </Text>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
          Yer: {item.yer}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[commonStyles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[commonStyles.headerTitle, { color: theme.colors.text }]}>Sınav Takvimi</Text>
        <Text style={[commonStyles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Tüm sınavlarınızı görüntüleyin
        </Text>
      </View>
      <FlatList
        data={sortedSinavlar}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={commonStyles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              Henüz sınav bulunmamaktadır.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...commonStyles.card,
    marginBottom: 15,
  },
  subject: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  infoContainer: {
    gap: 5,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 22,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ExamSchedule;
