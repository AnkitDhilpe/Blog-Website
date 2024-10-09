import express from "express"
import { handelGetPostsById} from "../controllers/postsControllers.js";
// handelGetAllPosts 
const router = express.Router();



router.route("/:id")
.get(handelGetPostsById);


export default router