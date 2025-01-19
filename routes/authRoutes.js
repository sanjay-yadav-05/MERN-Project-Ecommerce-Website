import express from 'express'
import { registerController, loginController,insertCart, testController, forgetPassword, resetPassword, verifyHint, updateProfile, updateAddress } from '../controllers/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/update-profile/:id',requireSignIn, updateProfile);
router.post('/update-address/:id',requireSignIn, updateAddress);
router.post('/login', loginController);
router.post('/forgot-password', forgetPassword);
router.post('/verify-hint', verifyHint);
router.post('/reset-password', resetPassword);
router.post('/store-cart/:id', insertCart);
router.get("/test", requireSignIn, isAdmin, testController);
router.post("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.post("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;