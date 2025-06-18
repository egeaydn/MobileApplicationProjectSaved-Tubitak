import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';

// Örnek duyuru verileri (gerçek uygulamada API'den gelecek)
const DUMMY_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Okul Açılış Tarihi',
    content: '2024-2025 eğitim öğretim yılı 15 Eylül 2024 tarihinde başlayacaktır.',
    date: '2024-03-15',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Veli Toplantısı',
    content: '1. dönem veli toplantısı 20 Mart 2024 tarihinde yapılacaktır.',
    date: '2024-03-14',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Spor Turnuvası',
    content: 'Okullar arası basketbol turnuvası 25 Mart 2024 tarihinde başlayacaktır.',
    date: '2024-03-13',
    priority: 'low',
  },
];

const Duyurular = ({ navigation }) => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Burada duyuruları yenileme işlemi yapılacak
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.announcementCard, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('DuyuruDetay', { announcement: item })}
    >
      <View style={styles.announcementHeader}>
        <Text style={[styles.announcementTitle, { color: theme.colors.text }]}>
          {item.title}
        </Text>
        <View
          style={[
            styles.priorityIndicator,
            { backgroundColor: getPriorityColor(item.priority) }
          ]}
        />
      </View>
      <Text style={[styles.announcementContent, { color: theme.colors.textSecondary }]}>
        {item.content}
      </Text>
      <Text style={[styles.announcementDate, { color: theme.colors.textSecondary }]}>
        {item.date}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[commonStyles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[commonStyles.headerTitle, { color: theme.colors.text }]}>
          Duyurular
        </Text>
        <Text style={[commonStyles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Tüm duyuruları görüntüleyin
        </Text>
      </View>

      <FlatList
        data={DUMMY_ANNOUNCEMENTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={commonStyles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  announcementCard: {
    ...commonStyles.card,
    marginBottom: 15,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: 12,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  announcementContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  announcementDate: {
    fontSize: 13,
    alignSelf: 'flex-end',
    fontWeight: '500',
  },
});

export default Duyurular; 