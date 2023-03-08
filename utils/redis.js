#!/usr/bin/env node
import {createClient} from "redis";
import {promisify} from 'util';


class RedisClient {

    // Initiator method for the class RedisClient
    constructor() {
        this.rediscli = createClient();
        this.rediscli.on("error", (error) => {
            console.log(`Redis Client Error: ${error}`)
        });
        this.rediscli.on("connected", () => {return true});
    }

    // Method for confirming that the connection is alive
    isAlive() {
        if (this.rediscli.connected){
            return true;
        }
        return false;
    }

    // Method for setting a value of the corresponding key argument
    async get(key) {
        const redisget = promisify(this.rediscli.get).bind(this.rediscli);
        const ans = await redisget(key);
        return ans;
    }

    // Method for setting a key and its corresponding value with an expiration date
    async set(key, value, dura) {
        const redisset = promisify(this.rediscli.set).bind(this.rediscli);
        const ans = await redisset(key, value);
        await this.rediscli.expire(key, dura);
    }

    // Method for deleteing a key and its corresponding value
    async del(key) {
        const ans = await this.rediscli.del(key);
    };
}

const redisClient = new RedisClient()

module.exports = redisClient;
