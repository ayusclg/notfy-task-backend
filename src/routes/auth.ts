import express from "express";
import { getUser, userCreate,userLogin} from "../controllers/AuthConsumer";
import { verifyUser } from "../middlewares/auth";
import { upload } from "../middlewares/multer";

const router = express.Router()

router.route("/create").post(upload.single("avatar"),userCreate)
router.route("/login").post(userLogin)
router.route("/get").get(verifyUser,getUser)
export default router