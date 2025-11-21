# 📱 UoM Course Finder - React Native Mobile App

A modern, feature-rich mobile application for browsing and managing university courses, built with React Native and Expo.

![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat&logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat&logo=redux)

## ✨ Key Features

### 🔐 Authentication
- ✅ User login with validation (Formik + Yup)
- ✅ Registration with email and password confirmation
- ✅ Integration with dummyjson.com API
- ✅ Persistent authentication state with Redux

### 📚 Course Management
- ✅ Browse 20+ curated courses with real images from Unsplash
- ✅ Search and filter functionality
- ✅ Course details with instructor info, ratings, and descriptions
- ✅ Category-based organization (Programming, Design, Business, Marketing)
- ✅ Pull-to-refresh support

### ❤️ Favourites System
- ✅ Save/unsave courses with one tap
- ✅ Persistent favourites storage with Redux Persist
- ✅ Quick access to saved courses
- ✅ Recently saved courses displayed on home screen
- ✅ Empty state with call-to-action

### 🎨 Modern UI/UX
- ✅ Premium modern design with gradients and glassmorphism effects
- ✅ Horizontal card layouts for better course visibility
- ✅ Category and rating badges
- ✅ Smooth animations and transitions
- ✅ Responsive layouts for all screen sizes
- ✅ Feather Icons throughout the app

### 🌗 Dark Mode
- ✅ Full dark mode support across all screens
- ✅ Theme toggle in profile settings
- ✅ Persistent theme preference
- ✅ Dynamic color system with comprehensive palette
- ✅ Smooth transitions between themes

### 👤 Profile Management
- ✅ User profile with statistics dashboard
- ✅ Profile image picker (camera/gallery) with expo-image-picker
- ✅ Dark mode toggle
- ✅ User information display (name, email, username)
- ✅ Logout functionality with confirmation

### 🧭 Navigation
- **4-Tab Bottom Navigation:**
  - 🏠 **Home** - Welcome screen with stats and quick actions
  - 📚 **Courses** - Browse all available courses
  - ❤️ **Favourites** - Your saved courses collection
  - 👤 **Profile** - Settings and user information
- Stack navigation for authentication flow
- Dynamic headers based on current theme

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile development |
| **Expo SDK 54** | Development platform and tools |
| **Redux Toolkit** | State management |
| **Redux Persist** | Persist Redux state to AsyncStorage |
| **React Navigation** | Stack and bottom tab navigation |
| **Formik** | Form handling and validation |
| **Yup** | Schema validation |
| **AsyncStorage** | Local data persistence |
| **Feather Icons** | Beautiful icon set |
| **expo-image-picker** | Profile image selection |
| **Unsplash API** | Course cover images |
| **dummyjson.com** | Authentication API |

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Steps

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd Mobile-Assignment
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npx expo start
```

4. **Run on your device:**
   - Open **Expo Go** app on your mobile device
   - Scan the QR code displayed in terminal
   - The app will load automatically

### Alternative: Run on Emulator
```bash
# Android
npx expo start --android

# iOS (Mac only)
npx expo start --ios
```

## 📱 Demo Credentials

For testing the app:
- **Username**: `emilys`
- **Password**: `emilyspass`

Other test users:
- `michaelw` / `michaelwpass`
- `sophiab` / `sophiabpass`

## 📂 Project Structure

```
Mobile-Assignment/
├── src/
│   ├── components/              # Reusable UI components
│   │   └── LoadingScreen.js    # Animated loading component
│   │
│   ├── context/                # React Context providers
│   │   └── ThemeContext.js     # Dark mode theme provider
│   │
│   ├── navigation/             # Navigation configuration
│   │   ├── AppNavigator.js     # Stack navigator (Auth/Main)
│   │   └── TabNavigator.js     # Bottom tabs (Home/Courses/Favourites/Profile)
│   │
│   ├── redux/                  # Redux store and slices
│   │   ├── store.js            # Redux store with persist config
│   │   ├── authSlice.js        # Authentication state
│   │   └── favouritesSlice.js  # Favourites management
│   │
│   ├── screens/                # Application screens
│   │   ├── LoginScreen.js      # Login with validation
│   │   ├── RegisterScreen.js   # User registration
│   │   ├── WelcomeScreen.js    # Home/Welcome screen
│   │   ├── CoursesScreen.js    # All courses catalog
│   │   ├── DetailsScreen.js    # Course details
│   │   ├── FavouritesScreen.js # Saved courses
│   │   └── ProfileScreen.js    # User profile & settings
│   │
│   └── utils/                  # Utility functions
│       ├── authApi.js          # Authentication API calls
│       ├── courseApi.js        # Course data and API
│       └── validation.js       # Formik validation schemas
│
├── App.js                      # App entry point with providers
├── package.json                # Dependencies
├── app.json                    # Expo configuration
└── README.md                   # This file
```

## 🎯 Feature Implementation Details

### 1. State Management (Redux)
```javascript
// Auth State
- user: { id, username, email, firstName, lastName }
- isAuthenticated: boolean
- token: string

