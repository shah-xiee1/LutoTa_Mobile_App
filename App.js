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
import { HomeScreen } from './src/screens/HomeScreen';
import { PantryScreen } from './src/screens/PantryScreen';
import { RecipeListScreen } from './src/screens/RecipeListScreen';
import { BudgetScreen } from './src/screens/BudgetScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { AboutScreen } from './src/screens/AboutScreen';
import { RecipeDetailModal } from './src/components/RecipeDetailModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'pantry' | 'recipes' | 'favorites' | 'profile' | 'budget'
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  // User pantry state matching Figma prototype
  const [userPantry, setUserPantry] = useState([
    'rice',
    'egg',
    'garlic',
    'onion',
    'soy_sauce',
    'vinegar',
    'chicken',
    'cabbage',
    'cooking_oil',
  ]);

  const { favorites } = useFavorites();

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen View */}
      <View style={styles.mainContent}>
        {activeTab === 'home' && (
          <HomeScreen
            onSelectRecipe={handleOpenRecipe}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'pantry' && (
          <PantryScreen
            userPantry={userPantry}
            setUserPantry={setUserPantry}
            onFindRecipes={() => setActiveTab('recipes')}
            onGoBack={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'recipes' && (
          <RecipeListScreen
            onSelectRecipe={handleOpenRecipe}
            userPantry={userPantry}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetScreen onSelectRecipe={handleOpenRecipe} />
        )}

        {activeTab === 'favorites' && (
          <FavoritesScreen
            onSelectRecipe={handleOpenRecipe}
            onExplore={() => setActiveTab('recipes')}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen onOpenAbout={() => setAboutVisible(true)} />
        )}
      </View>

      {/* 5 Bottom Navigation Tabs matching Figma Screenshot:
          [Home] [Pantry] [Recipes] [Favorites] [Profile] */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
          activeOpacity={0.8}
        >
          <Text style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>
            🏠
          </Text>
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
          style={styles.navItem}
          onPress={() => setActiveTab('pantry')}
          activeOpacity={0.8}
        >
          <View style={styles.iconWithBadge}>
            <Text style={[styles.navIcon, activeTab === 'pantry' && styles.navIconActive]}>
              🧺
            </Text>
            {userPantry.length > 0 && (
              <View style={styles.tabDotBadge}>
                <Text style={styles.tabDotBadgeText}>{userPantry.length}</Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'pantry' && styles.navLabelActive,
            ]}
          >
            Pantry
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('recipes')}
          activeOpacity={0.8}
        >
          <Text style={[styles.navIcon, activeTab === 'recipes' && styles.navIconActive]}>
            📋
          </Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'recipes' && styles.navLabelActive,
            ]}
          >
            Recipes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('favorites')}
          activeOpacity={0.8}
        >
          <View style={styles.iconWithBadge}>
            <Text style={[styles.navIcon, activeTab === 'favorites' && styles.navIconActive]}>
              ❤️
            </Text>
            {favorites.length > 0 && (
              <View style={styles.tabDotBadgeRed}>
                <Text style={styles.tabDotBadgeText}>{favorites.length}</Text>
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

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
          activeOpacity={0.8}
        >
          <Text style={[styles.navIcon, activeTab === 'profile' && styles.navIconActive]}>
            👤
          </Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'profile' && styles.navLabelActive,
            ]}
          >
            Profile
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

      {/* About Project & Proponents Modal */}
      <Modal
        visible={aboutVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setAboutVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAF9' }}>
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
    backgroundColor: '#FAFAF9',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E7E5E4',
    paddingVertical: 6,
    paddingBottom: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 2,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  iconWithBadge: {
    position: 'relative',
    alignItems: 'center',
  },
  tabDotBadge: {
    position: 'absolute',
    top: -3,
    right: -8,
    backgroundColor: '#FF6B00',
    borderRadius: 7,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  tabDotBadgeRed: {
    position: 'absolute',
    top: -3,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 7,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  tabDotBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  navLabel: {
    fontSize: 10,
    color: '#78716C',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#FF6B00',
    fontWeight: '800',
  },
  aboutModalTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E5E4',
  },
  aboutModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1917',
  },
  aboutCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutCloseIcon: {
    fontSize: 14,
    fontWeight: '800',
    color: '#57534E',
  },
});
