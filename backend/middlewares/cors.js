import cors from "cors";

export default cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
});
