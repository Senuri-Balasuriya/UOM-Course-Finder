# UoM Course Finder

A mobile app for browsing University of Moratuwa courses using React Native and Expo.

## Features

✅ User authentication with DummyJSON API  
✅ Browse courses from Open Library API  
✅ Search courses by keyword  
✅ View detailed course information  
✅ Add/remove courses to/from favourites  
✅ Persistent storage with Redux Persist and AsyncStorage  
✅ Clean and modern UI with Feather icons  
✅ Bottom tab navigation  
✅ User profile with statistics  

## Tech Stack

- **React Native** with Expo
- **React Navigation** (Stack + Bottom Tabs)
- **Redux Toolkit** for state management
- **Redux Persist** with AsyncStorage
- **Formik + Yup** for form validation
- **Axios** for API calls
- **Feather Icons** from @expo/vector-icons

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device

### Steps

1. **Navigate to the project directory:**
   ```bash
   cd "c:\New folder\3rd year 1st sem\Mobile-Assignment"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - Open the **Expo Go** app on your mobile device
   - Scan the QR code displayed in the terminal or browser
   - The app will load on your device

## Login Credentials

For testing, use these DummyJSON API credentials:

- **Username:** `emilys`
- **Password:** `emilyspass`

Other test users from DummyJSON:
- Username: `michaelw` / Password: `michaelwpass`
- Username: `sophiab` / Password: `sophiabpass`

## Project Structure

```
Mobile-Assignment/
├── App.js                      # Main entry point
├── package.json               
├── app.json                   # Expo configuration
├── babel.config.js            
└── src/
    ├── navigation/
    │   ├── AppNavigator.js    # Stack navigator (Auth/Main)
    │   └── TabNavigator.js    # Bottom tab navigator
    ├── screens/
    │   ├── LoginScreen.js     # Login with Formik validation
    │   ├── RegisterScreen.js  # Registration screen
    │   ├── HomeScreen.js      # Course list with search
    │   ├── DetailsScreen.js   # Course details
    │   ├── FavouritesScreen.js # Saved courses
    │   └── ProfileScreen.js   # User profile
    ├── redux/
    │   ├── store.js           # Redux store with persist
    │   ├── authSlice.js       # Auth state management
    │   └── favouritesSlice.js # Favourites management
    └── utils/
        ├── authApi.js         # DummyJSON auth API
        ├── courseApi.js       # Open Library API
        └── validation.js      # Yup schemas
```

## API Endpoints

### Authentication
- **POST** `https://dummyjson.com/auth/login`
  - Login with username and password
  - Returns user data and token

### Courses
- **GET** `https://openlibrary.org/search.json?q={query}`
  - Fetch books/courses by search query
  - Default query: "computer science"

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## Key Features Explained

### Authentication
- Login and registration screens with Formik validation
- User data stored in Redux with AsyncStorage persistence
- Protected routes based on authentication state

### Course Management
- Fetch courses from Open Library API
- Search functionality with custom queries
- Pull-to-refresh support
- Course cards with cover images

### Favourites
- Add/remove courses to favourites
- Redux state management
- Persistent storage across app restarts
- Empty state with call-to-action

### Profile
- Display user information
- Show statistics (favourites count)
- Logout functionality
- Clear favourites on logout

## Troubleshooting

### If you encounter issues:

1. **Clear cache and reinstall:**
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

2. **Reset Expo cache:**
   ```bash
   npx expo start -c
   ```

3. **Check Expo Go version:**
   - Make sure you have the latest version of Expo Go installed

4. **Network issues:**
   - Ensure your phone and computer are on the same network
   - Try using tunnel mode: `npx expo start --tunnel`

## Screenshots

The app includes:
- Login/Register screens with validation
- Home screen with course cards
- Search functionality
- Detailed course view
- Favourites management
- User profile

## Notes

- The registration is simulated (no real API endpoint)
- Course data comes from Open Library's education section
- All favourites are stored locally on the device
- Icons are from Feather icon set via @expo/vector-icons

## Author

University of Moratuwa - Mobile Application Development

## License

MIT
