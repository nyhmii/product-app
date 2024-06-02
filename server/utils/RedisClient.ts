import { createClient } from 'redis';

const redisClient = createClient({
    password: 'leF3hDWC2Am0vm38X9VOat42JgitPxwG',
    socket: {
        host: 'redis-17813.c11.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 17813
    }
});

export { redisClient };
