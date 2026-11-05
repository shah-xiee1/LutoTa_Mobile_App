# LutoTa: Budget-Friendly Filipino Recipes for Students

**Course:** BSIT (Bachelor of Science in Information Technology)  
**Instructor:** Jomar Llevado  
**Platform:** Cross-platform Mobile App (React Native + Expo Go)  
**Proponents:**
- **Moreno, Shahanna Mae** (Project Manager / Mobile Developer)
- **Go, Franz Clyde Rian S.** (UI/UX Designer / Documentation)
- **Pagtalunan, Harvey Lloyd D.** (Mobile Developer / Tester)

---

## 🍳 Project Overview

**LutoTa** is a cross-platform mobile application specifically designed for Filipino college students living in dormitories and boarding houses. It tackles the daily *"Ano ulam?"* problem under strict constraints:
- **Tight Allowance:** ₱50–₱80 per meal
- **Limited Cookware:** Single electric burner, induction cooker, or rice cooker
- **Leftover Food & Waste:** Unused canned goods and staples in small dorm spaces

---

## 🚀 Key Features Implemented

### 1. 💰 Budget Mode (₱50–₱80)
- Interactive budget selector with quick presets (₱40, ₱50, ₱60, ₱80, ₱100) and +/- ₱5 fine adjustments.
- Real-time estimated meal total cost and **per-serving cost breakdown** (~₱14–₱36/head).
- Filter by meal type: *Almusal*, *Tanghalian*, *Hapunan*, *Merienda*.
- Sort by lowest price or fastest cooking time.

### 2. 🧺 Pantry Mode (*"Anong Meron Ka?"*)
- Interactive multi-select checklist of common dorm ingredients grouped by category:
  - *Canned & Processed* (Sardines, Tuna, Corned Beef, Meat Loaf)
  - *Staples & Noodles* (Egg, Rice/Bahaw, Pancit Canton, Miswa, Odong, Macaroni, Tokwa, Monggo)
  - *Gulayan & Fresh* (Garlic, Onion, Tomato, Eggplant, Kangkong, Sayote, Pechay, Repolyo)
  - *Pampalasa & Sauces* (Toyo, Suka, Patis, Calamansi, Magic Sarap, Tomato Sauce)
- **Smart Pantry Match Algorithm:**
  - Sorts recipes by highest match percentage (e.g. 100% full match, 80%, etc.).
  - Calculates missing ingredients and estimated additional cost to purchase them at the local *sari-sari* store or *palengke*.

### 3. 🎲 "Ano Ulam?" Randomizer
- One-tap random meal generator for students who cannot decide what to cook.

### 4. 🍳 Single-Burner Step-by-Step Guides & Dorm Hacks
- Step-by-step cooking instructions specifically structured for single-burner or rice-cooker dorm setups.
- Built-in **Dorm Cooking Hacks** for each dish (e.g., using sardine oil instead of buying cooking oil, batch cooking, reusing cold bahaw).

### 5. ❤️ Save to Favorites (Offline Support)
- Persistent local bookmarks powered by `@react-native-async-storage/async-storage`.
- Accessible anytime without consuming mobile data.

### 6. 📋 Project & Proponents Info Screen
- Displays the full proposal background, problem statement, technical stack, and team roles.

---

## 📱 How to Run the App

### Requirements:
- Node.js (v18+)
- Expo Go app on your Android or iOS phone

### Commands:
```bash
# 1. Navigate to the project directory
cd lutota-app

# 2. Start the Expo development server
npx expo start
```

- **On Real Phone (Android / iOS):**
  1. Open the **Expo Go** app on your phone.
  2. Scan the QR code displayed in the terminal.
  3. The app will bundle and load directly on your phone!

- **On Web Browser (Optional):**
  Press `w` in the terminal to view in your web browser.

---

## 📊 System Usability Scale (SUS) Testing Guide

To achieve **Specific Objectives 4 & 5** from the project proposal (testing with 15–20 dormers using the System Usability Scale):

1. **Test Scenario:**
   - Ask student participants to find a meal under ₱50 in **Budget Mode**.
   - Ask participants to select 3 leftover items they have in **Pantry Mode** and observe recipe suggestions.
   - Ask participants to favorite 1 recipe and view the single-burner cooking steps.
2. **SUS 10-Question Standard Survey (1 = Strongly Disagree, 5 = Strongly Agree):**
   - Q1: I think that I would like to use LutoTa frequently.
   - Q2: I found LutoTa unnecessarily complex.
   - Q3: I thought LutoTa was easy to use.
   - Q4: I think that I would need the support of a technical person to be able to use LutoTa.
   - Q5: I found the various functions in LutoTa were well integrated.
   - Q6: I thought there was too much inconsistency in LutoTa.
   - Q7: I would imagine that most students would learn to use LutoTa very quickly.
   - Q8: I found LutoTa very cumbersome to use.
   - Q9: I felt very confident using LutoTa.
   - Q10: I needed to learn a lot of things before I could get going with LutoTa.
