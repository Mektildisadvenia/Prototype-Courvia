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
  BookOpen,
  Check,
  Clock,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { useCourvia } from '../context/CourviaContext';
import { COURSES } from '../data/courviaData';
import { COLORS, FONTS, RADII } from '../theme/tokens';
import type { CourseEvaluationRecord } from '../types/courvia';

const CATEGORIES = ['ALL', 'PROGRAMMING', 'DESIGN', 'BUSINESS', 'DATA'];

export function CourseCatalogScreen() {
  const { navigate, getCourseProgress, evaluations } = useCourvia();

  const [category, setCategory] = useState('ALL');
  const [query, setQuery] = useState('');

  const filtered = COURSES.filter((c) => {
    const matchesQuery =
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.instructor.toLowerCase().includes(query.toLowerCase());
    const matchesCat = category === 'ALL' || c.category === category;
    return matchesQuery && matchesCat;
  });

  return (
    <AppShell>
      <View style={styles.heroBlock}>
        <Text style={styles.eyebrow}>MATERI BERTAHAP & EVALUASI</Text>
        <Text style={styles.pageTitle}>
          Daftar <Text style={styles.pageTitleItalic}>Course Terstruktur</Text>
        </Text>
        <Text style={styles.pageSubtitle}>
          Pelajari materi bertahap lalu kerjakan evaluasi akhir agar sertifikat kelulusan dan poin otomatis tersimpan di akun
        </Text>
      </View>

      <View style={styles.searchWrap}>
        <Search size={17} color={COLORS.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari course atau instruktur"
          placeholderTextColor={COLORS.mutedLight}
          style={styles.searchInput}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterGroup}>
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={[styles.filterTab, active && styles.filterTabActive]}
            >
              <Text style={[styles.filterTabText, active && styles.filterTabTextActive]}>
                {cat === 'ALL' ? 'Semua' : cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.grid}>
        {filtered.map((c, idx) => {
          const progress = getCourseProgress(c.id);
          const evalRec = evaluations[c.id];
          return (
            <Pressable
              key={c.id}
              onPress={() => navigate('courseDetail', { courseId: c.id })}
              style={({ pressed }) => [styles.courseCard, pressed && styles.pressed]}
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.cardNumber}>0{idx + 1}</Text>
                <Text style={styles.cardKicker}>
                  COURSE · {c.category} · {c.priceLabel}
                </Text>
              </View>

              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardDesc}>{c.description}</Text>

              <View style={styles.progressSection}>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLabel}>Progres ({c.lessons.length} Modul)</Text>
                  <Text style={styles.progressValue}>{progress}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
              </View>

              <View style={styles.metaLine}>
                <Text style={styles.metaSmall}>
                  {c.instructor} · {c.level} · {c.duration}
                </Text>
                <Text style={styles.pointsCoral}>+{c.points} Poin</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.evalStatusText}>
                  {evalRec?.passed
                    ? `Lulus · Nilai ${evalRec.score}/100`
                    : evalRec
                      ? `Belum Lulus · Nilai ${evalRec.score}/100`
                      : c.scheduleLabel}
                </Text>
                <View style={styles.detailBtn}>
                  <Text style={styles.detailBtnText}>
                    {evalRec?.passed ? 'Lihat' : progress > 0 ? 'Lanjutkan' : 'Mulai'}
                  </Text>
                  <ArrowRight size={15} color={COLORS.white} />
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </AppShell>
  );
}

