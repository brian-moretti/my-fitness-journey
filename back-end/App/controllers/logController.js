import {
  generateJWTAccessToken,
  generateJWTRefreshToken,
} from "../../Core/utilities/authentication.js";
import { compareHash } from "../../Core/utilities/hashCreation.js";
import {
  deleteRefreshTokenDB,
  insertRefreshTokenDB,
} from "../../Core/utilities/tokenModel.js";
import UsersModel from "../models/usersModel.js";

const login_verify = async (req, res) => {
  try {
    const users = await UsersModel.getAll(req);
    const userToVerify = users.find((user) => {
      return (
        user.username === req.body.username && user.email === req.body.email
      );
    });
    if (!userToVerify) return res.status(400).json({ Error: "User not found" });
    const isMatch = await compareHash(req.body.password, userToVerify.password);
    if (!isMatch) return res.status(400).json({ Error: "Invalid password" });
    const access_token = await generateJWTAccessToken(userToVerify);
    const refresh_token = await generateJWTRefreshToken(userToVerify);
    await insertRefreshTokenDB("users", refresh_token, userToVerify.id);
    res
      .cookie("accessToken", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .cookie("refreshToken", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
    res.redirect(301, "/users");
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ Error: "Internal server error" });
  }
};

const login_page = async (req, res) => {
  res.json({
    Login: "Login page loaded. Please login with POST Method on Postman",
  });
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    if (refreshToken) await deleteRefreshTokenDB("users", refreshToken);
    req.headers["authorization"] ? "" : null;
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logout successfully completed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal error server" });
  }
};

export default { login_verify, login_page, logout };
