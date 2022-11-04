import jwt from "jsonwebtoken";

const generateToken = (id) => {
    // Generate a token that expires in 3 days
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "3d"
    });
}

export default generateToken;