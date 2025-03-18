import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const newsData = [
  {
    id: 1,
    title: "Okulumuz Kartepe Gezisi",
    details: "Okulumuzun düzenlediği Kartepe gezisi büyük bir başarıyla tamamlandı. Öğrencilerimiz, muhteşem doğa manzaraları eşliğinde keyifli vakit geçirdi. Gezide kayak yapma fırsatı bulan öğrencilerimiz, kış sporlarına olan ilgilerini artırdı. Ayrıca, doğa yürüyüşü ve kar aktiviteleri ile unutulmaz anılar biriktirdiler. Bu gezi, öğrencilerimizin hem sosyal gelişimine katkı sağladı hem de doğa bilincini artırdı.",
    imageSource: require('../assets/h1.jpg')
  },
  {
    id: 2,
    title: "1. Dönem Sonu Etkinlik Programımız",
    details: "1. dönem sonu etkinliklerimiz kapsamında birbirinden renkli aktiviteler düzenlendi. Programımızda öğrenci konserimiz, resim sergimiz ve spor müsabakaları yer aldı. Öğrencilerimizin yeteneklerini sergilediği konser büyük beğeni topladı. Resim sergisinde genç sanatçılarımızın eserleri görücüye çıktı. Spor müsabakalarında ise centilmence bir rekabet yaşandı.",
    imageSource: require('../assets/h2.jpg')
  },
  {
    id: 3,
    title: "Okulumuzda Futbol Turnuvası Yapıldı",
    details: "Geleneksel futbol turnuvamız bu yıl da büyük bir heyecanla gerçekleşti. Sınıflar arası düzenlenen turnuvada kıyasıya mücadeleler yaşandı. Final maçı özellikle nefes kesiciydi. Turnuva boyunca fair-play ruhu ön plandaydı. Dereceye giren takımlara ödülleri törenle verildi. Bu etkinlik, öğrencilerimiz arasında dostluk bağlarının güçlenmesine vesile oldu.",
    imageSource: require('../assets/h3.jpg')
  },
  {
    id: 4,
    title: "Tüketici Hakları Semineri",
    details: "Okulumuzda düzenlenen Tüketici Hakları Semineri'nde öğrencilerimiz bilinçli tüketim konusunda bilgilendirildi. Uzman konuşmacılar eşliğinde gerçekleşen seminerde, tüketici hakları, alışveriş yaparken dikkat edilmesi gerekenler ve bilinçli tüketimin önemi gibi konular ele alındı. İnteraktif geçen seminerde öğrencilerimiz sorularıyla aktif katılım gösterdi.",
    imageSource: require('../assets/h4.jpg')
  }
];

export default function Screen1({ navigation }) {
  const { theme } = useTheme();

  const handleCardPress = (item) => {
    try {
      navigation.navigate('Details', {
        title: item.title,
        details: item.details,
        imageSource: item.imageSource
      });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const renderImage = (source) => {
    try {
      return (
        <Image 
          source={source} 
          style={styles.cardImage}
          defaultSource={require('../assets/OkulLogo.jpg')} // Yedek resim
        />
      );
    } catch (error) {
      console.error('Image loading error:', error);
      return (
        <Image 
          source={require('../assets/OkulLogo.jpg')} 
          style={styles.cardImage}
        />
      );
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Okul Haberleri
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          En son gelişmeler ve etkinlikler
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {newsData.map((item, index) => (
          <Animatable.View
            key={item.id}
            animation="fadeInUp"
            delay={index * 200}
            duration={1000}
          >
            <Card
              title={item.title}
              imageSource={item.imageSource}
              onPress={() => handleCardPress(item)}
              theme={theme}
            />
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
}

const Card = ({ title, imageSource, onPress, theme }) => (
  <TouchableOpacity 
    style={[styles.card, { backgroundColor: theme.colors.card }]}
    onPress={onPress}
    activeOpacity={0.9}
  >
    {renderImage(imageSource)}
    <View style={styles.cardOverlay} />
    <View style={styles.cardContent}>
      <Text style={[styles.cardTitle, { color: '#fff' }]} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.cardButton}>
        <Text style={styles.cardButtonText}>Devamını Oku</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  cardsContainer: {
    padding: 15,
  },
  card: {
    width: width - 30,
    height: 220,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  cardButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});