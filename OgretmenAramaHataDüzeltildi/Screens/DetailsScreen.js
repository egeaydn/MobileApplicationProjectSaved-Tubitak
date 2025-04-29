import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Share, Animated, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.6;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function DetailsScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { title, details, imageSource } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 0.7],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

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
        <Animated.Image 
          source={imageSource} 
          style={[styles.image, { opacity: imageOpacity }]}
          resizeMode="cover"
          defaultSource={require('../assets/OkulLogo.jpg')}
        />
      );
    } catch (error) {
      console.error('Detail image loading error:', error);
      return (
        <Animated.Image 
          source={require('../assets/OkulLogo.jpg')} 
          style={[styles.image, { opacity: imageOpacity }]}
          resizeMode="cover"
        />
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar translucent backgroundColor="transparent" />
      
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        {renderDetailImage()}
        <View style={styles.overlay} />
        
        <Animated.View 
          style={[
            styles.headerTitle,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslateY }
              ]
            }
          ]}
        >
          <Text style={styles.mainTitle}>{title}</Text>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={[styles.contentContainer, { backgroundColor: theme.colors.card }]}>
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

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <Text style={[styles.detailsText, { color: theme.colors.text }]}>
            {details}
          </Text>

          <View style={[styles.interactionBar, { borderTopColor: theme.colors.border }]}>
            <TouchableOpacity 
              style={[styles.interactionButton, { backgroundColor: isLiked ? 'rgba(255, 75, 75, 0.1)' : theme.colors.background }]}
              onPress={handleLike}
            >
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isLiked ? "#ff4b4b" : theme.colors.text} 
              />
              <Text style={[
                styles.interactionText, 
                { color: isLiked ? "#ff4b4b" : theme.colors.text }
              ]}>
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
        </View>
      </Animated.ScrollView>

      <TouchableOpacity 
        style={[styles.backButton, { backgroundColor: theme.colors.card }]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
  },
  headerTitle: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  contentContainer: {
    marginTop: HEADER_MAX_HEIGHT - 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
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
    backgroundColor: 'rgba(0,0,0,0.03)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  metaText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 24,
  },
  detailsText: {
    fontSize: 17,
    lineHeight: 28,
    marginBottom: 30,
    letterSpacing: 0.3,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 24,
    borderTopWidth: 1,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  interactionText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2,
  },
});
