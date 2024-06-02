"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    password: 'leF3hDWC2Am0vm38X9VOat42JgitPxwG',
    socket: {
        host: 'redis-17813.c11.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 17813
    }
});
exports.redisClient = redisClient;
