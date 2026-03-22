import React, {useState} from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {colors, spacing, radius, typography} from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const DEMO_EMAIL    = 'ravi.kumar@company.com';
const DEMO_PASSWORD = 'demo1234';

const Login: React.FC<Props> = ({navigation}) => {
  const [email,    setEmail]   = useState<string>('');
  const [password, setPassword]= useState<string>('');
  const [loading,  setLoading] = useState<boolean>(false);

  const handleLogin = (): void => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        navigation.replace('App');
      } else {
        Alert.alert('Invalid credentials', `Use:\nEmail: ${DEMO_EMAIL}\nPassword: ${DEMO_PASSWORD}`);
      }
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>📦</Text>
          <Text style={styles.appName}>InvenTrack</Text>
          <Text style={styles.tagline}>Inventory and Ticketing System</Text>
        </View>
        <View style={styles.hint}>
          <Text style={styles.hintText}>Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}</Text>
        </View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@company.com"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}>
          <Text style={styles.btnText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper:     {flex: 1, backgroundColor: colors.background},
  container:   {flex: 1, padding: spacing.xl, justifyContent: 'center'},
  logoBox:     {alignItems: 'center', marginBottom: spacing.xl},
  logoIcon:    {fontSize: 48, marginBottom: spacing.sm},
  appName:     {fontSize: 32, fontWeight: '800', color: colors.primary},
  tagline:     {...typography.caption, marginTop: 4},
  hint:        {backgroundColor: colors.primaryLight, borderRadius: radius.md, padding: spacing.sm, marginBottom: spacing.lg, alignItems: 'center'},
  hintText:    {fontSize: 13, color: colors.primary, fontWeight: '500'},
  label:       {...typography.label, marginBottom: spacing.xs, marginTop: spacing.md},
  input:       {backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, fontSize: 15, color: colors.textPrimary},
  btn:         {backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl},
  btnDisabled: {opacity: 0.6},
  btnText:     {color: colors.white, fontSize: 16, fontWeight: '700'},
});

export default Login;
