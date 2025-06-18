import express from 'express'
import { activateMailService, createWorkSchedule, getAllWork, updateStatus, updateWork } from '../controllers/Work'
import { verifyUser } from '../middlewares/auth'

const router = express.Router()

router.route("/create").post(verifyUser, createWorkSchedule)
router.route("/update/:id").put(verifyUser, updateWork)
router.route("/status/:id").patch(verifyUser, updateStatus)
router.route("/mail/:id").post(verifyUser, activateMailService)
router.route("/get").get(verifyUser,getAllWork)

export default router