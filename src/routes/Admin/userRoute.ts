import {
  addUser,
  deleteUser,
  getPaginatedUsers,
  getUser,
  updateUser,
} from "../../controllers/userController";

//  import { SubUser } from "./Admin.SubUser";
import express from "express";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const user = express.Router();

user.get("/", isAuthenticated(), getPaginatedUsers);
user.get("/:user_id", isAuthenticated(), getUser);
user.post(
  "/",
  //  validateUser,
  isAuthenticated("Admin"),
  addUser
);
user
  .route("/:user_id")
  .delete(
    // validateDeleteUser,
    isAuthenticated("Admin"),
    deleteUser
  )
  .put(
    // validateUserUpdate,
    isAuthenticated("Admin"),
    updateUser
  );

export default user;
