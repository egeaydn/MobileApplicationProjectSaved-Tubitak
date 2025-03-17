import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function Screen1({ navigation }) {
  const { theme } = useTheme();

  const handleCardPress = (title, details) => {
    navigation.navigate('Details', { title, details });
  };

  return (
    <ScrollView 
      contentContainerStyle={[styles.scrollView, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Okul Haberleri</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>En güncel gelişmeler</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.container}>
        <Animatable.View 
          animation="fadeInUp" 
          duration={1000} 
          style={styles.cardWrapper}
        >
          <Card
            title="Okulumuz Kartepe Gezisi"
            imageSource={require('../assets/h1.jpg')}
            onPress={() => handleCardPress("Okulumuz Kartepe Gezisi", "Kartepe'deki gezimiz harika geçti. Detaylar...")}
            theme={theme}
          />
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp" 
          duration={1000} 
          delay={200}
          style={styles.cardWrapper}
        >
          <Card
            title="1. Dönem Sonu Etkinlik Programımız"
            imageSource={require('../assets/h2.jpg')}
            onPress={() =>
              handleCardPress("1. Dönem Sonu Etkinlik Programımız", "Etkinlik detayları: Konser, sergi, turnuva...")
            }
            theme={theme}
          />
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp" 
          duration={1000} 
          delay={400}
          style={styles.cardWrapper}
        >
          <Card
            title="Okulumuzda Futbol Turnuvası Yapıldı"
            imageSource={require('../assets/h3.jpg')}
            onPress={() =>
              handleCardPress("Okulumuzda Futbol Turnuvası Yapıldı", "Turnuvada büyük bir çekişme yaşandı!")
            }
            theme={theme}
          />
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp" 
          duration={1000} 
          delay={600}
          style={styles.cardWrapper}
        >
          <Card
            title="Tüketici Hakları Semineri"
            imageSource={require('../assets/h4.jpg')}
            onPress={() =>
              handleCardPress("Tüketici Hakları Semineri", "Öğrencilere tüketici hakları anlatıldı.")
            }
            theme={theme}
          />
        </Animatable.View>
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
    <Image source={imageSource} style={styles.cardImage} />
    <View style={styles.cardOverlay} />
    <View style={styles.cardContent}>
      <Text style={styles.cardText}>{title}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.readMore}>Devamını Oku →</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  container: {
    padding: 15,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  card: {
    width: width - 30,
    height: 250,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  cardText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  readMore: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});