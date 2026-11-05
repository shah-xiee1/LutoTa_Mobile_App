import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export const LoginScreen = ({ onNavigateSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, continueAsGuest } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) {
      setErrorMsg('Please enter your student email or username.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }
    setErrorMsg('');
    await login(email, password);
  };

  const handleDemoLogin = async () => {
    setEmail('student@dorm.ph');
    setPassword('student123');
    await login('student@dorm.ph', 'student123');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo & Header */}
          <View style={styles.headerBox}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🍲</Text>
            </View>
            <Text style={styles.brandTitle}>LutoTa</Text>
            <Text style={styles.brandTagline}>Budget meals for your dorm</Text>
          </View>

          {/* Welcome Card */}
          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Welcome back, Dormer! 👋</Text>
            <Text style={styles.cardSubtitle}>
              Log in to sync your budget & saved recipes
            </Text>

            {errorMsg ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
              </View>
            ) : null}

            {/* Email Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Student Email</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. student@university.edu.ph"
                  placeholderTextColor="#A8A29E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(val) => {
                    setEmail(val);
                    setErrorMsg('');
                  }}
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#A8A29E"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    setErrorMsg('');
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? '👁️' : '🙈'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.loginBtnText}>Log In</Text>
            </TouchableOpacity>

            {/* Demo Quick Button for Instructor / Tester */}
            <TouchableOpacity
              style={styles.demoBtn}
              onPress={handleDemoLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.demoBtnText}>
                ⚡ One-Tap Demo Login (For Testing)
              </Text>
            </TouchableOpacity>

            {/* Guest Exploration Option */}
            <TouchableOpacity
              style={styles.guestBtn}
              onPress={continueAsGuest}
              activeOpacity={0.8}
            >
              <Text style={styles.guestBtnText}>
                Continue as Guest (Explore App) →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Sign Up Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account yet? </Text>
            <TouchableOpacity onPress={onNavigateSignup}>
              <Text style={styles.signupLink}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Note */}
          <View style={styles.privacyNoteBox}>
            <Text style={styles.privacyNoteText}>
              🔒 Compliant with RA 10173 (Data Privacy Act of 2012). Your budget
              and recipes stay safe on your device.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FED7AA',
    marginBottom: 8,
  },
  logoEmoji: {
    fontSize: 34,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FF6B00',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 12,
    color: '#78716C',
    fontWeight: '500',
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1917',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#78716C',
    marginTop: 4,
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  errorText: {
    fontSize: 12,
    color: '#B91C1C',
    fontWeight: '600',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#44403C',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAF9',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E7E5E4',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#1C1917',
    padding: 0,
  },
  eyeBtn: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: '#FF6B00',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  demoBtn: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  demoBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EA580C',
  },
  guestBtn: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  guestBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716C',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#78716C',
  },
  signupLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FF6B00',
  },
  privacyNoteBox: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  privacyNoteText: {
    fontSize: 10,
    color: '#A8A29E',
    textAlign: 'center',
    lineHeight: 14,
  },
});

