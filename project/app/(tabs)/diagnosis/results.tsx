import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Share as ShareIcon } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { saveDiagnosisResult } from '@/services/diagnosisService';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [parsedResult, setParsedResult] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  
  useEffect(() => {
    if (params.result) {
      try {
        const result = JSON.parse(params.result);
        setParsedResult(result);
        
        // Save result to history
        saveDiagnosisResult(result);
        
        // Animate the result card appearance
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error('Error parsing result:', error);
      }
    }
  }, [params.result]);

  const getResultIcon = () => {
    const prediction = parsedResult?.prediction;
    if (prediction === 'PCOS Detected') {
      return <AlertCircle size={48} color={theme.colors.error[500]} />;
    } else if (prediction === 'No PCOS Detected') {
      return <CheckCircle size={48} color={theme.colors.success[500]} />;
    } else {
      return <Clock size={48} color={theme.colors.warning[500]} />;
    }
  };

  const getResultColor = () => {
    const prediction = parsedResult?.prediction;
    if (prediction === 'PCOS Detected') {
      return theme.colors.error[500];
    } else if (prediction === 'No PCOS Detected') {
      return theme.colors.success[500];
    } else {
      return theme.colors.warning[500];
    }
  };

  const getConfidenceLevel = () => {
    const confidence = parsedResult?.confidence || 0;
    return (confidence * 100).toFixed(1);
  };

  const handleShare = () => {
    // Implement share functionality here
    alert('Sharing functionality would be implemented here');
  };

  if (!parsedResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.gray[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Diagnosis Results</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading results...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diagnosis Results</Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <ShareIcon size={20} color={theme.colors.primary[600]} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={[
            styles.resultCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.resultIconContainer}>
            {getResultIcon()}
          </View>
          <Text style={[styles.resultTitle, { color: getResultColor() }]}>
            {parsedResult.prediction}
          </Text>
          <Text style={styles.resultDate}>
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>

          <View style={styles.confidenceContainer}>
            <View style={styles.confidenceHeader}>
              <Text style={styles.confidenceTitle}>Confidence Level</Text>
              <Text style={styles.confidencePercentage}>{getConfidenceLevel()}%</Text>
            </View>
            <ProgressBar 
              progress={parsedResult.confidence} 
              color={getResultColor()} 
              height={8} 
            />
          </View>
        </Animated.View>

        <Card style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Analysis Details</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Key Indicators:</Text>
            <Text style={styles.detailValue}>
              {parsedResult.indicators?.join(', ') || 'Not available'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Risk Factors:</Text>
            <Text style={styles.detailValue}>
              {parsedResult.riskFactors?.join(', ') || 'Not available'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Recommendations:</Text>
            <Text style={styles.detailValue}>
              {parsedResult.recommendations || 'Please consult with your healthcare provider for personalized recommendations.'}
            </Text>
          </View>
        </Card>

        <Card style={styles.imageCard}>
          <Text style={styles.imageTitle}>Ultrasound Image</Text>
          {params.imageUri ? (
            <Image
              source={{ uri: params.imageUri }}
              style={styles.ultrasoundImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>No image available</Text>
            </View>
          )}
        </Card>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/education')}
        >
          <Text style={styles.actionButtonText}>Learn More About PCOS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.secondaryButtonText}>Return to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary[100], // light pink background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white,
    backgroundColor: theme.colors.primary[100],
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.black,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  resultCard: {
    backgroundColor: theme.colors.white, // white card
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultIconContainer: {
    marginBottom: 16,
  },
  resultTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  resultDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.primary[600],
    marginBottom: 24,
  },
  confidenceContainer: {
    width: '100%',
  },
  confidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  confidenceTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
  },
  confidencePercentage: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.black,
  },
  detailsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  detailsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.black,
    marginBottom: 16,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.black,
    lineHeight: 20,
  },
  imageCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  imageTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.black,
    marginBottom: 16,
  },
  ultrasoundImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  noImageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
    borderRadius: 8,
  },
  noImageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
  },
  actionButton: {
    backgroundColor: theme.colors.primary[200],
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.black,
  },
  secondaryButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary[600],
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.primary[600],
  },
});