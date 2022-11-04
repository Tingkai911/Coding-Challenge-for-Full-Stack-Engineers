import redis from "redis";

// https://github.com/redis/node-redis

let redisClient

const connectRedis = async () => {
    redisClient = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        },
        password: process.env.REDIS_PASSWORD
    });

    redisClient.on('connect', err => {
        console.log("Redis connected");
    });

    redisClient.on('error', err => {
        console.log('Error: ' + err);
    });

    await redisClient.connect();
}

export {connectRedis, redisClient}