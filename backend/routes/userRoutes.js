import express from "express";
import { authUser,RegisterUser,LoggoutUser,getUserProfile,UpdateUserProfile } from "../controllers/userControllers.js"
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router()

router.post ('/',RegisterUser)
router.post ('/auth',authUser)
router.post('/logout',LoggoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,UpdateUserProfile)
router.route('/profile').get(protect,getUserProfile).put(protect,UpdateUserProfile)


export default router;