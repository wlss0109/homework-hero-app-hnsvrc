
import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  ActivityIndicator 
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";

export default function SolutionScreen() {
  const { question } = useLocalSearchParams<{ question: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    // Simulate solving the question
    const solveProblem = async () => {
      console.log('Solving problem:', question);
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock solution based on the question
      const mockSolution = generateMockSolution(question || '');
      setSolution(mockSolution.answer);
      setSteps(mockSolution.steps);
      setIsLoading(false);
    };

    solveProblem();
  }, [question]);

  const generateMockSolution = (questionText: string) => {
    // Simple mock solution generator
    const lowerQuestion = questionText.toLowerCase();
    
    if (lowerQuestion.includes('math') || lowerQuestion.includes('equation') || lowerQuestion.includes('solve')) {
      return {
        answer: "x = 5",
        steps: [
          "1. Start with the given equation",
          "2. Isolate the variable on one side",
          "3. Perform arithmetic operations",
          "4. Verify the solution by substitution"
        ]
      };
    } else if (lowerQuestion.includes('science') || lowerQuestion.includes('physics') || lowerQuestion.includes('chemistry')) {
      return {
        answer: "The answer involves understanding the fundamental principles of the scientific concept mentioned.",
        steps: [
          "1. Identify the key scientific principles involved",
          "2. Apply relevant formulas or theories",
          "3. Calculate using given values",
          "4. Interpret the results in context"
        ]
      };
    } else if (lowerQuestion.includes('history') || lowerQuestion.includes('when') || lowerQuestion.includes('who')) {
      return {
        answer: "This historical question requires analysis of events, dates, and key figures from the specified time period.",
        steps: [
          "1. Identify the time period in question",
          "2. Research key events and figures",
          "3. Analyze cause and effect relationships",
          "4. Draw conclusions based on historical evidence"
        ]
      };
    } else {
      return {
        answer: "Based on your question, here's a comprehensive solution that addresses the key concepts involved.",
        steps: [
          "1. Break down the question into key components",
          "2. Apply relevant knowledge and principles",
          "3. Work through the problem systematically",
          "4. Verify and explain the final answer"
        ]
      };
    }
  };

  const handleSaveQuestion = () => {
    console.log('Saving question and solution');
    // In a real app, this would save to local storage or backend
    router.back();
  };

  const handleAskAnother = () => {
    router.back();
  };

  const renderHeaderLeft = () => (
    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="chevron.left" color={colors.primary} size={24} />
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Solution",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerLeft: renderHeaderLeft,
          headerBackVisible: false,
        }}
      />
      <SafeAreaView style={[commonStyles.container]} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Question Section */}
          <View style={[commonStyles.card, styles.questionCard]}>
            <View style={styles.cardHeader}>
              <IconSymbol name="questionmark.circle.fill" size={24} color={colors.primary} />
              <Text style={styles.cardTitle}>Your Question</Text>
            </View>
            <Text style={styles.questionText}>{question}</Text>
          </View>

          {/* Solution Section */}
          <View style={[commonStyles.card, styles.solutionCard]}>
            <View style={styles.cardHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.secondary} />
              <Text style={styles.cardTitle}>Solution</Text>
            </View>
            
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Analyzing your question...</Text>
              </View>
            ) : (
              <>
                <View style={styles.answerContainer}>
                  <Text style={styles.answerLabel}>Answer:</Text>
                  <Text style={styles.answerText}>{solution}</Text>
                </View>
                
                <View style={styles.stepsContainer}>
                  <Text style={styles.stepsLabel}>Step-by-step solution:</Text>
                  {steps.map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Action Buttons */}
          {!isLoading && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[buttonStyles.primary, styles.actionButton]}
                onPress={handleSaveQuestion}
              >
                <IconSymbol name="bookmark.fill" size={20} color={colors.card} style={styles.buttonIcon} />
                <Text style={commonStyles.buttonText}>Save Question</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[buttonStyles.outline, styles.actionButton]}
                onPress={handleAskAnother}
              >
                <IconSymbol name="plus.circle" size={20} color={colors.primary} style={styles.buttonIcon} />
                <Text style={commonStyles.buttonTextOutline}>Ask Another</Text>
              </TouchableOpacity>
            </View>
          )}
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
    paddingBottom: 40,
  },
  questionCard: {
    marginBottom: 20,
  },
  solutionCard: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  questionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    backgroundColor: colors.highlight,
    padding: 12,
    borderRadius: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
  answerContainer: {
    marginBottom: 24,
  },
  answerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  answerText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  stepsContainer: {
    marginTop: 8,
  },
  stepsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
