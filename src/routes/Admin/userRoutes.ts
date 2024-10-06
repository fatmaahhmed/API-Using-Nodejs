import {
  addUser,
  deleteUser,
  getPaginatedUsers,
  getUser,
  updateUser,
} from "../../controllers/admin/userController";

//  import { SubUser } from "./Admin.SubUser";
import express from "express";
import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const user = express.Router();

user.get("/", getPaginatedUsers);
user.get("/:user_id/subUser");

user.get("/:user_id", getUser);
user.post(
  "/",
  //  validateUser,
  verifyTokenWithOptionalRole("Admin"),
  addUser
);
user
  .route("/:user_id")
  .delete(
    // validateDeleteUser,
    verifyTokenWithOptionalRole("Admin"),
    deleteUser
  )
  .put(
    // validateUserUpdate,
    verifyTokenWithOptionalRole("Admin"),
    updateUser
  );

export default user;
