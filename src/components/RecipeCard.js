import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

export const RecipeCard = ({ recipe, onPress, matchInfo }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(recipe.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(recipe)}
      activeOpacity={0.85}
    >
      <View style={styles.cardContent}>
        {/* Top Header Row with Emoji Icon, Title, and Heart */}
        <View style={styles.headerRow}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{recipe.emoji || '🍲'}</Text>
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.title} numberOfLines={1}>
              {recipe.title}
            </Text>
            <Text style={styles.englishName} numberOfLines={1}>
              {recipe.englishName}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.favoriteBtn, favorited && styles.favoriteBtnActive]}
            onPress={() => toggleFavorite(recipe.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.heartIcon}>{favorited ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Pantry Match Banner (if viewing in pantry mode) */}
        {matchInfo && (
          <View
            style={[
              styles.matchBanner,
              matchInfo.matchPercent === 100
                ? styles.matchBannerFull
                : styles.matchBannerPartial,
            ]}
          >
            <Text style={styles.matchText}>
              {matchInfo.matchPercent === 100
                ? `✨ Complete Match! All ${matchInfo.totalCount} ingredients in your dorm!`
                : `⚡ You have ${matchInfo.matchedCount}/${matchInfo.totalCount} ingredients (${matchInfo.matchPercent}%)`}
            </Text>
            {matchInfo.missingCount > 0 && (
              <Text style={styles.missingCostText}>
                Need to buy: +₱{matchInfo.missingCost} for {matchInfo.missingCount} item(s)
              </Text>
            )}
          </View>
        )}

        {/* Pricing & Badges Row */}
        <View style={styles.badgesRow}>
          <View style={styles.costBadge}>
            <Text style={styles.costCurrency}>₱</Text>
            <Text style={styles.costNumber}>{recipe.totalCost}</Text>
            <Text style={styles.costLabel}> total</Text>
          </View>

          <View style={styles.perServingBadge}>
            <Text style={styles.perServingText}>
              ~₱{recipe.costPerServing.toFixed(0)} / head ({recipe.servings} servings)
            </Text>
          </View>
        </View>

        {/* Footer Meta Row: Time & Cookware */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>⏱️</Text>
            <Text style={styles.metaText}>{recipe.prepTime} mins</Text>
          </View>

          <View style={styles.dotSeparator} />

          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>🍳</Text>
            <Text style={styles.metaText} numberOfLines={1}>
              {recipe.cookware}
            </Text>
          </View>

          <View style={styles.dotSeparator} />

          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>🏷️</Text>
            <Text style={styles.metaText}>{recipe.category}</Text>
          </View>
        </View>

        {/* Dorm quick hack preview */}
        {recipe.dormTip ? (
          <View style={styles.tipSnippet}>
            <Text style={styles.tipSnippetText} numberOfLines={1}>
              💡 <Text style={{ fontWeight: '700' }}>Tip:</Text> {recipe.dormTip}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emojiContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  emoji: {
    fontSize: 22,
  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  englishName: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  favoriteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginLeft: 6,
  },
  favoriteBtnActive: {
    backgroundColor: '#FFE4E6',
    borderColor: '#FECDD3',
  },
  heartIcon: {
    fontSize: 16,
  },
  matchBanner: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  matchBannerFull: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  matchBannerPartial: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  matchText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  missingCostText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B45309',
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  costBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#EA580C',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
  },
  costCurrency: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  costNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  costLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFEDD5',
  },
  perServingBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  perServingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  tipSnippet: {
    marginTop: 8,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tipSnippetText: {
    fontSize: 11,
    color: '#475569',
  },
});

