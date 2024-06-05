"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Log the environment variables to verify they are being read correctly
console.log('Redis Host:', process.env.REACT_APP_REDIS_HOST);
console.log('Redis Port:', process.env.REACT_APP_REDIS_PORT);
console.log('Redis Password:', process.env.REACT_APP_REDIS_PASSWORD);
const redisPort = Number(process.env.REACT_APP_REDIS_PORT);
if (isNaN(redisPort) || redisPort < 0 || redisPort >= 65536) {
    throw new Error('Invalid Redis port number');
}
//my redis config
const redisClient = (0, redis_1.createClient)({
    password: process.env.REACT_APP_REDIS_PASSWORD,
    socket: {
        host: process.env.REACT_APP_REDIS_HOST,
        port: redisPort
    }
});
exports.redisClient = redisClient;
