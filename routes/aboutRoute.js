import express from "express";
const router = express.Router();

import { handleAboutGetreq } from "../controllers/aboutControllers.js";
import { handleGetComposeReq } from "../controllers/composeControllers.js";


const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";





// About page
// GET req
router.route("/")
.get(handleAboutGetreq);

router.route("/")
.get(handleGetComposeReq)




export default router;