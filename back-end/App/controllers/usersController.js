import { createHashedPassword } from "../../Core/utilities/hashCreation.js";
import UsersModel from "../models/usersModel.js";

//? CHANGED LOGIC TO GET ACCESS ONLY TO YOUR USER ACCOUNT

const user_index = async (req, res) => {
  try {
    const result = await UsersModel.getAll(req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server errors" });
  }
};

const user_details = async (req, res) => {
  try {
    let result = await UsersModel.getUser(req.params.id);
    //! INSERIRE NEL MODEL
    [result] = result.filter((username) => username.id === req.user.id);
    result = {
      id: result.id,
      username: result.username,
      email: result.email,
      programs: {
        //! DOVREBBE ESSERE ARRAY
        name: result.name,
        date_start: result.date_start,
        date_end: result.date_end,
      },
    };
    if (!result) return res.status(404).json({ Error: "User not founded" });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal error server" });
  }
};

const user_create = async (req, res) => {
  try {
    const auth = await createHashedPassword(req.body.password);
    req.body = { ...req.body, password: auth };
    const result = await UsersModel.createUser(req.body);
    const newUser = { id: result.insertId, ...req.body };
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    if (error.message === "error body")
      return res.status(400).json("The body has an error, please check");
    return res.status(500).json("Internal errors server");
  }
};

const user_update = async (req, res) => {
  try {
    let user = await UsersModel.getUser(req.params.id);
    //! INSERIRE NEL MODEL
    [user] = user.filter((username) => username.id === req.user.id);
    if (!user) return res.status(404).json({ Error: "User not found" });
    const result = await UsersModel.updateUser(user, req.body);
    const updatedUser = { id: req.params.id, ...req.body };
    if (result.affectedRows >= 1) return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

const user_delete = async (req, res) => {
  try {
    let [deletedUser, result] = await UsersModel.deleteUser(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ Error: "User not founded" });
    if (result.affectedRows >= 1) return res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal error server" });
  }
};

export default {
  user_details,
  user_index,
  user_create,
  user_update,
  user_delete,
};
