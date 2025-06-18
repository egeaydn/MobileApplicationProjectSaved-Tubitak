import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  Dimensions, 
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

// Mock teacher data - aynı veriler
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
    subjects: ["Bilişim Teknolojileri", "Yazılım Geliştirme"],
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
    age: 25,
    gender: "Erkek",
    subjects: ["Bilişim Teknolojileri", "Mobil Uygulama Geliştirme"],
    years_of_experience: 5,
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
    subjects: ["Halkla İlişkiler", "Organizasyon"],
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
    subjects: ["Halkla İlişkiler", "Reklamcılık"],
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
    subjects: ["Halkla İlişkiler", "Organizasyon"],
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
    subjects: ["Halkla İlişkiler", "Reklamcılık"],
    years_of_experience: 11,
    email: "yunus.kaan@garemtal.meb.k12.tr",
    phone: "+90 555 100 0022",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 23,
    name: "Gülay Tokgöz",
    age: 29,
    gender: "Kadın",
    subjects: ["Edebiyat"],
    years_of_experience: 3,
    email: "gulay.tokgoz@okul.edu",
    phone: "+90 553 700 1315",
    address: {
      city: "Adana",
      country: "Türkiye"
    }
  },
  {
    id: 24,
    name: "Nazife Kaçar",
    age: 29,
    gender: "Kadın",
    subjects: ["Edebiyat"],
    years_of_experience: 3,
    email: "nazife.kacar@okul.edu",
    phone: "+90 553 314 5010",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 25,
    name: "Özlem Çuhadar",
    age: 25,
    gender: "Kadın",
    subjects: ["Edebiyat"],
    years_of_experience: 3,
    email: "ozlem.cuhadar@okul.edu",
    phone: "+90 553 314 5010",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 26,
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
    id: 27,
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
    id: 28,
    name: "Işık Kutlu Çalışkan",
    age: 30,
    gender: "Kadın",
    subjects: ["Matematik"],
    years_of_experience: 3,
    email: "isik.kutlu.caliskan@okul.edu",
    phone: "+90 530 023 0024",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 29,
    name: "Züleyha Atmaca",
    age: 27,
    gender: "Kadın",
    subjects: ["Tarih"],
    years_of_experience: 3,
    email: "zuleyha.atmaca@okul.edu",
    phone: "+90 544 720 6445",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 30,
    name: "Zehra Taşçı",
    age: 27,
    gender: "Kadın",
    subjects: ["Tarih"],
    years_of_experience: 3,
    email: "zehra.tasci@okul.edu",
    phone: "+90 530 200 0305",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 31,
    name: "Nejla Yılmaz",
    age: 27,
    gender: "Kadın",
    subjects: ["Coğrafya"],
    years_of_experience: 3,
    email: "nejla.yilmaz@okul.edu",
    phone: "+90 530 035 6023",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 32,
    name: "Serpil Gültepe",
    age: 30,
    gender: "Kadın",
    subjects: ["Fizik"],
    years_of_experience: 3,
    email: "serpil.gultepe@okul.edu",
    phone: "+90 530 035 6023",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 33,
    name: "Seda Saygın",
    age: 27,
    gender: "Kadın",
    subjects: ["Kimya"],
    years_of_experience: 3,
    email: "seda.saygin@okul.edu",
    phone: "+90 530 08 1861",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  },
  {
    id: 34,
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
    id: 35,
    name: "Hande Fatma Ocak",
    age: 25,
    gender: "Kadın",
    subjects: ["İngilizce"],
    years_of_experience: 3,
    email: "handefatma.ocak@okul.edu",
    phone: "+90 530 035 6023",
    address: {
      city: "İstanbul",
      country: "Türkiye"
    }
  }
];

