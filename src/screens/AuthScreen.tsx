import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { CourviaLogo } from '../components/CourviaLogo';
import { useCourvia } from '../context/CourviaContext';
import { COLORS, FONTS, RADII } from '../theme/tokens';

interface AuthScreenProps {
  mode: 'login' | 'register';
}

const ROLE_OPTIONS = ['Mahasiswa', 'Pelajar', 'Fresh Graduate'];

export function AuthScreen({ mode }: AuthScreenProps) {
  const { navigate, loginWithCredentials, registerAccount } = useCourvia();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(mode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roleLabel, setRoleLabel] = useState('Mahasiswa');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setActiveTab(mode);
    setError('');
    setNotice('');
  }, [mode]);

  const handleSubmit = () => {
    setError('');
    setNotice('');
    if (activeTab === 'login') {
      const res = loginWithCredentials(email, password);
      if (!res.ok && res.error) setError(res.error.replace(/\.+$/, ''));
    } else {
      const res = registerAccount({ fullName, email, password, roleLabel });
      if (!res.ok && res.error) setError(res.error.replace(/\.+$/, ''));
    }
  };

  const handleForgotPassword = () => {
    setError('');
    if (!email.trim()) {
      setError('Masukkan emailmu terlebih dahulu untuk atur ulang password');
      return;
    }
    setNotice(`Tautan atur ulang password dikirim ke ${email.trim().toLowerCase()}`);
  };

  return (
    <View style={styles.page}>
      {/* Compact Native Mobile Top Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigate('landing')}
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        >
          <ArrowLeft size={20} color={COLORS.truffle} />
        </Pressable>
        <CourviaLogo markSize={22} fontSize={18} />
        <View style={styles.topSpacer} />
      </View>

      {/* Single-Screen Content (Zero Scroll for Both Sign In & Sign Up) */}
      <View style={styles.body}>
        <View style={styles.topSection}>
          <View style={styles.headerBlock}>
            <Text style={styles.title}>
              {activeTab === 'login' ? 'Masuk ke Courvia' : 'Buat Akun Courvia'}
            </Text>
            <Text style={styles.subtitle}>
              {activeTab === 'login'
                ? 'Akses jadwal webinar, course, dan sertifikatmu'
                : 'Daftar untuk kumpulkan poin dan sertifikat otomatis'}
            </Text>
          </View>

          {/* Segmented Switcher: Masuk / Daftar */}
          <View style={styles.segmentedWrap}>
            <Pressable
              onPress={() => {
                setActiveTab('login');
                setError('');
                setNotice('');
              }}
              style={[styles.segmentBtn, activeTab === 'login' && styles.segmentBtnActive]}
            >
              <Text style={[styles.segmentText, activeTab === 'login' && styles.segmentTextActive]}>
                Masuk
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setActiveTab('register');
                setError('');
                setNotice('');
              }}
              style={[styles.segmentBtn, activeTab === 'register' && styles.segmentBtnActive]}
            >
              <Text
                style={[styles.segmentText, activeTab === 'register' && styles.segmentTextActive]}
              >
                Daftar
              </Text>
            </Pressable>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {activeTab === 'register' && (
              <>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Nama Lengkap</Text>
                  <View style={styles.inputBox}>
                    <User size={16} color={COLORS.muted} />
                    <TextInput
                      value={fullName}
                      onChangeText={setFullName}
                      placeholder="Contoh: Mektildis Advenia Sanusi"
                      placeholderTextColor={COLORS.mutedLight}
                      style={styles.input}
                    />
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Status Pengguna</Text>
                  <View style={styles.roleRow}>
                    {ROLE_OPTIONS.map((role) => {
                      const active = roleLabel === role;
                      return (
                        <Pressable
                          key={role}
                          onPress={() => setRoleLabel(role)}
                          style={[styles.roleChip, active && styles.roleChipActive]}
                        >
                          <Text style={[styles.roleChipText, active && styles.roleChipTextActive]}>
                            {role}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              </>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <View style={styles.inputBox}>
                <Mail size={16} color={COLORS.muted} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="nama@mahasiswa.ac.id"
                  placeholderTextColor={COLORS.mutedLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <View style={styles.passwordHeaderRow}>
                <Text style={styles.fieldLabel}>Password</Text>
                {activeTab === 'login' && (
                  <Pressable onPress={handleForgotPassword}>
                    <Text style={styles.forgotText}>Lupa password?</Text>
                  </Pressable>
                )}
              </View>
              <View style={styles.inputBox}>
                <Lock size={16} color={COLORS.muted} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor={COLORS.mutedLight}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  accessibilityRole="button"
                  accessibilityLabel="Tampilkan atau sembunyikan password"
                  style={styles.eyeBtn}
                >
                  {showPassword ? (
                    <EyeOff size={16} color={COLORS.muted} />
                  ) : (
                    <Eye size={16} color={COLORS.muted} />
                  )}
                </Pressable>
              </View>
            </View>

            {!!error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {!!notice && (
              <View style={styles.noticeBox}>
                <Text style={styles.noticeText}>{notice}</Text>
              </View>
            )}

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
            >
              <Text style={styles.submitBtnText}>
                {activeTab === 'login' ? 'Masuk' : 'Daftar Sekarang'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Bottom Switch */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {activeTab === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
          </Text>
          <Pressable
            onPress={() => {
              setActiveTab(activeTab === 'login' ? 'register' : 'login');
              setError('');
              setNotice('');
            }}
          >
            <Text style={styles.switchLink}>
              {activeTab === 'login' ? 'Daftar' : 'Masuk'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  topBar: {
    height: 48,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSpacer: {
    width: 40,
  },
  body: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  headerBlock: {
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.truffle,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.muted,
    textAlign: 'center',
  },
  segmentedWrap: {
    flexDirection: 'row',
    backgroundColor: COLORS.creamSoft,
    borderRadius: RADII.md,
    padding: 4,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    minHeight: 36,
    borderRadius: RADII.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: COLORS.white,
  },
  segmentText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.muted,
  },
  segmentTextActive: {
    color: COLORS.truffle,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 15,
    gap: 10,
  },
  fieldGroup: {
    gap: 4,
  },
  fieldLabel: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    borderRadius: RADII.md,
    paddingHorizontal: 12,
    minHeight: 42,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.truffle,
  },
  eyeBtn: {
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleRow: {
    flexDirection: 'row',
    gap: 6,
  },
  roleChip: {
    flex: 1,
    minHeight: 34,
    borderRadius: RADII.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  roleChipActive: {
    backgroundColor: COLORS.truffle,
    borderColor: COLORS.truffle,
  },
  roleChipText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  roleChipTextActive: {
    color: COLORS.white,
  },
  errorBox: {
    backgroundColor: COLORS.coralSoft,
    borderWidth: 1,
    borderColor: COLORS.coral,
    borderRadius: RADII.sm,
    padding: 8,
  },
  errorText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: '#b43c24',
  },
  submitBtn: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.md,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  submitBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  passwordHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.coral,
  },
  noticeBox: {
    backgroundColor: COLORS.powderLight,
    borderWidth: 1,
    borderColor: COLORS.powder,
    borderRadius: RADII.sm,
    padding: 8,
  },
  noticeText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.truffle,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingTop: 6,
  },
  switchLabel: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.muted,
  },
  switchLink: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.coral,
  },
  pressed: {
    opacity: 0.82,
  },
});
