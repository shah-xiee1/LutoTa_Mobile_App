import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RECIPES } from '../data/recipes';
import { useFavorites } from '../context/FavoritesContext';

export const RecipeListScreen = ({ onSelectRecipe, userPantry = [] }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const { isFavorite, toggleFavorite } = useFavorites();

  const FILTERS = [
    { id: 'ALL', label: 'All Meals' },
    { id: 'UNDER_60', label: 'Under ₱60' },
    { id: 'UNDER_30M', label: 'Under 30 mins' },
    { id: 'QUICK', label: 'Quick (≤15m)' },
    { id: 'EASY', label: 'Easy Cook' },
  ];

  const pantrySet = useMemo(() => new Set(userPantry), [userPantry]);

  // Compute pantry match score for each recipe
  const recipesWithScores = useMemo(() => {
    return RECIPES.map((recipe) => {
      const total = recipe.ingredients.length;
      const matched = recipe.ingredients.filter((ing) => pantrySet.has(ing.id)).length;
      return {
        ...recipe,
        matchedCount: matched,
        totalIngredients: total,
      };
    });
  }, [pantrySet]);

  const filteredRecipes = useMemo(() => {
    let list = [...recipesWithScores];

    if (activeFilter === 'UNDER_60') {
      list = list.filter((r) => r.totalCost <= 60);
    } else if (activeFilter === 'UNDER_30M') {
      list = list.filter((r) => r.prepTime <= 30);
    } else if (activeFilter === 'QUICK') {
      list = list.filter((r) => r.prepTime <= 15);
    } else if (activeFilter === 'EASY') {
      list = list.filter((r) => r.difficulty === 'Easy');
    }

    // Sort by highest pantry match first if ingredients selected
    if (userPantry.length > 0) {
      list.sort((a, b) => b.matchedCount - a.matchedCount);
    }

    return list;
  }, [recipesWithScores, activeFilter, userPantry]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand Header */}
      <View style={styles.topHeader}>
        <View style={styles.brandGroup}>
          <Text style={styles.potIcon}>🍲</Text>
          <Text style={styles.brandTitle}>LutoTa</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Title & Subtitle */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>Recipes you can cook</Text>
        <Text style={styles.subtitle}>
          {userPantry.length > 0
            ? 'best meals based on your pantry'
            : 'budget-friendly meals for students'}
        </Text>
      </View>

      {/* Filter Chips Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
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
                style={[
                  styles.filterChipText,
                  active && styles.filterChipTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Recipe Item Rows matching Figma */}
      <View style={styles.listContainer}>
        {filteredRecipes.map((item) => {
          const favorited = isFavorite(item.id);
          const hasPantryData = userPantry.length > 0;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.recipeRow}
              onPress={() => onSelectRecipe(item)}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.recipeThumbnail}
                resizeMode="cover"
              />

              <View style={styles.recipeInfo}>
                <View style={styles.namePriceRow}>
                  <Text style={styles.recipeName} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.recipePrice}>₱{item.totalCost}</Text>
                </View>

                <Text style={styles.recipeMeta} numberOfLines={1}>
                  {item.prepTime} min •{' '}
                  {hasPantryData
                    ? `Uses ${item.matchedCount}/${item.totalIngredients} pantry items`
                    : item.cookware}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => toggleFavorite(item.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.heartText}>{favorited ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Dorm Tip Bottom Banner matching Figma */}
      <View style={styles.dormTipNotice}>
        <Text style={styles.dormTipNoticeText}>
          💡 <Text style={{ fontWeight: '700' }}>Tip:</Text> Missing some spices or oil? Ask a dorm mate!
        </Text>
      </View>

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
    paddingTop: 12,
    paddingBottom: 24,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  potIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FF6B00',
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  bellIcon: {
    fontSize: 16,
  },
  titleSection: {
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1917',
  },
  subtitle: {
    fontSize: 12,
    color: '#78716C',
    marginTop: 2,
  },
  filterScroll: {
    gap: 8,
    paddingBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  filterChipActive: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#57534E',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    gap: 10,
  },
  recipeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  recipeThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F5F5F4',
    marginRight: 12,
  },
  recipeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  namePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1917',
    flex: 1,
  },
  recipePrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FF6B00',
    marginLeft: 6,
  },
  recipeMeta: {
    fontSize: 11,
    color: '#78716C',
    marginTop: 4,
  },
  heartBtn: {
    padding: 6,
  },
  heartText: {
    fontSize: 16,
  },
  dormTipNotice: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 12,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#FED7AA',
    alignItems: 'center',
  },
  dormTipNoticeText: {
    fontSize: 12,
    color: '#9A3412',
    textAlign: 'center',
  },
});

