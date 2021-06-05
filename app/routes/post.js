import {Router} from 'express';
import { createPost, deletePost, getPosts, likePost, updatePost } from '../controllers/post.js';
const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/", updatePost);
router.delete("/:id", deletePost);
router.patch("/like/:id", likePost);

export default router;