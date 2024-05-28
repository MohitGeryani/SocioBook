import Post from "..//models/Post.js";
import User from "../models/User.js";

// CREATE 

export const createPost = async(req, res) => {
    try {

        const {userId, description, picturePath} = req.body;
        const user  = await User.findById(userId);
        const newPost = new Post(
            {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                description,
                userPicturePath: user.picturePath,
                picturePath,
                likes: {},
                comments: []
            }
        )
        await newPost.save();
        // grab all the posts 
        const post  = await Post.find();

        res.status(201).json(post);
        
    }catch(err) {
        res.status(401).json({message: err.message});
}
}

// 201 represents created something
// 200 represents successful request 



//  READ 

export const getFeedPosts = async(req, res) => {
    try {

        const post = await Post.find();
        res.status(200).json(post);

    }catch(err) {
        res.status(404).json({message: err.message});
    }

}

// show a particular user posts 

export const getUserPosts = async(req, res) => {
    try {
        const {userId} = req.params;

        const post = await Post.find({userId});
        res.status(200).json(post);

    }catch(err) {
        res.status(404).json({message: err.message});
    }
}




// Update 


export const likePost  = async(req, res) => {
                try {
                    const {id} = req.params;
                    const {userId} = req.body;

                    const post = await Post.findById(id);
                    /// we are checking if the post is liked by a particular person with his userid, if we found that userid is in likes (object key value pairs) then we simply remove like 
                    const isLiked = post.likes.get(userId);
                    if(isLiked) {
                        post.likes.delete(userId);
                    }
                    else {
                        post.likes.set(userId, true);

                    }
                    const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes},
                    {new: true}
                        );


                    res.status(200).json(updatedPost);

                }catch(err) {
                    res.status(404).json({message: err.message});
                }
}
