import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user, logout, isAuthenticated } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLogout = () => {
    logout();
    // In a real app, this would navigate to login screen
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(previous => !previous);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>Sign in to access your profile</Text>
        <TouchableOpacity 
          style={styles.authButton}
          onPress={() => {/* Would navigate to auth screen */}}
        >
          <Text style={styles.authButtonText}>Sign In / Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg' }} 
                style={styles.avatar}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'Jane Doe'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'jane.doe@example.com'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemIcon}>
              <User size={20} color={theme.colors.primary[600]} />
            </View>
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemLabel}>Personal Information</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.primary[600]} />
          </TouchableOpacity>
          
          <View style={[styles.settingsItem, styles.settingsItemBorder]}>
            <View style={styles.settingsItemIcon}>
              <Bell size={20} color={theme.colors.primary[600]} />
            </View>
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemLabel}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ 
                false: theme.colors.primary[200], 
                true: theme.colors.primary[600] 
              }}
              thumbColor={'white'}
            />
          </View>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemIcon}>
              <Lock size={20} color={theme.colors.primary[600]} />
            </View>
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemLabel}>Privacy & Security</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.primary[600]} />
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Support</Text>
        
        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemIcon}>
              <HelpCircle size={20} color={theme.colors.primary[600]} />
            </View>
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemLabel}>Help & Support</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.gray[100]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingsItem, styles.settingsItemBorder]}>
            <View style={styles.settingsItemIcon}>
              <User size={20} color={theme.colors.primary[600]} />
            </View>
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemLabel}>About Us</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.gray[600]} />
          </TouchableOpacity>
        </Card>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={18} color={theme.colors.error[500]} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>

        <TouchableOpacity style={{
          backgroundColor: theme.colors.primary[600],
          borderRadius: 16,
          padding: 16,
        }}>
          <Text style={{ color: '#FFF', fontFamily: 'Nunito-Bold', fontSize: 16 }}>
            Start Diagnosis
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary[100], // light pink
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.primary[100], // soft pink
  },
  authTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.primary[600], // strong red for contrast
    marginBottom: 24,
  },
  authButton: {
    backgroundColor: theme.colors.primary[600], // strong red
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  authButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFF', // white text on red
  },
  header: {
    padding: 20,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  headerTitle: {
    fontFamily: theme.fontFamily.heading,
    fontSize: 22,
    color: theme.colors.black,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: theme.colors.glass,
    borderRadius: theme.borderRadius,
    padding: 20,
    margin: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    backdropFilter: 'blur(12px)', // for web, ignored on native
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: theme.colors.primary[200], // light pink
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontFamily: theme.fontFamily.heading,
    fontSize: 20,
    color: theme.colors.black,
  },
  profileEmail: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 14,
    color: theme.colors.gray[100],
  },
  editProfileButton: {
    backgroundColor: theme.colors.primary[200],
    borderRadius: theme.borderRadius,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
    transition: 'all 0.2s',
  },
  editProfileText: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 14,
    color: theme.colors.black,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.primary[600], // strong red
    marginBottom: 8,
  },
  settingsCard: {
    backgroundColor: theme.colors.primary[100], // soft pink
    borderRadius: 16,
    ...theme.shadow.soft,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingsItemBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.primary[200], // light pink
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary[200], // light pink
  },
  settingsItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: theme.colors.primary[300], // classic pink
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemLabel: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: theme.colors.primary[600], // strong red
  },
  logoutButton: {
    backgroundColor: theme.colors.black,
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    margin: 16,
    marginBottom: 24,
    transition: 'all 0.2s',
  },
  logoutText: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 16,
    color: theme.colors.primary[100], // light pink on black
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: theme.colors.primary[400], // peachy-pink
    textAlign: 'center',
  },
  // Button hover (web only)
  button: {
    backgroundColor: theme.colors.primary[200],
    borderRadius: theme.borderRadius,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  buttonText: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.bold,
    fontSize: 18,
    letterSpacing: 1,
  },
  buttonHover: {
    backgroundColor: theme.colors.primary[300], // coral
    transform: [{ scale: 1.04 }],
  },
});