import { getCookie } from "./getCookie";

// auth.js (or within a similar service file)
export function isAuthenticated() {
  // Check sessionStorage, localStorage, or cookies to verify if the user is logged in
  const user = getCookie("access_token");
  if (user) {
    // You can also add more specific checks here if needed
    return true;
  }
  return false;
}
