import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { RECIPES } from '../data/recipes';
import { useFavorites } from '../context/FavoritesContext';

export const HomeScreen = ({ onSelectRecipe, onNavigateTab }) => {
  const [search, setSearch] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();

  const recommended = RECIPES.slice(0, 4);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.potIconBox}>
            <Text style={styles.potIcon}>🍲</Text>
          </View>
          <Text style={styles.brandTitle}>LutoTa</Text>
        </View>
        <Text style={styles.brandTagline}>Budget meals for your dorm</Text>
      </View>

      {/* Greeting Banner */}
      <View style={styles.greetingBox}>
        <Text style={styles.greetingTitle}>Kumusta, Student! 👋</Text>
        <Text style={styles.greetingSub}>Ano ulam natin ngayon?</Text>
      </View>

      {/* Search Bar with Filter Icon */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a recipe..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => onNavigateTab('recipes', search)}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => onNavigateTab('budget')}
          activeOpacity={0.8}
        >
          <Text style={styles.filterBtnIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* 2 Main Hero Mode Cards matching Figma */}
      <View style={styles.heroModesRow}>
        {/* Left: Budget Mode (Orange) */}
        <TouchableOpacity
          style={styles.budgetCard}
          onPress={() => onNavigateTab('budget')}
          activeOpacity={0.85}
        >
          <View style={styles.budgetIconCircle}>
            <Text style={styles.budgetPesoIcon}>₱</Text>
          </View>
          <Text style={styles.budgetCardTitle}>Budget Mode</Text>
          <Text style={styles.budgetCardRange}>₱50–₱80</Text>
          <View style={styles.budgetCardPill}>
            <Text style={styles.budgetCardPillText}>Set your budget</Text>
          </View>
        </TouchableOpacity>

        {/* Right: Pantry Mode (Cream/Tan) */}
        <TouchableOpacity
          style={styles.pantryCard}
          onPress={() => onNavigateTab('pantry')}
          activeOpacity={0.85}
        >
          <View style={styles.pantryIconCircle}>
            <Text style={styles.pantryIcon}>🧺</Text>
          </View>
          <Text style={styles.pantryCardTitle}>Pantry Mode</Text>
          <Text style={styles.pantryCardSubtitle}>Cook by ingredients</Text>
          <View style={styles.pantryCardPill}>
            <Text style={styles.pantryCardPillText}>Select ingredients</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* "Ano Ulam?" Quick Generator */}
      <TouchableOpacity
        style={styles.randomBar}
        onPress={() => {
          const rand = RECIPES[Math.floor(Math.random() * RECIPES.length)];
          onSelectRecipe(rand);
        }}
        activeOpacity={0.85}
      >
        <Text style={styles.randomEmoji}>🎲</Text>
        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <Text style={styles.randomTitle}>Hindi makapag-decide?</Text>
          <Text style={styles.randomSub}>Tap for a random budget dorm ulam</Text>
        </View>
        <View style={styles.randomBtn}>
          <Text style={styles.randomBtnText}>Ano Ulam? →</Text>
        </View>
      </TouchableOpacity>

      {/* Recommended for You Today Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended for you today</Text>
        <TouchableOpacity onPress={() => onNavigateTab('recipes')}>
          <Text style={styles.seeAllText}>See all &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Recommended Recipe Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedScroll}
      >
        {recommended.map((recipe) => {
          const favorited = isFavorite(recipe.id);
          return (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeCard}
              onPress={() => onSelectRecipe(recipe)}
              activeOpacity={0.88}
            >
              <Image
                source={{ uri: recipe.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={[
                  styles.cardHeart,
                  favorited && styles.cardHeartActive,
                ]}
                onPress={() => toggleFavorite(recipe.id)}
              >
                <Text style={styles.cardHeartIcon}>{favorited ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>

              <View style={styles.cardBody}>
                <View style={styles.cardPriceRow}>
                  <Text style={styles.cardPrice}>₱{recipe.totalCost}</Text>
                  <Text style={styles.cardServing}>~₱{recipe.costPerServing}/p</Text>
                </View>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {recipe.title}
                </Text>
                <View style={styles.cardMetaRow}>
                  <Text style={styles.cardMetaText}>⏱️ {recipe.prepTime} mins</Text>
                  <Text style={styles.cardMetaDot}>•</Text>
                  <Text style={styles.cardMetaText}>🍳 {recipe.cookware}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom spacer */}
      <View style={{ height: 30 }} />
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
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  potIconBox: {
    marginRight: 6,
  },
  potIcon: {
    fontSize: 22,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF6B00',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 11,
    color: '#78716C',
    fontWeight: '500',
    marginTop: 1,
  },
  greetingBox: {
    marginTop: 8,
    marginBottom: 12,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1917',
  },
  greetingSub: {
    fontSize: 13,
    color: '#78716C',
    marginTop: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E7E5E4',
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
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBtnIcon: {
    fontSize: 16,
  },
  heroModesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  budgetCard: {
    flex: 1,
    backgroundColor: '#FF6B00',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  budgetIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  budgetPesoIcon: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FF6B00',
  },
  budgetCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  budgetCardRange: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFEDD5',
    marginVertical: 2,
  },
  budgetCardPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  budgetCardPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pantryCard: {
    flex: 1,
    backgroundColor: '#F5EBE1',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6D7C8',
  },
  pantryIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  pantryIcon: {
    fontSize: 18,
  },
  pantryCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#443A33',
  },
  pantryCardSubtitle: {
    fontSize: 11,
    color: '#78716C',
    marginVertical: 2,
  },
  pantryCardPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#D6C7B8',
  },
  pantryCardPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#57483E',
  },
  randomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  randomEmoji: {
    fontSize: 22,
  },
  randomTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  randomSub: {
    fontSize: 10,
    color: '#B45309',
  },
  randomBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  randomBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1917',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B00',
  },
  recommendedScroll: {
    gap: 12,
    paddingBottom: 4,
  },
  recipeCard: {
    width: 175,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 110,
    backgroundColor: '#F5F5F4',
  },
  cardHeart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeartActive: {
    backgroundColor: '#FFFFFF',
  },
  cardHeartIcon: {
    fontSize: 14,
  },
  cardBody: {
    padding: 10,
  },
  cardPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 2,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FF6B00',
  },
  cardServing: {
    fontSize: 10,
    color: '#78716C',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1917',
    marginBottom: 4,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardMetaText: {
    fontSize: 10,
    color: '#78716C',
    fontWeight: '500',
  },
  cardMetaDot: {
    marginHorizontal: 4,
    color: '#A8A29E',
    fontSize: 8,
  },
});
