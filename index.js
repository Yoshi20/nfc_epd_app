import { AppRegistry } from 'react-native';

// This import should fix the error: "Invariant Violation: Unsupported top level event type "onGestureHandlerStateChange" dispatched"
import 'react-native-gesture-handler';

import App from './src/App';
import { name as appName } from './src/app.json';

AppRegistry.registerComponent(appName, () => App);
