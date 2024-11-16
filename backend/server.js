import express from "express";

import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// load .env
import "dotenv/config";

// middlewares
import corsMiddleware from "./middlewares/cors.js";
// import sessionMiddleware from "./middlewares/session.js";
import bodyParserMiddleware from "./middlewares/bodyParser.js";

// routes
import authLoginRoute from "./routes/auth/login.js";
import authRegisterRoute from "./routes/auth/register.js";
import authLogoutRoute from "./routes/auth/logout.js";
import authUpdateRoute from "./routes/auth/update.js";
import authRemoveRoute from "./routes/auth/remove.js";
import authUserRoute from "./routes/auth/user.js";
import uploadRoute from "./routes/upload.js";
import assetRoute from "./routes/asset.js";
import reviewRoute from "./routes/review.js";
import averageReviewRoute from "./routes/averagereview.js";
import decideRoute from "./routes/decide.js";

const app = express();

// middlewares
app.use(corsMiddleware);
app.use(cookieParser());
app.use(bodyParserMiddleware);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    tempFileDir: "/public/tmp",
  })
);
app.use(express.static("public"));

// auth routes
app.post("/auth/login", authLoginRoute);
app.post("/auth/register", authRegisterRoute);
app.get("/auth/logout", authLogoutRoute);
app.put("/auth/update", authUpdateRoute);
app.delete("/auth/remove", authRemoveRoute);
app.get("/auth/user", authUserRoute);
// upload route
app.post("/upload", uploadRoute);
// get asset route
app.get("/asset", assetRoute);
// add review
app.post("/review", reviewRoute);
// get average review to decide
app.get("/average_review", averageReviewRoute);
// decide
app.post("/decide", decideRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
