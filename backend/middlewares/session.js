import cookieSession from "cookie-session";

export default cookieSession({
  name: "session",
  keys: [process.env.COOKIE_SECRET],
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
