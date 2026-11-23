import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  Clock,
  Search,
  Users,
  Video,
} from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { useCourvia } from '../context/CourviaContext';
import { WEBINARS } from '../data/courviaData';
import { COLORS, FONTS, RADII } from '../theme/tokens';

type WebinarFilter = 'ALL' | 'UPCOMING' | 'REGISTERED' | 'COMPLETED';

export function WebinarCatalogScreen() {
  const { navigate, registeredWebinarIds, completedWebinarIds } = useCourvia();

  const [filter, setFilter] = useState<WebinarFilter>('ALL');
  const [query, setQuery] = useState('');

  const filtered = WEBINARS.filter((w) => {
    const isCompleted = completedWebinarIds.includes(w.id);
    const isRegistered = registeredWebinarIds.includes(w.id);
    const matchesSearch =
      w.title.toLowerCase().includes(query.toLowerCase()) ||
      w.instructor.toLowerCase().includes(query.toLowerCase()) ||
      w.category.toLowerCase().includes(query.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'UPCOMING') return !isCompleted;
    if (filter === 'REGISTERED') return isRegistered;
    if (filter === 'COMPLETED') return isCompleted;
    return true;
  });

  const filters: { id: WebinarFilter; label: string }[] = [
    { id: 'ALL', label: 'Semua' },
    { id: 'UPCOMING', label: 'Akan Datang' },
    { id: 'REGISTERED', label: 'Terdaftar' },
    { id: 'COMPLETED', label: 'Selesai' },
  ];

  return (
    <AppShell>
      <View style={styles.heroBlock}>
        <Text style={styles.eyebrow}>SESI LANGSUNG · INSTRUKTUR TERSTANDAR</Text>
        <Text style={styles.pageTitle}>
          Daftar <Text style={styles.pageTitleItalic}>Webinar & Jadwal</Text>
        </Text>
        <Text style={styles.pageSubtitle}>
          Pilih webinar sesuai jadwalmu lalu ikuti sesi hingga selesai agar sertifikat dan poin otomatis tersimpan di akun
        </Text>
      </View>

      <View style={styles.searchWrap}>
        <Search size={17} color={COLORS.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari webinar atau instruktur"
          placeholderTextColor={COLORS.mutedLight}
          style={styles.searchInput}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterGroup}>
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(f.id)}
              style={[styles.filterTab, active && styles.filterTabActive]}
            >
              <Text style={[styles.filterTabText, active && styles.filterTabTextActive]}>
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.grid}>
        {filtered.map((w) => {
          const isCompleted = completedWebinarIds.includes(w.id);
          const isRegistered = registeredWebinarIds.includes(w.id);
          const cardAccentBg =
            w.accent === 'powder'
              ? COLORS.powderLight
              : w.accent === 'coral'
                ? COLORS.coralSoft
                : COLORS.creamSoft;

          return (
            <Pressable
              key={w.id}
              onPress={() => navigate('webinarDetail', { webinarId: w.id })}
              style={({ pressed }) => [styles.webinarCard, pressed && styles.pressed]}
            >
              <View style={[styles.cardTopBanner, { backgroundColor: cardAccentBg }]}>
                <Text style={styles.cardKicker}>
                  WEBINAR · {w.category}
                </Text>
                <Text style={styles.statusText}>
                  {isCompleted ? 'Selesai' : isRegistered ? 'Terdaftar' : w.priceLabel}
                </Text>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{w.title}</Text>
                <Text style={styles.cardDesc}>{w.description}</Text>

                <View style={styles.metaRows}>
                  <View style={styles.metaItem}>
                    <Calendar size={14} color={COLORS.muted} />
                    <Text style={styles.metaText}>{w.date}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={COLORS.muted} />
                    <Text style={styles.metaText}>
                      {w.time} · {w.duration}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Users size={14} color={COLORS.muted} />
                    <Text style={styles.metaText}>{w.participants} peserta</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.pointsNumber}>+{w.points} Poin</Text>
                    <Text style={styles.instructorSmall}>{w.instructor}</Text>
                  </View>
                  <View style={styles.detailBtn}>
                    <Text style={styles.detailBtnText}>
                      {isCompleted ? 'Detail' : isRegistered ? 'Ikuti Sesi' : 'Lihat Jadwal'}
                    </Text>
                    <ArrowRight size={15} color={COLORS.white} />
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      {filtered.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Tidak ada webinar yang cocok</Text>
          <Text style={styles.emptyDesc}>Coba ubah kata kunci pencarian atau filter status</Text>
        </View>
      )}
    </AppShell>
  );
}

