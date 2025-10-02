
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  Alert 
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSolveQuestion = () => {
    if (!question.trim()) {
      Alert.alert('Empty Question', 'Please enter a question to solve.');
      return;
    }

    console.log('Solving question:', question);
    setIsLoading(true);
    
    // Navigate to solution screen with the question
    router.push({
      pathname: '/solution',
      params: { question: question.trim() }
    });
    
    setIsLoading(false);
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Image Upload', 
      'Image upload feature will be available in a future update!',
      [{ text: 'OK' }]
    );
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => router.push('/profile')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="person.circle" color={colors.primary} size={24} />
    </TouchableOpacity>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "StudyHelper",
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <SafeAreaView style={[commonStyles.container]} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <IconSymbol name="brain.head.profile" size={60} color={colors.primary} />
            </View>
            <Text style={commonStyles.title}>StudyHelper</Text>
            <Text style={commonStyles.textSecondary}>
              Get instant solutions to any homework question
            </Text>
          </View>

          {/* Question Input Section */}
          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Enter Your Question</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Type your homework question here..."
              placeholderTextColor={colors.textSecondary}
              value={question}
              onChangeText={setQuestion}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[buttonStyles.primary, styles.solveButton]}
                onPress={handleSolveQuestion}
                disabled={isLoading}
              >
                <IconSymbol name="lightbulb.fill" size={20} color={colors.card} style={styles.buttonIcon} />
                <Text style={commonStyles.buttonText}>
                  {isLoading ? 'Solving...' : 'Solve Question'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[buttonStyles.outline, styles.uploadButton]}
                onPress={handleImageUpload}
              >
                <IconSymbol name="camera.fill" size={20} color={colors.primary} style={styles.buttonIcon} />
                <Text style={commonStyles.buttonTextOutline}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>What We Can Help With</Text>
            
            <View style={styles.featureGrid}>
              <View style={[commonStyles.card, styles.featureCard]}>
                <IconSymbol name="function" size={32} color={colors.secondary} />
                <Text style={styles.featureTitle}>Math</Text>
                <Text style={styles.featureDescription}>
                  Algebra, Calculus, Geometry, Statistics
                </Text>
              </View>
              
              <View style={[commonStyles.card, styles.featureCard]}>
                <IconSymbol name="atom" size={32} color={colors.accent} />
                <Text style={styles.featureTitle}>Science</Text>
                <Text style={styles.featureDescription}>
                  Physics, Chemistry, Biology
                </Text>
              </View>
              
              <View style={[commonStyles.card, styles.featureCard]}>
                <IconSymbol name="book.fill" size={32} color={colors.primary} />
                <Text style={styles.featureTitle}>Literature</Text>
                <Text style={styles.featureDescription}>
                  Essays, Analysis, Grammar
                </Text>
              </View>
              
              <View style={[commonStyles.card, styles.featureCard]}>
                <IconSymbol name="globe" size={32} color={colors.secondary} />
                <Text style={styles.featureTitle}>History</Text>
                <Text style={styles.featureDescription}>
                  Events, Dates, Analysis
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
  },
  solveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  featuresSection: {
    marginTop: 32,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
