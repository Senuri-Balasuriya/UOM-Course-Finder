import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../redux/favouritesSlice';
import { getCoverImageUrl } from '../utils/courseApi';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const DetailsScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { course } = route.params;
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  
  const isFavourite = favourites.some(item => item.key === course.key);
  const imageUrl = getCoverImageUrl(course.thumbnail);

  const handleToggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(course.key));
      Alert.alert('Removed', 'Course removed from favourites');
    } else {
      dispatch(addFavourite(course));
      Alert.alert('Added', 'Course added to favourites');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.coverImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Feather name="monitor" size={80} color="#9CA3AF" />
          </View>
        )}
        
        <TouchableOpacity
          style={[styles.favouriteButton, isFavourite && styles.favouriteButtonActive]}
          onPress={handleToggleFavourite}
        >
          <Feather
            name={isFavourite ? 'heart' : 'heart'}
            size={24}
            color={isFavourite ? '#FFFFFF' : '#1E3A8A'}
            fill={isFavourite ? '#1E3A8A' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.content, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{course.title}</Text>
        
        <View style={styles.metaRow}>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Feather
                key={star}
                name="star"
                size={18}
                color="#FBBF24"
                fill={star <= Math.floor(course.rating) ? '#FBBF24' : 'none'}
                style={styles.starIcon}
              />
            ))}
            <Text style={[styles.ratingText, { color: theme.colors.text }]}>{course.rating}</Text>
          </View>
          <View style={styles.enrolledBadge}>
            <Feather name="users" size={14} color="#FFFFFF" />
            <Text style={styles.enrolledText}>{(course.students / 1000).toFixed(1)}k enrolled</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Feather name="user" size={18} color={theme.colors.primary} />
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>Instructor: {course.instructor}</Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="clock" size={18} color={theme.colors.primary} />
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            Duration: {course.duration}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="bar-chart" size={18} color={theme.colors.primary} />
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            Level: {course.level}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="calendar" size={18} color={theme.colors.primary} />
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>Last Updated: {course.lastUpdated}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Course Category</Text>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{course.category}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{course.level}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>${course.price}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About This Course</Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            {course.description}
            {'\n\n'}
            This {course.level.toLowerCase()} level course in {course.category} is taught by {course.instructor}, 
            an experienced instructor who has helped thousands of students master this subject.
            {'\n\n'}
            Course duration: {course.duration}
            {'\n'}
            Total enrolled: {course.students.toLocaleString()} students
            {'\n'}
            Rating: {course.rating}/5.0
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  coverImage: {
    width: 240,
    height: 340,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  placeholderImage: {
    width: 240,
    height: 340,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  favouriteButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  favouriteButtonActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    letterSpacing: 0.2,
    lineHeight: 36,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 15,
    color: '#111827',
    marginLeft: 6,
    fontWeight: '600',
  },
  enrolledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  enrolledText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  infoText: {
    fontSize: 15,
    color: '#4B5563',
    marginLeft: 12,
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 26,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
});

export default DetailsScreen;
