import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Parse and validate the Redis port
const redisPort = Number(process.env.REACT_APP_REDIS_PORT || 17813);

if (isNaN(redisPort) || redisPort < 0 || redisPort >= 65536) {
    throw new Error('Invalid Redis port number');
}

//Create constants for my Redis configuration
const REDIS_HOST = process.env.REACT_APP_REDIS_HOST || 'redis-17813.c11.us-east-1-2.ec2.redns.redis-cloud.com';
const REDIS_PASSWORD = process.env.REACT_APP_REDIS_PASSWORD || 'leF3hDWC2Am0vm38X9VOat42JgitPxwG';

//Create the Redis client
const redisClient = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: redisPort
    }
});

export { redisClient };
