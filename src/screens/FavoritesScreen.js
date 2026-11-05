import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { RECIPES } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';

export const FavoritesScreen = ({ onSelectRecipe, onExplore }) => {
  const { favorites, clearAllFavorites } = useFavorites();
  const [search, setSearch] = useState('');

  const favoriteRecipes = useMemo(() => {
    const set = new Set(favorites);
    let list = RECIPES.filter((r) => set.has(r.id));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.englishName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [favorites, search]);

  const handleConfirmClear = () => {
    // Web safe confirm
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm('Clear all your saved favorite recipes?')) {
        clearAllFavorites();
      }
    } else {
      Alert.alert(
        'Clear Favorites',
        'Are you sure you want to remove all saved recipes?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear All',
            style: 'destructive',
            onPress: clearAllFavorites,
          },
        ]
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerIconBox}>
          <Text style={styles.bannerIcon}>❤️</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>My Saved Favorites</Text>
          <Text style={styles.bannerSubtitle}>
            Offline-ready recipes bookmarked on your device
          </Text>
        </View>
        {favorites.length > 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleConfirmClear}
          >
            <Text style={styles.clearBtnText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search within favorites if multiple */}
      {favorites.length > 3 && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search saved recipes..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      )}

      {/* List of saved recipes */}
      <View style={styles.listContainer}>
        {favoriteRecipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onPress={onSelectRecipe}
          />
        ))}

        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔖</Text>
            <Text style={styles.emptyTitle}>No Favorite Recipes Yet</Text>
            <Text style={styles.emptySub}>
              Whenever you find a budget dish you like, tap the heart icon to save it here for fast offline access.
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={onExplore}
            >
              <Text style={styles.exploreBtnText}>Browse Budget Recipes →</Text>
            </TouchableOpacity>
          </View>
        ) : favoriteRecipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No results in your favorites</Text>
            <Text style={styles.emptySub}>
              Try searching with another word.
            </Text>
          </View>
        ) : null}
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
    backgroundColor: '#FFF1F2',
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  bannerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE4E6',
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
    color: '#9F1239',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#BE123C',
    marginTop: 2,
  },
  clearBtn: {
    backgroundColor: '#FFE4E6',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9F1239',
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  listContainer: {
    marginTop: 12,
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 20,
    padding: 28,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyEmoji: {
    fontSize: 42,
    marginBottom: 10,
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
    marginTop: 6,
    lineHeight: 18,
  },
  exploreBtn: {
    marginTop: 16,
    backgroundColor: '#EA580C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  exploreBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
