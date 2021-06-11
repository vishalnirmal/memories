import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    creatorId: mongoose.Schema.Types.ObjectId,
    tags: [String],
    selectedFile: String,
    likes: [mongoose.Schema.Types.ObjectId],
    createdAt: {
        type: Date,
        default: ()=> Date.now()
    }
});

export default mongoose.model('Post', postSchema);