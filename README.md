# Community Cordova InAppBrowser Plugin

A Cordova plugin that provides a web browser view that displays when calling `InAppBrowserPlugin.open()`. This allows you to show helpful articles, videos, and web resources inside of your app.

## Support This Plugin

I dedicate a considerable amount of my free time to developing and maintaining many Cordova plugins for the community ([See the list with all my maintained plugins][community_plugins]).

To help ensure this plugin is kept updated, new features are added and bugfixes are implemented quickly, please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance.

Please consider donating if you're using this plugin in an app that makes you money, or if you're asking for new features or priority bug fixes. Thank you!

[![Sponsor Me](https://img.shields.io/static/v1?label=Sponsor%20Me&style=for-the-badge&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/eyalin)

## Credits

This plugin is based on the [Apache Cordova InAppBrowser Plugin](https://github.com/apache/cordova-plugin-inappbrowser) by the Apache Software Foundation. We are grateful for their work and the contributions of all original plugin authors.

## Why This Plugin?

The original [Apache Cordova InAppBrowser Plugin](https://github.com/apache/cordova-plugin-inappbrowser) is no longer actively maintained. Many Cordova developers face issues with:

- Outdated dependencies and compatibility problems with newer Android/iOS versions
- Unresolved bugs and pull requests that have been pending for years
- Lack of TypeScript support for modern development workflows
- No direct way to use without Ionic Native wrappers

This **community-maintained** fork aims to:

- Provide regular updates and bug fixes
- Ensure compatibility with the latest Android and iOS versions
- Offer first-class TypeScript support out of the box
- Allow direct usage without requiring Ionic Native wrappers
- Maintain a consistent API across all community Cordova plugins

## Features

- Open URLs in an in-app browser window
- Open URLs in the system browser
- Execute JavaScript in the browser window
- Inject CSS into the browser window
- Listen to browser events (loadstart, loadstop, loaderror, exit, message)
- Download file detection (Android only)
- Customizable toolbar and navigation buttons
- TypeScript support with full type definitions
- No Ionic Native wrapper required

## Installation

```bash
cordova plugin add community-cordova-plugin-inappbrowser
```

Or from local path:

```bash
cordova plugin add /path/to/community-cordova-plugin-inappbrowser
```

## TypeScript Usage

```typescript
import InAppBrowserManager, { IInAppBrowserInstance, IInAppBrowserEvent } from 'community-cordova-plugin-inappbrowser';

// Open a URL in the InAppBrowser
const browser: IInAppBrowserInstance = window.InAppBrowserPlugin.open(
    'https://example.com',
    '_blank',
    'location=yes'
);

// Add event listeners
browser.addEventListener('loadstart', (event: IInAppBrowserEvent) => {
    console.log('Loading started:', event.url);
});

browser.addEventListener('loadstop', (event: IInAppBrowserEvent) => {
    console.log('Loading finished:', event.url);

    // Execute JavaScript
    browser.executeScript({ code: 'document.title' }, (result) => {
        console.log('Page title:', result[0]);
    });

    // Inject CSS
    browser.insertCSS({ code: 'body { background: #f0f0f0; }' });
});

browser.addEventListener('loaderror', (event: IInAppBrowserEvent) => {
    console.error('Load error:', event.message);
});

browser.addEventListener('exit', () => {
    console.log('Browser closed');
});

// Close the browser
browser.close();

// Show/hide the browser
browser.show();
browser.hide();
```

## JavaScript Usage

```javascript
// Open a URL in the InAppBrowser
var browser = InAppBrowserPlugin.open('https://example.com', '_blank', 'location=yes');

// Add event listeners
browser.addEventListener('loadstart', function(event) {
    console.log('Loading started: ' + event.url);
});

browser.addEventListener('loadstop', function(event) {
    console.log('Loading finished: ' + event.url);

    // Execute JavaScript
    browser.executeScript({ code: 'document.title' }, function(result) {
        console.log('Page title: ' + result[0]);
    });
});

// Close the browser
browser.close();
```

## API

### `InAppBrowserPlugin.open(url, target, options)`

Opens a URL in a new InAppBrowser instance, the current browser instance, or the system browser.

**Parameters:**

- `url` (string): The URL to load
- `target` (string): The target window
  - `_self`: Opens in the Cordova WebView if whitelisted, otherwise in InAppBrowser
  - `_blank`: Opens in the InAppBrowser
  - `_system`: Opens in the system browser
- `options` (string): Browser options (comma-separated key=value pairs)

**Returns:** InAppBrowser instance

### Browser Options

**All Platforms:**
- `location`: Show/hide location bar (`yes`/`no`)

**Android Only:**
- `hidden`: Create hidden browser (`yes`/`no`)
- `beforeload`: Enable beforeload event (`get`/`post`/`yes`)
- `clearcache`: Clear cookie cache (`yes`/`no`)
- `clearsessioncache`: Clear session cookies (`yes`/`no`)
- `closebuttoncaption`: Close button text
- `closebuttoncolor`: Close button color (hex)
- `footer`: Show footer with close button (`yes`/`no`)
- `footercolor`: Footer color (hex)
- `hardwareback`: Use hardware back button (`yes`/`no`)
- `hidenavigationbuttons`: Hide nav buttons (`yes`/`no`)
- `hideurlbar`: Hide URL bar (`yes`/`no`)
- `navigationbuttoncolor`: Nav button color (hex)
- `toolbarcolor`: Toolbar color (hex)
- `lefttoright`: Swap button positions (`yes`/`no`)
- `zoom`: Show zoom controls (`yes`/`no`)
- `mediaPlaybackRequiresUserAction`: Require user action for media (`yes`/`no`)
- `shouldPauseOnSuspend`: Pause on app suspend (`yes`/`no`)
- `useWideViewPort`: Enable wide viewport (`yes`/`no`)
- `fullscreen`: Display fullscreen (`yes`/`no`)

**iOS Only:**
- `hidden`: Create hidden browser (`yes`/`no`)
- `beforeload`: Enable beforeload event (`get`/`post`/`yes`)
- `clearcache`: Clear cookie cache (`yes`/`no`)
- `clearsessioncache`: Clear session cookies (`yes`/`no`)
- `cleardata`: Clear all local storage (`yes`/`no`)
- `closebuttoncolor`: Close button color (hex)
- `closebuttoncaption`: Close button text
- `disallowoverscroll`: Disable bounce effect (`yes`/`no`)
- `hidenavigationbuttons`: Hide nav buttons (`yes`/`no`)
- `navigationbuttoncolor`: Nav button color (hex)
- `toolbar`: Show/hide toolbar (`yes`/`no`)
- `toolbarcolor`: Toolbar color (hex)
- `toolbartranslucent`: Translucent toolbar (`yes`/`no`)
- `lefttoright`: Swap button positions (`yes`/`no`)
- `enableViewportScale`: Enable viewport scaling (`yes`/`no`)
- `mediaPlaybackRequiresUserAction`: Require user action for media (`yes`/`no`)
- `allowInlineMediaPlayback`: Allow inline media (`yes`/`no`)
- `presentationstyle`: Presentation style (`pagesheet`/`formsheet`/`fullscreen`)
- `transitionstyle`: Transition style (`fliphorizontal`/`crossdissolve`/`coververtical`)
- `toolbarposition`: Toolbar position (`top`/`bottom`)
- `hidespinner`: Hide loading spinner (`yes`/`no`)

### Instance Methods

#### `addEventListener(eventname, callback)`

Add a listener for browser events.

**Events:**
- `loadstart`: Fires when the browser starts loading a URL
- `loadstop`: Fires when the browser finishes loading a URL
- `loaderror`: Fires when the browser encounters an error
- `exit`: Fires when the browser window is closed
- `beforeload`: Fires before loading a URL (requires `beforeload` option)
- `message`: Fires when receiving a message from the page
- `download`: Fires when a download is triggered (Android only)

#### `removeEventListener(eventname, callback)`

Remove an event listener.

#### `close()`

Close the browser window.

#### `show()`

Show the browser window (if hidden).

#### `hide()`

Hide the browser window.

#### `executeScript(details, callback)`

Execute JavaScript code in the browser.

```javascript
browser.executeScript({ code: 'document.title' }, function(result) {
    console.log(result[0]);
});

// Or inject a file
browser.executeScript({ file: 'myscript.js' });
```

#### `insertCSS(details, callback)`

Inject CSS into the browser.

```javascript
browser.insertCSS({ code: 'body { background: red; }' });

// Or inject a file
browser.insertCSS({ file: 'mystyles.css' });
```

#### `addDownloadListener(success, error)` (Android only)

Listen for download events.

```javascript
browser.addDownloadListener(function(event) {
    console.log('Download URL:', event.url);
    console.log('MIME type:', event.mimetype);
    console.log('File size:', event.contentLength);
});
```

## Platform Support

- Android
- iOS
- Browser

## config.xml Preferences

**iOS:**
```xml
<preference name="InAppBrowserStatusBarStyle" value="lightcontent" />
```

Options: `lightcontent`, `darkcontent`, `default`

## Contributing

- Star this repository
- Open issue for feature requests
- [Sponsor this project](https://github.com/sponsors/eyalin)

## License

This project is [MIT licensed](LICENSE).

[community_plugins]: https://github.com/EYALIN?tab=repositories&q=community&type=&language=&sort=
