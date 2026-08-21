import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ProgressProvider } from './src/context/ProgressContext';
import { Header } from './src/components/Header';
import { BottomTabs, TabScreenName } from './src/navigation/BottomTabs';
import { AuthScreen } from './src/screens/AuthScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PhaseLessonsScreen } from './src/screens/PhaseLessonsScreen';
import { MediaHubScreen } from './src/screens/MediaHubScreen';
import { DailyConversationScreen } from './src/screens/DailyConversationScreen';
import { SpeakingLabScreen } from './src/screens/SpeakingLabScreen';
import { StoriesScreen } from './src/screens/StoriesScreen';
import { OneMinuteSprintScreen } from './src/screens/OneMinuteSprintScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { colors } from './src/theme/colors';

const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState<TabScreenName>('Home');
  const [navigationParams, setNavigationParams] = useState<any>(null);

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const handleNavigate = (screen: string, params?: any) => {
    setCurrentTab(screen as TabScreenName);
    setNavigationParams(params);
  };

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'PhaseLessons':
        return <PhaseLessonsScreen />;
      case 'Stories':
        return <StoriesScreen />;
      case 'OneMinuteSprint':
        return <OneMinuteSprintScreen />;
      case 'MediaHub':
        return <MediaHubScreen />;
      case 'DailyConversation':
        return <DailyConversationScreen />;
      case 'SpeakingLab':
        return <SpeakingLabScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.cardBg} />
      <View style={styles.appContainer}>
        <Header onOpenProfile={() => setCurrentTab('Profile')} />
        <View style={styles.bodyContainer}>{renderActiveScreen()}</View>
        <BottomTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <MainAppContent />
      </ProgressProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appContainer: {
    flex: 1,
    backgroundColor: colors.background,
    maxWidth: 768,
    width: '100%',
    alignSelf: 'center',
  },
  bodyContainer: {
    flex: 1,
  },
});
