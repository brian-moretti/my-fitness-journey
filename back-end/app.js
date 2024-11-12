import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import router from "./Core/Router.js";

const app = express();
app.use(
  "/back-end/Api/gif_exercises",
  express.static(path.join(process.cwd(), "Api/gif_exercises"))
);
app.use(
  cors({
    origin: ["http://localhost:4200", "https://my-fitness-journey.netlify.app"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json()).use(cookieParser()).use(router);
//app.use(express.urlencoded({ extended: false }));

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }
});
