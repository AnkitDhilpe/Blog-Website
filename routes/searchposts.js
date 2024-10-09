import express from "express"
import {handlesearchPosts} from "../controllers/searchpostControllers.js"
const router = express.Router();

router.post("/",handlesearchPosts);

export default router