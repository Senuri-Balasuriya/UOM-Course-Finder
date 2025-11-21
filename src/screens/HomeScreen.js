import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { fetchCourses, getCoverImageUrl } from '../utils/courseApi';
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector((state) => state.auth.user);

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
        style={styles.card}
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
            <View style={styles.cardHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Feather name="star" size={11} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingValue}>{item.rating}</Text>
              </View>
            </View>
            
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            
            <View style={styles.instructorRow}>
              <View style={styles.avatarIcon}>
                <Feather name="user" size={10} color="#1E3A8A" />
              </View>
              <Text style={styles.instructorName} numberOfLines={1}>
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
              <Text style={styles.priceText}>${item.price}</Text>
              <View style={styles.enrollBtn}>
                <Text style={styles.enrollText}>Enroll</Text>
                <Feather name="arrow-right" size={12} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerBadge}>
          <Feather name="user" size={14} color="#FFFFFF" />
          <Text style={styles.headerUsername}>{user?.firstName || user?.username}</Text>
        </View>
      ),
    });
  }, [navigation, user]);

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
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
    <View style={styles.container}>
      <View style={styles.gradientHeader}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.firstName || user?.username}! 👋</Text>
          </View>
          <View style={styles.profileBadge}>
            <Feather name="award" size={20} color="#FFD700" />
          </View>
        </View>
        
        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#1E3A8A" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Discover your next course..."
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
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{courses.length}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.8★</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>50k+</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>✨ Featured Courses</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All →</Text>
        </TouchableOpacity>
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
  gradientHeader: {
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: '#93C5FD',
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  profileBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#93C5FD',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headerUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.3,
  },
  viewAllText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  list: {
    padding: 20,
    paddingTop: 12,
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
    width: 95,
    height: 130,
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
    letterSpacing: 0.2,
    lineHeight: 24,
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

export default HomeScreen;
