import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  COURSES,
  INITIAL_STUDENT_CERTIFICATES,
  INITIAL_STUDENT_EVALUATIONS,
  INITIAL_STUDENT_HISTORY,
  SEEDED_STUDENT_USER,
  WEBINARS,
} from '../data/courviaData';
import type {
  ActivityHistoryItem,
  CertificateRecord,
  CourseEvaluationRecord,
  RouteName,
  RouteParams,
  UserAccount,
} from '../types/courvia';

interface PersistedAccountState {
  user: UserAccount | null;
  registeredWebinarIds: number[];
  completedWebinarIds: number[];
  completedLessonIds: Record<number, string[]>;
  evaluations: Record<number, CourseEvaluationRecord>;
  history: ActivityHistoryItem[];
  certificates: CertificateRecord[];
}

interface CourviaContextValue {
  route: RouteName;
  params: RouteParams;
  navigate: (nextRoute: RouteName, nextParams?: RouteParams) => void;
  goBack: () => void;
  user: UserAccount | null;
  registeredWebinarIds: number[];
  completedWebinarIds: number[];
  completedLessonIds: Record<number, string[]>;
  evaluations: Record<number, CourseEvaluationRecord>;
  history: ActivityHistoryItem[];
  certificates: CertificateRecord[];
  totalPoints: number;
  loginWithCredentials: (email: string, password: string) => { ok: boolean; error?: string };
  registerAccount: (payload: {
    fullName: string;
    email: string;
    password: string;
    roleLabel: string;
  }) => { ok: boolean; error?: string };
  updateProfile: (payload: { fullName: string; roleLabel: string; institution?: string }) => void;
  logout: () => void;
  registerWebinar: (webinarId: number) => void;
  completeWebinar: (webinarId: number) => CertificateRecord | null;
  toggleLessonComplete: (courseId: number, lessonId: string) => void;
  getCourseProgress: (courseId: number) => number;
  submitCourseEvaluation: (
    courseId: number,
    selectedAnswers: Record<number, number>
  ) => { record: CourseEvaluationRecord; certificate: CertificateRecord | null };
}

const STORAGE_KEY = 'courvia_mvp_state_v1';

const EMPTY_STATE: PersistedAccountState = {
  user: null,
  registeredWebinarIds: [],
  completedWebinarIds: [],
  completedLessonIds: {},
  evaluations: {},
  history: [],
  certificates: [],
};

const SEEDED_STUDENT_STATE: PersistedAccountState = {
  user: SEEDED_STUDENT_USER,
  registeredWebinarIds: [1, 4],
  completedWebinarIds: [4],
  completedLessonIds: {
    1: ['1-1', '1-2', '1-3', '1-4'],
  },
  evaluations: INITIAL_STUDENT_EVALUATIONS,
  history: INITIAL_STUDENT_HISTORY,
  certificates: INITIAL_STUDENT_CERTIFICATES,
};

function loadInitialState(): PersistedAccountState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as PersistedAccountState;
    if (parsed.user?.id === 'dewi-mhs-05' || parsed.user?.fullName === 'Dewi Lestari') {
      return {
        ...EMPTY_STATE,
        ...parsed,
        user: SEEDED_STUDENT_USER,
        certificates: (parsed.certificates || []).map((cert) =>
          cert.recipientName === 'Dewi Lestari'
            ? { ...cert, recipientName: SEEDED_STUDENT_USER.fullName }
            : cert
        ),
      };
    }
    return {
      ...EMPTY_STATE,
      ...parsed,
    };
  } catch {
    return EMPTY_STATE;
  }
}

function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const CourviaContext = createContext<CourviaContextValue | null>(null);

