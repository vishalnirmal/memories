import mongoose from 'mongoose';

const unverifiedUserSchema = ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    }
});

const UnverifierUser = mongoose.model('UnverifiedUser', unverifiedUserSchema);

export default UnverifierUser;