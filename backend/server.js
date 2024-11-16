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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
