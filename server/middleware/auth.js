import jwt from 'jsonwebtoken';

export const verifyToken = async(req,res, next) => {
    try{    
        // get token from authorization (situated at header) from front end 
        let token = req.header("Authorization");
        if(!token) return res.status(403).send("Access Denied");


        // we are grabbing the token coming from front end  after bearer , we have given a space after bearer that's where token will be retrieved or received
        if(token.startWith("Bearer ")) {
            token = token.slice(7,token.length).trimLeft();
        }


        // verify token 

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next();
        


    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}