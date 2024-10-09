import express from "express"
import { loginhandler,signUphandler,createUserhandler,loginUserhandler,getDashboardhandler,handleLogoutReq, authMiddleware} from "../controllers/adminregisterControllers.js";
const router = express.Router();




router.route("/login")
.get(loginhandler)// renders login page
.post(loginUserhandler)// logs in user which is already present in database


router.route("/signup")
.get(signUphandler)// renders the signup page
.post(createUserhandler)//signup creates the user

// router.route("/dashboard")//
// .get(getDashboardhandler)

router.get("/dashboard", authMiddleware, getDashboardhandler)


router.get("/logout",handleLogoutReq)







export default router;