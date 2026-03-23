import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing, radius } from '../theme';
import { useTheme } from '../context/ThemeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const DEMO_EMAIL = 'ravi.kumar@company.com';
const DEMO_PASSWORD = 'demo1234';

const Login: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (): void => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        navigation.replace('Main');
      } else {
        Alert.alert(
          'Invalid credentials',
          `Use demo credentials:\nEmail: ${DEMO_EMAIL}\nPassword: ${DEMO_PASSWORD}`,
        );
      }
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.wrapper, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>📦</Text>
          <Text style={[styles.appName, { color: colors.primary }]}>
            InvenTrack
          </Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Inventory & Ticketing System
          </Text>
        </View>

        <View style={[styles.hint, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.hintText, { color: colors.primary }]}>
            Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}
          </Text>
        </View>

        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Email
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
          placeholder="you@company.com"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Password
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
          placeholder="••••••••"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: colors.primary },
            loading && styles.btnDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {loading ? 'Signing in…' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, padding: spacing.xl, justifyContent: 'center' },
  logoBox: { alignItems: 'center', marginBottom: spacing.xl },
  logoIcon: { fontSize: 48, marginBottom: spacing.sm },
  appName: { fontSize: 32, fontWeight: '800' },
  tagline: { fontSize: 13, marginTop: 4 },
  hint: {
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  hintText: { fontSize: 13, fontWeight: '500' },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 15,
  },
  btn: {
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
