// import {
//   addUser,
//   deleteUser,
//   getPaginatedUsers,
//   getUser,
//   updateUser,
// } from "../../controllers/admin/userController";

// //  import { SubUser } from "./Admin.SubUser";
// import express from "express";
// import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";
// const User = express.Router();
// // User.use("/:User_id/sub/", SubUser);

// User.get("/:User_id/subUser");
// User.get("/", getPaginatedUsers);
// User.get("/:User_id", getUser);
// User.post("/", validateUser, verifyTokenWithOptionalRole("Admin"), addUser);
// User.route("/:User_id")
//   .delete(validateDeleteUser, verifyTokenWithOptionalRole("Admin"), deleteUser)
//   .put(validateUserUpdate, verifyTokenWithOptionalRole("Admin"), updateUser);

// export default User;
