import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Share,
  Platform,
  StatusBar,
} from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

export const RecipeDetailModal = ({
  visible,
  recipe,
  onClose,
  userSelectedIngredients = [],
}) => {
  if (!recipe) return null;

  const { isFavorite, toggleFavorite } = useFavorites();
  const { recordMealCooked } = useAuth();
  const favorited = isFavorite(recipe.id);

  // Checked state for ingredients
  const [checkedItems, setCheckedItems] = useState({});
  const [cookingMode, setCookingMode] = useState(false);

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleToggleCooked = async () => {
    const nextMode = !cookingMode;
    setCookingMode(nextMode);
    if (nextMode && recordMealCooked) {
      await recordMealCooked();
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this budget student recipe on LutoTa: ${recipe.title} (Est. ₱${recipe.totalCost})!`,
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeContainer}>
        {/* Top Navbar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.navActionBtn}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.navActionIcon}>←</Text>
          </TouchableOpacity>

          <Text style={styles.topBarTitle} numberOfLines={1}>
            {recipe.title}
          </Text>

          <View style={styles.topRightActions}>
            <TouchableOpacity
              style={styles.navActionBtn}
              onPress={() => toggleFavorite(recipe.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.navActionIcon}>{favorited ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navActionBtn}
              onPress={handleShare}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.navActionIcon}>🔗</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Big Dish Photo */}
          <View style={styles.imageBannerBox}>
            <Image
              source={{ uri: recipe.image }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          {/* Title & English Subtitle */}
          <View style={styles.titleContainer}>
            <Text style={styles.dishTitle}>{recipe.title}</Text>
            <Text style={styles.dishEnglish}>{recipe.englishName}</Text>
          </View>

          {/* Badges Row matching Figma: ₱65 est. per serving • 25 mins • Easy • 1 pot */}
          <View style={styles.badgesRow}>
            <View style={styles.orangePriceBadge}>
              <Text style={styles.orangePriceText}>
                ₱{recipe.costPerServing.toFixed(0)} est. per serving
              </Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>⏱️ {recipe.prepTime} mins</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>✨ {recipe.difficulty}</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>🍳 {recipe.cookware}</Text>
            </View>
          </View>

          {/* Dorm Tip Box */}
          {recipe.dormTip ? (
            <View style={styles.tipBox}>
              <Text style={styles.tipTitle}>💡 Dorm Cooking Hack</Text>
              <Text style={styles.tipBody}>{recipe.dormTip}</Text>
            </View>
          ) : null}

          {/* Ingredients Section matching Figma (Scaled to you: 1p) */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Ingredients</Text>
              <Text style={styles.sectionSubHeading}>(Scaled to you: 1p)</Text>
            </View>

            <View style={styles.ingredientsList}>
              {recipe.ingredients.map((ing, idx) => {
                const checked = !!checkedItems[idx];
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.ingredientRow}
                    onPress={() => toggleCheck(idx)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkBox,
                        checked && styles.checkBoxChecked,
                      ]}
                    >
                      <Text style={styles.checkMark}>{checked ? '✓' : ''}</Text>
                    </View>

                    <Text
                      style={[
                        styles.ingredientNameText,
                        checked && styles.ingredientNameChecked,
                      ]}
                    >
                      {ing.name}{' '}
                      <Text style={styles.ingredientQtyText}>({ing.quantity})</Text>
                    </Text>

                    <Text style={styles.ingredientPriceText}>
                      ~ ₱{ing.cost}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.priceDisclaimer}>
              * Prices are estimated based on local/sari-sari market prices.
            </Text>
          </View>

          {/* Step-by-Step Section (Dorm-friendly - 1 pot) */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Step-by-step</Text>
              <Text style={styles.sectionSubHeading}>(Dorm-friendly - {recipe.cookware})</Text>
            </View>

            <View style={styles.stepsList}>
              {recipe.instructions.map((step, idx) => (
                <View key={idx} style={styles.stepItem}>
                  <View style={styles.stepNumCircle}>
                    <Text style={styles.stepNumText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.stepInstructionText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom spacer */}
          <View style={{ height: 90 }} />
        </ScrollView>

        {/* Floating Bottom Action Button matching Figma */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[
              styles.startCookingBtn,
              cookingMode && styles.startCookingBtnDone,
            ]}
            onPress={handleToggleCooked}
            activeOpacity={0.85}
          >
            <Text style={styles.startCookingBtnText}>
              {cookingMode ? '✅ Mark as Cooked!' : 'Start Cooking'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FAFAF9',
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
    borderBottomColor: '#E7E5E4',
  },
  navActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navActionIcon: {
    fontSize: 16,
    color: '#1C1917',
    fontWeight: '700',
  },
  topBarTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1917',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  imageBannerBox: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 190,
    backgroundColor: '#F5F5F4',
    marginBottom: 14,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginBottom: 10,
  },
  dishTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1C1917',
  },
  dishEnglish: {
    fontSize: 13,
    color: '#78716C',
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  orangePriceBadge: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  orangePriceText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
  },
  metaPill: {
    backgroundColor: '#F5F5F4',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  metaPillText: {
    fontSize: 11,
    color: '#44403C',
    fontWeight: '600',
  },
  tipBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9A3412',
    marginBottom: 2,
  },
  tipBody: {
    fontSize: 12,
    color: '#7C2D12',
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
    paddingBottom: 6,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1917',
  },
  sectionSubHeading: {
    fontSize: 11,
    color: '#78716C',
  },
  ingredientsList: {
    gap: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D6D3D1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkBoxChecked: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  ingredientNameText: {
    fontSize: 13,
    color: '#292524',
    fontWeight: '600',
    flex: 1,
  },
  ingredientNameChecked: {
    textDecorationLine: 'line-through',
    color: '#A8A29E',
  },
  ingredientQtyText: {
    color: '#78716C',
    fontWeight: '400',
    fontSize: 12,
  },
  ingredientPriceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B00',
  },
  priceDisclaimer: {
    fontSize: 10,
    color: '#A8A29E',
    marginTop: 10,
    fontStyle: 'italic',
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EA580C',
  },
  stepInstructionText: {
    fontSize: 13,
    color: '#334155',
    flex: 1,
    lineHeight: 19,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'android' ? 36 : 16,
    backgroundColor: 'rgba(250, 250, 249, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#E7E5E4',
  },
  startCookingBtn: {
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
  startCookingBtnDone: {
    backgroundColor: '#16A34A',
  },
  startCookingBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
