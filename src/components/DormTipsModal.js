import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

export const DormTipsModal = ({ visible, onClose }) => {
  const TIPS = [
    {
      icon: '🔥',
      title: 'Single-Burner Cooking Strategy',
      points: [
        'Cook your rice first in the rice cooker or single pot, then cover with a towel to keep warm while cooking your ulam.',
        'Cook aromatics (garlic/onion) right in the oil of the canned goods (like sardines or tuna) to save cooking oil.',
        'One-pot dishes (Sopas, Miswa, Monggo, Lugaw) save cooking gas, electricity, and water for dishwashing.',
      ],
    },
    {
      icon: '🏪',
      title: 'Sari-Sari Store & Palengke Hacks',
      points: [
        'Buy produce "patingi-tingi" (e.g. 1 onion ₱5-₱8, 2 eggs ₱18) instead of bulk to avoid food spoiling without a large dorm fridge.',
        'Ask the palengke vendor for "tali ng pechay o kangkong"—at ₱10–₱15 a bundle, it doubles the meal volume instantly.',
        'Tokwa is the ultimate student protein: ~₱12-₱15 per block, versatile for adobo, sweet & sour, or crispy fried.',
      ],
    },
    {
      icon: '🍚',
      title: 'Zero-Waste Leftover Rules',
      points: [
        'Cold bahaw (leftover rice) makes the best crispy garlic sinangag because grains separate easily.',
        'Leftover soup (like sopas or monggo) thickens overnight; just add 1/4 cup water or broth when reheating in the morning.',
        'Never throw out vegetable stems (kangkong, pechay)—chop them finely and fry with garlic for crunch!',
      ],
    },
    {
      icon: '⚡',
      title: 'Induction / Electric Stove Safety',
      points: [
        'Boarding houses often have shared electricity breakers. Cook on medium heat to avoid tripping the circuit breaker.',
        'Always unplug your electric stove or immersion coil immediately after cooking.',
        'Keep a heat-resistant silicone mat or wooden coaster to place your hot pan on.',
      ],
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>💡 Dorm Cooking Survival Guide</Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.introCard}>
            <Text style={styles.introTitle}>Practical Dorm Life Cooking</Text>
            <Text style={styles.introDesc}>
              Living in a boarding house with limited cookware and a ₱50–₱80 daily budget?
              Here are tested strategies from Filipino student dormers.
            </Text>
          </View>

          {TIPS.map((tip, idx) => (
            <View key={idx} style={styles.tipCard}>
              <View style={styles.tipCardHeader}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
                <Text style={styles.tipCardTitle}>{tip.title}</Text>
              </View>
              <View style={styles.pointsList}>
                {tip.points.map((pt, pIdx) => (
                  <View key={pIdx} style={styles.pointRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.pointText}>{pt}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Got it, let's cook!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 28) : 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  scrollBody: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  introCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  introTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#9A3412',
    marginBottom: 4,
  },
  introDesc: {
    fontSize: 13,
    color: '#7C2D12',
    lineHeight: 18,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tipCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    paddingBottom: 8,
  },
  tipIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  tipCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  pointsList: {
    gap: 8,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 14,
    color: '#EA580C',
    marginRight: 8,
    lineHeight: 18,
  },
  pointText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
    lineHeight: 18,
  },
  doneButton: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});

