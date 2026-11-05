import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

export const RecipeDetailModal = ({
  visible,
  recipe,
  onClose,
  userSelectedIngredients = [],
}) => {
  if (!recipe) return null;

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(recipe.id);

  // Calculate missing vs owned ingredients
  const userIngredientSet = new Set(userSelectedIngredients);
  const totalCost = recipe.totalCost;
  const missingIngredients = recipe.ingredients.filter(
    (ing) => !userIngredientSet.has(ing.id)
  );
  const ownedIngredients = recipe.ingredients.filter((ing) =>
    userIngredientSet.has(ing.id)
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Top Navbar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.topBarTitle} numberOfLines={1}>
            {recipe.title}
          </Text>
          <TouchableOpacity
            style={[styles.favBtn, favorited && styles.favBtnActive]}
            onPress={() => toggleFavorite(recipe.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favIcon}>{favorited ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Hero */}
          <View style={styles.heroSection}>
            <View style={styles.emojiCircle}>
              <Text style={styles.heroEmoji}>{recipe.emoji || '🍲'}</Text>
            </View>
            <Text style={styles.dishTitle}>{recipe.title}</Text>
            <Text style={styles.dishEnglish}>{recipe.englishName}</Text>
            <Text style={styles.description}>{recipe.description}</Text>
          </View>

          {/* Quick Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, { backgroundColor: '#FFF7ED' }]}>
              <Text style={styles.metricLabel}>Total Cost</Text>
              <Text style={[styles.metricValue, { color: '#EA580C' }]}>
                ₱{totalCost}
              </Text>
              <Text style={styles.metricSub}>estimated</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#F0FDF4' }]}>
              <Text style={styles.metricLabel}>Per Serving</Text>
              <Text style={[styles.metricValue, { color: '#16A34A' }]}>
                ₱{recipe.costPerServing.toFixed(0)}
              </Text>
              <Text style={styles.metricSub}>{recipe.servings} servings</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#EFF6FF' }]}>
              <Text style={styles.metricLabel}>Prep Time</Text>
              <Text style={[styles.metricValue, { color: '#2563EB' }]}>
                {recipe.prepTime}m
              </Text>
              <Text style={styles.metricSub}>quick dorm cook</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#FAF5FF' }]}>
              <Text style={styles.metricLabel}>Cookware</Text>
              <Text
                style={[styles.metricValueSmall, { color: '#7E22CE' }]}
                numberOfLines={2}
              >
                {recipe.cookware}
              </Text>
            </View>
          </View>

          {/* Dorm Student Hack / Tip Banner */}
          {recipe.dormTip && (
            <View style={styles.dormTipBox}>
              <View style={styles.dormTipHeader}>
                <Text style={styles.dormTipIcon}>💡</Text>
                <Text style={styles.dormTipTitle}>Dorm Cooking Hack</Text>
              </View>
              <Text style={styles.dormTipText}>{recipe.dormTip}</Text>
            </View>
          )}

          {/* Pantry Status Notice if user has selected ingredients */}
          {userSelectedIngredients.length > 0 && (
            <View style={styles.pantrySummaryBox}>
              <Text style={styles.pantrySummaryTitle}>
                🧺 Your Dorm Pantry Status:
              </Text>
              <Text style={styles.pantrySummaryDetails}>
                You have {ownedIngredients.length} of {recipe.ingredients.length} items.
                {missingIngredients.length > 0 ? (
                  <Text style={{ color: '#B45309', fontWeight: '700' }}>
                    {' '}Need to buy {missingIngredients.length} item(s) for approx +₱
                    {missingIngredients.reduce((s, i) => s + (i.cost || 0), 0)}.
                  </Text>
                ) : (
                  <Text style={{ color: '#15803D', fontWeight: '700' }}>
                    {' '}You have everything ready to cook right now!
                  </Text>
                )}
              </Text>
            </View>
          )}

          {/* Ingredients Section with Estimated Sari-Sari Store / Market Prices */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🛒 Ingredients & Cost Breakdown</Text>
              <Text style={styles.sectionNote}>Local Palengke Prices</Text>
            </View>

            <View style={styles.ingredientList}>
              {recipe.ingredients.map((item, idx) => {
                const userHas = userIngredientSet.has(item.id);
                const showPantryTag = userSelectedIngredients.length > 0;

                return (
                  <View key={idx} style={styles.ingredientRow}>
                    <View style={styles.ingredientLeft}>
                      {showPantryTag && (
                        <Text style={styles.pantryCheck}>
                          {userHas ? '✅' : '🛒'}
                        </Text>
                      )}
                      <View style={{ flex: 1 }}>
                        <Text style={styles.ingredientName}>{item.name}</Text>
                        <Text style={styles.ingredientQty}>{item.quantity}</Text>
                      </View>
                    </View>
                    <View style={styles.ingredientCostBadge}>
                      <Text style={styles.ingredientCostText}>~₱{item.cost}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Estimated Total Expense:</Text>
              <Text style={styles.totalAmount}>₱{totalCost}</Text>
            </View>
          </View>

          {/* Step-by-Step Cooking Guide */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🍳 Step-by-Step Instructions</Text>
              <Text style={styles.sectionNote}>Tailored for 1-burner stoves</Text>
            </View>

            <View style={styles.instructionsList}>
              {recipe.instructions.map((step, idx) => (
                <View key={idx} style={styles.instructionStep}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Nutrition / Note Section */}
          {recipe.nutritionHighlights && (
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionTitle}>🥗 Nutrition Highlight</Text>
              <Text style={styles.nutritionText}>{recipe.nutritionHighlights}</Text>
            </View>
          )}

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  favBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnActive: {
    backgroundColor: '#FFE4E6',
  },
  favIcon: {
    fontSize: 16,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  emojiCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FED7AA',
    marginBottom: 12,
  },
  heroEmoji: {
    fontSize: 38,
  },
  dishTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  dishEnglish: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '800',
    marginVertical: 2,
  },
  metricValueSmall: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  metricSub: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '500',
  },
  dormTipBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  dormTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dormTipIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  dormTipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  dormTipText: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 18,
  },
  pantrySummaryBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  pantrySummaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 2,
  },
  pantrySummaryDetails: {
    fontSize: 12,
    color: '#1E3A8A',
    lineHeight: 17,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionNote: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  ingredientList: {
    gap: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  pantryCheck: {
    fontSize: 13,
    marginRight: 8,
  },
  ingredientName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  ingredientQty: {
    fontSize: 11,
    color: '#64748B',
  },
  ingredientCostBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ingredientCostText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  totalAmount: {
    fontSize: 17,
    fontWeight: '800',
    color: '#EA580C',
  },
  instructionsList: {
    gap: 12,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumberBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 13,
    color: '#334155',
    flex: 1,
    lineHeight: 20,
  },
  nutritionBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  nutritionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 2,
  },
  nutritionText: {
    fontSize: 12,
    color: '#64748B',
  },
});
