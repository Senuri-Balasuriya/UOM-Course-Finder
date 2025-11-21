import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const favourites = useSelector((state) => state.favourites.favourites);

  const recentCourses = favourites.slice(0, 3);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: theme.colors.card }]}>
        <View style={styles.heroContent}>
          <View style={styles.greeting}>
            <Text style={[styles.welcomeText, { color: theme.colors.textSecondary }]}>Welcome back,</Text>
            <Text style={[styles.userName, { color: theme.colors.text }]}>{user?.firstName || user?.username}! 👋</Text>
          </View>
          <TouchableOpacity style={[styles.notificationBtn, { backgroundColor: theme.colors.primaryLight }]}>
            <Feather name="bell" size={24} color={theme.colors.primary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Continue your learning journey and achieve your goals
        </Text>

        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.statIcon}>
              <Feather name="book-open" size={24} color="#1E3A8A" />
            </View>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>20</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Courses</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.statIcon}>
              <Feather name="heart" size={24} color="#EF4444" />
            </View>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{favourites.length}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Saved</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.statIcon}>
              <Feather name="award" size={24} color="#F59E0B" />
            </View>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>4.8★</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Courses')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#EFF6FF' }]}>
              <Feather name="grid" size={24} color="#1E3A8A" />
            </View>
            <Text style={[styles.actionText, { color: theme.colors.text }]}>Browse All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Favourites')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FEE2E2' }]}>
              <Feather name="heart" size={24} color="#EF4444" />
            </View>
            <Text style={[styles.actionText, { color: theme.colors.text }]}>My Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F3E8FF' }]}>
              <Feather name="user" size={24} color="#8B5CF6" />
            </View>
            <Text style={[styles.actionText, { color: theme.colors.text }]}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Feather name="settings" size={24} color="#F59E0B" />
            </View>
            <Text style={[styles.actionText, { color: theme.colors.text }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      {recentCourses.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recently Saved</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
              <Text style={styles.seeAllText}>View All →</Text>
            </TouchableOpacity>
          </View>
          {recentCourses.map((course, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.recentCard, { backgroundColor: theme.colors.card }]}
              onPress={() => navigation.navigate('Details', { course })}
            >
              <View style={styles.recentImage}>
                {course.thumbnail ? (
                  <Image source={{ uri: course.thumbnail }} style={styles.recentImg} />
                ) : (
                  <View style={styles.recentPlaceholder}>
                    <Feather name="monitor" size={24} color="#9CA3AF" />
                  </View>
                )}
              </View>
              <View style={styles.recentInfo}>
                <Text style={[styles.recentTitle, { color: theme.colors.text }]} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text style={[styles.recentInstructor, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                  {course.instructor}
                </Text>
                <View style={styles.recentMeta}>
                  <Feather name="star" size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={[styles.recentRating, { color: theme.colors.text }]}>{course.rating}</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* CTA Banner */}
      <View style={styles.ctaBanner}>
        <View style={styles.ctaContent}>
          <Text style={styles.ctaTitle}>Start Learning Today!</Text>
          <Text style={styles.ctaSubtitle}>
            Explore thousands of courses and enhance your skills
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Courses')}
          >
            <Text style={styles.ctaButtonText}>Browse Courses</Text>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  hero: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  greeting: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    color: '#111827',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 16,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.3,
  },
  seeAllText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionCard: {
    width: '25%',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'center',
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  recentImage: {
    marginRight: 12,
  },
  recentImg: {
    width: 60,
    height: 80,
    borderRadius: 10,
  },
  recentPlaceholder: {
    width: 60,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 20,
  },
  recentInstructor: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  recentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentRating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  ctaBanner: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#1E3A8A',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  ctaSubtitle: {
    fontSize: 15,
    color: '#93C5FD',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
    marginRight: 8,
  },
});

export default WelcomeScreen;
