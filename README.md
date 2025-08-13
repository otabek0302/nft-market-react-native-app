# NFT Marketplace Mobile App 🌟

A modern NFT Marketplace mobile application built with React Native and Expo, featuring OpenSea API integration for browsing NFT collections and individual NFTs.

## 👨‍💻 Author

- **Name**: Amonov Otabek
- **Email**: otabekjon0302@gmail.com

## Project Overview

This repository contains a modern NFT Marketplace mobile app built with React Native and Expo. The project demonstrates:

- **Mobile App**: Cross-platform (iOS + Android) app for browsing NFTs
- **OpenSea Integration**: Real-time NFT data from OpenSea API
- **Modern UI/UX**: Clean, responsive design with dark/light theme support
- **Performance**: Optimized components with proper memoization and pagination

## 🎯 Features

- **Collections Browser**: Browse NFT collections with sorting and pagination
- **Collection Details**: View detailed information about specific collections
- **NFT Gallery**: Browse NFTs within collections with load more functionality
- **Theme Support**: Dark and light mode with persistent preferences
- **Responsive Design**: Optimized for both iOS and Android devices
- **Real-time Data**: Live NFT data from OpenSea API

## 📁 Project Structure

```
nft-market-react-native-app/
│
├── app/                    # Expo Router app directory
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Home screen with username input
│   ├── collections/       # Collections screens
│   │   ├── index.tsx      # Collections list
│   │   └── collection/    # Individual collection
│   │       └── [id].tsx   # Collection details and NFTs
│   └── profile/           # Profile screens
│       └── [id].tsx       # User profile
│
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components
│   │   ├── button.tsx     # Button component
│   │   ├── text.tsx       # Text component
│   │   ├── input.tsx      # Input component
│   │   └── index.ts       # Component exports
│   └── sections/          # Feature-specific components
│       ├── header.tsx     # App header
│       ├── footer.tsx     # App footer
│       ├── collections/   # Collection components
│       │   └── collection-card.tsx
│       └── nfts/          # NFT components
│           └── nft-card.tsx
│
├── context/                # React Context providers
│   ├── theme-context.tsx  # Theme switching
│   ├── account-context.tsx # User account management
│   └── status-bar.tsx     # Status bar configuration
│
├── lib/                    # API and utilities
│   └── opensea.ts         # OpenSea API integration
│
├── constants/              # App constants
│   └── theme.tsx          # Theme definitions
│
├── utils/                  # Utility functions
│   └── fonts.ts           # Font loading utilities
│
├── assets/                 # Static assets
│   ├── images/            # App images
│   └── fonts/             # Custom fonts
│
├── package.json            # Dependencies
├── app.json               # Expo configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🛠️ Technologies Used

### Core Framework
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript

### UI & Styling
- **React Native StyleSheet**: Native styling
- **Custom Theme System**: Dark/light mode support
- **Expo Vector Icons**: Icon library

### State Management
- **React Hooks**: useState, useEffect, useContext
- **Context API**: Theme and account state management

### API Integration
- **OpenSea API**: NFT data source
- **Fetch API**: HTTP requests
- **AsyncStorage**: Local data persistence

### Navigation
- **Expo Router**: File-based routing
- **React Navigation**: Navigation components

## 📦 Key Dependencies

- `expo`: Development platform
- `react-native`: Core framework
- `@expo/vector-icons`: Icon library
- `@react-native-async-storage/async-storage`: Local storage
- `react-native-safe-area-context`: Safe area handling
- `react-native-reanimated`: Animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Studio (Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nft-market-react-native-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_OPENSEA_API_KEY=your_opensea_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 🔧 Configuration

### OpenSea API Key
To use the app, you'll need an OpenSea API key:
1. Visit [OpenSea API](https://docs.opensea.io/reference/api-overview)
2. Get your API key
3. Add it to your `.env` file

### Theme Configuration
The app supports both light and dark themes. Theme preferences are automatically saved and restored.

## 📱 App Screens

### Home Screen
- Username input for OpenSea account lookup
- Welcome message and app description

### Collections
- Browse NFT collections with sorting options
- Pagination support for large collections
- Search and filter functionality

### Collection Details
- Collection information and statistics
- Social media links
- NFT gallery with load more functionality

### NFT Cards
- Individual NFT display with metadata
- Image loading with placeholders
- Interactive elements (favorite, share, view on OpenSea)

## 🎨 Design System

### Colors
- **Primary**: #1B5FFE (Blue)
- **Background**: #FFFFFF (Light) / #000000 (Dark)
- **Text**: #1C1C1C (Light) / #FFFFFF (Dark)
- **Card**: #F5F5F5 (Light) / #1A1A1A (Dark)

### Typography
- **Title**: 24px, Bold
- **Subtitle**: 18px, Semi-bold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular

### Spacing
- **Container**: 20px
- **Section**: 16px
- **Component**: 12px
- **Element**: 8px

## 🚀 Performance Features

- **Component Memoization**: React.memo for performance optimization
- **Lazy Loading**: Images load on demand
- **Pagination**: Efficient data loading for large collections
- **Theme Optimization**: Styles computed once per theme change

## 🔒 Security

- API keys stored in environment variables
- No sensitive data in client-side code
- Secure API communication with OpenSea

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Email: otabekjon0302@gmail.com
- Create an issue in the repository

---

**Note**: This is a learning project demonstrating React Native development best practices. The app integrates with real OpenSea data for an authentic NFT marketplace experience.
