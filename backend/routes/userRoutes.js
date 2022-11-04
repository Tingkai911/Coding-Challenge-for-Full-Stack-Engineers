import express from "express";
import {
    login,
    logout,
    getUserProfile,
    updateUserProfile,
    registerUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from "../controllers/userController.js";
import {protect, admin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(registerUser)
    .get(protect, admin, getUsers);
router
    .post("/login", login);
router
    .post("/logout", logout)
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser); // not working very well

export default router;
