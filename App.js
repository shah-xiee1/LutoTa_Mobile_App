import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import { FavoritesProvider, useFavorites } from './src/context/FavoritesContext';
import { Header } from './src/components/Header';
import { HomeScreen } from './src/screens/HomeScreen';
import { BudgetScreen } from './src/screens/BudgetScreen';
import { PantryScreen } from './src/screens/PantryScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { AboutScreen } from './src/screens/AboutScreen';
import { RecipeDetailModal } from './src/components/RecipeDetailModal';
import { DormTipsModal } from './src/components/DormTipsModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'budget' | 'pantry' | 'favorites'
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [tipsVisible, setTipsVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  // Shared user pantry selection (e.g. ['egg', 'rice', 'garlic', 'onion'])
  const [userPantry, setUserPantry] = useState([
    'egg',
    'rice',
    'garlic',
    'onion',
    'soy_sauce',
  ]);

  const { favorites } = useFavorites();

  const handleOpenRecipe = (recipe, customPantry) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Main Top Header */}
      <Header
        onOpenTips={() => setTipsVisible(true)}
        onOpenAbout={() => setAboutVisible(true)}
      />

      {/* Main Screen Content */}
      <View style={styles.mainContent}>
        {activeTab === 'home' && (
          <HomeScreen
            onSelectRecipe={handleOpenRecipe}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'budget' && (
          <BudgetScreen onSelectRecipe={handleOpenRecipe} />
        )}
        {activeTab === 'pantry' && (
          <PantryScreen
            onSelectRecipe={handleOpenRecipe}
            userPantry={userPantry}
            setUserPantry={setUserPantry}
          />
        )}
        {activeTab === 'favorites' && (
          <FavoritesScreen
            onSelectRecipe={handleOpenRecipe}
            onExplore={() => setActiveTab('home')}
          />
        )}
      </View>

      {/* Bottom Navigation Tab Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          onPress={() => setActiveTab('home')}
          activeOpacity={0.8}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'home' && styles.navLabelActive,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'budget' && styles.navItemActive]}
          onPress={() => setActiveTab('budget')}
          activeOpacity={0.8}
        >
          <Text style={styles.navIcon}>💰</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'budget' && styles.navLabelActive,
            ]}
          >
            Budget Mode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'pantry' && styles.navItemActive]}
          onPress={() => setActiveTab('pantry')}
          activeOpacity={0.8}
        >
          <View style={styles.iconWithBadge}>
            <Text style={styles.navIcon}>🧺</Text>
            {userPantry.length > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{userPantry.length}</Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'pantry' && styles.navLabelActive,
            ]}
          >
            Pantry Mode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === 'favorites' && styles.navItemActive,
          ]}
          onPress={() => setActiveTab('favorites')}
          activeOpacity={0.8}
        >
          <View style={styles.iconWithBadge}>
            <Text style={styles.navIcon}>❤️</Text>
            {favorites.length > 0 && (
              <View style={styles.tabBadgeRed}>
                <Text style={styles.tabBadgeText}>{favorites.length}</Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'favorites' && styles.navLabelActive,
            ]}
          >
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        visible={!!selectedRecipe}
        recipe={selectedRecipe}
        onClose={handleCloseRecipe}
        userSelectedIngredients={userPantry}
      />

      {/* Dorm Cooking Tips Modal */}
      <DormTipsModal
        visible={tipsVisible}
        onClose={() => setTipsVisible(false)}
      />

      {/* About Project & Proponents Modal */}
      <Modal
        visible={aboutVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setAboutVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
          <View style={styles.aboutModalTop}>
            <Text style={styles.aboutModalTitle}>Project Details</Text>
            <TouchableOpacity
              style={styles.aboutCloseBtn}
              onPress={() => setAboutVisible(false)}
            >
              <Text style={styles.aboutCloseIcon}>✕</Text>
            </TouchableOpacity>
          </View>
          <AboutScreen onClose={() => setAboutVisible(false)} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <MainApp />
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    paddingBottom: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navItemActive: {
    transform: [{ scale: 1.05 }],
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  iconWithBadge: {
    position: 'relative',
    alignItems: 'center',
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#16A34A',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeRed: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#E11D48',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  navLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#EA580C',
    fontWeight: '700',
  },
  aboutModalTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  aboutModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  aboutCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutCloseIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
});
