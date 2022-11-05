import jwt from "jsonwebtoken";

const generateToken = (id) => {
    // Generate a token that expires in 3 days
    // Only the id matters in jwt, as isAdmin and email can be changed, and we don't want the info in jwt to be out of sync with DB
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "3d"
    });
}

export default generateToken;