
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Platform, 
  TouchableOpacity 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

interface SavedQuestion {
  id: string;
  question: string;
  subject: string;
  date: string;
  solved: boolean;
}

export default function ProfileScreen() {
  // Mock saved questions data
  const [savedQuestions] = useState<SavedQuestion[]>([
    {
      id: '1',
      question: 'Solve for x: 2x + 5 = 15',
      subject: 'Math',
      date: '2024-01-15',
      solved: true,
    },
    {
      id: '2',
      question: 'What is photosynthesis and how does it work?',
      subject: 'Biology',
      date: '2024-01-14',
      solved: true,
    },
    {
      id: '3',
      question: 'Explain the causes of World War I',
      subject: 'History',
      date: '2024-01-13',
      solved: false,
    },
  ]);

  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'math':
        return 'function';
      case 'biology':
      case 'science':
        return 'atom';
      case 'history':
        return 'globe';
      default:
        return 'book.fill';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'math':
        return colors.secondary;
      case 'biology':
      case 'science':
        return colors.accent;
      case 'history':
        return colors.primary;
      default:
        return colors.textSecondary;
    }
  };

  const renderQuestionItem = (item: SavedQuestion) => (
    <TouchableOpacity key={item.id} style={[commonStyles.card, styles.questionItem]}>
      <View style={styles.questionHeader}>
        <View style={styles.subjectContainer}>
          <IconSymbol 
            name={getSubjectIcon(item.subject)} 
            size={20} 
            color={getSubjectColor(item.subject)} 
          />
          <Text style={[styles.subjectText, { color: getSubjectColor(item.subject) }]}>
            {item.subject}
          </Text>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: item.solved ? colors.accent + '20' : colors.secondary + '20' 
        }]}>
          <Text style={[styles.statusText, { 
            color: item.solved ? colors.accent : colors.secondary 
          }]}>
            {item.solved ? 'Solved' : 'Pending'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.questionPreview} numberOfLines={2}>
        {item.question}
      </Text>
      
      <Text style={styles.dateText}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={[commonStyles.card, styles.profileHeader]}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={commonStyles.subtitle}>Study Profile</Text>
          <Text style={commonStyles.textSecondary}>Track your learning progress</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{savedQuestions.length}</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {savedQuestions.filter(q => q.solved).length}
              </Text>
              <Text style={styles.statLabel}>Solved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round((savedQuestions.filter(q => q.solved).length / savedQuestions.length) * 100)}%
              </Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>
        </View>

        {/* Saved Questions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="bookmark.fill" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Saved Questions</Text>
          </View>
          
          {savedQuestions.length > 0 ? (
            <View style={styles.questionsList}>
              {savedQuestions.map(renderQuestionItem)}
            </View>
          ) : (
            <View style={[commonStyles.card, styles.emptyState]}>
              <IconSymbol name="bookmark" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyStateText}>No saved questions yet</Text>
              <Text style={commonStyles.textSecondary}>
                Questions you save will appear here
              </Text>
            </View>
          )}
        </View>

        {/* Subject Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="chart.bar.fill" size={24} color={colors.secondary} />
            <Text style={styles.sectionTitle}>Subject Breakdown</Text>
          </View>
          
          <View style={[commonStyles.card, styles.subjectBreakdown]}>
            {['Math', 'Science', 'History', 'Literature'].map((subject, index) => {
              const count = savedQuestions.filter(q => 
                q.subject.toLowerCase() === subject.toLowerCase()
              ).length;
              
              return (
                <View key={subject} style={styles.subjectRow}>
                  <View style={styles.subjectInfo}>
                    <IconSymbol 
                      name={getSubjectIcon(subject)} 
                      size={20} 
                      color={getSubjectColor(subject)} 
                    />
                    <Text style={styles.subjectName}>{subject}</Text>
                  </View>
                  <Text style={styles.subjectCount}>{count}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.textSecondary + '20',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.textSecondary + '20',
    marginHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  questionsList: {
    gap: 12,
  },
  questionItem: {
    padding: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  questionPreview: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 12,
    marginBottom: 4,
  },
  subjectBreakdown: {
    padding: 16,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary + '10',
  },
  subjectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  subjectCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
