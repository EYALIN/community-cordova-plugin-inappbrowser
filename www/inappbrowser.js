/*
 * Licensed under MIT License
 */

var PLUGIN_NAME = 'InAppBrowser';

var exec = require('cordova/exec');
var channel = require('cordova/channel');
var modulemapper = require('cordova/modulemapper');
var urlutil = require('cordova/urlutil');

/**
 * InAppBrowser instance constructor
 * @constructor
 */
function InAppBrowserInstance() {
    this.channels = {
        beforeload: channel.create('beforeload'),
        loadstart: channel.create('loadstart'),
        loadstop: channel.create('loadstop'),
        loaderror: channel.create('loaderror'),
        exit: channel.create('exit'),
        customscheme: channel.create('customscheme'),
        message: channel.create('message'),
        download: channel.create('download')
    };
}

InAppBrowserInstance.prototype = {
    _eventHandler: function(event) {
        if (event && event.type in this.channels) {
            if (event.type === 'beforeload') {
                this.channels[event.type].fire(event, this._loadAfterBeforeload);
            } else {
                this.channels[event.type].fire(event);
            }
        }
    },
    _loadAfterBeforeload: function(strUrl) {
        strUrl = urlutil.makeAbsolute(strUrl);
        exec(null, null, PLUGIN_NAME, 'loadAfterBeforeload', [strUrl]);
    },
    /**
     * Close the InAppBrowser window
     */
    close: function() {
        exec(null, null, PLUGIN_NAME, 'close', []);
    },
    /**
     * Show the InAppBrowser window
     */
    show: function() {
        exec(null, null, PLUGIN_NAME, 'show', []);
    },
    /**
     * Hide the InAppBrowser window
     */
    hide: function() {
        exec(null, null, PLUGIN_NAME, 'hide', []);
    },
    /**
     * Add an event listener
     * @param {string} eventname - The event name
     * @param {function} f - The callback function
     */
    addEventListener: function(eventname, f) {
        if (eventname in this.channels) {
            this.channels[eventname].subscribe(f);
        }
    },
    /**
     * Remove an event listener
     * @param {string} eventname - The event name
     * @param {function} f - The callback function
     */
    removeEventListener: function(eventname, f) {
        if (eventname in this.channels) {
            this.channels[eventname].unsubscribe(f);
        }
    },
    /**
     * Execute JavaScript code in the InAppBrowser window
     * @param {Object} injectDetails - Details with code or file property
     * @param {function} cb - Callback function
     */
    executeScript: function(injectDetails, cb) {
        if (injectDetails.code) {
            exec(cb, null, PLUGIN_NAME, 'injectScriptCode', [injectDetails.code, !!cb]);
        } else if (injectDetails.file) {
            exec(cb, null, PLUGIN_NAME, 'injectScriptFile', [injectDetails.file, !!cb]);
        } else {
            throw new Error('executeScript requires exactly one of code or file to be specified');
        }
    },
    /**
     * Insert CSS into the InAppBrowser window
     * @param {Object} injectDetails - Details with code or file property
     * @param {function} cb - Callback function
     */
    insertCSS: function(injectDetails, cb) {
        if (injectDetails.code) {
            exec(cb, null, PLUGIN_NAME, 'injectStyleCode', [injectDetails.code, !!cb]);
        } else if (injectDetails.file) {
            exec(cb, null, PLUGIN_NAME, 'injectStyleFile', [injectDetails.file, !!cb]);
        } else {
            throw new Error('insertCSS requires exactly one of code or file to be specified');
        }
    },
    /**
     * Add a download listener (Android only)
     * @param {function} success - Success callback
     * @param {function} error - Error callback
     */
    addDownloadListener: function(success, error) {
        exec(success, error, PLUGIN_NAME, 'downloadListener');
    }
};

/**
 * InAppBrowser Plugin
 */
var InAppBrowserPlugin = {
    /**
     * Open a URL in the InAppBrowser
     * @param {string} strUrl - The URL to load
     * @param {string} strWindowName - The target window (_self, _blank, _system)
     * @param {string} strWindowFeatures - Options string
     * @param {Object} callbacks - Event callbacks object
     * @returns {InAppBrowserInstance} The InAppBrowser instance
     */
    open: function(strUrl, strWindowName, strWindowFeatures, callbacks) {
        // Don't catch calls that write to existing frames (e.g. named iframes).
        if (window.frames && window.frames[strWindowName]) {
            var origOpenFunc = modulemapper.getOriginalSymbol(window, 'open');
            return origOpenFunc.apply(window, arguments);
        }

        strUrl = urlutil.makeAbsolute(strUrl);
        var iab = new InAppBrowserInstance();

        callbacks = callbacks || {};
        for (var callbackName in callbacks) {
            iab.addEventListener(callbackName, callbacks[callbackName]);
        }

        var cb = function(eventname) {
            iab._eventHandler(eventname);
        };

        strWindowFeatures = strWindowFeatures || '';

        exec(cb, cb, PLUGIN_NAME, 'open', [strUrl, strWindowName, strWindowFeatures]);
        return iab;
    }
};

module.exports = InAppBrowserPlugin;
