import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { RECIPES } from '../data/recipes';

export const FavoritesScreen = ({ onSelectRecipe, onExplore }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState('NEWEST');

  const favoriteRecipes = useMemo(() => {
    const set = new Set(favorites);
    let list = RECIPES.filter((r) => set.has(r.id));
    if (sortBy === 'PRICE_LOW') {
      list.sort((a, b) => a.totalCost - b.totalCost);
    }
    return list;
  }, [favorites, sortBy]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Orange Banner Header matching Figma Screen 05 */}
      <View style={styles.orangeHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>My Favorites</Text>
          <Text style={styles.headerSubtitle}>
            Your saved recipes for easy access
          </Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeIcon}>👨‍🍳</Text>
        </View>
      </View>

      {/* Subheader: Saved Count & Sort Selector */}
      <View style={styles.subHeaderRow}>
        <Text style={styles.savedCountText}>
          {favorites.length} saved {favorites.length === 1 ? 'recipe' : 'recipes'}
        </Text>
        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() =>
            setSortBy(sortBy === 'NEWEST' ? 'PRICE_LOW' : 'NEWEST')
          }
        >
          <Text style={styles.sortBtnText}>
            Sort by: {sortBy === 'NEWEST' ? 'Newest ▾' : 'Lowest ₱ ▾'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Favorites List */}
      {favoriteRecipes.length > 0 ? (
        <View style={styles.listContainer}>
          {favoriteRecipes.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recipeRow}
              onPress={() => onSelectRecipe(item)}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.thumbnail}
                resizeMode="cover"
              />

              <View style={styles.infoCol}>
                <Text style={styles.recipeTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.recipePrice}>₱{item.totalCost}</Text>
              </View>

              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => toggleFavorite(item.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.heartIcon}>❤️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        /* Empty State matching Figma screenshot */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyHeartCircle}>
            <Text style={styles.emptyHeartIcon}>🤍</Text>
          </View>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            Save recipes you love and they'll appear here!
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={onExplore}
            activeOpacity={0.85}
          >
            <Text style={styles.browseBtnText}>Browse Recipes</Text>
          </TouchableOpacity>
        </View>
      )}

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
    paddingBottom: 24,
  },
  orangeHeader: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#FFEDD5',
    marginTop: 2,
    fontWeight: '500',
  },
  headerBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadgeIcon: {
    fontSize: 22,
  },
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  savedCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716C',
  },
  sortBtn: {
    paddingVertical: 4,
  },
  sortBtnText: {
    fontSize: 12,
    color: '#FF6B00',
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 16,
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
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F5F5F4',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1917',
  },
  recipePrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FF6B00',
    marginTop: 4,
  },
  heartBtn: {
    padding: 8,
  },
  heartIcon: {
    fontSize: 18,
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  emptyHeartCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyHeartIcon: {
    fontSize: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1917',
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#78716C',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  browseBtn: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  browseBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
