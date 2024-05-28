import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()


// READ 

// get the user 
router.get("/:id", verifyToken, getUser);

// get user friends 
router.get("/:id/friends", verifyToken, getUserFriends);

// Update 
router.patch("/:id/:friendid", verifyToken, addRemoveFriend);


export default router;