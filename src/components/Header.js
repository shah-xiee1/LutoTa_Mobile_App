import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Header = ({ onOpenTips, onOpenAbout }) => {
  return (
    <View style={styles.header}>
      <View style={styles.branding}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>🍳</Text>
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>Luto</Text>
            <Text style={styles.titleHighlight}>Ta</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>₱50–₱80</Text>
            </View>
          </View>
          <Text style={styles.subtitleText}>Budget Filipino Recipes for Dormers</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.tipButton}
          onPress={onOpenTips}
          activeOpacity={0.7}
        >
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipButtonText}>Tips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.aboutButton}
          onPress={onOpenAbout}
          activeOpacity={0.7}
        >
          <Text style={styles.aboutIcon}>ℹ️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF4E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#FFE0B2',
  },
  logoIcon: {
    fontSize: 24,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  titleHighlight: {
    fontSize: 22,
    fontWeight: '800',
    color: '#EA580C', // Philippine warm terracotta/orange
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  subtitleText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  tipIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  tipButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  aboutButton: {
    backgroundColor: '#F1F5F9',
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutIcon: {
    fontSize: 14,
  },
});
