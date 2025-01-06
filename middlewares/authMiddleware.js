import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.jwt_key
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "unAuthorised Access",
            });
        }
        else{
            next();
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in middleware",
            error
        })
    }
}