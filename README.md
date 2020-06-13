# nfc_epd_app

## Dependencies
- [React native](http://reactnative.dev/docs/getting-started.html)
- [React native iOS/Android environment setup](http://reactnative.dev/docs/environment-setup)
- [Node](https://nodejs.org/en/)
- [Cocoapods (iOS only)](https://cocoapods.org/)

## Getting Started
```bash
  git clone https://github.com/Yoshi20/nfc_epd_app.git
  cd nfc_epd_app
  npm ci # or yarn install

  # iOS only
  cd ios
  pod repo update # only the first time
  pod install
```

### Run on Android

Make sure you completed the environment setup for Android.

```bash
  npx react-native run-android # run debug version on connected device
```

[Android Build Wiki](https://github.com/Yoshi20/nfc_epd_app/wiki/Android-Troubleshooting)

### Run on IOS

Make sure you have the package manager running in a terminal beforehand.

```bash
  npx react-native start # from within project directory
```

1. Open the `.xcworkspace` file in Xcode
2. Choose either a connected device or a simulated device.
3. Click on the Build Icon.

### Troubleshooting
Some problems (usually Metro/watchman/react-native-packager issues) can be solved like this.

1. Stop running Metro bundler
2. Uninstall App from device
3. Clean caches
```bash
  watchman watch-del-all && rm -rf $TMPDIR/react-native-packager-cache-* && rm -rf $TMPDIR/metro-bundler-cache-*
```

macOS: also clean the build in Xcode (Product > Clean build) before restarting

4. Restart
```bash
  npx react-native run-android -- --reset-cache
```

macOS: click on build again in Xcode

Reloading node_modules might help too
```bash
  rm -rf node_modules/ && npm ci
```

## Specs
### Design
![Rough design](https://github.com/Yoshi20/nfc_epd_app/blob/master/docs/Rough_design.pdf "Rough design")

### Screens
#### Home
The Home screen lists a variable number of ESignCards. The number of ESignCards can be changed by an user.
#### Vorlagen
The Vorlagen screen lists a static number of ESignCards. The number of ESignCards can not be changed by an user.
#### ESign
The ESign screen lists a variable number of ImageCards. The number of ImageCards can be changed by an user.
#### Image
...

### Components
#### ESignCard
The ESignCard consists of a name and can have multiple images. A click on an ESignCard navigates to the ESign screen.
- navigation
- route
- eSign
- originScreen
#### ImageCard
The ImageCard consists of a single image and some action icons. A click on the edit action icon navigates to the Image screen.
- navigation
- route
- image
- originScreen

### Objects
#### ESign
- id
- name
- images
#### Image
- id
- path

## Links
- https://www.waveshare.com/product/displays/e-paper/epaper-1/7.5inch-e-paper.htm
- http://www.marvinj.org/en/index.html
- https://fengyuanchen.github.io/cropperjs/
