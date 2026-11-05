import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RECIPES } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';

export const BudgetScreen = ({ onSelectRecipe }) => {
  // Default to ₱80 as highlighted in the proposal (₱50–₱80)
  const [maxBudget, setMaxBudget] = useState(80);
  const [selectedMealType, setSelectedMealType] = useState('ALL');
  const [sortBy, setSortBy] = useState('PRICE_ASC'); // 'PRICE_ASC' | 'TIME_ASC'

  const BUDGET_PRESETS = [
    { label: '₱40', value: 40 },
    { label: '₱50', value: 50 },
    { label: '₱60', value: 60 },
    { label: '₱80', value: 80 },
    { label: '₱100', value: 100 },
  ];

  const MEAL_TYPES = [
    { id: 'ALL', label: 'All Meals' },
    { id: 'Breakfast', label: '🍳 Almusal' },
    { id: 'Lunch', label: '☀️ Tanghalian' },
    { id: 'Dinner', label: '🌙 Hapunan' },
    { id: 'Snack', label: '🥪 Merienda' },
  ];

  const handleAdjustBudget = (delta) => {
    setMaxBudget((prev) => Math.max(25, Math.min(150, prev + delta)));
  };

  const filteredRecipes = useMemo(() => {
    let list = RECIPES.filter((r) => r.totalCost <= maxBudget);

    if (selectedMealType !== 'ALL') {
      list = list.filter((r) => r.mealType.includes(selectedMealType));
    }

    if (sortBy === 'PRICE_ASC') {
      list.sort((a, b) => a.totalCost - b.totalCost);
    } else if (sortBy === 'TIME_ASC') {
      list.sort((a, b) => a.prepTime - b.prepTime);
    }

    return list;
  }, [maxBudget, selectedMealType, sortBy]);

  // Average per-serving cost calculation for stats
  const avgCostPerServing = useMemo(() => {
    if (filteredRecipes.length === 0) return 0;
    const sum = filteredRecipes.reduce((acc, cur) => acc + cur.costPerServing, 0);
    return (sum / filteredRecipes.length).toFixed(0);
  }, [filteredRecipes]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerIconBox}>
          <Text style={styles.bannerIcon}>💰</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Budget Mode Calculator</Text>
          <Text style={styles.bannerSubtitle}>
            Find meals that fit within your daily college student allowance
          </Text>
        </View>
      </View>

      {/* Interactive Budget Controller Card */}
      <View style={styles.budgetCard}>
        <Text style={styles.budgetCardTitle}>Set Your Maximum Target Budget</Text>

        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => handleAdjustBudget(-5)}
          >
            <Text style={styles.stepBtnText}>- ₱5</Text>
          </TouchableOpacity>

          <View style={styles.budgetValueBox}>
            <Text style={styles.currencySymbol}>₱</Text>
            <Text style={styles.budgetValue}>{maxBudget}</Text>
            <Text style={styles.budgetSub}>max meal cost</Text>
          </View>

          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => handleAdjustBudget(5)}
          >
            <Text style={styles.stepBtnText}>+ ₱5</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Presets */}
        <View style={styles.presetsRow}>
          {BUDGET_PRESETS.map((p) => {
            const active = maxBudget === p.value;
            return (
              <TouchableOpacity
                key={p.value}
                style={[styles.presetChip, active && styles.presetChipActive]}
                onPress={() => setMaxBudget(p.value)}
              >
                <Text
                  style={[
                    styles.presetChipText,
                    active && styles.presetChipTextActive,
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Meal Type Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionLabel}>Filter by Meal Time:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mealScroll}
        >
          {MEAL_TYPES.map((m) => {
            const active = selectedMealType === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.mealChip, active && styles.mealChipActive]}
                onPress={() => setSelectedMealType(m.id)}
              >
                <Text
                  style={[styles.mealChipText, active && styles.mealChipTextActive]}
                >
                  {m.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Stats Summary Bar */}
      <View style={styles.statsSummary}>
        <View style={styles.statCol}>
          <Text style={styles.statNum}>{filteredRecipes.length}</Text>
          <Text style={styles.statLabel}>Available Meals</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCol}>
          <Text style={styles.statNum}>~₱{avgCostPerServing}</Text>
          <Text style={styles.statLabel}>Avg / Serving</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.sortCol}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() =>
              setSortBy(sortBy === 'PRICE_ASC' ? 'TIME_ASC' : 'PRICE_ASC')
            }
          >
            <Text style={styles.sortButtonText}>
              {sortBy === 'PRICE_ASC' ? 'Sort: ₱ Lowest' : 'Sort: ⏱️ Fastest'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recipes Matching Budget */}
      <View style={styles.recipeList}>
        {filteredRecipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onPress={onSelectRecipe}
          />
        ))}

        {filteredRecipes.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>💸</Text>
            <Text style={styles.emptyTitle}>
              No meals found under ₱{maxBudget}
            </Text>
            <Text style={styles.emptySub}>
              Increase your target budget by tapping the "+ ₱5" button above.
            </Text>
          </View>
        )}
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
    paddingBottom: 24,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  bannerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerIcon: {
    fontSize: 20,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#9A3412',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#7C2D12',
    marginTop: 2,
  },
  budgetCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  budgetCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    gap: 16,
  },
  stepBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  stepBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  budgetValueBox: {
    alignItems: 'center',
    minWidth: 120,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '800',
    color: '#EA580C',
  },
  budgetValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#EA580C',
    lineHeight: 46,
  },
  budgetSub: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    justifyContent: 'center',
  },
  presetChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  presetChipActive: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  presetChipTextActive: {
    color: '#FFFFFF',
  },
  filterSection: {
    marginTop: 14,
  },
  filterSectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  mealScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  mealChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  mealChipActive: {
    backgroundColor: '#334155',
    borderColor: '#334155',
  },
  mealChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  mealChipTextActive: {
    color: '#FFFFFF',
  },
  statsSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  sortCol: {
    flex: 1.2,
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  sortButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  recipeList: {
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyEmoji: {
    fontSize: 38,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  emptySub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
});

