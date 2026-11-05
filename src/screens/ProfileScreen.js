import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export const ProfileScreen = ({ onOpenAbout }) => {
  const [dailyBudget, setDailyBudget] = useState(70);
  const [defaultCookware, setDefaultCookware] = useState('1 burner');

  const COOKWARE_OPTIONS = ['1 burner', 'Rice cooker', '1 pot / pan', 'Induction stove'];

  const handleCycleCookware = () => {
    const idx = COOKWARE_OPTIONS.indexOf(defaultCookware);
    const next = COOKWARE_OPTIONS[(idx + 1) % COOKWARE_OPTIONS.length];
    setDefaultCookware(next);
  };

  const handleAdjustBudget = (delta) => {
    setDailyBudget((prev) => Math.max(30, Math.min(200, prev + delta)));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.brandEmoji}>🍲</Text>
          <Text style={styles.brandTitle}>LutoTa</Text>
        </View>
        <Text style={styles.brandSubtitle}>
          Dorm meals made easy & budget-friendly!
        </Text>
      </View>

      {/* Profile Overview Card */}
      <View style={styles.card}>
        <Text style={styles.cardSectionLabel}>Profile Overview</Text>

        <View style={styles.avatarRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.chefName}>Student Chef</Text>
            <Text style={styles.chefSub}>BSIT College Student, Boarding House</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Setting 1: Daily Budget */}
        <View style={styles.settingRow}>
          <View style={styles.settingLabelGroup}>
            <Text style={styles.settingIcon}>🪙</Text>
            <Text style={styles.settingLabel}>Daily budget</Text>
          </View>

          <View style={styles.budgetControl}>
            <TouchableOpacity
              style={styles.budgetMiniBtn}
              onPress={() => handleAdjustBudget(-5)}
            >
              <Text style={styles.budgetMiniBtnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.settingValue}>₱{dailyBudget}</Text>

            <TouchableOpacity
              style={styles.budgetMiniBtn}
              onPress={() => handleAdjustBudget(5)}
            >
              <Text style={styles.budgetMiniBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Setting 2: Default Cookware */}
        <TouchableOpacity
          style={styles.settingRow}
          onPress={handleCycleCookware}
          activeOpacity={0.7}
        >
          <View style={styles.settingLabelGroup}>
            <Text style={styles.settingIcon}>🍳</Text>
            <Text style={styles.settingLabel}>Default cookware</Text>
          </View>
          <View style={styles.cookwareValueBox}>
            <Text style={styles.settingValue}>{defaultCookware}</Text>
            <Text style={styles.chevron}> ›</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats Grid matching Figma: 12 Recipes Viewed • 5 Meals You Made • ₱70 Left Today */}
      <View style={styles.card}>
        <Text style={styles.cardSectionLabel}>Quick Stats</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>📖</Text>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Recipes Viewed</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Meals You Made</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statNumber}>₱{dailyBudget}</Text>
            <Text style={styles.statLabel}>Left Today</Text>
          </View>
        </View>
      </View>

      {/* Tip for you box matching Figma */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Tip for you</Text>
        <Text style={styles.tipMessage}>
          You have made adobo 2x this week! Try the <Text style={{ fontWeight: '800' }}>₱40 Tortang Talong</Text> to stretch your remaining budget!
        </Text>
      </View>

      {/* Project & Proposal Info Link */}
      <TouchableOpacity
        style={styles.projectInfoBtn}
        onPress={onOpenAbout}
        activeOpacity={0.8}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.projectInfoTitle}>📋 BSIT Capstone & Proponents Info</Text>
          <Text style={styles.projectInfoSub}>
            Go, Moreno, Pagtalunan • Instructor Jomar Llevado
          </Text>
        </View>
        <Text style={styles.projectInfoChevron}>→</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FF6B00',
  },
  brandSubtitle: {
    fontSize: 11,
    color: '#78716C',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  cardSectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A8A29E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#FFEDD5',
  },
  avatarIcon: {
    fontSize: 22,
  },
  chefName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1917',
  },
  chefSub: {
    fontSize: 11,
    color: '#78716C',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F4',
    marginVertical: 14,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#292524',
  },
  settingValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FF6B00',
  },
  budgetControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  budgetMiniBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F5F5F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  budgetMiniBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#44403C',
    lineHeight: 16,
  },
  cookwareValueBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 16,
    color: '#A8A29E',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1C1917',
  },
  statLabel: {
    fontSize: 10,
    color: '#78716C',
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#F5F5F4',
  },
  tipCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9A3412',
    marginBottom: 4,
  },
  tipMessage: {
    fontSize: 12,
    color: '#7C2D12',
    lineHeight: 18,
  },
  projectInfoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  projectInfoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1917',
  },
  projectInfoSub: {
    fontSize: 11,
    color: '#78716C',
    marginTop: 2,
  },
  projectInfoChevron: {
    fontSize: 16,
    color: '#FF6B00',
    fontWeight: '800',
    marginLeft: 8,
  },
});
