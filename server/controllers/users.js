import User from "../models/User.js";



// REAd 
/// getUser,
//getUserFriends,
//addRemoveFriend

export const getUser = async (req,res) => {
    try {

        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    }catch(err) {
        res.status(404).json({message: err.message});
    }
}


export const getUserFriends = async(req,res) => {

    try {
        
        const {id} = req.params;
        const user = await User.findById(id);

            // we used a Promise bcs we will be doing multiple api calls to database for friends data
        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        );

        // we gonna fromat friends data for front end 
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends);
    }catch(err) {
        res.status(400).json({message: err.message});
    }
    
    
}




// Update 

export const addRemoveFriend = async(req, res) => {
    try {
            const {id, friendId} = req.params;
            const user = await User.findById(id);
            const friend = await User.findById(friendId); // here friend is also another user and friend.friends means user.friends (another user) 
            
            // if friend included then remove it from both the user and friend's data
            if(user.friend.includes(friendId)) {
                    user.friends = user.friends.filter((id)=> id!== friendId);
                    friend.friends = friend.friend.filter((id)=> id !== id);
            } else {
                // if friend is not added then add to both user and friend 
                user.friend.push(friendId);
                friend.friends.push(id);
            }   

        await user.save();
        await friend.save();
             // we used a Promise bcs we will be doing multiple api calls to database for friends data
             const friends = await Promise.all(
                user.friends.map((id)=> User.findById(id))
            );
    
            // we gonna format friends data for front end 
            const formattedFriends = friends.map(
                ({_id, firstName, lastName, occupation, location, picturePath}) => {
                    return {_id, firstName, lastName, occupation, location, picturePath};
                }
            );

            res.status(200).json(formattedFriends);
    } 
    catch(err) {
        
        res.status(400).json({message: err.message});
    }
}

