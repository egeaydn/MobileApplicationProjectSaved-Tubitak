import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const App = () => {
  const { theme } = useTheme();
  const [arananKelime, setArananKelime] = useState('');
  const [gorunanModul, setGorunanModul] = useState(false);
  const [kutuSec, setKutuSec] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('https://www.freetestapi.com/api/v1/teachers');
      if (!response.ok) {
        throw new Error('Veri çekilemedi');
      }
      const data = await response.json();
      setTeachers(data);
    } catch (err) {
      setError('Öğretmen bilgileri yüklenirken bir hata oluştu');
      console.error('Hata:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = teachers.filter(item =>
    item.name.toLowerCase().includes(arananKelime.toLowerCase())
  );

  const handleItemPress = (item) => {
    setKutuSec(item);
    setGorunanModul(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.text} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>Öğretmenler yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <Ionicons name="alert-circle" size={50} color={theme.colors.text} />
        <Text style={[styles.errorText, { color: theme.colors.text }]}>{error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: theme.colors.card }]}
          onPress={fetchTeachers}
        >
          <Text style={[styles.retryButtonText, { color: theme.colors.text }]}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Öğretmenlerimiz</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Tüm öğretmenlerimizi görüntüleyin</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { 
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border
          }]}
          placeholder="Öğretmen ara..."
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={newText => setArananKelime(newText)}
          value={arananKelime}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <Animatable.View 
            animation="fadeInUp" 
            duration={1000} 
            delay={index * 100}
            style={styles.cardWrapper}
          >
            <TouchableOpacity 
              style={[styles.card, { backgroundColor: theme.colors.card }]} 
              onPress={() => handleItemPress(item)}
            >
              <View style={[styles.avatarContainer, { backgroundColor: theme.colors.background }]}>
                <Ionicons name="person" size={30} color={theme.colors.text} />
              </View>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]} numberOfLines={2}>{item.name}</Text>
              <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]} numberOfLines={2}>
                {item.subjects.join(', ')}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      />

      {kutuSec && (
        <Modal
          visible={gorunanModul}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setGorunanModul(false)}
        >
          <View style={styles.modalOverlay}>
            <Animatable.View 
              animation="slideInUp" 
              duration={500}
              style={[styles.modalContainer, { backgroundColor: theme.colors.card }]}
            >
              <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{kutuSec.name}</Text>
                <TouchableOpacity
                  onPress={() => setGorunanModul(false)}
                  style={styles.closeIcon}
                >
                  <Ionicons name="close" size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                <View style={[styles.avatarContainer, { backgroundColor: theme.colors.background }]}>
                  <Ionicons name="person" size={40} color={theme.colors.text} />
                </View>
                <View style={styles.teacherInfo}>
                  <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Yaş</Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>{kutuSec.age}</Text>
                  
                  <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Cinsiyet</Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>{kutuSec.gender}</Text>
                  
                  <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Dersler</Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>{kutuSec.subjects.join(', ')}</Text>
                  
                  <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Deneyim</Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>{kutuSec.years_of_experience} yıl</Text>
                  
                  <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>İletişim</Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>{kutuSec.email}</Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>{kutuSec.phone}</Text>
                  
                  <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Adres</Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>{kutuSec.address.street}</Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                    {kutuSec.address.city}, {kutuSec.address.zip}
                  </Text>
                  <Text style={[styles.infoValue, { color: theme.colors.text }]}>{kutuSec.address.country}</Text>
                </View>
              </View>
            </Animatable.View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  listContainer: {
    padding: 10,
  },
  cardWrapper: {
    flex: 1,
    padding: 5,
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  closeIcon: {
    padding: 5,
  },
  modalContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  teacherInfo: {
    width: '100%',
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;