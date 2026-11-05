import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { PANTRY_INGREDIENTS } from '../data/ingredients';

export const PantryScreen = ({
  userPantry,
  setUserPantry,
  onFindRecipes,
  onGoBack,
}) => {
  const [search, setSearch] = useState('');

  const toggleIngredient = (id) => {
    if (userPantry.includes(id)) {
      setUserPantry(userPantry.filter((item) => item !== id));
    } else {
      setUserPantry([...userPantry, id]);
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return PANTRY_INGREDIENTS;
    const q = search.toLowerCase();
    return PANTRY_INGREDIENTS.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onGoBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>What's in your pantry?</Text>
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>LutoTa</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ingredients (e.g. egg, garlic)..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearSearch}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Section Title & Subtitle */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select your ingredients</Text>
          <Text style={styles.sectionSubtitle}>
            Tap to select • <Text style={{ color: '#FF6B00', fontWeight: '700' }}>Orange = selected</Text>
          </Text>
        </View>

        {/* 2-Column Pill Chip Grid */}
        <View style={styles.pantryGrid}>
          {filtered.map((item) => {
            const isSelected = userPantry.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.ingredientPill,
                  isSelected && styles.ingredientPillSelected,
                ]}
                onPress={() => toggleIngredient(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.pillEmoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.pillName,
                    isSelected && styles.pillNameSelected,
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Helper presets */}
        <View style={styles.presetsBox}>
          <TouchableOpacity
            style={styles.presetLink}
            onPress={() => {
              const staples = ['rice', 'egg', 'garlic', 'onion', 'soy_sauce', 'vinegar', 'cooking_oil', 'salt'];
              setUserPantry(staples);
            }}
          >
            <Text style={styles.presetLinkText}>+ Select Common Dorm Staples</Text>
          </TouchableOpacity>
          {userPantry.length > 0 && (
            <TouchableOpacity
              style={styles.presetLink}
              onPress={() => setUserPantry([])}
            >
              <Text style={[styles.presetLinkText, { color: '#DC2626' }]}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Bottom spacing so content doesn't hide under button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Bottom Orange Button */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={[
            styles.findRecipesBtn,
            userPantry.length === 0 && styles.findRecipesBtnDisabled,
          ]}
          onPress={onFindRecipes}
          activeOpacity={0.85}
        >
          <Text style={styles.findRecipesBtnText}>
            Find Recipes ({userPantry.length} selected) →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#1C1917',
    fontWeight: '700',
  },
  topHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1917',
  },
  logoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  logoBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF6B00',
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1C1917',
    padding: 0,
  },
  clearSearch: {
    fontSize: 14,
    color: '#A8A29E',
    paddingHorizontal: 4,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1917',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#78716C',
    marginTop: 2,
  },
  pantryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  ingredientPill: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#E7E5E4',
  },
  ingredientPillSelected: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  pillEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  pillName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#44403C',
    flex: 1,
  },
  pillNameSelected: {
    color: '#FFFFFF',
  },
  presetsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    paddingHorizontal: 4,
  },
  presetLink: {
    paddingVertical: 4,
  },
  presetLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B00',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(250, 250, 249, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#E7E5E4',
  },
  findRecipesBtn: {
    backgroundColor: '#FF6B00',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  findRecipesBtnDisabled: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
  },
  findRecipesBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
