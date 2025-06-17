import express from "express";
import { mailSender } from "../controllers/sendMail";

const router = express.Router()

router.route("/send").post(mailSender)

export default router