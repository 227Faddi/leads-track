import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import methodOverride from "method-override";
import flash from "express-flash";
// CONFIG
import connectDB from "./config/database.js";
import passportConfig from "./config/passport.js";
// MIDDLEWARE
import overrideMiddleware from "./middleware/method-override.js";
// ROUTES
import homeRoutes from "./routes/home.js";
import dashboardRoutes from "./routes/dashboard.js";
import authRoutes from "./routes/auth.js";

dotenv.config({ path: "./config/.env" });

const app = express();
connectDB();

// Passport Config
passportConfig(passport);

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Static folder and view engine
const __dirname = import.meta.dirname;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/"));

// Method Override
app.use(overrideMiddleware.get);
app.use(flash());

// Routes
app.use("/", homeRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

// Vercel Deployment
export default app;
