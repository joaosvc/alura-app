/**
 * The prefix for auth route
 * @type {string}
 */
export const AUTH_ROUTE_SIGNIN = "/signin";

/**
 * The prefix for auth route
 * @type {string}
 */
export const AUTH_ROUTE_SIGNUP = "/signup";

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to dashboard
 * @type {string[]}
 */
export const AUTH_ROUTES = [AUTH_ROUTE_SIGNIN, AUTH_ROUTE_SIGNUP];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const API_AUTH_PREFIX = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_REDIRECT = "/";
