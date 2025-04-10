# NFT Marketplace Mobile App 🌟

A modern NFT Marketplace mobile application built with React Native, featuring a cross-platform mobile app and a landing page.

## 👨‍💻 Author

- **Name**: Amonov Otabek
- **Email**: otabekjon0302@gmail.com

## Project Overview

This repository contains a learning project focused on building a modern NFT Marketplace mobile app using React Native. The project includes:

- **Mobile App**: Cross-platform (iOS + Android) app for browsing NFTs
- **Landing Page**: A simple website showcasing the app
- **Purpose**: A crash course to master React Native basics through building a real-world NFT marketplace app

## 🎯 Learning Objectives

- React Native basics
- Mobile UI design
- Navigation between pages
- Using components and props
- Tailwind CSS for styling (via Tailwind setup for web landing page)

## 📁 Project Structure

```
nft-marketplace-showcase/
│
├── public/             # Public assets (images, icons) for the landing page
├── src/                # Source code for the landing page and possibly React Native app
│   ├── assets/         # Static assets (images, NFTs)
│   ├── components/     # Reusable components (e.g., NFTCard, Home, Details)
│   ├── constants/      # Dummy data (NFTs, etc.)
│   ├── screens/        # Main pages (HomeScreen, DetailsScreen)
│   └── App.js          # Main app entry for React Native
│
├── .gitignore          # Files to ignore by git
├── README.md           # Project description
├── package.json        # Project dependencies
├── package-lock.json   # Lock file for package versions
├── postcss.config.js   # Tailwind CSS PostCSS config
└── tailwind.config.js  # Tailwind CSS config
```

## 🛠️ Technologies Used

### Mobile App
- React Native
- Expo

### Web Landing Page
- React.js
- Tailwind CSS

### Styling
- Tailwind CSS
- React Native StyleSheet

### State Management
- React Hooks (useState, useEffect)
- Context API (if needed)

### Routing (web)
- Basic linking (no complex React Router setup)

## 📦 Main Libraries

- react-native: Main library for mobile app development
- expo: For running and building the app
- tailwindcss: For fast styling via utility classes (on the landing page)
- postcss: For processing TailwindCSS
- react-native-safe-area-context: For handling safe areas
- react-native-screens: For native navigation container

## 📈 Features

- **Home Page**: Display NFTs as cards in a scrollable list
- **NFT Details Page**: Show more info about selected NFT
- **Landing Page**: Simple website describing the app with animations/images
- **UI Components**: NFT Card, Header, Button, etc.
- **Responsive Design**: Works on both iOS and Android devices
- **Modern UI**: Clean and intuitive user interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher) and npm installed
- React Native CLI or Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)
- Git for version control

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/nft-marketplace.git
   cd nft-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

For the Mobile App (React Native):
```bash
npx expo start
```

Then choose your preferred method to run the app:
- Press 'i' for iOS simulator
- Press 'a' for Android emulator
- Scan QR code with Expo Go app on your physical device

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Note

This is a learning project focused on frontend development. It's not a full real blockchain NFT marketplace (no minting, smart contracts) — just frontend design to showcase an NFT app.

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Native Navigation](https://reactnavigation.org/docs/getting-started/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
