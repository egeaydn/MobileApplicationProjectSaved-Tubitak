import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { commonStyles } from '../styles/commonStyles';

const exams = [
  {
    id: '1',
    subject: 'Matematik',
    date: '2025-04-10',
    time: '10:00',
    place: 'A Blok - 201',
  },
  {
    id: '2',
    subject: 'Fizik',
    date: '2025-04-12',
    time: '13:00',
    place: 'B Blok - 105',
  },
  {
    id: '3',
    subject: 'Tarih',
    date: '2025-04-14',
    time: '09:00',
    place: 'C Blok - 301',
  },
  {
    id: '4',
    subject: 'Robotik Kodlama',
    date: '2025-04-14',
    time: '14:00',
    place: 'A Blok - 301',
  },
  {
    id: '5',
    subject: 'Web Tasarım',
    date: '2025-05-02',
    time: '09:00',
    place: 'B Blok - 401',
  },
  {
    id: '6',
    subject: 'Grafik ve Canlandırma',
    date: '2025-04-16',
    time: '09:00',
    place: 'C Blok - 101',
  },
  {
    id: '7',
    subject: 'Türk Dili ve Edebiyat',
    date: '2025-04-17',
    time: '09:00',
    place: 'A Blok - 101',
  },
];

const ExamSchedule = () => {
  const { theme } = useTheme();

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.subject, { color: theme.colors.text }]}>{item.subject}</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>Tarih: {item.date}</Text>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>Saat: {item.time}</Text>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>Yer: {item.place}</Text>
      </View>
    </View>
  );

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[commonStyles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[commonStyles.headerTitle, { color: theme.colors.text }]}>Sınav Takvimi</Text>
      </View>
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={commonStyles.listContainer}
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
});

export default ExamSchedule;
