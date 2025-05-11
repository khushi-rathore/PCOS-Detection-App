// Example: components/ui/GlassCard.tsx
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { theme } from '@/constants/theme';

export function GlassCard({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 246, 250, 0.7)', // glassy pink
    borderRadius: theme.borderRadius,
    padding: 20,
    shadowColor: '#FADADD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(12px)', // for web, ignored on native
  },
});