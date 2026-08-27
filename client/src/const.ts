export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Start the Manus OAuth login from an event handler. The backend owns the
// OAuth state cookie so this also works when the frontend is hosted on Vercel
// and the API is hosted on Render.
export const startLogin = () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
  const returnPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const startUrl = apiBaseUrl ? `${apiBaseUrl}/api/oauth/start` : "/api/oauth/start";
  const separator = startUrl.includes("?") ? "&" : "?";

  window.location.href = `${startUrl}${separator}returnPath=${encodeURIComponent(returnPath)}`;
};
