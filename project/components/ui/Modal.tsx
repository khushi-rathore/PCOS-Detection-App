import React from 'react';
import { View, Text, Modal as RNModal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { theme } from '@/constants/theme';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({ visible, onClose, title, children }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <X size={20} color={theme.colors.black} />
            </TouchableOpacity>
          </View>
          <ScrollView 
            contentContainerStyle={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // black overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: theme.colors.primary[100], // light pink background
    borderRadius: theme.borderRadius,
    padding: 24,
    maxWidth: 400,
    width: '100%',
    shadowColor: '#00000010', // subtle drop shadow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white, // white divider
    backgroundColor: theme.colors.primary[100], // match modal bg
  },
  modalTitle: {
    color: theme.colors.black, // black text for contrast
    fontFamily: theme.fontFamily.heading,
    fontSize: 20,
    marginBottom: 0,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.white, // white button
  },
  modalContent: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: theme.colors.white, // white button
    borderRadius: theme.borderRadius,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    transition: 'all 0.2s',
  },
  modalButtonText: {
    color: theme.colors.black, // black text on white
    fontFamily: theme.fontFamily.bold,
    fontSize: 16,
  },
});