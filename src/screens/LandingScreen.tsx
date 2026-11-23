import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowRight, Award, BookOpen, Video } from 'lucide-react';
import { CourviaLogo } from '../components/CourviaLogo';
import { useCourvia } from '../context/CourviaContext';
import { COLORS, FONTS, RADII } from '../theme/tokens';

export function LandingScreen() {
  const { navigate, user } = useCourvia();

  return (
    <View style={styles.page}>
      {/* Compact Mobile Header */}
      <View style={styles.topBar}>
        <CourviaLogo markSize={26} fontSize={21} />
        <Pressable
          onPress={() => navigate(user ? 'dashboard' : 'login')}
          style={({ pressed }) => [styles.topLoginBtn, pressed && styles.pressed]}
        >
          <Text style={styles.topLoginText}>{user ? 'Buka Aplikasi' : 'Masuk'}</Text>
        </Pressable>
      </View>

      {/* Single-Viewport Hero & Core Highlights (Zero Scroll) */}
      <View style={styles.mainContent}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>
            Belajar{'\n'}
            <Text style={styles.heroPowder}>Berkembang</Text>
            {'\n'}
            <Text style={styles.heroCoral}>Tercatat Otomatis</Text>
          </Text>
          <Text style={styles.heroDesc}>
            Ikuti webinar dan course, kerjakan evaluasi, lalu simpan sertifikat beserta poin kegiatan dalam satu akun
          </Text>

          <View style={styles.metricRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>POIN KEGIATAN</Text>
              <Text style={styles.metricValue}>Otomatis</Text>
              <Text style={styles.metricSub}>Tercatat tiap sesi</Text>
            </View>
            <View style={[styles.metricCard, styles.metricCardPowder]}>
              <Text style={styles.metricLabel}>SERTIFIKAT</Text>
              <Text style={styles.metricValue}>Tersimpan</Text>
              <Text style={styles.metricSub}>Langsung di akun</Text>
            </View>
          </View>
        </View>

        {/* Compact 3-Column Feature Strip */}
        <View style={styles.featureRow}>
          <Pressable
            onPress={() => navigate(user ? 'webinar' : 'login')}
            style={({ pressed }) => [styles.miniCard, styles.miniPowder, pressed && styles.pressed]}
          >
            <View style={styles.miniIconLight}>
              <Video size={17} color={COLORS.truffle} />
            </View>
            <Text style={styles.miniTitle}>Webinar</Text>
            <Text style={styles.miniSub}>Sesi terjadwal</Text>
          </Pressable>

          <Pressable
            onPress={() => navigate(user ? 'course' : 'login')}
            style={({ pressed }) => [styles.miniCard, styles.miniTruffle, pressed && styles.pressed]}
          >
            <View style={styles.miniIconDark}>
              <BookOpen size={17} color={COLORS.powder} />
            </View>
            <Text style={[styles.miniTitle, styles.whiteText]}>Course</Text>
            <Text style={[styles.miniSub, styles.whiteMuted]}>Materi & kuis</Text>
          </Pressable>

          <Pressable
            onPress={() => navigate(user ? 'certificates' : 'login')}
            style={({ pressed }) => [styles.miniCard, styles.miniCoral, pressed && styles.pressed]}
          >
            <View style={styles.miniIconDark}>
              <Award size={17} color={COLORS.white} />
            </View>
            <Text style={[styles.miniTitle, styles.whiteText]}>Sertifikat</Text>
            <Text style={[styles.miniSub, styles.whiteMuted]}>Riwayat & poin</Text>
          </Pressable>
        </View>
      </View>

      {/* Bottom Sticky Mobile Onboarding Actions */}
      <View style={styles.bottomActions}>
        <Pressable
          onPress={() => navigate(user ? 'dashboard' : 'register')}
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
        >
          <Text style={styles.primaryBtnText}>
            {user ? 'Lanjut ke Aplikasi' : 'Mulai Daftar'}
          </Text>
          <ArrowRight size={18} color={COLORS.white} />
        </Pressable>

        {!user && (
          <Pressable
            onPress={() => navigate('login')}
            style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
          >
            <Text style={styles.secondaryBtnText}>Sudah Punya Akun? Masuk</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.cream,
    justifyContent: 'space-between',
  },
  topBar: {
    height: 54,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cream,
  },
  topLoginBtn: {
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLoginText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  heroCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xxl,
    padding: 18,
    gap: 10,
  },
  heroTitle: {
    fontFamily: FONTS.sans,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -1,
    color: COLORS.truffle,
  },
  heroPowder: {
    fontFamily: FONTS.serif,
    fontWeight: '500',
    color: COLORS.powder,
  },
  heroCoral: {
    fontFamily: FONTS.serif,
    fontStyle: 'italic',
    fontWeight: '600',
    color: COLORS.coral,
  },
  heroDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.muted,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.cream,
    borderRadius: RADII.lg,
    padding: 12,
    gap: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricCardPowder: {
    backgroundColor: COLORS.powderLight,
    borderColor: COLORS.powder,
  },
  metricLabel: {
    fontFamily: FONTS.sans,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: COLORS.muted,
  },
  metricValue: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  metricSub: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.muted,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 8,
  },
  miniCard: {
    flex: 1,
    borderRadius: RADII.xl,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  miniPowder: {
    backgroundColor: COLORS.powder,
  },
  miniTruffle: {
    backgroundColor: COLORS.truffle,
  },
  miniCoral: {
    backgroundColor: COLORS.coral,
  },
  miniIconLight: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniIconDark: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniTitle: {
    fontFamily: FONTS.serif,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  miniSub: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.truffle,
    opacity: 0.85,
  },
  whiteText: {
    color: COLORS.white,
  },
  whiteMuted: {
    color: 'rgba(255,255,255,0.88)',
  },
  bottomActions: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.md,
    minHeight: 48,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  secondaryBtn: {
    backgroundColor: COLORS.powderLight,
    borderRadius: RADII.md,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  pressed: {
    opacity: 0.82,
  },
});
