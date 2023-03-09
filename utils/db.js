#!/usr/bin/env node
import {MongoClient} from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const url = `mongodb://${host}:${port}`;

        MongoClient.connect(url, (error, client) => {
            if (!error) {
                this.db = client.db(database);
            }
            else {
                this.db = false;
            }
        });
   }

   isAlive() {
        if (this.db) return true
            else
                return false

   }

   async nbUsers() {
        return this.db.collection('users').countDocuments();
   }

   async nbFiles() {
        return this.client.db().collection('files').countDocuments();
   }
}

const dbClient = new DBClient();

module.exports = dbClient;
