import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Upload, Camera as CameraIcon } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export function ImageUploadSection({ image, onPickImage, onTakePhoto }) {
  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <View style={styles.imageActions}>
            <TouchableOpacity 
              style={styles.replaceButton}
              onPress={onPickImage}
            >
              <Text style={styles.replaceButtonText}>Replace Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.uploadOptions}>
          <TouchableOpacity 
            style={styles.uploadOption}
            onPress={onPickImage}
          >
            <View style={styles.uploadIconContainer}>
              <Upload size={24} color={theme.colors.primary[600]} />
            </View>
            <Text style={styles.uploadOptionTitle}>Upload Image</Text>
            <Text style={styles.uploadOptionDescription}>
              Select an ultrasound image from your device
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.uploadOption}
            onPress={onTakePhoto}
          >
            <View style={styles.uploadIconContainer}>
              <CameraIcon size={24} color={theme.colors.primary[600]} />
            </View>
            <Text style={styles.uploadOptionTitle}>Take Photo</Text>
            <Text style={styles.uploadOptionDescription}>
              Use camera to capture an ultrasound image
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.guideContainer}>
        <Text style={styles.guideTitle}>Image Guidelines:</Text>
        <Text style={styles.guideText}>• Use a clear, high-quality ultrasound image</Text>
        <Text style={styles.guideText}>• Ensure the image is well-lit and in focus</Text>
        <Text style={styles.guideText}>• Avoid glare or shadows on the image</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  uploadOption: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadOptionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  uploadOptionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 16,
  },
  imagePreviewContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  imageActions: {
    padding: 12,
  },
  replaceButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
  },
  replaceButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
  },
  guideContainer: {
    backgroundColor: theme.colors.white, // white background
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary[200], // pink accent border
    marginTop: 8,
    marginBottom: 16,
  },
  guideTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.black, // black text
    marginBottom: 8,
  },
  guideText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.black, // black text
    lineHeight: 18,
  },
  uploadButton: {
    backgroundColor: theme.colors.surface.background, // Now this will work
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});