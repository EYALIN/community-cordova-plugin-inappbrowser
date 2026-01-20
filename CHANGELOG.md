# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-01-20

### Breaking Changes
- Plugin renamed from `cordova-plugin-inappbrowser` to `community-cordova-plugin-inappbrowser`
- Android package changed from `org.apache.cordova.inappbrowser` to `com.community.cordova.inappbrowser`
- JavaScript global changed from `cordova.InAppBrowser` to `InAppBrowserPlugin`
- Minimum Cordova version: 9.0.0
- Minimum cordova-android version: 9.0.0
- Minimum cordova-ios version: 6.0.0

### Added
- Full TypeScript type definitions out of the box
- `InAppBrowserManager` class for TypeScript usage without Ionic Native wrapper
- Comprehensive interfaces:
  - `IInAppBrowserEvent` - Browser event object
  - `IInAppBrowserInstance` - Browser instance methods
  - `IInAppBrowserOptions` - All browser configuration options
  - `IInAppBrowserCallbacks` - Event callback definitions
  - `IInjectDetails` - Script/CSS injection details
  - `IDownloadEvent` - Download event data (Android)
- Direct plugin usage without requiring `@ionic-native/in-app-browser`
- MIT license for more permissive usage

### Changed
- Forked from [apache/cordova-plugin-inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser) v6.0.0
- Updated package structure to match community plugin conventions
- Modernized JavaScript wrapper with cleaner API
- Updated all source file license headers to MIT
- Repository moved to community maintenance at [EYALIN/community-cordova-plugin-inappbrowser](https://github.com/EYALIN/community-cordova-plugin-inappbrowser)

### Fixed
- Compatibility with latest Android SDK versions
- Compatibility with latest iOS SDK versions

### Migration from cordova-plugin-inappbrowser

1. Remove the old plugin:
   ```bash
   cordova plugin remove cordova-plugin-inappbrowser
   ```

2. Install the new plugin:
   ```bash
   cordova plugin add community-cordova-plugin-inappbrowser
   ```

3. Update your code:
   ```javascript
   // Old way
   cordova.InAppBrowser.open(url, target, options);

   // New way
   InAppBrowserPlugin.open(url, target, options);
   ```

4. For TypeScript users, you can now import types directly:
   ```typescript
   import { IInAppBrowserInstance, IInAppBrowserEvent } from 'community-cordova-plugin-inappbrowser';
   ```

### Credits
- Original plugin by Apache Software Foundation
- All original contributors to cordova-plugin-inappbrowser
