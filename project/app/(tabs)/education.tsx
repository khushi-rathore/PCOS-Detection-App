import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, ExternalLink } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { openBrowserAsync } from 'expo-web-browser';

const resourceLinks = [
  {
    id: 1,
    title: 'What is PCOS?',
    description: 'Learn about the basics of Polycystic Ovary Syndrome.',
    image: 'https://images.pexels.com/photos/4098227/pexels-photo-4098227.jpeg',
    url: 'https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome'
  },
  {
    id: 2,
    title: 'PCOS Symptoms',
    description: 'Understand the common symptoms and signs of PCOS.',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg',
    url: 'https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353439'
  },
  {
    id: 3,
    title: 'Treatment Options',
    description: 'Explore different treatment approaches for managing PCOS.',
    image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg',
    url: 'https://www.hopkinsmedicine.org/health/conditions-and-diseases/polycystic-ovary-syndrome-pcos'
  },
  {
    id: 4,
    title: 'Diet & Lifestyle',
    description: 'How lifestyle changes can help manage PCOS symptoms.',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
    url: 'https://www.healthline.com/nutrition/pcos-diet-guide'
  }
];

const faqItems = [
  {
    id: 1,
    question: 'What is PCOS?',
    answer: 'Polycystic ovary syndrome (PCOS) is a hormonal disorder common among women of reproductive age. Women with PCOS may have infrequent or prolonged menstrual periods or excess male hormone (androgen) levels.'
  },
  {
    id: 2,
    question: 'What causes PCOS?',
    answer: 'The exact cause of PCOS is unknown. Factors that might play a role include excess insulin, low-grade inflammation, heredity, and excess androgen production.'
  },
  {
    id: 3,
    question: 'How is PCOS diagnosed?',
    answer: 'Doctors typically diagnose PCOS when you have at least two of these three symptoms: irregular periods, elevated androgen levels, and polycystic ovaries.'
  },
  {
    id: 4,
    question: 'Can PCOS be cured?',
    answer: 'There is currently no cure for PCOS, but the symptoms can be managed with medication, lifestyle changes, and other treatments.'
  },
  {
    id: 5,
    question: 'Does PCOS affect fertility?',
    answer: 'PCOS is one of the most common causes of female infertility. However, with proper treatment, many women with PCOS can become pregnant.'
  }
];

export default function EducationScreen() {
  const handleOpenLink = async (url) => {
    await openBrowserAsync(url);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PCOS Education</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Educational Resources</Text>
        <Text style={styles.sectionDescription}>
          Learn more about PCOS, its symptoms, treatment options, and management strategies.
        </Text>

        {resourceLinks.map((resource) => (
          <TouchableOpacity 
            key={resource.id}
            style={styles.resourceCard}
            onPress={() => handleOpenLink(resource.url)}
          >
            <Image 
              source={{ uri: resource.image }} 
              style={styles.resourceImage}
              resizeMode="cover"
            />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
              <View style={styles.resourceLinkContainer}>
                <Text style={styles.resourceLinkText}>Learn more</Text>
                <ExternalLink size={14} color={theme.colors.primary[600]} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        <Card style={styles.faqCard}>
          {faqItems.map((item, index) => (
            <View 
              key={item.id} 
              style={[
                styles.faqItem,
                index < faqItems.length - 1 && styles.faqItemBorder
              ]}
            >
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </Card>

        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Need More Support?</Text>
          <Text style={styles.supportDescription}>
            Connect with healthcare professionals who specialize in PCOS treatment and management.
          </Text>
          <TouchableOpacity 
            style={styles.supportButton}
            onPress={() => handleOpenLink('https://www.pcosaa.org/find-a-provider')}
          >
            <Text style={styles.supportButtonText}>Find a Specialist</Text>
            <ChevronRight size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    backgroundColor: 'white',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.gray[900],
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.gray[800],
    marginTop: 16,
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
    marginBottom: 16,
    lineHeight: 20,
  },
  resourceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resourceImage: {
    width: '100%',
    height: 140,
  },
  resourceContent: {
    padding: 16,
  },
  resourceTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  resourceDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: 12,
    lineHeight: 20,
  },
  resourceLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceLinkText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
    marginRight: 4,
  },
  faqCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 24,
  },
  faqItem: {
    padding: 16,
  },
  faqItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  faqQuestion: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 8,
  },
  faqAnswer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    lineHeight: 20,
  },
  supportSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  supportTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 8,
  },
  supportDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: 16,
    lineHeight: 20,
  },
  supportButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: 'white',
    marginRight: 4,
  },
});