import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';

const App = () => {
  const [arananKelime, setArananKelime] = useState('');
  const [gorunanModul, setGorunanModul] = useState(false);
  const [kutuSec, setKutuSec] = useState(null);

  const data = [
    { id: '1', name: 'Sinan VURAL', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '2', name: 'Hande Fatma OCAK', section: 'İngilizce Öğretmeni' },
    { id: '3', name: 'Zehra TAŞÇI', section: 'Tarih Öğretmeni' },
    { id: '4', name: 'Ramazan Çoban', section: 'Müdür' },
    { id: '5', name: 'Meltem KARADAĞ', section: 'Müdür Yadımcısı' },
    { id: '6', name: 'Pelin ŞENDİL', section: 'Müdür Yadımcısı' },
    { id: '7', name: 'Harun GÜRSOY', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '8', name: 'Aslı GÜREL', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '9', name: 'Salih ACAR', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '10', name: 'Necmettin Alp AR', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '11', name: 'Ebru ŞAHİN', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '12', name: 'Özlem BAYRAM', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '13', name: 'Celil ÖZTÜRK', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '14', name: 'Barış BOZAN', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '15', name: 'Güneş PARLAKGÜN', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '16', name: 'Esra EREN', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '17', name: 'Emine GÖKMENER DİKBIYIK', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '18', name: 'Hüseyin İNCİR', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '19', name: 'İlkay KEFELİ', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '20', name: 'Gökhan SIRMA', section: 'Bilişim Teknolojileri Öğretmeni' },
    { id: '21', name: 'Emel PÜLENT', section: ' Halkla İlişkiler ve Organizasyon Hizmetleri Öğretmeni' },
    { id: '22', name: 'F. Aslı TABAN', section: 'Halkla İlişkiler ve Organizasyon Hizmetleri Öğretmeni' },
    { id: '23', name: 'Gülay Tokgöz KANMAZ', section: 'Edebiyat Öğretmeni' },
    { id: '24', name: 'Gökhan GÜNGÖR', section: 'Halkla İlişkiler ve Organizasyon Hizmetleri Öğretmeni' },
    { id: '25', name: 'Yunus Kaan ÖZKAN', section: 'Halkla İlişkiler ve Organizasyon Hizmetleri Öğretmeni' },
    { id: '26', name: 'Nazife KAÇAR', section: 'Edebiyat Öğretmeni' },
    { id: '27', name: 'Özlem ÇUHADAR', section: 'Edebiyat Öğretmeni' },
    { id: '28', name: 'Faysal MACİT', section: 'Edebiyat Öğretmeni' },
    { id: '29', name: 'Dilek ERBİL', section: 'Matematik Öğretmeni' },
    { id: '30', name: 'Işık Kutlu ÇALIŞKAN', section: 'Matematik Öğretmeni' },
    { id: '31', name: 'Nejla YILMAZ', section: 'Coğrafya Öğretmeni' },
    { id: '32', name: 'Züleyha ATMACA', section: 'Tarih Öğretmeni' },
    { id: '33', name: 'Serpil GÜLTEPE', section: 'Fizik Öğretmeni' },
    { id: '34', name: 'Seda SAYGIN', section: 'Kimya Öğretmeni' },
    { id: '35', name: 'Engin KEKLİK', section: 'Biyoloji Öğretmeni' },
    { id: '36', name: 'Hatice Handan ŞİMŞEK', section: 'Felsefe Öğretmeni' },
    { id: '37', name: 'Elif TURAN', section: 'İngilizce Öğretmeni' },
    { id: '38', name: 'Muteber DEMİRKALE', section: 'Beden Eğitimi Öğretmeni' },
    { id: '39', name: 'Süheyla SUBAY', section: 'Müzik Öğretmeni' },
    { id: '40', name: 'Esma KAYMAK', section: 'Din Kültürü ve Ahl. Bil. Öğretmeni' },
    { id: '41', name: 'Hasan YEŞİLYURT', section: 'Din Kültürü ve Ahl. Bil. Öğretmeni' },
    { id: '42', name: 'Songül ATAÇ', section: 'Psikolojik Danışman' },

  ];

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(arananKelime.toLowerCase())
  );

  const handleItemPress = (item) => {
    setKutuSec(item);
    setGorunanModul(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Arama yapın"
        onChangeText={newText => setArananKelime(newText)}
        value={arananKelime}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.section}</Text>
          </TouchableOpacity>
        )}
      />
      {kutuSec && (
        <Modal
          visible={gorunanModul}
          animationType="slide"
          onRequestClose={() => setGorunanModul(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{kutuSec.name}</Text>
            <Text style={styles.modalDescription}>{kutuSec.section}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setGorunanModul(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8', // Daha açık bir arka plan rengi
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center', // Kartları ortalamak için
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333', // Daha koyu bir metin rengi
        textAlig: 'center'

  },
  cardDescription: {
    fontSize: 14,
    color: '#555', // Açık gri bir metin rengi
    marginTop: 5,
    textAlign: 'center', // Metni ortalamak için
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    textAlig: 'center'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlig: 'center'
  },
  modalDescription: {
    fontSize: 18,
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});


export default App;
