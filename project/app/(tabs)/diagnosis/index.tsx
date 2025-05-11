import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Upload, Camera as CameraIcon, ChevronRight, AlertCircle, BookOpen } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { theme } from '@/constants/theme';
import { DiagnosisForm } from '@/components/diagnosis/DiagnosisForm';
import { ImageUploadSection } from '@/components/diagnosis/ImageUploadSection';
import { Modal } from '@/components/ui/Modal';
import { diagnosePCOS } from '@/services/diagnosisService';

export default function DiagnosisScreen() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  const handleFormSubmit = (values) => {
    setFormData(values);
    if (!image) {
      setError('Please upload an ultrasound image to continue.');
      setShowModal(true);
      return;
    }
    submitDiagnosis(values);
  };

  const submitDiagnosis = async (values) => {
    setIsLoading(true);
    try {
      // Create a FormData object for the multipart/form-data request
      const formData = new FormData();
      
      // Append the image
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : 'image';
      
      formData.append('image', {
        uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
        name: filename || 'upload.jpg',
        type
      });
      
      // Append all form values
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      
      const response = await diagnosePCOS(formData);
      
      setResult(response);
      
      // Navigate to results screen with diagnosis data
      router.push({
        pathname: '/diagnosis/results',
        params: { 
          result: JSON.stringify(response),
          imageUri: image
        }
      });
    } catch (error) {
      console.error('Diagnosis error:', error);
      setError('An error occurred during diagnosis. Please try again.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      setError('Camera permission is required to take photos.');
      setShowModal(true);
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PCOS Diagnosis</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Health Information</Text>
        <Text style={styles.sectionDescription}>
          Please fill out the form below with your health information to help us provide an accurate PCOS diagnosis.
        </Text>

        <DiagnosisForm onSubmit={handleFormSubmit} />
        
        <Text style={styles.sectionTitle}>Ultrasound Image</Text>
        <Text style={styles.sectionDescription}>
          Upload or take a photo of your ultrasound image. This will be analyzed by our AI model.
        </Text>

        <ImageUploadSection 
          image={image} 
          onPickImage={handlePickImage} 
          onTakePhoto={handleTakePhoto} 
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled
          ]}
          onPress={() => submitDiagnosis(formData)}
          disabled={isLoading || !image}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.black} />
          ) : (
            <>
              <Text style={styles.submitButtonText}>Get Diagnosis</Text>
              <ChevronRight size={20} color={theme.colors.black} />
            </>
          )}
        </TouchableOpacity>

        <View style={{ marginTop: 32 }}>
          <Text style={styles.sectionTitle}>PCOS Self-Assessment</Text>
          <Text style={styles.sectionDescription}>
            Answer the following questions to help us understand your condition better.
          </Text>

          <GlassCard style={{ marginBottom: 24 }}>
            <Text style={styles.questionText}>
              Do you experience irregular periods?
            </Text>
            {/* ...input or options... */}
          </GlassCard>

          <PrimaryButton>
            Next
          </PrimaryButton>
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Attention Required"
      >
        <View style={styles.modalContent}>
          <AlertCircle size={48} color={theme.colors.error[500]} style={styles.modalIcon} />
          <Text style={styles.modalText}>{error}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.black, // black text
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.black, // black text
    marginTop: 24,
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.black, // black text
    marginBottom: 16,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: theme.colors.white, // white button
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.primary[200], // faded pink when disabled
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.black, // black text for visibility
    marginRight: 8,
  },
  modalContent: {
    alignItems: 'center',
    padding: 16,
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.black,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    transition: 'all 0.2s',
  },
  modalButtonText: {
    color: theme.colors.black,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  questionText: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 18,
    color: theme.colors.primary[700],
  },
});