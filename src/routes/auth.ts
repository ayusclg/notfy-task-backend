import express from "express";
import { getUser, userLogin } from "../controllers/AuthConsumer";
import { verifyUser } from "../middlewares/auth";

const router = express.Router()

router.route("/login").post(userLogin)
router.route("/get").get(verifyUser,getUser)
export default router