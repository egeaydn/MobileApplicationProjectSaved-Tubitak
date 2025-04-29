import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

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
];

const ExamSchedule = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text>Tarih: {item.date}</Text>
      <Text>Saat: {item.time}</Text>
      <Text>Yer: {item.place}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sınav Takvimi</Text>
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ExamSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  subject: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
});
