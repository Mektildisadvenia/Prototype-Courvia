import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowRight, Award, BookOpen, Calendar, Clock, History, Video } from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { useCourvia } from '../context/CourviaContext';
import { COURSES, WEBINARS } from '../data/courviaData';
import { COLORS, FONTS, RADII } from '../theme/tokens';

export function DashboardScreen() {
  const {
    user,
    navigate,
    history,
    certificates,
    totalPoints,
    completedWebinarIds,
    registeredWebinarIds,
    evaluations,
    getCourseProgress,
  } = useCourvia();

  const displayName = user?.fullName || 'Mektildis Advenia Sanusi';
  const upcomingWebinars = WEBINARS.filter((w) => !completedWebinarIds.includes(w.id)).slice(0, 2);
  const featuredCourses = COURSES.slice(0, 2);

  return (
    <AppShell>
      {/* Mobile Welcome Header */}
      <View style={styles.welcomeBlock}>
        <Text style={styles.eyebrow}>RUANG BELAJAR KAMU</Text>
        <Text style={styles.welcomeTitle}>
          Halo, <Text style={styles.welcomeTitleItalic}>{displayName}</Text>
        </Text>
        <Text style={styles.welcomeSub}>
          Jadwal webinar, course, poin kegiatan, dan sertifikatmu tersimpan otomatis di satu tempat
        </Text>
      </View>

      {/* Mobile Summary Card (Poin + Kegiatan + Sertifikat) */}
      <View style={styles.statsCard}>
        <View style={styles.statMainRow}>
          <View>
            <Text style={styles.statLabel}>TOTAL POIN KEGIATAN</Text>
            <Text style={styles.statNumberCoral}>{totalPoints} Poin</Text>
          </View>
          <Pressable
            onPress={() => navigate('webinar')}
            style={({ pressed }) => [styles.exploreBtn, pressed && styles.pressed]}
          >
            <Text style={styles.exploreBtnText}>Cari Kegiatan</Text>
            <ArrowRight size={15} color={COLORS.truffle} />
          </Pressable>
        </View>

        <View style={styles.statSplitRow}>
          <View style={[styles.statMiniCell, styles.statMiniBorder]}>
            <Text style={styles.statMiniNum}>{history.length}</Text>
            <Text style={styles.statMiniLabel}>Kegiatan Selesai</Text>
          </View>
          <View style={styles.statMiniCell}>
            <Text style={styles.statMiniNum}>{certificates.length}</Text>
            <Text style={styles.statMiniLabel}>Sertifikat Tersimpan</Text>
          </View>
        </View>
      </View>

      {/* Quick Shortcuts: Riwayat & Sertifikat */}
      <View style={styles.quickStack}>
        <Pressable
          onPress={() => navigate('history')}
          style={({ pressed }) => [styles.quickCard, styles.quickCardPowder, pressed && styles.pressed]}
        >
          <View style={styles.quickIconWrap}>
            <History size={18} color={COLORS.truffle} />
          </View>
          <View style={styles.quickCopy}>
            <Text style={styles.quickTitle}>Riwayat Kegiatan</Text>
            <Text style={styles.quickDesc}>
              {history.length} kegiatan tercatat otomatis beserta poinnya
            </Text>
          </View>
          <ArrowRight size={18} color={COLORS.truffle} />
        </Pressable>

        <Pressable
          onPress={() => navigate('certificates')}
          style={({ pressed }) => [styles.quickCard, styles.quickCardWhite, pressed && styles.pressed]}
        >
          <View style={styles.quickIconWrapCoral}>
            <Award size={18} color={COLORS.white} />
          </View>
          <View style={styles.quickCopy}>
            <Text style={styles.quickTitle}>Sertifikat Saya</Text>
            <Text style={styles.quickDesc}>
              {certificates.length} sertifikat siap dibuka dalam satu daftar
            </Text>
          </View>
          <ArrowRight size={18} color={COLORS.truffle} />
        </Pressable>
      </View>

      {/* Webinar Tersedia */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionKicker}>JADWAL TERDEKAT</Text>
            <Text style={styles.sectionHeading}>Webinar Tersedia</Text>
          </View>
          <Pressable onPress={() => navigate('webinar')} style={styles.sectionLinkBtn}>
            <Text style={styles.sectionLinkText}>Semua</Text>
            <ArrowRight size={14} color={COLORS.truffle} />
          </Pressable>
        </View>

        <View style={styles.cardsStack}>
          {upcomingWebinars.map((w) => {
            const isRegistered = registeredWebinarIds.includes(w.id);
            return (
              <Pressable
                key={w.id}
                onPress={() => navigate('webinarDetail', { webinarId: w.id })}
                style={({ pressed }) => [styles.activityCard, pressed && styles.pressed]}
              >
                <View style={styles.cardMetaRow}>
                  <Text style={styles.cardMetaText}>
                    WEBINAR · {w.category} · +{w.points} Poin
                  </Text>
                  <Text style={styles.priceText}>{w.priceLabel}</Text>
                </View>

                <Text style={styles.cardTitle}>{w.title}</Text>

                <View style={styles.scheduleLine}>
                  <Calendar size={14} color={COLORS.muted} />
                  <Text style={styles.scheduleText}>
                    {w.date} · {w.time}
                  </Text>
                  <Clock size={14} color={COLORS.muted} />
                  <Text style={styles.scheduleText}>{w.duration}</Text>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.instructorText}>{w.instructor}</Text>
                  <View style={styles.cardActionChip}>
                    <Video size={14} color={COLORS.truffle} />
                    <Text style={styles.cardActionText}>
                      {isRegistered ? 'Ikuti Sesi' : 'Lihat Jadwal'}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Course Terstruktur */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionKicker}>MATERI & EVALUASI</Text>
            <Text style={styles.sectionHeading}>Course Terstruktur</Text>
          </View>
          <Pressable onPress={() => navigate('course')} style={styles.sectionLinkBtn}>
            <Text style={styles.sectionLinkText}>Semua</Text>
            <ArrowRight size={14} color={COLORS.truffle} />
          </Pressable>
        </View>

        <View style={styles.cardsStack}>
          {featuredCourses.map((c) => {
            const progress = getCourseProgress(c.id);
            const evaluation = evaluations[c.id];
            return (
              <Pressable
                key={c.id}
                onPress={() => navigate('courseDetail', { courseId: c.id })}
                style={({ pressed }) => [styles.activityCard, pressed && styles.pressed]}
              >
                <View style={styles.cardMetaRow}>
                  <Text style={styles.cardMetaText}>COURSE · {c.category}</Text>
                  <Text style={styles.pointsCoral}>+{c.points} Poin</Text>
                </View>

                <Text style={styles.cardTitle}>{c.title}</Text>

                <View style={styles.progressSection}>
                  <View style={styles.progressLabelRow}>
                    <Text style={styles.progressLabel}>Progres Materi</Text>
                    <Text style={styles.progressValue}>{progress}%</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.instructorText}>
                    {evaluation?.passed ? `Lulus · Nilai ${evaluation.score}` : c.priceLabel}
                  </Text>
                  <View style={styles.cardActionChip}>
                    <BookOpen size={14} color={COLORS.truffle} />
                    <Text style={styles.cardActionText}>
                      {evaluation?.passed ? 'Sertifikat' : progress > 0 ? 'Lanjutkan' : 'Mulai'}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  welcomeBlock: {
    gap: 6,
  },
  eyebrow: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: COLORS.coral,
  },
  welcomeTitle: {
    fontFamily: FONTS.sans,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: COLORS.truffle,
  },
  welcomeTitleItalic: {
    fontFamily: FONTS.serif,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  welcomeSub: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
  },
  statsCard: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.xl,
    padding: 18,
    gap: 16,
  },
  statMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  statLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: COLORS.powder,
  },
  statNumberCoral: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  exploreBtn: {
    backgroundColor: COLORS.powder,
    borderRadius: RADII.md,
    paddingHorizontal: 14,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exploreBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  statSplitRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.14)',
    paddingTop: 14,
  },
  statMiniCell: {
    flex: 1,
    gap: 2,
  },
  statMiniBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.14)',
    marginRight: 14,
  },
  statMiniNum: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.white,
    fontVariant: ['tabular-nums'],
  },
  statMiniLabel: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: 'rgba(255,255,255,0.72)',
  },
  quickStack: {
    gap: 10,
  },
  quickCard: {
    borderRadius: RADII.lg,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickCardPowder: {
    backgroundColor: COLORS.powderLight,
  },
  quickCardWhite: {
    backgroundColor: COLORS.white,
  },
  quickIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIconWrapCoral: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickCopy: {
    flex: 1,
    gap: 2,
  },
  quickTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  quickDesc: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.muted,
  },
  sectionBlock: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionKicker: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: COLORS.coral,
    marginBottom: 2,
  },
  sectionHeading: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  sectionLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 40,
    paddingLeft: 8,
  },
  sectionLinkText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  cardsStack: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 18,
    gap: 10,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardMetaText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.muted,
  },
  priceText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  pointsCoral: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  cardTitle: {
    fontFamily: FONTS.serif,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  scheduleLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  scheduleText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.truffle,
    marginRight: 6,
  },
  progressSection: {
    gap: 5,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.muted,
  },
  progressValue: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.truffle,
    fontVariant: ['tabular-nums'],
  },
  progressTrack: {
    height: 6,
    backgroundColor: COLORS.creamSoft,
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.coral,
    borderRadius: 99,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  instructorText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.muted,
    flex: 1,
  },
  cardActionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cream,
    borderRadius: RADII.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cardActionText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  pressed: {
    opacity: 0.84,
  },
});
