import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This would be your actual API endpoint
// services/diagnosisService.ts
const API_URL = 'http://your-backend-server:5000';  // Update this to your server address


// Mock a diagnosis result for demo purposes
const mockDiagnosisResult = {
  prediction: 'PCOS Detected',
  confidence: 0.87,
  indicators: ['Irregular menstrual cycles', 'Excess hair growth', 'Weight gain'],
  riskFactors: ['High BMI', 'Family history'],
  recommendations: 'Consult with an endocrinologist for hormone testing and management strategies.'
};

// In a real app, this would call your actual backend API
export const diagnosePCOS = async (formData: any) => {
  try {
    // For demo purposes, we'll just return a mock result
    // In a real app, you would make an API call like this:
    
    /*
    const response = await axios.post(`${API_URL}/diagnose`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${await SecureStore.getItemAsync('authToken')}`
      }
    });
    return response.data;
    */
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock data
    return mockDiagnosisResult;
  } catch (error) {
    console.error('Diagnosis API error:', error);
    throw error;
  }
};

const storage = Platform.OS === 'web' ? AsyncStorage : SecureStore;

// Store diagnosis history in secure storage
export const saveDiagnosisResult = async (result: any) => {
  try {
    const jsonValue = JSON.stringify(result);
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem('diagnosisResult', jsonValue);
    } else {
      await SecureStore.setItemAsync('diagnosisResult', jsonValue);
    }
  } catch (error) {
    console.error('Error saving diagnosis result:', error);
    throw error;
  }
};

export const getDiagnosisResult = async () => {
  try {
    if (Platform.OS === 'web') {
      const jsonValue = await AsyncStorage.getItem('diagnosisResult');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } else {
      const jsonValue = await SecureStore.getItemAsync('diagnosisResult');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
  } catch (error) {
    console.error('Error getting diagnosis result:', error);
    return null;
  }
};

// Get diagnosis history
export const getDiagnosisHistory = async () => {
  try {
    const historyString = await SecureStore.getItemAsync('diagnosisHistory');
    return historyString ? JSON.parse(historyString) : [];
  } catch (error) {
    console.error('Error getting diagnosis history:', error);
    return [];
  }
};

// Image picking function
export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    // Upload the image to the server or handle it as needed
    console.log('Image selected:', result.assets[0]);
    return result.assets[0];
  }

  return null;
};