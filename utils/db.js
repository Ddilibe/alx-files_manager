#!/usr/bin/env node
import {MongoClient} from 'mongodb';


const host = process.env.DB_HOST || "Localhost" ;
const port = process.env.DB_PORT || "27017" ;
const db_name = process.env.DB_DATABASE || "files_manager" ;
const url = `mongodb://${host}:${port}`


class DBClient {
    constructor() {
        this.client = MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.client.connect().then(() => {
            this.db = this.client.db(db_name);
        }).catch((err) => {
            console.log(err);
        });
   }

   isAlive() {
    return this.client.isConnected();
   }

   item(){
    return this.client;
   }

   async nbUsers() {
        const user = this.db.collection('users');
        const numUser = await users.countDocuments();
        return numUser;
   }

   async nbFiles() {
        const files = this.db.collection('files');
        const numFiles = await files.countDocuments();
        return numFiles;
   }
}

const dbClient = new DBClient();

module.exports = dbClient;
