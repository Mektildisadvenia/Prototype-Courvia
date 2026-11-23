import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowUpRight, Award, BookOpen, Check, Printer, Video } from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { CourviaLogo } from '../components/CourviaLogo';
import { useCourvia } from '../context/CourviaContext';
import { COLORS, FONTS, RADII } from '../theme/tokens';

type CertFilter = 'ALL' | 'Course' | 'Webinar';

export function CertificatesScreen() {
  const { certificates, navigate } = useCourvia();
  const [filter, setFilter] = useState<CertFilter>('ALL');

  const filtered = certificates.filter((c) =>
    filter === 'ALL' ? true : c.activityType === filter
  );

  return (
    <AppShell>
      <View style={styles.heroBlock}>
        <Text style={styles.eyebrow}>TERSIMPAN OTOMATIS DI SATU TEMPAT</Text>
        <Text style={styles.pageTitle}>
          Sertifikat <Text style={styles.pageTitleItalic}>Tersimpan</Text>
        </Text>
        <Text style={styles.pageSubtitle}>
          Semua sertifikat webinar dan course langsung tersimpan di akun tanpa perlu mencari file di galeri atau Google Drive
        </Text>
      </View>

      <View style={styles.countCard}>
        <View style={styles.countLeft}>
          <Text style={styles.countKicker}>TOTAL SERTIFIKAT AKUN</Text>
          <Text style={styles.countNumber}>{certificates.length} Sertifikat</Text>
        </View>
        <Award size={26} color={COLORS.coral} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['ALL', 'Course', 'Webinar'] as CertFilter[]).map((tab) => {
          const active = filter === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => setFilter(tab)}
              style={[styles.filterTab, active && styles.filterTabActive]}
            >
              <Text style={[styles.filterTabText, active && styles.filterTabTextActive]}>
                {tab === 'ALL' ? `Semua (${certificates.length})` : tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {filtered.length > 0 ? (
        <View style={styles.certGrid}>
          {filtered.map((cert) => {
            const isCourse = cert.activityType === 'Course';
            return (
              <Pressable
                key={cert.id}
                onPress={() => navigate('certificateDetail', { certificateId: cert.id })}
                style={({ pressed }) => [styles.certCard, pressed && styles.pressed]}
              >
                <View
                  style={[
                    styles.certVisual,
                    isCourse ? styles.certVisualCourse : styles.certVisualWebinar,
                  ]}
                >
                  {isCourse ? (
                    <BookOpen size={20} color={COLORS.white} />
                  ) : (
                    <Video size={20} color={COLORS.truffle} />
                  )}
                  <Text style={[styles.certVisualType, isCourse && styles.whiteText]}>
                    {isCourse ? 'COURSE' : 'WEBINAR'}
                  </Text>
                </View>

                <View style={styles.certBody}>
                  <Text style={styles.certCodeText}>{cert.certificateCode}</Text>
                  <Text style={styles.certTitle}>{cert.title}</Text>
                  <Text style={styles.certMeta}>
                    {cert.instructor} · {cert.dateDisplay} · +{cert.pointsEarned} Poin
                    {cert.score !== undefined ? ` · Nilai ${cert.score}/100` : ''}
                  </Text>

                  <View style={styles.certBtnRow}>
                    <Text style={styles.certOpenText}>Buka Sertifikat</Text>
                    <ArrowUpRight size={15} color={COLORS.truffle} />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyBox}>
          <Award size={28} color={COLORS.muted} />
          <Text style={styles.emptyTitle}>Belum ada sertifikat tersimpan</Text>
          <Text style={styles.emptyDesc}>
            Ikuti webinar hingga selesai atau lulus evaluasi akhir course minimal nilai 70 agar sertifikat langsung masuk ke akunmu
          </Text>
          <View style={styles.emptyActions}>
            <Pressable onPress={() => navigate('course')} style={styles.emptyBtnPrimary}>
              <Text style={styles.emptyBtnPrimaryText}>Mulai Course</Text>
            </Pressable>
            <Pressable onPress={() => navigate('webinar')} style={styles.emptyBtnSecondary}>
              <Text style={styles.emptyBtnSecondaryText}>Ikuti Webinar</Text>
            </Pressable>
          </View>
        </View>
      )}
    </AppShell>
  );
}

export function CertificateDetailScreen() {
  const { params, goBack, certificates } = useCourvia();
  const cert =
    certificates.find((c) => c.id === params.certificateId) || certificates[0];

  if (!cert) {
    return (
      <AppShell title="Sertifikat" showBack>
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Sertifikat Belum Tersedia</Text>
          <Text style={styles.emptyDesc}>
            Selesaikan webinar atau lulus evaluasi akhir course untuk menerbitkan sertifikat di akunmu
          </Text>
          <Pressable onPress={goBack} style={styles.emptyBtnPrimary}>
            <Text style={styles.emptyBtnPrimaryText}>Kembali</Text>
          </Pressable>
        </View>
      </AppShell>
    );
  }

  const isCourse = cert.activityType === 'Course';

  return (
    <AppShell title="Detail Sertifikat" showBack>
      <Pressable
        onPress={() => {
          if (typeof window !== 'undefined' && window.print) {
            window.print();
          }
        }}
        style={({ pressed }) => [styles.printBtn, pressed && styles.pressed]}
      >
        <Printer size={16} color={COLORS.white} />
        <Text style={styles.printBtnText}>Cetak / Simpan PDF</Text>
      </Pressable>

      {/* Authentic Courvia Certificate Card (No dot on Courvia!) */}
      <View style={styles.certificateOuter}>
        <View style={styles.certificateInnerBorder}>
          <View style={styles.certificateBrandWrap}>
            <CourviaLogo markSize={24} fontSize={21} centered />
          </View>
          <Text style={styles.certificateLabel}>
            {isCourse ? 'CERTIFICATE OF COMPETENCY' : 'CERTIFICATE OF PARTICIPATION'}
          </Text>
          <Text style={styles.certificateHeading}>
            {isCourse ? 'Sertifikat Kelulusan' : 'Sertifikat Kehadiran'}
          </Text>
          <Text style={styles.certificateIntro}>Dengan ini menyatakan bahwa</Text>

          <Text style={styles.certificateRecipient}>{cert.recipientName}</Text>

          <Text style={styles.certificateIntro}>
            {isCourse
              ? 'telah menyelesaikan materi dan dinyatakan lulus evaluasi akhir course'
              : 'telah mengikuti sesi webinar secara penuh dengan judul'}
          </Text>

          <Text style={styles.certificateCourseTitle}>{cert.title}</Text>

          {isCourse && cert.score !== undefined ? (
            <View style={styles.certificateScoreWrap}>
              <Text style={styles.certificateScoreVal}>
                {cert.score}
                <Text style={styles.certificateScoreMax}> / 100</Text>
              </Text>
              <Text style={styles.certificatePointsSub}>
                +{cert.pointsEarned} Poin Kegiatan Tercatat Otomatis
              </Text>
            </View>
          ) : (
            <View style={styles.certificateScoreWrap}>
              <Text style={styles.certificatePointsSub}>
                +{cert.pointsEarned} Poin Kegiatan Tercatat Otomatis
              </Text>
            </View>
          )}

          <View style={styles.certificateDivider} />

          <View style={styles.certificateFooter}>
            <View style={styles.certificateFooterCol}>
              <Text style={styles.certificateFooterLabel}>TANGGAL TERBIT</Text>
              <Text style={styles.certificateFooterVal}>{cert.dateDisplay}</Text>
            </View>

            <View style={styles.certificateSeal}>
              <Check size={16} color={COLORS.white} />
              <Text style={styles.certificateSealText}>COURVIA</Text>
            </View>

            <View style={styles.certificateFooterColRight}>
              <Text style={styles.certificateFooterLabel}>CERTIFICATE ID</Text>
              <Text style={styles.certificateFooterVal}>{cert.certificateCode}</Text>
            </View>
          </View>

          <Text style={styles.certificateSignature}>
            Instruktur: {cert.instructor} · Courvia Learning Platform
          </Text>
        </View>
      </View>
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
  countCard: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.xl,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countLeft: {
    gap: 3,
  },
  countKicker: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: COLORS.powder,
  },
  countNumber: {
    fontFamily: FONTS.serif,
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.white,
    fontVariant: ['tabular-nums'],
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
  certGrid: {
    gap: 12,
  },
  certCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  certVisual: {
    width: 82,
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  certVisualCourse: {
    backgroundColor: COLORS.truffle,
  },
  certVisualWebinar: {
    backgroundColor: COLORS.powder,
  },
  certVisualType: {
    fontFamily: FONTS.sans,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.9,
    color: COLORS.truffle,
  },
  whiteText: {
    color: COLORS.white,
  },
  certBody: {
    flex: 1,
    padding: 16,
    gap: 6,
  },
  certCodeText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.muted,
  },
  certTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  certMeta: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.muted,
  },
  certBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 4,
  },
  certOpenText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  printBtn: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.md,
    paddingHorizontal: 16,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  printBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  certificateOuter: {
    backgroundColor: COLORS.cardWarm,
    borderWidth: 2,
    borderColor: COLORS.truffle,
    borderRadius: RADII.lg,
    padding: 10,
  },
  certificateInnerBorder: {
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    borderRadius: RADII.md,
    paddingVertical: 26,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 8,
  },
  certificateBrandWrap: {
    marginBottom: 4,
  },
  certificateLabel: {
    fontFamily: FONTS.sans,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: COLORS.coral,
  },
  certificateHeading: {
    fontFamily: FONTS.serif,
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.truffle,
    textAlign: 'center',
  },
  certificateIntro: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
  },
  certificateRecipient: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '600',
    color: COLORS.truffle,
    textAlign: 'center',
    marginVertical: 2,
  },
  certificateCourseTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.truffle,
    textAlign: 'center',
  },
  certificateScoreWrap: {
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  certificateScoreVal: {
    fontFamily: FONTS.serif,
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  certificateScoreMax: {
    fontSize: 14,
    color: COLORS.muted,
  },
  certificatePointsSub: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.success,
  },
  certificateDivider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  certificateFooter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  certificateFooterCol: {
    flex: 1,
    gap: 2,
  },
  certificateFooterColRight: {
    flex: 1,
    gap: 2,
    alignItems: 'flex-end',
  },
  certificateFooterLabel: {
    fontFamily: FONTS.sans,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: COLORS.muted,
  },
  certificateFooterVal: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  certificateSeal: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.truffle,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  certificateSealText: {
    fontFamily: FONTS.sans,
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.powder,
  },
  certificateSignature: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 8,
    textAlign: 'center',
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
