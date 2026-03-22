import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radius, typography } from '../theme';
import { currentUser, usersData } from '../data/mockData';
import type { RootStackParamList, User } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Settings: React.FC<Props> = ({ navigation }) => {
  const [orgName,       setOrgName]   = useState<string>(currentUser.organization);
  const [inviteEmail,   setInvite]    = useState<string>('');
  const [notifications, setNotif]     = useState<boolean>(true);
  const [darkMode,      setDark]      = useState<boolean>(false);

  const handleSave = (): void => {
    Alert.alert('Settings Saved', 'Your preferences have been updated.');
  };

  const handleInvite = (): void => {
    if (!inviteEmail.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    Alert.alert('Invite Sent ✅', `An invite has been sent to ${inviteEmail}.`);
    setInvite('');
  };

  const handleLogout = (): void => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={[typography.h2, styles.heading]}>Settings</Text>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{currentUser.avatar}</Text>
        </View>
        <View>
          <Text style={styles.profileName}>{currentUser.name}</Text>
          <Text style={styles.profileMeta}>{currentUser.email}</Text>
          <Text style={styles.profileMeta}>{currentUser.role}</Text>
        </View>
      </View>

      {/* Organization */}
      <Text style={styles.sectionTitle}>Organization</Text>
      <Text style={styles.label}>Organization Name</Text>
      <TextInput
        style={styles.input}
        value={orgName}
        onChangeText={setOrgName}
        placeholderTextColor={colors.textMuted}
      />

      {/* Invite */}
      <Text style={styles.label}>Invite Team Member</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="colleague@company.com"
          placeholderTextColor={colors.textMuted}
          value={inviteEmail}
          onChangeText={setInvite}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.inviteBtn} onPress={handleInvite}>
          <Text style={styles.inviteBtnText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Team list */}
      <Text style={styles.sectionTitle}>Team Members</Text>
      {usersData.map((u: User) => (
        <View key={u.id} style={styles.userRow}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>{u.avatar}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{u.name}</Text>
            <Text style={styles.userMeta}>{u.email} · {u.role}</Text>
          </View>
          <Text style={[styles.statusText, u.status === 'Active' && styles.active]}>
            {u.status}
          </Text>
        </View>
      ))}

      {/* Preferences */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Push Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotif}
          trackColor={{ true: colors.primary }}
        />
      </View>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDark}
          trackColor={{ true: colors.primary }}
        />
      </View>

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <Text style={styles.saveBtnText}>Save Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutBtnText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  screen:       { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.md },
  heading:      { paddingTop: spacing.xl, paddingBottom: spacing.md },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 3, elevation: 1,
  },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText:    { fontSize: 16, fontWeight: '700', color: colors.primary },
  profileName:   { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  profileMeta:   { fontSize: 13, color: colors.textSecondary },
  sectionTitle:  { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm },
  label:         { ...typography.label, marginBottom: spacing.xs, marginTop: spacing.sm },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
  },
  row:           { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', marginTop: spacing.sm },
  inviteBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  inviteBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  userAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  userAvatarText: { fontSize: 12, fontWeight: '700', color: colors.primary },
  userName:       { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  userMeta:       { fontSize: 12, color: colors.textMuted },
  statusText:     { fontSize: 12, color: colors.danger },
  active:         { color: colors.success },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toggleLabel:    { fontSize: 15, color: colors.textPrimary },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md + 2,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveBtnText:    { color: colors.white, fontSize: 16, fontWeight: '700' },
  logoutBtn: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: radius.md,
    padding: spacing.md + 2,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  logoutBtnText:  { color: colors.danger, fontSize: 16, fontWeight: '700' },
});
