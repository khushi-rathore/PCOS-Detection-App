import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, ClipboardCheck, BookOpen, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';

export default function HomePage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { user } = useAuth();
  
  const isSmallScreen = width < 768;
  const username = user?.name || 'there';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi {username},</Text>
          <Text style={styles.welcomeText}>Welcome to PCOS Detective</Text>
        </View>

        <Card style={styles.mainCard}>
          <LinearGradient
            colors={[theme.colors.primary[500], theme.colors.primary[700]]}
            style={styles.gradientBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Get Diagnosed</Text>
                <Text style={styles.cardDescription}>
                  Take a quick assessment to check for PCOS indicators.
                </Text>
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => router.push('/diagnosis')}
                >
                  <Text style={styles.buttonText}>Start Assessment</Text>
                  <ChevronRight size={16} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.illustrationContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg' }}
                  style={styles.illustration}
                  resizeMode="cover"
                />
              </View>
            </View>
          </LinearGradient>
        </Card>

        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        
        <View style={[styles.featuresGrid, { flexDirection: isSmallScreen ? 'column' : 'row' }]}>
          <TouchableOpacity 
            style={[styles.featureCard, isSmallScreen && styles.featureCardFullWidth]} 
            onPress={() => router.push('/diagnosis')}
          >
            <ClipboardCheck size={24} color={theme.colors.primary[600]} />
            <Text style={styles.featureTitle}>PCOS Diagnosis</Text>
            <Text style={styles.featureDescription}>Complete assessment with ultrasound image analysis</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.featureCard, isSmallScreen && styles.featureCardFullWidth]} 
            onPress={() => router.push('/education')}
          >
            <BookOpen size={24} color={theme.colors.secondary[600]} />
            <Text style={styles.featureTitle}>Learn about PCOS</Text>
            <Text style={styles.featureDescription}>Educational resources and information</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.featureCard, isSmallScreen && styles.featureCardFullWidth]} 
            onPress={() => router.push('/diagnosis/history')}
          >
            <MessageCircle size={24} color={theme.colors.tertiary[600]} />
            <Text style={styles.featureTitle}>View History</Text>
            <Text style={styles.featureDescription}>Track your diagnosis history and symptoms</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary[100], // light pink background
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.black, // black text for contrast
    marginBottom: 4,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.black, // black text for contrast
  },
  mainCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: theme.colors.white, // white card for contrast
  },
  gradientBg: {
    borderRadius: 20,
  },
  cardContent: {
    padding: 24,
    flexDirection: 'row',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: theme.colors.black, // black for sharp contrast
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.black, // black for readability
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: theme.colors.primary[200], // classic pink
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    transition: 'all 0.2s',
  },
  buttonText: {
    color: theme.colors.black, // black text on pink
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginRight: 8,
  },
  cardButtonHover: {
    backgroundColor: theme.colors.primary[300], // coral on hover
    transform: [{ scale: 1.04 }],
  },
  illustrationContainer: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.black, // black for section titles
    marginTop: 24,
    marginBottom: 8,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: theme.colors.white, // white card for contrast
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.primary[50],
  },
  featureCardFullWidth: {
    width: '100%',
  },
  featureTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.black, // black for feature titles
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.black, // black for feature descriptions
    textAlign: 'center',
  },
});