// Favourites State
- favourites: Array<Course>
- Actions: addFavourite(), removeFavourite()
```

### 2. Theme System
```javascript
// Colors available in both light and dark modes
- background, card, surface
- primary, primaryLight
- text, textSecondary, textTertiary
- border, borderLight
- And more...
```

### 3. Form Validation
- **Login**: Username and password required
- **Register**: 
  - Username (3+ chars)
  - Email (valid format)
  - Password (6+ chars)
  - Confirm password (must match)

### 4. Course Data Structure
```javascript
{
  key: string,
  title: string,
  instructor: string,
  category: string,
  rating: number,
  students: number,
  duration: string,
  level: string,
  price: number,
  description: string,
  thumbnail: string,
  lastUpdated: string
}
```

## 🚀 Development

### Available Scripts
```bash
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run on web browser
npx expo start -c      # Clear cache and start
```

### Adding New Features

1. **Create a new screen:**
```javascript
// src/screens/NewScreen.js
import { useTheme } from '../context/ThemeContext';

const NewScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      {/* Your content */}
    </View>
  );
};
```

2. **Add to navigation:**
```javascript
// src/navigation/TabNavigator.js
<Tab.Screen name="New" component={NewScreen} />
```

3. **Connect to Redux:**
```javascript
import { useSelector, useDispatch } from 'react-redux';
const data = useSelector(state => state.sliceName);
```

## 📸 Screenshots

*(Screenshots will be added here)*

**Screens include:**
- Login/Register with validation
- Welcome screen with stats dashboard
- All courses with search
- Course details
- Favourites collection
- Profile with dark mode toggle

## 🐛 Troubleshooting

### Common Issues

**1. Metro bundler not starting:**
```bash
npx expo start -c
```

**2. Module not found errors:**
```bash
rm -rf node_modules
npm install
```

**3. Can't connect to Expo Go:**
- Ensure phone and computer are on same WiFi
- Try tunnel mode: `npx expo start --tunnel`

**4. Image picker not working:**
```bash
npm install expo-image-picker
```

## 🔄 Git Workflow

### Commit History
This project is organized with feature-based commits:

1. ✅ Initial project setup with Expo and dependencies
2. ✅ Redux store with auth and favourites slices
3. ✅ Theme context for dark mode support
4. ✅ Utility functions for validation and APIs
5. ✅ Authentication screens with validation
6. ✅ Course browsing and details screens
7. ✅ Favourites and profile management
8. ✅ Navigation structure implementation
9. ✅ App component with providers setup
10. ✅ Loading screen and components

### Pushing to GitHub

```bash
# Create repo on GitHub, then:
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## 📝 Assignment Requirements Checklist

- ✅ User authentication (login/register)
- ✅ Form validation with Yup
- ✅ React Navigation (Stack + Bottom Tabs)
- ✅ Redux Toolkit state management
- ✅ Redux Persist with AsyncStorage
- ✅ API integration (dummyjson.com)
- ✅ Favourites functionality
- ✅ Modern UI with Feather Icons
- ✅ Dark mode support
- ✅ Profile image picker
- ✅ Course search and filtering
- ✅ Pull-to-refresh functionality

## 👨‍💻 Author

**Your Name**
- University of Moratuwa
- Department: [Your Department]
- Year: 3rd Year, 1st Semester
- Course: Mobile Application Development

## 📄 License

This project is created for academic purposes.

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- React Native community for excellent documentation
- [dummyjson.com](https://dummyjson.com) for authentication API
- [Unsplash](https://unsplash.com) for beautiful course images
- Feather Icons for the icon set

---

**Made with ❤️ for University of Moratuwa**
