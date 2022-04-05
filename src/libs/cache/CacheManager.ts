import * as redis from 'redis';
import { SystemResponse } from 'response-handler';

export interface ICacheConfig {
    redisHost: string;
    redisPort: string;
}
const redisClient = redis.createClient();

export default class CacheManager {
    public static open() {
        return new Promise(() => {
            redisClient.connect();
            redisClient.on('connect', () => {});
        });
    }

    public static async get(key, res) {
        try {
            return await redisClient.get(key);
        } catch (err) {
            return res.send(SystemResponse.badRequestError('Something went wrong', ''));
        }
    }

    public static async set(key, ex, value, res) {
        try {
            return await redisClient.set(key, ex, JSON.stringify(value));
        } catch (err) {
            return res.send(SystemResponse.badRequestError('Something went wrong', ''));
        }
    }

    public static async setEx(key, ex, value, res) {
        try {
            return await redisClient.setEx(key, ex, JSON.stringify(value));
        } catch (err) {
            return res.send(SystemResponse.badRequestError('Something went wrong', ''));
        }
    }
}
