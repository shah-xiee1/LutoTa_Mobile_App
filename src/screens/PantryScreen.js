import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ALL_INGREDIENTS, INGREDIENT_CATEGORIES } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';

export const PantryScreen = ({ onSelectRecipe, userPantry, setUserPantry }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showResultsOnly, setShowResultsOnly] = useState(false);

  // Common quick starter pack for dormers
  const DORM_STARTER_PACK = ['egg', 'rice', 'garlic', 'onion', 'soy_sauce'];

  const handleToggleIngredient = (id) => {
    if (userPantry.includes(id)) {
      setUserPantry(userPantry.filter((item) => item !== id));
    } else {
      setUserPantry([...userPantry, id]);
    }
  };

  const handleSelectStarterPack = () => {
    const combined = Array.from(new Set([...userPantry, ...DORM_STARTER_PACK]));
    setUserPantry(combined);
  };

  const handleClearPantry = () => {
    setUserPantry([]);
  };

  // Rank recipes by how many ingredients the student already has
  const rankedRecipes = useMemo(() => {
    if (userPantry.length === 0) return [];

    const pantrySet = new Set(userPantry);

    const scored = RECIPES.map((recipe) => {
      const totalCount = recipe.ingredients.length;
      const matched = recipe.ingredients.filter((ing) => pantrySet.has(ing.id));
      const missing = recipe.ingredients.filter((ing) => !pantrySet.has(ing.id));
      const matchedCount = matched.length;
      const missingCount = missing.length;
      const matchPercent = Math.round((matchedCount / totalCount) * 100);
      const missingCost = missing.reduce((sum, ing) => sum + (ing.cost || 0), 0);

      return {
        recipe,
        matchInfo: {
          matchedCount,
          totalCount,
          missingCount,
          matchPercent,
          missingCost,
          missingNames: missing.map((m) => m.name),
        },
      };
    });

    // Filter recipes that have at least 1 match, and sort by highest match percentage first
    return scored
      .filter((item) => item.matchInfo.matchedCount > 0)
      .sort((a, b) => {
        if (b.matchInfo.matchPercent !== a.matchInfo.matchPercent) {
          return b.matchInfo.matchPercent - a.matchInfo.matchPercent;
        }
        // If tied in %, sort by lowest missing cost
        return a.matchInfo.missingCost - b.matchInfo.missingCost;
      });
  }, [userPantry]);

  // Ingredients filtered by active category tab
  const displayedIngredients = useMemo(() => {
    if (activeCategory === 'ALL') return ALL_INGREDIENTS;
    return ALL_INGREDIENTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerIconBox}>
          <Text style={styles.bannerIcon}>🧺</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Pantry Mode (Anong Meron Ka?)</Text>
          <Text style={styles.bannerSubtitle}>
            Select the ingredients you already have in your dorm room
          </Text>
        </View>
      </View>

      {/* Pantry Status Action Bar */}
      <View style={styles.actionBar}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusCount}>{userPantry.length}</Text>
          <Text style={styles.statusText}>Ingredients Selected</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.quickAddBtn}
            onPress={handleSelectStarterPack}
          >
            <Text style={styles.quickAddBtnText}>+ Common Dorm Staples</Text>
          </TouchableOpacity>

          {userPantry.length > 0 && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={handleClearPantry}
            >
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Ingredients Category Filter Chips */}
      <View style={styles.categorySection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          <TouchableOpacity
            style={[
              styles.catChip,
              activeCategory === 'ALL' && styles.catChipActive,
            ]}
            onPress={() => setActiveCategory('ALL')}
          >
            <Text
              style={[
                styles.catChipText,
                activeCategory === 'ALL' && styles.catChipTextActive,
              ]}
            >
              All Items ({ALL_INGREDIENTS.length})
            </Text>
          </TouchableOpacity>

          {INGREDIENT_CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catChip, active && styles.catChipActive]}
                onPress={() => setActiveCategory(cat.id)}
              >
                <Text
                  style={[
                    styles.catChipText,
                    active && styles.catChipTextActive,
                  ]}
                >
                  {cat.icon} {cat.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Interactive Ingredient Grid */}
      <View style={styles.gridSection}>
        <Text style={styles.gridHint}>
          Tap to add or remove what is currently in your room/fridge:
        </Text>
        <View style={styles.ingredientGrid}>
          {displayedIngredients.map((item) => {
            const isSelected = userPantry.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.ingItem,
                  isSelected && styles.ingItemSelected,
                ]}
                onPress={() => handleToggleIngredient(item.id)}
                activeOpacity={0.75}
              >
                <Text style={styles.ingEmoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.ingName,
                    isSelected && styles.ingNameSelected,
                  ]}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
                <View
                  style={[
                    styles.checkBadge,
                    isSelected && styles.checkBadgeSelected,
                  ]}
                >
                  <Text style={styles.checkText}>
                    {isSelected ? '✓' : '+'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Match Results Section */}
      <View style={styles.resultsSection}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            💡 Recipe Suggestions Based on Your Dorm Pantry
          </Text>
          <Text style={styles.resultsCount}>
            {userPantry.length === 0
              ? 'Select ingredients above to see matches'
              : `${rankedRecipes.length} suggested dishes`}
          </Text>
        </View>

        {userPantry.length === 0 ? (
          <View style={styles.emptyPantryBox}>
            <Text style={styles.emptyPantryEmoji}>🛒</Text>
            <Text style={styles.emptyPantryTitle}>No Ingredients Selected</Text>
            <Text style={styles.emptyPantrySub}>
              Tap ingredients you have (like egg, sardinas, rice, kangkong) or tap
              "+ Common Dorm Staples" to find matching recipes!
            </Text>
          </View>
        ) : rankedRecipes.length === 0 ? (
          <View style={styles.emptyPantryBox}>
            <Text style={styles.emptyPantryEmoji}>🔍</Text>
            <Text style={styles.emptyPantryTitle}>No Direct Recipe Matches</Text>
            <Text style={styles.emptyPantrySub}>
              Try adding staples like garlic, onion, egg, or canned goods to discover recipes.
            </Text>
          </View>
        ) : (
          rankedRecipes.map((item) => (
            <RecipeCard
              key={item.recipe.id}
              recipe={item.recipe}
              matchInfo={item.matchInfo}
              onPress={(rec) => onSelectRecipe(rec, userPantry)}
            />
          ))
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
    backgroundColor: '#F0FDF4',
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  bannerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
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
    color: '#166534',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#15803D',
    marginTop: 2,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusCount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16A34A',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickAddBtn: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  quickAddBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  clearBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  categorySection: {
    marginTop: 12,
  },
  catScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  catChipActive: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  catChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  catChipTextActive: {
    color: '#FFFFFF',
  },
  gridSection: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  gridHint: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  ingredientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingItem: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingItemSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  ingEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  ingName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  ingNameSelected: {
    color: '#166534',
    fontWeight: '700',
  },
  checkBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  checkBadgeSelected: {
    backgroundColor: '#16A34A',
  },
  checkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  resultsSection: {
    marginTop: 20,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  resultsCount: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  emptyPantryBox: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyPantryEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyPantryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  emptyPantrySub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});
