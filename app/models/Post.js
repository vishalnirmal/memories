import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags: [String],
    selectedFile: {
        image: String,
        dimensions: {
            width: String,
            height: String
        }
    },
    likes: [mongoose.Schema.Types.ObjectId],
    createdAt: {
        type: Date,
        default: ()=> Date.now()
    }
});

export default mongoose.model('Post', postSchema);