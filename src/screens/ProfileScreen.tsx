import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ArrowRight, Award, Check, History, LogOut, Pencil } from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { useCourvia } from '../context/CourviaContext';
import { COLORS, FONTS, RADII } from '../theme/tokens';

export function ProfileScreen() {
  const { user, totalPoints, history, certificates, navigate, logout, updateProfile } =
    useCourvia();

  const fullName = user?.fullName || 'Mektildis Advenia Sanusi';
  const email = user?.email || 'mektildis.sanusi@mahasiswa.ac.id';
  const roleLabel = user?.roleLabel || 'Mahasiswa Semester 5';
  const institution = user?.institution || 'Universitas Merdeka';

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(fullName);
  const [roleInput, setRoleInput] = useState(roleLabel);
  const [institutionInput, setInstitutionInput] = useState(institution);

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <AppShell title="Profil Mahasiswa" showBack>
      <View style={styles.headerCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{initials || 'CV'}</Text>
        </View>
        <Text style={styles.eyebrow}>{roleLabel.toUpperCase()}</Text>
        <Text style={styles.nameTitle}>{fullName}</Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.institutionText}>{institution}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>KEGIATAN</Text>
          <Text style={styles.statVal}>{history.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>SERTIFIKAT</Text>
          <Text style={styles.statVal}>{certificates.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>TOTAL POIN</Text>
          <Text style={styles.statValCoral}>{totalPoints}</Text>
        </View>
      </View>

      <View style={styles.linksStack}>
        <Pressable
          onPress={() => navigate('history')}
          style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
        >
          <View style={styles.iconBoxBlue}>
            <History size={18} color={COLORS.truffle} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={styles.actionTitle}>Riwayat Kegiatan</Text>
            <Text style={styles.actionDesc}>
              Lihat daftar kegiatan yang sudah diikuti beserta poinnya
            </Text>
          </View>
          <ArrowRight size={18} color={COLORS.truffle} />
        </Pressable>

        <Pressable
          onPress={() => navigate('certificates')}
          style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
        >
          <View style={styles.iconBoxCoral}>
            <Award size={18} color={COLORS.white} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={styles.actionTitle}>Sertifikat Saya</Text>
            <Text style={styles.actionDesc}>
              Buka semua sertifikat webinar dan course yang tersimpan
            </Text>
          </View>
          <ArrowRight size={18} color={COLORS.truffle} />
        </Pressable>
      </View>

      <View style={styles.accountPanel}>
        <Text style={styles.accountKicker}>PENGATURAN AKUN</Text>
        <Text style={styles.accountDesc}>
          Semua sertifikat dan catatan poin kegiatan tersimpan otomatis di akun ini
        </Text>

        {editing ? (
          <View style={styles.editBox}>
            <View style={styles.editField}>
              <Text style={styles.editLabel}>Nama Lengkap</Text>
              <TextInput
                value={nameInput}
                onChangeText={setNameInput}
                placeholder="Nama lengkap"
                placeholderTextColor={COLORS.mutedLight}
                style={styles.editInput}
              />
            </View>
            <View style={styles.editField}>
              <Text style={styles.editLabel}>Status / Semester</Text>
              <TextInput
                value={roleInput}
                onChangeText={setRoleInput}
                placeholder="Mahasiswa Semester 5"
                placeholderTextColor={COLORS.mutedLight}
                style={styles.editInput}
              />
            </View>
            <View style={styles.editField}>
              <Text style={styles.editLabel}>Institusi / Kampus</Text>
              <TextInput
                value={institutionInput}
                onChangeText={setInstitutionInput}
                placeholder="Nama universitas"
                placeholderTextColor={COLORS.mutedLight}
                style={styles.editInput}
              />
            </View>
            <View style={styles.editActions}>
              <Pressable
                onPress={() => setEditing(false)}
                style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  updateProfile({
                    fullName: nameInput,
                    roleLabel: roleInput,
                    institution: institutionInput,
                  });
                  setEditing(false);
                }}
                style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
              >
                <Check size={15} color={COLORS.truffle} />
                <Text style={styles.saveBtnText}>Simpan</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              setNameInput(fullName);
              setRoleInput(roleLabel);
              setInstitutionInput(institution);
              setEditing(true);
            }}
            style={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}
          >
            <Pencil size={15} color={COLORS.truffle} />
            <Text style={styles.resetBtnText}>Ubah Data Profil</Text>
          </Pressable>
        )}

        <Pressable
          onPress={logout}
          style={({ pressed }) => [styles.logoutBtn, pressed && styles.pressed]}
        >
          <LogOut size={16} color={COLORS.white} />
          <Text style={styles.logoutBtnText}>Keluar Akun</Text>
        </Pressable>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xxl,
    padding: 22,
    alignItems: 'center',
    gap: 4,
  },
  avatarCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.powder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontFamily: FONTS.sans,
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  eyebrow: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: COLORS.coral,
  },
  nameTitle: {
    fontFamily: FONTS.serif,
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.truffle,
    textAlign: 'center',
  },
  emailText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.muted,
  },
  institutionText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.truffle,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.lg,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontFamily: FONTS.sans,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: COLORS.muted,
  },
  statVal: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.truffle,
    fontVariant: ['tabular-nums'],
  },
  statValCoral: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.coral,
    fontVariant: ['tabular-nums'],
  },
  linksStack: {
    gap: 10,
  },
  actionCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBoxBlue: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: COLORS.powderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxCoral: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCopy: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.truffle,
  },
  actionDesc: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.muted,
  },
  accountPanel: {
    backgroundColor: COLORS.truffle,
    borderRadius: RADII.xxl,
    padding: 20,
    gap: 10,
  },
  accountKicker: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: COLORS.powder,
  },
  accountDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  resetBtn: {
    backgroundColor: COLORS.cream,
    borderRadius: RADII.md,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  resetBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  logoutBtn: {
    backgroundColor: COLORS.coral,
    borderRadius: RADII.md,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  editBox: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: RADII.lg,
    padding: 14,
    gap: 10,
  },
  editField: {
    gap: 4,
  },
  editLabel: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.powder,
  },
  editInput: {
    backgroundColor: COLORS.white,
    borderRadius: RADII.sm,
    paddingHorizontal: 12,
    minHeight: 42,
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.truffle,
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  saveBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: RADII.md,
    backgroundColor: COLORS.powder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  saveBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.truffle,
  },
  pressed: {
    opacity: 0.84,
  },
});
