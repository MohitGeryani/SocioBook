import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();


// READ 
// get user feed on home page 
router.get("/", verifyToken, getFeedPosts);


// only particular posts from a particular user 
router.get("/:userId/posts", verifyToken, getUserPosts);




//Update 

router.patch("/:id/like", verifyToken, likePost);

export default router;