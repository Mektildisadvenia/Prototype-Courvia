import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, Award, BookOpen, History, Home, Video } from 'lucide-react';
import { useCourvia } from '../context/CourviaContext';
import { COLORS, FONTS } from '../theme/tokens';
import type { RouteName } from '../types/courvia';
import { CourviaLogo } from './CourviaLogo';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  hideBottomNav?: boolean;
}

const TAB_ITEMS: {
  route: RouteName;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}[] = [
  { route: 'dashboard', label: 'Beranda', icon: Home },
  { route: 'webinar', label: 'Webinar', icon: Video },
  { route: 'course', label: 'Course', icon: BookOpen },
  { route: 'history', label: 'Riwayat', icon: History },
  { route: 'certificates', label: 'Sertifikat', icon: Award },
];

function isTabActive(current: RouteName, tab: RouteName): boolean {
  if (tab === 'webinar' && (current === 'webinarDetail' || current === 'webinarSession')) return true;
  if (
    tab === 'course' &&
    (current === 'courseDetail' || current === 'courseLearn' || current === 'courseEvaluation')
  ) {
    return true;
  }
  if (tab === 'certificates' && current === 'certificateDetail') return true;
  return current === tab;
}

export function AppShell({ children, title, showBack = false, hideBottomNav = false }: AppShellProps) {
  const { route, navigate, goBack, user } = useCourvia();

  const displayName = user?.fullName || 'Mahasiswa';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.root}>
      {/* Mobile Top App Bar */}
      <View style={styles.header}>
        <View style={styles.leftZone}>
          {showBack ? (
            <Pressable
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel="Kembali"
              style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            >
              <ArrowLeft size={20} color={COLORS.truffle} strokeWidth={2.2} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => navigate(user ? 'dashboard' : 'landing')}
              accessibilityRole="button"
              accessibilityLabel="Courvia Beranda"
              style={({ pressed }) => [styles.logoWrap, pressed && styles.pressed]}
            >
              <CourviaLogo markSize={26} fontSize={21} />
            </Pressable>
          )}
        </View>

        <View style={styles.centerZone}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {showBack && title ? title : ''}
          </Text>
        </View>

        <Pressable
          onPress={() => navigate('profile')}
          accessibilityRole="button"
          accessibilityLabel="Profil Mahasiswa"
          style={({ pressed }) => [
            styles.profileAvatar,
            route === 'profile' && styles.profileAvatarActive,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.profileAvatarText, route === 'profile' && styles.profileAvatarTextActive]}>
            {initials || 'CV'}
          </Text>
        </Pressable>
      </View>

      {/* Scrollable Mobile Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {/* Mobile Bottom Tab Bar */}
      {!hideBottomNav && (
        <View style={styles.bottomBar}>
          {TAB_ITEMS.map((item) => {
            const active = isTabActive(route, item.route);
            const IconComp = item.icon;
            return (
              <Pressable
                key={item.route}
                onPress={() => navigate(item.route)}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                style={({ pressed }) => [styles.bottomTab, pressed && styles.pressed]}
              >
                <IconComp
                  size={20}
                  color={active ? COLORS.coral : COLORS.muted}
                  strokeWidth={active ? 2.4 : 1.8}
                />
                <Text
                  numberOfLines={1}
                  style={[styles.bottomTabLabel, active && styles.bottomTabLabelActive]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    height: 56,
    backgroundColor: 'rgba(247, 245, 241, 0.96)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  leftZone: {
    minWidth: 44,
    justifyContent: 'center',
  },
  iconBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoWrap: {
    minHeight: 44,
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: COLORS.truffle,
  },
  centerZone: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  profileAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.powder,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  profileAvatarActive: {
    backgroundColor: COLORS.truffle,
    borderColor: COLORS.coral,
  },
  profileAvatarText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  profileAvatarTextActive: {
    color: COLORS.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 18,
  },
  bottomBar: {
    height: 64,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
  },
  bottomTab: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  bottomTabLabel: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.muted,
  },
  bottomTabLabelActive: {
    color: COLORS.coral,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});
