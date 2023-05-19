import { Router } from "express";
import { getLogIn, getLogOut, getSignUp, getHome, getFailedLogIn, getFailedSignUp, postLogin, postSignup } from "../controllers/login.js";
import passport from "passport";

const loginRouter = new Router()

//Log-in and root
loginRouter.get('/', getLogIn)
loginRouter.get('/login', getLogIn)
loginRouter.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin', failureFlash: { type: 'error', message: 'Invalid username or password.' }}), postLogin)
loginRouter.get('/faillogin', getFailedLogIn)
//Sign-up
loginRouter.get('/signup', getSignUp)
loginRouter.post('/signup', passport.authenticate('signup', {failureRedirect:'/failsignup', failureFlash: { type: 'error', message: 'Invalid username or password.' }}), postSignup)
loginRouter.get('/failsignup', getFailedSignUp)
//Log-out
loginRouter.get('/logout', getLogOut)
//Home
loginRouter.get('/home', getHome)
// Twitter connection
loginRouter.get('/auth/twitter', passport.authenticate('twitter'))
loginRouter.get('/auth/twitter/callback', passport.authenticate('twitter', {
successRedirect: '/',
failureRedirect: '/faillogin'
}))

export default loginRouter