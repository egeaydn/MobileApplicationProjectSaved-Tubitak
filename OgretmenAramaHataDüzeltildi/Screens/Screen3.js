import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

// Mock teacher data
const mockTeachers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    age: 35,
    gender: "Erkek",
    subjects: ["Matematik", "Geometri"],
    years_of_experience: 10,
    email: "ahmet.yilmaz@okul.edu",
    phone: "+90 555 123 4567",
    address: {
      street: "123 Öğretmenler Caddesi",
      city: "Ankara",
      zip: "06100",
      country: "Türkiye"
    }
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    age: 42,
    gender: "Kadın",
    subjects: ["Fizik", "Kimya"],
    years_of_experience: 15,
    email: "ayse.kaya@okul.edu",
    phone: "+90 555 234 5678",
    address: {
      street: "456 Bilim Sokak",
      city: "İstanbul",
      zip: "34000",
      country: "Türkiye"
    }
  },
  {
    id: 3,
    name: "Mehmet Demir",
    age: 38,
    gender: "Erkek",
    subjects: ["Tarih", "Coğrafya"],
    years_of_experience: 12,
    email: "mehmet.demir@okul.edu",
    phone: "+90 555 345 6789",
    address: {
      street: "789 Tarih Yolu",
      city: "İzmir",
      zip: "35000",
      country: "Türkiye"
    }
  },
  {
    id: 4,
    name: "Fatma Şahin",
    age: 45,
    gender: "Kadın",
    subjects: ["Edebiyat", "Dil Bilgisi"],
    years_of_experience: 18,
    email: "fatma.sahin@okul.edu",
    phone: "+90 555 456 7890",
    address: {
      street: "101 Edebiyat Bulvarı",
      city: "Bursa",
      zip: "16000",
      country: "Türkiye"
    }
  },
  {
    id: 5,
    name: "Can Aydın",
    age: 31,
    gender: "Erkek",
    subjects: ["Biyoloji", "Fen Bilgisi"],
    years_of_experience: 7,
    email: "can.aydin@okul.edu",
    phone: "+90 555 567 8901",
    address: {
      street: "202 Fen Sokak",
      city: "Antalya",
      zip: "07000",
      country: "Türkiye"
    }
  },
  {
    id: 6,
    name: "Zeynep Gül",
    age: 29,
    gender: "Kadın",
    subjects: ["İngilizce", "Almanca"],
    years_of_experience: 5,
    email: "zeynep.gul@okul.edu",
    phone: "+90 555 678 9012",
    address: {
      street: "303 Dil Caddesi",
      city: "Adana",
      zip: "01000",
      country: "Türkiye"
    }
  }
];

const App = () => {
  const { theme } = useTheme();
  const [arananKelime, setArananKelime] = useState('');
  const [gorunanModul, setGorunanModul] = useState(false);
  const [kutuSec, setKutuSec] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false); // Artık yükleme yapmayacağız
  const [error, setError] = useState(null);

  useEffect(() => {
    // API çağrısı yerine mock verileri kullanıyoruz
    setTeachers(mockTeachers);
  }, []);

  const filteredData = teachers.filter(item =>
    item.name.toLowerCase().includes(arananKelime.toLowerCase())
  );

  const handleItemPress = (item) => {
    setKutuSec(item);
    setGorunanModul(true);
  };

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <Ionicons name="alert-circle" size={50} color={theme.colors.text} />
        <Text style={[styles.errorText, { color: theme.colors.text }]}>{error}</Text>
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

// Stil tanımları aynı şekilde kalabilir
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
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    width: width / 2 - 20,
    padding: 10,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
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
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeIcon: {
    padding: 5,
  },
  modalContent: {
    flexDirection: 'row',
  },
  teacherInfo: {
    flex: 1,
    marginLeft: 20,
  },
  infoLabel: {
    fontSize: 14,
    marginTop: 10,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;