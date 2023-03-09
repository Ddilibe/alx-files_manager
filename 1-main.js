import dbClient from './utils/db';
import {MongoClient} from 'mongodb';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 100) {
                    reject()
                }
                else if(!dbClient.isAlive()) {
                    repeatFct()
                    console.log("Trying...")
                }
                else {
                    resolve()
                    console.log("Connected successfully");
                }
            }, 1000);
        };
        repeatFct();
    }).catch(error => {
        console.log(`It was not able to connect. Error: ${error}`);
    });
};

(async () => {
    console.log(dbClient.isAlive());
    console.log("Trying to connect...")
    // for (const prop of Object.entries(dbClient.item())) {
        // console.log(prop)
    // }
    await waitConnection();
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();
