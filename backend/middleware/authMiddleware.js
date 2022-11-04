import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {redisClient} from "../config/redis.js";
import cyrb53 from "../uitils/hashFunction.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if there is a token in the header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Decode the token and see if the user id is correct
        try {
            token = req.headers.authorization.split(" ")[1];

            // Check if token is in redis blacklist
            const key = String(cyrb53(token));
            const value = await redisClient.get(key);
            if (value !== null) {
                throw new Error("Token already in blacklist")
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    // If token is not found
    if (!token) {
        res.status(401); // Unauthorised
        throw new Error("Not authorized, no token");
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
};

export {protect, admin};