export function WebinarDetailScreen() {
  const {
    params,
    navigate,
    registeredWebinarIds,
    completedWebinarIds,
    registerWebinar,
  } = useCourvia();

  const webinar = WEBINARS.find((w) => w.id === params.webinarId) || WEBINARS[0];
  const isRegistered = registeredWebinarIds.includes(webinar.id);
  const isCompleted = completedWebinarIds.includes(webinar.id);

  const handlePrimaryAction = () => {
    if (isCompleted) {
      navigate('certificateDetail', { certificateId: `cert-webinar-${webinar.id}` });
      return;
    }
    if (!isRegistered) {
      registerWebinar(webinar.id);
    } else {
      navigate('webinarSession', { webinarId: webinar.id });
    }
  };

  return (
    <AppShell title="Detail Webinar" showBack>
      <View style={styles.detailStack}>
        <Text style={styles.eyebrow}>
          WEBINAR · {webinar.category} · {webinar.priceLabel}
        </Text>
        <Text style={styles.detailTitle}>{webinar.title}</Text>
        <Text style={styles.detailDesc}>{webinar.description}</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryEyebrow}>POIN KEGIATAN</Text>
          <Text style={styles.summaryPoints}>+{webinar.points} Poin</Text>
          <Text style={styles.summaryNote}>
            {isCompleted
              ? 'Kamu sudah menyelesaikan webinar ini dan sertifikat tersimpan di akunmu'
              : isRegistered
                ? 'Kamu sudah terdaftar pada jadwal ini dan dapat langsung mengikuti sesi'
                : 'Daftar sekarang untuk mengikuti sesi webinar dan menyimpan sertifikat otomatis ke akun'}
          </Text>

          <Pressable
            onPress={handlePrimaryAction}
            style={({ pressed }) => [styles.primaryCta, pressed && styles.pressed]}
          >
            <Text style={styles.primaryCtaText}>
              {isCompleted
                ? 'Lihat Sertifikat Webinar'
                : isRegistered
                  ? 'Ikuti Sesi Webinar'
                  : `Daftar Webinar (${webinar.priceLabel})`}
            </Text>
            <ArrowRight size={17} color={COLORS.white} />
          </Pressable>

          {isRegistered && !isCompleted && (
            <View style={styles.registeredNotice}>
              <Check size={15} color={COLORS.success} />
              <Text style={styles.registeredNoticeText}>
                Terdaftar · {webinar.date} pukul {webinar.time}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoPanel}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>JADWAL SESI</Text>
            <Text style={styles.infoVal}>
              {webinar.date} · {webinar.time} ({webinar.duration})
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>INSTRUKTUR</Text>
            <Text style={styles.infoVal}>
              {webinar.instructor} — {webinar.instructorRole}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>BIAYA KEGIATAN</Text>
            <Text style={styles.infoVal}>{webinar.priceLabel} (termasuk sertifikat otomatis)</Text>
          </View>
        </View>

        <View style={styles.agendaBlock}>
          <Text style={styles.subHeading}>Agenda Sesi</Text>
          {webinar.agenda.map((item, idx) => (
            <View key={item} style={styles.agendaItem}>
              <Text style={styles.agendaIndex}>0{idx + 1}</Text>
              <Text style={styles.agendaText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.agendaBlock}>
          <Text style={styles.subHeading}>Yang Didapatkan Peserta</Text>
          {webinar.outcomes.map((out) => (
            <View key={out} style={styles.outcomeItem}>
              <Check size={16} color={COLORS.success} />
              <Text style={styles.outcomeText}>{out}</Text>
            </View>
          ))}
        </View>
      </View>
    </AppShell>
  );
}

export function WebinarSessionScreen() {
  const { params, navigate, completeWebinar, completedWebinarIds } = useCourvia();
  const webinar = WEBINARS.find((w) => w.id === params.webinarId) || WEBINARS[0];
  const alreadyDone = completedWebinarIds.includes(webinar.id);

  const [attendedAgenda, setAttendedAgenda] = useState<number[]>([0]);
  const [completedNow, setCompletedNow] = useState(false);

  const toggleAgenda = (idx: number) => {
    setAttendedAgenda((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleFinishSession = () => {
    completeWebinar(webinar.id);
    setCompletedNow(true);
  };

  if (completedNow || alreadyDone) {
    return (
      <AppShell title="Sertifikat Tersimpan" showBack>
        <View style={styles.successWrap}>
          <View style={styles.successIconCircle}>
            <Award size={32} color={COLORS.truffle} />
          </View>
          <Text style={styles.eyebrow}>WEBINAR SELESAI</Text>
          <Text style={styles.successHeading}>
            Sertifikat & Riwayat{'\n'}
            <Text style={styles.pageTitleItalic}>tersimpan otomatis</Text>
          </Text>
          <Text style={styles.successDesc}>
            Kehadiranmu pada webinar "{webinar.title}" tercatat di Riwayat Kegiatan (+{webinar.points} Poin) dan sertifikat langsung tersimpan di akun tanpa perlu diunduh manual
          </Text>

          <View style={styles.successActions}>
            <Pressable
              onPress={() =>
                navigate('certificateDetail', { certificateId: `cert-webinar-${webinar.id}` })
              }
              style={styles.primaryCta}
            >
              <Text style={styles.primaryCtaText}>Buka Sertifikat Sekarang</Text>
              <ArrowRight size={17} color={COLORS.white} />
            </Pressable>

            <Pressable onPress={() => navigate('history')} style={styles.secondaryCta}>
              <Text style={styles.secondaryCtaText}>Lihat Riwayat Kegiatan</Text>
            </Pressable>
          </View>
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell title="Sesi Live Webinar" showBack>
      <View style={styles.sessionCard}>
        <View style={styles.sessionTop}>
          <View style={styles.sessionBadgeRow}>
            <Video size={18} color={COLORS.coral} />
            <Text style={styles.eyebrow}>SESI WEBINAR · {webinar.time}</Text>
          </View>
          <Text style={styles.detailTitle}>{webinar.title}</Text>
          <Text style={styles.instructorLine}>
            Dibawakan oleh {webinar.instructor}
          </Text>
        </View>

        <View style={styles.sessionBody}>
          <Text style={styles.subHeading}>Daftar Materi Sesi Ini</Text>
          <Text style={styles.sessionHelper}>
            Centang topik yang telah kamu simak untuk mencatat kehadiran otomatis
          </Text>

          {webinar.agenda.map((topic, idx) => {
            const checked = attendedAgenda.includes(idx);
            return (
              <Pressable
                key={topic}
                onPress={() => toggleAgenda(idx)}
                style={[styles.agendaCheckRow, checked && styles.agendaCheckRowActive]}
              >
                <View style={[styles.checkSquare, checked && styles.checkSquareActive]}>
                  {checked && <Check size={14} color={COLORS.white} />}
                </View>
                <Text style={styles.agendaCheckText}>{topic}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={handleFinishSession}
          disabled={attendedAgenda.length === 0}
          style={({ pressed }) => [
            styles.primaryCta,
            attendedAgenda.length === 0 && styles.disabledBtn,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.primaryCtaText}>
            Selesaikan & Simpan Sertifikat (+{webinar.points} Poin)
          </Text>
          <Check size={18} color={COLORS.white} />
        </Pressable>
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
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    paddingHorizontal: 14,
    minHeight: 46,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 14,
    color: COLORS.truffle,
  },
  filterGroup: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: COLORS.creamSoft,
    padding: 4,
    borderRadius: RADII.md,
  },
  filterTab: {
    paddingHorizontal: 14,
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
  grid: {
    gap: 14,
  },
  webinarCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    overflow: 'hidden',
  },
  cardTopBanner: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cardKicker: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: COLORS.truffle,
  },
  statusText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  cardBody: {
    padding: 18,
    gap: 10,
  },
  cardTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  cardDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.muted,
  },
  metaRows: {
    gap: 5,
    paddingTop: 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.truffle,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 2,
  },
  pointsNumber: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  instructorSmall: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.muted,
  },
  detailBtn: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.md,
    paddingHorizontal: 14,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 28,
    alignItems: 'center',
    gap: 6,
  },
  emptyTitle: {
    fontFamily: FONTS.serif,
    fontSize: 19,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  emptyDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.muted,
  },
  detailStack: {
    gap: 14,
  },
  detailTitle: {
    fontFamily: FONTS.serif,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  detailDesc: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.muted,
  },
  summaryBox: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.xl,
    padding: 20,
    gap: 12,
  },
  summaryEyebrow: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: COLORS.powder,
  },
  summaryPoints: {
    fontFamily: FONTS.serif,
    fontSize: 34,
    fontWeight: '600',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  summaryNote: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255, 255, 255, 0.84)',
  },
  primaryCta: {
    backgroundColor: COLORS.coral,
    borderRadius: RADII.md,
    minHeight: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  primaryCtaText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    flex: 1,
  },
  secondaryCta: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    borderRadius: RADII.md,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryCtaText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  registeredNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.successBg,
    borderRadius: RADII.sm,
    padding: 10,
  },
  registeredNoticeText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
  },
  infoPanel: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.lg,
    padding: 16,
    gap: 12,
  },
  infoRow: {
    gap: 2,
  },
  infoLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: COLORS.muted,
  },
  infoVal: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  agendaBlock: {
    gap: 8,
  },
  subHeading: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  agendaIndex: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.coral,
    width: 24,
  },
  agendaText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.truffle,
  },
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 3,
  },
  outcomeText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.truffle,
  },
  sessionCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 18,
    gap: 16,
  },
  sessionTop: {
    gap: 6,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sessionBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instructorLine: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.muted,
  },
  sessionBody: {
    gap: 10,
  },
  sessionHelper: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.muted,
  },
  agendaCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cream,
    minHeight: 48,
  },
  agendaCheckRowActive: {
    backgroundColor: COLORS.powderLight,
    borderColor: COLORS.powder,
  },
  checkSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.truffle,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  checkSquareActive: {
    backgroundColor: COLORS.truffle,
    borderColor: COLORS.truffle,
  },
  agendaCheckText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.truffle,
  },
  disabledBtn: {
    opacity: 0.45,
  },
  successWrap: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xxl,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  successIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.powder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successHeading: {
    fontFamily: FONTS.sans,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    color: COLORS.truffle,
    textAlign: 'center',
  },
  successDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
    textAlign: 'center',
  },
  successActions: {
    width: '100%',
    gap: 10,
    marginTop: 6,
  },
  pressed: {
    opacity: 0.84,
  },
});
