import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export const AboutScreen = ({ onClose }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* App Branding Header */}
      <View style={styles.headerBox}>
        <View style={styles.appIcon}>
          <Text style={styles.appEmoji}>🍳</Text>
        </View>
        <Text style={styles.appTitle}>LutoTa</Text>
        <Text style={styles.appSubtitle}>
          Budget-Friendly Filipino Recipes for Students
        </Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>BSIT Capstone / Mobile Project Proposal</Text>
        </View>
      </View>

      {/* Project Proponents & Course Details */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>📋 Project Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Course / Program:</Text>
          <Text style={styles.infoValue}>BSIT (Bachelor of Science in Information Technology)</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Instructor:</Text>
          <Text style={styles.infoValue}>Jomar Llevado</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Target Platform:</Text>
          <Text style={styles.infoValue}>Cross-platform (React Native + Expo Go)</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Contact Email:</Text>
          <Text style={styles.infoValue}>moreno.shahanamae@gmail.com</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.subHeader}>Proponents & Roles</Text>

        <View style={styles.memberBox}>
          <Text style={styles.memberName}>Moreno, Shahanna Mae</Text>
          <Text style={styles.memberRole}>Project Manager / Mobile Developer</Text>
          <Text style={styles.memberTask}>
            • Schedules, task assignment, core app screens, Expo setup
          </Text>
        </View>

        <View style={styles.memberBox}>
          <Text style={styles.memberName}>Go, Franz Clyde Rian S.</Text>
          <Text style={styles.memberRole}>UI/UX Designer / Documentation</Text>
          <Text style={styles.memberTask}>
            • Figma wireframes, high-fidelity prototypes, visual design
          </Text>
        </View>

        <View style={styles.memberBox}>
          <Text style={styles.memberName}>Pagtalunan, Harvey Lloyd D.</Text>
          <Text style={styles.memberRole}>Mobile Developer / Tester</Text>
          <Text style={styles.memberTask}>
            • Feature implementation, testing, bug tracking, user feedback
          </Text>
        </View>
      </View>

      {/* Problem & Objectives */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>🎯 Background & Objectives</Text>

        <Text style={styles.problemLabel}>The Problem:</Text>
        <Text style={styles.bodyText}>
          Filipino college students living in dorms and boarding houses face the daily
          dilemma: <Text style={{ fontStyle: 'italic', fontWeight: '700' }}>"Ano ulam?"</Text> with limited budgets
          (₱50–₱80 per meal), only basic single-burner or rice-cooker appliances, and
          random leftover ingredients. Many end up overspending on fast takeout or eating
          instant noodles.
        </Text>

        <Text style={[styles.problemLabel, { marginTop: 12 }]}>Core Objectives:</Text>
        <View style={styles.objectiveList}>
          <Text style={styles.objectiveItem}>
            1. <Text style={{ fontWeight: '700' }}>Pantry Mode:</Text> Suggest recipes that maximize leftover dorm ingredients to reduce food waste.
          </Text>
          <Text style={styles.objectiveItem}>
            2. <Text style={{ fontWeight: '700' }}>Budget Mode:</Text> Strict ₱50–₱80 meal filters with per-serving cost estimates based on palengke/sari-sari prices.
          </Text>
          <Text style={styles.objectiveItem}>
            3. <Text style={{ fontWeight: '700' }}>Single-Burner Friendly:</Text> Realistic step-by-step instructions designed for 1 electric stove or rice cooker.
          </Text>
          <Text style={styles.objectiveItem}>
            4. <Text style={{ fontWeight: '700' }}>Offline Favorites:</Text> Save go-to dishes locally via AsyncStorage so no expensive mobile data is wasted.
          </Text>
          <Text style={styles.objectiveItem}>
            5. <Text style={{ fontWeight: '700' }}>Usability Evaluation:</Text> Tested with 15–20 campus dormers via System Usability Scale (SUS).
          </Text>
        </View>
      </View>

      {/* Tech Stack Summary */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>⚙️ Technical Stack</Text>
        <View style={styles.techGrid}>
          <View style={styles.techPill}>
            <Text style={styles.techTitle}>Framework</Text>
            <Text style={styles.techDesc}>React Native & Expo</Text>
          </View>
          <View style={styles.techPill}>
            <Text style={styles.techTitle}>Language</Text>
            <Text style={styles.techDesc}>JavaScript / TypeScript</Text>
          </View>
          <View style={styles.techPill}>
            <Text style={styles.techTitle}>Local Storage</Text>
            <Text style={styles.techDesc}>AsyncStorage</Text>
          </View>
          <View style={styles.techPill}>
            <Text style={styles.techTitle}>Design Spec</Text>
            <Text style={styles.techDesc}>Figma Prototype</Text>
          </View>
        </View>
      </View>

      {/* SUS Survey Guide Note */}
      <View style={[styles.card, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
        <Text style={[styles.cardHeader, { color: '#166534' }]}>
          📊 Usability Testing Checklist (SUS)
        </Text>
        <Text style={[styles.bodyText, { color: '#14532D' }]}>
          To evaluate your project with 15–20 dormers as promised in Section 3 of your proposal,
          have students test:
        </Text>
        <Text style={[styles.bodyText, { color: '#14532D', marginTop: 4 }]}>
          ✓ Finding a meal under ₱50 in Budget Mode{'\n'}
          ✓ Checking leftover items in Pantry Mode{'\n'}
          ✓ Bookmarking a favorite recipe for offline access{'\n'}
          ✓ Following a single-burner cooking guide
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  headerBox: {
    alignItems: 'center',
    marginVertical: 14,
  },
  appIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    marginBottom: 8,
  },
  appEmoji: {
    fontSize: 34,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  appSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  versionBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  versionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  subHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  memberBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  memberName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  memberRole: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EA580C',
    marginTop: 1,
  },
  memberTask: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 3,
  },
  problemLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    marginTop: 2,
  },
  objectiveList: {
    marginTop: 6,
    gap: 6,
  },
  objectiveItem: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techPill: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  techTitle: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  techDesc: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
});