export function CourviaProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedAccountState>(loadInitialState);
  const [routeStack, setRouteStack] = useState<{ route: RouteName; params: RouteParams }[]>(() => {
    const initial = loadInitialState();
    return [{ route: initial.user ? 'dashboard' : 'landing', params: {} }];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota issues
    }
  }, [state]);

  const current = routeStack[routeStack.length - 1];

  const navigate = (nextRoute: RouteName, nextParams: RouteParams = {}) => {
    setRouteStack((prev) => {
      const top = prev[prev.length - 1];
      if (top.route === nextRoute && JSON.stringify(top.params) === JSON.stringify(nextParams)) {
        return prev;
      }
      return [...prev.slice(-14), { route: nextRoute, params: nextParams }];
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    setRouteStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const loginWithCredentials = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password.trim()) {
      return { ok: false, error: 'Email dan password wajib diisi' };
    }
    if (cleanEmail === SEEDED_STUDENT_USER.email) {
      setState(SEEDED_STUDENT_STATE);
      setRouteStack([{ route: 'dashboard', params: {} }]);
      return { ok: true };
    }
    const nameGuess = cleanEmail.split('@')[0].replace(/[._-]+/g, ' ');
    const formattedName = nameGuess
      .split(' ')
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(' ');

    setState({
      ...EMPTY_STATE,
      user: {
        id: `usr-${Date.now().toString(36)}`,
        fullName: formattedName || 'Mahasiswa Courvia',
        email: cleanEmail,
        roleLabel: 'Mahasiswa',
      },
    });
    setRouteStack([{ route: 'dashboard', params: {} }]);
    return { ok: true };
  };

  const registerAccount = ({
    fullName,
    email,
    password,
    roleLabel,
  }: {
    fullName: string;
    email: string;
    password: string;
    roleLabel: string;
  }) => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return { ok: false, error: 'Nama lengkap, email, dan password wajib diisi' };
    }
    if (password.trim().length < 6) {
      return { ok: false, error: 'Password minimal 6 karakter' };
    }
    setState({
      ...EMPTY_STATE,
      user: {
        id: `usr-${Date.now().toString(36)}`,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        roleLabel: roleLabel || 'Mahasiswa',
      },
    });
    setRouteStack([{ route: 'dashboard', params: {} }]);
    return { ok: true };
  };

  const updateProfile = ({
    fullName,
    roleLabel,
    institution,
  }: {
    fullName: string;
    roleLabel: string;
    institution?: string;
  }) => {
    const trimmedName = fullName.trim();
    if (!trimmedName) return;
    setState((prev) => ({
      ...prev,
      user: prev.user
        ? {
            ...prev.user,
            fullName: trimmedName,
            roleLabel: roleLabel.trim() || prev.user.roleLabel,
            institution: institution?.trim() || prev.user.institution,
          }
        : null,
      certificates: prev.certificates.map((cert) => ({
        ...cert,
        recipientName: trimmedName,
      })),
    }));
  };

  const logout = () => {
    setState(EMPTY_STATE);
    setRouteStack([{ route: 'landing', params: {} }]);
  };

  const registerWebinar = (webinarId: number) => {
    setState((prev) => {
      if (prev.registeredWebinarIds.includes(webinarId)) return prev;
      return {
        ...prev,
        registeredWebinarIds: [...prev.registeredWebinarIds, webinarId],
      };
    });
  };

  const completeWebinar = (webinarId: number): CertificateRecord | null => {
    const webinar = WEBINARS.find((w) => w.id === webinarId);
    if (!webinar) return null;

    const existingCert = state.certificates.find(
      (c) => c.activityType === 'Webinar' && c.activityId === webinarId
    );
    if (existingCert) return existingCert;

    const nowIso = new Date().toISOString();
    const recipient = state.user?.fullName || 'Mahasiswa Courvia';
    const userTag = (state.user?.id || 'MHS').replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase();
    const certId = `cert-webinar-${webinarId}`;
    const newCert: CertificateRecord = {
      id: certId,
      certificateCode: `CV-WBN-${String(webinarId).padStart(3, '0')}-${userTag}${Math.floor(10 + Math.random() * 89)}`,
      activityType: 'Webinar',
      activityId: webinarId,
      title: webinar.title,
      category: webinar.category,
      instructor: webinar.instructor,
      recipientName: recipient,
      issuedAt: nowIso,
      dateDisplay: formatDateLong(nowIso),
      pointsEarned: webinar.points,
    };

    const newHistory: ActivityHistoryItem = {
      id: `hist-webinar-${webinarId}`,
      activityType: 'Webinar',
      activityId: webinarId,
      title: webinar.title,
      category: webinar.category,
      instructor: webinar.instructor,
      completedAt: nowIso,
      dateDisplay: formatDateShort(nowIso),
      pointsEarned: webinar.points,
      statusLabel: 'Hadir Penuh',
      certificateId: certId,
    };

    setState((prev) => ({
      ...prev,
      registeredWebinarIds: prev.registeredWebinarIds.includes(webinarId)
        ? prev.registeredWebinarIds
        : [...prev.registeredWebinarIds, webinarId],
      completedWebinarIds: prev.completedWebinarIds.includes(webinarId)
        ? prev.completedWebinarIds
        : [...prev.completedWebinarIds, webinarId],
      history: [newHistory, ...prev.history.filter((h) => h.id !== newHistory.id)],
      certificates: [newCert, ...prev.certificates.filter((c) => c.id !== newCert.id)],
    }));

    return newCert;
  };

  const toggleLessonComplete = (courseId: number, lessonId: string) => {
    setState((prev) => {
      const currentLessons = prev.completedLessonIds[courseId] || [];
      const exists = currentLessons.includes(lessonId);
      const updated = exists
        ? currentLessons.filter((id) => id !== lessonId)
        : [...currentLessons, lessonId];
      return {
        ...prev,
        completedLessonIds: {
          ...prev.completedLessonIds,
          [courseId]: updated,
        },
      };
    });
  };

  const getCourseProgress = (courseId: number): number => {
    const course = COURSES.find((c) => c.id === courseId);
    if (!course || course.lessons.length === 0) return 0;
    const done = (state.completedLessonIds[courseId] || []).length;
    return Math.round((done / course.lessons.length) * 100);
  };

  const submitCourseEvaluation = (
    courseId: number,
    selectedAnswers: Record<number, number>
  ): { record: CourseEvaluationRecord; certificate: CertificateRecord | null } => {
    const course = COURSES.find((c) => c.id === courseId)!;
    let correctCount = 0;
    course.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answerIndex) {
        correctCount += 1;
      }
    });
    const score = Math.round((correctCount / course.questions.length) * 100);
    const passed = score >= 70;
    const nowIso = new Date().toISOString();

    const record: CourseEvaluationRecord = {
      courseId,
      score,
      correctCount,
      totalQuestions: course.questions.length,
      passed,
      completedAt: nowIso,
    };

    let createdCert: CertificateRecord | null = null;

    if (passed) {
      const recipient = state.user?.fullName || 'Mahasiswa Courvia';
      const userTag = (state.user?.id || 'MHS').replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase();
      const certId = `cert-course-${courseId}`;
      createdCert = {
        id: certId,
        certificateCode: `CV-CRS-${String(courseId).padStart(3, '0')}-${userTag}${score}`,
        activityType: 'Course',
        activityId: courseId,
        title: course.title,
        category: course.category,
        instructor: course.instructor,
        recipientName: recipient,
        issuedAt: nowIso,
        dateDisplay: formatDateLong(nowIso),
        pointsEarned: course.points,
        score,
      };

      const historyEntry: ActivityHistoryItem = {
        id: `hist-course-${courseId}`,
        activityType: 'Course',
        activityId: courseId,
        title: course.title,
        category: course.category,
        instructor: course.instructor,
        completedAt: nowIso,
        dateDisplay: formatDateShort(nowIso),
        pointsEarned: course.points,
        statusLabel: `Lulus Evaluasi · Nilai ${score}`,
        score,
        certificateId: certId,
      };

      setState((prev) => ({
        ...prev,
        completedLessonIds: {
          ...prev.completedLessonIds,
          [courseId]: course.lessons.map((l) => l.id),
        },
        evaluations: {
          ...prev.evaluations,
          [courseId]: record,
        },
        history: [historyEntry, ...prev.history.filter((h) => h.id !== historyEntry.id)],
        certificates: [createdCert!, ...prev.certificates.filter((c) => c.id !== createdCert!.id)],
      }));
    } else {
      // PRD User Story #2 Acceptance Criteria: Kegiatan yang belum lulus tidak menghasilkan sertifikat
      setState((prev) => ({
        ...prev,
        evaluations: {
          ...prev.evaluations,
          [courseId]: record,
        },
      }));
    }

    return { record, certificate: createdCert };
  };

  const totalPoints = state.history.reduce((sum, item) => sum + item.pointsEarned, 0);

  return (
    <CourviaContext.Provider
      value={{
        route: current.route,
        params: current.params,
        navigate,
        goBack,
        user: state.user,
        registeredWebinarIds: state.registeredWebinarIds,
        completedWebinarIds: state.completedWebinarIds,
        completedLessonIds: state.completedLessonIds,
        evaluations: state.evaluations,
        history: state.history,
        certificates: state.certificates,
        totalPoints,
        loginWithCredentials,
        registerAccount,
        updateProfile,
        logout,
        registerWebinar,
        completeWebinar,
        toggleLessonComplete,
        getCourseProgress,
        submitCourseEvaluation,
      }}
    >
      {children}
    </CourviaContext.Provider>
  );
}

export function useCourvia() {
  const ctx = useContext(CourviaContext);
  if (!ctx) {
    throw new Error('useCourvia must be used within CourviaProvider');
  }
  return ctx;
}
