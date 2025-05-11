// Example: components/ui/PrimaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export function PrimaryButton({ children, style, ...props }) {
  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.85} {...props}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: theme.colors.primary[200],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    alignItems: 'center',
    transition: 'all 0.2s', // for web
  },
  text: {
    color: '#fff',
    fontFamily: theme.fontFamily.bold,
    fontSize: 18,
    letterSpacing: 1,
  },
});