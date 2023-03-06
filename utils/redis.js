#!/usr/bin/env node
import {promisify} from 'util';
import {createClient} from "redis";


class RedisClient {

    constructor() {
        this.rediscli = createClient();
        this.rediscli.on("error", (error) => {
            console.log(`Redis Client Error: ${error}`)
        });
    }

    isAlive() {
        const connected = promisify(this.rediscli.isReady).bind(this.rediscli);
        if (connected) {
            return true;
        }
        return false;
    }

    async get(key) {
        const redisget = promisify(this.rediscli.get).bind(this.rediscli);
        const ans = await redisget(key);
        return ans;
    }

    async set(key, value, dura) {
        const redisset = promisify(this.rediscli.set).bind(this.rediscli);
        const ans = await redisset(key, value, {
            EX: dura,
        });
    }

    async del(key) {
        const ans = await this.rediscli.del(key);
    };
}

const redisClient = new RedisClient()

module.exports = redisClient;
