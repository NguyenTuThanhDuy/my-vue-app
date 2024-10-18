export const getCookie = (name: string) => {
  if (typeof document === "undefined") {
    // Server-side, cannot access cookies
    return null;
  }
  try {
    const value = document.cookie;
    const parts = value.split(`${encodeURIComponent(name)}=`) as Array<string>;
    if (parts.length === 2) {
      let element = parts.pop() ?? "";
      if (!element) {
        return null;
      }

      let cookieValue = element.split(";");

      if (cookieValue.length === 0) {
        return null;
      }

      let res = cookieValue.shift() ?? "";

      if (res.length === 0) {
        return null;
      }

      return decodeURIComponent(res);
    }
  } catch (e) {
    console.error("Error parsing cookie:", e);
  }
  return null;
};
