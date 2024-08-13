import jwt from "jsonwebtoken";
import { getRefreshTokenDB } from "./tokenModel.js";

export async function generateJWTAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "10min" }); //! DA AUMENTARE
}

export async function generateJWTRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: "60min" }); //! DA AUMENTARE
}

export async function authenticateToken(req, res, next) {
  const headersAuth = req.headers["authorization"];
  const accessAuth = headersAuth && headersAuth.split(" ")[1];
  const cookieAccessToken = req.cookies["accessToken"];
  const accessToken = accessAuth || cookieAccessToken;
  if (!accessToken) return res.status(401).redirect("/login");
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) {
      console.error(err);
      return await regenerateJWTAccessToken(req, res, next);
    }
    req.user = user;
    next();
  });
}

export async function regenerateJWTAccessToken(req, res, next) {
  const cookieRefreshToken = req.cookies["refreshToken"];
  const [dbRefreshToken] = req.user
    ? await getRefreshTokenDB("users", req.user.id)
    : [null];
  const refreshToken = dbRefreshToken || cookieRefreshToken;
  if (!refreshToken) return res.status(401).redirect("/login");
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).redirect("/login");
    }
    const { iat, exp, ...User } = user;
    //user = Object.fromEntries(Object.entries(user).filter(([key]) => key !== "iat" && key !== "exp"));
    const accessToken = await generateJWTAccessToken(User);
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    req.user = user;
    next();
  });
}
