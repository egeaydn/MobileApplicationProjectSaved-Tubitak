import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Share, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function DetailsScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { title, details, imageSource } = route.params;
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${details}`,
        title: title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const renderDetailImage = () => {
    try {
      return (
        <Image 
          source={imageSource} 
          style={styles.image}
          resizeMode="cover"
          defaultSource={require('../assets/OkulLogo.jpg')}
        />
      );
    } catch (error) {
      console.error('Detail image loading error:', error);
      return (
        <Image 
          source={require('../assets/OkulLogo.jpg')} 
          style={styles.image}
          resizeMode="cover"
        />
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Animatable.View 
          animation="fadeIn" 
          duration={1000}
          style={styles.imageWrapper}
        >
          {renderDetailImage()}
          <View style={styles.overlay} />
          
          <Animatable.View 
            animation="fadeInDown"
            delay={500}
            style={styles.headerTitle}
          >
            <Text style={styles.mainTitle}>{title}</Text>
          </Animatable.View>
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp" 
          duration={1000} 
          delay={300}
          style={[styles.contentContainer, { backgroundColor: theme.colors.card }]}
        >
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {new Date().toLocaleDateString('tr-TR')}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {Math.ceil(details.length / 500)} dk okuma
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={[styles.detailsText, { color: theme.colors.text }]}>
            {details}
          </Text>

          <View style={styles.interactionBar}>
            <TouchableOpacity 
              style={[styles.interactionButton, { backgroundColor: theme.colors.background }]}
              onPress={handleLike}
            >
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isLiked ? "#ff4b4b" : theme.colors.text} 
              />
              <Text style={[styles.interactionText, { color: theme.colors.text }]}>
                {isLiked ? 'Beğenildi' : 'Beğen'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.interactionButton, { backgroundColor: theme.colors.background }]}
              onPress={handleShare}
            >
              <Ionicons name="share-social-outline" size={24} color={theme.colors.text} />
              <Text style={[styles.interactionText, { color: theme.colors.text }]}>Paylaş</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>

      <Animatable.View 
        animation="fadeInUp"
        duration={500}
        style={styles.floatingButton}
      >
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.colors.card }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageWrapper: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerTitle: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  contentContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
    paddingTop: 30,
    minHeight: height * 0.5,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 8,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 20,
  },
  detailsText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  interactionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  floatingButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
