import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Award, BookOpen, Calendar, Check, Video } from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { useCourvia } from '../context/CourviaContext';
import { COLORS, FONTS, RADII } from '../theme/tokens';

type HistoryFilter = 'ALL' | 'Webinar' | 'Course';

export function HistoryScreen() {
  const { history, totalPoints, navigate } = useCourvia();
  const [filter, setFilter] = useState<HistoryFilter>('ALL');

  const filtered = history.filter((item) =>
    filter === 'ALL' ? true : item.activityType === filter
  );
  const webinarCount = history.filter((h) => h.activityType === 'Webinar').length;
  const courseCount = history.filter((h) => h.activityType === 'Course').length;

  return (
    <AppShell>
      <View style={styles.heroBlock}>
        <Text style={styles.eyebrow}>TERCATAT OTOMATIS DI AKUN</Text>
        <Text style={styles.pageTitle}>
          Riwayat <Text style={styles.pageTitleItalic}>Kegiatan & Poin</Text>
        </Text>
        <Text style={styles.pageSubtitle}>
          Setiap webinar dan course yang selesai langsung tercatat beserta tanggal dan poinnya tanpa perlu dicatat manual
        </Text>
      </View>

      {/* Mobile Summary Strip */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryTopRow}>
          <Text style={styles.summaryLabel}>TOTAL POIN TERKUMPUL</Text>
          <Text style={styles.summaryValueCoral}>{totalPoints} Poin</Text>
        </View>
        <View style={styles.summaryBottomRow}>
          <View style={[styles.summaryMini, styles.summaryMiniBorder]}>
            <Text style={styles.summaryValue}>{webinarCount}</Text>
            <Text style={styles.summaryHint}>Webinar Selesai</Text>
          </View>
          <View style={styles.summaryMini}>
            <Text style={styles.summaryValue}>{courseCount}</Text>
            <Text style={styles.summaryHint}>Course Lulus</Text>
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['ALL', 'Webinar', 'Course'] as HistoryFilter[]).map((tab) => {
          const active = filter === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => setFilter(tab)}
              style={[styles.filterTab, active && styles.filterTabActive]}
            >
              <Text style={[styles.filterTabText, active && styles.filterTabTextActive]}>
                {tab === 'ALL' ? `Semua (${history.length})` : tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {filtered.length > 0 ? (
        <View style={styles.listContainer}>
          {filtered.map((item) => {
            const isWebinar = item.activityType === 'Webinar';
            return (
              <View key={item.id} style={styles.historyRow}>
                <View style={styles.rowHeader}>
                  <View
                    style={[
                      styles.typeIconBox,
                      isWebinar ? styles.typeIconPowder : styles.typeIconTruffle,
                    ]}
                  >
                    {isWebinar ? (
                      <Video size={18} color={COLORS.truffle} />
                    ) : (
                      <BookOpen size={18} color={COLORS.white} />
                    )}
                  </View>

                  <View style={styles.rowCopy}>
                    <Text style={styles.rowMeta}>
                      {item.activityType.toUpperCase()} · {item.dateDisplay}
                    </Text>
                    <Text style={styles.rowTitle}>{item.title}</Text>
                  </View>
                </View>

                <View style={styles.rowSubLine}>
                  <Check size={14} color={COLORS.success} />
                  <Text style={styles.rowStatus}>{item.statusLabel}</Text>
                  <Text style={styles.rowInstructor}>· {item.instructor}</Text>
                </View>

                <View style={styles.rowFooter}>
                  <Text style={styles.pointsText}>+{item.pointsEarned} Poin</Text>

                  <Pressable
                    onPress={() =>
                      navigate('certificateDetail', { certificateId: item.certificateId })
                    }
                    style={({ pressed }) => [styles.certBtn, pressed && styles.pressed]}
                  >
                    <Award size={15} color={COLORS.truffle} />
                    <Text style={styles.certBtnText}>Lihat Sertifikat</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyBox}>
          <Calendar size={28} color={COLORS.muted} />
          <Text style={styles.emptyTitle}>Belum ada riwayat kegiatan</Text>
          <Text style={styles.emptyDesc}>
            Ikuti webinar atau selesaikan evaluasi course untuk mencatat poin dan bukti kegiatan otomatis di sini
          </Text>
          <View style={styles.emptyActions}>
            <Pressable onPress={() => navigate('webinar')} style={styles.emptyBtnPrimary}>
              <Text style={styles.emptyBtnPrimaryText}>Jelajahi Webinar</Text>
            </Pressable>
            <Pressable onPress={() => navigate('course')} style={styles.emptyBtnSecondary}>
              <Text style={styles.emptyBtnSecondaryText}>Jelajahi Course</Text>
            </Pressable>
          </View>
        </View>
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  heroBlock: {
    gap: 6,
  },
  eyebrow: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: COLORS.coral,
  },
  pageTitle: {
    fontFamily: FONTS.sans,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.7,
    color: COLORS.truffle,
  },
  pageTitleItalic: {
    fontFamily: FONTS.serif,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  pageSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 18,
    gap: 14,
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: COLORS.muted,
  },
  summaryValueCoral: {
    fontFamily: FONTS.serif,
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  summaryBottomRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  summaryMini: {
    flex: 1,
    gap: 2,
  },
  summaryMiniBorder: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    marginRight: 14,
  },
  summaryValue: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.truffle,
    fontVariant: ['tabular-nums'],
  },
  summaryHint: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.muted,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: COLORS.creamSoft,
    padding: 4,
    borderRadius: RADII.md,
  },
  filterTab: {
    flex: 1,
    minHeight: 38,
    borderRadius: RADII.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: COLORS.white,
  },
  filterTabText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
  },
  filterTabTextActive: {
    color: COLORS.truffle,
    fontWeight: '700',
  },
  listContainer: {
    gap: 12,
  },
  historyRow: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 16,
    gap: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  typeIconBox: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeIconPowder: {
    backgroundColor: COLORS.powderLight,
  },
  typeIconTruffle: {
    backgroundColor: COLORS.truffle,
  },
  rowCopy: {
    flex: 1,
    gap: 3,
  },
  rowMeta: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.muted,
  },
  rowTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  rowSubLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  rowStatus: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.success,
  },
  rowInstructor: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.muted,
  },
  rowFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  pointsText: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  certBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    borderRadius: RADII.md,
    paddingHorizontal: 14,
    minHeight: 40,
  },
  certBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  emptyBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xxl,
    padding: 28,
    alignItems: 'center',
    gap: 10,
  },
  emptyTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  emptyDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
    textAlign: 'center',
  },
  emptyActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  emptyBtnPrimary: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.md,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center',
  },
  emptyBtnPrimaryText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  emptyBtnSecondary: {
    backgroundColor: COLORS.powderLight,
    borderRadius: RADII.md,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center',
  },
  emptyBtnSecondaryText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  pressed: {
    opacity: 0.84,
  },
});
