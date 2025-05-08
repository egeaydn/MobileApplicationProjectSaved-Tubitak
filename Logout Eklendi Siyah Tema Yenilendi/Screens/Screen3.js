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
    name: "Ramazan ÇOBAN",
    age: 42,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Müdür"],
    years_of_experience: 18,
    email: "ramazan.coban@garemtal.meb.k12.tr",
    phone: "+90 555 100 0001",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 2,
    name: "Meltem KARADAĞ",
    age: 38,
    gender: "Kadın",
    subjects: ["Çocuk Gelişimi", "Müdür Yardımcısı"],
    years_of_experience: 15,
    email: "meltem.karadag@garemtal.meb.k12.tr",
    phone: "+90 555 100 0002",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 3,
    name: "Pelin ŞENDİL",
    age: 35,
    gender: "Kadın",
    subjects: ["Çocuk Gelişimi", "Müdür Yardımcısı"],
    years_of_experience: 12,
    email: "pelin.sendil@garemtal.meb.k12.tr",
    phone: "+90 555 100 0003",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 4,
    name: "Harun GÜRSOY",
    age: 45,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 20,
    email: "harun.gursoy@garemtal.meb.k12.tr",
    phone: "+90 555 100 0004",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 5,
    name: "Aslı GÜREL",
    age: 40,
    gender: "Kadın",
    subjects: ["Bilişim Teknolojileri", "Veri Tabanı"],
    years_of_experience: 16,
    email: "asli.gurel@garemtal.meb.k12.tr",
    phone: "+90 555 100 0005",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 6,
    name: "Salih ACAR",
    age: 43,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 18,
    email: "salih.acar@garemtal.meb.k12.tr",
    phone: "+90 555 100 0006",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 7,
    name: "Necmettin Alp AR",
    age: 50,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 25,
    email: "necmettin.alp@garemtal.meb.k12.tr",
    phone: "+90 555 100 0007",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 8,
    name: "Ebru ŞAHİN",
    age: 37,
    gender: "Kadın",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme",],
    years_of_experience: 14,
    email: "ebru.sahin@garemtal.meb.k12.tr",
    phone: "+90 555 100 0008",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 9,
    name: "Özlem BAYRAM",
    age: 39,
    gender: "Kadın",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 15,
    email: "ozlem.bayram@garemtal.meb.k12.tr",
    phone: "+90 555 100 0009",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 10,
    name: "Sinan VURAL",
    age: 44,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Mobil Uygulama Geliştirme"],
    years_of_experience: 19,
    email: "sinan.vural@garemtal.meb.k12.tr",
    phone: "+90 555 100 0010",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 11,
    name: "Celil ÖZTÜRK",
    age: 41,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 17,
    email: "celil.ozturk@garemtal.meb.k12.tr",
    phone: "+90 555 100 0011",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 12,
    name: "Barış BOZAN",
    age: 36,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Siber Güvenlik"],
    years_of_experience: 13,
    email: "baris.bozan@garemtal.meb.k12.tr",
    phone: "+90 555 100 0012",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 13,
    name: "Güneş PARLAKGÜN",
    age: 32,
    gender: "Kadın",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 9,
    email: "gunes.parlakgun@garemtal.meb.k12.tr",
    phone: "+90 555 100 0013",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 14,
    name: "Esra EREN",
    age: 35,
    gender: "Kadın",
    subjects: ["Grafik Tasarım", "Web Tasarım"],
    years_of_experience: 12,
    email: "esra.eren@garemtal.meb.k12.tr",
    phone: "+90 555 100 0014",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 15,
    name: "Emine GÖKMENER DİKBIYIK",
    age: 45,
    gender: "Kadın",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 20,
    email: "emine.gokmener@garemtal.meb.k12.tr",
    phone: "+90 555 100 0015",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 16,
    name: "Hüseyin İNCİR",
    age: 48,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 23,
    email: "huseyin.incir@garemtal.meb.k12.tr",
    phone: "+90 555 100 0016",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 17,
    name: "İlkay KEFELİ",
    age: 39,
    gender: "Kadın",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 16,
    email: "ilkay.kefeli@garemtal.meb.k12.tr",
    phone: "+90 555 100 0017",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 18,
    name: "Gökhan SIRMA",
    age: 41,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
    years_of_experience: 18,
    email: "gokhan.sirma@garemtal.meb.k12.tr",
    phone: "+90 555 100 0018",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 19,
    name: "Emel PÜLENT",
    age: 37,
    gender: "Kadın",
    subjects: ["Halkla İlişikiler", "Organizasyon"],
    years_of_experience: 14,
    email: "emel.pulent@garemtal.meb.k12.tr",
    phone: "+90 555 100 0019",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 20,
    name: "F. Aslı TABAN",
    age: 40,
    gender: "Kadın",
    subjects: ["Halkla İlişikiler", "Reklamcılık"],
    years_of_experience: 17,
    email: "asli.taban@garemtal.meb.k12.tr",
    phone: "+90 555 100 0020",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 21,
    name: "Gökhan GÜNGÖR",
    age: 43,
    gender: "Erkek",
    subjects: ["Halkla İlişikiler", "Organizasyon"],
    years_of_experience: 19,
    email: "gokhan.gungor@garemtal.meb.k12.tr",
    phone: "+90 555 100 0021",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 22,
    name: "Yunus Kaan ÖZKAN",
    age: 34,
    gender: "Erkek",
    subjects: ["Halkla İlişikiler", "Reklamcılık"],
    years_of_experience: 11,
    email: "yunus.kaan@garemtal.meb.k12.tr",
    phone: "+90 555 100 0022",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 1,
    name: "Gülay Tokgöz",
    age: 29,
    gender: "Kadın",
    subjects: ["Edebiyat"],
    years_of_experience: 3,
    email: "gulay.tokgöz@okul.edu",
    phone: "+90 553 700 1315",
    address: {
      city: "Adana",
      country: "Türkiye"
    }
  },
  {
    id: 23,
    name: "Nazife Kaçar",
    age: 29,
    gender: "Kadın",
    subjects: ["Edebiyat"],
    years_of_experience: 3,
    email: "nazife.kaçar@okul.edu",
    phone: "+90 553 314 5010",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 24,
    name: "Özlem Çuhadar",
    age: 25,
    gender: "Kadın",
    subjects: ["Edebiyat"],
    years_of_experience: 3,
    email: "özlem.çuhadar@okul.edu",
    phone: "+90 553 314 5010",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 25,
    name: "Faysal Macit",
    age: 30,
    gender: "Erkek",
    subjects: ["Edebiyat"],
    years_of_experience: 3,
    email: "faysal.macit@okul.edu",
    phone: "+90 530 401 1012",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 26,
    name: "Dilek Erbil",
    age: 40,
    gender: "Kadın",
    subjects: ["Edebiyat"],
    years_of_experience: 3,
    email: "dilek.erbil@okul.edu",
    phone: "+90 530 502 1112",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 27,
    name: "Işık Kutlu Çalışkan",
    age: 30,
    gender: "Kadın",
    subjects: ["Matematik"],
    years_of_experience: 3,
    email: "ışıkutu.çalışkan@okul.edu",
    phone: "+90 530 023 0024",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 28,
    name: "Züleyha Atmaca",
    age: 27,
    gender: "Kadın",
    subjects: ["Tarih"],
    years_of_experience: 3,
    email: "züleyha.atmaca@okul.edu",
    phone: "+90 544 720 6445",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 29,
    name: "Zehra Taşçı",
    age: 27,
    gender: "Kadın",
    subjects: ["Tarih"],
    years_of_experience: 3,
    email: "zehra.taşçı@okul.edu",
    phone: "+90 530 200 0305",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 30,
    name: "Nejla Yılmaz",
    age: 27,
    gender: "Kadın",
    subjects: ["Coğrafya"],
    years_of_experience: 3,
    email: "nejla.yılmaz@okul.edu",
    phone: "+90 530 035 6023",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 31,
    name: "Serpil Gültepe",
    age: 30,
    gender: "Kadın",
    subjects: ["Fizik"],
    years_of_experience: 3,
    email: "serpil.gültepe@okul.edu",
    phone: "+90 530 035 6023",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 32,
    name: "Seda Saygın",
    age: 27,
    gender: "Kadın",
    subjects: ["Kimya"],
    years_of_experience: 3,
    email: "seda.saygın@okul.edu",
    phone: "+90 530 08 1861",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 33,
    name: "Engin Keklik",
    age: 27,
    gender: "Erkek",
    subjects: ["Biyoloji"],
    years_of_experience: 3,
    email: "engin.keklik@okul.edu",
    phone: "+90 530 20 4975",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 34,
    name: "Hande Fatma Ocak",
    age: 25,
    gender: "Kadın",
    subjects: ["ingilizce"],
    years_of_experience: 3,
    email: "handefatma.ocak@okul.edu",
    phone: "+90 530 035 6023",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 35,
    name: "Elif Turan",
    age: 27,
    gender: "Kadın",
    subjects: ["İngilizce"],
    years_of_experience: 3,
    email: "elif.turan@okul.edu",
    phone: "+90 530 035 6023",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 36,
    name: "Hatice Handan Şimşek",
    age: 40,
    gender: "Kadın",
    subjects: ["Felsefe"],
    years_of_experience: 3,
    email: "haticehandan.simsek@okul.edu",
    phone: "+90 530 502 3052",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 37,
    name: "Muteber Demirkale",
    age: 30,
    gender: "Kadın",
    subjects: ["Beden Eğitimi"],
    years_of_experience: 3,
    email: "muteber.demirkale@okul.edu",
    phone: "+90 530 410 3589",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 38,
    name: "Süheyla Subay",
    age: 40,
    gender: "Kadın",
    subjects: ["Müzik"],
    years_of_experience: 3,
    email: "süheyla.subay@okul.edu",
    phone: "+90 533 360 7216",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 39,
    name: "Esma Kaymak",
    age: 30,
    gender: "Kadın",
    subjects: ["Din Kült. ve Ahl.Bil."],
    years_of_experience: 3,
    email: "esma.kaymak@okul.edu",
    phone: "+90 530 035 6023",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 40,
    name: "Hasan Yeşilyurt",
    age: 40,
    gender: "Erkek",
    subjects: ["Din Kült. ve Ahl.Bil."],
    years_of_experience: 3,
    email: "hasan.yeşilyurt@okul.edu",
    phone: "+90 530 348 1585",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 41,
    name: "Sonül Ataç",
    age: 30,
    gender: "Kadın",
    subjects: ["Psikolojik Danışman"],
    years_of_experience: 3,
    email: "songül.ataç@okul.edu",
    phone: "+90 530 862 1284",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 42,
    name: "Hilal Akşahin Kaplan",
    age: 27,
    gender: "Kadın",
    subjects: ["Memur"],
    years_of_experience: 3,
    email: "hilalakşahin.kaplan@okul.edu",
    phone: "+90 530 450 4215",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
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
  errorText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
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
        height: 180, // Sabit yükseklik
        justifyContent: 'center', // İçerikleri dikeyde ortala
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        flexShrink: 1, // Uzun metinlerde küçülme
    },
    cardDescription: {
        fontSize: 14,
        textAlign: 'center',
        flexShrink: 1, // Uzun metinlerde küçülme
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