/**
 * Normalizes error messages to user-friendly English text.
 * Maps common error types to clear, actionable messages.
 */

const ERROR_MESSAGES = {
  // Network errors
  'Failed to fetch': 'Unable to connect. Please check your internet connection.',
  'NetworkError': 'Unable to connect. Please check your internet connection.',
  'Network request failed': 'Unable to connect. Please check your internet connection.',

  // Timeout errors
  'timeout': 'Request timed out. Please try again.',
  'AbortError': 'Request was cancelled.',

  // Server errors
  'Internal Server Error': 'Something went wrong on our end. Please try again later.',
  '500': 'Something went wrong on our end. Please try again later.',
  '502': 'Service temporarily unavailable. Please try again later.',
  '503': 'Service temporarily unavailable. Please try again later.',
  '504': 'Request timed out. Please try again.',

  // Client errors
  '400': 'Invalid request. Please check your input.',
  '401': 'Please log in to continue.',
  '403': 'You do not have permission to perform this action.',
  '404': 'The requested content was not found.',

  // Configuration errors
  'ConfigurationError': 'API URL not configured. Please check your environment settings.',

  // API-specific errors
  'Failed to fetch posts': 'Unable to load posts. Please try again.',
  'Failed to create post': 'Unable to create post. Please try again.',
  'Failed to update post': 'Unable to update post. Please try again.',
  'Failed to delete post': 'Unable to delete post. Please try again.',
  'Post not found': 'This post no longer exists.',
};

/**
 * Normalizes an error to a user-friendly message.
 * @param {Error|string} error - The error to normalize
 * @returns {string} A user-friendly error message in English
 */
export function normalizeError(error) {
  // Handle null/undefined
  if (!error) {
    return 'An unexpected error occurred. Please try again.';
  }

  // Get the error message string
  const message = error instanceof Error ? error.message : String(error);
  const errorName = error instanceof Error ? error.name : '';

  // Check for ConfigurationError by name
  if (errorName === 'ConfigurationError') {
    return ERROR_MESSAGES['ConfigurationError'];
  }

  // Check for AbortError
  if (errorName === 'AbortError') {
    return ERROR_MESSAGES['AbortError'];
  }

  // Check for exact match in our error messages
  if (ERROR_MESSAGES[message]) {
    return ERROR_MESSAGES[message];
  }

  // Check for partial matches (case-insensitive)
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return ERROR_MESSAGES['Failed to fetch'];
  }

  if (lowerMessage.includes('timeout')) {
    return ERROR_MESSAGES['timeout'];
  }

  // If we have a custom message that looks user-friendly, use it
  // (starts with uppercase, doesn't contain technical jargon)
  const technicalPatterns = [
    /^[a-z]/,           // Starts with lowercase
    /undefined/i,       // Contains 'undefined'
    /null/i,           // Contains 'null'
    /\d{3}/,           // Contains HTTP status codes
    /error:/i,         // Contains 'error:'
    /exception/i,      // Contains 'exception'
    /stack/i,          // Contains 'stack'
  ];

  const isTechnical = technicalPatterns.some(pattern => pattern.test(message));

  if (!isTechnical && message.length > 0 && message.length < 200) {
    return message;
  }

  // Default fallback
  return 'Something went wrong. Please try again.';
}
