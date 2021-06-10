import {Router} from 'express';
import { createPost, deletePost, getPosts, likePost, updatePost } from '../controllers/post.js';
import userAuth from '../middleware/userAuth.js';
const router = Router();

router.get("/", getPosts);
router.post("/", userAuth, createPost);
router.patch("/", userAuth, updatePost);
router.delete("/:id", userAuth, deletePost);
router.patch("/like/:id", userAuth, likePost);

export default router;