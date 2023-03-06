import redisClient from './utils/redis';

(async () => {
    console.log("Starting to bring in the result");
    console.log(redisClient.isAlive());
    console.log("Trying to retrive a value without setting the key");
    console.log(await redisClient.get('myKey'));
    console.log("Setting the key to the value");
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log("Trying to get the key after the time duration");
        console.log(await redisClient.get('myKey'));
    }, 1000*10)
})();