export function CourseDetailScreen() {
  const { params, navigate, getCourseProgress, evaluations } = useCourvia();
  const course = COURSES.find((c) => c.id === params.courseId) || COURSES[0];
  const progress = getCourseProgress(course.id);
  const evalRec = evaluations[course.id];

  return (
    <AppShell title="Detail Course" showBack>
      <View style={styles.detailStack}>
        <Text style={styles.eyebrow}>
          COURSE · {course.category} · {course.level}
        </Text>
        <Text style={styles.detailTitle}>{course.title}</Text>
        <Text style={styles.detailDesc}>{course.description}</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryEyebrow}>PROGRES BELAJAR</Text>
          <Text style={styles.summaryPoints}>{progress}%</Text>
          <View style={styles.darkProgressTrack}>
            <View style={[styles.darkProgressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.summaryNote}>
            {evalRec?.passed
              ? `Kamu lulus evaluasi dengan nilai ${evalRec.score}/100 dan sertifikat (+${course.points} Poin) sudah tersimpan di akun`
              : `Selesaikan materi lalu kerjakan evaluasi akhir (minimal nilai 70) untuk meraih sertifikat dan +${course.points} Poin Kegiatan`}
          </Text>

          <Pressable
            onPress={() => navigate('courseLearn', { courseId: course.id })}
            style={({ pressed }) => [styles.primaryCta, pressed && styles.pressed]}
          >
            <Text style={styles.primaryCtaText}>
              {progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
            </Text>
            <ArrowRight size={17} color={COLORS.white} />
          </Pressable>

          <Pressable
            onPress={() => navigate('courseEvaluation', { courseId: course.id })}
            style={({ pressed }) => [styles.asideSecondaryBtn, pressed && styles.pressed]}
          >
            <Text style={styles.asideSecondaryBtnText}>
              {evalRec?.passed ? 'Lihat Hasil Evaluasi' : 'Langsung ke Evaluasi Akhir'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.infoPanel}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>INSTRUKTUR</Text>
            <Text style={styles.infoVal}>
              {course.instructor} — {course.instructorRole}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>JADWAL & DURASI</Text>
            <Text style={styles.infoVal}>
              {course.scheduleLabel} · {course.duration} ({course.lessons.length} Modul + Evaluasi)
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>BIAYA COURSE & EVALUASI</Text>
            <Text style={styles.infoVal}>{course.priceLabel}</Text>
          </View>
        </View>

        <Text style={styles.subHeading}>Alur Pembelajaran</Text>
        <View style={styles.roadmapList}>
          {course.lessons.map((lesson, idx) => (
            <View key={lesson.id} style={styles.roadmapRow}>
              <Text style={styles.roadmapNum}>0{idx + 1}</Text>
              <View style={styles.roadmapCopy}>
                <Text style={styles.roadmapMeta}>
                  {lesson.type} · {lesson.duration}
                </Text>
                <Text style={styles.roadmapTitle}>{lesson.title}</Text>
              </View>
            </View>
          ))}
          <View style={styles.roadmapRow}>
            <Text style={styles.roadmapNum}>0{course.lessons.length + 1}</Text>
            <View style={styles.roadmapCopy}>
              <Text style={styles.roadmapMeta}>EVALUASI AKHIR · BATAS LULUS 70</Text>
              <Text style={styles.roadmapTitle}>
                Ujian Kompetensi & Penyimpanan Sertifikat Otomatis
              </Text>
            </View>
          </View>
        </View>
      </View>
    </AppShell>
  );
}

export function CourseLearnScreen() {
  const {
    params,
    navigate,
    completedLessonIds,
    toggleLessonComplete,
    getCourseProgress,
  } = useCourvia();

  const course = COURSES.find((c) => c.id === params.courseId) || COURSES[0];
  const [activeIdx, setActiveIdx] = useState(0);
  const doneIds = completedLessonIds[course.id] || [];
  const lesson = course.lessons[activeIdx] || course.lessons[0];
  const isLessonDone = doneIds.includes(lesson.id);
  const progress = getCourseProgress(course.id);

  return (
    <AppShell title="Materi Course" showBack>
      <View style={styles.learnHeaderRow}>
        <Text style={styles.eyebrow}>{course.title.toUpperCase()}</Text>
        <Text style={styles.learnProgressText}>Progres {progress}%</Text>
      </View>

      {/* Horizontal Mobile Module Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moduleStrip}>
        {course.lessons.map((item, idx) => {
          const active = idx === activeIdx;
          const completed = doneIds.includes(item.id);
          return (
            <Pressable
              key={item.id}
              onPress={() => setActiveIdx(idx)}
              style={[styles.modulePill, active && styles.modulePillActive]}
            >
              <View style={[styles.lessonCheckDot, completed && styles.lessonCheckDotDone]}>
                {completed && <Check size={11} color={COLORS.white} />}
              </View>
              <Text style={[styles.modulePillText, active && styles.whiteText]}>
                Modul 0{idx + 1}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Active Lesson Card */}
      <View style={styles.lessonCard}>
        <View style={styles.lessonHeaderRow}>
          <Text style={styles.eyebrow}>
            MODUL 0{activeIdx + 1} · {lesson.type}
          </Text>
          <View style={styles.durationChip}>
            <Clock size={13} color={COLORS.muted} />
            <Text style={styles.durationText}>{lesson.duration}</Text>
          </View>
        </View>

        <Text style={styles.detailTitle}>{lesson.title}</Text>
        <Text style={styles.detailDesc}>{lesson.summary}</Text>

        <View style={styles.keyPointsBox}>
          <Text style={styles.keyPointsHeading}>Poin Penting Materi</Text>
          {lesson.keyPoints.map((kp) => (
            <View key={kp} style={styles.outcomeItem}>
              <Check size={16} color={COLORS.coral} />
              <Text style={styles.outcomeText}>{kp}</Text>
            </View>
          ))}
        </View>

        <View style={styles.lessonActionsStack}>
          <Pressable
            onPress={() => toggleLessonComplete(course.id, lesson.id)}
            style={({ pressed }) => [
              styles.completeToggleBtn,
              isLessonDone && styles.completeToggleBtnDone,
              pressed && styles.pressed,
            ]}
          >
            <Check size={16} color={isLessonDone ? COLORS.white : COLORS.truffle} />
            <Text style={[styles.completeToggleText, isLessonDone && styles.whiteText]}>
              {isLessonDone ? 'Materi Selesai' : 'Tandai Materi Selesai'}
            </Text>
          </Pressable>

          {activeIdx < course.lessons.length - 1 ? (
            <Pressable
              onPress={() => {
                if (!isLessonDone) toggleLessonComplete(course.id, lesson.id);
                setActiveIdx(activeIdx + 1);
              }}
              style={styles.nextLessonBtn}
            >
              <Text style={styles.nextLessonText}>Materi Berikutnya</Text>
              <ArrowRight size={16} color={COLORS.white} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                if (!isLessonDone) toggleLessonComplete(course.id, lesson.id);
                navigate('courseEvaluation', { courseId: course.id });
              }}
              style={styles.evalJumpBtn}
            >
              <BookOpen size={16} color={COLORS.white} />
              <Text style={styles.nextLessonText}>Kerjakan Evaluasi Akhir</Text>
            </Pressable>
          )}
        </View>
      </View>
    </AppShell>
  );
}

