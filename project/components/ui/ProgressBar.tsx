import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '@/constants/theme';

type ProgressBarProps = {
  progress: number;
  color?: string;
  height?: number;
};

export function ProgressBar({ 
  progress, 
  color = theme.colors.primary[600],
  height = 8
}: ProgressBarProps) {
  const width = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(width, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);
  
  const animatedWidth = width.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View 
        style={[
          styles.progress, 
          { 
            backgroundColor: color,
            width: animatedWidth,
            height,
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 4,
  }
});