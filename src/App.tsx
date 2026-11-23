/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { CourviaProvider, useCourvia } from './context/CourviaContext';
import { AuthScreen } from './screens/AuthScreen';
import { CertificateDetailScreen, CertificatesScreen } from './screens/CertificatesScreen';
import {
  CourseCatalogScreen,
  CourseDetailScreen,
  CourseEvaluationScreen,
  CourseLearnScreen,
} from './screens/CourseScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { LandingScreen } from './screens/LandingScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import {
  WebinarCatalogScreen,
  WebinarDetailScreen,
  WebinarSessionScreen,
} from './screens/WebinarScreen';
import { COLORS } from './theme/tokens';

function CourviaRouter() {
  const { route, user } = useCourvia();

  if (!user && route !== 'landing' && route !== 'login' && route !== 'register') {
    return <AuthScreen mode="login" />;
  }

  switch (route) {
    case 'landing':
      return <LandingScreen />;
    case 'login':
      return <AuthScreen mode="login" />;
    case 'register':
      return <AuthScreen mode="register" />;
    case 'dashboard':
      return <DashboardScreen />;
    case 'webinar':
      return <WebinarCatalogScreen />;
    case 'webinarDetail':
      return <WebinarDetailScreen />;
    case 'webinarSession':
      return <WebinarSessionScreen />;
    case 'course':
      return <CourseCatalogScreen />;
    case 'courseDetail':
      return <CourseDetailScreen />;
    case 'courseLearn':
      return <CourseLearnScreen />;
    case 'courseEvaluation':
      return <CourseEvaluationScreen />;
    case 'history':
      return <HistoryScreen />;
    case 'certificates':
      return <CertificatesScreen />;
    case 'certificateDetail':
      return <CertificateDetailScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return <LandingScreen />;
  }
}

export default function App() {
  return (
    <View style={styles.viewportBackdrop}>
      <SafeAreaView style={styles.mobileFrame}>
        <CourviaProvider>
          <CourviaRouter />
        </CourviaProvider>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewportBackdrop: {
    flex: 1,
    minHeight: '100vh',
    backgroundColor: '#ebe7e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileFrame: {
    width: '100%',
    maxWidth: 430,
    height: '100vh',
    backgroundColor: COLORS.cream,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
});
