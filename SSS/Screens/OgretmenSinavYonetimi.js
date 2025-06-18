import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OgretmenSinavYonetimi = () => {
  const { theme } = useTheme();
  const [sinavlar, setSinavlar] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [yeniSinav, setYeniSinav] = useState({
    ders: '',
    sinif: '',
    sube: '',
    tarih: '',
    saat: '',
    yer: '',
  });

  const siniflar = ['9', '10', '11', '12'];
  const subeler = ['A', 'B', 'C', 'D'];

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

  const sinavEkle = async () => {
    if (!yeniSinav.ders || !yeniSinav.sinif || !yeniSinav.sube || !yeniSinav.tarih || !yeniSinav.saat || !yeniSinav.yer) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const yeniSinavObj = {
      id: Date.now().toString(),
      ...yeniSinav,
    };

    try {
      const yeniSinavlar = [...sinavlar, yeniSinavObj];
      await AsyncStorage.setItem('sinavlar', JSON.stringify(yeniSinavlar));
      setSinavlar(yeniSinavlar);
      setModalVisible(false);
      setYeniSinav({
        ders: '',
        sinif: '',
        sube: '',
        tarih: '',
        saat: '',
        yer: '',
      });
      Alert.alert('Başarılı', 'Sınav başarıyla eklendi.');
    } catch (error) {
      console.error('Sınav kaydedilirken hata oluştu:', error);
      Alert.alert('Hata', 'Sınav kaydedilirken bir hata oluştu.');
    }
  };

  const sinavSil = async (id) => {
    Alert.alert(
      'Sınav Sil',
      'Bu sınavı silmek istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: async () => {
            try {
              const yeniSinavlar = sinavlar.filter(sinav => sinav.id !== id);
              await AsyncStorage.setItem('sinavlar', JSON.stringify(yeniSinavlar));
              setSinavlar(yeniSinavlar);
              Alert.alert('Başarılı', 'Sınav başarıyla silindi.');
            } catch (error) {
              console.error('Sınav silinirken hata oluştu:', error);
              Alert.alert('Hata', 'Sınav silinirken bir hata oluştu.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[commonStyles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[commonStyles.headerTitle, { color: theme.colors.text }]}>
          Sınav Yönetimi
        </Text>
        <Text style={[commonStyles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Sınavları ekleyin ve yönetin
        </Text>
      </View>

      <ScrollView style={commonStyles.scrollContainer}>
        <TouchableOpacity
          style={[styles.ekleButon, { backgroundColor: theme.colors.primary }]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.ekleButonText}>Yeni Sınav Ekle</Text>
        </TouchableOpacity>

        {sinavlar.map((sinav) => (
          <View key={sinav.id} style={[styles.sinavKarti, { backgroundColor: theme.colors.card }]}>
            <View style={styles.sinavBaslik}>
              <Text style={[styles.sinavDers, { color: theme.colors.text }]}>{sinav.ders}</Text>
              <TouchableOpacity onPress={() => sinavSil(sinav.id)}>
                <Ionicons name="trash-outline" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.sinavDetay}>
              <Text style={[styles.sinavBilgi, { color: theme.colors.textSecondary }]}>
                Sınıf: {sinav.sinif}-{sinav.sube}
              </Text>
              <Text style={[styles.sinavBilgi, { color: theme.colors.textSecondary }]}>
                Tarih: {sinav.tarih}
              </Text>
              <Text style={[styles.sinavBilgi, { color: theme.colors.textSecondary }]}>
                Saat: {sinav.saat}
              </Text>
              <Text style={[styles.sinavBilgi, { color: theme.colors.textSecondary }]}>
                Yer: {sinav.yer}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.modalBaslik}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Yeni Sınav Ekle</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border
              }]}
              placeholder="Ders Adı"
              placeholderTextColor={theme.colors.textSecondary}
              value={yeniSinav.ders}
              onChangeText={(text) => setYeniSinav({ ...yeniSinav, ders: text })}
            />

            <View style={styles.sinifSubeContainer}>
              <View style={styles.sinifSubeSecici}>
                <Text style={[styles.seciciBaslik, { color: theme.colors.text }]}>Sınıf:</Text>
                <View style={styles.seciciButonlar}>
                  {siniflar.map((sinif) => (
                    <TouchableOpacity
                      key={sinif}
                      style={[
                        styles.seciciButon,
                        yeniSinav.sinif === sinif && { backgroundColor: theme.colors.primary }
                      ]}
                      onPress={() => setYeniSinav({ ...yeniSinav, sinif })}
                    >
                      <Text style={[
                        styles.seciciButonText,
                        { color: yeniSinav.sinif === sinif ? '#fff' : theme.colors.text }
                      ]}>
                        {sinif}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.sinifSubeSecici}>
                <Text style={[styles.seciciBaslik, { color: theme.colors.text }]}>Şube:</Text>
                <View style={styles.seciciButonlar}>
                  {subeler.map((sube) => (
                    <TouchableOpacity
                      key={sube}
                      style={[
                        styles.seciciButon,
                        yeniSinav.sube === sube && { backgroundColor: theme.colors.primary }
                      ]}
                      onPress={() => setYeniSinav({ ...yeniSinav, sube })}
                    >
                      <Text style={[
                        styles.seciciButonText,
                        { color: yeniSinav.sube === sube ? '#fff' : theme.colors.text }
                      ]}>
                        {sube}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border
              }]}
              placeholder="Tarih (YYYY-MM-DD)"
              placeholderTextColor={theme.colors.textSecondary}
              value={yeniSinav.tarih}
              onChangeText={(text) => setYeniSinav({ ...yeniSinav, tarih: text })}
            />

            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border
              }]}
              placeholder="Saat (HH:MM)"
              placeholderTextColor={theme.colors.textSecondary}
              value={yeniSinav.saat}
              onChangeText={(text) => setYeniSinav({ ...yeniSinav, saat: text })}
            />

            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border
              }]}
              placeholder="Sınav Yeri"
              placeholderTextColor={theme.colors.textSecondary}
              value={yeniSinav.yer}
              onChangeText={(text) => setYeniSinav({ ...yeniSinav, yer: text })}
            />

            <TouchableOpacity
              style={[styles.kaydetButon, { backgroundColor: theme.colors.primary }]}
              onPress={sinavEkle}
            >
              <Text style={styles.kaydetButonText}>Sınavı Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ekleButon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  ekleButonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sinavKarti: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    ...commonStyles.shadow,
  },
  sinavBaslik: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sinavDers: {
    fontSize: 18,
    fontWeight: '700',
  },
  sinavDetay: {
    gap: 5,
  },
  sinavBilgi: {
    fontSize: 14,
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
  modalBaslik: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  sinifSubeContainer: {
    marginBottom: 15,
  },
  sinifSubeSecici: {
    marginBottom: 15,
  },
  seciciBaslik: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  seciciButonlar: {
    flexDirection: 'row',
    gap: 10,
  },
  seciciButon: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  seciciButonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  kaydetButon: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  kaydetButonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OgretmenSinavYonetimi; 