import Post from '../models/Post.js';
import {
    addImage,
    deleteImage
} from './image.js';

const generateQuery = (query) => {
    let whereClause = {};
    if (query.type === "title"){
        whereClause.title = {
            $regex: query.value,
            $options: "i"
        }
    }
    else if (query.type === "tags"){
        whereClause.tags = query.value
    }
    return whereClause;
}

export const getPosts = async (req, res) => {
    const query = generateQuery(req.query);
    try {
        const posts = await Post.find(query).populate('creator', 'name profilePicture').sort({
            createdAt: -1
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const createPost = async (req, res) => {
    const postData = req.body;
    try {
        const imageUrl = await addImage({
            data: postData.selectedFile.image
        });
        if (!imageUrl)
            return res.status(501).json({
                message: "Unable to create post right now. Please try again later"
            });
        const post = new Post({
            ...postData,
            selectedFile: {
                ...postData.selectedFile,
                image: imageUrl
            }
        });
        await post.save();
        const result = await Post.populate(post, [
            {
                path: 'creator',
                select: 'name profilePicture'
            }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const updatePost = async (req, res) => {
    const data = req.body;
    try {
        const post = await Post.findOneAndUpdate({
            _id: data._id
        }, data, {
            new: true
        });
        const result = await Post.populate(post, [
            {
                path: 'creator',
                select: 'name profilePicture'
            }
        ]);
        res.status(200).json(result);
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
        await deleteImage(id);
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
    const userId = req.userId;
    try {
        const post = await Post.findById(id);
        const index = post.likes.indexOf(userId);
        if (index === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(index, 1);
        }
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