import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/userControllers.js";
import { isLoggedIn } from "../middlewares/authMiddleWare.js";

const userRouter = Router()

userRouter.route('/register').post(register)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(isLoggedIn,logout)
userRouter.route('/profile').get(isLoggedIn,getProfile)


export default userRouter
