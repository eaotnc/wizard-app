# Insurance Application Wizard

Example React Native app for a 3-step insurance application. One React Hook Form instance owns the whole wizard. Zod schemas validate one step at a time, and Zustand stores the draft and the step the user is on.

## Requirements

- Node.js 18 or newer
- Xcode and CocoaPods for iOS
- Android Studio and an emulator, or a connected device, for Android

## Install

```sh
npm install
```

iOS also needs the native dependencies:

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

## Run

Start Metro:

```sh
npm start
```

In a second terminal:

```sh
npm run ios
```

or

```sh
npm run android
```

## Check

```sh
npm run typecheck
npm test
```
