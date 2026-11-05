import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { RECIPES } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';

export const HomeScreen = ({ onSelectRecipe, onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [randomSuggestion, setRandomSuggestion] = useState(null);

  const FILTERS = [
    { id: 'ALL', label: 'All Dishes' },
    { id: 'UNDER_40', label: '⚡ Under ₱40' },
    { id: 'FAST', label: '⏱️ Under 15m' },
    { id: 'RICE_COOKER', label: '🍚 Rice Cooker' },
    { id: 'GULAY', label: '🥬 Gulay' },
    { id: 'SABAW', label: '🍲 May Sabaw' },
    { id: 'ITLOG', label: '🥚 Itlog / Torta' },
  ];

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((r) => {
      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesEnglish = r.englishName.toLowerCase().includes(q);
        const matchesIng = r.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesEnglish && !matchesIng) return false;
      }

      // Chip filters
      if (activeFilter === 'UNDER_40') return r.totalCost <= 40;
      if (activeFilter === 'FAST') return r.prepTime <= 15;
      if (activeFilter === 'RICE_COOKER')
        return r.cookware.toLowerCase().includes('rice cooker');
      if (activeFilter === 'GULAY')
        return r.category.toLowerCase().includes('gulay');
      if (activeFilter === 'SABAW')
        return r.category.toLowerCase().includes('sabaw');
      if (activeFilter === 'ITLOG')
        return r.category.toLowerCase().includes('itlog');

      return true;
    });
  }, [searchQuery, activeFilter]);

  const handleRandomPick = () => {
    const randomIndex = Math.floor(Math.random() * RECIPES.length);
    const pick = RECIPES[randomIndex];
    setRandomSuggestion(pick);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Search Input Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search dish, egg, sardinas, toyo, kangkong..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearchIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Hero Mode Selection Cards */}
      <View style={styles.modesContainer}>
        {/* Budget Mode Card */}
        <TouchableOpacity
          style={[styles.modeCard, styles.budgetCard]}
          onPress={() => onNavigateTab('budget')}
          activeOpacity={0.85}
        >
          <View style={styles.modeIconCircle}>
            <Text style={styles.modeEmoji}>💰</Text>
          </View>
          <View style={styles.modeTextContainer}>
            <Text style={styles.modeTitle}>Budget Mode</Text>
            <Text style={styles.modeSubtitle}>Set ₱50–₱80 target allowance</Text>
            <View style={styles.modePillOrange}>
              <Text style={styles.modePillOrangeText}>Filter by Peso Range →</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Pantry Mode Card */}
        <TouchableOpacity
          style={[styles.modeCard, styles.pantryCard]}
          onPress={() => onNavigateTab('pantry')}
          activeOpacity={0.85}
        >
          <View style={styles.modeIconCircleGreen}>
            <Text style={styles.modeEmoji}>🧺</Text>
          </View>
          <View style={styles.modeTextContainer}>
            <Text style={styles.modeTitle}>Pantry Mode</Text>
            <Text style={styles.modeSubtitle}>Cook what you already have</Text>
            <View style={styles.modePillGreen}>
              <Text style={styles.modePillGreenText}>Check Ingredients →</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Random "Ano Ulam?" Generator Button */}
      <TouchableOpacity
        style={styles.randomBanner}
        onPress={handleRandomPick}
        activeOpacity={0.85}
      >
        <View style={styles.randomLeft}>
          <Text style={styles.randomEmoji}>🎲</Text>
          <View>
            <Text style={styles.randomTitle}>Hindi alam ang lulutuin?</Text>
            <Text style={styles.randomSub}>
              Tap for a random student budget recipe recommendation!
            </Text>
          </View>
        </View>
        <View style={styles.randomBtn}>
          <Text style={styles.randomBtnText}>Ano Ulam?</Text>
        </View>
      </TouchableOpacity>

      {/* Suggested Dish Popup Preview if selected */}
      {randomSuggestion && (
        <View style={styles.suggestedBox}>
          <View style={styles.suggestedHeader}>
            <Text style={styles.suggestedBadge}>✨ Suggested for Today</Text>
            <TouchableOpacity onPress={() => setRandomSuggestion(null)}>
              <Text style={styles.suggestedClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.suggestedTitle}>
            {randomSuggestion.emoji} {randomSuggestion.title}
          </Text>
          <Text style={styles.suggestedCost}>
            Total ~₱{randomSuggestion.totalCost} (₱{randomSuggestion.costPerServing.toFixed(0)}/head) • {randomSuggestion.prepTime} mins
          </Text>
          <TouchableOpacity
            style={styles.suggestedViewBtn}
            onPress={() => {
              onSelectRecipe(randomSuggestion);
            }}
          >
            <Text style={styles.suggestedViewBtnText}>View Cooking Steps →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Filter Chips Horizontal Bar */}
      <View style={styles.filterSection}>
        <Text style={styles.sectionHeaderTitle}>Curated Filipino Student Dishes</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {FILTERS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setActiveFilter(f.id)}
              >
                <Text
                  style={[styles.filterChipText, active && styles.filterChipTextActive]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Recipe List */}
      <View style={styles.recipeListContainer}>
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Showing {filteredRecipes.length} budget recipes
          </Text>
        </View>

        {filteredRecipes.map((item) => (
          <RecipeCard
            key={item.id}
            recipe={item}
            onPress={onSelectRecipe}
          />
        ))}

        {filteredRecipes.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🍳</Text>
            <Text style={styles.emptyTitle}>No matching recipes found</Text>
            <Text style={styles.emptySub}>
              Try searching with different ingredients or reset filters.
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
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
  },
  clearSearchIcon: {
    fontSize: 14,
    color: '#94A3B8',
    paddingHorizontal: 4,
  },
  modesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 10,
  },
  modeCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
  },
  budgetCard: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FFEDD5',
  },
  pantryCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#DCFCE7',
  },
  modeIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  modeIconCircleGreen: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  modeEmoji: {
    fontSize: 18,
  },
  modeTextContainer: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  modeSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginVertical: 4,
  },
  modePillOrange: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  modePillOrangeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modePillGreen: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  modePillGreenText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  randomBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  randomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  randomEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  randomTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  randomSub: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 1,
  },
  randomBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  randomBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  suggestedBox: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
  },
  suggestedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  suggestedBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    textTransform: 'uppercase',
  },
  suggestedClose: {
    fontSize: 13,
    color: '#94A3B8',
    padding: 2,
  },
  suggestedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  suggestedCost: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
    marginBottom: 8,
  },
  suggestedViewBtn: {
    backgroundColor: '#FFFBEB',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  suggestedViewBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  filterSection: {
    marginTop: 16,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  filterChipActive: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  recipeListContainer: {
    marginTop: 10,
  },
  countRow: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  countText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
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