const TeacherDirectory = () => {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filters, setFilters] = useState({
    subject: '',
    gender: '',
    experience: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Theme colors
  const theme = {
    light: {
      primary: '#6366f1',
      primaryDark: '#4f46e5',
      background: '#ffffff',
      surface: '#f9fafb',
      card: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    dark: {
      primary: '#818cf8',
      primaryDark: '#6366f1',
      background: '#111827',
      surface: '#1f2937',
      card: '#374151',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      border: '#374151',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa'
    }
  };

  const currentTheme = isDarkTheme ? theme.dark : theme.light;

  useEffect(() => {
    applyFilters();
  }, [searchText, filters]);

  const applyFilters = () => {
    setLoading(true);
    
    setTimeout(() => {
      let filtered = mockTeachers.filter(teacher => {
        // Search filter
        const matchesSearch = searchText === '' || 
          teacher.name.toLowerCase().includes(searchText.toLowerCase()) ||
          teacher.subjects.some(subject => subject.toLowerCase().includes(searchText.toLowerCase()));
        
        // Subject filter
        const matchesSubject = filters.subject === '' || 
          teacher.subjects.includes(filters.subject);
        
        // Gender filter
        const matchesGender = filters.gender === '' || 
          teacher.gender === filters.gender;
        
        // Experience filter
        const matchesExperience = filters.experience === '' || 
          checkExperienceRange(teacher.years_of_experience, filters.experience);
        
        return matchesSearch && matchesSubject && matchesGender && matchesExperience;
      });
      
      setFilteredTeachers(filtered);
      setLoading(false);
    }, 500);
  };

  const checkExperienceRange = (experience, range) => {
    switch (range) {
      case '0-5': return experience <= 5;
      case '6-10': return experience >= 6 && experience <= 10;
      case '11-15': return experience >= 11 && experience <= 15;
      case '16-20': return experience >= 16 && experience <= 20;
      case '20+': return experience > 20;
      default: return true;
    }
  };

  const clearFilters = () => {
    setFilters({ subject: '', gender: '', experience: '' });
    setSearchText('');
  };

  const openTeacherModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalVisible(true);
  };

  const closeTeacherModal = () => {
    setModalVisible(false);
    setSelectedTeacher(null);
  };

  const getSubjects = () => {
    return [...new Set(mockTeachers.flatMap(teacher => teacher.subjects))].sort();
  };

  const renderTeacherCard = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={600} style={[styles.teacherCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
      <TouchableOpacity onPress={() => openTeacherModal(item)} style={styles.cardContent}>
        {/* Teacher Header */}
        <View style={styles.teacherHeader}>
          <View style={[styles.avatar, { backgroundColor: currentTheme.primary }]}>
            <Ionicons name="person" size={24} color="white" />
          </View>
          <View style={styles.teacherInfo}>
            <Text style={[styles.teacherName, { color: currentTheme.text }]}>{item.name}</Text>
            <View style={styles.badges}>
              <View style={[styles.badge, styles.ageBadge]}>
                <Text style={styles.badgeText}>{item.age} yaş</Text>
              </View>
              <View style={[styles.badge, styles.genderBadge]}>
                <Text style={styles.badgeText}>{item.gender}</Text>
              </View>
              <View style={[styles.badge, styles.experienceBadge]}>
                <Text style={styles.badgeText}>{item.years_of_experience} yıl</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Subjects */}
        <View style={styles.subjectsContainer}>
          <Text style={[styles.subjectsTitle, { color: currentTheme.textSecondary }]}>Branşlar</Text>
          <View style={styles.subjectTags}>
            {item.subjects.map((subject, index) => (
              <View key={index} style={[styles.subjectTag, { backgroundColor: currentTheme.primary }]}>
                <Text style={styles.subjectTagText}>{subject}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Info */}
        <View style={[styles.contactInfo, { borderTopColor: currentTheme.border }]}>
          <View style={styles.contactIcons}>
            <Ionicons name="mail" size={16} color={currentTheme.textSecondary} />
            <Ionicons name="call" size={16} color={currentTheme.textSecondary} />
          </View>
          <TouchableOpacity style={[styles.viewDetailsBtn, { borderColor: currentTheme.primary }]}>
            <Text style={[styles.viewDetailsBtnText, { color: currentTheme.primary }]}>Detaylar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.filterModalOverlay}>
        <View style={[styles.filterModal, { backgroundColor: currentTheme.surface }]}>
          <View style={styles.filterHeader}>
            <Text style={[styles.filterTitle, { color: currentTheme.text }]}>Filtreler</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color={currentTheme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContent}>
            {/* Subject Filter */}
            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: currentTheme.text }]}>Branş</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
                <TouchableOpacity
                  style={[styles.filterOption, filters.subject === '' && styles.filterOptionActive]}
                  onPress={() => setFilters({...filters, subject: ''})}
                >
                  <Text style={[styles.filterOptionText, filters.subject === '' && styles.filterOptionTextActive]}>Tümü</Text>
                </TouchableOpacity>
                {getSubjects().map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.filterOption, filters.subject === subject && styles.filterOptionActive]}
                    onPress={() => setFilters({...filters, subject})}
                  >
                    <Text style={[styles.filterOptionText, filters.subject === subject && styles.filterOptionTextActive]}>{subject}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Gender Filter */}
            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: currentTheme.text }]}>Cinsiyet</Text>
              <View style={styles.filterButtons}>
                {['', 'Kadın', 'Erkek'].map((gender, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.filterButton, filters.gender === gender && styles.filterButtonActive]}
                    onPress={() => setFilters({...filters, gender})}
                  >
                    <Text style={[styles.filterButtonText, filters.gender === gender && styles.filterButtonTextActive]}>
                      {gender === '' ? 'Tümü' : gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Experience Filter */}
            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: currentTheme.text }]}>Deneyim</Text>
              <View style={styles.filterButtons}>
                {['', '0-5', '6-10', '11-15', '16-20', '20+'].map((exp, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.filterButton, filters.experience === exp && styles.filterButtonActive]}
                    onPress={() => setFilters({...filters, experience: exp})}
                  >
                    <Text style={[styles.filterButtonText, filters.experience === exp && styles.filterButtonTextActive]}>
                      {exp === '' ? 'Tümü' : `${exp} yıl`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={[styles.clearFiltersBtn, { backgroundColor: currentTheme.error }]} onPress={clearFilters}>
              <Ionicons name="refresh" size={20} color="white" />
              <Text style={styles.clearFiltersBtnText}>Filtreleri Temizle</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderTeacherDetailModal = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeTeacherModal}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: currentTheme.surface }]}>
          <TouchableOpacity style={styles.modalClose} onPress={closeTeacherModal}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          {selectedTeacher && (
            <ScrollView style={styles.modalBody}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <View style={[styles.modalAvatar, { backgroundColor: currentTheme.primary }]}>
                  <Ionicons name="person" size={32} color="white" />
                </View>
                <View style={styles.modalTeacherInfo}>
                  <Text style={[styles.modalTeacherName, { color: currentTheme.text }]}>{selectedTeacher.name}</Text>
                  <View style={styles.modalBadges}>
                    <View style={[styles.badge, styles.ageBadge]}>
                      <Text style={styles.badgeText}>{selectedTeacher.age} yaş</Text>
                    </View>
                    <View style={[styles.badge, styles.genderBadge]}>
                      <Text style={styles.badgeText}>{selectedTeacher.gender}</Text>
                    </View>
                    <View style={[styles.badge, styles.experienceBadge]}>
                      <Text style={styles.badgeText}>{selectedTeacher.years_of_experience} yıl deneyim</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Subjects */}
              <View style={styles.modalSection}>
                <View style={styles.modalSectionHeader}>
                  <Ionicons name="book" size={20} color={currentTheme.primary} />
                  <Text style={[styles.modalSectionTitle, { color: currentTheme.text }]}>Branşlar</Text>
                </View>
                <View style={styles.modalSubjectTags}>
                  {selectedTeacher.subjects.map((subject, index) => (
                    <View key={index} style={[styles.modalSubjectTag, { backgroundColor: currentTheme.primary }]}>
                      <Text style={styles.modalSubjectTagText}>{subject}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Contact */}
              <View style={styles.modalSection}>
                <View style={styles.modalSectionHeader}>
                  <Ionicons name="mail" size={20} color={currentTheme.primary} />
                  <Text style={[styles.modalSectionTitle, { color: currentTheme.text }]}>İletişim Bilgileri</Text>
                </View>
                <View style={[styles.contactItem, { backgroundColor: currentTheme.background }]}>
                  <Ionicons name="mail" size={18} color={currentTheme.primary} />
                  <Text style={[styles.contactText, { color: currentTheme.text }]}>{selectedTeacher.email}</Text>
                </View>
                <View style={[styles.contactItem, { backgroundColor: currentTheme.background }]}>
                  <Ionicons name="call" size={18} color={currentTheme.primary} />
                  <Text style={[styles.contactText, { color: currentTheme.text }]}>{selectedTeacher.phone}</Text>
                </View>
              </View>

              {/* Location */}
              <View style={styles.modalSection}>
                <View style={styles.modalSectionHeader}>
                  <Ionicons name="location" size={20} color={currentTheme.primary} />
                  <Text style={[styles.modalSectionTitle, { color: currentTheme.text }]}>Konum</Text>
                </View>
                <View style={[styles.locationItem, { backgroundColor: currentTheme.background }]}>
                  <Text style={[styles.locationText, { color: currentTheme.text }]}>
                    {selectedTeacher.address.city}, {selectedTeacher.address.country}
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} backgroundColor={currentTheme.background} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentTheme.border }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Ionicons name="school" size={28} color={currentTheme.primary} />
            <Text style={[styles.headerTitleText, { color: currentTheme.primary }]}>Öğretmen Rehberi</Text>
          </View>
          <Text style={[styles.headerSubtitle, { color: currentTheme.textSecondary }]}>
            Öğretmenlerimizi keşfedin ve iletişime geçin
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.themeToggle, { backgroundColor: currentTheme.surface, borderColor: currentTheme.border }]}
          onPress={() => setIsDarkTheme(!isDarkTheme)}
        >
          <Ionicons name={isDarkTheme ? "sunny" : "moon"} size={20} color={currentTheme.text} />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchFilterContainer}>
        <View style={[styles.searchBox, { backgroundColor: currentTheme.surface, borderColor: currentTheme.border }]}>
          <Ionicons name="search" size={20} color={currentTheme.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: currentTheme.text }]}
            placeholder="Öğretmen adı ara..."
            placeholderTextColor={currentTheme.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearSearch}>
              <Ionicons name="close" size={16} color={currentTheme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: currentTheme.primary }]}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options" size={18} color="white" />
          <Text style={styles.filterButtonText}>Filtreler</Text>
        </TouchableOpacity>
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={currentTheme.primary} />
          <Text style={[styles.loadingText, { color: currentTheme.textSecondary }]}>Öğretmenler yükleniyor...</Text>
        </View>
      )}

      {/* Teachers List */}
      {!loading && (
        <FlatList
          data={filteredTeachers}
          renderItem={renderTeacherCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={width > 600 ? 2 : 1}
          contentContainerStyle={styles.teachersList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Ionicons name="search" size={48} color={currentTheme.textSecondary} style={styles.noResultsIcon} />
              <Text style={[styles.noResultsTitle, { color: currentTheme.text }]}>Sonuç bulunamadı</Text>
              <Text style={[styles.noResultsText, { color: currentTheme.textSecondary }]}>
                Arama kriterlerinizi değiştirerek tekrar deneyin.
              </Text>
            </View>
          }
        />
      )}

      {/* Modals */}
      {renderFilterModal()}
      {renderTeacherDetailModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  themeToggle: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearSearch: {
    padding: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  teachersList: {
    padding: 20,
  },
  teacherCard: {
    borderRadius: 16,
    borderWidth: 2,
    margin: 8,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
  },
  teacherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ageBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  genderBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  experienceBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  subjectsContainer: {
    marginTop: 16,
  },
  subjectsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  subjectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  subjectTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  subjectTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  contactInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewDetailsBtn: {
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewDetailsBtnText: {
    fontSize: 12,
    fontWeight: '500',
  },
  noResults: {
    alignItems: 'center',
    padding: 60,
  },
  noResultsIcon: {
    opacity: 0.5,
    marginBottom: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    textAlign: 'center',
  },
  
  // Filter Modal Styles
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterContent: {
    padding: 20,
  },
  filterGroup: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  filterOptionActive: {
    backgroundColor: '#6366f1',
  },
  filterOptionText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: 'white',
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
  },
  filterButtonText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  clearFiltersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  clearFiltersBtnText: {
    color: 'white',
    fontWeight: '500',
  },
  
  // Teacher Detail Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#ef4444',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalBody: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  modalTeacherInfo: {
    flex: 1,
  },
  modalTeacherName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalSubjectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalSubjectTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  modalSubjectTagText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationItem: {
    padding: 16,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TeacherDirectory;