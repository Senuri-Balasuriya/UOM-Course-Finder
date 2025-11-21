import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import { fetchCourses, getCoverImageUrl } from '../utils/courseApi';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const CoursesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async (query = 'computer science') => {
    setLoading(true);
    const result = await fetchCourses(query);
    if (result.success) {
      setCourses(result.data);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCourses(searchQuery || 'computer science');
    setRefreshing(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      loadCourses(searchQuery);
    }
  };

  const renderCourseCard = ({ item, index }) => {
    const imageUrl = getCoverImageUrl(item.thumbnail);

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('Details', { course: item })}
        activeOpacity={0.92}
      >
        <View style={styles.cardRow}>
          <View style={styles.imageWrapper}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.coverImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Feather name="monitor" size={32} color="#9CA3AF" />
              </View>
            )}
            {index < 3 && (
              <View style={styles.trendingBadge}>
                <Feather name="trending-up" size={10} color="#FFD700" />
              </View>
            )}
          </View>
          
          <View style={styles.cardInfo}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            
            <View style={styles.ratingRow}>
              <Feather name="star" size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingValue}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.students > 1000 ? `${(item.students / 1000).toFixed(0)}k` : item.students} reviews)</Text>
            </View>
            
            <Text style={[styles.cardTitle, { color: theme.colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            
            <View style={styles.instructorRow}>
              <View style={[styles.avatarIcon, { backgroundColor: theme.colors.primaryLight }]}>
                <Feather name="user" size={10} color={theme.colors.primary} />
              </View>
              <Text style={[styles.instructorName, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {item.instructor}
              </Text>
            </View>
            
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Feather name="users" size={12} color="#6B7280" />
                <Text style={styles.metaText}>{(item.students / 1000).toFixed(1)}k</Text>
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{item.level}</Text>
              </View>
            </View>
            
            <View style={styles.cardFooter}>
              <View style={styles.enrollBtn}>
                <Text style={styles.enrollText}>View Details</Text>
                <Feather name="arrow-right" size={12} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <View style={styles.spinnerRing1} />
          <View style={styles.spinnerRing2} />
          <Feather name="monitor" size={40} color="#1E3A8A" />
        </View>
        <Text style={styles.loadingText}>Discovering courses...</Text>
        <View style={styles.loadingDotsContainer}>
          <View style={styles.loadingDot} />
          <View style={styles.loadingDot} />
          <View style={styles.loadingDot} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>All Courses</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.primaryLight }]}>{courses.length} courses available</Text>
        
        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#1E3A8A" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => {
                setSearchQuery('');
                loadCourses('computer science');
              }}>
                <Feather name="x-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="monitor" size={60} color="#D1D5DB" />
            <Text style={styles.emptyText}>No courses found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#1E3A8A',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#93C5FD',
    fontWeight: '500',
    marginBottom: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    paddingHorizontal: 18,
    height: 52,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  spinnerRing1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#E0E7FF',
    borderTopColor: '#1E3A8A',
    borderRightColor: '#1E3A8A',
  },
  spinnerRing2: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#E0E7FF',
    borderLeftColor: '#3B82F6',
    borderBottomColor: '#3B82F6',
  },
  loadingText: {
    marginTop: 24,
    fontSize: 18,
    color: '#1E3A8A',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loadingDotsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E3A8A',
  },
  list: {
    padding: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F4FF',
  },
  cardRow: {
    flexDirection: 'row',
    padding: 14,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  coverImage: {
    width: 110,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  placeholderImage: {
    width: 110,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DBEAFE',
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardInfo: {
    flex: 1,
    paddingVertical: 2,
  },
  categoryBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1E3A8A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 20,
    letterSpacing: 0.2,
    height: 40,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  instructorName: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  metaText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    marginLeft: 3,
  },
  levelBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 9,
    color: '#1E3A8A',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
    marginTop: 2,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  enrollBtn: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  enrollText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});

export default CoursesScreen;
