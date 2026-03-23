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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { spacing, radius } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { currentUser, usersData } from '../data/mockData';
import type { User } from '../types';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const Settings: React.FC = () => {
  const { colors, isDark, toggleDark } = useTheme();
  const navigation = useNavigation<NavProp>();

  const [orgName, setOrgName] = useState<string>(currentUser.organization);
  const [inviteEmail, setInvite] = useState<string>('');
  const [notifications, setNotif] = useState<boolean>(true);

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
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={[styles.heading, { color: colors.textPrimary }]}>
        Settings
      </Text>

      {/* Profile card */}
      <View
        style={[
          styles.profileCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {currentUser.avatar}
          </Text>
        </View>
        <View>
          <Text style={[styles.profileName, { color: colors.textPrimary }]}>
            {currentUser.name}
          </Text>
          <Text style={[styles.profileMeta, { color: colors.textSecondary }]}>
            {currentUser.email}
          </Text>
          <Text style={[styles.profileMeta, { color: colors.textSecondary }]}>
            {currentUser.role}
          </Text>
        </View>
      </View>

      {/* Organization */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Organization
      </Text>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        Organization Name
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.textPrimary,
          },
        ]}
        value={orgName}
        onChangeText={setOrgName}
        placeholderTextColor={colors.textMuted}
      />

      {/* Invite */}
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        Invite Team Member
      </Text>
      <View style={styles.row}>
        <TextInput
          style={[
            styles.input,
            {
              flex: 1,
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.textPrimary,
            },
          ]}
          placeholder="colleague@company.com"
          placeholderTextColor={colors.textMuted}
          value={inviteEmail}
          onChangeText={setInvite}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.inviteBtn, { backgroundColor: colors.primary }]}
          onPress={handleInvite}
        >
          <Text style={styles.inviteBtnText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Team list */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Team Members
      </Text>
      {usersData.map((u: User) => (
        <View
          key={u.id}
          style={[styles.userRow, { borderBottomColor: colors.border }]}
        >
          <View
            style={[
              styles.userAvatar,
              { backgroundColor: colors.primaryLight },
            ]}
          >
            <Text style={[styles.userAvatarText, { color: colors.primary }]}>
              {u.avatar}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.userName, { color: colors.textPrimary }]}>
              {u.name}
            </Text>
            <Text style={[styles.userMeta, { color: colors.textMuted }]}>
              {u.email} · {u.role}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: u.status === 'Active' ? colors.success : colors.danger,
            }}
          >
            {u.status}
          </Text>
        </View>
      ))}

      {/* Preferences */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Preferences
      </Text>

      <View style={[styles.toggleRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>
          Push Notifications
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotif}
          trackColor={{ true: colors.primary }}
        />
      </View>

      <View style={[styles.toggleRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleDark}
          trackColor={{ true: colors.primary }}
        />
      </View>

      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: colors.primary }]}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <Text style={styles.saveBtnText}>Save Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logoutBtn, { borderColor: colors.danger }]}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={[styles.logoutBtnText, { color: colors.danger }]}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: spacing.md },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700' },
  profileName: { fontSize: 16, fontWeight: '700' },
  profileMeta: { fontSize: 13 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  inviteBtn: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  inviteBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    gap: spacing.sm,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: { fontSize: 12, fontWeight: '700' },
  userName: { fontSize: 14, fontWeight: '600' },
  userMeta: { fontSize: 12 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  toggleLabel: { fontSize: 15 },
  saveBtn: {
    borderRadius: radius.md,
    padding: spacing.md + 2,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  logoutBtn: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md + 2,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  logoutBtnText: { fontSize: 16, fontWeight: '700' },
});
