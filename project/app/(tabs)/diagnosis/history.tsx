import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { getDiagnosisHistory } from '@/services/diagnosisService';
import { useAuth } from '@/context/AuthContext';

export default function HistoryScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await getDiagnosisHistory();
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getResultIcon = (prediction) => {
    if (prediction === 'PCOS Detected') {
      return <AlertCircle size={24} color={theme.colors.error[500]} />;
    } else if (prediction === 'No PCOS Detected') {
      return <CheckCircle size={24} color={theme.colors.success[500]} />;
    } else {
      return <Clock size={24} color={theme.colors.warning[500]} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>Sign in to view your history</Text>
        <TouchableOpacity 
          style={styles.authButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.authButtonText}>Sign In / Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diagnosis History</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading history...</Text>
        </View>
      ) : history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No history found</Text>
          <Text style={styles.emptyDescription}>
            Your diagnosis history will appear here after you complete an assessment.
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push('/diagnosis')}
          >
            <Text style={styles.startButtonText}>Start Assessment</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.historyCard}
              onPress={() => {
                router.push({
                  pathname: '/diagnosis/results',
                  params: { 
                    result: JSON.stringify(item),
                    from: 'history'
                  }
                });
              }}
            >
              <View style={styles.historyCardLeft}>
                <View style={styles.historyIconContainer}>
                  {getResultIcon(item.prediction)}
                </View>
                <View style={styles.historyDetails}>
                  <Text style={styles.historyResult}>{item.prediction}</Text>
                  <Text style={styles.historyDate}>
                    {formatDate(item.timestamp)}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={theme.colors.primary[600]} />
            </TouchableOpacity>
          )}
        />
      )}
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
    color: theme.colors.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.primary[600],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.black,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.primary[600],
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: theme.colors.primary[200],
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.black,
  },
  listContent: {
    padding: 16,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  historyDetails: {
    flex: 1,
  },
  historyResult: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.black,
    marginBottom: 4,
  },
  historyDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.primary[600],
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  authTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.black,
    marginBottom: 24,
  },
  authButton: {
    backgroundColor: theme.colors.primary[200],
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  authButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.black,
  },
  tabLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.black, // set text color to black
  },
});