/*
 * Licensed under MIT License
 */

/**
 * Event channel types
 */
export type InAppBrowserEventType = 'loadstart' | 'loadstop' | 'loaderror' | 'exit' | 'message' | 'customscheme' | 'beforeload' | 'download';

/**
 * InAppBrowser event object
 */
export interface IInAppBrowserEvent {
    /** The event name */
    type: InAppBrowserEventType;
    /** The URL that was loaded */
    url: string;
    /** The error code (only for loaderror) */
    code?: number;
    /** The error message (only for loaderror) */
    message?: string;
    /** The message data (only for message event) */
    data?: any;
}

/**
 * Inject details for executeScript and insertCSS
 */
export interface IInjectDetails {
    /** JavaScript or CSS code to inject */
    code?: string;
    /** Path to file to inject */
    file?: string;
}

/**
 * Download event data (Android only)
 */
export interface IDownloadEvent {
    /** Always "download" */
    type: 'download';
    /** The download URL */
    url: string;
    /** User agent of the webview */
    userAgent: string;
    /** Content-Disposition header value */
    contentDisposition: string;
    /** File size (0 if unknown) */
    contentLength: number;
    /** MIME type of the file */
    mimetype: string;
}

/**
 * InAppBrowser window options
 */
export interface IInAppBrowserOptions {
    /** Show location bar (yes/no) */
    location?: 'yes' | 'no';
    /** Create hidden browser (yes/no) */
    hidden?: 'yes' | 'no';
    /** Enable beforeload event (get/post/yes) */
    beforeload?: 'get' | 'post' | 'yes';
    /** Clear browser cookie cache (yes/no) */
    clearcache?: 'yes' | 'no';
    /** Clear session cookie cache (yes/no) */
    clearsessioncache?: 'yes' | 'no';
    /** Clear all local storage (yes/no) - iOS only */
    cleardata?: 'yes' | 'no';
    /** Close button caption */
    closebuttoncaption?: string;
    /** Close button color (hex) */
    closebuttoncolor?: string;
    /** Show footer with close button (yes/no) - Android only */
    footer?: 'yes' | 'no';
    /** Footer color (hex) - Android only */
    footercolor?: string;
    /** Use hardware back for navigation (yes/no) - Android only */
    hardwareback?: 'yes' | 'no';
    /** Hide navigation buttons (yes/no) */
    hidenavigationbuttons?: 'yes' | 'no';
    /** Hide URL bar (yes/no) - Android only */
    hideurlbar?: 'yes' | 'no';
    /** Navigation button color (hex) */
    navigationbuttoncolor?: string;
    /** Toolbar color (hex) */
    toolbarcolor?: string;
    /** Swap navigation and close button positions (yes/no) */
    lefttoright?: 'yes' | 'no';
    /** Show zoom controls (yes/no) - Android only */
    zoom?: 'yes' | 'no';
    /** Require user action for media playback (yes/no) */
    mediaPlaybackRequiresUserAction?: 'yes' | 'no';
    /** Pause on app suspend (yes/no) - Android only */
    shouldPauseOnSuspend?: 'yes' | 'no';
    /** Use wide viewport (yes/no) - Android only */
    useWideViewPort?: 'yes' | 'no';
    /** Display fullscreen (yes/no) - Android only */
    fullscreen?: 'yes' | 'no';
    /** Disable overscroll bounce (yes/no) - iOS only */
    disallowoverscroll?: 'yes' | 'no';
    /** Show toolbar (yes/no) - iOS only */
    toolbar?: 'yes' | 'no';
    /** Make toolbar translucent (yes/no) - iOS only */
    toolbartranslucent?: 'yes' | 'no';
    /** Enable viewport scaling (yes/no) - iOS only */
    enableViewportScale?: 'yes' | 'no';
    /** Allow inline media playback (yes/no) - iOS only */
    allowInlineMediaPlayback?: 'yes' | 'no';
    /** Presentation style - iOS only */
    presentationstyle?: 'pagesheet' | 'formsheet' | 'fullscreen';
    /** Transition style - iOS only */
    transitionstyle?: 'fliphorizontal' | 'crossdissolve' | 'coververtical';
    /** Toolbar position - iOS only */
    toolbarposition?: 'top' | 'bottom';
    /** Hide loading spinner (yes/no) - iOS only */
    hidespinner?: 'yes' | 'no';
}

/**
 * Event callbacks object
 */
export interface IInAppBrowserCallbacks {
    loadstart?: (event: IInAppBrowserEvent) => void;
    loadstop?: (event: IInAppBrowserEvent) => void;
    loaderror?: (event: IInAppBrowserEvent) => void;
    exit?: (event: IInAppBrowserEvent) => void;
    message?: (event: IInAppBrowserEvent) => void;
    customscheme?: (event: IInAppBrowserEvent) => void;
    beforeload?: (event: IInAppBrowserEvent, callback: (url: string) => void) => void;
    download?: (event: IDownloadEvent) => void;
}

/**
 * InAppBrowser window instance
 */
export interface IInAppBrowserInstance {
    /** Close the browser window */
    close(): void;
    /** Show the browser window */
    show(): void;
    /** Hide the browser window */
    hide(): void;
    /** Add an event listener */
    addEventListener(eventname: InAppBrowserEventType, callback: (event: IInAppBrowserEvent) => void): void;
    /** Remove an event listener */
    removeEventListener(eventname: InAppBrowserEventType, callback: (event: IInAppBrowserEvent) => void): void;
    /** Execute JavaScript code in the browser */
    executeScript(details: IInjectDetails, callback?: (result: any[]) => void): void;
    /** Insert CSS into the browser */
    insertCSS(details: IInjectDetails, callback?: () => void): void;
    /** Add download listener (Android only) */
    addDownloadListener(success: (event: IDownloadEvent) => void, error?: (err: any) => void): void;
}

/**
 * InAppBrowser Manager class for TypeScript usage
 */
export default class InAppBrowserManager {
    /**
     * Open a URL in the InAppBrowser
     * @param url - The URL to load
     * @param target - The target window (_self, _blank, _system)
     * @param options - Browser options string or object
     * @param callbacks - Event callbacks
     * @returns InAppBrowser instance
     */
    open(url: string, target?: '_self' | '_blank' | '_system' | string, options?: string, callbacks?: IInAppBrowserCallbacks): IInAppBrowserInstance;
}

/**
 * Global cordova declaration
 */
declare global {
    interface Window {
        InAppBrowserPlugin: {
            open(url: string, target?: string, options?: string, callbacks?: IInAppBrowserCallbacks): IInAppBrowserInstance;
        };
    }
}
