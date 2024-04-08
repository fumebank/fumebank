export const getUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://fumebank.com"
    : "http://localhost:3000"
