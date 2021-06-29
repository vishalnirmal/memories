import {config} from 'dotenv';
import User from '../models/User.js';
import UnverifiedUser from '../models/UnverifiedUser.js';
import {addImage} from './image.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
config();

const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET);
}

const sendEmail = async (link, userEmail, type) => {
    var client = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: "apikey",
            pass: process.env.SENDGRID_API_KEY
        }
      });
    let email = {
        to: userEmail,
        from: process.env.MAIL_ADDRESS
    };
    if (type === "verify"){
        email.html = '<h1>Verify Your Account</h1><br><br><h3>To verify your account, <a href='+link+'>Click here</a>.</h3>';
        email.subject = 'Verification of Memories Account';
        email.text = 'Verify your Memories Account';
    }
    else if (type === "reset"){
        email.html = '<h1>Reset Password</h1><br><br><h3>To reset your password, <a href='+link+'>Click here</a>.</h3>';
        email.subject = 'Reset password of Memories Account';
        email.text = 'Reset your Memories Account password'
    }
    try {
        await client.sendMail(email);
        return true
    } catch (error) {
        return false;
    }
}

const generateLink = (id, type) => {
    const token = generateToken({
        _id: id
    });
    return `${process.env.APP_URL}/${token}/${type}`;
}

const generateHash = async (data) => {
    return await bcrypt.hash(data, 12);
}

const isHashMatching = async (data, hash) => {
    return await bcrypt.compare(data, hash);
}

export const registerUser = async (req, res) => {
    const data = req.body;
    try {
        const user = await User.findOne({
            email: data.email
        });
        const unverifiedUser = await UnverifiedUser.findOne({
            email: data.email
        });
        if (user || unverifiedUser){
            return res.status(404).json({
                message: "Email already registered"
            });
        }
        const hashedPassword = await generateHash(data.password);
        const newUser = new UnverifiedUser({
            firstName: data.firstName,
            lastName: data.lastName,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: hashedPassword,
            profilePicture: data.profilePicture || ""
        });
        await newUser.save();
        // Sending email by creating a link with token
        const response = await sendEmail(generateLink(newUser._id, 'verify'), newUser.email, 'verify');
        if (!response)
            return res.status(500).json({
                message: "Unable to send email, please try again later."
            });
        res.status(200).json({
            message: "Email sent succesfully"
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const loginUser = async (req, res) => {
    const data = req.body;
    try {
        const user = await User.findOne({
            email: data.email
        });
        const isPasswordMatching = await isHashMatching(data.password, user.password);
        if (!user || !isPasswordMatching){
            return res.status(401).json({
                message: "Incorrect credentials"
            });
        }
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            },
            token: generateToken({
                _id: user._id
            })
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const verifyUser = async (req, res) => {
    const token = req.body.token;
    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET);
        const unverifiedUser = await UnverifiedUser.findById(data._id);
        if (!unverifiedUser){
            return res.status(401).json({
                message: "The link is invalid."
            });
        }
        const imageUrl = await addImage({
            data: unverifiedUser.profilePicture
        });
        if (!imageUrl)
            return res.status(501).json({
                message: "Unable to create account right now. Please try again later"
            });
        const newUser = new User({
            firstName: unverifiedUser.firstName,
            lastName: unverifiedUser.lastName,
            name: unverifiedUser.name,
            email: unverifiedUser.email,
            password: unverifiedUser.password,
            profilePicture: imageUrl
        });
        await newUser.save();
        await UnverifiedUser.findByIdAndDelete(data._id);
        res.status(200).json({
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture
                },
                token: generateToken({
                    _id: newUser._id
                })
            });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const generatePasswordResetEmail = async (req, res) => {
    const data = req.body;
    const generateLink = (id) => {
        const token = generateToken({
            _id: id
        });
        return `${process.env.APP_URL}/accounts/password/reset/${token}`;
    }
    try {
        const user = await User.findOne({
            email: data.email
        });
        if (!user)
            return res.status(404).json({
                message: "No User found"
            });

        const response = await sendEmail(generateLink(user._id), user.email, 'reset');
        if (!response)
            return res.status(500).json({
                message: "Unable to send email, please try again later."
            });
        res.status(200).json({
            message: "Email sent succesfully"
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const resetPassword = async (req, res) => {
    const data = req.body;
    try {
        const payload = await jwt.verify(data.token, process.env.JWT_SECRET);
        const user = await User.findById(payload._id);
        if (!user)
            return res.status(401).json({
                message: "Invalid Token"
            });
        if (data.password !== data.confirmPassword)
            return res.status(401).json({
                message: "Password do not match"
            });
        const hashedPassword = await generateHash(data.password);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            message: "Password reset succesfull"
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}