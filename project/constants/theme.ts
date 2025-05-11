export const theme = {
  colors: {
    primary: {
      50:  '#FFF6FA',   // lightest pink
      100: '#FADADD',   // light pink
      200: '#FFC0CB',   // classic pink
      300: '#FF6B81',   // coral (hover)
      400: '#E60026',   // strong red
      900: '#121212',   // deep black
    },
    error: {
      500: '#E60026',   // vivid red for errors and logout
      700: '#B91C1C',
    },
    secondary: {
      100: '#E6E6FA',
      200: '#FFA07A',
      300: '#F8AFA6',
      600: '#FFC0CB',
    },
    surface: {
      background: '#FFFFF0',
      card: '#FFF6FA',
      modal: '#FFE6EB',
      input: '#F5F5F5',
    },
    black: '#121212',
    white: '#FFFFFF',
    gray: {
      50: '#F8FAFC',
      100: '#D3D3D3', // muted gray for dividers/secondary text
      200: '#E0E0E0',
      300: '#CCCCCC',
      400: '#B3B3B3',
      500: '#999999',
      600: '#7F7F7F',
      700: '#666666',
      800: '#4D4D4D',
      900: '#333333',
    },
    blue: {
      50: '#EFF6FF',
      400: '#60A5FA',
      700: '#1D4ED8',
    },
    accent: {
      coral: '#FFA07A',
      lavender: '#E6E6FA',
    },
    success: {
      500: '#10B981',
    },
    warning: {
      500: '#F59E0B',
    },
    tertiary: {
      600: '#F472B6',
    },
    glass: 'rgba(255,246,250,0.7)', // glassmorphism panel
    shadow: 'rgba(0,0,0,0.06)',     // subtle shadow
  },
  borderRadius: 20,
  fontFamily: {
    regular: 'Nunito-Regular',
    medium: 'Nunito-Medium',
    bold: 'Nunito-Bold',
    heading: 'Poppins-Bold',
  },
  shadow: {
    soft: {
      shadowColor: '#FADADD',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
    },
    glass: {
      shadowColor: '#E6E6FA',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.10,
      shadowRadius: 32,
    },
  },
  backgroundColor: '#FFF6FA',
};
