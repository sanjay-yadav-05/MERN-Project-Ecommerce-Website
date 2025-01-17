import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import Users from '../models/userModel.js'
import Jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, phone, email, password,setHint, hint, address } = req.body;
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!setHint) {
            return res.send({ message: 'Set hint is required' })
        }
        if (!hint) {
            return res.send({ message: 'Hint is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.send({
                success: false,
                message: 'User already exists'
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = new Users({ name, phone, email, password: hashedPassword,setHint,hint, address  });
        await user.save();

        const userForToken = await Users.findOne({ email });
        const token = await Jwt.sign({ _id: userForToken._id }, process.env.jwt_key, { expiresIn: '1d' });
        res.status(201).send({
            success: true,
            message: 'User created successfully',
            user: user,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            error
        })
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ message: 'Put valid email or password' })
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password'
            })
        }
        const token = await Jwt.sign({ _id: user._id }, process.env.jwt_key, { expiresIn: '1d' });
        res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}


export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ success: false, message: 'Provide a valid email' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        res.status(200).send({
            success: true,
            message: 'User found',
            setHint: user.setHint,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error fetching user', error });
    }
};

export const verifyHint = async (req, res) => {
    try {
        const { email, hint } = req.body;
        if (!hint) {
            return res.status(400).send({ success: false, message: 'Provide your answer' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        if (hint.toLowerCase() !== user.hint.toLowerCase()) {
            return res.status(401).send({ success: false, message: 'Invalid answer' });
        }

        res.status(200).send({ success: true, message: 'Answer is correct' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error verifying hint', error });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).send({ success: false, message: 'Provide your new password' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const hashedPassword = await hashPassword(newPassword);
        await Users.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).send({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error resetting password', error });
    }
};


export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};