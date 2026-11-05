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

export const SignupScreen = ({ onNavigateLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dormLocation, setDormLocation] = useState('');
  const [dailyBudget, setDailyBudget] = useState('70');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { signup, continueAsGuest } = useAuth();

  const handleSignup = async () => {
    if (!name.trim()) {
      setErrorMsg('Please enter your name or nickname.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your student email.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    await signup({
      name,
      email,
      dormLocation: dormLocation || 'Campus Boarding House',
      dailyBudget: Number(dailyBudget) || 70,
    });
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
          {/* Header */}
          <View style={styles.headerBox}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🍳</Text>
            </View>
            <Text style={styles.brandTitle}>LutoTa</Text>
            <Text style={styles.brandTagline}>Budget meals for your dorm</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Create Student Account</Text>
            <Text style={styles.cardSubtitle}>
              Save your meal budget, pantry inventory & offline favorites
            </Text>

            {errorMsg ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
              </View>
            ) : null}

            {/* Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Name or Nickname</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Shahanna, Clyde, Harvey"
                  placeholderTextColor="#A8A29E"
                  value={name}
                  onChangeText={(val) => {
                    setName(val);
                    setErrorMsg('');
                  }}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Student Email</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. moreno.shahanamae@gmail.com"
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

            {/* Dormitory / Boarding House */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Boarding House / Dorm</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>🏠</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Villa Luna Boarding House"
                  placeholderTextColor="#A8A29E"
                  value={dormLocation}
                  onChangeText={setDormLocation}
                />
              </View>
            </View>

            {/* Target Daily Budget */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Target Daily Budget (₱)</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>🪙</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="70"
                  placeholderTextColor="#A8A29E"
                  keyboardType="numeric"
                  value={dailyBudget}
                  onChangeText={setDailyBudget}
                />
                <Text style={styles.budgetNote}>₱50–₱80 ideal</Text>
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="At least 6 characters"
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

            {/* Confirm Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Confirm Password</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Re-enter password"
                  placeholderTextColor="#A8A29E"
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  onChangeText={(val) => {
                    setConfirmPassword(val);
                    setErrorMsg('');
                  }}
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signupBtn}
              onPress={handleSignup}
              activeOpacity={0.85}
            >
              <Text style={styles.signupBtnText}>Create Account</Text>
            </TouchableOpacity>

            {/* Continue as Guest */}
            <TouchableOpacity
              style={styles.guestBtn}
              onPress={continueAsGuest}
              activeOpacity={0.8}
            >
              <Text style={styles.guestBtnText}>
                Skip for now (Continue as Guest) →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Back to Login */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onNavigateLogin}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }} />
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
    paddingTop: 16,
    paddingBottom: 30,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FED7AA',
    marginBottom: 6,
  },
  logoEmoji: {
    fontSize: 28,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF6B00',
  },
  brandTagline: {
    fontSize: 11,
    color: '#78716C',
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
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
    marginTop: 2,
    marginBottom: 14,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  errorText: {
    fontSize: 12,
    color: '#B91C1C',
    fontWeight: '600',
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#44403C',
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAF9',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E7E5E4',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  inputIcon: {
    fontSize: 13,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#1C1917',
    padding: 0,
  },
  budgetNote: {
    fontSize: 10,
    color: '#EA580C',
    fontWeight: '700',
    marginLeft: 6,
  },
  eyeBtn: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 14,
  },
  signupBtn: {
    backgroundColor: '#FF6B00',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  signupBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
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
    marginTop: 18,
  },
  footerText: {
    fontSize: 13,
    color: '#78716C',
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FF6B00',
  },
});

