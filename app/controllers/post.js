import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const createPost = async (req, res) => {
    const data = req.body;
    const post = new Post(data);
    try {
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const updatePost = async (req, res) => {
    const data = req.body;
    try {
        const post = await Post.findOneAndUpdate({ _id: data._id }, data, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.stauts(404).json({
            message: error.message
        });
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({
            message: "Done"
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const likePost = async (req, res) => {
    const id = req.params.id;
    const userId = req.body.id;
    try {
        const post = await Post.findById(id);
        const index = post.likes.indexOf(userId);
        if (index === -1){
            post.likes.push(userId);
        }
        else{
            post.likes.splice(index, 1);
        }
        // post.likeCount += 1;
        await post.save();
        res.status(200).json({
            message: "Done"
        });
    } catch (error) {
        res.staus(404).json({
            message: error.message
        });
    }
}