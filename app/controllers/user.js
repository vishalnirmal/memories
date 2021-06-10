import {config} from 'dotenv';
import User from '../models/User.js';
import UnverifiedUser from '../models/UnverifiedUser.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
config();

const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET);
}

const sendEmail = async (link, userEmail) => {
    var client = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: "apikey",
            pass: process.env.SENDGRID_API_KEY
        }
      });
    const email = {
        to: userEmail,
        from: process.env.MAIL_ADDRESS,
        subject: 'Verification of Memories Account.',
        text: 'Verify your Memories Account',
        html: '<h1>Verify Your Account</h1><br><br><h3>To verify your account, <a href='+link+'>Click here</a>.</h3>'
      }

    try {
        await client.sendMail(email);
        return true
    } catch (error) {
        return false;
    }
}

const generateLink = (id) => {
    const token = generateToken({
        _id: id
    });
    return `http://localhost:3000/${token}/verify`;
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
        const newUser = new UnverifiedUser({
            firstName: data.firstName,
            lastName: data.lastName,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
            profilePicture: data.profilePicture
        });
        await newUser.save();
        // Sending email by creating a link with token
        const response = await sendEmail(generateLink(newUser._id), newUser.email);
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
        if (!user || user.password !== data.password){
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
    const token = req.params.token;
    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET);
        const unverifiedUser = await UnverifiedUser.findById(data._id);
        if (!unverifiedUser){
            return res.status(401).json({
                message: "The link is invalid."
            });
        }
        const newUser = new User({
            firstName: unverifiedUser.firstName,
            lastName: unverifiedUser.lastName,
            name: unverifiedUser.name,
            email: unverifiedUser.email,
            password: unverifiedUser.password,
            profilePicture: unverifiedUser.profilePicture
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