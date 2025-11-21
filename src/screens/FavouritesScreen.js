import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavourite } from '../redux/favouritesSlice';
import { getCoverImageUrl } from '../utils/courseApi';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const FavouritesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const favourites = useSelector((state) => state.favourites.favourites);
  const dispatch = useDispatch();

  const handleRemoveFavourite = (courseKey, courseTitle) => {
    Alert.alert(
      'Remove Favourite',
      `Remove "${courseTitle}" from favourites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeFavourite(courseKey)),
        },
      ]
    );
  };

  const renderFavouriteCard = ({ item }) => {
    const imageUrl = getCoverImageUrl(item.thumbnail);

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('Details', { course: item })}
      >
        <View style={styles.cardContent}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.coverImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Feather name="monitor" size={40} color="#9CA3AF" />
            </View>
          )}
          
          <View style={styles.cardInfo}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.cardAuthor, { color: theme.colors.textSecondary }]} numberOfLines={1}>
              {item.instructor}
            </Text>
            <View style={styles.cardMeta}>
              <Feather name="star" size={12} color="#FBBF24" fill="#FBBF24" />
              <Text style={[styles.cardYear, { color: theme.colors.textSecondary }]}>{item.rating} • {item.category}</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFavourite(item.key, item.title)}
          >
            <Feather name="trash-2" size={20} color="#ff3b30" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (favourites.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.emptyIconContainer, { borderColor: theme.colors.primary }]}>
          <Feather name="heart" size={70} color={theme.colors.primary} />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No Saved Courses Yet</Text>
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          Browse our course library and save your favorites here
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.browseButtonText}>Browse Courses</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.gradientHeader, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>My Collection ❤️</Text>
        <Text style={styles.headerSubtitle}>
          {favourites.length} {favourites.length === 1 ? 'Course' : 'Courses'} Saved
        </Text>
      </View>
      
      <FlatList
        data={favourites}
        renderItem={renderFavouriteCard}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  gradientHeader: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#93C5FD',
    fontWeight: '500',
  },
  list: {
    padding: 20,
    paddingTop: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 18,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F0F4FF',
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  coverImage: {
    width: 90,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
  },
  placeholderImage: {
    width: 90,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 24,
  },
  cardAuthor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '400',
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardYear: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  removeButton: {
    padding: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 4,
    borderColor: '#DBEAFE',
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginTop: 24,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  browseButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 48,
    paddingVertical: 18,
    borderRadius: 20,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#1E40AF',
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default FavouritesScreen;
