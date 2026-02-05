/**
 * Sentry Error Tracking Configuration
 * 
 * To enable error tracking:
 * 1. Install Sentry: npm install @sentry/react @sentry/tracing
 * 2. Get a Sentry DSN from https://sentry.io
 * 3. Set VITE_SENTRY_DSN in .env file
 * 4. Uncomment the Sentry.init() call in main.tsx
 */

// Check if Sentry is available
const SENTRY_DSN = (import.meta as any).env?.VITE_SENTRY_DSN;
const ENVIRONMENT = (import.meta as any).env?.MODE || 'development';
const VERSION = '1.0.0';

/**
 * Initialize Sentry for error tracking
 * Call this in main.tsx before mounting React
 */
export function initSentry() {
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured. Error tracking is disabled.');
    return;
  }

  // Sentry initialization will happen here when installed
  console.log('Error tracking initialized with Sentry');
}

/**
 * Capture an error/exception
 */
export function captureException(error: Error | unknown, context?: Record<string, any>) {
  console.error('Error captured:', error, context);
  
  // Uncomment when Sentry is installed
  // if (window.Sentry) {
  //   window.Sentry.captureException(error, { contexts: { custom: context } });
  // }
}

/**
 * Capture a message
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  console.log(`[${level.toUpperCase()}] ${message}`);
  
  // Uncomment when Sentry is installed
  // if (window.Sentry) {
  //   window.Sentry.captureMessage(message, level);
  // }
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, data?: Record<string, any>, level: 'info' | 'warning' | 'error' = 'info') {
  console.log(`[BREADCRUMB] ${message}`, data);
  
  // Uncomment when Sentry is installed
  // if (window.Sentry) {
  //   window.Sentry.addBreadcrumb({
  //     category: 'app',
  //     message,
  //     data,
  //     level: level as any,
  //   });
  // }
}

/**
 * Set user context for error tracking
 */
export function setUserContext(userId: string, userData?: Record<string, any>) {
  addBreadcrumb(`User context set: ${userId}`, userData);
  
  // Uncomment when Sentry is installed
  // if (window.Sentry) {
  //   window.Sentry.setUser({
  //     id: userId,
  //     ...userData,
  //   });
  // }
}

/**
 * Clear user context
 */
export function clearUserContext() {
  // Uncomment when Sentry is installed
  // if (window.Sentry) {
  //   window.Sentry.setUser(null);
  // }
}

/**
 * Set environment-specific context
 */
export const sentryConfig = {
  dsn: SENTRY_DSN,
  environment: ENVIRONMENT,
  version: VERSION,
  tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0,
  integrations: [
    // Will be populated when Sentry is installed
  ],
};

export default {
  initSentry,
  captureException,
  captureMessage,
  addBreadcrumb,
  setUserContext,
  clearUserContext,
  sentryConfig,
};
