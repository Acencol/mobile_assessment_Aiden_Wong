# EcoRoute Mobile App
Aiden Wong

This repository contains the deliverable project for the EcoRoute Mobile App Test sample project for the Mobile App Developer Student Researcher position. The following project was tested on Expo Go.


## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- iOS Simulator (for Mac users) or Android Studio (for Android development)
- Expo Go app on your physical device

### Installation
1 - Clone the repository:
```bash
git clone [repository-url]
cd EcoRouteMobile
```

2 - Install dependencies:
```bash
npm install
```

3 - Start the development server:
```bash
npm start
```

4 - Run the app:
- Press `i` to run on iOS simulator
- Press `a` to run on Android emulator
- Scan the QR code with Expo Go on device

## Mock Data
The application uses a local mock data file located at `assets/routes.json`. The data is loaded directly from the assets folder, making the app completely self-contained without requiring a separate backend server.

## Design Decisions

The framework choice I chose for this project was React Native and Expo for my familiarity with React Native, allowing me to code the project using JavaScript and React. Furthermore, Expo is a helpful tool which makes the development of React Native more smooth. Furthermore, the applicability if React Native and Expo is very versatile, being able to code for both IOS and Android with one codebase, while also being easy to test on real devices in real time in a simple and effective manner.

Regarding the libraries and tools used, notable ones used in the project are:
- **@react-navigation/native**: For smooth screen transitions and navigation management
- **axios**: For reliable API calls and future real backend integration
- **react-native-maps**: For interactive map visualization
- **react-native-vector-icons**: For consistent and scalable iconography
- **expo-location**: For handling device location services


The project structure is as follows.
```
/
├── assets/          # Static assets and mock data
├── src/
│   ├── components/  # Reusable UI components
│   ├── screens/     # Main app screens
│   ├── services/    # API and data handling
│   ├── context/     # Global state management
│   └── navigation/  # Navigation configuration
└── App.js          # Root component
```

For the project's state management, it uses React's built in tools such as Context API and useState. Context API is used for global state management, while local state management for component-specific data is handled with useState.

In regards to the user experience via the visuals and user interface, a consistent white and blue colour scheme is used for the visuals. Loading states and error feedback is clear and concise, and information presented in the app is labelled. As per the assessment requirements, there is consistent spacing and typography, and touch targets are 48 × 48 dp.

## Next Steps 

The steps I believe would be taken from this point to transform the project into a production-grade app would be the use of real APIs, a deeper emphasis on security, changes to the performance and reliability and including more robust features. In order for the app to function as a real route planner with enviromnental stats, the app would first need to be functional with real location APIs and data instead of mock data. Next, management of API key and tokens would need to be implemented, with possible additions of an authentication system and data encryption. The project's performance and reliability with these additions would also need to be kept in mind, optimizing loading times and having performance analytics added. Lastly, more robust features could also be added to not only enhance user experience with the app, but also draw in new users, such as quality of life additions such as a  history of routes and a list of routes that are favourited, adding accessibility features like supporting multiple languages.

