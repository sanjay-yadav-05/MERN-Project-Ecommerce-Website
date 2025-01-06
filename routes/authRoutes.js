import express from 'express'
import { registerController, loginController, testController, forgetPassword, resetPassword, verifyHint } from '../controllers/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgetPassword);
router.post('/verify-hint', verifyHint);
router.post('/reset-password', resetPassword);
router.get("/test", requireSignIn, isAdmin, testController);
router.post("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.post("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;