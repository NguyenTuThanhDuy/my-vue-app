function useRoutes() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const buildQueryString = (params: Record<string, any>): string => {
    const query = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };

  // Define URLs as a const object to ensure type safety
  const URLs = {
    LOGIN_URL: () => `${baseUrl}/login`,
    SIGNUP_URL: () => `${baseUrl}/signup`,
    VIDEO_URL: (params: { limit?: number; offset?: number }) =>
      `${baseUrl}/videos${buildQueryString(params)}`,
    videoDetailUrl: (id: string) =>
      `${baseUrl}/videos/${encodeURIComponent(id)}`,
    searchVideosUrl: (params: { title?: string }) =>
      `${baseUrl}/videos${buildQueryString(params)}`,
    userProfileUrl: (userId: string) =>
      `${baseUrl}/users/${encodeURIComponent(userId)}`,
    // Add more routes as needed
  };

  return {
    URLs,
  };
}

export default useRoutes;