export function CourseEvaluationScreen() {
  const { params, navigate, submitCourseEvaluation } = useCourvia();
  const course = COURSES.find((c) => c.id === params.courseId) || COURSES[0];

  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<CourseEvaluationRecord | null>(null);

  const currentQuestion = course.questions[questionIdx];

  const handleSubmit = () => {
    const { record } = submitCourseEvaluation(course.id, answers);
    setResult(record);
  };

  if (result) {
    return (
      <AppShell title="Hasil Evaluasi" showBack>
        <View style={styles.resultCard}>
          <Text style={styles.eyebrow}>HASIL EVALUASI AKHIR</Text>
          <View style={[styles.resultIcon, result.passed ? styles.resultPassed : styles.resultFailed]}>
            {result.passed ? (
              <Check size={28} color={COLORS.white} />
            ) : (
              <X size={28} color={COLORS.white} />
            )}
          </View>

          <Text style={styles.resultTitle}>
            {result.passed ? 'Selamat, kamu lulus' : 'Belum mencapai batas lulus'}
          </Text>
          <Text style={styles.resultSubtitle}>
            {result.passed
              ? `Sertifikat kelulusan "${course.title}" otomatis tersimpan di akunmu dan +${course.points} Poin tercatat di Riwayat Kegiatan`
              : 'Nilai minimal kelulusan adalah 70 dan kegiatan yang belum lulus tidak menghasilkan sertifikat sehingga silakan pelajari materi kembali lalu ulangi evaluasi'}
          </Text>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>NILAI KAMU</Text>
            <Text style={styles.scoreBig}>
              {result.score}
              <Text style={styles.scoreMax}> / 100</Text>
            </Text>
            <Text style={styles.scoreBreakdown}>
              Benar {result.correctCount} dari {result.totalQuestions} soal · Batas lulus 70
            </Text>
          </View>

          {result.passed ? (
            <View style={styles.resultActions}>
              <Pressable
                onPress={() =>
                  navigate('certificateDetail', { certificateId: `cert-course-${course.id}` })
                }
                style={styles.primaryCta}
              >
                <Text style={styles.primaryCtaText}>Lihat Sertifikat Tersimpan</Text>
                <Award size={18} color={COLORS.white} />
              </Pressable>

              <Pressable onPress={() => navigate('history')} style={styles.secondaryCta}>
                <Text style={styles.secondaryCtaText}>Buka Riwayat Kegiatan</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.resultActions}>
              <Pressable
                onPress={() => {
                  setAnswers({});
                  setQuestionIdx(0);
                  setResult(null);
                }}
                style={styles.primaryCta}
              >
                <Text style={styles.primaryCtaText}>Ulangi Evaluasi</Text>
                <RotateCcw size={17} color={COLORS.white} />
              </Pressable>

              <Pressable
                onPress={() => navigate('courseLearn', { courseId: course.id })}
                style={styles.secondaryCta}
              >
                <Text style={styles.secondaryCtaText}>Pelajari Ulang Materi</Text>
              </Pressable>
            </View>
          )}
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell title="Evaluasi Course" showBack hideBottomNav>
      <View style={styles.evalWrap}>
        <View style={styles.evalHeader}>
          <View style={styles.evalTitleCol}>
            <Text style={styles.eyebrow}>{course.category} · EVALUASI AKHIR</Text>
            <Text style={styles.evalCourseName}>{course.title}</Text>
          </View>
          <Text style={styles.evalCounter}>
            {questionIdx + 1} / {course.questions.length}
          </Text>
        </View>

        <View style={styles.evalProgressBar}>
          {course.questions.map((q, idx) => (
            <View
              key={q.id}
              style={[
                styles.evalProgressSegment,
                idx <= questionIdx && styles.evalProgressSegmentActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.eyebrow}>PERTANYAAN 0{questionIdx + 1}</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsList}>
            {currentQuestion.options.map((opt, optIdx) => {
              const selected = answers[questionIdx] === optIdx;
              return (
                <Pressable
                  key={opt}
                  onPress={() => setAnswers((prev) => ({ ...prev, [questionIdx]: optIdx }))}
                  style={[styles.optionBtn, selected && styles.optionBtnSelected]}
                >
                  <View style={[styles.optionLetterBox, selected && styles.optionLetterBoxSelected]}>
                    <Text style={[styles.optionLetter, selected && styles.whiteText]}>
                      {String.fromCharCode(65 + optIdx)}
                    </Text>
                  </View>
                  <Text style={styles.optionText}>{opt}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.evalNavRow}>
          <Pressable
            onPress={() => questionIdx > 0 && setQuestionIdx(questionIdx - 1)}
            disabled={questionIdx === 0}
            style={[styles.evalPrevBtn, questionIdx === 0 && styles.disabledBtn]}
          >
            <Text style={styles.evalPrevText}>Sebelumnya</Text>
          </Pressable>

          {questionIdx < course.questions.length - 1 ? (
            <Pressable
              onPress={() => answers[questionIdx] !== undefined && setQuestionIdx(questionIdx + 1)}
              disabled={answers[questionIdx] === undefined}
              style={[styles.evalNextBtn, answers[questionIdx] === undefined && styles.disabledBtn]}
            >
              <Text style={styles.evalNextText}>Berikutnya</Text>
              <ArrowRight size={16} color={COLORS.white} />
            </Pressable>
          ) : (
            <Pressable
              onPress={handleSubmit}
              disabled={answers[questionIdx] === undefined}
              style={[styles.evalSubmitBtn, answers[questionIdx] === undefined && styles.disabledBtn]}
            >
              <Text style={styles.evalNextText}>Kirim Evaluasi</Text>
              <Check size={16} color={COLORS.white} />
            </Pressable>
          )}
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
    paddingHorizontal: 12,
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
  courseCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 18,
    gap: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNumber: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.coral,
  },
  cardKicker: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.9,
    color: COLORS.muted,
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
  progressSection: {
    gap: 5,
    marginTop: 2,
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
  metaLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  metaSmall: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.muted,
    flex: 1,
  },
  pointsCoral: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  evalStatusText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.truffle,
    flex: 1,
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
  detailStack: {
    gap: 14,
  },
  detailTitle: {
    fontFamily: FONTS.serif,
    fontSize: 25,
    lineHeight: 31,
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
    color: COLORS.white,
    fontVariant: ['tabular-nums'],
  },
  darkProgressTrack: {
    height: 7,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  darkProgressFill: {
    height: '100%',
    backgroundColor: COLORS.coral,
    borderRadius: 99,
  },
  summaryNote: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.82)',
  },
  primaryCta: {
    backgroundColor: COLORS.coral,
    borderRadius: RADII.md,
    minHeight: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  primaryCtaText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  asideSecondaryBtn: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: RADII.md,
    minHeight: 44,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  asideSecondaryBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
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
  subHeading: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.truffle,
    marginTop: 4,
  },
  roadmapList: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  roadmapRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  roadmapNum: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.coral,
    width: 24,
  },
  roadmapCopy: {
    flex: 1,
    gap: 2,
  },
  roadmapMeta: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.muted,
  },
  roadmapTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  learnHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  learnProgressText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
    fontVariant: ['tabular-nums'],
  },
  moduleStrip: {
    flexDirection: 'row',
    gap: 8,
  },
  modulePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.pill,
    paddingHorizontal: 14,
    minHeight: 40,
  },
  modulePillActive: {
    backgroundColor: COLORS.truffle,
    borderColor: COLORS.truffle,
  },
  modulePillText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  lessonCheckDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonCheckDotDone: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  whiteText: {
    color: COLORS.white,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 18,
    gap: 14,
  },
  lessonHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  durationText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.muted,
  },
  keyPointsBox: {
    backgroundColor: COLORS.cream,
    borderRadius: RADII.lg,
    padding: 14,
    gap: 8,
  },
  keyPointsHeading: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.truffle,
    textTransform: 'uppercase',
  },
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  outcomeText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.truffle,
  },
  lessonActionsStack: {
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  completeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.creamSoft,
    borderRadius: RADII.md,
    minHeight: 46,
  },
  completeToggleBtnDone: {
    backgroundColor: COLORS.success,
  },
  completeToggleText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  nextLessonBtn: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.md,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  evalJumpBtn: {
    backgroundColor: COLORS.coral,
    borderRadius: RADII.md,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextLessonText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  evalWrap: {
    gap: 16,
  },
  evalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  evalTitleCol: {
    flex: 1,
  },
  evalCourseName: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.truffle,
    marginTop: 4,
  },
  evalCounter: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.muted,
    fontVariant: ['tabular-nums'],
  },
  evalProgressBar: {
    flexDirection: 'row',
    gap: 6,
  },
  evalProgressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 99,
    backgroundColor: COLORS.creamSoft,
  },
  evalProgressSegmentActive: {
    backgroundColor: COLORS.coral,
  },
  questionCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 18,
    gap: 14,
  },
  questionText: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  optionsList: {
    gap: 10,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 13,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    backgroundColor: COLORS.cream,
    minHeight: 52,
  },
  optionBtnSelected: {
    backgroundColor: COLORS.powderLight,
    borderColor: COLORS.truffle,
  },
  optionLetterBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterBoxSelected: {
    backgroundColor: COLORS.truffle,
  },
  optionLetter: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  optionText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.truffle,
  },
  evalNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  evalPrevBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    borderRadius: RADII.md,
    paddingHorizontal: 16,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  evalPrevText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  evalNextBtn: {
    flex: 1,
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.md,
    paddingHorizontal: 18,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  evalSubmitBtn: {
    flex: 1,
    backgroundColor: COLORS.success,
    borderRadius: RADII.md,
    paddingHorizontal: 18,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  evalNextText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  disabledBtn: {
    opacity: 0.4,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xxl,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  resultIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultPassed: {
    backgroundColor: COLORS.success,
  },
  resultFailed: {
    backgroundColor: COLORS.coral,
  },
  resultTitle: {
    fontFamily: FONTS.serif,
    fontSize: 25,
    fontWeight: '600',
    color: COLORS.truffle,
    textAlign: 'center',
  },
  resultSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
    textAlign: 'center',
  },
  scoreBox: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.xl,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    gap: 4,
    marginVertical: 4,
  },
  scoreLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: COLORS.powder,
  },
  scoreBig: {
    fontFamily: FONTS.serif,
    fontSize: 38,
    fontWeight: '600',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  scoreMax: {
    fontSize: 18,
    color: COLORS.white,
  },
  scoreBreakdown: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: 'rgba(255,255,255,0.78)',
  },
  resultActions: {
    width: '100%',
    gap: 10,
    marginTop: 4,
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
  pressed: {
    opacity: 0.84,
  },
});
