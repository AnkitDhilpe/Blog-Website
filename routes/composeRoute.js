import express from "express"
import { handleGetComposeReq,handlePostComposeReq,handleEditReq,handleGetEditPage,handleDeletePost } from "../controllers/composeControllers.js";
import { authMiddleware } from "../controllers/adminregisterControllers.js";
const router = express.Router();

router.route("/compose")
.get(authMiddleware,handleGetComposeReq)
.post(authMiddleware,handlePostComposeReq)

router.route("/edit-post/:id")
.get(authMiddleware,handleGetEditPage)
.post(authMiddleware,handleEditReq)

router.route("/delete-post/:id")
.delete(authMiddleware,handleDeletePost)

export default router   